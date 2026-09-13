import { z } from "zod";
export declare const CreateUserSchema: z.ZodObject<{
    name: z.ZodString;
    username: z.ZodString;
    password: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<{
        DEPARTMENT_HEAD: "DEPARTMENT_HEAD";
        DEPUTY: "DEPUTY";
        MEMBER: "MEMBER";
        SUPER_ADMIN: "SUPER_ADMIN";
        TEAM_LEADER: "TEAM_LEADER";
    }>>;
}, z.core.$strip>;
export declare const UpdateUserSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    username: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<{
        DEPARTMENT_HEAD: "DEPARTMENT_HEAD";
        DEPUTY: "DEPUTY";
        MEMBER: "MEMBER";
        SUPER_ADMIN: "SUPER_ADMIN";
        TEAM_LEADER: "TEAM_LEADER";
    }>>;
}, z.core.$strip>;
export declare const ResetPasswordSchema: z.ZodObject<{
    newPassword: z.ZodString;
}, z.core.$strip>;
export declare const UserIdParamSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=user.schema.d.ts.map