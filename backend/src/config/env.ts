import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  ACCESS_TOKEN_SECRET: z.string().min(32),
  REFRESH_TOKEN_SECRET: z.string().min(32),
  OCR_BACKEND_URL: z.string().url(),
  FORGET_PASS_EMAIL: z.string().email(),
  FORGET_PASS_EMAIL_APP_PASS: z.string(),
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:");
  console.error(parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;

export type Env = z.infer<typeof EnvSchema>;
