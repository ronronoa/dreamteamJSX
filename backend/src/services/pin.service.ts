import argon2 from "argon2";
import { PrismaClientKnownRequestError } from "@/generated/prisma/internal/prismaNamespace";
import { randomInt } from "node:crypto";
import { ReportPinSchema } from "@/schemas/pin.schema";
import { encryptPin, decryptPin } from "@/utils/pin-encryption";
import { getPinLookupHash } from "@/utils/report-pin";
import { ConflictError, ValidationError, UnauthorizedError } from "@/shared/errors/app-error";
import type { SetPinInput, VerifyPinInput } from "@/types/pin.types";
import { prisma } from "@/lib/prisma";

const MAX_FAILED_ATTEMPTS = 3;
const LOCKOUT_MINUTES = 15;
const PIN_SPACE_SIZE = 10_000;

export const pinService = {
  async setGlobalPin(_userId: string, _pin: string) {
    throw new ConflictError("Shared PINs are no longer supported. Assign each user a personal report PIN in Manage Users.");
  },

  async generatePin() {
    const owners = await prisma.user.findMany({
      where: { pinLookupHash: { not: null } },
      select: { pinLookupHash: true },
    });
    const assignedHashes = new Set(owners.map((owner) => owner.pinLookupHash));
    const availablePins: string[] = [];
    for (let number = 0; number < PIN_SPACE_SIZE; number += 1) {
      const candidate = String(number).padStart(4, "0");
      if (!assignedHashes.has(getPinLookupHash(candidate))) availablePins.push(candidate);
    }
    if (availablePins.length === 0) {
      throw new ConflictError("All 10,000 four-digit PINs are assigned. Increase the PIN length before adding more users.");
    }
    return availablePins[randomInt(availablePins.length)]!;
  },

  async preparePin(pin: string) {
    const parsed = ReportPinSchema.safeParse(pin);
    if (!parsed.success) throw new ValidationError(parsed.error.issues[0]!.message);
    return {
      pinHash: await argon2.hash(parsed.data),
      pinEncrypted: encryptPin(parsed.data),
      pinLookupHash: getPinLookupHash(parsed.data),
      pinFailedAttempts: 0,
      pinLockedUntil: null,
    };
  },

  async revealPin(userId: string) {
    const user = await prisma.user.findUnique({ where: { user_id: userId }, select: { pinEncrypted: true } });
    if (!user?.pinEncrypted) throw new ValidationError("This older PIN cannot be viewed. Assign a new PIN to this user.");
    return decryptPin(user.pinEncrypted);
  },

  async setPin(userId: string, data: SetPinInput) {
    const user = await prisma.user.findUnique({ where: { user_id: userId } });
    if (!user?.isActive) throw new UnauthorizedError("This account is inactive or no longer exists.");
    const credentials = await this.preparePin(data.pin);
    try {
      await prisma.user.update({ where: { user_id: userId }, data: credentials });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        throw new ConflictError("This report PIN is already assigned to another user.");
      }
      throw error;
    }
    return { success: true };
  },

  async verifyPin(userId: string, data: VerifyPinInput) {
    const user = await prisma.user.findUnique({
      where: { user_id: userId },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedError("User not found");
    }

    if (!user.pinHash || !user.pinLookupHash) {
      throw new UnauthorizedError("PIN not set. Please set a PIN first.");
    }

    if (user.pinLockedUntil && user.pinLockedUntil > new Date()) {
      const minutesRemaining = Math.ceil(
        (user.pinLockedUntil.getTime() - Date.now()) / 60000
      );
      throw new UnauthorizedError(
        `PIN locked. Try again in ${minutesRemaining} minute(s).`
      );
    }

    const valid = await argon2.verify(user.pinHash, data.pin);

    if (!valid) {
      const newAttempts = user.pinFailedAttempts + 1;

      if (newAttempts >= MAX_FAILED_ATTEMPTS) {
        const lockUntil = new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000);
        await prisma.user.update({
          where: { user_id: userId },
          data: {
            pinFailedAttempts: newAttempts,
            pinLockedUntil: lockUntil,
          },
        });
        throw new UnauthorizedError(
          `PIN locked after ${MAX_FAILED_ATTEMPTS} failed attempts. Try again in ${LOCKOUT_MINUTES} minutes.`
        );
      }

      await prisma.user.update({
        where: { user_id: userId },
        data: { pinFailedAttempts: newAttempts },
      });

      throw new UnauthorizedError(
        `Invalid PIN. ${MAX_FAILED_ATTEMPTS - newAttempts} attempt(s) remaining.`
      );
    }

    await prisma.user.update({
      where: { user_id: userId },
      data: {
        pinFailedAttempts: 0,
        pinLockedUntil: null,
      },
    });

    return { valid: true };
  },

  async verifyReportFormPin(data: VerifyPinInput) {
    const pin = ReportPinSchema.safeParse(data.pin);
    if (!pin.success) throw new UnauthorizedError("Invalid report PIN.");
    const owner = await prisma.user.findUnique({
      where: { pinLookupHash: getPinLookupHash(pin.data) },
      select: { user_id: true, name: true, role: true, isActive: true },
    });
    if (!owner?.isActive) throw new UnauthorizedError("Invalid report PIN.");
    await this.verifyPin(owner.user_id, { pin: pin.data });
    return {
      valid: true,
      type: "USER" as const,
      ownerId: owner.user_id,
      ownerName: owner.name,
      ownerRole: owner.role,
    };
  },
};

export type ReportPinOwner = Awaited<ReturnType<typeof pinService.verifyReportFormPin>>;
