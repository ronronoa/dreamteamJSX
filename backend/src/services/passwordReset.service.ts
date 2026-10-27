import { randomInt } from "node:crypto";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import argon2 from "argon2";
import nodemailer from "nodemailer";
import { env } from "@/config/env";
import { prisma } from "@/lib/prisma";
import { ConflictError, InternalError, UnauthorizedError, ValidationError } from "@/shared/errors/app-error";
import { hashPassword } from "@/utils/password";
import { toSafeUser } from "@/utils/user";
import { generateAccessToken, generateRefreshToken } from "@/utils/token";
import { hashRefreshToken } from "@/utils/refresh-token";

const RESET_CODE_LIFETIME_MS = 10 * 60 * 1000;
const MAX_RESET_CODE_ATTEMPTS = 5;
const RESET_EMAIL_TEMPLATE_PATH = fileURLToPath(new URL("../../templates/password-reset.html", import.meta.url));

const emailTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: env.FORGET_PASS_EMAIL,
    pass: env.FORGET_PASS_EMAIL_APP_PASS,
  },
});

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function sendResetCodeEmail(email: string, name: string, code: string) {
  const template = await readFile(RESET_EMAIL_TEMPLATE_PATH, "utf8");
  const html = template
    .replaceAll("{{name}}", escapeHtml(name))
    .replaceAll("{{code}}", escapeHtml(code));

  await emailTransport.sendMail({
    from: env.FORGET_PASS_EMAIL,
    to: email,
    subject: "Password Reset",
    html,
  });
}

export const passwordResetService = {
  async requestCode(emailAddress: string) {
    if (!env.FORGET_PASS_EMAIL || !env.FORGET_PASS_EMAIL_APP_PASS) {
      throw new InternalError("Password reset email is not configured. Contact your administrator.");
    }
    const email = emailAddress.trim().toLowerCase();
    const user = await prisma.user.findFirst({
      where: {
        email: { equals: email, mode: "insensitive" },
        isActive: true,
        passwordHash: { not: null },
      },
      select: { user_id: true, name: true, email: true },
    });

    if (!user?.email) {
      throw new ValidationError("No active account was found for that email address.", {
        email: ["Enter the email address connected to your account."],
      });
    }

    const code = String(randomInt(100_000, 1_000_000));
    const codeHash = await argon2.hash(code);
    const expiresAt = new Date(Date.now() + RESET_CODE_LIFETIME_MS);

    await prisma.passwordResetCode.upsert({
      where: { userId: user.user_id },
      update: { codeHash, attempts: 0, expiresAt, createdAt: new Date() },
      create: { userId: user.user_id, codeHash, expiresAt },
    });

    try {
      await sendResetCodeEmail(user.email, user.name, code);
    } catch (error) {
      await prisma.passwordResetCode.deleteMany({
        where: { userId: user.user_id, codeHash },
      });
      console.error("Could not send password reset email:", error);
      throw new InternalError("The reset email could not be sent. Please try again later.");
    }

    return { success: true };
  },

  async resetPassword(emailAddress: string, code: string, newPassword: string) {
    const email = emailAddress.trim().toLowerCase();
    const user = await prisma.user.findFirst({
      where: { email: { equals: email, mode: "insensitive" }, isActive: true, passwordHash: { not: null } },
      select: { user_id: true, role: true },
    });
    if (!user) throw new UnauthorizedError("The reset request is invalid or expired.");

    const resetRequest = await prisma.passwordResetCode.findUnique({
      where: { userId: user.user_id },
    });
    if (!resetRequest || resetRequest.expiresAt <= new Date()) {
      throw new UnauthorizedError("The verification code is invalid or expired.");
    }
    if (resetRequest.attempts >= MAX_RESET_CODE_ATTEMPTS) {
      throw new UnauthorizedError("Too many incorrect attempts. Request a new verification code.");
    }

    const codeMatches = await argon2.verify(resetRequest.codeHash, code);
    if (!codeMatches) {
      const updatedAttempts = await prisma.passwordResetCode.updateMany({
        where: {
          id: resetRequest.id,
          attempts: { lt: MAX_RESET_CODE_ATTEMPTS },
          expiresAt: { gt: new Date() },
        },
        data: { attempts: { increment: 1 } },
      });
      if (updatedAttempts.count === 0) {
        throw new UnauthorizedError("Too many incorrect attempts. Request a new verification code.");
      }
      throw new UnauthorizedError("The verification code is incorrect.");
    }

    const passwordHash = await hashPassword(newPassword);
    const refreshToken = generateRefreshToken({ userId: user.user_id });
    const accessToken = generateAccessToken({ userId: user.user_id, role: user.role });
    const tokenHash = await hashRefreshToken(refreshToken);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const updatedUser = await prisma.$transaction(async (transaction) => {
      const consumedCode = await transaction.passwordResetCode.deleteMany({
        where: {
          id: resetRequest.id,
          attempts: { lt: MAX_RESET_CODE_ATTEMPTS },
          expiresAt: { gt: new Date() },
        },
      });
      if (consumedCode.count === 0) {
        throw new ConflictError("The verification code has already been used or expired.");
      }

      const account = await transaction.user.findFirst({
        where: { user_id: user.user_id, isActive: true },
      });
      if (!account) throw new UnauthorizedError("This account is inactive or no longer exists.");

      const updated = await transaction.user.update({
        where: { user_id: user.user_id },
        data: { passwordHash, mustChangePassword: false, last_active_at: new Date() },
        include: { team: { select: { team_name: true } } },
      });
      await transaction.refreshToken.deleteMany({ where: { userId: user.user_id } });
      await transaction.refreshToken.create({
        data: { userId: user.user_id, tokenHash, expiresAt },
      });
      return updated;
    });

    return {
      user: toSafeUser(updatedUser),
      accessToken,
      refreshToken,
    };
  },
};
