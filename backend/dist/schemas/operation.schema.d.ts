import { z } from "zod";
export declare const CreateTeamSchema: z.ZodObject<{
    team_name: z.ZodString;
}, z.core.$strip>;
export declare const UpdateTeamSchema: z.ZodObject<{
    team_name: z.ZodString;
}, z.core.$strip>;
export declare const TeamIdParamSchema: z.ZodObject<{
    id: z.ZodUUID;
}, z.core.$strip>;
export declare const PersonInvolvedSchema: z.ZodObject<{
    full_name: z.ZodString;
    age: z.ZodNumber;
    sex: z.ZodEnum<{
        FEMALE: "FEMALE";
        MALE: "MALE";
    }>;
    contact_no: z.ZodNullable<z.ZodString>;
    address: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
export declare const PersonInvolvedIdSchema: z.ZodObject<{
    person_id: z.ZodUUID;
}, z.core.$strip>;
export declare const OperationResponderSchema: z.ZodObject<{
    user_id: z.ZodUUID;
}, z.core.$strip>;
export declare const CreateOperationSchema: z.ZodObject<{
    team_id: z.ZodUUID;
    operation_date: z.ZodISODateTime;
    name_of_caller: z.ZodString;
    nature_of_operation: z.ZodString;
    event_description: z.ZodString;
    persons_involved: z.ZodOptional<z.ZodArray<z.ZodObject<{
        full_name: z.ZodString;
        age: z.ZodNumber;
        sex: z.ZodEnum<{
            FEMALE: "FEMALE";
            MALE: "MALE";
        }>;
        contact_no: z.ZodNullable<z.ZodString>;
        address: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>>>;
    responder_ids: z.ZodOptional<z.ZodArray<z.ZodUUID>>;
}, z.core.$strip>;
export declare const UpdateOperationSchema: z.ZodObject<{
    team_id: z.ZodOptional<z.ZodUUID>;
    operation_date: z.ZodOptional<z.ZodISODateTime>;
    name_of_caller: z.ZodOptional<z.ZodString>;
    nature_of_operation: z.ZodOptional<z.ZodString>;
    event_description: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const OperationIdParamSchema: z.ZodObject<{
    id: z.ZodUUID;
}, z.core.$strip>;
export declare const OperatioStatusSchema: z.ZodObject<{
    status: z.ZodEnum<{
        ARCHIVED: "ARCHIVED";
        PENDING: "PENDING";
        REJECTED: "REJECTED";
        VALIDATED: "VALIDATED";
    }>;
}, z.core.$strip>;
export declare const OperationImageSchema: z.ZodObject<{
    image_url: z.ZodURL;
    file_type: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const OperationImageIdParamSchema: z.ZodObject<{
    id: z.ZodUUID;
    attachmentId: z.ZodUUID;
}, z.core.$strip>;
//# sourceMappingURL=operation.schema.d.ts.map