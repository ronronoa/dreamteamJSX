import argon2 from "argon2";
import { UnauthorizedError } from "@/shared/errors/app-error";
import type { SetPinInput, VerifyPinInput } from "@/types/pin.types";
import { prisma } from "@/lib/prisma";

const MAX_FAILED_ATTEMPTS = 3;
const LOCKOUT_MINUTES = 15;

export const pinService = {
  async setGlobalPin(userId: string, pin: string) {
    const pinHash = await argon2.hash(pin)
    await prisma.systemSetting.upsert({
      where: { setting_key: "security.globalPinHash" },
      create: { setting_key: "security.globalPinHash", value: pinHash, updated_by: userId },
      update: { value: pinHash, updated_by: userId },
    })
    return { success: true }
  },

  async setPin(userId: string, data: SetPinInput) {
    const pinHash = await argon2.hash(data.pin);

    await prisma.user.update({
      where: { user_id: userId },
      data: {
        pinHash,
        pinFailedAttempts: 0,
        pinLockedUntil: null,
      },
    });

    return { success: true };
  },

  async verifyPin(userId: string, data: VerifyPinInput) {
    const user = await prisma.user.findUnique({
      where: { user_id: userId },
    });

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    if (!user.pinHash) {
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
    const globalPinSetting = await prisma.systemSetting.findUnique({
      where: { setting_key: "security.globalPinHash" },
      select: { value: true },
    })
    if (globalPinSetting) {
      if (await argon2.verify(globalPinSetting.value, data.pin)) {
        return {
          valid: true,
          type: "GLOBAL" as const,
          ownerId: null,
          ownerName: null,
          ownerRole: null,
        };
      }
      throw new UnauthorizedError("Invalid global PIN.")
    }

    const pinOwners = await prisma.user.findMany({
      where: {
        isActive: true,
        role: { not: "MEMBER" },
        pinHash: { not: null },
        OR: [{ pinLockedUntil: null }, { pinLockedUntil: { lte: new Date() } }],
      },
      select: { user_id: true, name: true, role: true, pinHash: true },
    });
    if (pinOwners.length === 0) {
      throw new UnauthorizedError("A report PIN has not been set by an administrator yet.");
    }

    for (const pinOwner of pinOwners) {
      if (pinOwner.pinHash && await argon2.verify(pinOwner.pinHash, data.pin)) {
        await prisma.systemSetting.upsert({
          where: { setting_key: "security.globalPinHash" },
          create: {
            setting_key: "security.globalPinHash",
            value: pinOwner.pinHash,
            updated_by: pinOwner.user_id,
          },
          update: {},
        });
        return {
          valid: true,
          type: "USER" as const,
          ownerId: pinOwner.user_id,
          ownerName: pinOwner.name,
          ownerRole: pinOwner.role,
        };
      }
    }
    throw new UnauthorizedError("Invalid report PIN.");
  },
};
