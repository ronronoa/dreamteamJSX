import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model User
 *
 */
export type UserModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _avg: UserAvgAggregateOutputType | null;
    _sum: UserSumAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type UserAvgAggregateOutputType = {
    pinFailedAttempts: number | null;
};
export type UserSumAggregateOutputType = {
    pinFailedAttempts: number | null;
};
export type UserMinAggregateOutputType = {
    user_id: string | null;
    name: string | null;
    username: string | null;
    passwordHash: string | null;
    pinHash: string | null;
    pinFailedAttempts: number | null;
    pinLockedUntil: Date | null;
    role: $Enums.Role | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserMaxAggregateOutputType = {
    user_id: string | null;
    name: string | null;
    username: string | null;
    passwordHash: string | null;
    pinHash: string | null;
    pinFailedAttempts: number | null;
    pinLockedUntil: Date | null;
    role: $Enums.Role | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserCountAggregateOutputType = {
    user_id: number;
    name: number;
    username: number;
    passwordHash: number;
    pinHash: number;
    pinFailedAttempts: number;
    pinLockedUntil: number;
    role: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type UserAvgAggregateInputType = {
    pinFailedAttempts?: true;
};
export type UserSumAggregateInputType = {
    pinFailedAttempts?: true;
};
export type UserMinAggregateInputType = {
    user_id?: true;
    name?: true;
    username?: true;
    passwordHash?: true;
    pinHash?: true;
    pinFailedAttempts?: true;
    pinLockedUntil?: true;
    role?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserMaxAggregateInputType = {
    user_id?: true;
    name?: true;
    username?: true;
    passwordHash?: true;
    pinHash?: true;
    pinFailedAttempts?: true;
    pinLockedUntil?: true;
    role?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserCountAggregateInputType = {
    user_id?: true;
    name?: true;
    username?: true;
    passwordHash?: true;
    pinHash?: true;
    pinFailedAttempts?: true;
    pinLockedUntil?: true;
    role?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType;
};
export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser[P]> : Prisma.GetScalarType<T[P], AggregateUser[P]>;
};
export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithAggregationInput | Prisma.UserOrderByWithAggregationInput[];
    by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum;
    having?: Prisma.UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _avg?: UserAvgAggregateInputType;
    _sum?: UserSumAggregateInputType;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type UserGroupByOutputType = {
    user_id: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash: string | null;
    pinFailedAttempts: number;
    pinLockedUntil: Date | null;
    role: $Enums.Role;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _avg: UserAvgAggregateOutputType | null;
    _sum: UserSumAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>;
}>>;
export type UserWhereInput = {
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    user_id?: Prisma.StringFilter<"User"> | string;
    name?: Prisma.StringFilter<"User"> | string;
    username?: Prisma.StringFilter<"User"> | string;
    passwordHash?: Prisma.StringFilter<"User"> | string;
    pinHash?: Prisma.StringNullableFilter<"User"> | string | null;
    pinFailedAttempts?: Prisma.IntFilter<"User"> | number;
    pinLockedUntil?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    role?: Prisma.EnumRoleFilter<"User"> | $Enums.Role;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    refreshTokens?: Prisma.RefreshTokenListRelationFilter;
    submittedOperations?: Prisma.OperationLogListRelationFilter;
    validatedOperations?: Prisma.OperationLogListRelationFilter;
    drivenDispatches?: Prisma.VehicularDispatchListRelationFilter;
    submittedDispatches?: Prisma.VehicularDispatchListRelationFilter;
    operationResponders?: Prisma.OperationResponderListRelationFilter;
    patientResponders?: Prisma.PatientResponderListRelationFilter;
    dispatchResponders?: Prisma.VehicularDispatchResponderListRelationFilter;
    inventoryTransactions?: Prisma.InventoryTransactionListRelationFilter;
    operationEdits?: Prisma.OperationLogEditListRelationFilter;
    operationArchives?: Prisma.OperationLogArchiveListRelationFilter;
    inventoryArchives?: Prisma.InventoryArchiveListRelationFilter;
    submittedPatients?: Prisma.PatientLogListRelationFilter;
    operationImages?: Prisma.OperationImageAttachmentListRelationFilter;
    patientImages?: Prisma.PatientImageAttachmentListRelationFilter;
};
export type UserOrderByWithRelationInput = {
    user_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    pinHash?: Prisma.SortOrderInput | Prisma.SortOrder;
    pinFailedAttempts?: Prisma.SortOrder;
    pinLockedUntil?: Prisma.SortOrderInput | Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    refreshTokens?: Prisma.RefreshTokenOrderByRelationAggregateInput;
    submittedOperations?: Prisma.OperationLogOrderByRelationAggregateInput;
    validatedOperations?: Prisma.OperationLogOrderByRelationAggregateInput;
    drivenDispatches?: Prisma.VehicularDispatchOrderByRelationAggregateInput;
    submittedDispatches?: Prisma.VehicularDispatchOrderByRelationAggregateInput;
    operationResponders?: Prisma.OperationResponderOrderByRelationAggregateInput;
    patientResponders?: Prisma.PatientResponderOrderByRelationAggregateInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderOrderByRelationAggregateInput;
    inventoryTransactions?: Prisma.InventoryTransactionOrderByRelationAggregateInput;
    operationEdits?: Prisma.OperationLogEditOrderByRelationAggregateInput;
    operationArchives?: Prisma.OperationLogArchiveOrderByRelationAggregateInput;
    inventoryArchives?: Prisma.InventoryArchiveOrderByRelationAggregateInput;
    submittedPatients?: Prisma.PatientLogOrderByRelationAggregateInput;
    operationImages?: Prisma.OperationImageAttachmentOrderByRelationAggregateInput;
    patientImages?: Prisma.PatientImageAttachmentOrderByRelationAggregateInput;
};
export type UserWhereUniqueInput = Prisma.AtLeast<{
    user_id?: string;
    username?: string;
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    name?: Prisma.StringFilter<"User"> | string;
    passwordHash?: Prisma.StringFilter<"User"> | string;
    pinHash?: Prisma.StringNullableFilter<"User"> | string | null;
    pinFailedAttempts?: Prisma.IntFilter<"User"> | number;
    pinLockedUntil?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    role?: Prisma.EnumRoleFilter<"User"> | $Enums.Role;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    refreshTokens?: Prisma.RefreshTokenListRelationFilter;
    submittedOperations?: Prisma.OperationLogListRelationFilter;
    validatedOperations?: Prisma.OperationLogListRelationFilter;
    drivenDispatches?: Prisma.VehicularDispatchListRelationFilter;
    submittedDispatches?: Prisma.VehicularDispatchListRelationFilter;
    operationResponders?: Prisma.OperationResponderListRelationFilter;
    patientResponders?: Prisma.PatientResponderListRelationFilter;
    dispatchResponders?: Prisma.VehicularDispatchResponderListRelationFilter;
    inventoryTransactions?: Prisma.InventoryTransactionListRelationFilter;
    operationEdits?: Prisma.OperationLogEditListRelationFilter;
    operationArchives?: Prisma.OperationLogArchiveListRelationFilter;
    inventoryArchives?: Prisma.InventoryArchiveListRelationFilter;
    submittedPatients?: Prisma.PatientLogListRelationFilter;
    operationImages?: Prisma.OperationImageAttachmentListRelationFilter;
    patientImages?: Prisma.PatientImageAttachmentListRelationFilter;
}, "user_id" | "username">;
export type UserOrderByWithAggregationInput = {
    user_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    pinHash?: Prisma.SortOrderInput | Prisma.SortOrder;
    pinFailedAttempts?: Prisma.SortOrder;
    pinLockedUntil?: Prisma.SortOrderInput | Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserCountOrderByAggregateInput;
    _avg?: Prisma.UserAvgOrderByAggregateInput;
    _max?: Prisma.UserMaxOrderByAggregateInput;
    _min?: Prisma.UserMinOrderByAggregateInput;
    _sum?: Prisma.UserSumOrderByAggregateInput;
};
export type UserScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    user_id?: Prisma.StringWithAggregatesFilter<"User"> | string;
    name?: Prisma.StringWithAggregatesFilter<"User"> | string;
    username?: Prisma.StringWithAggregatesFilter<"User"> | string;
    passwordHash?: Prisma.StringWithAggregatesFilter<"User"> | string;
    pinHash?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    pinFailedAttempts?: Prisma.IntWithAggregatesFilter<"User"> | number;
    pinLockedUntil?: Prisma.DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null;
    role?: Prisma.EnumRoleWithAggregatesFilter<"User"> | $Enums.Role;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
};
export type UserCreateInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    submittedOperations?: Prisma.OperationLogCreateNestedManyWithoutSubmitterInput;
    validatedOperations?: Prisma.OperationLogCreateNestedManyWithoutValidatorInput;
    drivenDispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutDriverInput;
    submittedDispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutSubmitterInput;
    operationResponders?: Prisma.OperationResponderCreateNestedManyWithoutUserInput;
    patientResponders?: Prisma.PatientResponderCreateNestedManyWithoutUserInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderCreateNestedManyWithoutUserInput;
    inventoryTransactions?: Prisma.InventoryTransactionCreateNestedManyWithoutUserInput;
    operationEdits?: Prisma.OperationLogEditCreateNestedManyWithoutAdminInput;
    operationArchives?: Prisma.OperationLogArchiveCreateNestedManyWithoutArchiverInput;
    inventoryArchives?: Prisma.InventoryArchiveCreateNestedManyWithoutArchiverInput;
    submittedPatients?: Prisma.PatientLogCreateNestedManyWithoutSubmitterInput;
    operationImages?: Prisma.OperationImageAttachmentCreateNestedManyWithoutUploaderInput;
    patientImages?: Prisma.PatientImageAttachmentCreateNestedManyWithoutUploaderInput;
};
export type UserUncheckedCreateInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    submittedOperations?: Prisma.OperationLogUncheckedCreateNestedManyWithoutSubmitterInput;
    validatedOperations?: Prisma.OperationLogUncheckedCreateNestedManyWithoutValidatorInput;
    drivenDispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutDriverInput;
    submittedDispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutSubmitterInput;
    operationResponders?: Prisma.OperationResponderUncheckedCreateNestedManyWithoutUserInput;
    patientResponders?: Prisma.PatientResponderUncheckedCreateNestedManyWithoutUserInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUncheckedCreateNestedManyWithoutUserInput;
    inventoryTransactions?: Prisma.InventoryTransactionUncheckedCreateNestedManyWithoutUserInput;
    operationEdits?: Prisma.OperationLogEditUncheckedCreateNestedManyWithoutAdminInput;
    operationArchives?: Prisma.OperationLogArchiveUncheckedCreateNestedManyWithoutArchiverInput;
    inventoryArchives?: Prisma.InventoryArchiveUncheckedCreateNestedManyWithoutArchiverInput;
    submittedPatients?: Prisma.PatientLogUncheckedCreateNestedManyWithoutSubmitterInput;
    operationImages?: Prisma.OperationImageAttachmentUncheckedCreateNestedManyWithoutUploaderInput;
    patientImages?: Prisma.PatientImageAttachmentUncheckedCreateNestedManyWithoutUploaderInput;
};
export type UserUpdateInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    submittedOperations?: Prisma.OperationLogUpdateManyWithoutSubmitterNestedInput;
    validatedOperations?: Prisma.OperationLogUpdateManyWithoutValidatorNestedInput;
    drivenDispatches?: Prisma.VehicularDispatchUpdateManyWithoutDriverNestedInput;
    submittedDispatches?: Prisma.VehicularDispatchUpdateManyWithoutSubmitterNestedInput;
    operationResponders?: Prisma.OperationResponderUpdateManyWithoutUserNestedInput;
    patientResponders?: Prisma.PatientResponderUpdateManyWithoutUserNestedInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUpdateManyWithoutUserNestedInput;
    inventoryTransactions?: Prisma.InventoryTransactionUpdateManyWithoutUserNestedInput;
    operationEdits?: Prisma.OperationLogEditUpdateManyWithoutAdminNestedInput;
    operationArchives?: Prisma.OperationLogArchiveUpdateManyWithoutArchiverNestedInput;
    inventoryArchives?: Prisma.InventoryArchiveUpdateManyWithoutArchiverNestedInput;
    submittedPatients?: Prisma.PatientLogUpdateManyWithoutSubmitterNestedInput;
    operationImages?: Prisma.OperationImageAttachmentUpdateManyWithoutUploaderNestedInput;
    patientImages?: Prisma.PatientImageAttachmentUpdateManyWithoutUploaderNestedInput;
};
export type UserUncheckedUpdateInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    submittedOperations?: Prisma.OperationLogUncheckedUpdateManyWithoutSubmitterNestedInput;
    validatedOperations?: Prisma.OperationLogUncheckedUpdateManyWithoutValidatorNestedInput;
    drivenDispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutDriverNestedInput;
    submittedDispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutSubmitterNestedInput;
    operationResponders?: Prisma.OperationResponderUncheckedUpdateManyWithoutUserNestedInput;
    patientResponders?: Prisma.PatientResponderUncheckedUpdateManyWithoutUserNestedInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUncheckedUpdateManyWithoutUserNestedInput;
    inventoryTransactions?: Prisma.InventoryTransactionUncheckedUpdateManyWithoutUserNestedInput;
    operationEdits?: Prisma.OperationLogEditUncheckedUpdateManyWithoutAdminNestedInput;
    operationArchives?: Prisma.OperationLogArchiveUncheckedUpdateManyWithoutArchiverNestedInput;
    inventoryArchives?: Prisma.InventoryArchiveUncheckedUpdateManyWithoutArchiverNestedInput;
    submittedPatients?: Prisma.PatientLogUncheckedUpdateManyWithoutSubmitterNestedInput;
    operationImages?: Prisma.OperationImageAttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
    patientImages?: Prisma.PatientImageAttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
};
export type UserCreateManyInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserUpdateManyMutationInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserUncheckedUpdateManyInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserCountOrderByAggregateInput = {
    user_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    pinHash?: Prisma.SortOrder;
    pinFailedAttempts?: Prisma.SortOrder;
    pinLockedUntil?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserAvgOrderByAggregateInput = {
    pinFailedAttempts?: Prisma.SortOrder;
};
export type UserMaxOrderByAggregateInput = {
    user_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    pinHash?: Prisma.SortOrder;
    pinFailedAttempts?: Prisma.SortOrder;
    pinLockedUntil?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMinOrderByAggregateInput = {
    user_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    pinHash?: Prisma.SortOrder;
    pinFailedAttempts?: Prisma.SortOrder;
    pinLockedUntil?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserSumOrderByAggregateInput = {
    pinFailedAttempts?: Prisma.SortOrder;
};
export type UserScalarRelationFilter = {
    is?: Prisma.UserWhereInput;
    isNot?: Prisma.UserWhereInput;
};
export type UserNullableScalarRelationFilter = {
    is?: Prisma.UserWhereInput | null;
    isNot?: Prisma.UserWhereInput | null;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type UserCreateNestedOneWithoutRefreshTokensInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRefreshTokensInput, Prisma.UserUncheckedCreateWithoutRefreshTokensInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRefreshTokensInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutRefreshTokensNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRefreshTokensInput, Prisma.UserUncheckedCreateWithoutRefreshTokensInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRefreshTokensInput;
    upsert?: Prisma.UserUpsertWithoutRefreshTokensInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutRefreshTokensInput, Prisma.UserUpdateWithoutRefreshTokensInput>, Prisma.UserUncheckedUpdateWithoutRefreshTokensInput>;
};
export type UserCreateNestedOneWithoutSubmittedOperationsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSubmittedOperationsInput, Prisma.UserUncheckedCreateWithoutSubmittedOperationsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSubmittedOperationsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserCreateNestedOneWithoutValidatedOperationsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutValidatedOperationsInput, Prisma.UserUncheckedCreateWithoutValidatedOperationsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutValidatedOperationsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutSubmittedOperationsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSubmittedOperationsInput, Prisma.UserUncheckedCreateWithoutSubmittedOperationsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSubmittedOperationsInput;
    upsert?: Prisma.UserUpsertWithoutSubmittedOperationsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutSubmittedOperationsInput, Prisma.UserUpdateWithoutSubmittedOperationsInput>, Prisma.UserUncheckedUpdateWithoutSubmittedOperationsInput>;
};
export type UserUpdateOneWithoutValidatedOperationsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutValidatedOperationsInput, Prisma.UserUncheckedCreateWithoutValidatedOperationsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutValidatedOperationsInput;
    upsert?: Prisma.UserUpsertWithoutValidatedOperationsInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutValidatedOperationsInput, Prisma.UserUpdateWithoutValidatedOperationsInput>, Prisma.UserUncheckedUpdateWithoutValidatedOperationsInput>;
};
export type UserCreateNestedOneWithoutOperationRespondersInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOperationRespondersInput, Prisma.UserUncheckedCreateWithoutOperationRespondersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOperationRespondersInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutOperationRespondersNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOperationRespondersInput, Prisma.UserUncheckedCreateWithoutOperationRespondersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOperationRespondersInput;
    upsert?: Prisma.UserUpsertWithoutOperationRespondersInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutOperationRespondersInput, Prisma.UserUpdateWithoutOperationRespondersInput>, Prisma.UserUncheckedUpdateWithoutOperationRespondersInput>;
};
export type UserCreateNestedOneWithoutInventoryTransactionsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutInventoryTransactionsInput, Prisma.UserUncheckedCreateWithoutInventoryTransactionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutInventoryTransactionsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutInventoryTransactionsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutInventoryTransactionsInput, Prisma.UserUncheckedCreateWithoutInventoryTransactionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutInventoryTransactionsInput;
    upsert?: Prisma.UserUpsertWithoutInventoryTransactionsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutInventoryTransactionsInput, Prisma.UserUpdateWithoutInventoryTransactionsInput>, Prisma.UserUncheckedUpdateWithoutInventoryTransactionsInput>;
};
export type UserCreateNestedOneWithoutOperationEditsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOperationEditsInput, Prisma.UserUncheckedCreateWithoutOperationEditsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOperationEditsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutOperationEditsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOperationEditsInput, Prisma.UserUncheckedCreateWithoutOperationEditsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOperationEditsInput;
    upsert?: Prisma.UserUpsertWithoutOperationEditsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutOperationEditsInput, Prisma.UserUpdateWithoutOperationEditsInput>, Prisma.UserUncheckedUpdateWithoutOperationEditsInput>;
};
export type UserCreateNestedOneWithoutOperationArchivesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOperationArchivesInput, Prisma.UserUncheckedCreateWithoutOperationArchivesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOperationArchivesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutOperationArchivesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOperationArchivesInput, Prisma.UserUncheckedCreateWithoutOperationArchivesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOperationArchivesInput;
    upsert?: Prisma.UserUpsertWithoutOperationArchivesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutOperationArchivesInput, Prisma.UserUpdateWithoutOperationArchivesInput>, Prisma.UserUncheckedUpdateWithoutOperationArchivesInput>;
};
export type UserCreateNestedOneWithoutInventoryArchivesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutInventoryArchivesInput, Prisma.UserUncheckedCreateWithoutInventoryArchivesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutInventoryArchivesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutInventoryArchivesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutInventoryArchivesInput, Prisma.UserUncheckedCreateWithoutInventoryArchivesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutInventoryArchivesInput;
    upsert?: Prisma.UserUpsertWithoutInventoryArchivesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutInventoryArchivesInput, Prisma.UserUpdateWithoutInventoryArchivesInput>, Prisma.UserUncheckedUpdateWithoutInventoryArchivesInput>;
};
export type UserCreateNestedOneWithoutSubmittedPatientsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSubmittedPatientsInput, Prisma.UserUncheckedCreateWithoutSubmittedPatientsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSubmittedPatientsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutSubmittedPatientsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSubmittedPatientsInput, Prisma.UserUncheckedCreateWithoutSubmittedPatientsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSubmittedPatientsInput;
    upsert?: Prisma.UserUpsertWithoutSubmittedPatientsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutSubmittedPatientsInput, Prisma.UserUpdateWithoutSubmittedPatientsInput>, Prisma.UserUncheckedUpdateWithoutSubmittedPatientsInput>;
};
export type UserCreateNestedOneWithoutPatientRespondersInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPatientRespondersInput, Prisma.UserUncheckedCreateWithoutPatientRespondersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPatientRespondersInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutPatientRespondersNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPatientRespondersInput, Prisma.UserUncheckedCreateWithoutPatientRespondersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPatientRespondersInput;
    upsert?: Prisma.UserUpsertWithoutPatientRespondersInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutPatientRespondersInput, Prisma.UserUpdateWithoutPatientRespondersInput>, Prisma.UserUncheckedUpdateWithoutPatientRespondersInput>;
};
export type UserCreateNestedOneWithoutDrivenDispatchesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutDrivenDispatchesInput, Prisma.UserUncheckedCreateWithoutDrivenDispatchesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutDrivenDispatchesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserCreateNestedOneWithoutSubmittedDispatchesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSubmittedDispatchesInput, Prisma.UserUncheckedCreateWithoutSubmittedDispatchesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSubmittedDispatchesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneWithoutDrivenDispatchesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutDrivenDispatchesInput, Prisma.UserUncheckedCreateWithoutDrivenDispatchesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutDrivenDispatchesInput;
    upsert?: Prisma.UserUpsertWithoutDrivenDispatchesInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutDrivenDispatchesInput, Prisma.UserUpdateWithoutDrivenDispatchesInput>, Prisma.UserUncheckedUpdateWithoutDrivenDispatchesInput>;
};
export type UserUpdateOneRequiredWithoutSubmittedDispatchesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSubmittedDispatchesInput, Prisma.UserUncheckedCreateWithoutSubmittedDispatchesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSubmittedDispatchesInput;
    upsert?: Prisma.UserUpsertWithoutSubmittedDispatchesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutSubmittedDispatchesInput, Prisma.UserUpdateWithoutSubmittedDispatchesInput>, Prisma.UserUncheckedUpdateWithoutSubmittedDispatchesInput>;
};
export type UserCreateNestedOneWithoutDispatchRespondersInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutDispatchRespondersInput, Prisma.UserUncheckedCreateWithoutDispatchRespondersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutDispatchRespondersInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutDispatchRespondersNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutDispatchRespondersInput, Prisma.UserUncheckedCreateWithoutDispatchRespondersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutDispatchRespondersInput;
    upsert?: Prisma.UserUpsertWithoutDispatchRespondersInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutDispatchRespondersInput, Prisma.UserUpdateWithoutDispatchRespondersInput>, Prisma.UserUncheckedUpdateWithoutDispatchRespondersInput>;
};
export type UserCreateNestedOneWithoutOperationImagesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOperationImagesInput, Prisma.UserUncheckedCreateWithoutOperationImagesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOperationImagesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutOperationImagesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOperationImagesInput, Prisma.UserUncheckedCreateWithoutOperationImagesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOperationImagesInput;
    upsert?: Prisma.UserUpsertWithoutOperationImagesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutOperationImagesInput, Prisma.UserUpdateWithoutOperationImagesInput>, Prisma.UserUncheckedUpdateWithoutOperationImagesInput>;
};
export type UserCreateNestedOneWithoutPatientImagesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPatientImagesInput, Prisma.UserUncheckedCreateWithoutPatientImagesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPatientImagesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutPatientImagesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPatientImagesInput, Prisma.UserUncheckedCreateWithoutPatientImagesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPatientImagesInput;
    upsert?: Prisma.UserUpsertWithoutPatientImagesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutPatientImagesInput, Prisma.UserUpdateWithoutPatientImagesInput>, Prisma.UserUncheckedUpdateWithoutPatientImagesInput>;
};
export type UserCreateWithoutRefreshTokensInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    submittedOperations?: Prisma.OperationLogCreateNestedManyWithoutSubmitterInput;
    validatedOperations?: Prisma.OperationLogCreateNestedManyWithoutValidatorInput;
    drivenDispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutDriverInput;
    submittedDispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutSubmitterInput;
    operationResponders?: Prisma.OperationResponderCreateNestedManyWithoutUserInput;
    patientResponders?: Prisma.PatientResponderCreateNestedManyWithoutUserInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderCreateNestedManyWithoutUserInput;
    inventoryTransactions?: Prisma.InventoryTransactionCreateNestedManyWithoutUserInput;
    operationEdits?: Prisma.OperationLogEditCreateNestedManyWithoutAdminInput;
    operationArchives?: Prisma.OperationLogArchiveCreateNestedManyWithoutArchiverInput;
    inventoryArchives?: Prisma.InventoryArchiveCreateNestedManyWithoutArchiverInput;
    submittedPatients?: Prisma.PatientLogCreateNestedManyWithoutSubmitterInput;
    operationImages?: Prisma.OperationImageAttachmentCreateNestedManyWithoutUploaderInput;
    patientImages?: Prisma.PatientImageAttachmentCreateNestedManyWithoutUploaderInput;
};
export type UserUncheckedCreateWithoutRefreshTokensInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    submittedOperations?: Prisma.OperationLogUncheckedCreateNestedManyWithoutSubmitterInput;
    validatedOperations?: Prisma.OperationLogUncheckedCreateNestedManyWithoutValidatorInput;
    drivenDispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutDriverInput;
    submittedDispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutSubmitterInput;
    operationResponders?: Prisma.OperationResponderUncheckedCreateNestedManyWithoutUserInput;
    patientResponders?: Prisma.PatientResponderUncheckedCreateNestedManyWithoutUserInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUncheckedCreateNestedManyWithoutUserInput;
    inventoryTransactions?: Prisma.InventoryTransactionUncheckedCreateNestedManyWithoutUserInput;
    operationEdits?: Prisma.OperationLogEditUncheckedCreateNestedManyWithoutAdminInput;
    operationArchives?: Prisma.OperationLogArchiveUncheckedCreateNestedManyWithoutArchiverInput;
    inventoryArchives?: Prisma.InventoryArchiveUncheckedCreateNestedManyWithoutArchiverInput;
    submittedPatients?: Prisma.PatientLogUncheckedCreateNestedManyWithoutSubmitterInput;
    operationImages?: Prisma.OperationImageAttachmentUncheckedCreateNestedManyWithoutUploaderInput;
    patientImages?: Prisma.PatientImageAttachmentUncheckedCreateNestedManyWithoutUploaderInput;
};
export type UserCreateOrConnectWithoutRefreshTokensInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutRefreshTokensInput, Prisma.UserUncheckedCreateWithoutRefreshTokensInput>;
};
export type UserUpsertWithoutRefreshTokensInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutRefreshTokensInput, Prisma.UserUncheckedUpdateWithoutRefreshTokensInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutRefreshTokensInput, Prisma.UserUncheckedCreateWithoutRefreshTokensInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutRefreshTokensInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutRefreshTokensInput, Prisma.UserUncheckedUpdateWithoutRefreshTokensInput>;
};
export type UserUpdateWithoutRefreshTokensInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submittedOperations?: Prisma.OperationLogUpdateManyWithoutSubmitterNestedInput;
    validatedOperations?: Prisma.OperationLogUpdateManyWithoutValidatorNestedInput;
    drivenDispatches?: Prisma.VehicularDispatchUpdateManyWithoutDriverNestedInput;
    submittedDispatches?: Prisma.VehicularDispatchUpdateManyWithoutSubmitterNestedInput;
    operationResponders?: Prisma.OperationResponderUpdateManyWithoutUserNestedInput;
    patientResponders?: Prisma.PatientResponderUpdateManyWithoutUserNestedInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUpdateManyWithoutUserNestedInput;
    inventoryTransactions?: Prisma.InventoryTransactionUpdateManyWithoutUserNestedInput;
    operationEdits?: Prisma.OperationLogEditUpdateManyWithoutAdminNestedInput;
    operationArchives?: Prisma.OperationLogArchiveUpdateManyWithoutArchiverNestedInput;
    inventoryArchives?: Prisma.InventoryArchiveUpdateManyWithoutArchiverNestedInput;
    submittedPatients?: Prisma.PatientLogUpdateManyWithoutSubmitterNestedInput;
    operationImages?: Prisma.OperationImageAttachmentUpdateManyWithoutUploaderNestedInput;
    patientImages?: Prisma.PatientImageAttachmentUpdateManyWithoutUploaderNestedInput;
};
export type UserUncheckedUpdateWithoutRefreshTokensInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submittedOperations?: Prisma.OperationLogUncheckedUpdateManyWithoutSubmitterNestedInput;
    validatedOperations?: Prisma.OperationLogUncheckedUpdateManyWithoutValidatorNestedInput;
    drivenDispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutDriverNestedInput;
    submittedDispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutSubmitterNestedInput;
    operationResponders?: Prisma.OperationResponderUncheckedUpdateManyWithoutUserNestedInput;
    patientResponders?: Prisma.PatientResponderUncheckedUpdateManyWithoutUserNestedInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUncheckedUpdateManyWithoutUserNestedInput;
    inventoryTransactions?: Prisma.InventoryTransactionUncheckedUpdateManyWithoutUserNestedInput;
    operationEdits?: Prisma.OperationLogEditUncheckedUpdateManyWithoutAdminNestedInput;
    operationArchives?: Prisma.OperationLogArchiveUncheckedUpdateManyWithoutArchiverNestedInput;
    inventoryArchives?: Prisma.InventoryArchiveUncheckedUpdateManyWithoutArchiverNestedInput;
    submittedPatients?: Prisma.PatientLogUncheckedUpdateManyWithoutSubmitterNestedInput;
    operationImages?: Prisma.OperationImageAttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
    patientImages?: Prisma.PatientImageAttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
};
export type UserCreateWithoutSubmittedOperationsInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    validatedOperations?: Prisma.OperationLogCreateNestedManyWithoutValidatorInput;
    drivenDispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutDriverInput;
    submittedDispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutSubmitterInput;
    operationResponders?: Prisma.OperationResponderCreateNestedManyWithoutUserInput;
    patientResponders?: Prisma.PatientResponderCreateNestedManyWithoutUserInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderCreateNestedManyWithoutUserInput;
    inventoryTransactions?: Prisma.InventoryTransactionCreateNestedManyWithoutUserInput;
    operationEdits?: Prisma.OperationLogEditCreateNestedManyWithoutAdminInput;
    operationArchives?: Prisma.OperationLogArchiveCreateNestedManyWithoutArchiverInput;
    inventoryArchives?: Prisma.InventoryArchiveCreateNestedManyWithoutArchiverInput;
    submittedPatients?: Prisma.PatientLogCreateNestedManyWithoutSubmitterInput;
    operationImages?: Prisma.OperationImageAttachmentCreateNestedManyWithoutUploaderInput;
    patientImages?: Prisma.PatientImageAttachmentCreateNestedManyWithoutUploaderInput;
};
export type UserUncheckedCreateWithoutSubmittedOperationsInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    validatedOperations?: Prisma.OperationLogUncheckedCreateNestedManyWithoutValidatorInput;
    drivenDispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutDriverInput;
    submittedDispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutSubmitterInput;
    operationResponders?: Prisma.OperationResponderUncheckedCreateNestedManyWithoutUserInput;
    patientResponders?: Prisma.PatientResponderUncheckedCreateNestedManyWithoutUserInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUncheckedCreateNestedManyWithoutUserInput;
    inventoryTransactions?: Prisma.InventoryTransactionUncheckedCreateNestedManyWithoutUserInput;
    operationEdits?: Prisma.OperationLogEditUncheckedCreateNestedManyWithoutAdminInput;
    operationArchives?: Prisma.OperationLogArchiveUncheckedCreateNestedManyWithoutArchiverInput;
    inventoryArchives?: Prisma.InventoryArchiveUncheckedCreateNestedManyWithoutArchiverInput;
    submittedPatients?: Prisma.PatientLogUncheckedCreateNestedManyWithoutSubmitterInput;
    operationImages?: Prisma.OperationImageAttachmentUncheckedCreateNestedManyWithoutUploaderInput;
    patientImages?: Prisma.PatientImageAttachmentUncheckedCreateNestedManyWithoutUploaderInput;
};
export type UserCreateOrConnectWithoutSubmittedOperationsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutSubmittedOperationsInput, Prisma.UserUncheckedCreateWithoutSubmittedOperationsInput>;
};
export type UserCreateWithoutValidatedOperationsInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    submittedOperations?: Prisma.OperationLogCreateNestedManyWithoutSubmitterInput;
    drivenDispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutDriverInput;
    submittedDispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutSubmitterInput;
    operationResponders?: Prisma.OperationResponderCreateNestedManyWithoutUserInput;
    patientResponders?: Prisma.PatientResponderCreateNestedManyWithoutUserInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderCreateNestedManyWithoutUserInput;
    inventoryTransactions?: Prisma.InventoryTransactionCreateNestedManyWithoutUserInput;
    operationEdits?: Prisma.OperationLogEditCreateNestedManyWithoutAdminInput;
    operationArchives?: Prisma.OperationLogArchiveCreateNestedManyWithoutArchiverInput;
    inventoryArchives?: Prisma.InventoryArchiveCreateNestedManyWithoutArchiverInput;
    submittedPatients?: Prisma.PatientLogCreateNestedManyWithoutSubmitterInput;
    operationImages?: Prisma.OperationImageAttachmentCreateNestedManyWithoutUploaderInput;
    patientImages?: Prisma.PatientImageAttachmentCreateNestedManyWithoutUploaderInput;
};
export type UserUncheckedCreateWithoutValidatedOperationsInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    submittedOperations?: Prisma.OperationLogUncheckedCreateNestedManyWithoutSubmitterInput;
    drivenDispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutDriverInput;
    submittedDispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutSubmitterInput;
    operationResponders?: Prisma.OperationResponderUncheckedCreateNestedManyWithoutUserInput;
    patientResponders?: Prisma.PatientResponderUncheckedCreateNestedManyWithoutUserInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUncheckedCreateNestedManyWithoutUserInput;
    inventoryTransactions?: Prisma.InventoryTransactionUncheckedCreateNestedManyWithoutUserInput;
    operationEdits?: Prisma.OperationLogEditUncheckedCreateNestedManyWithoutAdminInput;
    operationArchives?: Prisma.OperationLogArchiveUncheckedCreateNestedManyWithoutArchiverInput;
    inventoryArchives?: Prisma.InventoryArchiveUncheckedCreateNestedManyWithoutArchiverInput;
    submittedPatients?: Prisma.PatientLogUncheckedCreateNestedManyWithoutSubmitterInput;
    operationImages?: Prisma.OperationImageAttachmentUncheckedCreateNestedManyWithoutUploaderInput;
    patientImages?: Prisma.PatientImageAttachmentUncheckedCreateNestedManyWithoutUploaderInput;
};
export type UserCreateOrConnectWithoutValidatedOperationsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutValidatedOperationsInput, Prisma.UserUncheckedCreateWithoutValidatedOperationsInput>;
};
export type UserUpsertWithoutSubmittedOperationsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutSubmittedOperationsInput, Prisma.UserUncheckedUpdateWithoutSubmittedOperationsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutSubmittedOperationsInput, Prisma.UserUncheckedCreateWithoutSubmittedOperationsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutSubmittedOperationsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutSubmittedOperationsInput, Prisma.UserUncheckedUpdateWithoutSubmittedOperationsInput>;
};
export type UserUpdateWithoutSubmittedOperationsInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    validatedOperations?: Prisma.OperationLogUpdateManyWithoutValidatorNestedInput;
    drivenDispatches?: Prisma.VehicularDispatchUpdateManyWithoutDriverNestedInput;
    submittedDispatches?: Prisma.VehicularDispatchUpdateManyWithoutSubmitterNestedInput;
    operationResponders?: Prisma.OperationResponderUpdateManyWithoutUserNestedInput;
    patientResponders?: Prisma.PatientResponderUpdateManyWithoutUserNestedInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUpdateManyWithoutUserNestedInput;
    inventoryTransactions?: Prisma.InventoryTransactionUpdateManyWithoutUserNestedInput;
    operationEdits?: Prisma.OperationLogEditUpdateManyWithoutAdminNestedInput;
    operationArchives?: Prisma.OperationLogArchiveUpdateManyWithoutArchiverNestedInput;
    inventoryArchives?: Prisma.InventoryArchiveUpdateManyWithoutArchiverNestedInput;
    submittedPatients?: Prisma.PatientLogUpdateManyWithoutSubmitterNestedInput;
    operationImages?: Prisma.OperationImageAttachmentUpdateManyWithoutUploaderNestedInput;
    patientImages?: Prisma.PatientImageAttachmentUpdateManyWithoutUploaderNestedInput;
};
export type UserUncheckedUpdateWithoutSubmittedOperationsInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    validatedOperations?: Prisma.OperationLogUncheckedUpdateManyWithoutValidatorNestedInput;
    drivenDispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutDriverNestedInput;
    submittedDispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutSubmitterNestedInput;
    operationResponders?: Prisma.OperationResponderUncheckedUpdateManyWithoutUserNestedInput;
    patientResponders?: Prisma.PatientResponderUncheckedUpdateManyWithoutUserNestedInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUncheckedUpdateManyWithoutUserNestedInput;
    inventoryTransactions?: Prisma.InventoryTransactionUncheckedUpdateManyWithoutUserNestedInput;
    operationEdits?: Prisma.OperationLogEditUncheckedUpdateManyWithoutAdminNestedInput;
    operationArchives?: Prisma.OperationLogArchiveUncheckedUpdateManyWithoutArchiverNestedInput;
    inventoryArchives?: Prisma.InventoryArchiveUncheckedUpdateManyWithoutArchiverNestedInput;
    submittedPatients?: Prisma.PatientLogUncheckedUpdateManyWithoutSubmitterNestedInput;
    operationImages?: Prisma.OperationImageAttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
    patientImages?: Prisma.PatientImageAttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
};
export type UserUpsertWithoutValidatedOperationsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutValidatedOperationsInput, Prisma.UserUncheckedUpdateWithoutValidatedOperationsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutValidatedOperationsInput, Prisma.UserUncheckedCreateWithoutValidatedOperationsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutValidatedOperationsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutValidatedOperationsInput, Prisma.UserUncheckedUpdateWithoutValidatedOperationsInput>;
};
export type UserUpdateWithoutValidatedOperationsInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    submittedOperations?: Prisma.OperationLogUpdateManyWithoutSubmitterNestedInput;
    drivenDispatches?: Prisma.VehicularDispatchUpdateManyWithoutDriverNestedInput;
    submittedDispatches?: Prisma.VehicularDispatchUpdateManyWithoutSubmitterNestedInput;
    operationResponders?: Prisma.OperationResponderUpdateManyWithoutUserNestedInput;
    patientResponders?: Prisma.PatientResponderUpdateManyWithoutUserNestedInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUpdateManyWithoutUserNestedInput;
    inventoryTransactions?: Prisma.InventoryTransactionUpdateManyWithoutUserNestedInput;
    operationEdits?: Prisma.OperationLogEditUpdateManyWithoutAdminNestedInput;
    operationArchives?: Prisma.OperationLogArchiveUpdateManyWithoutArchiverNestedInput;
    inventoryArchives?: Prisma.InventoryArchiveUpdateManyWithoutArchiverNestedInput;
    submittedPatients?: Prisma.PatientLogUpdateManyWithoutSubmitterNestedInput;
    operationImages?: Prisma.OperationImageAttachmentUpdateManyWithoutUploaderNestedInput;
    patientImages?: Prisma.PatientImageAttachmentUpdateManyWithoutUploaderNestedInput;
};
export type UserUncheckedUpdateWithoutValidatedOperationsInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    submittedOperations?: Prisma.OperationLogUncheckedUpdateManyWithoutSubmitterNestedInput;
    drivenDispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutDriverNestedInput;
    submittedDispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutSubmitterNestedInput;
    operationResponders?: Prisma.OperationResponderUncheckedUpdateManyWithoutUserNestedInput;
    patientResponders?: Prisma.PatientResponderUncheckedUpdateManyWithoutUserNestedInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUncheckedUpdateManyWithoutUserNestedInput;
    inventoryTransactions?: Prisma.InventoryTransactionUncheckedUpdateManyWithoutUserNestedInput;
    operationEdits?: Prisma.OperationLogEditUncheckedUpdateManyWithoutAdminNestedInput;
    operationArchives?: Prisma.OperationLogArchiveUncheckedUpdateManyWithoutArchiverNestedInput;
    inventoryArchives?: Prisma.InventoryArchiveUncheckedUpdateManyWithoutArchiverNestedInput;
    submittedPatients?: Prisma.PatientLogUncheckedUpdateManyWithoutSubmitterNestedInput;
    operationImages?: Prisma.OperationImageAttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
    patientImages?: Prisma.PatientImageAttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
};
export type UserCreateWithoutOperationRespondersInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    submittedOperations?: Prisma.OperationLogCreateNestedManyWithoutSubmitterInput;
    validatedOperations?: Prisma.OperationLogCreateNestedManyWithoutValidatorInput;
    drivenDispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutDriverInput;
    submittedDispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutSubmitterInput;
    patientResponders?: Prisma.PatientResponderCreateNestedManyWithoutUserInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderCreateNestedManyWithoutUserInput;
    inventoryTransactions?: Prisma.InventoryTransactionCreateNestedManyWithoutUserInput;
    operationEdits?: Prisma.OperationLogEditCreateNestedManyWithoutAdminInput;
    operationArchives?: Prisma.OperationLogArchiveCreateNestedManyWithoutArchiverInput;
    inventoryArchives?: Prisma.InventoryArchiveCreateNestedManyWithoutArchiverInput;
    submittedPatients?: Prisma.PatientLogCreateNestedManyWithoutSubmitterInput;
    operationImages?: Prisma.OperationImageAttachmentCreateNestedManyWithoutUploaderInput;
    patientImages?: Prisma.PatientImageAttachmentCreateNestedManyWithoutUploaderInput;
};
export type UserUncheckedCreateWithoutOperationRespondersInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    submittedOperations?: Prisma.OperationLogUncheckedCreateNestedManyWithoutSubmitterInput;
    validatedOperations?: Prisma.OperationLogUncheckedCreateNestedManyWithoutValidatorInput;
    drivenDispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutDriverInput;
    submittedDispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutSubmitterInput;
    patientResponders?: Prisma.PatientResponderUncheckedCreateNestedManyWithoutUserInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUncheckedCreateNestedManyWithoutUserInput;
    inventoryTransactions?: Prisma.InventoryTransactionUncheckedCreateNestedManyWithoutUserInput;
    operationEdits?: Prisma.OperationLogEditUncheckedCreateNestedManyWithoutAdminInput;
    operationArchives?: Prisma.OperationLogArchiveUncheckedCreateNestedManyWithoutArchiverInput;
    inventoryArchives?: Prisma.InventoryArchiveUncheckedCreateNestedManyWithoutArchiverInput;
    submittedPatients?: Prisma.PatientLogUncheckedCreateNestedManyWithoutSubmitterInput;
    operationImages?: Prisma.OperationImageAttachmentUncheckedCreateNestedManyWithoutUploaderInput;
    patientImages?: Prisma.PatientImageAttachmentUncheckedCreateNestedManyWithoutUploaderInput;
};
export type UserCreateOrConnectWithoutOperationRespondersInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutOperationRespondersInput, Prisma.UserUncheckedCreateWithoutOperationRespondersInput>;
};
export type UserUpsertWithoutOperationRespondersInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutOperationRespondersInput, Prisma.UserUncheckedUpdateWithoutOperationRespondersInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutOperationRespondersInput, Prisma.UserUncheckedCreateWithoutOperationRespondersInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutOperationRespondersInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutOperationRespondersInput, Prisma.UserUncheckedUpdateWithoutOperationRespondersInput>;
};
export type UserUpdateWithoutOperationRespondersInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    submittedOperations?: Prisma.OperationLogUpdateManyWithoutSubmitterNestedInput;
    validatedOperations?: Prisma.OperationLogUpdateManyWithoutValidatorNestedInput;
    drivenDispatches?: Prisma.VehicularDispatchUpdateManyWithoutDriverNestedInput;
    submittedDispatches?: Prisma.VehicularDispatchUpdateManyWithoutSubmitterNestedInput;
    patientResponders?: Prisma.PatientResponderUpdateManyWithoutUserNestedInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUpdateManyWithoutUserNestedInput;
    inventoryTransactions?: Prisma.InventoryTransactionUpdateManyWithoutUserNestedInput;
    operationEdits?: Prisma.OperationLogEditUpdateManyWithoutAdminNestedInput;
    operationArchives?: Prisma.OperationLogArchiveUpdateManyWithoutArchiverNestedInput;
    inventoryArchives?: Prisma.InventoryArchiveUpdateManyWithoutArchiverNestedInput;
    submittedPatients?: Prisma.PatientLogUpdateManyWithoutSubmitterNestedInput;
    operationImages?: Prisma.OperationImageAttachmentUpdateManyWithoutUploaderNestedInput;
    patientImages?: Prisma.PatientImageAttachmentUpdateManyWithoutUploaderNestedInput;
};
export type UserUncheckedUpdateWithoutOperationRespondersInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    submittedOperations?: Prisma.OperationLogUncheckedUpdateManyWithoutSubmitterNestedInput;
    validatedOperations?: Prisma.OperationLogUncheckedUpdateManyWithoutValidatorNestedInput;
    drivenDispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutDriverNestedInput;
    submittedDispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutSubmitterNestedInput;
    patientResponders?: Prisma.PatientResponderUncheckedUpdateManyWithoutUserNestedInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUncheckedUpdateManyWithoutUserNestedInput;
    inventoryTransactions?: Prisma.InventoryTransactionUncheckedUpdateManyWithoutUserNestedInput;
    operationEdits?: Prisma.OperationLogEditUncheckedUpdateManyWithoutAdminNestedInput;
    operationArchives?: Prisma.OperationLogArchiveUncheckedUpdateManyWithoutArchiverNestedInput;
    inventoryArchives?: Prisma.InventoryArchiveUncheckedUpdateManyWithoutArchiverNestedInput;
    submittedPatients?: Prisma.PatientLogUncheckedUpdateManyWithoutSubmitterNestedInput;
    operationImages?: Prisma.OperationImageAttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
    patientImages?: Prisma.PatientImageAttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
};
export type UserCreateWithoutInventoryTransactionsInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    submittedOperations?: Prisma.OperationLogCreateNestedManyWithoutSubmitterInput;
    validatedOperations?: Prisma.OperationLogCreateNestedManyWithoutValidatorInput;
    drivenDispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutDriverInput;
    submittedDispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutSubmitterInput;
    operationResponders?: Prisma.OperationResponderCreateNestedManyWithoutUserInput;
    patientResponders?: Prisma.PatientResponderCreateNestedManyWithoutUserInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderCreateNestedManyWithoutUserInput;
    operationEdits?: Prisma.OperationLogEditCreateNestedManyWithoutAdminInput;
    operationArchives?: Prisma.OperationLogArchiveCreateNestedManyWithoutArchiverInput;
    inventoryArchives?: Prisma.InventoryArchiveCreateNestedManyWithoutArchiverInput;
    submittedPatients?: Prisma.PatientLogCreateNestedManyWithoutSubmitterInput;
    operationImages?: Prisma.OperationImageAttachmentCreateNestedManyWithoutUploaderInput;
    patientImages?: Prisma.PatientImageAttachmentCreateNestedManyWithoutUploaderInput;
};
export type UserUncheckedCreateWithoutInventoryTransactionsInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    submittedOperations?: Prisma.OperationLogUncheckedCreateNestedManyWithoutSubmitterInput;
    validatedOperations?: Prisma.OperationLogUncheckedCreateNestedManyWithoutValidatorInput;
    drivenDispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutDriverInput;
    submittedDispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutSubmitterInput;
    operationResponders?: Prisma.OperationResponderUncheckedCreateNestedManyWithoutUserInput;
    patientResponders?: Prisma.PatientResponderUncheckedCreateNestedManyWithoutUserInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUncheckedCreateNestedManyWithoutUserInput;
    operationEdits?: Prisma.OperationLogEditUncheckedCreateNestedManyWithoutAdminInput;
    operationArchives?: Prisma.OperationLogArchiveUncheckedCreateNestedManyWithoutArchiverInput;
    inventoryArchives?: Prisma.InventoryArchiveUncheckedCreateNestedManyWithoutArchiverInput;
    submittedPatients?: Prisma.PatientLogUncheckedCreateNestedManyWithoutSubmitterInput;
    operationImages?: Prisma.OperationImageAttachmentUncheckedCreateNestedManyWithoutUploaderInput;
    patientImages?: Prisma.PatientImageAttachmentUncheckedCreateNestedManyWithoutUploaderInput;
};
export type UserCreateOrConnectWithoutInventoryTransactionsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutInventoryTransactionsInput, Prisma.UserUncheckedCreateWithoutInventoryTransactionsInput>;
};
export type UserUpsertWithoutInventoryTransactionsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutInventoryTransactionsInput, Prisma.UserUncheckedUpdateWithoutInventoryTransactionsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutInventoryTransactionsInput, Prisma.UserUncheckedCreateWithoutInventoryTransactionsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutInventoryTransactionsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutInventoryTransactionsInput, Prisma.UserUncheckedUpdateWithoutInventoryTransactionsInput>;
};
export type UserUpdateWithoutInventoryTransactionsInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    submittedOperations?: Prisma.OperationLogUpdateManyWithoutSubmitterNestedInput;
    validatedOperations?: Prisma.OperationLogUpdateManyWithoutValidatorNestedInput;
    drivenDispatches?: Prisma.VehicularDispatchUpdateManyWithoutDriverNestedInput;
    submittedDispatches?: Prisma.VehicularDispatchUpdateManyWithoutSubmitterNestedInput;
    operationResponders?: Prisma.OperationResponderUpdateManyWithoutUserNestedInput;
    patientResponders?: Prisma.PatientResponderUpdateManyWithoutUserNestedInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUpdateManyWithoutUserNestedInput;
    operationEdits?: Prisma.OperationLogEditUpdateManyWithoutAdminNestedInput;
    operationArchives?: Prisma.OperationLogArchiveUpdateManyWithoutArchiverNestedInput;
    inventoryArchives?: Prisma.InventoryArchiveUpdateManyWithoutArchiverNestedInput;
    submittedPatients?: Prisma.PatientLogUpdateManyWithoutSubmitterNestedInput;
    operationImages?: Prisma.OperationImageAttachmentUpdateManyWithoutUploaderNestedInput;
    patientImages?: Prisma.PatientImageAttachmentUpdateManyWithoutUploaderNestedInput;
};
export type UserUncheckedUpdateWithoutInventoryTransactionsInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    submittedOperations?: Prisma.OperationLogUncheckedUpdateManyWithoutSubmitterNestedInput;
    validatedOperations?: Prisma.OperationLogUncheckedUpdateManyWithoutValidatorNestedInput;
    drivenDispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutDriverNestedInput;
    submittedDispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutSubmitterNestedInput;
    operationResponders?: Prisma.OperationResponderUncheckedUpdateManyWithoutUserNestedInput;
    patientResponders?: Prisma.PatientResponderUncheckedUpdateManyWithoutUserNestedInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUncheckedUpdateManyWithoutUserNestedInput;
    operationEdits?: Prisma.OperationLogEditUncheckedUpdateManyWithoutAdminNestedInput;
    operationArchives?: Prisma.OperationLogArchiveUncheckedUpdateManyWithoutArchiverNestedInput;
    inventoryArchives?: Prisma.InventoryArchiveUncheckedUpdateManyWithoutArchiverNestedInput;
    submittedPatients?: Prisma.PatientLogUncheckedUpdateManyWithoutSubmitterNestedInput;
    operationImages?: Prisma.OperationImageAttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
    patientImages?: Prisma.PatientImageAttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
};
export type UserCreateWithoutOperationEditsInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    submittedOperations?: Prisma.OperationLogCreateNestedManyWithoutSubmitterInput;
    validatedOperations?: Prisma.OperationLogCreateNestedManyWithoutValidatorInput;
    drivenDispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutDriverInput;
    submittedDispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutSubmitterInput;
    operationResponders?: Prisma.OperationResponderCreateNestedManyWithoutUserInput;
    patientResponders?: Prisma.PatientResponderCreateNestedManyWithoutUserInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderCreateNestedManyWithoutUserInput;
    inventoryTransactions?: Prisma.InventoryTransactionCreateNestedManyWithoutUserInput;
    operationArchives?: Prisma.OperationLogArchiveCreateNestedManyWithoutArchiverInput;
    inventoryArchives?: Prisma.InventoryArchiveCreateNestedManyWithoutArchiverInput;
    submittedPatients?: Prisma.PatientLogCreateNestedManyWithoutSubmitterInput;
    operationImages?: Prisma.OperationImageAttachmentCreateNestedManyWithoutUploaderInput;
    patientImages?: Prisma.PatientImageAttachmentCreateNestedManyWithoutUploaderInput;
};
export type UserUncheckedCreateWithoutOperationEditsInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    submittedOperations?: Prisma.OperationLogUncheckedCreateNestedManyWithoutSubmitterInput;
    validatedOperations?: Prisma.OperationLogUncheckedCreateNestedManyWithoutValidatorInput;
    drivenDispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutDriverInput;
    submittedDispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutSubmitterInput;
    operationResponders?: Prisma.OperationResponderUncheckedCreateNestedManyWithoutUserInput;
    patientResponders?: Prisma.PatientResponderUncheckedCreateNestedManyWithoutUserInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUncheckedCreateNestedManyWithoutUserInput;
    inventoryTransactions?: Prisma.InventoryTransactionUncheckedCreateNestedManyWithoutUserInput;
    operationArchives?: Prisma.OperationLogArchiveUncheckedCreateNestedManyWithoutArchiverInput;
    inventoryArchives?: Prisma.InventoryArchiveUncheckedCreateNestedManyWithoutArchiverInput;
    submittedPatients?: Prisma.PatientLogUncheckedCreateNestedManyWithoutSubmitterInput;
    operationImages?: Prisma.OperationImageAttachmentUncheckedCreateNestedManyWithoutUploaderInput;
    patientImages?: Prisma.PatientImageAttachmentUncheckedCreateNestedManyWithoutUploaderInput;
};
export type UserCreateOrConnectWithoutOperationEditsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutOperationEditsInput, Prisma.UserUncheckedCreateWithoutOperationEditsInput>;
};
export type UserUpsertWithoutOperationEditsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutOperationEditsInput, Prisma.UserUncheckedUpdateWithoutOperationEditsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutOperationEditsInput, Prisma.UserUncheckedCreateWithoutOperationEditsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutOperationEditsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutOperationEditsInput, Prisma.UserUncheckedUpdateWithoutOperationEditsInput>;
};
export type UserUpdateWithoutOperationEditsInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    submittedOperations?: Prisma.OperationLogUpdateManyWithoutSubmitterNestedInput;
    validatedOperations?: Prisma.OperationLogUpdateManyWithoutValidatorNestedInput;
    drivenDispatches?: Prisma.VehicularDispatchUpdateManyWithoutDriverNestedInput;
    submittedDispatches?: Prisma.VehicularDispatchUpdateManyWithoutSubmitterNestedInput;
    operationResponders?: Prisma.OperationResponderUpdateManyWithoutUserNestedInput;
    patientResponders?: Prisma.PatientResponderUpdateManyWithoutUserNestedInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUpdateManyWithoutUserNestedInput;
    inventoryTransactions?: Prisma.InventoryTransactionUpdateManyWithoutUserNestedInput;
    operationArchives?: Prisma.OperationLogArchiveUpdateManyWithoutArchiverNestedInput;
    inventoryArchives?: Prisma.InventoryArchiveUpdateManyWithoutArchiverNestedInput;
    submittedPatients?: Prisma.PatientLogUpdateManyWithoutSubmitterNestedInput;
    operationImages?: Prisma.OperationImageAttachmentUpdateManyWithoutUploaderNestedInput;
    patientImages?: Prisma.PatientImageAttachmentUpdateManyWithoutUploaderNestedInput;
};
export type UserUncheckedUpdateWithoutOperationEditsInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    submittedOperations?: Prisma.OperationLogUncheckedUpdateManyWithoutSubmitterNestedInput;
    validatedOperations?: Prisma.OperationLogUncheckedUpdateManyWithoutValidatorNestedInput;
    drivenDispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutDriverNestedInput;
    submittedDispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutSubmitterNestedInput;
    operationResponders?: Prisma.OperationResponderUncheckedUpdateManyWithoutUserNestedInput;
    patientResponders?: Prisma.PatientResponderUncheckedUpdateManyWithoutUserNestedInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUncheckedUpdateManyWithoutUserNestedInput;
    inventoryTransactions?: Prisma.InventoryTransactionUncheckedUpdateManyWithoutUserNestedInput;
    operationArchives?: Prisma.OperationLogArchiveUncheckedUpdateManyWithoutArchiverNestedInput;
    inventoryArchives?: Prisma.InventoryArchiveUncheckedUpdateManyWithoutArchiverNestedInput;
    submittedPatients?: Prisma.PatientLogUncheckedUpdateManyWithoutSubmitterNestedInput;
    operationImages?: Prisma.OperationImageAttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
    patientImages?: Prisma.PatientImageAttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
};
export type UserCreateWithoutOperationArchivesInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    submittedOperations?: Prisma.OperationLogCreateNestedManyWithoutSubmitterInput;
    validatedOperations?: Prisma.OperationLogCreateNestedManyWithoutValidatorInput;
    drivenDispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutDriverInput;
    submittedDispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutSubmitterInput;
    operationResponders?: Prisma.OperationResponderCreateNestedManyWithoutUserInput;
    patientResponders?: Prisma.PatientResponderCreateNestedManyWithoutUserInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderCreateNestedManyWithoutUserInput;
    inventoryTransactions?: Prisma.InventoryTransactionCreateNestedManyWithoutUserInput;
    operationEdits?: Prisma.OperationLogEditCreateNestedManyWithoutAdminInput;
    inventoryArchives?: Prisma.InventoryArchiveCreateNestedManyWithoutArchiverInput;
    submittedPatients?: Prisma.PatientLogCreateNestedManyWithoutSubmitterInput;
    operationImages?: Prisma.OperationImageAttachmentCreateNestedManyWithoutUploaderInput;
    patientImages?: Prisma.PatientImageAttachmentCreateNestedManyWithoutUploaderInput;
};
export type UserUncheckedCreateWithoutOperationArchivesInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    submittedOperations?: Prisma.OperationLogUncheckedCreateNestedManyWithoutSubmitterInput;
    validatedOperations?: Prisma.OperationLogUncheckedCreateNestedManyWithoutValidatorInput;
    drivenDispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutDriverInput;
    submittedDispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutSubmitterInput;
    operationResponders?: Prisma.OperationResponderUncheckedCreateNestedManyWithoutUserInput;
    patientResponders?: Prisma.PatientResponderUncheckedCreateNestedManyWithoutUserInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUncheckedCreateNestedManyWithoutUserInput;
    inventoryTransactions?: Prisma.InventoryTransactionUncheckedCreateNestedManyWithoutUserInput;
    operationEdits?: Prisma.OperationLogEditUncheckedCreateNestedManyWithoutAdminInput;
    inventoryArchives?: Prisma.InventoryArchiveUncheckedCreateNestedManyWithoutArchiverInput;
    submittedPatients?: Prisma.PatientLogUncheckedCreateNestedManyWithoutSubmitterInput;
    operationImages?: Prisma.OperationImageAttachmentUncheckedCreateNestedManyWithoutUploaderInput;
    patientImages?: Prisma.PatientImageAttachmentUncheckedCreateNestedManyWithoutUploaderInput;
};
export type UserCreateOrConnectWithoutOperationArchivesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutOperationArchivesInput, Prisma.UserUncheckedCreateWithoutOperationArchivesInput>;
};
export type UserUpsertWithoutOperationArchivesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutOperationArchivesInput, Prisma.UserUncheckedUpdateWithoutOperationArchivesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutOperationArchivesInput, Prisma.UserUncheckedCreateWithoutOperationArchivesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutOperationArchivesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutOperationArchivesInput, Prisma.UserUncheckedUpdateWithoutOperationArchivesInput>;
};
export type UserUpdateWithoutOperationArchivesInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    submittedOperations?: Prisma.OperationLogUpdateManyWithoutSubmitterNestedInput;
    validatedOperations?: Prisma.OperationLogUpdateManyWithoutValidatorNestedInput;
    drivenDispatches?: Prisma.VehicularDispatchUpdateManyWithoutDriverNestedInput;
    submittedDispatches?: Prisma.VehicularDispatchUpdateManyWithoutSubmitterNestedInput;
    operationResponders?: Prisma.OperationResponderUpdateManyWithoutUserNestedInput;
    patientResponders?: Prisma.PatientResponderUpdateManyWithoutUserNestedInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUpdateManyWithoutUserNestedInput;
    inventoryTransactions?: Prisma.InventoryTransactionUpdateManyWithoutUserNestedInput;
    operationEdits?: Prisma.OperationLogEditUpdateManyWithoutAdminNestedInput;
    inventoryArchives?: Prisma.InventoryArchiveUpdateManyWithoutArchiverNestedInput;
    submittedPatients?: Prisma.PatientLogUpdateManyWithoutSubmitterNestedInput;
    operationImages?: Prisma.OperationImageAttachmentUpdateManyWithoutUploaderNestedInput;
    patientImages?: Prisma.PatientImageAttachmentUpdateManyWithoutUploaderNestedInput;
};
export type UserUncheckedUpdateWithoutOperationArchivesInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    submittedOperations?: Prisma.OperationLogUncheckedUpdateManyWithoutSubmitterNestedInput;
    validatedOperations?: Prisma.OperationLogUncheckedUpdateManyWithoutValidatorNestedInput;
    drivenDispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutDriverNestedInput;
    submittedDispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutSubmitterNestedInput;
    operationResponders?: Prisma.OperationResponderUncheckedUpdateManyWithoutUserNestedInput;
    patientResponders?: Prisma.PatientResponderUncheckedUpdateManyWithoutUserNestedInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUncheckedUpdateManyWithoutUserNestedInput;
    inventoryTransactions?: Prisma.InventoryTransactionUncheckedUpdateManyWithoutUserNestedInput;
    operationEdits?: Prisma.OperationLogEditUncheckedUpdateManyWithoutAdminNestedInput;
    inventoryArchives?: Prisma.InventoryArchiveUncheckedUpdateManyWithoutArchiverNestedInput;
    submittedPatients?: Prisma.PatientLogUncheckedUpdateManyWithoutSubmitterNestedInput;
    operationImages?: Prisma.OperationImageAttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
    patientImages?: Prisma.PatientImageAttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
};
export type UserCreateWithoutInventoryArchivesInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    submittedOperations?: Prisma.OperationLogCreateNestedManyWithoutSubmitterInput;
    validatedOperations?: Prisma.OperationLogCreateNestedManyWithoutValidatorInput;
    drivenDispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutDriverInput;
    submittedDispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutSubmitterInput;
    operationResponders?: Prisma.OperationResponderCreateNestedManyWithoutUserInput;
    patientResponders?: Prisma.PatientResponderCreateNestedManyWithoutUserInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderCreateNestedManyWithoutUserInput;
    inventoryTransactions?: Prisma.InventoryTransactionCreateNestedManyWithoutUserInput;
    operationEdits?: Prisma.OperationLogEditCreateNestedManyWithoutAdminInput;
    operationArchives?: Prisma.OperationLogArchiveCreateNestedManyWithoutArchiverInput;
    submittedPatients?: Prisma.PatientLogCreateNestedManyWithoutSubmitterInput;
    operationImages?: Prisma.OperationImageAttachmentCreateNestedManyWithoutUploaderInput;
    patientImages?: Prisma.PatientImageAttachmentCreateNestedManyWithoutUploaderInput;
};
export type UserUncheckedCreateWithoutInventoryArchivesInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    submittedOperations?: Prisma.OperationLogUncheckedCreateNestedManyWithoutSubmitterInput;
    validatedOperations?: Prisma.OperationLogUncheckedCreateNestedManyWithoutValidatorInput;
    drivenDispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutDriverInput;
    submittedDispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutSubmitterInput;
    operationResponders?: Prisma.OperationResponderUncheckedCreateNestedManyWithoutUserInput;
    patientResponders?: Prisma.PatientResponderUncheckedCreateNestedManyWithoutUserInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUncheckedCreateNestedManyWithoutUserInput;
    inventoryTransactions?: Prisma.InventoryTransactionUncheckedCreateNestedManyWithoutUserInput;
    operationEdits?: Prisma.OperationLogEditUncheckedCreateNestedManyWithoutAdminInput;
    operationArchives?: Prisma.OperationLogArchiveUncheckedCreateNestedManyWithoutArchiverInput;
    submittedPatients?: Prisma.PatientLogUncheckedCreateNestedManyWithoutSubmitterInput;
    operationImages?: Prisma.OperationImageAttachmentUncheckedCreateNestedManyWithoutUploaderInput;
    patientImages?: Prisma.PatientImageAttachmentUncheckedCreateNestedManyWithoutUploaderInput;
};
export type UserCreateOrConnectWithoutInventoryArchivesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutInventoryArchivesInput, Prisma.UserUncheckedCreateWithoutInventoryArchivesInput>;
};
export type UserUpsertWithoutInventoryArchivesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutInventoryArchivesInput, Prisma.UserUncheckedUpdateWithoutInventoryArchivesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutInventoryArchivesInput, Prisma.UserUncheckedCreateWithoutInventoryArchivesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutInventoryArchivesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutInventoryArchivesInput, Prisma.UserUncheckedUpdateWithoutInventoryArchivesInput>;
};
export type UserUpdateWithoutInventoryArchivesInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    submittedOperations?: Prisma.OperationLogUpdateManyWithoutSubmitterNestedInput;
    validatedOperations?: Prisma.OperationLogUpdateManyWithoutValidatorNestedInput;
    drivenDispatches?: Prisma.VehicularDispatchUpdateManyWithoutDriverNestedInput;
    submittedDispatches?: Prisma.VehicularDispatchUpdateManyWithoutSubmitterNestedInput;
    operationResponders?: Prisma.OperationResponderUpdateManyWithoutUserNestedInput;
    patientResponders?: Prisma.PatientResponderUpdateManyWithoutUserNestedInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUpdateManyWithoutUserNestedInput;
    inventoryTransactions?: Prisma.InventoryTransactionUpdateManyWithoutUserNestedInput;
    operationEdits?: Prisma.OperationLogEditUpdateManyWithoutAdminNestedInput;
    operationArchives?: Prisma.OperationLogArchiveUpdateManyWithoutArchiverNestedInput;
    submittedPatients?: Prisma.PatientLogUpdateManyWithoutSubmitterNestedInput;
    operationImages?: Prisma.OperationImageAttachmentUpdateManyWithoutUploaderNestedInput;
    patientImages?: Prisma.PatientImageAttachmentUpdateManyWithoutUploaderNestedInput;
};
export type UserUncheckedUpdateWithoutInventoryArchivesInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    submittedOperations?: Prisma.OperationLogUncheckedUpdateManyWithoutSubmitterNestedInput;
    validatedOperations?: Prisma.OperationLogUncheckedUpdateManyWithoutValidatorNestedInput;
    drivenDispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutDriverNestedInput;
    submittedDispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutSubmitterNestedInput;
    operationResponders?: Prisma.OperationResponderUncheckedUpdateManyWithoutUserNestedInput;
    patientResponders?: Prisma.PatientResponderUncheckedUpdateManyWithoutUserNestedInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUncheckedUpdateManyWithoutUserNestedInput;
    inventoryTransactions?: Prisma.InventoryTransactionUncheckedUpdateManyWithoutUserNestedInput;
    operationEdits?: Prisma.OperationLogEditUncheckedUpdateManyWithoutAdminNestedInput;
    operationArchives?: Prisma.OperationLogArchiveUncheckedUpdateManyWithoutArchiverNestedInput;
    submittedPatients?: Prisma.PatientLogUncheckedUpdateManyWithoutSubmitterNestedInput;
    operationImages?: Prisma.OperationImageAttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
    patientImages?: Prisma.PatientImageAttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
};
export type UserCreateWithoutSubmittedPatientsInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    submittedOperations?: Prisma.OperationLogCreateNestedManyWithoutSubmitterInput;
    validatedOperations?: Prisma.OperationLogCreateNestedManyWithoutValidatorInput;
    drivenDispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutDriverInput;
    submittedDispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutSubmitterInput;
    operationResponders?: Prisma.OperationResponderCreateNestedManyWithoutUserInput;
    patientResponders?: Prisma.PatientResponderCreateNestedManyWithoutUserInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderCreateNestedManyWithoutUserInput;
    inventoryTransactions?: Prisma.InventoryTransactionCreateNestedManyWithoutUserInput;
    operationEdits?: Prisma.OperationLogEditCreateNestedManyWithoutAdminInput;
    operationArchives?: Prisma.OperationLogArchiveCreateNestedManyWithoutArchiverInput;
    inventoryArchives?: Prisma.InventoryArchiveCreateNestedManyWithoutArchiverInput;
    operationImages?: Prisma.OperationImageAttachmentCreateNestedManyWithoutUploaderInput;
    patientImages?: Prisma.PatientImageAttachmentCreateNestedManyWithoutUploaderInput;
};
export type UserUncheckedCreateWithoutSubmittedPatientsInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    submittedOperations?: Prisma.OperationLogUncheckedCreateNestedManyWithoutSubmitterInput;
    validatedOperations?: Prisma.OperationLogUncheckedCreateNestedManyWithoutValidatorInput;
    drivenDispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutDriverInput;
    submittedDispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutSubmitterInput;
    operationResponders?: Prisma.OperationResponderUncheckedCreateNestedManyWithoutUserInput;
    patientResponders?: Prisma.PatientResponderUncheckedCreateNestedManyWithoutUserInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUncheckedCreateNestedManyWithoutUserInput;
    inventoryTransactions?: Prisma.InventoryTransactionUncheckedCreateNestedManyWithoutUserInput;
    operationEdits?: Prisma.OperationLogEditUncheckedCreateNestedManyWithoutAdminInput;
    operationArchives?: Prisma.OperationLogArchiveUncheckedCreateNestedManyWithoutArchiverInput;
    inventoryArchives?: Prisma.InventoryArchiveUncheckedCreateNestedManyWithoutArchiverInput;
    operationImages?: Prisma.OperationImageAttachmentUncheckedCreateNestedManyWithoutUploaderInput;
    patientImages?: Prisma.PatientImageAttachmentUncheckedCreateNestedManyWithoutUploaderInput;
};
export type UserCreateOrConnectWithoutSubmittedPatientsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutSubmittedPatientsInput, Prisma.UserUncheckedCreateWithoutSubmittedPatientsInput>;
};
export type UserUpsertWithoutSubmittedPatientsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutSubmittedPatientsInput, Prisma.UserUncheckedUpdateWithoutSubmittedPatientsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutSubmittedPatientsInput, Prisma.UserUncheckedCreateWithoutSubmittedPatientsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutSubmittedPatientsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutSubmittedPatientsInput, Prisma.UserUncheckedUpdateWithoutSubmittedPatientsInput>;
};
export type UserUpdateWithoutSubmittedPatientsInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    submittedOperations?: Prisma.OperationLogUpdateManyWithoutSubmitterNestedInput;
    validatedOperations?: Prisma.OperationLogUpdateManyWithoutValidatorNestedInput;
    drivenDispatches?: Prisma.VehicularDispatchUpdateManyWithoutDriverNestedInput;
    submittedDispatches?: Prisma.VehicularDispatchUpdateManyWithoutSubmitterNestedInput;
    operationResponders?: Prisma.OperationResponderUpdateManyWithoutUserNestedInput;
    patientResponders?: Prisma.PatientResponderUpdateManyWithoutUserNestedInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUpdateManyWithoutUserNestedInput;
    inventoryTransactions?: Prisma.InventoryTransactionUpdateManyWithoutUserNestedInput;
    operationEdits?: Prisma.OperationLogEditUpdateManyWithoutAdminNestedInput;
    operationArchives?: Prisma.OperationLogArchiveUpdateManyWithoutArchiverNestedInput;
    inventoryArchives?: Prisma.InventoryArchiveUpdateManyWithoutArchiverNestedInput;
    operationImages?: Prisma.OperationImageAttachmentUpdateManyWithoutUploaderNestedInput;
    patientImages?: Prisma.PatientImageAttachmentUpdateManyWithoutUploaderNestedInput;
};
export type UserUncheckedUpdateWithoutSubmittedPatientsInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    submittedOperations?: Prisma.OperationLogUncheckedUpdateManyWithoutSubmitterNestedInput;
    validatedOperations?: Prisma.OperationLogUncheckedUpdateManyWithoutValidatorNestedInput;
    drivenDispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutDriverNestedInput;
    submittedDispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutSubmitterNestedInput;
    operationResponders?: Prisma.OperationResponderUncheckedUpdateManyWithoutUserNestedInput;
    patientResponders?: Prisma.PatientResponderUncheckedUpdateManyWithoutUserNestedInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUncheckedUpdateManyWithoutUserNestedInput;
    inventoryTransactions?: Prisma.InventoryTransactionUncheckedUpdateManyWithoutUserNestedInput;
    operationEdits?: Prisma.OperationLogEditUncheckedUpdateManyWithoutAdminNestedInput;
    operationArchives?: Prisma.OperationLogArchiveUncheckedUpdateManyWithoutArchiverNestedInput;
    inventoryArchives?: Prisma.InventoryArchiveUncheckedUpdateManyWithoutArchiverNestedInput;
    operationImages?: Prisma.OperationImageAttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
    patientImages?: Prisma.PatientImageAttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
};
export type UserCreateWithoutPatientRespondersInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    submittedOperations?: Prisma.OperationLogCreateNestedManyWithoutSubmitterInput;
    validatedOperations?: Prisma.OperationLogCreateNestedManyWithoutValidatorInput;
    drivenDispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutDriverInput;
    submittedDispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutSubmitterInput;
    operationResponders?: Prisma.OperationResponderCreateNestedManyWithoutUserInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderCreateNestedManyWithoutUserInput;
    inventoryTransactions?: Prisma.InventoryTransactionCreateNestedManyWithoutUserInput;
    operationEdits?: Prisma.OperationLogEditCreateNestedManyWithoutAdminInput;
    operationArchives?: Prisma.OperationLogArchiveCreateNestedManyWithoutArchiverInput;
    inventoryArchives?: Prisma.InventoryArchiveCreateNestedManyWithoutArchiverInput;
    submittedPatients?: Prisma.PatientLogCreateNestedManyWithoutSubmitterInput;
    operationImages?: Prisma.OperationImageAttachmentCreateNestedManyWithoutUploaderInput;
    patientImages?: Prisma.PatientImageAttachmentCreateNestedManyWithoutUploaderInput;
};
export type UserUncheckedCreateWithoutPatientRespondersInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    submittedOperations?: Prisma.OperationLogUncheckedCreateNestedManyWithoutSubmitterInput;
    validatedOperations?: Prisma.OperationLogUncheckedCreateNestedManyWithoutValidatorInput;
    drivenDispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutDriverInput;
    submittedDispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutSubmitterInput;
    operationResponders?: Prisma.OperationResponderUncheckedCreateNestedManyWithoutUserInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUncheckedCreateNestedManyWithoutUserInput;
    inventoryTransactions?: Prisma.InventoryTransactionUncheckedCreateNestedManyWithoutUserInput;
    operationEdits?: Prisma.OperationLogEditUncheckedCreateNestedManyWithoutAdminInput;
    operationArchives?: Prisma.OperationLogArchiveUncheckedCreateNestedManyWithoutArchiverInput;
    inventoryArchives?: Prisma.InventoryArchiveUncheckedCreateNestedManyWithoutArchiverInput;
    submittedPatients?: Prisma.PatientLogUncheckedCreateNestedManyWithoutSubmitterInput;
    operationImages?: Prisma.OperationImageAttachmentUncheckedCreateNestedManyWithoutUploaderInput;
    patientImages?: Prisma.PatientImageAttachmentUncheckedCreateNestedManyWithoutUploaderInput;
};
export type UserCreateOrConnectWithoutPatientRespondersInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutPatientRespondersInput, Prisma.UserUncheckedCreateWithoutPatientRespondersInput>;
};
export type UserUpsertWithoutPatientRespondersInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutPatientRespondersInput, Prisma.UserUncheckedUpdateWithoutPatientRespondersInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutPatientRespondersInput, Prisma.UserUncheckedCreateWithoutPatientRespondersInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutPatientRespondersInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutPatientRespondersInput, Prisma.UserUncheckedUpdateWithoutPatientRespondersInput>;
};
export type UserUpdateWithoutPatientRespondersInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    submittedOperations?: Prisma.OperationLogUpdateManyWithoutSubmitterNestedInput;
    validatedOperations?: Prisma.OperationLogUpdateManyWithoutValidatorNestedInput;
    drivenDispatches?: Prisma.VehicularDispatchUpdateManyWithoutDriverNestedInput;
    submittedDispatches?: Prisma.VehicularDispatchUpdateManyWithoutSubmitterNestedInput;
    operationResponders?: Prisma.OperationResponderUpdateManyWithoutUserNestedInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUpdateManyWithoutUserNestedInput;
    inventoryTransactions?: Prisma.InventoryTransactionUpdateManyWithoutUserNestedInput;
    operationEdits?: Prisma.OperationLogEditUpdateManyWithoutAdminNestedInput;
    operationArchives?: Prisma.OperationLogArchiveUpdateManyWithoutArchiverNestedInput;
    inventoryArchives?: Prisma.InventoryArchiveUpdateManyWithoutArchiverNestedInput;
    submittedPatients?: Prisma.PatientLogUpdateManyWithoutSubmitterNestedInput;
    operationImages?: Prisma.OperationImageAttachmentUpdateManyWithoutUploaderNestedInput;
    patientImages?: Prisma.PatientImageAttachmentUpdateManyWithoutUploaderNestedInput;
};
export type UserUncheckedUpdateWithoutPatientRespondersInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    submittedOperations?: Prisma.OperationLogUncheckedUpdateManyWithoutSubmitterNestedInput;
    validatedOperations?: Prisma.OperationLogUncheckedUpdateManyWithoutValidatorNestedInput;
    drivenDispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutDriverNestedInput;
    submittedDispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutSubmitterNestedInput;
    operationResponders?: Prisma.OperationResponderUncheckedUpdateManyWithoutUserNestedInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUncheckedUpdateManyWithoutUserNestedInput;
    inventoryTransactions?: Prisma.InventoryTransactionUncheckedUpdateManyWithoutUserNestedInput;
    operationEdits?: Prisma.OperationLogEditUncheckedUpdateManyWithoutAdminNestedInput;
    operationArchives?: Prisma.OperationLogArchiveUncheckedUpdateManyWithoutArchiverNestedInput;
    inventoryArchives?: Prisma.InventoryArchiveUncheckedUpdateManyWithoutArchiverNestedInput;
    submittedPatients?: Prisma.PatientLogUncheckedUpdateManyWithoutSubmitterNestedInput;
    operationImages?: Prisma.OperationImageAttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
    patientImages?: Prisma.PatientImageAttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
};
export type UserCreateWithoutDrivenDispatchesInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    submittedOperations?: Prisma.OperationLogCreateNestedManyWithoutSubmitterInput;
    validatedOperations?: Prisma.OperationLogCreateNestedManyWithoutValidatorInput;
    submittedDispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutSubmitterInput;
    operationResponders?: Prisma.OperationResponderCreateNestedManyWithoutUserInput;
    patientResponders?: Prisma.PatientResponderCreateNestedManyWithoutUserInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderCreateNestedManyWithoutUserInput;
    inventoryTransactions?: Prisma.InventoryTransactionCreateNestedManyWithoutUserInput;
    operationEdits?: Prisma.OperationLogEditCreateNestedManyWithoutAdminInput;
    operationArchives?: Prisma.OperationLogArchiveCreateNestedManyWithoutArchiverInput;
    inventoryArchives?: Prisma.InventoryArchiveCreateNestedManyWithoutArchiverInput;
    submittedPatients?: Prisma.PatientLogCreateNestedManyWithoutSubmitterInput;
    operationImages?: Prisma.OperationImageAttachmentCreateNestedManyWithoutUploaderInput;
    patientImages?: Prisma.PatientImageAttachmentCreateNestedManyWithoutUploaderInput;
};
export type UserUncheckedCreateWithoutDrivenDispatchesInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    submittedOperations?: Prisma.OperationLogUncheckedCreateNestedManyWithoutSubmitterInput;
    validatedOperations?: Prisma.OperationLogUncheckedCreateNestedManyWithoutValidatorInput;
    submittedDispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutSubmitterInput;
    operationResponders?: Prisma.OperationResponderUncheckedCreateNestedManyWithoutUserInput;
    patientResponders?: Prisma.PatientResponderUncheckedCreateNestedManyWithoutUserInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUncheckedCreateNestedManyWithoutUserInput;
    inventoryTransactions?: Prisma.InventoryTransactionUncheckedCreateNestedManyWithoutUserInput;
    operationEdits?: Prisma.OperationLogEditUncheckedCreateNestedManyWithoutAdminInput;
    operationArchives?: Prisma.OperationLogArchiveUncheckedCreateNestedManyWithoutArchiverInput;
    inventoryArchives?: Prisma.InventoryArchiveUncheckedCreateNestedManyWithoutArchiverInput;
    submittedPatients?: Prisma.PatientLogUncheckedCreateNestedManyWithoutSubmitterInput;
    operationImages?: Prisma.OperationImageAttachmentUncheckedCreateNestedManyWithoutUploaderInput;
    patientImages?: Prisma.PatientImageAttachmentUncheckedCreateNestedManyWithoutUploaderInput;
};
export type UserCreateOrConnectWithoutDrivenDispatchesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutDrivenDispatchesInput, Prisma.UserUncheckedCreateWithoutDrivenDispatchesInput>;
};
export type UserCreateWithoutSubmittedDispatchesInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    submittedOperations?: Prisma.OperationLogCreateNestedManyWithoutSubmitterInput;
    validatedOperations?: Prisma.OperationLogCreateNestedManyWithoutValidatorInput;
    drivenDispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutDriverInput;
    operationResponders?: Prisma.OperationResponderCreateNestedManyWithoutUserInput;
    patientResponders?: Prisma.PatientResponderCreateNestedManyWithoutUserInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderCreateNestedManyWithoutUserInput;
    inventoryTransactions?: Prisma.InventoryTransactionCreateNestedManyWithoutUserInput;
    operationEdits?: Prisma.OperationLogEditCreateNestedManyWithoutAdminInput;
    operationArchives?: Prisma.OperationLogArchiveCreateNestedManyWithoutArchiverInput;
    inventoryArchives?: Prisma.InventoryArchiveCreateNestedManyWithoutArchiverInput;
    submittedPatients?: Prisma.PatientLogCreateNestedManyWithoutSubmitterInput;
    operationImages?: Prisma.OperationImageAttachmentCreateNestedManyWithoutUploaderInput;
    patientImages?: Prisma.PatientImageAttachmentCreateNestedManyWithoutUploaderInput;
};
export type UserUncheckedCreateWithoutSubmittedDispatchesInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    submittedOperations?: Prisma.OperationLogUncheckedCreateNestedManyWithoutSubmitterInput;
    validatedOperations?: Prisma.OperationLogUncheckedCreateNestedManyWithoutValidatorInput;
    drivenDispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutDriverInput;
    operationResponders?: Prisma.OperationResponderUncheckedCreateNestedManyWithoutUserInput;
    patientResponders?: Prisma.PatientResponderUncheckedCreateNestedManyWithoutUserInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUncheckedCreateNestedManyWithoutUserInput;
    inventoryTransactions?: Prisma.InventoryTransactionUncheckedCreateNestedManyWithoutUserInput;
    operationEdits?: Prisma.OperationLogEditUncheckedCreateNestedManyWithoutAdminInput;
    operationArchives?: Prisma.OperationLogArchiveUncheckedCreateNestedManyWithoutArchiverInput;
    inventoryArchives?: Prisma.InventoryArchiveUncheckedCreateNestedManyWithoutArchiverInput;
    submittedPatients?: Prisma.PatientLogUncheckedCreateNestedManyWithoutSubmitterInput;
    operationImages?: Prisma.OperationImageAttachmentUncheckedCreateNestedManyWithoutUploaderInput;
    patientImages?: Prisma.PatientImageAttachmentUncheckedCreateNestedManyWithoutUploaderInput;
};
export type UserCreateOrConnectWithoutSubmittedDispatchesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutSubmittedDispatchesInput, Prisma.UserUncheckedCreateWithoutSubmittedDispatchesInput>;
};
export type UserUpsertWithoutDrivenDispatchesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutDrivenDispatchesInput, Prisma.UserUncheckedUpdateWithoutDrivenDispatchesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutDrivenDispatchesInput, Prisma.UserUncheckedCreateWithoutDrivenDispatchesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutDrivenDispatchesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutDrivenDispatchesInput, Prisma.UserUncheckedUpdateWithoutDrivenDispatchesInput>;
};
export type UserUpdateWithoutDrivenDispatchesInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    submittedOperations?: Prisma.OperationLogUpdateManyWithoutSubmitterNestedInput;
    validatedOperations?: Prisma.OperationLogUpdateManyWithoutValidatorNestedInput;
    submittedDispatches?: Prisma.VehicularDispatchUpdateManyWithoutSubmitterNestedInput;
    operationResponders?: Prisma.OperationResponderUpdateManyWithoutUserNestedInput;
    patientResponders?: Prisma.PatientResponderUpdateManyWithoutUserNestedInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUpdateManyWithoutUserNestedInput;
    inventoryTransactions?: Prisma.InventoryTransactionUpdateManyWithoutUserNestedInput;
    operationEdits?: Prisma.OperationLogEditUpdateManyWithoutAdminNestedInput;
    operationArchives?: Prisma.OperationLogArchiveUpdateManyWithoutArchiverNestedInput;
    inventoryArchives?: Prisma.InventoryArchiveUpdateManyWithoutArchiverNestedInput;
    submittedPatients?: Prisma.PatientLogUpdateManyWithoutSubmitterNestedInput;
    operationImages?: Prisma.OperationImageAttachmentUpdateManyWithoutUploaderNestedInput;
    patientImages?: Prisma.PatientImageAttachmentUpdateManyWithoutUploaderNestedInput;
};
export type UserUncheckedUpdateWithoutDrivenDispatchesInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    submittedOperations?: Prisma.OperationLogUncheckedUpdateManyWithoutSubmitterNestedInput;
    validatedOperations?: Prisma.OperationLogUncheckedUpdateManyWithoutValidatorNestedInput;
    submittedDispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutSubmitterNestedInput;
    operationResponders?: Prisma.OperationResponderUncheckedUpdateManyWithoutUserNestedInput;
    patientResponders?: Prisma.PatientResponderUncheckedUpdateManyWithoutUserNestedInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUncheckedUpdateManyWithoutUserNestedInput;
    inventoryTransactions?: Prisma.InventoryTransactionUncheckedUpdateManyWithoutUserNestedInput;
    operationEdits?: Prisma.OperationLogEditUncheckedUpdateManyWithoutAdminNestedInput;
    operationArchives?: Prisma.OperationLogArchiveUncheckedUpdateManyWithoutArchiverNestedInput;
    inventoryArchives?: Prisma.InventoryArchiveUncheckedUpdateManyWithoutArchiverNestedInput;
    submittedPatients?: Prisma.PatientLogUncheckedUpdateManyWithoutSubmitterNestedInput;
    operationImages?: Prisma.OperationImageAttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
    patientImages?: Prisma.PatientImageAttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
};
export type UserUpsertWithoutSubmittedDispatchesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutSubmittedDispatchesInput, Prisma.UserUncheckedUpdateWithoutSubmittedDispatchesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutSubmittedDispatchesInput, Prisma.UserUncheckedCreateWithoutSubmittedDispatchesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutSubmittedDispatchesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutSubmittedDispatchesInput, Prisma.UserUncheckedUpdateWithoutSubmittedDispatchesInput>;
};
export type UserUpdateWithoutSubmittedDispatchesInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    submittedOperations?: Prisma.OperationLogUpdateManyWithoutSubmitterNestedInput;
    validatedOperations?: Prisma.OperationLogUpdateManyWithoutValidatorNestedInput;
    drivenDispatches?: Prisma.VehicularDispatchUpdateManyWithoutDriverNestedInput;
    operationResponders?: Prisma.OperationResponderUpdateManyWithoutUserNestedInput;
    patientResponders?: Prisma.PatientResponderUpdateManyWithoutUserNestedInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUpdateManyWithoutUserNestedInput;
    inventoryTransactions?: Prisma.InventoryTransactionUpdateManyWithoutUserNestedInput;
    operationEdits?: Prisma.OperationLogEditUpdateManyWithoutAdminNestedInput;
    operationArchives?: Prisma.OperationLogArchiveUpdateManyWithoutArchiverNestedInput;
    inventoryArchives?: Prisma.InventoryArchiveUpdateManyWithoutArchiverNestedInput;
    submittedPatients?: Prisma.PatientLogUpdateManyWithoutSubmitterNestedInput;
    operationImages?: Prisma.OperationImageAttachmentUpdateManyWithoutUploaderNestedInput;
    patientImages?: Prisma.PatientImageAttachmentUpdateManyWithoutUploaderNestedInput;
};
export type UserUncheckedUpdateWithoutSubmittedDispatchesInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    submittedOperations?: Prisma.OperationLogUncheckedUpdateManyWithoutSubmitterNestedInput;
    validatedOperations?: Prisma.OperationLogUncheckedUpdateManyWithoutValidatorNestedInput;
    drivenDispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutDriverNestedInput;
    operationResponders?: Prisma.OperationResponderUncheckedUpdateManyWithoutUserNestedInput;
    patientResponders?: Prisma.PatientResponderUncheckedUpdateManyWithoutUserNestedInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUncheckedUpdateManyWithoutUserNestedInput;
    inventoryTransactions?: Prisma.InventoryTransactionUncheckedUpdateManyWithoutUserNestedInput;
    operationEdits?: Prisma.OperationLogEditUncheckedUpdateManyWithoutAdminNestedInput;
    operationArchives?: Prisma.OperationLogArchiveUncheckedUpdateManyWithoutArchiverNestedInput;
    inventoryArchives?: Prisma.InventoryArchiveUncheckedUpdateManyWithoutArchiverNestedInput;
    submittedPatients?: Prisma.PatientLogUncheckedUpdateManyWithoutSubmitterNestedInput;
    operationImages?: Prisma.OperationImageAttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
    patientImages?: Prisma.PatientImageAttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
};
export type UserCreateWithoutDispatchRespondersInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    submittedOperations?: Prisma.OperationLogCreateNestedManyWithoutSubmitterInput;
    validatedOperations?: Prisma.OperationLogCreateNestedManyWithoutValidatorInput;
    drivenDispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutDriverInput;
    submittedDispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutSubmitterInput;
    operationResponders?: Prisma.OperationResponderCreateNestedManyWithoutUserInput;
    patientResponders?: Prisma.PatientResponderCreateNestedManyWithoutUserInput;
    inventoryTransactions?: Prisma.InventoryTransactionCreateNestedManyWithoutUserInput;
    operationEdits?: Prisma.OperationLogEditCreateNestedManyWithoutAdminInput;
    operationArchives?: Prisma.OperationLogArchiveCreateNestedManyWithoutArchiverInput;
    inventoryArchives?: Prisma.InventoryArchiveCreateNestedManyWithoutArchiverInput;
    submittedPatients?: Prisma.PatientLogCreateNestedManyWithoutSubmitterInput;
    operationImages?: Prisma.OperationImageAttachmentCreateNestedManyWithoutUploaderInput;
    patientImages?: Prisma.PatientImageAttachmentCreateNestedManyWithoutUploaderInput;
};
export type UserUncheckedCreateWithoutDispatchRespondersInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    submittedOperations?: Prisma.OperationLogUncheckedCreateNestedManyWithoutSubmitterInput;
    validatedOperations?: Prisma.OperationLogUncheckedCreateNestedManyWithoutValidatorInput;
    drivenDispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutDriverInput;
    submittedDispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutSubmitterInput;
    operationResponders?: Prisma.OperationResponderUncheckedCreateNestedManyWithoutUserInput;
    patientResponders?: Prisma.PatientResponderUncheckedCreateNestedManyWithoutUserInput;
    inventoryTransactions?: Prisma.InventoryTransactionUncheckedCreateNestedManyWithoutUserInput;
    operationEdits?: Prisma.OperationLogEditUncheckedCreateNestedManyWithoutAdminInput;
    operationArchives?: Prisma.OperationLogArchiveUncheckedCreateNestedManyWithoutArchiverInput;
    inventoryArchives?: Prisma.InventoryArchiveUncheckedCreateNestedManyWithoutArchiverInput;
    submittedPatients?: Prisma.PatientLogUncheckedCreateNestedManyWithoutSubmitterInput;
    operationImages?: Prisma.OperationImageAttachmentUncheckedCreateNestedManyWithoutUploaderInput;
    patientImages?: Prisma.PatientImageAttachmentUncheckedCreateNestedManyWithoutUploaderInput;
};
export type UserCreateOrConnectWithoutDispatchRespondersInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutDispatchRespondersInput, Prisma.UserUncheckedCreateWithoutDispatchRespondersInput>;
};
export type UserUpsertWithoutDispatchRespondersInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutDispatchRespondersInput, Prisma.UserUncheckedUpdateWithoutDispatchRespondersInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutDispatchRespondersInput, Prisma.UserUncheckedCreateWithoutDispatchRespondersInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutDispatchRespondersInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutDispatchRespondersInput, Prisma.UserUncheckedUpdateWithoutDispatchRespondersInput>;
};
export type UserUpdateWithoutDispatchRespondersInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    submittedOperations?: Prisma.OperationLogUpdateManyWithoutSubmitterNestedInput;
    validatedOperations?: Prisma.OperationLogUpdateManyWithoutValidatorNestedInput;
    drivenDispatches?: Prisma.VehicularDispatchUpdateManyWithoutDriverNestedInput;
    submittedDispatches?: Prisma.VehicularDispatchUpdateManyWithoutSubmitterNestedInput;
    operationResponders?: Prisma.OperationResponderUpdateManyWithoutUserNestedInput;
    patientResponders?: Prisma.PatientResponderUpdateManyWithoutUserNestedInput;
    inventoryTransactions?: Prisma.InventoryTransactionUpdateManyWithoutUserNestedInput;
    operationEdits?: Prisma.OperationLogEditUpdateManyWithoutAdminNestedInput;
    operationArchives?: Prisma.OperationLogArchiveUpdateManyWithoutArchiverNestedInput;
    inventoryArchives?: Prisma.InventoryArchiveUpdateManyWithoutArchiverNestedInput;
    submittedPatients?: Prisma.PatientLogUpdateManyWithoutSubmitterNestedInput;
    operationImages?: Prisma.OperationImageAttachmentUpdateManyWithoutUploaderNestedInput;
    patientImages?: Prisma.PatientImageAttachmentUpdateManyWithoutUploaderNestedInput;
};
export type UserUncheckedUpdateWithoutDispatchRespondersInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    submittedOperations?: Prisma.OperationLogUncheckedUpdateManyWithoutSubmitterNestedInput;
    validatedOperations?: Prisma.OperationLogUncheckedUpdateManyWithoutValidatorNestedInput;
    drivenDispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutDriverNestedInput;
    submittedDispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutSubmitterNestedInput;
    operationResponders?: Prisma.OperationResponderUncheckedUpdateManyWithoutUserNestedInput;
    patientResponders?: Prisma.PatientResponderUncheckedUpdateManyWithoutUserNestedInput;
    inventoryTransactions?: Prisma.InventoryTransactionUncheckedUpdateManyWithoutUserNestedInput;
    operationEdits?: Prisma.OperationLogEditUncheckedUpdateManyWithoutAdminNestedInput;
    operationArchives?: Prisma.OperationLogArchiveUncheckedUpdateManyWithoutArchiverNestedInput;
    inventoryArchives?: Prisma.InventoryArchiveUncheckedUpdateManyWithoutArchiverNestedInput;
    submittedPatients?: Prisma.PatientLogUncheckedUpdateManyWithoutSubmitterNestedInput;
    operationImages?: Prisma.OperationImageAttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
    patientImages?: Prisma.PatientImageAttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
};
export type UserCreateWithoutOperationImagesInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    submittedOperations?: Prisma.OperationLogCreateNestedManyWithoutSubmitterInput;
    validatedOperations?: Prisma.OperationLogCreateNestedManyWithoutValidatorInput;
    drivenDispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutDriverInput;
    submittedDispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutSubmitterInput;
    operationResponders?: Prisma.OperationResponderCreateNestedManyWithoutUserInput;
    patientResponders?: Prisma.PatientResponderCreateNestedManyWithoutUserInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderCreateNestedManyWithoutUserInput;
    inventoryTransactions?: Prisma.InventoryTransactionCreateNestedManyWithoutUserInput;
    operationEdits?: Prisma.OperationLogEditCreateNestedManyWithoutAdminInput;
    operationArchives?: Prisma.OperationLogArchiveCreateNestedManyWithoutArchiverInput;
    inventoryArchives?: Prisma.InventoryArchiveCreateNestedManyWithoutArchiverInput;
    submittedPatients?: Prisma.PatientLogCreateNestedManyWithoutSubmitterInput;
    patientImages?: Prisma.PatientImageAttachmentCreateNestedManyWithoutUploaderInput;
};
export type UserUncheckedCreateWithoutOperationImagesInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    submittedOperations?: Prisma.OperationLogUncheckedCreateNestedManyWithoutSubmitterInput;
    validatedOperations?: Prisma.OperationLogUncheckedCreateNestedManyWithoutValidatorInput;
    drivenDispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutDriverInput;
    submittedDispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutSubmitterInput;
    operationResponders?: Prisma.OperationResponderUncheckedCreateNestedManyWithoutUserInput;
    patientResponders?: Prisma.PatientResponderUncheckedCreateNestedManyWithoutUserInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUncheckedCreateNestedManyWithoutUserInput;
    inventoryTransactions?: Prisma.InventoryTransactionUncheckedCreateNestedManyWithoutUserInput;
    operationEdits?: Prisma.OperationLogEditUncheckedCreateNestedManyWithoutAdminInput;
    operationArchives?: Prisma.OperationLogArchiveUncheckedCreateNestedManyWithoutArchiverInput;
    inventoryArchives?: Prisma.InventoryArchiveUncheckedCreateNestedManyWithoutArchiverInput;
    submittedPatients?: Prisma.PatientLogUncheckedCreateNestedManyWithoutSubmitterInput;
    patientImages?: Prisma.PatientImageAttachmentUncheckedCreateNestedManyWithoutUploaderInput;
};
export type UserCreateOrConnectWithoutOperationImagesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutOperationImagesInput, Prisma.UserUncheckedCreateWithoutOperationImagesInput>;
};
export type UserUpsertWithoutOperationImagesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutOperationImagesInput, Prisma.UserUncheckedUpdateWithoutOperationImagesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutOperationImagesInput, Prisma.UserUncheckedCreateWithoutOperationImagesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutOperationImagesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutOperationImagesInput, Prisma.UserUncheckedUpdateWithoutOperationImagesInput>;
};
export type UserUpdateWithoutOperationImagesInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    submittedOperations?: Prisma.OperationLogUpdateManyWithoutSubmitterNestedInput;
    validatedOperations?: Prisma.OperationLogUpdateManyWithoutValidatorNestedInput;
    drivenDispatches?: Prisma.VehicularDispatchUpdateManyWithoutDriverNestedInput;
    submittedDispatches?: Prisma.VehicularDispatchUpdateManyWithoutSubmitterNestedInput;
    operationResponders?: Prisma.OperationResponderUpdateManyWithoutUserNestedInput;
    patientResponders?: Prisma.PatientResponderUpdateManyWithoutUserNestedInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUpdateManyWithoutUserNestedInput;
    inventoryTransactions?: Prisma.InventoryTransactionUpdateManyWithoutUserNestedInput;
    operationEdits?: Prisma.OperationLogEditUpdateManyWithoutAdminNestedInput;
    operationArchives?: Prisma.OperationLogArchiveUpdateManyWithoutArchiverNestedInput;
    inventoryArchives?: Prisma.InventoryArchiveUpdateManyWithoutArchiverNestedInput;
    submittedPatients?: Prisma.PatientLogUpdateManyWithoutSubmitterNestedInput;
    patientImages?: Prisma.PatientImageAttachmentUpdateManyWithoutUploaderNestedInput;
};
export type UserUncheckedUpdateWithoutOperationImagesInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    submittedOperations?: Prisma.OperationLogUncheckedUpdateManyWithoutSubmitterNestedInput;
    validatedOperations?: Prisma.OperationLogUncheckedUpdateManyWithoutValidatorNestedInput;
    drivenDispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutDriverNestedInput;
    submittedDispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutSubmitterNestedInput;
    operationResponders?: Prisma.OperationResponderUncheckedUpdateManyWithoutUserNestedInput;
    patientResponders?: Prisma.PatientResponderUncheckedUpdateManyWithoutUserNestedInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUncheckedUpdateManyWithoutUserNestedInput;
    inventoryTransactions?: Prisma.InventoryTransactionUncheckedUpdateManyWithoutUserNestedInput;
    operationEdits?: Prisma.OperationLogEditUncheckedUpdateManyWithoutAdminNestedInput;
    operationArchives?: Prisma.OperationLogArchiveUncheckedUpdateManyWithoutArchiverNestedInput;
    inventoryArchives?: Prisma.InventoryArchiveUncheckedUpdateManyWithoutArchiverNestedInput;
    submittedPatients?: Prisma.PatientLogUncheckedUpdateManyWithoutSubmitterNestedInput;
    patientImages?: Prisma.PatientImageAttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
};
export type UserCreateWithoutPatientImagesInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
    submittedOperations?: Prisma.OperationLogCreateNestedManyWithoutSubmitterInput;
    validatedOperations?: Prisma.OperationLogCreateNestedManyWithoutValidatorInput;
    drivenDispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutDriverInput;
    submittedDispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutSubmitterInput;
    operationResponders?: Prisma.OperationResponderCreateNestedManyWithoutUserInput;
    patientResponders?: Prisma.PatientResponderCreateNestedManyWithoutUserInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderCreateNestedManyWithoutUserInput;
    inventoryTransactions?: Prisma.InventoryTransactionCreateNestedManyWithoutUserInput;
    operationEdits?: Prisma.OperationLogEditCreateNestedManyWithoutAdminInput;
    operationArchives?: Prisma.OperationLogArchiveCreateNestedManyWithoutArchiverInput;
    inventoryArchives?: Prisma.InventoryArchiveCreateNestedManyWithoutArchiverInput;
    submittedPatients?: Prisma.PatientLogCreateNestedManyWithoutSubmitterInput;
    operationImages?: Prisma.OperationImageAttachmentCreateNestedManyWithoutUploaderInput;
};
export type UserUncheckedCreateWithoutPatientImagesInput = {
    user_id?: string;
    name: string;
    username: string;
    passwordHash: string;
    pinHash?: string | null;
    pinFailedAttempts?: number;
    pinLockedUntil?: Date | string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
    submittedOperations?: Prisma.OperationLogUncheckedCreateNestedManyWithoutSubmitterInput;
    validatedOperations?: Prisma.OperationLogUncheckedCreateNestedManyWithoutValidatorInput;
    drivenDispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutDriverInput;
    submittedDispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutSubmitterInput;
    operationResponders?: Prisma.OperationResponderUncheckedCreateNestedManyWithoutUserInput;
    patientResponders?: Prisma.PatientResponderUncheckedCreateNestedManyWithoutUserInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUncheckedCreateNestedManyWithoutUserInput;
    inventoryTransactions?: Prisma.InventoryTransactionUncheckedCreateNestedManyWithoutUserInput;
    operationEdits?: Prisma.OperationLogEditUncheckedCreateNestedManyWithoutAdminInput;
    operationArchives?: Prisma.OperationLogArchiveUncheckedCreateNestedManyWithoutArchiverInput;
    inventoryArchives?: Prisma.InventoryArchiveUncheckedCreateNestedManyWithoutArchiverInput;
    submittedPatients?: Prisma.PatientLogUncheckedCreateNestedManyWithoutSubmitterInput;
    operationImages?: Prisma.OperationImageAttachmentUncheckedCreateNestedManyWithoutUploaderInput;
};
export type UserCreateOrConnectWithoutPatientImagesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutPatientImagesInput, Prisma.UserUncheckedCreateWithoutPatientImagesInput>;
};
export type UserUpsertWithoutPatientImagesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutPatientImagesInput, Prisma.UserUncheckedUpdateWithoutPatientImagesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutPatientImagesInput, Prisma.UserUncheckedCreateWithoutPatientImagesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutPatientImagesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutPatientImagesInput, Prisma.UserUncheckedUpdateWithoutPatientImagesInput>;
};
export type UserUpdateWithoutPatientImagesInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput;
    submittedOperations?: Prisma.OperationLogUpdateManyWithoutSubmitterNestedInput;
    validatedOperations?: Prisma.OperationLogUpdateManyWithoutValidatorNestedInput;
    drivenDispatches?: Prisma.VehicularDispatchUpdateManyWithoutDriverNestedInput;
    submittedDispatches?: Prisma.VehicularDispatchUpdateManyWithoutSubmitterNestedInput;
    operationResponders?: Prisma.OperationResponderUpdateManyWithoutUserNestedInput;
    patientResponders?: Prisma.PatientResponderUpdateManyWithoutUserNestedInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUpdateManyWithoutUserNestedInput;
    inventoryTransactions?: Prisma.InventoryTransactionUpdateManyWithoutUserNestedInput;
    operationEdits?: Prisma.OperationLogEditUpdateManyWithoutAdminNestedInput;
    operationArchives?: Prisma.OperationLogArchiveUpdateManyWithoutArchiverNestedInput;
    inventoryArchives?: Prisma.InventoryArchiveUpdateManyWithoutArchiverNestedInput;
    submittedPatients?: Prisma.PatientLogUpdateManyWithoutSubmitterNestedInput;
    operationImages?: Prisma.OperationImageAttachmentUpdateManyWithoutUploaderNestedInput;
};
export type UserUncheckedUpdateWithoutPatientImagesInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    pinHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pinFailedAttempts?: Prisma.IntFieldUpdateOperationsInput | number;
    pinLockedUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
    submittedOperations?: Prisma.OperationLogUncheckedUpdateManyWithoutSubmitterNestedInput;
    validatedOperations?: Prisma.OperationLogUncheckedUpdateManyWithoutValidatorNestedInput;
    drivenDispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutDriverNestedInput;
    submittedDispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutSubmitterNestedInput;
    operationResponders?: Prisma.OperationResponderUncheckedUpdateManyWithoutUserNestedInput;
    patientResponders?: Prisma.PatientResponderUncheckedUpdateManyWithoutUserNestedInput;
    dispatchResponders?: Prisma.VehicularDispatchResponderUncheckedUpdateManyWithoutUserNestedInput;
    inventoryTransactions?: Prisma.InventoryTransactionUncheckedUpdateManyWithoutUserNestedInput;
    operationEdits?: Prisma.OperationLogEditUncheckedUpdateManyWithoutAdminNestedInput;
    operationArchives?: Prisma.OperationLogArchiveUncheckedUpdateManyWithoutArchiverNestedInput;
    inventoryArchives?: Prisma.InventoryArchiveUncheckedUpdateManyWithoutArchiverNestedInput;
    submittedPatients?: Prisma.PatientLogUncheckedUpdateManyWithoutSubmitterNestedInput;
    operationImages?: Prisma.OperationImageAttachmentUncheckedUpdateManyWithoutUploaderNestedInput;
};
/**
 * Count Type UserCountOutputType
 */
export type UserCountOutputType = {
    refreshTokens: number;
    submittedOperations: number;
    validatedOperations: number;
    drivenDispatches: number;
    submittedDispatches: number;
    operationResponders: number;
    patientResponders: number;
    dispatchResponders: number;
    inventoryTransactions: number;
    operationEdits: number;
    operationArchives: number;
    inventoryArchives: number;
    submittedPatients: number;
    operationImages: number;
    patientImages: number;
};
export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    refreshTokens?: boolean | UserCountOutputTypeCountRefreshTokensArgs;
    submittedOperations?: boolean | UserCountOutputTypeCountSubmittedOperationsArgs;
    validatedOperations?: boolean | UserCountOutputTypeCountValidatedOperationsArgs;
    drivenDispatches?: boolean | UserCountOutputTypeCountDrivenDispatchesArgs;
    submittedDispatches?: boolean | UserCountOutputTypeCountSubmittedDispatchesArgs;
    operationResponders?: boolean | UserCountOutputTypeCountOperationRespondersArgs;
    patientResponders?: boolean | UserCountOutputTypeCountPatientRespondersArgs;
    dispatchResponders?: boolean | UserCountOutputTypeCountDispatchRespondersArgs;
    inventoryTransactions?: boolean | UserCountOutputTypeCountInventoryTransactionsArgs;
    operationEdits?: boolean | UserCountOutputTypeCountOperationEditsArgs;
    operationArchives?: boolean | UserCountOutputTypeCountOperationArchivesArgs;
    inventoryArchives?: boolean | UserCountOutputTypeCountInventoryArchivesArgs;
    submittedPatients?: boolean | UserCountOutputTypeCountSubmittedPatientsArgs;
    operationImages?: boolean | UserCountOutputTypeCountOperationImagesArgs;
    patientImages?: boolean | UserCountOutputTypeCountPatientImagesArgs;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: Prisma.UserCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountRefreshTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RefreshTokenWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountSubmittedOperationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OperationLogWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountValidatedOperationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OperationLogWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountDrivenDispatchesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VehicularDispatchWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountSubmittedDispatchesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VehicularDispatchWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountOperationRespondersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OperationResponderWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountPatientRespondersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PatientResponderWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountDispatchRespondersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VehicularDispatchResponderWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountInventoryTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InventoryTransactionWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountOperationEditsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OperationLogEditWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountOperationArchivesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OperationLogArchiveWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountInventoryArchivesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InventoryArchiveWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountSubmittedPatientsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PatientLogWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountOperationImagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OperationImageAttachmentWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountPatientImagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PatientImageAttachmentWhereInput;
};
export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    user_id?: boolean;
    name?: boolean;
    username?: boolean;
    passwordHash?: boolean;
    pinHash?: boolean;
    pinFailedAttempts?: boolean;
    pinLockedUntil?: boolean;
    role?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    refreshTokens?: boolean | Prisma.User$refreshTokensArgs<ExtArgs>;
    submittedOperations?: boolean | Prisma.User$submittedOperationsArgs<ExtArgs>;
    validatedOperations?: boolean | Prisma.User$validatedOperationsArgs<ExtArgs>;
    drivenDispatches?: boolean | Prisma.User$drivenDispatchesArgs<ExtArgs>;
    submittedDispatches?: boolean | Prisma.User$submittedDispatchesArgs<ExtArgs>;
    operationResponders?: boolean | Prisma.User$operationRespondersArgs<ExtArgs>;
    patientResponders?: boolean | Prisma.User$patientRespondersArgs<ExtArgs>;
    dispatchResponders?: boolean | Prisma.User$dispatchRespondersArgs<ExtArgs>;
    inventoryTransactions?: boolean | Prisma.User$inventoryTransactionsArgs<ExtArgs>;
    operationEdits?: boolean | Prisma.User$operationEditsArgs<ExtArgs>;
    operationArchives?: boolean | Prisma.User$operationArchivesArgs<ExtArgs>;
    inventoryArchives?: boolean | Prisma.User$inventoryArchivesArgs<ExtArgs>;
    submittedPatients?: boolean | Prisma.User$submittedPatientsArgs<ExtArgs>;
    operationImages?: boolean | Prisma.User$operationImagesArgs<ExtArgs>;
    patientImages?: boolean | Prisma.User$patientImagesArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    user_id?: boolean;
    name?: boolean;
    username?: boolean;
    passwordHash?: boolean;
    pinHash?: boolean;
    pinFailedAttempts?: boolean;
    pinLockedUntil?: boolean;
    role?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    user_id?: boolean;
    name?: boolean;
    username?: boolean;
    passwordHash?: boolean;
    pinHash?: boolean;
    pinFailedAttempts?: boolean;
    pinLockedUntil?: boolean;
    role?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectScalar = {
    user_id?: boolean;
    name?: boolean;
    username?: boolean;
    passwordHash?: boolean;
    pinHash?: boolean;
    pinFailedAttempts?: boolean;
    pinLockedUntil?: boolean;
    role?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"user_id" | "name" | "username" | "passwordHash" | "pinHash" | "pinFailedAttempts" | "pinLockedUntil" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>;
export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    refreshTokens?: boolean | Prisma.User$refreshTokensArgs<ExtArgs>;
    submittedOperations?: boolean | Prisma.User$submittedOperationsArgs<ExtArgs>;
    validatedOperations?: boolean | Prisma.User$validatedOperationsArgs<ExtArgs>;
    drivenDispatches?: boolean | Prisma.User$drivenDispatchesArgs<ExtArgs>;
    submittedDispatches?: boolean | Prisma.User$submittedDispatchesArgs<ExtArgs>;
    operationResponders?: boolean | Prisma.User$operationRespondersArgs<ExtArgs>;
    patientResponders?: boolean | Prisma.User$patientRespondersArgs<ExtArgs>;
    dispatchResponders?: boolean | Prisma.User$dispatchRespondersArgs<ExtArgs>;
    inventoryTransactions?: boolean | Prisma.User$inventoryTransactionsArgs<ExtArgs>;
    operationEdits?: boolean | Prisma.User$operationEditsArgs<ExtArgs>;
    operationArchives?: boolean | Prisma.User$operationArchivesArgs<ExtArgs>;
    inventoryArchives?: boolean | Prisma.User$inventoryArchivesArgs<ExtArgs>;
    submittedPatients?: boolean | Prisma.User$submittedPatientsArgs<ExtArgs>;
    operationImages?: boolean | Prisma.User$operationImagesArgs<ExtArgs>;
    patientImages?: boolean | Prisma.User$patientImagesArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
};
export type UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User";
    objects: {
        refreshTokens: Prisma.$RefreshTokenPayload<ExtArgs>[];
        submittedOperations: Prisma.$OperationLogPayload<ExtArgs>[];
        validatedOperations: Prisma.$OperationLogPayload<ExtArgs>[];
        drivenDispatches: Prisma.$VehicularDispatchPayload<ExtArgs>[];
        submittedDispatches: Prisma.$VehicularDispatchPayload<ExtArgs>[];
        operationResponders: Prisma.$OperationResponderPayload<ExtArgs>[];
        patientResponders: Prisma.$PatientResponderPayload<ExtArgs>[];
        dispatchResponders: Prisma.$VehicularDispatchResponderPayload<ExtArgs>[];
        inventoryTransactions: Prisma.$InventoryTransactionPayload<ExtArgs>[];
        operationEdits: Prisma.$OperationLogEditPayload<ExtArgs>[];
        operationArchives: Prisma.$OperationLogArchivePayload<ExtArgs>[];
        inventoryArchives: Prisma.$InventoryArchivePayload<ExtArgs>[];
        submittedPatients: Prisma.$PatientLogPayload<ExtArgs>[];
        operationImages: Prisma.$OperationImageAttachmentPayload<ExtArgs>[];
        patientImages: Prisma.$PatientImageAttachmentPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        user_id: string;
        name: string;
        username: string;
        passwordHash: string;
        pinHash: string | null;
        pinFailedAttempts: number;
        pinLockedUntil: Date | null;
        role: $Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["user"]>;
    composites: {};
};
export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;
export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
};
export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['User'];
        meta: {
            name: 'User';
        };
    };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `user_id`
     * const userWithUser_idOnly = await prisma.user.findMany({ select: { user_id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(args?: Prisma.SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(args: Prisma.SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(args?: Prisma.SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `user_id`
     * const userWithUser_idOnly = await prisma.user.createManyAndReturn({
     *   select: { user_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(args: Prisma.SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(args: Prisma.SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(args: Prisma.SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Users and only return the `user_id`
     * const userWithUser_idOnly = await prisma.user.updateManyAndReturn({
     *   select: { user_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: Prisma.SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(args?: Prisma.Subset<T, UserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserGroupByArgs['orderBy'];
    } : {
        orderBy?: UserGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    refreshTokens<T extends Prisma.User$refreshTokensArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$refreshTokensArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    submittedOperations<T extends Prisma.User$submittedOperationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$submittedOperationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    validatedOperations<T extends Prisma.User$validatedOperationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$validatedOperationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    drivenDispatches<T extends Prisma.User$drivenDispatchesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$drivenDispatchesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VehicularDispatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    submittedDispatches<T extends Prisma.User$submittedDispatchesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$submittedDispatchesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VehicularDispatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    operationResponders<T extends Prisma.User$operationRespondersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$operationRespondersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OperationResponderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    patientResponders<T extends Prisma.User$patientRespondersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$patientRespondersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientResponderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    dispatchResponders<T extends Prisma.User$dispatchRespondersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$dispatchRespondersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VehicularDispatchResponderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    inventoryTransactions<T extends Prisma.User$inventoryTransactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$inventoryTransactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InventoryTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    operationEdits<T extends Prisma.User$operationEditsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$operationEditsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OperationLogEditPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    operationArchives<T extends Prisma.User$operationArchivesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$operationArchivesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OperationLogArchivePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    inventoryArchives<T extends Prisma.User$inventoryArchivesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$inventoryArchivesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InventoryArchivePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    submittedPatients<T extends Prisma.User$submittedPatientsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$submittedPatientsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    operationImages<T extends Prisma.User$operationImagesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$operationImagesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OperationImageAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    patientImages<T extends Prisma.User$patientImagesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$patientImagesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientImageAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the User model
 */
export interface UserFieldRefs {
    readonly user_id: Prisma.FieldRef<"User", 'String'>;
    readonly name: Prisma.FieldRef<"User", 'String'>;
    readonly username: Prisma.FieldRef<"User", 'String'>;
    readonly passwordHash: Prisma.FieldRef<"User", 'String'>;
    readonly pinHash: Prisma.FieldRef<"User", 'String'>;
    readonly pinFailedAttempts: Prisma.FieldRef<"User", 'Int'>;
    readonly pinLockedUntil: Prisma.FieldRef<"User", 'DateTime'>;
    readonly role: Prisma.FieldRef<"User", 'Role'>;
    readonly createdAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"User", 'DateTime'>;
}
/**
 * User findUnique
 */
export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User findUniqueOrThrow
 */
export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User findFirst
 */
export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User findFirstOrThrow
 */
export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User findMany
 */
export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which Users to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User create
 */
export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
};
/**
 * User createMany
 */
export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * User createManyAndReturn
 */
export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * User update
 */
export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User updateMany
 */
export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
};
/**
 * User updateManyAndReturn
 */
export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
};
/**
 * User upsert
 */
export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: Prisma.UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
};
/**
 * User delete
 */
export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User deleteMany
 */
export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
};
/**
 * User.refreshTokens
 */
export type User$refreshTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: Prisma.RefreshTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: Prisma.RefreshTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RefreshTokenInclude<ExtArgs> | null;
    where?: Prisma.RefreshTokenWhereInput;
    orderBy?: Prisma.RefreshTokenOrderByWithRelationInput | Prisma.RefreshTokenOrderByWithRelationInput[];
    cursor?: Prisma.RefreshTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RefreshTokenScalarFieldEnum | Prisma.RefreshTokenScalarFieldEnum[];
};
/**
 * User.submittedOperations
 */
export type User$submittedOperationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLog
     */
    select?: Prisma.OperationLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OperationLog
     */
    omit?: Prisma.OperationLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OperationLogInclude<ExtArgs> | null;
    where?: Prisma.OperationLogWhereInput;
    orderBy?: Prisma.OperationLogOrderByWithRelationInput | Prisma.OperationLogOrderByWithRelationInput[];
    cursor?: Prisma.OperationLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OperationLogScalarFieldEnum | Prisma.OperationLogScalarFieldEnum[];
};
/**
 * User.validatedOperations
 */
export type User$validatedOperationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLog
     */
    select?: Prisma.OperationLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OperationLog
     */
    omit?: Prisma.OperationLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OperationLogInclude<ExtArgs> | null;
    where?: Prisma.OperationLogWhereInput;
    orderBy?: Prisma.OperationLogOrderByWithRelationInput | Prisma.OperationLogOrderByWithRelationInput[];
    cursor?: Prisma.OperationLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OperationLogScalarFieldEnum | Prisma.OperationLogScalarFieldEnum[];
};
/**
 * User.drivenDispatches
 */
export type User$drivenDispatchesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicularDispatch
     */
    select?: Prisma.VehicularDispatchSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VehicularDispatch
     */
    omit?: Prisma.VehicularDispatchOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VehicularDispatchInclude<ExtArgs> | null;
    where?: Prisma.VehicularDispatchWhereInput;
    orderBy?: Prisma.VehicularDispatchOrderByWithRelationInput | Prisma.VehicularDispatchOrderByWithRelationInput[];
    cursor?: Prisma.VehicularDispatchWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VehicularDispatchScalarFieldEnum | Prisma.VehicularDispatchScalarFieldEnum[];
};
/**
 * User.submittedDispatches
 */
export type User$submittedDispatchesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicularDispatch
     */
    select?: Prisma.VehicularDispatchSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VehicularDispatch
     */
    omit?: Prisma.VehicularDispatchOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VehicularDispatchInclude<ExtArgs> | null;
    where?: Prisma.VehicularDispatchWhereInput;
    orderBy?: Prisma.VehicularDispatchOrderByWithRelationInput | Prisma.VehicularDispatchOrderByWithRelationInput[];
    cursor?: Prisma.VehicularDispatchWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VehicularDispatchScalarFieldEnum | Prisma.VehicularDispatchScalarFieldEnum[];
};
/**
 * User.operationResponders
 */
export type User$operationRespondersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationResponder
     */
    select?: Prisma.OperationResponderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OperationResponder
     */
    omit?: Prisma.OperationResponderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OperationResponderInclude<ExtArgs> | null;
    where?: Prisma.OperationResponderWhereInput;
    orderBy?: Prisma.OperationResponderOrderByWithRelationInput | Prisma.OperationResponderOrderByWithRelationInput[];
    cursor?: Prisma.OperationResponderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OperationResponderScalarFieldEnum | Prisma.OperationResponderScalarFieldEnum[];
};
/**
 * User.patientResponders
 */
export type User$patientRespondersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientResponder
     */
    select?: Prisma.PatientResponderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientResponder
     */
    omit?: Prisma.PatientResponderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientResponderInclude<ExtArgs> | null;
    where?: Prisma.PatientResponderWhereInput;
    orderBy?: Prisma.PatientResponderOrderByWithRelationInput | Prisma.PatientResponderOrderByWithRelationInput[];
    cursor?: Prisma.PatientResponderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PatientResponderScalarFieldEnum | Prisma.PatientResponderScalarFieldEnum[];
};
/**
 * User.dispatchResponders
 */
export type User$dispatchRespondersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicularDispatchResponder
     */
    select?: Prisma.VehicularDispatchResponderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VehicularDispatchResponder
     */
    omit?: Prisma.VehicularDispatchResponderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VehicularDispatchResponderInclude<ExtArgs> | null;
    where?: Prisma.VehicularDispatchResponderWhereInput;
    orderBy?: Prisma.VehicularDispatchResponderOrderByWithRelationInput | Prisma.VehicularDispatchResponderOrderByWithRelationInput[];
    cursor?: Prisma.VehicularDispatchResponderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VehicularDispatchResponderScalarFieldEnum | Prisma.VehicularDispatchResponderScalarFieldEnum[];
};
/**
 * User.inventoryTransactions
 */
export type User$inventoryTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryTransaction
     */
    select?: Prisma.InventoryTransactionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the InventoryTransaction
     */
    omit?: Prisma.InventoryTransactionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InventoryTransactionInclude<ExtArgs> | null;
    where?: Prisma.InventoryTransactionWhereInput;
    orderBy?: Prisma.InventoryTransactionOrderByWithRelationInput | Prisma.InventoryTransactionOrderByWithRelationInput[];
    cursor?: Prisma.InventoryTransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InventoryTransactionScalarFieldEnum | Prisma.InventoryTransactionScalarFieldEnum[];
};
/**
 * User.operationEdits
 */
export type User$operationEditsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLogEdit
     */
    select?: Prisma.OperationLogEditSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OperationLogEdit
     */
    omit?: Prisma.OperationLogEditOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OperationLogEditInclude<ExtArgs> | null;
    where?: Prisma.OperationLogEditWhereInput;
    orderBy?: Prisma.OperationLogEditOrderByWithRelationInput | Prisma.OperationLogEditOrderByWithRelationInput[];
    cursor?: Prisma.OperationLogEditWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OperationLogEditScalarFieldEnum | Prisma.OperationLogEditScalarFieldEnum[];
};
/**
 * User.operationArchives
 */
export type User$operationArchivesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLogArchive
     */
    select?: Prisma.OperationLogArchiveSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OperationLogArchive
     */
    omit?: Prisma.OperationLogArchiveOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OperationLogArchiveInclude<ExtArgs> | null;
    where?: Prisma.OperationLogArchiveWhereInput;
    orderBy?: Prisma.OperationLogArchiveOrderByWithRelationInput | Prisma.OperationLogArchiveOrderByWithRelationInput[];
    cursor?: Prisma.OperationLogArchiveWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OperationLogArchiveScalarFieldEnum | Prisma.OperationLogArchiveScalarFieldEnum[];
};
/**
 * User.inventoryArchives
 */
export type User$inventoryArchivesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryArchive
     */
    select?: Prisma.InventoryArchiveSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the InventoryArchive
     */
    omit?: Prisma.InventoryArchiveOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InventoryArchiveInclude<ExtArgs> | null;
    where?: Prisma.InventoryArchiveWhereInput;
    orderBy?: Prisma.InventoryArchiveOrderByWithRelationInput | Prisma.InventoryArchiveOrderByWithRelationInput[];
    cursor?: Prisma.InventoryArchiveWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InventoryArchiveScalarFieldEnum | Prisma.InventoryArchiveScalarFieldEnum[];
};
/**
 * User.submittedPatients
 */
export type User$submittedPatientsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientLog
     */
    select?: Prisma.PatientLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientLog
     */
    omit?: Prisma.PatientLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientLogInclude<ExtArgs> | null;
    where?: Prisma.PatientLogWhereInput;
    orderBy?: Prisma.PatientLogOrderByWithRelationInput | Prisma.PatientLogOrderByWithRelationInput[];
    cursor?: Prisma.PatientLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PatientLogScalarFieldEnum | Prisma.PatientLogScalarFieldEnum[];
};
/**
 * User.operationImages
 */
export type User$operationImagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationImageAttachment
     */
    select?: Prisma.OperationImageAttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OperationImageAttachment
     */
    omit?: Prisma.OperationImageAttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OperationImageAttachmentInclude<ExtArgs> | null;
    where?: Prisma.OperationImageAttachmentWhereInput;
    orderBy?: Prisma.OperationImageAttachmentOrderByWithRelationInput | Prisma.OperationImageAttachmentOrderByWithRelationInput[];
    cursor?: Prisma.OperationImageAttachmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OperationImageAttachmentScalarFieldEnum | Prisma.OperationImageAttachmentScalarFieldEnum[];
};
/**
 * User.patientImages
 */
export type User$patientImagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientImageAttachment
     */
    select?: Prisma.PatientImageAttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientImageAttachment
     */
    omit?: Prisma.PatientImageAttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientImageAttachmentInclude<ExtArgs> | null;
    where?: Prisma.PatientImageAttachmentWhereInput;
    orderBy?: Prisma.PatientImageAttachmentOrderByWithRelationInput | Prisma.PatientImageAttachmentOrderByWithRelationInput[];
    cursor?: Prisma.PatientImageAttachmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PatientImageAttachmentScalarFieldEnum | Prisma.PatientImageAttachmentScalarFieldEnum[];
};
/**
 * User without action
 */
export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
};
//# sourceMappingURL=User.d.ts.map