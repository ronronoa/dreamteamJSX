import type { CreateOperationSchema, CreateTeamSchema, OperationIdParamSchema, OperationImageSchema, OperationResponderSchema, OperatioStatusSchema, PersonInvolvedSchema, TeamIdParamSchema, UpdateOperationSchema, UpdateTeamSchema } from "@/schemas/operation.schema";
import type { z } from "zod";
export type CreateOperationInput = z.infer<typeof CreateOperationSchema>;
export type UpdateOperationInput = z.infer<typeof UpdateOperationSchema>;
export type OperationIdParam = z.infer<typeof OperationIdParamSchema>;
export type OperationStatusInput = z.infer<typeof OperatioStatusSchema>;
export type CreateTeamInput = z.infer<typeof CreateTeamSchema>;
export type UpdateTeamInput = z.infer<typeof UpdateTeamSchema>;
export type TeamIdParam = z.infer<typeof TeamIdParamSchema>;
export type PersonInvolvedInput = z.infer<typeof PersonInvolvedSchema>;
export type OperationResponderInput = z.infer<typeof OperationResponderSchema>;
export type OperationImageInput = z.infer<typeof OperationImageSchema>;
//# sourceMappingURL=operation.types.d.ts.map