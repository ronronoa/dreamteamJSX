import { ReportPinSchema } from "./pin.schema";
import { z } from "zod"

const RoleEnum = z.enum(["SUPER_ADMIN", "DEPARTMENT_HEAD", "DEPUTY", "TEAM_LEADER", "MEMBER"]);
const NamePartSchema = z.string().trim().min(1).max(80)
    .regex(/^[\p{L}\p{M} ]+$/u, "Use letters and spaces only.");
const PhoneSchema = z.string().trim().max(20)
    .refine((phone) => {
        if (!phone) return true;
        const normalizedPhone = phone.replace(/[ -]/g, "");
        return /^(?:\+?63|0)9\d{9}$/.test(normalizedPhone);
    }, "Enter a valid Philippine mobile number, such as 09171234567 or 639171234567")
    .transform((phone) => {
        if (!phone) return null;
        const normalizedPhone = phone.replace(/[ -]/g, "");
        if (normalizedPhone.startsWith("+63")) return normalizedPhone;
        if (normalizedPhone.startsWith("63")) return `+${normalizedPhone}`;
        return `+63${normalizedPhone.slice(1)}`;
    })
    .optional()
    .nullable();
const CreatePhoneSchema = z.string()
    .regex(/^[0-9]*$/, "Mobile number must contain digits only.")
    .nullable()
    .optional()
    .pipe(PhoneSchema);
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
    firstName: NamePartSchema.optional(),
    lastName: NamePartSchema,
    middleInitial: z.string().trim().regex(/^[A-Za-z]?$/).transform((value) => value.toUpperCase()).optional(),
    suffix: z.string().trim().max(20).optional(),
    username: z.string().trim().min(3).max(50).regex(/^[a-zA-Z0-9._-]+$/, "Use letters, numbers, dots, underscores, or hyphens"),
    email: OptionalEmailSchema,
    role: RoleEnum.default("MEMBER"),
    phone: CreatePhoneSchema,
    isActive: z.boolean().default(true),
    team_id: z.string().uuid("Select a team for this user."),
})

export const UpdateUserSchema = z.object({
    password: OptionalPasswordSchema,
    pin: ReportPinSchema.optional(),
    name: z.string().trim().min(1).max(200).optional(),
    firstName: NamePartSchema.optional(),
    lastName: z.union([NamePartSchema, z.literal("")]).optional(),
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
    firstName: NamePartSchema,
    lastName: NamePartSchema,
    username: z.string().trim().min(3).max(50).regex(/^[a-zA-Z0-9._-]+$/, "Use letters, numbers, dots, underscores, or hyphens"),
    email: OptionalEmailSchema,
    phone: PhoneSchema,
});

export const ResetPasswordSchema = z.object({
    newPassword: z.string().min(8).max(64)
})

export const UserIdParamSchema = z.object({
    id: z.string().uuid()
})
