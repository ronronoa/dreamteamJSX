import { z } from "zod";
declare const EnvSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<{
        development: "development";
        production: "production";
        test: "test";
    }>>;
    PORT: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    DATABASE_URL: z.ZodString;
    ACCESS_TOKEN_SECRET: z.ZodString;
    REFRESH_TOKEN_SECRET: z.ZodString;
}, z.core.$strip>;
export declare const env: {
    NODE_ENV: "development" | "production" | "test";
    PORT: number;
    DATABASE_URL: string;
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
};
export type Env = z.infer<typeof EnvSchema>;
export {};
//# sourceMappingURL=env.d.ts.map