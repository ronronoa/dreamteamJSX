import argon2 from "argon2";
import { PrismaClientKnownRequestError } from "@/generated/prisma/internal/prismaNamespace";
import { ConflictError, UnauthorizedError } from "@/shared/errors/app-error";
import type { SignInInput, SignUpInput } from "@/types/auth.types";
import { hashPassword, verifyPassword } from "@/utils/password";
import { prisma } from "@/lib/prisma";
import { toSafeUser } from "@/utils/user";
import { generateAccessToken, generateRefreshToken, parseRefreshToken } from "@/utils/token";
import { hashRefreshToken } from "@/utils/refresh-token";

let dummyPasswordHashPromise: Promise<string> | null = null;

function getDummyPasswordHash(): Promise<string> {
  if (!dummyPasswordHashPromise) {
    dummyPasswordHashPromise = argon2.hash("timing-safe-dummy-password");
  }
  return dummyPasswordHashPromise;
}

export const authService = {
  async signUp(data: SignUpInput) {
    const hashedPassword = await hashPassword(data.password);

    try {
      const user = await prisma.user.create({
        data: {
          name: data.name,
          username: data.username,
          passwordHash: String(hashedPassword),
        },
      });

      const accessToken = generateAccessToken({
        userId: user.user_id,
        role: user.role,
      });

      const refreshToken = generateRefreshToken({
        userId: user.user_id,
      });

      const tokenHash = hashRefreshToken(refreshToken);

      await prisma.refreshToken.create({
        data: {
          tokenHash: String(tokenHash),
          userId: user.user_id,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });

      return {
        user: toSafeUser(user),
        accessToken,
        refreshToken,
      };
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
        throw new ConflictError(`username ${data.username} is already registered.`);
      }
      throw err;
    }
  },

  async signIn(data: SignInInput) {
    const user = await prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (!user) {
      const dummyHash = await getDummyPasswordHash();
      await argon2.verify(dummyHash, data.password);
      throw new UnauthorizedError("Invalid username or password");
    }

    const passwordValid = await verifyPassword(data.password, user.passwordHash);

    if (!passwordValid) {
      throw new UnauthorizedError("Invalid username or password");
    }

    const accessToken = generateAccessToken({
      userId: user.user_id,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      userId: user.user_id,
    });

    const tokenHash = await hashRefreshToken(refreshToken);

    await prisma.refreshToken.create({
      data: {
        tokenHash: String(tokenHash),
        userId: user.user_id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      user: toSafeUser(user),
      accessToken,
      refreshToken,
    };
  },

  async refresh(refreshToken: string) {
    const parsed = parseRefreshToken(refreshToken);

    if (!parsed.success) {
      throw new UnauthorizedError("Invalid or expired refresh token");
    }

    const payload = parsed.data;

    const tokenHash = await hashRefreshToken(refreshToken);

    const storedToken = await prisma.refreshToken.findUnique({
      where: {
        tokenHash: tokenHash,
      },
      include: {
        user: true,
      },
    });

    if (!storedToken) {
      throw new UnauthorizedError("Refresh token is invalid or has been revoked");
    }

    if (storedToken.expiresAt < new Date()) {
      await prisma.refreshToken.delete({
        where: {
          id: storedToken.id,
        },
      });
      throw new UnauthorizedError("Refresh token has expired");
    }

    if (storedToken.userId !== payload.userId) {
      throw new UnauthorizedError("Invalid refresh token");
    }

    const accessToken = generateAccessToken({
      userId: storedToken.user.user_id,
      role: storedToken.user.role,
    });

    const newRefreshToken = generateRefreshToken({
      userId: payload.userId,
    });

    const newTokenHash = await hashRefreshToken(newRefreshToken);

    const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await prisma.$transaction([
      prisma.refreshToken.delete({
        where: {
          id: storedToken.id,
        },
      }),
      prisma.refreshToken.create({
        data: {
          tokenHash: newTokenHash,
          userId: payload.userId,
          expiresAt: newExpiresAt,
        },
      }),
    ]);

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  },

  async logout(refreshToken?: string) {
    if (!refreshToken) return;

    const tokenHash = await hashRefreshToken(refreshToken);

    await prisma.refreshToken.deleteMany({
      where: {
        tokenHash: tokenHash,
      },
    });
  },
};