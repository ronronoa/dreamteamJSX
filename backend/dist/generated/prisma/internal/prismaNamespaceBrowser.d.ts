import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: 'User';
    readonly RefreshToken: 'RefreshToken';
    readonly ResponseTeam: 'ResponseTeam';
    readonly OperationLog: 'OperationLog';
    readonly OperationResponder: 'OperationResponder';
    readonly PersonsInvolved: 'PersonsInvolved';
    readonly Vehicle: 'Vehicle';
    readonly InventoryItem: 'InventoryItem';
    readonly InventoryTransaction: 'InventoryTransaction';
    readonly OperationInventory: 'OperationInventory';
    readonly OperationLogEdit: 'OperationLogEdit';
    readonly OperationLogArchive: 'OperationLogArchive';
    readonly InventoryArchive: 'InventoryArchive';
    readonly Patient: 'Patient';
    readonly PatientLog: 'PatientLog';
    readonly PatientResponder: 'PatientResponder';
    readonly VehicularDispatch: 'VehicularDispatch';
    readonly VehicularDispatchResponder: 'VehicularDispatchResponder';
    readonly CivilianPassenger: 'CivilianPassenger';
    readonly OperationImageAttachment: 'OperationImageAttachment';
    readonly PatientImageAttachment: 'PatientImageAttachment';
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: 'ReadUncommitted';
    readonly ReadCommitted: 'ReadCommitted';
    readonly RepeatableRead: 'RepeatableRead';
    readonly Serializable: 'Serializable';
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly user_id: 'user_id';
    readonly name: 'name';
    readonly username: 'username';
    readonly passwordHash: 'passwordHash';
    readonly pinHash: 'pinHash';
    readonly pinFailedAttempts: 'pinFailedAttempts';
    readonly pinLockedUntil: 'pinLockedUntil';
    readonly role: 'role';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const RefreshTokenScalarFieldEnum: {
    readonly id: 'id';
    readonly tokenHash: 'tokenHash';
    readonly userId: 'userId';
    readonly expiresAt: 'expiresAt';
    readonly createdAt: 'createdAt';
};
export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum];
export declare const ResponseTeamScalarFieldEnum: {
    readonly team_id: 'team_id';
    readonly team_name: 'team_name';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type ResponseTeamScalarFieldEnum = (typeof ResponseTeamScalarFieldEnum)[keyof typeof ResponseTeamScalarFieldEnum];
export declare const OperationLogScalarFieldEnum: {
    readonly operation_id: 'operation_id';
    readonly team_id: 'team_id';
    readonly operation_date: 'operation_date';
    readonly name_of_caller: 'name_of_caller';
    readonly nature_of_operation: 'nature_of_operation';
    readonly event_description: 'event_description';
    readonly submitted_by: 'submitted_by';
    readonly validated_by: 'validated_by';
    readonly status: 'status';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type OperationLogScalarFieldEnum = (typeof OperationLogScalarFieldEnum)[keyof typeof OperationLogScalarFieldEnum];
export declare const OperationResponderScalarFieldEnum: {
    readonly operation_id: 'operation_id';
    readonly user_id: 'user_id';
};
export type OperationResponderScalarFieldEnum = (typeof OperationResponderScalarFieldEnum)[keyof typeof OperationResponderScalarFieldEnum];
export declare const PersonsInvolvedScalarFieldEnum: {
    readonly person_id: 'person_id';
    readonly operation_id: 'operation_id';
    readonly full_name: 'full_name';
    readonly age: 'age';
    readonly sex: 'sex';
    readonly contact_no: 'contact_no';
    readonly address: 'address';
};
export type PersonsInvolvedScalarFieldEnum = (typeof PersonsInvolvedScalarFieldEnum)[keyof typeof PersonsInvolvedScalarFieldEnum];
export declare const VehicleScalarFieldEnum: {
    readonly vehicle_id: 'vehicle_id';
    readonly vehicle_name: 'vehicle_name';
    readonly plate_number: 'plate_number';
    readonly status: 'status';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type VehicleScalarFieldEnum = (typeof VehicleScalarFieldEnum)[keyof typeof VehicleScalarFieldEnum];
export declare const InventoryItemScalarFieldEnum: {
    readonly item_id: 'item_id';
    readonly item_name: 'item_name';
    readonly category: 'category';
    readonly unit: 'unit';
    readonly stock_quantity: 'stock_quantity';
    readonly stock_type: 'stock_type';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type InventoryItemScalarFieldEnum = (typeof InventoryItemScalarFieldEnum)[keyof typeof InventoryItemScalarFieldEnum];
export declare const InventoryTransactionScalarFieldEnum: {
    readonly transaction_id: 'transaction_id';
    readonly item_id: 'item_id';
    readonly user_id: 'user_id';
    readonly transaction_type: 'transaction_type';
    readonly quantity: 'quantity';
    readonly transaction_date: 'transaction_date';
};
export type InventoryTransactionScalarFieldEnum = (typeof InventoryTransactionScalarFieldEnum)[keyof typeof InventoryTransactionScalarFieldEnum];
export declare const OperationInventoryScalarFieldEnum: {
    readonly operation_id: 'operation_id';
    readonly item_id: 'item_id';
    readonly quantity: 'quantity';
};
export type OperationInventoryScalarFieldEnum = (typeof OperationInventoryScalarFieldEnum)[keyof typeof OperationInventoryScalarFieldEnum];
export declare const OperationLogEditScalarFieldEnum: {
    readonly edit_id: 'edit_id';
    readonly operation_id: 'operation_id';
    readonly admin_id: 'admin_id';
    readonly edit_notes: 'edit_notes';
    readonly editedAt: 'editedAt';
};
export type OperationLogEditScalarFieldEnum = (typeof OperationLogEditScalarFieldEnum)[keyof typeof OperationLogEditScalarFieldEnum];
export declare const OperationLogArchiveScalarFieldEnum: {
    readonly archive_id: 'archive_id';
    readonly operation_id: 'operation_id';
    readonly archived_by: 'archived_by';
    readonly archivedAt: 'archivedAt';
};
export type OperationLogArchiveScalarFieldEnum = (typeof OperationLogArchiveScalarFieldEnum)[keyof typeof OperationLogArchiveScalarFieldEnum];
export declare const InventoryArchiveScalarFieldEnum: {
    readonly archive_id: 'archive_id';
    readonly item_id: 'item_id';
    readonly archived_by: 'archived_by';
    readonly archivedAt: 'archivedAt';
};
export type InventoryArchiveScalarFieldEnum = (typeof InventoryArchiveScalarFieldEnum)[keyof typeof InventoryArchiveScalarFieldEnum];
export declare const PatientScalarFieldEnum: {
    readonly patient_id: 'patient_id';
    readonly full_name: 'full_name';
    readonly birthday: 'birthday';
    readonly sex: 'sex';
    readonly contact_person: 'contact_person';
    readonly contact_number: 'contact_number';
    readonly phase: 'phase';
    readonly package: 'package';
    readonly block: 'block';
    readonly lot: 'lot';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type PatientScalarFieldEnum = (typeof PatientScalarFieldEnum)[keyof typeof PatientScalarFieldEnum];
export declare const PatientLogScalarFieldEnum: {
    readonly patient_log_id: 'patient_log_id';
    readonly patient_id: 'patient_id';
    readonly log_date: 'log_date';
    readonly type_of_request: 'type_of_request';
    readonly submitted_by: 'submitted_by';
    readonly name_of_caller: 'name_of_caller';
    readonly bp: 'bp';
    readonly pr: 'pr';
    readonly spo2: 'spo2';
    readonly temp: 'temp';
    readonly medical_assessment: 'medical_assessment';
    readonly hospital_name: 'hospital_name';
    readonly hospital_representative: 'hospital_representative';
    readonly hospital_in_time: 'hospital_in_time';
    readonly hospital_out_time: 'hospital_out_time';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type PatientLogScalarFieldEnum = (typeof PatientLogScalarFieldEnum)[keyof typeof PatientLogScalarFieldEnum];
export declare const PatientResponderScalarFieldEnum: {
    readonly patient_log_id: 'patient_log_id';
    readonly user_id: 'user_id';
};
export type PatientResponderScalarFieldEnum = (typeof PatientResponderScalarFieldEnum)[keyof typeof PatientResponderScalarFieldEnum];
export declare const VehicularDispatchScalarFieldEnum: {
    readonly dispatch_id: 'dispatch_id';
    readonly operation_id: 'operation_id';
    readonly patient_log_id: 'patient_log_id';
    readonly dispatch_date: 'dispatch_date';
    readonly submitted_by: 'submitted_by';
    readonly vehicle_id: 'vehicle_id';
    readonly driver_id: 'driver_id';
    readonly depart_time: 'depart_time';
    readonly arrival_time: 'arrival_time';
    readonly brgy_in_time: 'brgy_in_time';
    readonly brgy_out_time: 'brgy_out_time';
    readonly dispatch_type: 'dispatch_type';
    readonly from_location: 'from_location';
    readonly to_location: 'to_location';
    readonly odometer_in: 'odometer_in';
    readonly odometer_out: 'odometer_out';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type VehicularDispatchScalarFieldEnum = (typeof VehicularDispatchScalarFieldEnum)[keyof typeof VehicularDispatchScalarFieldEnum];
export declare const VehicularDispatchResponderScalarFieldEnum: {
    readonly dispatch_id: 'dispatch_id';
    readonly user_id: 'user_id';
};
export type VehicularDispatchResponderScalarFieldEnum = (typeof VehicularDispatchResponderScalarFieldEnum)[keyof typeof VehicularDispatchResponderScalarFieldEnum];
export declare const CivilianPassengerScalarFieldEnum: {
    readonly passenger_id: 'passenger_id';
    readonly dispatch_id: 'dispatch_id';
    readonly full_name: 'full_name';
    readonly age: 'age';
    readonly sex: 'sex';
    readonly contact_no: 'contact_no';
    readonly barangay: 'barangay';
    readonly address: 'address';
};
export type CivilianPassengerScalarFieldEnum = (typeof CivilianPassengerScalarFieldEnum)[keyof typeof CivilianPassengerScalarFieldEnum];
export declare const OperationImageAttachmentScalarFieldEnum: {
    readonly attachment_id: 'attachment_id';
    readonly operation_id: 'operation_id';
    readonly image_url: 'image_url';
    readonly file_type: 'file_type';
    readonly uploaded_by: 'uploaded_by';
    readonly uploadedAt: 'uploadedAt';
};
export type OperationImageAttachmentScalarFieldEnum = (typeof OperationImageAttachmentScalarFieldEnum)[keyof typeof OperationImageAttachmentScalarFieldEnum];
export declare const PatientImageAttachmentScalarFieldEnum: {
    readonly attachment_id: 'attachment_id';
    readonly patient_id: 'patient_id';
    readonly image_url: 'image_url';
    readonly file_type: 'file_type';
    readonly uploaded_by: 'uploaded_by';
    readonly uploadedAt: 'uploadedAt';
};
export type PatientImageAttachmentScalarFieldEnum = (typeof PatientImageAttachmentScalarFieldEnum)[keyof typeof PatientImageAttachmentScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: 'asc';
    readonly desc: 'desc';
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: 'default';
    readonly insensitive: 'insensitive';
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: 'first';
    readonly last: 'last';
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map