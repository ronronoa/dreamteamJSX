import type { z } from "zod";
import type { SetPinSchema, VerifyPinSchema } from "@/schemas/pin.schema";

export type SetPinInput = z.infer<typeof SetPinSchema>;
export type VerifyPinInput = z.infer<typeof VerifyPinSchema>;
