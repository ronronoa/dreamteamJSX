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



// ===============

const genderSchema = z.enum(["Male", "Female", ""])

const personNameSchema = z.object({
  surname: z.string(),
  firstName: z.string(),
  middleInitial: z.string(),
  suffix: z.string(),
})

const personAddressSchema = z.object({
  phase: z.string(),
  package: z.string(),
  block: z.string(),
  lot: z.string(),
})

const operationDetailsSchema = z.object({
  submitterName: z.string(),
  date: z.string(),
  natureOfOperation: z.string(),
  nameOfCaller: personNameSchema,
  teamAssigned: z.array(z.string()),
  responders: z.array(z.string()),
})

const vehicularDispatchSchema = z.object({
  from: z.string(),
  to: z.string(),
  vehicle: z.string(),
  driver: z.string(),
  departTime: z.string(),
  departPeriod: z.enum(["AM", "PM"]),
  arrivalTime: z.string(),
  arrivalPeriod: z.enum(["AM", "PM"]),
  odometerIn: z.string(),
  odometerOut: z.string(),
})

const personSchema = z.object({
  id: z.string(),
  name: personNameSchema,
  birthdate: z.string(),
  age: z.union([z.number(), z.literal("")]),
  gender: genderSchema,
  contactNumber: z.string(),
  address: personAddressSchema,
})

const inventoryItemSchema = z.object({
  id: z.string(),
  itemName: z.string(),
  quantity: z.string(),
})

export const operationLogsFormSchema = z.object({
  pin: z.number(),
  operationDetails: operationDetailsSchema,
  vehicularDispatch: vehicularDispatchSchema,
  peopleInvolved: z.array(personSchema), 
  operationDescription: z.string(),
  inventory: z.array(inventoryItemSchema),
  files: z.any().optional(),
})

export type OperationLogsFormType = z.infer<typeof operationLogsFormSchema>;
