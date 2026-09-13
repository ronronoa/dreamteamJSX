import { z } from "zod";
import type { Result } from "@/shared/types/result";
export declare function validate<T>(schema: z.ZodSchema<T>, data: unknown): Result<T, z.ZodError>;
export declare function formatZodError(error: z.ZodError): Record<string, string[]>;
//# sourceMappingURL=validation.d.ts.map