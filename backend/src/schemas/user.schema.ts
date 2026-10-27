import { ReportPinSchema } from "./pin.schema";
import { z } from "zod"

const RoleEnum = z.enum(["SUPER_ADMIN", "DEPARTMENT_HEAD", "DEPUTY", "TEAM_LEADER", "MEMBER"]);
const PhoneSchema = z.string().trim().max(20)
    .refine((phone) => {
        if (!phone) return true;
        const normalizedPhone = phone.replace(/[ -]/g, "");
        return /^(?:\+?63|0)9\d{9}$/.test(normalizedPhone);
    }, "Enter a valid Philippine mobile number, such as 09171234567 or +639171234567")
    .transform((phone) => {
        if (!phone) return null;
        const normalizedPhone = phone.replace(/[ -]/g, "");
        if (normalizedPhone.startsWith("+63")) return normalizedPhone;
        if (normalizedPhone.startsWith("63")) return `+${normalizedPhone}`;
        return `+63${normalizedPhone.slice(1)}`;
    })
    .optional()
    .nullable();
const EmailSchema = z.string().trim().email("Enter a valid email address").max(254)
    .transform((email) => email.toLowerCase());
const OptionalEmailSchema = z.preprocess(
    (email) => typeof email === "string" && !email.trim() ? null : email,
    EmailSchema.nullable().optional(),
);
const OptionalPasswordSchema = z.preprocess(
    (value) => value === "" ? undefined : value,
    z.string().min(8).max(64).optional(),
);
const TeamIdSchema = z.string().uuid().optional().nullable();

export const CreateUserSchema = z.object({
    name: z.string().trim().min(1).max(200),
    firstName: z.string().trim().min(1).max(80).optional(),
    lastName: z.string().trim().max(80).optional(),
    middleInitial: z.string().trim().regex(/^[A-Za-z]?$/).transform((value) => value.toUpperCase()).optional(),
    suffix: z.string().trim().max(20).optional(),
    username: z.string().trim().min(3).max(50).regex(/^[a-zA-Z0-9._-]+$/, "Use letters, numbers, dots, underscores, or hyphens"),
    email: OptionalEmailSchema,
    password: OptionalPasswordSchema,
    role: RoleEnum.default("MEMBER"),
    phone: PhoneSchema,
    isActive: z.boolean().default(true),
    team_id: z.string().uuid("Select a team for this user."),
}).superRefine((data, context) => {
    if (data.firstName !== undefined && !data.lastName) {
        context.addIssue({ code: "custom", path: ["lastName"], message: "Last name is required." });
    }
    if (data.role !== "MEMBER" && !data.password) {
        context.addIssue({ code: "custom", path: ["password"], message: "A password is required for this role." });
    }
})

export const UpdateUserSchema = z.object({
    password: OptionalPasswordSchema,
    pin: ReportPinSchema.optional(),
    name: z.string().trim().min(1).max(200).optional(),
    firstName: z.string().trim().min(1).max(80).optional(),
    lastName: z.string().trim().max(80).optional(),
    middleInitial: z.string().trim().regex(/^[A-Za-z]?$/).transform((value) => value.toUpperCase()).optional(),
    suffix: z.string().trim().max(20).optional(),
    username: z.string().trim().min(3).max(50).regex(/^[a-zA-Z0-9._-]+$/, "Use letters, numbers, dots, underscores, or hyphens").optional(),
    email: OptionalEmailSchema,
    role: RoleEnum.optional(),
    phone: PhoneSchema,
    isActive: z.boolean().optional(),
    team_id: TeamIdSchema,
}).refine((data) => Object.keys(data).length > 0, { message: "Provide at least one field to update" });

export const UpdateOwnProfileSchema = z.object({
    name: z.string().trim().min(1).max(50),
    username: z.string().trim().min(3).max(50).regex(/^[a-zA-Z0-9._-]+$/, "Use letters, numbers, dots, underscores, or hyphens"),
    email: EmailSchema,
    phone: PhoneSchema,
});

export const ResetPasswordSchema = z.object({
    newPassword: z.string().min(8).max(64)
})

export const UserIdParamSchema = z.object({
    id: z.string().uuid()
})
