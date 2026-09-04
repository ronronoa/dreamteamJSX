import { z } from "zod";

import type { SignInSchema, SignUpSchema } from "@/schemas/auth.schema";

export type SignUpInput = z.infer<typeof SignUpSchema>;
export type SignInInput = z.infer<typeof SignInSchema>;