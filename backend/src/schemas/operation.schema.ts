import { z } from "zod"

const OperationStatusEnum = z.enum(["PENDING", "VALIDATED", "REJECTED", "ARCHIVED"])
const GenderEnum = z.enum(["MALE", "FEMALE"])

export const CreateTeamSchema = z.object({
    team_name: z.string().min(1).max(100)
})

export const UpdateTeamSchema = z.object({
    team_name: z.string().min(1).max(100)
})

export const TeamIdParamSchema = z.object({
    id: z.uuid()
})

export const PersonInvolvedSchema = z.object({
    full_name: z.string().min(1).max(100),
    age: z.number().int().min(0).max(150),
    sex: GenderEnum,
    contact_no: z.string().max(20).nullable(),
    address: z.string().max(200).nullable()
})

export const PersonInvolvedIdSchema = z.object({
    person_id: z.uuid()
})

export const OperationResponderSchema = z.object({
    user_id: z.uuid()
})

export const CreateOperationSchema = z.object({
    team_id: z.uuid(),
    operation_date: z.iso.datetime(),
    name_of_caller: z.string().min(1).max(100),
    nature_of_operation: z.string().min(1).max(100),
    event_description: z.string().min(1),
    persons_involved: PersonInvolvedSchema.array().optional(),
    responder_ids: z.array(z.uuid()).optional()
})

export const UpdateOperationSchema = z.object({
    team_id: z.uuid().optional(),
    operation_date: z.iso.datetime().optional(),
    name_of_caller: z.string().min(1).max(100).optional(),
    nature_of_operation: z.string().min(1).max(100).optional(),
    event_description: z.string().min(1).optional()
})

export const OperationIdParamSchema = z.object({
    id: z.uuid()
})

export const OperatioStatusSchema = z.object({
    status: OperationStatusEnum
})

export const SetOperationStatusSchema = z.object({
    status: z.enum(["VALIDATED", "REJECTED"])
})

export const OperationImageSchema = z.object({
    image_url: z.url(),
    file_type: z.string().max(50).nullable()
})

export const OperationImageIdParamSchema = z.object({
    id: z.uuid(),
    attachmentId: z.uuid()
})


