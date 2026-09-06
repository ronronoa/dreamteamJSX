import { z } from "zod"

export const SetPinSchema = z.object({
    pin: z.string().regex(/^\d{4,6}$/, "PIN must be 4-6 digits")
});

export const VerifyPinSchema = z.object({
    pin: z.string().regex(/^\d{4,6}$/, "PIN must be 4-6 digits")
})

