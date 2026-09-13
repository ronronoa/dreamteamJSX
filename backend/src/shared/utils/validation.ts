import { z } from "zod";
import type { Result } from "@/shared/types/result";
import { ValidationError } from "@/shared/errors"

export function validate<T>(schema: z.ZodSchema<T>, data: unknown): Result<T, z.ZodError> {
  const result = schema.safeParse(data);
  return result.success
    ? { success: true, data: result.data }
    : { success: false, error: result.error };
}

export function formatZodError(error: z.ZodError): Record<string, string[]> {
  const formatted: Record<string, string[]> = {};

  for (const issue of error.issues) {
    const path = issue.path.join(".");
    if (!formatted[path]) {
      formatted[path] = [];
    }
    formatted[path].push(issue.message);
  }

  return formatted;
}


function getFirstZodIssue(error: z.ZodError): z.ZodIssue {
    const issue = error.issues[0]
    if(!issue) throw new Error("Zod error has no issues")
        return issue
}

export function validateOrThrow<T>(parsed: z.ZodSafeParseResult<T>) {
    if (!parsed.success) {
        const firstIssue = getFirstZodIssue(parsed.error)
        throw new ValidationError(firstIssue.message, {
            [firstIssue.path.join(".")]: [firstIssue.message]
        })
    }
    return parsed.data
}