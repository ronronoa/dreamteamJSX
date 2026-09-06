import { prisma } from "@/lib/prisma";
import { UnauthorizedError } from "@/shared/errors";
import type { SetPinInput, VerifyPinInput } from "@/types/pin.types";
import argon2 from "argon2"

const MAX_FAILED_ATTEMPTS = 3;
const LOCKOUT_MINUTES = 15;

export const pinService = {
    async setPin(userId: string, data: SetPinInput) {
        const pinHash = await argon2.hash(data.pin)

        await prisma.user.update({
            where: { user_id: userId },
            data: {
                pinHash,
                pinFailedAttempts: 0,
                pinLockedUntil: null
            }
        });

        return { success: true }
    },

    async verifyPin(userId: string, data: VerifyPinInput ) {
        const user = await prisma.user.findUnique({
            where: { user_id: userId }, 
        });

        if (!user) throw new UnauthorizedError("User not found")
        if(!user.pinHash) throw new UnauthorizedError("PIN not set. Please set a PIN first.")
        if (user.pinLockedUntil && user.pinLockedUntil > new Date()) {
            const minutesRemaining = Math.ceil((user.pinLockedUntil.getTime() - Date.now() / 60000));
            throw new UnauthorizedError(`PIN locked. Try again in ${minutesRemaining} minutes(s).`)
        }

        const valid = await argon2.verify(user.pinHash, data.pin)
        if (!valid) {
            const newAttempts = user.pinFailedAttempts + 1;

            if (newAttempts >= MAX_FAILED_ATTEMPTS) {
                const lockUntil = new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000)
                await prisma.user.update({
                    where: { user_id: userId },
                    data: {
                        pinFailedAttempts: newAttempts,
                        pinLockedUntil: lockUntil
                    }
                });

                throw new UnauthorizedError(`PIN locked after ${MAX_FAILED_ATTEMPTS} failed attempts. Try again in ${LOCKOUT_MINUTES} minutes`)
            }

            await prisma.user.update({
                where: { user_id: userId },
                data: { pinFailedAttempts: newAttempts }
            })

            throw new UnauthorizedError(`Invalid PIN. ${MAX_FAILED_ATTEMPTS - newAttempts} attempt(s) remaining`)
        }

        // reset attempts if request is success
        await prisma.user.update({
            where: { user_id: userId },
            data: {
                pinFailedAttempts: 0,
                pinLockedUntil: null
            }
        });

        return { valid: true }
    }
}