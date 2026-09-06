import type { SetPinSchema, VerifyPinSchema } from "@/schemas/pin.schema"
import { z } from "zod"

export type SetPinInput = z.infer<typeof SetPinSchema>
export type VerifyPinInput = z.infer<typeof VerifyPinSchema>