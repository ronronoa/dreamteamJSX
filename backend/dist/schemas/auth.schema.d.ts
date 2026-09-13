import { z } from "zod";
export declare const SignUpSchema: z.ZodObject<{
    name: z.ZodString;
    username: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const SignInSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const RefreshTokenSchema: z.ZodObject<{
    refreshToken: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=auth.schema.d.ts.map