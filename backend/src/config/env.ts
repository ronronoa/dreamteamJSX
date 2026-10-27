import { z } from "zod";

export const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  ACCESS_TOKEN_SECRET: z.string().min(32),
  REFRESH_TOKEN_SECRET: z.string().min(32),
  OCR_BACKEND_URL: z.string().url().optional(),
  FORGET_PASS_EMAIL: z.string().email().optional(),
  FORGET_PASS_EMAIL_APP_PASS: z.string().min(1).optional(),
}).superRefine((settings, context) => {
  if (settings.NODE_ENV !== "production") return;

  const requiredSettings = ["OCR_BACKEND_URL", "FORGET_PASS_EMAIL", "FORGET_PASS_EMAIL_APP_PASS"] as const;
  for (const setting of requiredSettings) {
    if (settings[setting]) continue;
    context.addIssue({
      code: "custom",
      path: [setting],
      message: "Required in production",
    });
  }
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:");
  console.error(parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;

export type Env = z.infer<typeof EnvSchema>;
