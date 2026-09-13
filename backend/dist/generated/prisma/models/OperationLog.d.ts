import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model OperationLog
 *
 */
export type OperationLogModel = runtime.Types.Result.DefaultSelection<Prisma.$OperationLogPayload>;
export type AggregateOperationLog = {
    _count: OperationLogCountAggregateOutputType | null;
    _min: OperationLogMinAggregateOutputType | null;
    _max: OperationLogMaxAggregateOutputType | null;
};
export type OperationLogMinAggregateOutputType = {
    operation_id: string | null;
    team_id: string | null;
    operation_date: Date | null;
    name_of_caller: string | null;
    nature_of_operation: string | null;
    event_description: string | null;
    submitted_by: string | null;
    validated_by: string | null;
    status: $Enums.OperationStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type OperationLogMaxAggregateOutputType = {
    operation_id: string | null;
    team_id: string | null;
    operation_date: Date | null;
    name_of_caller: string | null;
    nature_of_operation: string | null;
    event_description: string | null;
    submitted_by: string | null;
    validated_by: string | null;
    status: $Enums.OperationStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type OperationLogCountAggregateOutputType = {
    operation_id: number;
    team_id: number;
    operation_date: number;
    name_of_caller: number;
    nature_of_operation: number;
    event_description: number;
    submitted_by: number;
    validated_by: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type OperationLogMinAggregateInputType = {
    operation_id?: true;
    team_id?: true;
    operation_date?: true;
    name_of_caller?: true;
    nature_of_operation?: true;
    event_description?: true;
    submitted_by?: true;
    validated_by?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type OperationLogMaxAggregateInputType = {
    operation_id?: true;
    team_id?: true;
    operation_date?: true;
    name_of_caller?: true;
    nature_of_operation?: true;
    event_description?: true;
    submitted_by?: true;
    validated_by?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type OperationLogCountAggregateInputType = {
    operation_id?: true;
    team_id?: true;
    operation_date?: true;
    name_of_caller?: true;
    nature_of_operation?: true;
    event_description?: true;
    submitted_by?: true;
    validated_by?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type OperationLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which OperationLog to aggregate.
     */
    where?: Prisma.OperationLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OperationLogs to fetch.
     */
    orderBy?: Prisma.OperationLogOrderByWithRelationInput | Prisma.OperationLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.OperationLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OperationLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OperationLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned OperationLogs
    **/
    _count?: true | OperationLogCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: OperationLogMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: OperationLogMaxAggregateInputType;
};
export type GetOperationLogAggregateType<T extends OperationLogAggregateArgs> = {
    [P in keyof T & keyof AggregateOperationLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOperationLog[P]> : Prisma.GetScalarType<T[P], AggregateOperationLog[P]>;
};
export type OperationLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OperationLogWhereInput;
    orderBy?: Prisma.OperationLogOrderByWithAggregationInput | Prisma.OperationLogOrderByWithAggregationInput[];
    by: Prisma.OperationLogScalarFieldEnum[] | Prisma.OperationLogScalarFieldEnum;
    having?: Prisma.OperationLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OperationLogCountAggregateInputType | true;
    _min?: OperationLogMinAggregateInputType;
    _max?: OperationLogMaxAggregateInputType;
};
export type OperationLogGroupByOutputType = {
    operation_id: string;
    team_id: string;
    operation_date: Date;
    name_of_caller: string;
    nature_of_operation: string;
    event_description: string;
    submitted_by: string;
    validated_by: string | null;
    status: $Enums.OperationStatus;
    createdAt: Date;
    updatedAt: Date;
    _count: OperationLogCountAggregateOutputType | null;
    _min: OperationLogMinAggregateOutputType | null;
    _max: OperationLogMaxAggregateOutputType | null;
};
export type GetOperationLogGroupByPayload<T extends OperationLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OperationLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OperationLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OperationLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OperationLogGroupByOutputType[P]>;
}>>;
export type OperationLogWhereInput = {
    AND?: Prisma.OperationLogWhereInput | Prisma.OperationLogWhereInput[];
    OR?: Prisma.OperationLogWhereInput[];
    NOT?: Prisma.OperationLogWhereInput | Prisma.OperationLogWhereInput[];
    operation_id?: Prisma.StringFilter<"OperationLog"> | string;
    team_id?: Prisma.StringFilter<"OperationLog"> | string;
    operation_date?: Prisma.DateTimeFilter<"OperationLog"> | Date | string;
    name_of_caller?: Prisma.StringFilter<"OperationLog"> | string;
    nature_of_operation?: Prisma.StringFilter<"OperationLog"> | string;
    event_description?: Prisma.StringFilter<"OperationLog"> | string;
    submitted_by?: Prisma.StringFilter<"OperationLog"> | string;
    validated_by?: Prisma.StringNullableFilter<"OperationLog"> | string | null;
    status?: Prisma.EnumOperationStatusFilter<"OperationLog"> | $Enums.OperationStatus;
    createdAt?: Prisma.DateTimeFilter<"OperationLog"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OperationLog"> | Date | string;
    team?: Prisma.XOR<Prisma.ResponseTeamScalarRelationFilter, Prisma.ResponseTeamWhereInput>;
    submitter?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    validator?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    responders?: Prisma.OperationResponderListRelationFilter;
    personsInvolved?: Prisma.PersonsInvolvedListRelationFilter;
    inventoryItems?: Prisma.OperationInventoryListRelationFilter;
    edits?: Prisma.OperationLogEditListRelationFilter;
    archive?: Prisma.XOR<Prisma.OperationLogArchiveNullableScalarRelationFilter, Prisma.OperationLogArchiveWhereInput> | null;
    dispatches?: Prisma.VehicularDispatchListRelationFilter;
    images?: Prisma.OperationImageAttachmentListRelationFilter;
};
export type OperationLogOrderByWithRelationInput = {
    operation_id?: Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    operation_date?: Prisma.SortOrder;
    name_of_caller?: Prisma.SortOrder;
    nature_of_operation?: Prisma.SortOrder;
    event_description?: Prisma.SortOrder;
    submitted_by?: Prisma.SortOrder;
    validated_by?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    team?: Prisma.ResponseTeamOrderByWithRelationInput;
    submitter?: Prisma.UserOrderByWithRelationInput;
    validator?: Prisma.UserOrderByWithRelationInput;
    responders?: Prisma.OperationResponderOrderByRelationAggregateInput;
    personsInvolved?: Prisma.PersonsInvolvedOrderByRelationAggregateInput;
    inventoryItems?: Prisma.OperationInventoryOrderByRelationAggregateInput;
    edits?: Prisma.OperationLogEditOrderByRelationAggregateInput;
    archive?: Prisma.OperationLogArchiveOrderByWithRelationInput;
    dispatches?: Prisma.VehicularDispatchOrderByRelationAggregateInput;
    images?: Prisma.OperationImageAttachmentOrderByRelationAggregateInput;
};
export type OperationLogWhereUniqueInput = Prisma.AtLeast<{
    operation_id?: string;
    AND?: Prisma.OperationLogWhereInput | Prisma.OperationLogWhereInput[];
    OR?: Prisma.OperationLogWhereInput[];
    NOT?: Prisma.OperationLogWhereInput | Prisma.OperationLogWhereInput[];
    team_id?: Prisma.StringFilter<"OperationLog"> | string;
    operation_date?: Prisma.DateTimeFilter<"OperationLog"> | Date | string;
    name_of_caller?: Prisma.StringFilter<"OperationLog"> | string;
    nature_of_operation?: Prisma.StringFilter<"OperationLog"> | string;
    event_description?: Prisma.StringFilter<"OperationLog"> | string;
    submitted_by?: Prisma.StringFilter<"OperationLog"> | string;
    validated_by?: Prisma.StringNullableFilter<"OperationLog"> | string | null;
    status?: Prisma.EnumOperationStatusFilter<"OperationLog"> | $Enums.OperationStatus;
    createdAt?: Prisma.DateTimeFilter<"OperationLog"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OperationLog"> | Date | string;
    team?: Prisma.XOR<Prisma.ResponseTeamScalarRelationFilter, Prisma.ResponseTeamWhereInput>;
    submitter?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    validator?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    responders?: Prisma.OperationResponderListRelationFilter;
    personsInvolved?: Prisma.PersonsInvolvedListRelationFilter;
    inventoryItems?: Prisma.OperationInventoryListRelationFilter;
    edits?: Prisma.OperationLogEditListRelationFilter;
    archive?: Prisma.XOR<Prisma.OperationLogArchiveNullableScalarRelationFilter, Prisma.OperationLogArchiveWhereInput> | null;
    dispatches?: Prisma.VehicularDispatchListRelationFilter;
    images?: Prisma.OperationImageAttachmentListRelationFilter;
}, "operation_id">;
export type OperationLogOrderByWithAggregationInput = {
    operation_id?: Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    operation_date?: Prisma.SortOrder;
    name_of_caller?: Prisma.SortOrder;
    nature_of_operation?: Prisma.SortOrder;
    event_description?: Prisma.SortOrder;
    submitted_by?: Prisma.SortOrder;
    validated_by?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.OperationLogCountOrderByAggregateInput;
    _max?: Prisma.OperationLogMaxOrderByAggregateInput;
    _min?: Prisma.OperationLogMinOrderByAggregateInput;
};
export type OperationLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.OperationLogScalarWhereWithAggregatesInput | Prisma.OperationLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.OperationLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OperationLogScalarWhereWithAggregatesInput | Prisma.OperationLogScalarWhereWithAggregatesInput[];
    operation_id?: Prisma.StringWithAggregatesFilter<"OperationLog"> | string;
    team_id?: Prisma.StringWithAggregatesFilter<"OperationLog"> | string;
    operation_date?: Prisma.DateTimeWithAggregatesFilter<"OperationLog"> | Date | string;
    name_of_caller?: Prisma.StringWithAggregatesFilter<"OperationLog"> | string;
    nature_of_operation?: Prisma.StringWithAggregatesFilter<"OperationLog"> | string;
    event_description?: Prisma.StringWithAggregatesFilter<"OperationLog"> | string;
    submitted_by?: Prisma.StringWithAggregatesFilter<"OperationLog"> | string;
    validated_by?: Prisma.StringNullableWithAggregatesFilter<"OperationLog"> | string | null;
    status?: Prisma.EnumOperationStatusWithAggregatesFilter<"OperationLog"> | $Enums.OperationStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"OperationLog"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"OperationLog"> | Date | string;
};
export type OperationLogCreateInput = {
    operation_id?: string;
    operation_date: Date | string;
    name_of_caller: string;
    nature_of_operation: string;
    event_description: string;
    status?: $Enums.OperationStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    team: Prisma.ResponseTeamCreateNestedOneWithoutOperationsInput;
    submitter: Prisma.UserCreateNestedOneWithoutSubmittedOperationsInput;
    validator?: Prisma.UserCreateNestedOneWithoutValidatedOperationsInput;
    responders?: Prisma.OperationResponderCreateNestedManyWithoutOperationInput;
    personsInvolved?: Prisma.PersonsInvolvedCreateNestedManyWithoutOperationInput;
    inventoryItems?: Prisma.OperationInventoryCreateNestedManyWithoutOperationInput;
    edits?: Prisma.OperationLogEditCreateNestedManyWithoutOperationInput;
    archive?: Prisma.OperationLogArchiveCreateNestedOneWithoutOperationInput;
    dispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutOperationInput;
    images?: Prisma.OperationImageAttachmentCreateNestedManyWithoutOperationInput;
};
export type OperationLogUncheckedCreateInput = {
    operation_id?: string;
    team_id: string;
    operation_date: Date | string;
    name_of_caller: string;
    nature_of_operation: string;
    event_description: string;
    submitted_by: string;
    validated_by?: string | null;
    status?: $Enums.OperationStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    responders?: Prisma.OperationResponderUncheckedCreateNestedManyWithoutOperationInput;
    personsInvolved?: Prisma.PersonsInvolvedUncheckedCreateNestedManyWithoutOperationInput;
    inventoryItems?: Prisma.OperationInventoryUncheckedCreateNestedManyWithoutOperationInput;
    edits?: Prisma.OperationLogEditUncheckedCreateNestedManyWithoutOperationInput;
    archive?: Prisma.OperationLogArchiveUncheckedCreateNestedOneWithoutOperationInput;
    dispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutOperationInput;
    images?: Prisma.OperationImageAttachmentUncheckedCreateNestedManyWithoutOperationInput;
};
export type OperationLogUpdateInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name_of_caller?: Prisma.StringFieldUpdateOperationsInput | string;
    nature_of_operation?: Prisma.StringFieldUpdateOperationsInput | string;
    event_description?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOperationStatusFieldUpdateOperationsInput | $Enums.OperationStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    team?: Prisma.ResponseTeamUpdateOneRequiredWithoutOperationsNestedInput;
    submitter?: Prisma.UserUpdateOneRequiredWithoutSubmittedOperationsNestedInput;
    validator?: Prisma.UserUpdateOneWithoutValidatedOperationsNestedInput;
    responders?: Prisma.OperationResponderUpdateManyWithoutOperationNestedInput;
    personsInvolved?: Prisma.PersonsInvolvedUpdateManyWithoutOperationNestedInput;
    inventoryItems?: Prisma.OperationInventoryUpdateManyWithoutOperationNestedInput;
    edits?: Prisma.OperationLogEditUpdateManyWithoutOperationNestedInput;
    archive?: Prisma.OperationLogArchiveUpdateOneWithoutOperationNestedInput;
    dispatches?: Prisma.VehicularDispatchUpdateManyWithoutOperationNestedInput;
    images?: Prisma.OperationImageAttachmentUpdateManyWithoutOperationNestedInput;
};
export type OperationLogUncheckedUpdateInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    team_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name_of_caller?: Prisma.StringFieldUpdateOperationsInput | string;
    nature_of_operation?: Prisma.StringFieldUpdateOperationsInput | string;
    event_description?: Prisma.StringFieldUpdateOperationsInput | string;
    submitted_by?: Prisma.StringFieldUpdateOperationsInput | string;
    validated_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumOperationStatusFieldUpdateOperationsInput | $Enums.OperationStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    responders?: Prisma.OperationResponderUncheckedUpdateManyWithoutOperationNestedInput;
    personsInvolved?: Prisma.PersonsInvolvedUncheckedUpdateManyWithoutOperationNestedInput;
    inventoryItems?: Prisma.OperationInventoryUncheckedUpdateManyWithoutOperationNestedInput;
    edits?: Prisma.OperationLogEditUncheckedUpdateManyWithoutOperationNestedInput;
    archive?: Prisma.OperationLogArchiveUncheckedUpdateOneWithoutOperationNestedInput;
    dispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutOperationNestedInput;
    images?: Prisma.OperationImageAttachmentUncheckedUpdateManyWithoutOperationNestedInput;
};
export type OperationLogCreateManyInput = {
    operation_id?: string;
    team_id: string;
    operation_date: Date | string;
    name_of_caller: string;
    nature_of_operation: string;
    event_description: string;
    submitted_by: string;
    validated_by?: string | null;
    status?: $Enums.OperationStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OperationLogUpdateManyMutationInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name_of_caller?: Prisma.StringFieldUpdateOperationsInput | string;
    nature_of_operation?: Prisma.StringFieldUpdateOperationsInput | string;
    event_description?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOperationStatusFieldUpdateOperationsInput | $Enums.OperationStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OperationLogUncheckedUpdateManyInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    team_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name_of_caller?: Prisma.StringFieldUpdateOperationsInput | string;
    nature_of_operation?: Prisma.StringFieldUpdateOperationsInput | string;
    event_description?: Prisma.StringFieldUpdateOperationsInput | string;
    submitted_by?: Prisma.StringFieldUpdateOperationsInput | string;
    validated_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumOperationStatusFieldUpdateOperationsInput | $Enums.OperationStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OperationLogListRelationFilter = {
    every?: Prisma.OperationLogWhereInput;
    some?: Prisma.OperationLogWhereInput;
    none?: Prisma.OperationLogWhereInput;
};
export type OperationLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type OperationLogCountOrderByAggregateInput = {
    operation_id?: Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    operation_date?: Prisma.SortOrder;
    name_of_caller?: Prisma.SortOrder;
    nature_of_operation?: Prisma.SortOrder;
    event_description?: Prisma.SortOrder;
    submitted_by?: Prisma.SortOrder;
    validated_by?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OperationLogMaxOrderByAggregateInput = {
    operation_id?: Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    operation_date?: Prisma.SortOrder;
    name_of_caller?: Prisma.SortOrder;
    nature_of_operation?: Prisma.SortOrder;
    event_description?: Prisma.SortOrder;
    submitted_by?: Prisma.SortOrder;
    validated_by?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OperationLogMinOrderByAggregateInput = {
    operation_id?: Prisma.SortOrder;
    team_id?: Prisma.SortOrder;
    operation_date?: Prisma.SortOrder;
    name_of_caller?: Prisma.SortOrder;
    nature_of_operation?: Prisma.SortOrder;
    event_description?: Prisma.SortOrder;
    submitted_by?: Prisma.SortOrder;
    validated_by?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OperationLogScalarRelationFilter = {
    is?: Prisma.OperationLogWhereInput;
    isNot?: Prisma.OperationLogWhereInput;
};
export type OperationLogNullableScalarRelationFilter = {
    is?: Prisma.OperationLogWhereInput | null;
    isNot?: Prisma.OperationLogWhereInput | null;
};
export type OperationLogCreateNestedManyWithoutSubmitterInput = {
    create?: Prisma.XOR<Prisma.OperationLogCreateWithoutSubmitterInput, Prisma.OperationLogUncheckedCreateWithoutSubmitterInput> | Prisma.OperationLogCreateWithoutSubmitterInput[] | Prisma.OperationLogUncheckedCreateWithoutSubmitterInput[];
    connectOrCreate?: Prisma.OperationLogCreateOrConnectWithoutSubmitterInput | Prisma.OperationLogCreateOrConnectWithoutSubmitterInput[];
    createMany?: Prisma.OperationLogCreateManySubmitterInputEnvelope;
    connect?: Prisma.OperationLogWhereUniqueInput | Prisma.OperationLogWhereUniqueInput[];
};
export type OperationLogCreateNestedManyWithoutValidatorInput = {
    create?: Prisma.XOR<Prisma.OperationLogCreateWithoutValidatorInput, Prisma.OperationLogUncheckedCreateWithoutValidatorInput> | Prisma.OperationLogCreateWithoutValidatorInput[] | Prisma.OperationLogUncheckedCreateWithoutValidatorInput[];
    connectOrCreate?: Prisma.OperationLogCreateOrConnectWithoutValidatorInput | Prisma.OperationLogCreateOrConnectWithoutValidatorInput[];
    createMany?: Prisma.OperationLogCreateManyValidatorInputEnvelope;
    connect?: Prisma.OperationLogWhereUniqueInput | Prisma.OperationLogWhereUniqueInput[];
};
export type OperationLogUncheckedCreateNestedManyWithoutSubmitterInput = {
    create?: Prisma.XOR<Prisma.OperationLogCreateWithoutSubmitterInput, Prisma.OperationLogUncheckedCreateWithoutSubmitterInput> | Prisma.OperationLogCreateWithoutSubmitterInput[] | Prisma.OperationLogUncheckedCreateWithoutSubmitterInput[];
    connectOrCreate?: Prisma.OperationLogCreateOrConnectWithoutSubmitterInput | Prisma.OperationLogCreateOrConnectWithoutSubmitterInput[];
    createMany?: Prisma.OperationLogCreateManySubmitterInputEnvelope;
    connect?: Prisma.OperationLogWhereUniqueInput | Prisma.OperationLogWhereUniqueInput[];
};
export type OperationLogUncheckedCreateNestedManyWithoutValidatorInput = {
    create?: Prisma.XOR<Prisma.OperationLogCreateWithoutValidatorInput, Prisma.OperationLogUncheckedCreateWithoutValidatorInput> | Prisma.OperationLogCreateWithoutValidatorInput[] | Prisma.OperationLogUncheckedCreateWithoutValidatorInput[];
    connectOrCreate?: Prisma.OperationLogCreateOrConnectWithoutValidatorInput | Prisma.OperationLogCreateOrConnectWithoutValidatorInput[];
    createMany?: Prisma.OperationLogCreateManyValidatorInputEnvelope;
    connect?: Prisma.OperationLogWhereUniqueInput | Prisma.OperationLogWhereUniqueInput[];
};
export type OperationLogUpdateManyWithoutSubmitterNestedInput = {
    create?: Prisma.XOR<Prisma.OperationLogCreateWithoutSubmitterInput, Prisma.OperationLogUncheckedCreateWithoutSubmitterInput> | Prisma.OperationLogCreateWithoutSubmitterInput[] | Prisma.OperationLogUncheckedCreateWithoutSubmitterInput[];
    connectOrCreate?: Prisma.OperationLogCreateOrConnectWithoutSubmitterInput | Prisma.OperationLogCreateOrConnectWithoutSubmitterInput[];
    upsert?: Prisma.OperationLogUpsertWithWhereUniqueWithoutSubmitterInput | Prisma.OperationLogUpsertWithWhereUniqueWithoutSubmitterInput[];
    createMany?: Prisma.OperationLogCreateManySubmitterInputEnvelope;
    set?: Prisma.OperationLogWhereUniqueInput | Prisma.OperationLogWhereUniqueInput[];
    disconnect?: Prisma.OperationLogWhereUniqueInput | Prisma.OperationLogWhereUniqueInput[];
    delete?: Prisma.OperationLogWhereUniqueInput | Prisma.OperationLogWhereUniqueInput[];
    connect?: Prisma.OperationLogWhereUniqueInput | Prisma.OperationLogWhereUniqueInput[];
    update?: Prisma.OperationLogUpdateWithWhereUniqueWithoutSubmitterInput | Prisma.OperationLogUpdateWithWhereUniqueWithoutSubmitterInput[];
    updateMany?: Prisma.OperationLogUpdateManyWithWhereWithoutSubmitterInput | Prisma.OperationLogUpdateManyWithWhereWithoutSubmitterInput[];
    deleteMany?: Prisma.OperationLogScalarWhereInput | Prisma.OperationLogScalarWhereInput[];
};
export type OperationLogUpdateManyWithoutValidatorNestedInput = {
    create?: Prisma.XOR<Prisma.OperationLogCreateWithoutValidatorInput, Prisma.OperationLogUncheckedCreateWithoutValidatorInput> | Prisma.OperationLogCreateWithoutValidatorInput[] | Prisma.OperationLogUncheckedCreateWithoutValidatorInput[];
    connectOrCreate?: Prisma.OperationLogCreateOrConnectWithoutValidatorInput | Prisma.OperationLogCreateOrConnectWithoutValidatorInput[];
    upsert?: Prisma.OperationLogUpsertWithWhereUniqueWithoutValidatorInput | Prisma.OperationLogUpsertWithWhereUniqueWithoutValidatorInput[];
    createMany?: Prisma.OperationLogCreateManyValidatorInputEnvelope;
    set?: Prisma.OperationLogWhereUniqueInput | Prisma.OperationLogWhereUniqueInput[];
    disconnect?: Prisma.OperationLogWhereUniqueInput | Prisma.OperationLogWhereUniqueInput[];
    delete?: Prisma.OperationLogWhereUniqueInput | Prisma.OperationLogWhereUniqueInput[];
    connect?: Prisma.OperationLogWhereUniqueInput | Prisma.OperationLogWhereUniqueInput[];
    update?: Prisma.OperationLogUpdateWithWhereUniqueWithoutValidatorInput | Prisma.OperationLogUpdateWithWhereUniqueWithoutValidatorInput[];
    updateMany?: Prisma.OperationLogUpdateManyWithWhereWithoutValidatorInput | Prisma.OperationLogUpdateManyWithWhereWithoutValidatorInput[];
    deleteMany?: Prisma.OperationLogScalarWhereInput | Prisma.OperationLogScalarWhereInput[];
};
export type OperationLogUncheckedUpdateManyWithoutSubmitterNestedInput = {
    create?: Prisma.XOR<Prisma.OperationLogCreateWithoutSubmitterInput, Prisma.OperationLogUncheckedCreateWithoutSubmitterInput> | Prisma.OperationLogCreateWithoutSubmitterInput[] | Prisma.OperationLogUncheckedCreateWithoutSubmitterInput[];
    connectOrCreate?: Prisma.OperationLogCreateOrConnectWithoutSubmitterInput | Prisma.OperationLogCreateOrConnectWithoutSubmitterInput[];
    upsert?: Prisma.OperationLogUpsertWithWhereUniqueWithoutSubmitterInput | Prisma.OperationLogUpsertWithWhereUniqueWithoutSubmitterInput[];
    createMany?: Prisma.OperationLogCreateManySubmitterInputEnvelope;
    set?: Prisma.OperationLogWhereUniqueInput | Prisma.OperationLogWhereUniqueInput[];
    disconnect?: Prisma.OperationLogWhereUniqueInput | Prisma.OperationLogWhereUniqueInput[];
    delete?: Prisma.OperationLogWhereUniqueInput | Prisma.OperationLogWhereUniqueInput[];
    connect?: Prisma.OperationLogWhereUniqueInput | Prisma.OperationLogWhereUniqueInput[];
    update?: Prisma.OperationLogUpdateWithWhereUniqueWithoutSubmitterInput | Prisma.OperationLogUpdateWithWhereUniqueWithoutSubmitterInput[];
    updateMany?: Prisma.OperationLogUpdateManyWithWhereWithoutSubmitterInput | Prisma.OperationLogUpdateManyWithWhereWithoutSubmitterInput[];
    deleteMany?: Prisma.OperationLogScalarWhereInput | Prisma.OperationLogScalarWhereInput[];
};
export type OperationLogUncheckedUpdateManyWithoutValidatorNestedInput = {
    create?: Prisma.XOR<Prisma.OperationLogCreateWithoutValidatorInput, Prisma.OperationLogUncheckedCreateWithoutValidatorInput> | Prisma.OperationLogCreateWithoutValidatorInput[] | Prisma.OperationLogUncheckedCreateWithoutValidatorInput[];
    connectOrCreate?: Prisma.OperationLogCreateOrConnectWithoutValidatorInput | Prisma.OperationLogCreateOrConnectWithoutValidatorInput[];
    upsert?: Prisma.OperationLogUpsertWithWhereUniqueWithoutValidatorInput | Prisma.OperationLogUpsertWithWhereUniqueWithoutValidatorInput[];
    createMany?: Prisma.OperationLogCreateManyValidatorInputEnvelope;
    set?: Prisma.OperationLogWhereUniqueInput | Prisma.OperationLogWhereUniqueInput[];
    disconnect?: Prisma.OperationLogWhereUniqueInput | Prisma.OperationLogWhereUniqueInput[];
    delete?: Prisma.OperationLogWhereUniqueInput | Prisma.OperationLogWhereUniqueInput[];
    connect?: Prisma.OperationLogWhereUniqueInput | Prisma.OperationLogWhereUniqueInput[];
    update?: Prisma.OperationLogUpdateWithWhereUniqueWithoutValidatorInput | Prisma.OperationLogUpdateWithWhereUniqueWithoutValidatorInput[];
    updateMany?: Prisma.OperationLogUpdateManyWithWhereWithoutValidatorInput | Prisma.OperationLogUpdateManyWithWhereWithoutValidatorInput[];
    deleteMany?: Prisma.OperationLogScalarWhereInput | Prisma.OperationLogScalarWhereInput[];
};
export type OperationLogCreateNestedManyWithoutTeamInput = {
    create?: Prisma.XOR<Prisma.OperationLogCreateWithoutTeamInput, Prisma.OperationLogUncheckedCreateWithoutTeamInput> | Prisma.OperationLogCreateWithoutTeamInput[] | Prisma.OperationLogUncheckedCreateWithoutTeamInput[];
    connectOrCreate?: Prisma.OperationLogCreateOrConnectWithoutTeamInput | Prisma.OperationLogCreateOrConnectWithoutTeamInput[];
    createMany?: Prisma.OperationLogCreateManyTeamInputEnvelope;
    connect?: Prisma.OperationLogWhereUniqueInput | Prisma.OperationLogWhereUniqueInput[];
};
export type OperationLogUncheckedCreateNestedManyWithoutTeamInput = {
    create?: Prisma.XOR<Prisma.OperationLogCreateWithoutTeamInput, Prisma.OperationLogUncheckedCreateWithoutTeamInput> | Prisma.OperationLogCreateWithoutTeamInput[] | Prisma.OperationLogUncheckedCreateWithoutTeamInput[];
    connectOrCreate?: Prisma.OperationLogCreateOrConnectWithoutTeamInput | Prisma.OperationLogCreateOrConnectWithoutTeamInput[];
    createMany?: Prisma.OperationLogCreateManyTeamInputEnvelope;
    connect?: Prisma.OperationLogWhereUniqueInput | Prisma.OperationLogWhereUniqueInput[];
};
export type OperationLogUpdateManyWithoutTeamNestedInput = {
    create?: Prisma.XOR<Prisma.OperationLogCreateWithoutTeamInput, Prisma.OperationLogUncheckedCreateWithoutTeamInput> | Prisma.OperationLogCreateWithoutTeamInput[] | Prisma.OperationLogUncheckedCreateWithoutTeamInput[];
    connectOrCreate?: Prisma.OperationLogCreateOrConnectWithoutTeamInput | Prisma.OperationLogCreateOrConnectWithoutTeamInput[];
    upsert?: Prisma.OperationLogUpsertWithWhereUniqueWithoutTeamInput | Prisma.OperationLogUpsertWithWhereUniqueWithoutTeamInput[];
    createMany?: Prisma.OperationLogCreateManyTeamInputEnvelope;
    set?: Prisma.OperationLogWhereUniqueInput | Prisma.OperationLogWhereUniqueInput[];
    disconnect?: Prisma.OperationLogWhereUniqueInput | Prisma.OperationLogWhereUniqueInput[];
    delete?: Prisma.OperationLogWhereUniqueInput | Prisma.OperationLogWhereUniqueInput[];
    connect?: Prisma.OperationLogWhereUniqueInput | Prisma.OperationLogWhereUniqueInput[];
    update?: Prisma.OperationLogUpdateWithWhereUniqueWithoutTeamInput | Prisma.OperationLogUpdateWithWhereUniqueWithoutTeamInput[];
    updateMany?: Prisma.OperationLogUpdateManyWithWhereWithoutTeamInput | Prisma.OperationLogUpdateManyWithWhereWithoutTeamInput[];
    deleteMany?: Prisma.OperationLogScalarWhereInput | Prisma.OperationLogScalarWhereInput[];
};
export type OperationLogUncheckedUpdateManyWithoutTeamNestedInput = {
    create?: Prisma.XOR<Prisma.OperationLogCreateWithoutTeamInput, Prisma.OperationLogUncheckedCreateWithoutTeamInput> | Prisma.OperationLogCreateWithoutTeamInput[] | Prisma.OperationLogUncheckedCreateWithoutTeamInput[];
    connectOrCreate?: Prisma.OperationLogCreateOrConnectWithoutTeamInput | Prisma.OperationLogCreateOrConnectWithoutTeamInput[];
    upsert?: Prisma.OperationLogUpsertWithWhereUniqueWithoutTeamInput | Prisma.OperationLogUpsertWithWhereUniqueWithoutTeamInput[];
    createMany?: Prisma.OperationLogCreateManyTeamInputEnvelope;
    set?: Prisma.OperationLogWhereUniqueInput | Prisma.OperationLogWhereUniqueInput[];
    disconnect?: Prisma.OperationLogWhereUniqueInput | Prisma.OperationLogWhereUniqueInput[];
    delete?: Prisma.OperationLogWhereUniqueInput | Prisma.OperationLogWhereUniqueInput[];
    connect?: Prisma.OperationLogWhereUniqueInput | Prisma.OperationLogWhereUniqueInput[];
    update?: Prisma.OperationLogUpdateWithWhereUniqueWithoutTeamInput | Prisma.OperationLogUpdateWithWhereUniqueWithoutTeamInput[];
    updateMany?: Prisma.OperationLogUpdateManyWithWhereWithoutTeamInput | Prisma.OperationLogUpdateManyWithWhereWithoutTeamInput[];
    deleteMany?: Prisma.OperationLogScalarWhereInput | Prisma.OperationLogScalarWhereInput[];
};
export type EnumOperationStatusFieldUpdateOperationsInput = {
    set?: $Enums.OperationStatus;
};
export type OperationLogCreateNestedOneWithoutRespondersInput = {
    create?: Prisma.XOR<Prisma.OperationLogCreateWithoutRespondersInput, Prisma.OperationLogUncheckedCreateWithoutRespondersInput>;
    connectOrCreate?: Prisma.OperationLogCreateOrConnectWithoutRespondersInput;
    connect?: Prisma.OperationLogWhereUniqueInput;
};
export type OperationLogUpdateOneRequiredWithoutRespondersNestedInput = {
    create?: Prisma.XOR<Prisma.OperationLogCreateWithoutRespondersInput, Prisma.OperationLogUncheckedCreateWithoutRespondersInput>;
    connectOrCreate?: Prisma.OperationLogCreateOrConnectWithoutRespondersInput;
    upsert?: Prisma.OperationLogUpsertWithoutRespondersInput;
    connect?: Prisma.OperationLogWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OperationLogUpdateToOneWithWhereWithoutRespondersInput, Prisma.OperationLogUpdateWithoutRespondersInput>, Prisma.OperationLogUncheckedUpdateWithoutRespondersInput>;
};
export type OperationLogCreateNestedOneWithoutPersonsInvolvedInput = {
    create?: Prisma.XOR<Prisma.OperationLogCreateWithoutPersonsInvolvedInput, Prisma.OperationLogUncheckedCreateWithoutPersonsInvolvedInput>;
    connectOrCreate?: Prisma.OperationLogCreateOrConnectWithoutPersonsInvolvedInput;
    connect?: Prisma.OperationLogWhereUniqueInput;
};
export type OperationLogUpdateOneRequiredWithoutPersonsInvolvedNestedInput = {
    create?: Prisma.XOR<Prisma.OperationLogCreateWithoutPersonsInvolvedInput, Prisma.OperationLogUncheckedCreateWithoutPersonsInvolvedInput>;
    connectOrCreate?: Prisma.OperationLogCreateOrConnectWithoutPersonsInvolvedInput;
    upsert?: Prisma.OperationLogUpsertWithoutPersonsInvolvedInput;
    connect?: Prisma.OperationLogWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OperationLogUpdateToOneWithWhereWithoutPersonsInvolvedInput, Prisma.OperationLogUpdateWithoutPersonsInvolvedInput>, Prisma.OperationLogUncheckedUpdateWithoutPersonsInvolvedInput>;
};
export type OperationLogCreateNestedOneWithoutInventoryItemsInput = {
    create?: Prisma.XOR<Prisma.OperationLogCreateWithoutInventoryItemsInput, Prisma.OperationLogUncheckedCreateWithoutInventoryItemsInput>;
    connectOrCreate?: Prisma.OperationLogCreateOrConnectWithoutInventoryItemsInput;
    connect?: Prisma.OperationLogWhereUniqueInput;
};
export type OperationLogUpdateOneRequiredWithoutInventoryItemsNestedInput = {
    create?: Prisma.XOR<Prisma.OperationLogCreateWithoutInventoryItemsInput, Prisma.OperationLogUncheckedCreateWithoutInventoryItemsInput>;
    connectOrCreate?: Prisma.OperationLogCreateOrConnectWithoutInventoryItemsInput;
    upsert?: Prisma.OperationLogUpsertWithoutInventoryItemsInput;
    connect?: Prisma.OperationLogWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OperationLogUpdateToOneWithWhereWithoutInventoryItemsInput, Prisma.OperationLogUpdateWithoutInventoryItemsInput>, Prisma.OperationLogUncheckedUpdateWithoutInventoryItemsInput>;
};
export type OperationLogCreateNestedOneWithoutEditsInput = {
    create?: Prisma.XOR<Prisma.OperationLogCreateWithoutEditsInput, Prisma.OperationLogUncheckedCreateWithoutEditsInput>;
    connectOrCreate?: Prisma.OperationLogCreateOrConnectWithoutEditsInput;
    connect?: Prisma.OperationLogWhereUniqueInput;
};
export type OperationLogUpdateOneRequiredWithoutEditsNestedInput = {
    create?: Prisma.XOR<Prisma.OperationLogCreateWithoutEditsInput, Prisma.OperationLogUncheckedCreateWithoutEditsInput>;
    connectOrCreate?: Prisma.OperationLogCreateOrConnectWithoutEditsInput;
    upsert?: Prisma.OperationLogUpsertWithoutEditsInput;
    connect?: Prisma.OperationLogWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OperationLogUpdateToOneWithWhereWithoutEditsInput, Prisma.OperationLogUpdateWithoutEditsInput>, Prisma.OperationLogUncheckedUpdateWithoutEditsInput>;
};
export type OperationLogCreateNestedOneWithoutArchiveInput = {
    create?: Prisma.XOR<Prisma.OperationLogCreateWithoutArchiveInput, Prisma.OperationLogUncheckedCreateWithoutArchiveInput>;
    connectOrCreate?: Prisma.OperationLogCreateOrConnectWithoutArchiveInput;
    connect?: Prisma.OperationLogWhereUniqueInput;
};
export type OperationLogUpdateOneRequiredWithoutArchiveNestedInput = {
    create?: Prisma.XOR<Prisma.OperationLogCreateWithoutArchiveInput, Prisma.OperationLogUncheckedCreateWithoutArchiveInput>;
    connectOrCreate?: Prisma.OperationLogCreateOrConnectWithoutArchiveInput;
    upsert?: Prisma.OperationLogUpsertWithoutArchiveInput;
    connect?: Prisma.OperationLogWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OperationLogUpdateToOneWithWhereWithoutArchiveInput, Prisma.OperationLogUpdateWithoutArchiveInput>, Prisma.OperationLogUncheckedUpdateWithoutArchiveInput>;
};
export type OperationLogCreateNestedOneWithoutDispatchesInput = {
    create?: Prisma.XOR<Prisma.OperationLogCreateWithoutDispatchesInput, Prisma.OperationLogUncheckedCreateWithoutDispatchesInput>;
    connectOrCreate?: Prisma.OperationLogCreateOrConnectWithoutDispatchesInput;
    connect?: Prisma.OperationLogWhereUniqueInput;
};
export type OperationLogUpdateOneWithoutDispatchesNestedInput = {
    create?: Prisma.XOR<Prisma.OperationLogCreateWithoutDispatchesInput, Prisma.OperationLogUncheckedCreateWithoutDispatchesInput>;
    connectOrCreate?: Prisma.OperationLogCreateOrConnectWithoutDispatchesInput;
    upsert?: Prisma.OperationLogUpsertWithoutDispatchesInput;
    disconnect?: Prisma.OperationLogWhereInput | boolean;
    delete?: Prisma.OperationLogWhereInput | boolean;
    connect?: Prisma.OperationLogWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OperationLogUpdateToOneWithWhereWithoutDispatchesInput, Prisma.OperationLogUpdateWithoutDispatchesInput>, Prisma.OperationLogUncheckedUpdateWithoutDispatchesInput>;
};
export type OperationLogCreateNestedOneWithoutImagesInput = {
    create?: Prisma.XOR<Prisma.OperationLogCreateWithoutImagesInput, Prisma.OperationLogUncheckedCreateWithoutImagesInput>;
    connectOrCreate?: Prisma.OperationLogCreateOrConnectWithoutImagesInput;
    connect?: Prisma.OperationLogWhereUniqueInput;
};
export type OperationLogUpdateOneRequiredWithoutImagesNestedInput = {
    create?: Prisma.XOR<Prisma.OperationLogCreateWithoutImagesInput, Prisma.OperationLogUncheckedCreateWithoutImagesInput>;
    connectOrCreate?: Prisma.OperationLogCreateOrConnectWithoutImagesInput;
    upsert?: Prisma.OperationLogUpsertWithoutImagesInput;
    connect?: Prisma.OperationLogWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OperationLogUpdateToOneWithWhereWithoutImagesInput, Prisma.OperationLogUpdateWithoutImagesInput>, Prisma.OperationLogUncheckedUpdateWithoutImagesInput>;
};
export type OperationLogCreateWithoutSubmitterInput = {
    operation_id?: string;
    operation_date: Date | string;
    name_of_caller: string;
    nature_of_operation: string;
    event_description: string;
    status?: $Enums.OperationStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    team: Prisma.ResponseTeamCreateNestedOneWithoutOperationsInput;
    validator?: Prisma.UserCreateNestedOneWithoutValidatedOperationsInput;
    responders?: Prisma.OperationResponderCreateNestedManyWithoutOperationInput;
    personsInvolved?: Prisma.PersonsInvolvedCreateNestedManyWithoutOperationInput;
    inventoryItems?: Prisma.OperationInventoryCreateNestedManyWithoutOperationInput;
    edits?: Prisma.OperationLogEditCreateNestedManyWithoutOperationInput;
    archive?: Prisma.OperationLogArchiveCreateNestedOneWithoutOperationInput;
    dispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutOperationInput;
    images?: Prisma.OperationImageAttachmentCreateNestedManyWithoutOperationInput;
};
export type OperationLogUncheckedCreateWithoutSubmitterInput = {
    operation_id?: string;
    team_id: string;
    operation_date: Date | string;
    name_of_caller: string;
    nature_of_operation: string;
    event_description: string;
    validated_by?: string | null;
    status?: $Enums.OperationStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    responders?: Prisma.OperationResponderUncheckedCreateNestedManyWithoutOperationInput;
    personsInvolved?: Prisma.PersonsInvolvedUncheckedCreateNestedManyWithoutOperationInput;
    inventoryItems?: Prisma.OperationInventoryUncheckedCreateNestedManyWithoutOperationInput;
    edits?: Prisma.OperationLogEditUncheckedCreateNestedManyWithoutOperationInput;
    archive?: Prisma.OperationLogArchiveUncheckedCreateNestedOneWithoutOperationInput;
    dispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutOperationInput;
    images?: Prisma.OperationImageAttachmentUncheckedCreateNestedManyWithoutOperationInput;
};
export type OperationLogCreateOrConnectWithoutSubmitterInput = {
    where: Prisma.OperationLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.OperationLogCreateWithoutSubmitterInput, Prisma.OperationLogUncheckedCreateWithoutSubmitterInput>;
};
export type OperationLogCreateManySubmitterInputEnvelope = {
    data: Prisma.OperationLogCreateManySubmitterInput | Prisma.OperationLogCreateManySubmitterInput[];
    skipDuplicates?: boolean;
};
export type OperationLogCreateWithoutValidatorInput = {
    operation_id?: string;
    operation_date: Date | string;
    name_of_caller: string;
    nature_of_operation: string;
    event_description: string;
    status?: $Enums.OperationStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    team: Prisma.ResponseTeamCreateNestedOneWithoutOperationsInput;
    submitter: Prisma.UserCreateNestedOneWithoutSubmittedOperationsInput;
    responders?: Prisma.OperationResponderCreateNestedManyWithoutOperationInput;
    personsInvolved?: Prisma.PersonsInvolvedCreateNestedManyWithoutOperationInput;
    inventoryItems?: Prisma.OperationInventoryCreateNestedManyWithoutOperationInput;
    edits?: Prisma.OperationLogEditCreateNestedManyWithoutOperationInput;
    archive?: Prisma.OperationLogArchiveCreateNestedOneWithoutOperationInput;
    dispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutOperationInput;
    images?: Prisma.OperationImageAttachmentCreateNestedManyWithoutOperationInput;
};
export type OperationLogUncheckedCreateWithoutValidatorInput = {
    operation_id?: string;
    team_id: string;
    operation_date: Date | string;
    name_of_caller: string;
    nature_of_operation: string;
    event_description: string;
    submitted_by: string;
    status?: $Enums.OperationStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    responders?: Prisma.OperationResponderUncheckedCreateNestedManyWithoutOperationInput;
    personsInvolved?: Prisma.PersonsInvolvedUncheckedCreateNestedManyWithoutOperationInput;
    inventoryItems?: Prisma.OperationInventoryUncheckedCreateNestedManyWithoutOperationInput;
    edits?: Prisma.OperationLogEditUncheckedCreateNestedManyWithoutOperationInput;
    archive?: Prisma.OperationLogArchiveUncheckedCreateNestedOneWithoutOperationInput;
    dispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutOperationInput;
    images?: Prisma.OperationImageAttachmentUncheckedCreateNestedManyWithoutOperationInput;
};
export type OperationLogCreateOrConnectWithoutValidatorInput = {
    where: Prisma.OperationLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.OperationLogCreateWithoutValidatorInput, Prisma.OperationLogUncheckedCreateWithoutValidatorInput>;
};
export type OperationLogCreateManyValidatorInputEnvelope = {
    data: Prisma.OperationLogCreateManyValidatorInput | Prisma.OperationLogCreateManyValidatorInput[];
    skipDuplicates?: boolean;
};
export type OperationLogUpsertWithWhereUniqueWithoutSubmitterInput = {
    where: Prisma.OperationLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.OperationLogUpdateWithoutSubmitterInput, Prisma.OperationLogUncheckedUpdateWithoutSubmitterInput>;
    create: Prisma.XOR<Prisma.OperationLogCreateWithoutSubmitterInput, Prisma.OperationLogUncheckedCreateWithoutSubmitterInput>;
};
export type OperationLogUpdateWithWhereUniqueWithoutSubmitterInput = {
    where: Prisma.OperationLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.OperationLogUpdateWithoutSubmitterInput, Prisma.OperationLogUncheckedUpdateWithoutSubmitterInput>;
};
export type OperationLogUpdateManyWithWhereWithoutSubmitterInput = {
    where: Prisma.OperationLogScalarWhereInput;
    data: Prisma.XOR<Prisma.OperationLogUpdateManyMutationInput, Prisma.OperationLogUncheckedUpdateManyWithoutSubmitterInput>;
};
export type OperationLogScalarWhereInput = {
    AND?: Prisma.OperationLogScalarWhereInput | Prisma.OperationLogScalarWhereInput[];
    OR?: Prisma.OperationLogScalarWhereInput[];
    NOT?: Prisma.OperationLogScalarWhereInput | Prisma.OperationLogScalarWhereInput[];
    operation_id?: Prisma.StringFilter<"OperationLog"> | string;
    team_id?: Prisma.StringFilter<"OperationLog"> | string;
    operation_date?: Prisma.DateTimeFilter<"OperationLog"> | Date | string;
    name_of_caller?: Prisma.StringFilter<"OperationLog"> | string;
    nature_of_operation?: Prisma.StringFilter<"OperationLog"> | string;
    event_description?: Prisma.StringFilter<"OperationLog"> | string;
    submitted_by?: Prisma.StringFilter<"OperationLog"> | string;
    validated_by?: Prisma.StringNullableFilter<"OperationLog"> | string | null;
    status?: Prisma.EnumOperationStatusFilter<"OperationLog"> | $Enums.OperationStatus;
    createdAt?: Prisma.DateTimeFilter<"OperationLog"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OperationLog"> | Date | string;
};
export type OperationLogUpsertWithWhereUniqueWithoutValidatorInput = {
    where: Prisma.OperationLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.OperationLogUpdateWithoutValidatorInput, Prisma.OperationLogUncheckedUpdateWithoutValidatorInput>;
    create: Prisma.XOR<Prisma.OperationLogCreateWithoutValidatorInput, Prisma.OperationLogUncheckedCreateWithoutValidatorInput>;
};
export type OperationLogUpdateWithWhereUniqueWithoutValidatorInput = {
    where: Prisma.OperationLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.OperationLogUpdateWithoutValidatorInput, Prisma.OperationLogUncheckedUpdateWithoutValidatorInput>;
};
export type OperationLogUpdateManyWithWhereWithoutValidatorInput = {
    where: Prisma.OperationLogScalarWhereInput;
    data: Prisma.XOR<Prisma.OperationLogUpdateManyMutationInput, Prisma.OperationLogUncheckedUpdateManyWithoutValidatorInput>;
};
export type OperationLogCreateWithoutTeamInput = {
    operation_id?: string;
    operation_date: Date | string;
    name_of_caller: string;
    nature_of_operation: string;
    event_description: string;
    status?: $Enums.OperationStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    submitter: Prisma.UserCreateNestedOneWithoutSubmittedOperationsInput;
    validator?: Prisma.UserCreateNestedOneWithoutValidatedOperationsInput;
    responders?: Prisma.OperationResponderCreateNestedManyWithoutOperationInput;
    personsInvolved?: Prisma.PersonsInvolvedCreateNestedManyWithoutOperationInput;
    inventoryItems?: Prisma.OperationInventoryCreateNestedManyWithoutOperationInput;
    edits?: Prisma.OperationLogEditCreateNestedManyWithoutOperationInput;
    archive?: Prisma.OperationLogArchiveCreateNestedOneWithoutOperationInput;
    dispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutOperationInput;
    images?: Prisma.OperationImageAttachmentCreateNestedManyWithoutOperationInput;
};
export type OperationLogUncheckedCreateWithoutTeamInput = {
    operation_id?: string;
    operation_date: Date | string;
    name_of_caller: string;
    nature_of_operation: string;
    event_description: string;
    submitted_by: string;
    validated_by?: string | null;
    status?: $Enums.OperationStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    responders?: Prisma.OperationResponderUncheckedCreateNestedManyWithoutOperationInput;
    personsInvolved?: Prisma.PersonsInvolvedUncheckedCreateNestedManyWithoutOperationInput;
    inventoryItems?: Prisma.OperationInventoryUncheckedCreateNestedManyWithoutOperationInput;
    edits?: Prisma.OperationLogEditUncheckedCreateNestedManyWithoutOperationInput;
    archive?: Prisma.OperationLogArchiveUncheckedCreateNestedOneWithoutOperationInput;
    dispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutOperationInput;
    images?: Prisma.OperationImageAttachmentUncheckedCreateNestedManyWithoutOperationInput;
};
export type OperationLogCreateOrConnectWithoutTeamInput = {
    where: Prisma.OperationLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.OperationLogCreateWithoutTeamInput, Prisma.OperationLogUncheckedCreateWithoutTeamInput>;
};
export type OperationLogCreateManyTeamInputEnvelope = {
    data: Prisma.OperationLogCreateManyTeamInput | Prisma.OperationLogCreateManyTeamInput[];
    skipDuplicates?: boolean;
};
export type OperationLogUpsertWithWhereUniqueWithoutTeamInput = {
    where: Prisma.OperationLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.OperationLogUpdateWithoutTeamInput, Prisma.OperationLogUncheckedUpdateWithoutTeamInput>;
    create: Prisma.XOR<Prisma.OperationLogCreateWithoutTeamInput, Prisma.OperationLogUncheckedCreateWithoutTeamInput>;
};
export type OperationLogUpdateWithWhereUniqueWithoutTeamInput = {
    where: Prisma.OperationLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.OperationLogUpdateWithoutTeamInput, Prisma.OperationLogUncheckedUpdateWithoutTeamInput>;
};
export type OperationLogUpdateManyWithWhereWithoutTeamInput = {
    where: Prisma.OperationLogScalarWhereInput;
    data: Prisma.XOR<Prisma.OperationLogUpdateManyMutationInput, Prisma.OperationLogUncheckedUpdateManyWithoutTeamInput>;
};
export type OperationLogCreateWithoutRespondersInput = {
    operation_id?: string;
    operation_date: Date | string;
    name_of_caller: string;
    nature_of_operation: string;
    event_description: string;
    status?: $Enums.OperationStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    team: Prisma.ResponseTeamCreateNestedOneWithoutOperationsInput;
    submitter: Prisma.UserCreateNestedOneWithoutSubmittedOperationsInput;
    validator?: Prisma.UserCreateNestedOneWithoutValidatedOperationsInput;
    personsInvolved?: Prisma.PersonsInvolvedCreateNestedManyWithoutOperationInput;
    inventoryItems?: Prisma.OperationInventoryCreateNestedManyWithoutOperationInput;
    edits?: Prisma.OperationLogEditCreateNestedManyWithoutOperationInput;
    archive?: Prisma.OperationLogArchiveCreateNestedOneWithoutOperationInput;
    dispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutOperationInput;
    images?: Prisma.OperationImageAttachmentCreateNestedManyWithoutOperationInput;
};
export type OperationLogUncheckedCreateWithoutRespondersInput = {
    operation_id?: string;
    team_id: string;
    operation_date: Date | string;
    name_of_caller: string;
    nature_of_operation: string;
    event_description: string;
    submitted_by: string;
    validated_by?: string | null;
    status?: $Enums.OperationStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    personsInvolved?: Prisma.PersonsInvolvedUncheckedCreateNestedManyWithoutOperationInput;
    inventoryItems?: Prisma.OperationInventoryUncheckedCreateNestedManyWithoutOperationInput;
    edits?: Prisma.OperationLogEditUncheckedCreateNestedManyWithoutOperationInput;
    archive?: Prisma.OperationLogArchiveUncheckedCreateNestedOneWithoutOperationInput;
    dispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutOperationInput;
    images?: Prisma.OperationImageAttachmentUncheckedCreateNestedManyWithoutOperationInput;
};
export type OperationLogCreateOrConnectWithoutRespondersInput = {
    where: Prisma.OperationLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.OperationLogCreateWithoutRespondersInput, Prisma.OperationLogUncheckedCreateWithoutRespondersInput>;
};
export type OperationLogUpsertWithoutRespondersInput = {
    update: Prisma.XOR<Prisma.OperationLogUpdateWithoutRespondersInput, Prisma.OperationLogUncheckedUpdateWithoutRespondersInput>;
    create: Prisma.XOR<Prisma.OperationLogCreateWithoutRespondersInput, Prisma.OperationLogUncheckedCreateWithoutRespondersInput>;
    where?: Prisma.OperationLogWhereInput;
};
export type OperationLogUpdateToOneWithWhereWithoutRespondersInput = {
    where?: Prisma.OperationLogWhereInput;
    data: Prisma.XOR<Prisma.OperationLogUpdateWithoutRespondersInput, Prisma.OperationLogUncheckedUpdateWithoutRespondersInput>;
};
export type OperationLogUpdateWithoutRespondersInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name_of_caller?: Prisma.StringFieldUpdateOperationsInput | string;
    nature_of_operation?: Prisma.StringFieldUpdateOperationsInput | string;
    event_description?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOperationStatusFieldUpdateOperationsInput | $Enums.OperationStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    team?: Prisma.ResponseTeamUpdateOneRequiredWithoutOperationsNestedInput;
    submitter?: Prisma.UserUpdateOneRequiredWithoutSubmittedOperationsNestedInput;
    validator?: Prisma.UserUpdateOneWithoutValidatedOperationsNestedInput;
    personsInvolved?: Prisma.PersonsInvolvedUpdateManyWithoutOperationNestedInput;
    inventoryItems?: Prisma.OperationInventoryUpdateManyWithoutOperationNestedInput;
    edits?: Prisma.OperationLogEditUpdateManyWithoutOperationNestedInput;
    archive?: Prisma.OperationLogArchiveUpdateOneWithoutOperationNestedInput;
    dispatches?: Prisma.VehicularDispatchUpdateManyWithoutOperationNestedInput;
    images?: Prisma.OperationImageAttachmentUpdateManyWithoutOperationNestedInput;
};
export type OperationLogUncheckedUpdateWithoutRespondersInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    team_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name_of_caller?: Prisma.StringFieldUpdateOperationsInput | string;
    nature_of_operation?: Prisma.StringFieldUpdateOperationsInput | string;
    event_description?: Prisma.StringFieldUpdateOperationsInput | string;
    submitted_by?: Prisma.StringFieldUpdateOperationsInput | string;
    validated_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumOperationStatusFieldUpdateOperationsInput | $Enums.OperationStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    personsInvolved?: Prisma.PersonsInvolvedUncheckedUpdateManyWithoutOperationNestedInput;
    inventoryItems?: Prisma.OperationInventoryUncheckedUpdateManyWithoutOperationNestedInput;
    edits?: Prisma.OperationLogEditUncheckedUpdateManyWithoutOperationNestedInput;
    archive?: Prisma.OperationLogArchiveUncheckedUpdateOneWithoutOperationNestedInput;
    dispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutOperationNestedInput;
    images?: Prisma.OperationImageAttachmentUncheckedUpdateManyWithoutOperationNestedInput;
};
export type OperationLogCreateWithoutPersonsInvolvedInput = {
    operation_id?: string;
    operation_date: Date | string;
    name_of_caller: string;
    nature_of_operation: string;
    event_description: string;
    status?: $Enums.OperationStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    team: Prisma.ResponseTeamCreateNestedOneWithoutOperationsInput;
    submitter: Prisma.UserCreateNestedOneWithoutSubmittedOperationsInput;
    validator?: Prisma.UserCreateNestedOneWithoutValidatedOperationsInput;
    responders?: Prisma.OperationResponderCreateNestedManyWithoutOperationInput;
    inventoryItems?: Prisma.OperationInventoryCreateNestedManyWithoutOperationInput;
    edits?: Prisma.OperationLogEditCreateNestedManyWithoutOperationInput;
    archive?: Prisma.OperationLogArchiveCreateNestedOneWithoutOperationInput;
    dispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutOperationInput;
    images?: Prisma.OperationImageAttachmentCreateNestedManyWithoutOperationInput;
};
export type OperationLogUncheckedCreateWithoutPersonsInvolvedInput = {
    operation_id?: string;
    team_id: string;
    operation_date: Date | string;
    name_of_caller: string;
    nature_of_operation: string;
    event_description: string;
    submitted_by: string;
    validated_by?: string | null;
    status?: $Enums.OperationStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    responders?: Prisma.OperationResponderUncheckedCreateNestedManyWithoutOperationInput;
    inventoryItems?: Prisma.OperationInventoryUncheckedCreateNestedManyWithoutOperationInput;
    edits?: Prisma.OperationLogEditUncheckedCreateNestedManyWithoutOperationInput;
    archive?: Prisma.OperationLogArchiveUncheckedCreateNestedOneWithoutOperationInput;
    dispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutOperationInput;
    images?: Prisma.OperationImageAttachmentUncheckedCreateNestedManyWithoutOperationInput;
};
export type OperationLogCreateOrConnectWithoutPersonsInvolvedInput = {
    where: Prisma.OperationLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.OperationLogCreateWithoutPersonsInvolvedInput, Prisma.OperationLogUncheckedCreateWithoutPersonsInvolvedInput>;
};
export type OperationLogUpsertWithoutPersonsInvolvedInput = {
    update: Prisma.XOR<Prisma.OperationLogUpdateWithoutPersonsInvolvedInput, Prisma.OperationLogUncheckedUpdateWithoutPersonsInvolvedInput>;
    create: Prisma.XOR<Prisma.OperationLogCreateWithoutPersonsInvolvedInput, Prisma.OperationLogUncheckedCreateWithoutPersonsInvolvedInput>;
    where?: Prisma.OperationLogWhereInput;
};
export type OperationLogUpdateToOneWithWhereWithoutPersonsInvolvedInput = {
    where?: Prisma.OperationLogWhereInput;
    data: Prisma.XOR<Prisma.OperationLogUpdateWithoutPersonsInvolvedInput, Prisma.OperationLogUncheckedUpdateWithoutPersonsInvolvedInput>;
};
export type OperationLogUpdateWithoutPersonsInvolvedInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name_of_caller?: Prisma.StringFieldUpdateOperationsInput | string;
    nature_of_operation?: Prisma.StringFieldUpdateOperationsInput | string;
    event_description?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOperationStatusFieldUpdateOperationsInput | $Enums.OperationStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    team?: Prisma.ResponseTeamUpdateOneRequiredWithoutOperationsNestedInput;
    submitter?: Prisma.UserUpdateOneRequiredWithoutSubmittedOperationsNestedInput;
    validator?: Prisma.UserUpdateOneWithoutValidatedOperationsNestedInput;
    responders?: Prisma.OperationResponderUpdateManyWithoutOperationNestedInput;
    inventoryItems?: Prisma.OperationInventoryUpdateManyWithoutOperationNestedInput;
    edits?: Prisma.OperationLogEditUpdateManyWithoutOperationNestedInput;
    archive?: Prisma.OperationLogArchiveUpdateOneWithoutOperationNestedInput;
    dispatches?: Prisma.VehicularDispatchUpdateManyWithoutOperationNestedInput;
    images?: Prisma.OperationImageAttachmentUpdateManyWithoutOperationNestedInput;
};
export type OperationLogUncheckedUpdateWithoutPersonsInvolvedInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    team_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name_of_caller?: Prisma.StringFieldUpdateOperationsInput | string;
    nature_of_operation?: Prisma.StringFieldUpdateOperationsInput | string;
    event_description?: Prisma.StringFieldUpdateOperationsInput | string;
    submitted_by?: Prisma.StringFieldUpdateOperationsInput | string;
    validated_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumOperationStatusFieldUpdateOperationsInput | $Enums.OperationStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    responders?: Prisma.OperationResponderUncheckedUpdateManyWithoutOperationNestedInput;
    inventoryItems?: Prisma.OperationInventoryUncheckedUpdateManyWithoutOperationNestedInput;
    edits?: Prisma.OperationLogEditUncheckedUpdateManyWithoutOperationNestedInput;
    archive?: Prisma.OperationLogArchiveUncheckedUpdateOneWithoutOperationNestedInput;
    dispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutOperationNestedInput;
    images?: Prisma.OperationImageAttachmentUncheckedUpdateManyWithoutOperationNestedInput;
};
export type OperationLogCreateWithoutInventoryItemsInput = {
    operation_id?: string;
    operation_date: Date | string;
    name_of_caller: string;
    nature_of_operation: string;
    event_description: string;
    status?: $Enums.OperationStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    team: Prisma.ResponseTeamCreateNestedOneWithoutOperationsInput;
    submitter: Prisma.UserCreateNestedOneWithoutSubmittedOperationsInput;
    validator?: Prisma.UserCreateNestedOneWithoutValidatedOperationsInput;
    responders?: Prisma.OperationResponderCreateNestedManyWithoutOperationInput;
    personsInvolved?: Prisma.PersonsInvolvedCreateNestedManyWithoutOperationInput;
    edits?: Prisma.OperationLogEditCreateNestedManyWithoutOperationInput;
    archive?: Prisma.OperationLogArchiveCreateNestedOneWithoutOperationInput;
    dispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutOperationInput;
    images?: Prisma.OperationImageAttachmentCreateNestedManyWithoutOperationInput;
};
export type OperationLogUncheckedCreateWithoutInventoryItemsInput = {
    operation_id?: string;
    team_id: string;
    operation_date: Date | string;
    name_of_caller: string;
    nature_of_operation: string;
    event_description: string;
    submitted_by: string;
    validated_by?: string | null;
    status?: $Enums.OperationStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    responders?: Prisma.OperationResponderUncheckedCreateNestedManyWithoutOperationInput;
    personsInvolved?: Prisma.PersonsInvolvedUncheckedCreateNestedManyWithoutOperationInput;
    edits?: Prisma.OperationLogEditUncheckedCreateNestedManyWithoutOperationInput;
    archive?: Prisma.OperationLogArchiveUncheckedCreateNestedOneWithoutOperationInput;
    dispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutOperationInput;
    images?: Prisma.OperationImageAttachmentUncheckedCreateNestedManyWithoutOperationInput;
};
export type OperationLogCreateOrConnectWithoutInventoryItemsInput = {
    where: Prisma.OperationLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.OperationLogCreateWithoutInventoryItemsInput, Prisma.OperationLogUncheckedCreateWithoutInventoryItemsInput>;
};
export type OperationLogUpsertWithoutInventoryItemsInput = {
    update: Prisma.XOR<Prisma.OperationLogUpdateWithoutInventoryItemsInput, Prisma.OperationLogUncheckedUpdateWithoutInventoryItemsInput>;
    create: Prisma.XOR<Prisma.OperationLogCreateWithoutInventoryItemsInput, Prisma.OperationLogUncheckedCreateWithoutInventoryItemsInput>;
    where?: Prisma.OperationLogWhereInput;
};
export type OperationLogUpdateToOneWithWhereWithoutInventoryItemsInput = {
    where?: Prisma.OperationLogWhereInput;
    data: Prisma.XOR<Prisma.OperationLogUpdateWithoutInventoryItemsInput, Prisma.OperationLogUncheckedUpdateWithoutInventoryItemsInput>;
};
export type OperationLogUpdateWithoutInventoryItemsInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name_of_caller?: Prisma.StringFieldUpdateOperationsInput | string;
    nature_of_operation?: Prisma.StringFieldUpdateOperationsInput | string;
    event_description?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOperationStatusFieldUpdateOperationsInput | $Enums.OperationStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    team?: Prisma.ResponseTeamUpdateOneRequiredWithoutOperationsNestedInput;
    submitter?: Prisma.UserUpdateOneRequiredWithoutSubmittedOperationsNestedInput;
    validator?: Prisma.UserUpdateOneWithoutValidatedOperationsNestedInput;
    responders?: Prisma.OperationResponderUpdateManyWithoutOperationNestedInput;
    personsInvolved?: Prisma.PersonsInvolvedUpdateManyWithoutOperationNestedInput;
    edits?: Prisma.OperationLogEditUpdateManyWithoutOperationNestedInput;
    archive?: Prisma.OperationLogArchiveUpdateOneWithoutOperationNestedInput;
    dispatches?: Prisma.VehicularDispatchUpdateManyWithoutOperationNestedInput;
    images?: Prisma.OperationImageAttachmentUpdateManyWithoutOperationNestedInput;
};
export type OperationLogUncheckedUpdateWithoutInventoryItemsInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    team_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name_of_caller?: Prisma.StringFieldUpdateOperationsInput | string;
    nature_of_operation?: Prisma.StringFieldUpdateOperationsInput | string;
    event_description?: Prisma.StringFieldUpdateOperationsInput | string;
    submitted_by?: Prisma.StringFieldUpdateOperationsInput | string;
    validated_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumOperationStatusFieldUpdateOperationsInput | $Enums.OperationStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    responders?: Prisma.OperationResponderUncheckedUpdateManyWithoutOperationNestedInput;
    personsInvolved?: Prisma.PersonsInvolvedUncheckedUpdateManyWithoutOperationNestedInput;
    edits?: Prisma.OperationLogEditUncheckedUpdateManyWithoutOperationNestedInput;
    archive?: Prisma.OperationLogArchiveUncheckedUpdateOneWithoutOperationNestedInput;
    dispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutOperationNestedInput;
    images?: Prisma.OperationImageAttachmentUncheckedUpdateManyWithoutOperationNestedInput;
};
export type OperationLogCreateWithoutEditsInput = {
    operation_id?: string;
    operation_date: Date | string;
    name_of_caller: string;
    nature_of_operation: string;
    event_description: string;
    status?: $Enums.OperationStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    team: Prisma.ResponseTeamCreateNestedOneWithoutOperationsInput;
    submitter: Prisma.UserCreateNestedOneWithoutSubmittedOperationsInput;
    validator?: Prisma.UserCreateNestedOneWithoutValidatedOperationsInput;
    responders?: Prisma.OperationResponderCreateNestedManyWithoutOperationInput;
    personsInvolved?: Prisma.PersonsInvolvedCreateNestedManyWithoutOperationInput;
    inventoryItems?: Prisma.OperationInventoryCreateNestedManyWithoutOperationInput;
    archive?: Prisma.OperationLogArchiveCreateNestedOneWithoutOperationInput;
    dispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutOperationInput;
    images?: Prisma.OperationImageAttachmentCreateNestedManyWithoutOperationInput;
};
export type OperationLogUncheckedCreateWithoutEditsInput = {
    operation_id?: string;
    team_id: string;
    operation_date: Date | string;
    name_of_caller: string;
    nature_of_operation: string;
    event_description: string;
    submitted_by: string;
    validated_by?: string | null;
    status?: $Enums.OperationStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    responders?: Prisma.OperationResponderUncheckedCreateNestedManyWithoutOperationInput;
    personsInvolved?: Prisma.PersonsInvolvedUncheckedCreateNestedManyWithoutOperationInput;
    inventoryItems?: Prisma.OperationInventoryUncheckedCreateNestedManyWithoutOperationInput;
    archive?: Prisma.OperationLogArchiveUncheckedCreateNestedOneWithoutOperationInput;
    dispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutOperationInput;
    images?: Prisma.OperationImageAttachmentUncheckedCreateNestedManyWithoutOperationInput;
};
export type OperationLogCreateOrConnectWithoutEditsInput = {
    where: Prisma.OperationLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.OperationLogCreateWithoutEditsInput, Prisma.OperationLogUncheckedCreateWithoutEditsInput>;
};
export type OperationLogUpsertWithoutEditsInput = {
    update: Prisma.XOR<Prisma.OperationLogUpdateWithoutEditsInput, Prisma.OperationLogUncheckedUpdateWithoutEditsInput>;
    create: Prisma.XOR<Prisma.OperationLogCreateWithoutEditsInput, Prisma.OperationLogUncheckedCreateWithoutEditsInput>;
    where?: Prisma.OperationLogWhereInput;
};
export type OperationLogUpdateToOneWithWhereWithoutEditsInput = {
    where?: Prisma.OperationLogWhereInput;
    data: Prisma.XOR<Prisma.OperationLogUpdateWithoutEditsInput, Prisma.OperationLogUncheckedUpdateWithoutEditsInput>;
};
export type OperationLogUpdateWithoutEditsInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name_of_caller?: Prisma.StringFieldUpdateOperationsInput | string;
    nature_of_operation?: Prisma.StringFieldUpdateOperationsInput | string;
    event_description?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOperationStatusFieldUpdateOperationsInput | $Enums.OperationStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    team?: Prisma.ResponseTeamUpdateOneRequiredWithoutOperationsNestedInput;
    submitter?: Prisma.UserUpdateOneRequiredWithoutSubmittedOperationsNestedInput;
    validator?: Prisma.UserUpdateOneWithoutValidatedOperationsNestedInput;
    responders?: Prisma.OperationResponderUpdateManyWithoutOperationNestedInput;
    personsInvolved?: Prisma.PersonsInvolvedUpdateManyWithoutOperationNestedInput;
    inventoryItems?: Prisma.OperationInventoryUpdateManyWithoutOperationNestedInput;
    archive?: Prisma.OperationLogArchiveUpdateOneWithoutOperationNestedInput;
    dispatches?: Prisma.VehicularDispatchUpdateManyWithoutOperationNestedInput;
    images?: Prisma.OperationImageAttachmentUpdateManyWithoutOperationNestedInput;
};
export type OperationLogUncheckedUpdateWithoutEditsInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    team_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name_of_caller?: Prisma.StringFieldUpdateOperationsInput | string;
    nature_of_operation?: Prisma.StringFieldUpdateOperationsInput | string;
    event_description?: Prisma.StringFieldUpdateOperationsInput | string;
    submitted_by?: Prisma.StringFieldUpdateOperationsInput | string;
    validated_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumOperationStatusFieldUpdateOperationsInput | $Enums.OperationStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    responders?: Prisma.OperationResponderUncheckedUpdateManyWithoutOperationNestedInput;
    personsInvolved?: Prisma.PersonsInvolvedUncheckedUpdateManyWithoutOperationNestedInput;
    inventoryItems?: Prisma.OperationInventoryUncheckedUpdateManyWithoutOperationNestedInput;
    archive?: Prisma.OperationLogArchiveUncheckedUpdateOneWithoutOperationNestedInput;
    dispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutOperationNestedInput;
    images?: Prisma.OperationImageAttachmentUncheckedUpdateManyWithoutOperationNestedInput;
};
export type OperationLogCreateWithoutArchiveInput = {
    operation_id?: string;
    operation_date: Date | string;
    name_of_caller: string;
    nature_of_operation: string;
    event_description: string;
    status?: $Enums.OperationStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    team: Prisma.ResponseTeamCreateNestedOneWithoutOperationsInput;
    submitter: Prisma.UserCreateNestedOneWithoutSubmittedOperationsInput;
    validator?: Prisma.UserCreateNestedOneWithoutValidatedOperationsInput;
    responders?: Prisma.OperationResponderCreateNestedManyWithoutOperationInput;
    personsInvolved?: Prisma.PersonsInvolvedCreateNestedManyWithoutOperationInput;
    inventoryItems?: Prisma.OperationInventoryCreateNestedManyWithoutOperationInput;
    edits?: Prisma.OperationLogEditCreateNestedManyWithoutOperationInput;
    dispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutOperationInput;
    images?: Prisma.OperationImageAttachmentCreateNestedManyWithoutOperationInput;
};
export type OperationLogUncheckedCreateWithoutArchiveInput = {
    operation_id?: string;
    team_id: string;
    operation_date: Date | string;
    name_of_caller: string;
    nature_of_operation: string;
    event_description: string;
    submitted_by: string;
    validated_by?: string | null;
    status?: $Enums.OperationStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    responders?: Prisma.OperationResponderUncheckedCreateNestedManyWithoutOperationInput;
    personsInvolved?: Prisma.PersonsInvolvedUncheckedCreateNestedManyWithoutOperationInput;
    inventoryItems?: Prisma.OperationInventoryUncheckedCreateNestedManyWithoutOperationInput;
    edits?: Prisma.OperationLogEditUncheckedCreateNestedManyWithoutOperationInput;
    dispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutOperationInput;
    images?: Prisma.OperationImageAttachmentUncheckedCreateNestedManyWithoutOperationInput;
};
export type OperationLogCreateOrConnectWithoutArchiveInput = {
    where: Prisma.OperationLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.OperationLogCreateWithoutArchiveInput, Prisma.OperationLogUncheckedCreateWithoutArchiveInput>;
};
export type OperationLogUpsertWithoutArchiveInput = {
    update: Prisma.XOR<Prisma.OperationLogUpdateWithoutArchiveInput, Prisma.OperationLogUncheckedUpdateWithoutArchiveInput>;
    create: Prisma.XOR<Prisma.OperationLogCreateWithoutArchiveInput, Prisma.OperationLogUncheckedCreateWithoutArchiveInput>;
    where?: Prisma.OperationLogWhereInput;
};
export type OperationLogUpdateToOneWithWhereWithoutArchiveInput = {
    where?: Prisma.OperationLogWhereInput;
    data: Prisma.XOR<Prisma.OperationLogUpdateWithoutArchiveInput, Prisma.OperationLogUncheckedUpdateWithoutArchiveInput>;
};
export type OperationLogUpdateWithoutArchiveInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name_of_caller?: Prisma.StringFieldUpdateOperationsInput | string;
    nature_of_operation?: Prisma.StringFieldUpdateOperationsInput | string;
    event_description?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOperationStatusFieldUpdateOperationsInput | $Enums.OperationStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    team?: Prisma.ResponseTeamUpdateOneRequiredWithoutOperationsNestedInput;
    submitter?: Prisma.UserUpdateOneRequiredWithoutSubmittedOperationsNestedInput;
    validator?: Prisma.UserUpdateOneWithoutValidatedOperationsNestedInput;
    responders?: Prisma.OperationResponderUpdateManyWithoutOperationNestedInput;
    personsInvolved?: Prisma.PersonsInvolvedUpdateManyWithoutOperationNestedInput;
    inventoryItems?: Prisma.OperationInventoryUpdateManyWithoutOperationNestedInput;
    edits?: Prisma.OperationLogEditUpdateManyWithoutOperationNestedInput;
    dispatches?: Prisma.VehicularDispatchUpdateManyWithoutOperationNestedInput;
    images?: Prisma.OperationImageAttachmentUpdateManyWithoutOperationNestedInput;
};
export type OperationLogUncheckedUpdateWithoutArchiveInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    team_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name_of_caller?: Prisma.StringFieldUpdateOperationsInput | string;
    nature_of_operation?: Prisma.StringFieldUpdateOperationsInput | string;
    event_description?: Prisma.StringFieldUpdateOperationsInput | string;
    submitted_by?: Prisma.StringFieldUpdateOperationsInput | string;
    validated_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumOperationStatusFieldUpdateOperationsInput | $Enums.OperationStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    responders?: Prisma.OperationResponderUncheckedUpdateManyWithoutOperationNestedInput;
    personsInvolved?: Prisma.PersonsInvolvedUncheckedUpdateManyWithoutOperationNestedInput;
    inventoryItems?: Prisma.OperationInventoryUncheckedUpdateManyWithoutOperationNestedInput;
    edits?: Prisma.OperationLogEditUncheckedUpdateManyWithoutOperationNestedInput;
    dispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutOperationNestedInput;
    images?: Prisma.OperationImageAttachmentUncheckedUpdateManyWithoutOperationNestedInput;
};
export type OperationLogCreateWithoutDispatchesInput = {
    operation_id?: string;
    operation_date: Date | string;
    name_of_caller: string;
    nature_of_operation: string;
    event_description: string;
    status?: $Enums.OperationStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    team: Prisma.ResponseTeamCreateNestedOneWithoutOperationsInput;
    submitter: Prisma.UserCreateNestedOneWithoutSubmittedOperationsInput;
    validator?: Prisma.UserCreateNestedOneWithoutValidatedOperationsInput;
    responders?: Prisma.OperationResponderCreateNestedManyWithoutOperationInput;
    personsInvolved?: Prisma.PersonsInvolvedCreateNestedManyWithoutOperationInput;
    inventoryItems?: Prisma.OperationInventoryCreateNestedManyWithoutOperationInput;
    edits?: Prisma.OperationLogEditCreateNestedManyWithoutOperationInput;
    archive?: Prisma.OperationLogArchiveCreateNestedOneWithoutOperationInput;
    images?: Prisma.OperationImageAttachmentCreateNestedManyWithoutOperationInput;
};
export type OperationLogUncheckedCreateWithoutDispatchesInput = {
    operation_id?: string;
    team_id: string;
    operation_date: Date | string;
    name_of_caller: string;
    nature_of_operation: string;
    event_description: string;
    submitted_by: string;
    validated_by?: string | null;
    status?: $Enums.OperationStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    responders?: Prisma.OperationResponderUncheckedCreateNestedManyWithoutOperationInput;
    personsInvolved?: Prisma.PersonsInvolvedUncheckedCreateNestedManyWithoutOperationInput;
    inventoryItems?: Prisma.OperationInventoryUncheckedCreateNestedManyWithoutOperationInput;
    edits?: Prisma.OperationLogEditUncheckedCreateNestedManyWithoutOperationInput;
    archive?: Prisma.OperationLogArchiveUncheckedCreateNestedOneWithoutOperationInput;
    images?: Prisma.OperationImageAttachmentUncheckedCreateNestedManyWithoutOperationInput;
};
export type OperationLogCreateOrConnectWithoutDispatchesInput = {
    where: Prisma.OperationLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.OperationLogCreateWithoutDispatchesInput, Prisma.OperationLogUncheckedCreateWithoutDispatchesInput>;
};
export type OperationLogUpsertWithoutDispatchesInput = {
    update: Prisma.XOR<Prisma.OperationLogUpdateWithoutDispatchesInput, Prisma.OperationLogUncheckedUpdateWithoutDispatchesInput>;
    create: Prisma.XOR<Prisma.OperationLogCreateWithoutDispatchesInput, Prisma.OperationLogUncheckedCreateWithoutDispatchesInput>;
    where?: Prisma.OperationLogWhereInput;
};
export type OperationLogUpdateToOneWithWhereWithoutDispatchesInput = {
    where?: Prisma.OperationLogWhereInput;
    data: Prisma.XOR<Prisma.OperationLogUpdateWithoutDispatchesInput, Prisma.OperationLogUncheckedUpdateWithoutDispatchesInput>;
};
export type OperationLogUpdateWithoutDispatchesInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name_of_caller?: Prisma.StringFieldUpdateOperationsInput | string;
    nature_of_operation?: Prisma.StringFieldUpdateOperationsInput | string;
    event_description?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOperationStatusFieldUpdateOperationsInput | $Enums.OperationStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    team?: Prisma.ResponseTeamUpdateOneRequiredWithoutOperationsNestedInput;
    submitter?: Prisma.UserUpdateOneRequiredWithoutSubmittedOperationsNestedInput;
    validator?: Prisma.UserUpdateOneWithoutValidatedOperationsNestedInput;
    responders?: Prisma.OperationResponderUpdateManyWithoutOperationNestedInput;
    personsInvolved?: Prisma.PersonsInvolvedUpdateManyWithoutOperationNestedInput;
    inventoryItems?: Prisma.OperationInventoryUpdateManyWithoutOperationNestedInput;
    edits?: Prisma.OperationLogEditUpdateManyWithoutOperationNestedInput;
    archive?: Prisma.OperationLogArchiveUpdateOneWithoutOperationNestedInput;
    images?: Prisma.OperationImageAttachmentUpdateManyWithoutOperationNestedInput;
};
export type OperationLogUncheckedUpdateWithoutDispatchesInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    team_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name_of_caller?: Prisma.StringFieldUpdateOperationsInput | string;
    nature_of_operation?: Prisma.StringFieldUpdateOperationsInput | string;
    event_description?: Prisma.StringFieldUpdateOperationsInput | string;
    submitted_by?: Prisma.StringFieldUpdateOperationsInput | string;
    validated_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumOperationStatusFieldUpdateOperationsInput | $Enums.OperationStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    responders?: Prisma.OperationResponderUncheckedUpdateManyWithoutOperationNestedInput;
    personsInvolved?: Prisma.PersonsInvolvedUncheckedUpdateManyWithoutOperationNestedInput;
    inventoryItems?: Prisma.OperationInventoryUncheckedUpdateManyWithoutOperationNestedInput;
    edits?: Prisma.OperationLogEditUncheckedUpdateManyWithoutOperationNestedInput;
    archive?: Prisma.OperationLogArchiveUncheckedUpdateOneWithoutOperationNestedInput;
    images?: Prisma.OperationImageAttachmentUncheckedUpdateManyWithoutOperationNestedInput;
};
export type OperationLogCreateWithoutImagesInput = {
    operation_id?: string;
    operation_date: Date | string;
    name_of_caller: string;
    nature_of_operation: string;
    event_description: string;
    status?: $Enums.OperationStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    team: Prisma.ResponseTeamCreateNestedOneWithoutOperationsInput;
    submitter: Prisma.UserCreateNestedOneWithoutSubmittedOperationsInput;
    validator?: Prisma.UserCreateNestedOneWithoutValidatedOperationsInput;
    responders?: Prisma.OperationResponderCreateNestedManyWithoutOperationInput;
    personsInvolved?: Prisma.PersonsInvolvedCreateNestedManyWithoutOperationInput;
    inventoryItems?: Prisma.OperationInventoryCreateNestedManyWithoutOperationInput;
    edits?: Prisma.OperationLogEditCreateNestedManyWithoutOperationInput;
    archive?: Prisma.OperationLogArchiveCreateNestedOneWithoutOperationInput;
    dispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutOperationInput;
};
export type OperationLogUncheckedCreateWithoutImagesInput = {
    operation_id?: string;
    team_id: string;
    operation_date: Date | string;
    name_of_caller: string;
    nature_of_operation: string;
    event_description: string;
    submitted_by: string;
    validated_by?: string | null;
    status?: $Enums.OperationStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    responders?: Prisma.OperationResponderUncheckedCreateNestedManyWithoutOperationInput;
    personsInvolved?: Prisma.PersonsInvolvedUncheckedCreateNestedManyWithoutOperationInput;
    inventoryItems?: Prisma.OperationInventoryUncheckedCreateNestedManyWithoutOperationInput;
    edits?: Prisma.OperationLogEditUncheckedCreateNestedManyWithoutOperationInput;
    archive?: Prisma.OperationLogArchiveUncheckedCreateNestedOneWithoutOperationInput;
    dispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutOperationInput;
};
export type OperationLogCreateOrConnectWithoutImagesInput = {
    where: Prisma.OperationLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.OperationLogCreateWithoutImagesInput, Prisma.OperationLogUncheckedCreateWithoutImagesInput>;
};
export type OperationLogUpsertWithoutImagesInput = {
    update: Prisma.XOR<Prisma.OperationLogUpdateWithoutImagesInput, Prisma.OperationLogUncheckedUpdateWithoutImagesInput>;
    create: Prisma.XOR<Prisma.OperationLogCreateWithoutImagesInput, Prisma.OperationLogUncheckedCreateWithoutImagesInput>;
    where?: Prisma.OperationLogWhereInput;
};
export type OperationLogUpdateToOneWithWhereWithoutImagesInput = {
    where?: Prisma.OperationLogWhereInput;
    data: Prisma.XOR<Prisma.OperationLogUpdateWithoutImagesInput, Prisma.OperationLogUncheckedUpdateWithoutImagesInput>;
};
export type OperationLogUpdateWithoutImagesInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name_of_caller?: Prisma.StringFieldUpdateOperationsInput | string;
    nature_of_operation?: Prisma.StringFieldUpdateOperationsInput | string;
    event_description?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOperationStatusFieldUpdateOperationsInput | $Enums.OperationStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    team?: Prisma.ResponseTeamUpdateOneRequiredWithoutOperationsNestedInput;
    submitter?: Prisma.UserUpdateOneRequiredWithoutSubmittedOperationsNestedInput;
    validator?: Prisma.UserUpdateOneWithoutValidatedOperationsNestedInput;
    responders?: Prisma.OperationResponderUpdateManyWithoutOperationNestedInput;
    personsInvolved?: Prisma.PersonsInvolvedUpdateManyWithoutOperationNestedInput;
    inventoryItems?: Prisma.OperationInventoryUpdateManyWithoutOperationNestedInput;
    edits?: Prisma.OperationLogEditUpdateManyWithoutOperationNestedInput;
    archive?: Prisma.OperationLogArchiveUpdateOneWithoutOperationNestedInput;
    dispatches?: Prisma.VehicularDispatchUpdateManyWithoutOperationNestedInput;
};
export type OperationLogUncheckedUpdateWithoutImagesInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    team_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name_of_caller?: Prisma.StringFieldUpdateOperationsInput | string;
    nature_of_operation?: Prisma.StringFieldUpdateOperationsInput | string;
    event_description?: Prisma.StringFieldUpdateOperationsInput | string;
    submitted_by?: Prisma.StringFieldUpdateOperationsInput | string;
    validated_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumOperationStatusFieldUpdateOperationsInput | $Enums.OperationStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    responders?: Prisma.OperationResponderUncheckedUpdateManyWithoutOperationNestedInput;
    personsInvolved?: Prisma.PersonsInvolvedUncheckedUpdateManyWithoutOperationNestedInput;
    inventoryItems?: Prisma.OperationInventoryUncheckedUpdateManyWithoutOperationNestedInput;
    edits?: Prisma.OperationLogEditUncheckedUpdateManyWithoutOperationNestedInput;
    archive?: Prisma.OperationLogArchiveUncheckedUpdateOneWithoutOperationNestedInput;
    dispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutOperationNestedInput;
};
export type OperationLogCreateManySubmitterInput = {
    operation_id?: string;
    team_id: string;
    operation_date: Date | string;
    name_of_caller: string;
    nature_of_operation: string;
    event_description: string;
    validated_by?: string | null;
    status?: $Enums.OperationStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OperationLogCreateManyValidatorInput = {
    operation_id?: string;
    team_id: string;
    operation_date: Date | string;
    name_of_caller: string;
    nature_of_operation: string;
    event_description: string;
    submitted_by: string;
    status?: $Enums.OperationStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OperationLogUpdateWithoutSubmitterInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name_of_caller?: Prisma.StringFieldUpdateOperationsInput | string;
    nature_of_operation?: Prisma.StringFieldUpdateOperationsInput | string;
    event_description?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOperationStatusFieldUpdateOperationsInput | $Enums.OperationStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    team?: Prisma.ResponseTeamUpdateOneRequiredWithoutOperationsNestedInput;
    validator?: Prisma.UserUpdateOneWithoutValidatedOperationsNestedInput;
    responders?: Prisma.OperationResponderUpdateManyWithoutOperationNestedInput;
    personsInvolved?: Prisma.PersonsInvolvedUpdateManyWithoutOperationNestedInput;
    inventoryItems?: Prisma.OperationInventoryUpdateManyWithoutOperationNestedInput;
    edits?: Prisma.OperationLogEditUpdateManyWithoutOperationNestedInput;
    archive?: Prisma.OperationLogArchiveUpdateOneWithoutOperationNestedInput;
    dispatches?: Prisma.VehicularDispatchUpdateManyWithoutOperationNestedInput;
    images?: Prisma.OperationImageAttachmentUpdateManyWithoutOperationNestedInput;
};
export type OperationLogUncheckedUpdateWithoutSubmitterInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    team_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name_of_caller?: Prisma.StringFieldUpdateOperationsInput | string;
    nature_of_operation?: Prisma.StringFieldUpdateOperationsInput | string;
    event_description?: Prisma.StringFieldUpdateOperationsInput | string;
    validated_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumOperationStatusFieldUpdateOperationsInput | $Enums.OperationStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    responders?: Prisma.OperationResponderUncheckedUpdateManyWithoutOperationNestedInput;
    personsInvolved?: Prisma.PersonsInvolvedUncheckedUpdateManyWithoutOperationNestedInput;
    inventoryItems?: Prisma.OperationInventoryUncheckedUpdateManyWithoutOperationNestedInput;
    edits?: Prisma.OperationLogEditUncheckedUpdateManyWithoutOperationNestedInput;
    archive?: Prisma.OperationLogArchiveUncheckedUpdateOneWithoutOperationNestedInput;
    dispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutOperationNestedInput;
    images?: Prisma.OperationImageAttachmentUncheckedUpdateManyWithoutOperationNestedInput;
};
export type OperationLogUncheckedUpdateManyWithoutSubmitterInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    team_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name_of_caller?: Prisma.StringFieldUpdateOperationsInput | string;
    nature_of_operation?: Prisma.StringFieldUpdateOperationsInput | string;
    event_description?: Prisma.StringFieldUpdateOperationsInput | string;
    validated_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumOperationStatusFieldUpdateOperationsInput | $Enums.OperationStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OperationLogUpdateWithoutValidatorInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name_of_caller?: Prisma.StringFieldUpdateOperationsInput | string;
    nature_of_operation?: Prisma.StringFieldUpdateOperationsInput | string;
    event_description?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOperationStatusFieldUpdateOperationsInput | $Enums.OperationStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    team?: Prisma.ResponseTeamUpdateOneRequiredWithoutOperationsNestedInput;
    submitter?: Prisma.UserUpdateOneRequiredWithoutSubmittedOperationsNestedInput;
    responders?: Prisma.OperationResponderUpdateManyWithoutOperationNestedInput;
    personsInvolved?: Prisma.PersonsInvolvedUpdateManyWithoutOperationNestedInput;
    inventoryItems?: Prisma.OperationInventoryUpdateManyWithoutOperationNestedInput;
    edits?: Prisma.OperationLogEditUpdateManyWithoutOperationNestedInput;
    archive?: Prisma.OperationLogArchiveUpdateOneWithoutOperationNestedInput;
    dispatches?: Prisma.VehicularDispatchUpdateManyWithoutOperationNestedInput;
    images?: Prisma.OperationImageAttachmentUpdateManyWithoutOperationNestedInput;
};
export type OperationLogUncheckedUpdateWithoutValidatorInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    team_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name_of_caller?: Prisma.StringFieldUpdateOperationsInput | string;
    nature_of_operation?: Prisma.StringFieldUpdateOperationsInput | string;
    event_description?: Prisma.StringFieldUpdateOperationsInput | string;
    submitted_by?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOperationStatusFieldUpdateOperationsInput | $Enums.OperationStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    responders?: Prisma.OperationResponderUncheckedUpdateManyWithoutOperationNestedInput;
    personsInvolved?: Prisma.PersonsInvolvedUncheckedUpdateManyWithoutOperationNestedInput;
    inventoryItems?: Prisma.OperationInventoryUncheckedUpdateManyWithoutOperationNestedInput;
    edits?: Prisma.OperationLogEditUncheckedUpdateManyWithoutOperationNestedInput;
    archive?: Prisma.OperationLogArchiveUncheckedUpdateOneWithoutOperationNestedInput;
    dispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutOperationNestedInput;
    images?: Prisma.OperationImageAttachmentUncheckedUpdateManyWithoutOperationNestedInput;
};
export type OperationLogUncheckedUpdateManyWithoutValidatorInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    team_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name_of_caller?: Prisma.StringFieldUpdateOperationsInput | string;
    nature_of_operation?: Prisma.StringFieldUpdateOperationsInput | string;
    event_description?: Prisma.StringFieldUpdateOperationsInput | string;
    submitted_by?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOperationStatusFieldUpdateOperationsInput | $Enums.OperationStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OperationLogCreateManyTeamInput = {
    operation_id?: string;
    operation_date: Date | string;
    name_of_caller: string;
    nature_of_operation: string;
    event_description: string;
    submitted_by: string;
    validated_by?: string | null;
    status?: $Enums.OperationStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OperationLogUpdateWithoutTeamInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name_of_caller?: Prisma.StringFieldUpdateOperationsInput | string;
    nature_of_operation?: Prisma.StringFieldUpdateOperationsInput | string;
    event_description?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOperationStatusFieldUpdateOperationsInput | $Enums.OperationStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submitter?: Prisma.UserUpdateOneRequiredWithoutSubmittedOperationsNestedInput;
    validator?: Prisma.UserUpdateOneWithoutValidatedOperationsNestedInput;
    responders?: Prisma.OperationResponderUpdateManyWithoutOperationNestedInput;
    personsInvolved?: Prisma.PersonsInvolvedUpdateManyWithoutOperationNestedInput;
    inventoryItems?: Prisma.OperationInventoryUpdateManyWithoutOperationNestedInput;
    edits?: Prisma.OperationLogEditUpdateManyWithoutOperationNestedInput;
    archive?: Prisma.OperationLogArchiveUpdateOneWithoutOperationNestedInput;
    dispatches?: Prisma.VehicularDispatchUpdateManyWithoutOperationNestedInput;
    images?: Prisma.OperationImageAttachmentUpdateManyWithoutOperationNestedInput;
};
export type OperationLogUncheckedUpdateWithoutTeamInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name_of_caller?: Prisma.StringFieldUpdateOperationsInput | string;
    nature_of_operation?: Prisma.StringFieldUpdateOperationsInput | string;
    event_description?: Prisma.StringFieldUpdateOperationsInput | string;
    submitted_by?: Prisma.StringFieldUpdateOperationsInput | string;
    validated_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumOperationStatusFieldUpdateOperationsInput | $Enums.OperationStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    responders?: Prisma.OperationResponderUncheckedUpdateManyWithoutOperationNestedInput;
    personsInvolved?: Prisma.PersonsInvolvedUncheckedUpdateManyWithoutOperationNestedInput;
    inventoryItems?: Prisma.OperationInventoryUncheckedUpdateManyWithoutOperationNestedInput;
    edits?: Prisma.OperationLogEditUncheckedUpdateManyWithoutOperationNestedInput;
    archive?: Prisma.OperationLogArchiveUncheckedUpdateOneWithoutOperationNestedInput;
    dispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutOperationNestedInput;
    images?: Prisma.OperationImageAttachmentUncheckedUpdateManyWithoutOperationNestedInput;
};
export type OperationLogUncheckedUpdateManyWithoutTeamInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    name_of_caller?: Prisma.StringFieldUpdateOperationsInput | string;
    nature_of_operation?: Prisma.StringFieldUpdateOperationsInput | string;
    event_description?: Prisma.StringFieldUpdateOperationsInput | string;
    submitted_by?: Prisma.StringFieldUpdateOperationsInput | string;
    validated_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumOperationStatusFieldUpdateOperationsInput | $Enums.OperationStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type OperationLogCountOutputType
 */
export type OperationLogCountOutputType = {
    responders: number;
    personsInvolved: number;
    inventoryItems: number;
    edits: number;
    dispatches: number;
    images: number;
};
export type OperationLogCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    responders?: boolean | OperationLogCountOutputTypeCountRespondersArgs;
    personsInvolved?: boolean | OperationLogCountOutputTypeCountPersonsInvolvedArgs;
    inventoryItems?: boolean | OperationLogCountOutputTypeCountInventoryItemsArgs;
    edits?: boolean | OperationLogCountOutputTypeCountEditsArgs;
    dispatches?: boolean | OperationLogCountOutputTypeCountDispatchesArgs;
    images?: boolean | OperationLogCountOutputTypeCountImagesArgs;
};
/**
 * OperationLogCountOutputType without action
 */
export type OperationLogCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLogCountOutputType
     */
    select?: Prisma.OperationLogCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * OperationLogCountOutputType without action
 */
export type OperationLogCountOutputTypeCountRespondersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OperationResponderWhereInput;
};
/**
 * OperationLogCountOutputType without action
 */
export type OperationLogCountOutputTypeCountPersonsInvolvedArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PersonsInvolvedWhereInput;
};
/**
 * OperationLogCountOutputType without action
 */
export type OperationLogCountOutputTypeCountInventoryItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OperationInventoryWhereInput;
};
/**
 * OperationLogCountOutputType without action
 */
export type OperationLogCountOutputTypeCountEditsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OperationLogEditWhereInput;
};
/**
 * OperationLogCountOutputType without action
 */
export type OperationLogCountOutputTypeCountDispatchesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VehicularDispatchWhereInput;
};
/**
 * OperationLogCountOutputType without action
 */
export type OperationLogCountOutputTypeCountImagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OperationImageAttachmentWhereInput;
};
export type OperationLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    operation_id?: boolean;
    team_id?: boolean;
    operation_date?: boolean;
    name_of_caller?: boolean;
    nature_of_operation?: boolean;
    event_description?: boolean;
    submitted_by?: boolean;
    validated_by?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    team?: boolean | Prisma.ResponseTeamDefaultArgs<ExtArgs>;
    submitter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    validator?: boolean | Prisma.OperationLog$validatorArgs<ExtArgs>;
    responders?: boolean | Prisma.OperationLog$respondersArgs<ExtArgs>;
    personsInvolved?: boolean | Prisma.OperationLog$personsInvolvedArgs<ExtArgs>;
    inventoryItems?: boolean | Prisma.OperationLog$inventoryItemsArgs<ExtArgs>;
    edits?: boolean | Prisma.OperationLog$editsArgs<ExtArgs>;
    archive?: boolean | Prisma.OperationLog$archiveArgs<ExtArgs>;
    dispatches?: boolean | Prisma.OperationLog$dispatchesArgs<ExtArgs>;
    images?: boolean | Prisma.OperationLog$imagesArgs<ExtArgs>;
    _count?: boolean | Prisma.OperationLogCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["operationLog"]>;
export type OperationLogSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    operation_id?: boolean;
    team_id?: boolean;
    operation_date?: boolean;
    name_of_caller?: boolean;
    nature_of_operation?: boolean;
    event_description?: boolean;
    submitted_by?: boolean;
    validated_by?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    team?: boolean | Prisma.ResponseTeamDefaultArgs<ExtArgs>;
    submitter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    validator?: boolean | Prisma.OperationLog$validatorArgs<ExtArgs>;
}, ExtArgs["result"]["operationLog"]>;
export type OperationLogSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    operation_id?: boolean;
    team_id?: boolean;
    operation_date?: boolean;
    name_of_caller?: boolean;
    nature_of_operation?: boolean;
    event_description?: boolean;
    submitted_by?: boolean;
    validated_by?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    team?: boolean | Prisma.ResponseTeamDefaultArgs<ExtArgs>;
    submitter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    validator?: boolean | Prisma.OperationLog$validatorArgs<ExtArgs>;
}, ExtArgs["result"]["operationLog"]>;
export type OperationLogSelectScalar = {
    operation_id?: boolean;
    team_id?: boolean;
    operation_date?: boolean;
    name_of_caller?: boolean;
    nature_of_operation?: boolean;
    event_description?: boolean;
    submitted_by?: boolean;
    validated_by?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type OperationLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"operation_id" | "team_id" | "operation_date" | "name_of_caller" | "nature_of_operation" | "event_description" | "submitted_by" | "validated_by" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["operationLog"]>;
export type OperationLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    team?: boolean | Prisma.ResponseTeamDefaultArgs<ExtArgs>;
    submitter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    validator?: boolean | Prisma.OperationLog$validatorArgs<ExtArgs>;
    responders?: boolean | Prisma.OperationLog$respondersArgs<ExtArgs>;
    personsInvolved?: boolean | Prisma.OperationLog$personsInvolvedArgs<ExtArgs>;
    inventoryItems?: boolean | Prisma.OperationLog$inventoryItemsArgs<ExtArgs>;
    edits?: boolean | Prisma.OperationLog$editsArgs<ExtArgs>;
    archive?: boolean | Prisma.OperationLog$archiveArgs<ExtArgs>;
    dispatches?: boolean | Prisma.OperationLog$dispatchesArgs<ExtArgs>;
    images?: boolean | Prisma.OperationLog$imagesArgs<ExtArgs>;
    _count?: boolean | Prisma.OperationLogCountOutputTypeDefaultArgs<ExtArgs>;
};
export type OperationLogIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    team?: boolean | Prisma.ResponseTeamDefaultArgs<ExtArgs>;
    submitter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    validator?: boolean | Prisma.OperationLog$validatorArgs<ExtArgs>;
};
export type OperationLogIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    team?: boolean | Prisma.ResponseTeamDefaultArgs<ExtArgs>;
    submitter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    validator?: boolean | Prisma.OperationLog$validatorArgs<ExtArgs>;
};
export type $OperationLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "OperationLog";
    objects: {
        team: Prisma.$ResponseTeamPayload<ExtArgs>;
        submitter: Prisma.$UserPayload<ExtArgs>;
        validator: Prisma.$UserPayload<ExtArgs> | null;
        responders: Prisma.$OperationResponderPayload<ExtArgs>[];
        personsInvolved: Prisma.$PersonsInvolvedPayload<ExtArgs>[];
        inventoryItems: Prisma.$OperationInventoryPayload<ExtArgs>[];
        edits: Prisma.$OperationLogEditPayload<ExtArgs>[];
        archive: Prisma.$OperationLogArchivePayload<ExtArgs> | null;
        dispatches: Prisma.$VehicularDispatchPayload<ExtArgs>[];
        images: Prisma.$OperationImageAttachmentPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        operation_id: string;
        team_id: string;
        operation_date: Date;
        name_of_caller: string;
        nature_of_operation: string;
        event_description: string;
        submitted_by: string;
        validated_by: string | null;
        status: $Enums.OperationStatus;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["operationLog"]>;
    composites: {};
};
export type OperationLogGetPayload<S extends boolean | null | undefined | OperationLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OperationLogPayload, S>;
export type OperationLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OperationLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OperationLogCountAggregateInputType | true;
};
export interface OperationLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['OperationLog'];
        meta: {
            name: 'OperationLog';
        };
    };
    /**
     * Find zero or one OperationLog that matches the filter.
     * @param {OperationLogFindUniqueArgs} args - Arguments to find a OperationLog
     * @example
     * // Get one OperationLog
     * const operationLog = await prisma.operationLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OperationLogFindUniqueArgs>(args: Prisma.SelectSubset<T, OperationLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OperationLogClient<runtime.Types.Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one OperationLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OperationLogFindUniqueOrThrowArgs} args - Arguments to find a OperationLog
     * @example
     * // Get one OperationLog
     * const operationLog = await prisma.operationLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OperationLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OperationLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OperationLogClient<runtime.Types.Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first OperationLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogFindFirstArgs} args - Arguments to find a OperationLog
     * @example
     * // Get one OperationLog
     * const operationLog = await prisma.operationLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OperationLogFindFirstArgs>(args?: Prisma.SelectSubset<T, OperationLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__OperationLogClient<runtime.Types.Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first OperationLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogFindFirstOrThrowArgs} args - Arguments to find a OperationLog
     * @example
     * // Get one OperationLog
     * const operationLog = await prisma.operationLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OperationLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OperationLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OperationLogClient<runtime.Types.Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more OperationLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OperationLogs
     * const operationLogs = await prisma.operationLog.findMany()
     *
     * // Get first 10 OperationLogs
     * const operationLogs = await prisma.operationLog.findMany({ take: 10 })
     *
     * // Only select the `operation_id`
     * const operationLogWithOperation_idOnly = await prisma.operationLog.findMany({ select: { operation_id: true } })
     *
     */
    findMany<T extends OperationLogFindManyArgs>(args?: Prisma.SelectSubset<T, OperationLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a OperationLog.
     * @param {OperationLogCreateArgs} args - Arguments to create a OperationLog.
     * @example
     * // Create one OperationLog
     * const OperationLog = await prisma.operationLog.create({
     *   data: {
     *     // ... data to create a OperationLog
     *   }
     * })
     *
     */
    create<T extends OperationLogCreateArgs>(args: Prisma.SelectSubset<T, OperationLogCreateArgs<ExtArgs>>): Prisma.Prisma__OperationLogClient<runtime.Types.Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many OperationLogs.
     * @param {OperationLogCreateManyArgs} args - Arguments to create many OperationLogs.
     * @example
     * // Create many OperationLogs
     * const operationLog = await prisma.operationLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends OperationLogCreateManyArgs>(args?: Prisma.SelectSubset<T, OperationLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many OperationLogs and returns the data saved in the database.
     * @param {OperationLogCreateManyAndReturnArgs} args - Arguments to create many OperationLogs.
     * @example
     * // Create many OperationLogs
     * const operationLog = await prisma.operationLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many OperationLogs and only return the `operation_id`
     * const operationLogWithOperation_idOnly = await prisma.operationLog.createManyAndReturn({
     *   select: { operation_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends OperationLogCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OperationLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a OperationLog.
     * @param {OperationLogDeleteArgs} args - Arguments to delete one OperationLog.
     * @example
     * // Delete one OperationLog
     * const OperationLog = await prisma.operationLog.delete({
     *   where: {
     *     // ... filter to delete one OperationLog
     *   }
     * })
     *
     */
    delete<T extends OperationLogDeleteArgs>(args: Prisma.SelectSubset<T, OperationLogDeleteArgs<ExtArgs>>): Prisma.Prisma__OperationLogClient<runtime.Types.Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one OperationLog.
     * @param {OperationLogUpdateArgs} args - Arguments to update one OperationLog.
     * @example
     * // Update one OperationLog
     * const operationLog = await prisma.operationLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends OperationLogUpdateArgs>(args: Prisma.SelectSubset<T, OperationLogUpdateArgs<ExtArgs>>): Prisma.Prisma__OperationLogClient<runtime.Types.Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more OperationLogs.
     * @param {OperationLogDeleteManyArgs} args - Arguments to filter OperationLogs to delete.
     * @example
     * // Delete a few OperationLogs
     * const { count } = await prisma.operationLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends OperationLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, OperationLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more OperationLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OperationLogs
     * const operationLog = await prisma.operationLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends OperationLogUpdateManyArgs>(args: Prisma.SelectSubset<T, OperationLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more OperationLogs and returns the data updated in the database.
     * @param {OperationLogUpdateManyAndReturnArgs} args - Arguments to update many OperationLogs.
     * @example
     * // Update many OperationLogs
     * const operationLog = await prisma.operationLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more OperationLogs and only return the `operation_id`
     * const operationLogWithOperation_idOnly = await prisma.operationLog.updateManyAndReturn({
     *   select: { operation_id: true },
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
    updateManyAndReturn<T extends OperationLogUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OperationLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one OperationLog.
     * @param {OperationLogUpsertArgs} args - Arguments to update or create a OperationLog.
     * @example
     * // Update or create a OperationLog
     * const operationLog = await prisma.operationLog.upsert({
     *   create: {
     *     // ... data to create a OperationLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OperationLog we want to update
     *   }
     * })
     */
    upsert<T extends OperationLogUpsertArgs>(args: Prisma.SelectSubset<T, OperationLogUpsertArgs<ExtArgs>>): Prisma.Prisma__OperationLogClient<runtime.Types.Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of OperationLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogCountArgs} args - Arguments to filter OperationLogs to count.
     * @example
     * // Count the number of OperationLogs
     * const count = await prisma.operationLog.count({
     *   where: {
     *     // ... the filter for the OperationLogs we want to count
     *   }
     * })
    **/
    count<T extends OperationLogCountArgs>(args?: Prisma.Subset<T, OperationLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OperationLogCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a OperationLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OperationLogAggregateArgs>(args: Prisma.Subset<T, OperationLogAggregateArgs>): Prisma.PrismaPromise<GetOperationLogAggregateType<T>>;
    /**
     * Group by OperationLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogGroupByArgs} args - Group by arguments.
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
    groupBy<T extends OperationLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OperationLogGroupByArgs['orderBy'];
    } : {
        orderBy?: OperationLogGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OperationLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOperationLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the OperationLog model
     */
    readonly fields: OperationLogFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for OperationLog.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__OperationLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    team<T extends Prisma.ResponseTeamDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ResponseTeamDefaultArgs<ExtArgs>>): Prisma.Prisma__ResponseTeamClient<runtime.Types.Result.GetResult<Prisma.$ResponseTeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    submitter<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    validator<T extends Prisma.OperationLog$validatorArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OperationLog$validatorArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    responders<T extends Prisma.OperationLog$respondersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OperationLog$respondersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OperationResponderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    personsInvolved<T extends Prisma.OperationLog$personsInvolvedArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OperationLog$personsInvolvedArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PersonsInvolvedPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    inventoryItems<T extends Prisma.OperationLog$inventoryItemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OperationLog$inventoryItemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OperationInventoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    edits<T extends Prisma.OperationLog$editsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OperationLog$editsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OperationLogEditPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    archive<T extends Prisma.OperationLog$archiveArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OperationLog$archiveArgs<ExtArgs>>): Prisma.Prisma__OperationLogArchiveClient<runtime.Types.Result.GetResult<Prisma.$OperationLogArchivePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    dispatches<T extends Prisma.OperationLog$dispatchesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OperationLog$dispatchesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VehicularDispatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    images<T extends Prisma.OperationLog$imagesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OperationLog$imagesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OperationImageAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the OperationLog model
 */
export interface OperationLogFieldRefs {
    readonly operation_id: Prisma.FieldRef<"OperationLog", 'String'>;
    readonly team_id: Prisma.FieldRef<"OperationLog", 'String'>;
    readonly operation_date: Prisma.FieldRef<"OperationLog", 'DateTime'>;
    readonly name_of_caller: Prisma.FieldRef<"OperationLog", 'String'>;
    readonly nature_of_operation: Prisma.FieldRef<"OperationLog", 'String'>;
    readonly event_description: Prisma.FieldRef<"OperationLog", 'String'>;
    readonly submitted_by: Prisma.FieldRef<"OperationLog", 'String'>;
    readonly validated_by: Prisma.FieldRef<"OperationLog", 'String'>;
    readonly status: Prisma.FieldRef<"OperationLog", 'OperationStatus'>;
    readonly createdAt: Prisma.FieldRef<"OperationLog", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"OperationLog", 'DateTime'>;
}
/**
 * OperationLog findUnique
 */
export type OperationLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OperationLog to fetch.
     */
    where: Prisma.OperationLogWhereUniqueInput;
};
/**
 * OperationLog findUniqueOrThrow
 */
export type OperationLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OperationLog to fetch.
     */
    where: Prisma.OperationLogWhereUniqueInput;
};
/**
 * OperationLog findFirst
 */
export type OperationLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OperationLog to fetch.
     */
    where?: Prisma.OperationLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OperationLogs to fetch.
     */
    orderBy?: Prisma.OperationLogOrderByWithRelationInput | Prisma.OperationLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OperationLogs.
     */
    cursor?: Prisma.OperationLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OperationLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OperationLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OperationLogs.
     */
    distinct?: Prisma.OperationLogScalarFieldEnum | Prisma.OperationLogScalarFieldEnum[];
};
/**
 * OperationLog findFirstOrThrow
 */
export type OperationLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OperationLog to fetch.
     */
    where?: Prisma.OperationLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OperationLogs to fetch.
     */
    orderBy?: Prisma.OperationLogOrderByWithRelationInput | Prisma.OperationLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OperationLogs.
     */
    cursor?: Prisma.OperationLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OperationLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OperationLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OperationLogs.
     */
    distinct?: Prisma.OperationLogScalarFieldEnum | Prisma.OperationLogScalarFieldEnum[];
};
/**
 * OperationLog findMany
 */
export type OperationLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OperationLogs to fetch.
     */
    where?: Prisma.OperationLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OperationLogs to fetch.
     */
    orderBy?: Prisma.OperationLogOrderByWithRelationInput | Prisma.OperationLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing OperationLogs.
     */
    cursor?: Prisma.OperationLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OperationLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OperationLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OperationLogs.
     */
    distinct?: Prisma.OperationLogScalarFieldEnum | Prisma.OperationLogScalarFieldEnum[];
};
/**
 * OperationLog create
 */
export type OperationLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a OperationLog.
     */
    data: Prisma.XOR<Prisma.OperationLogCreateInput, Prisma.OperationLogUncheckedCreateInput>;
};
/**
 * OperationLog createMany
 */
export type OperationLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many OperationLogs.
     */
    data: Prisma.OperationLogCreateManyInput | Prisma.OperationLogCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * OperationLog createManyAndReturn
 */
export type OperationLogCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLog
     */
    select?: Prisma.OperationLogSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the OperationLog
     */
    omit?: Prisma.OperationLogOmit<ExtArgs> | null;
    /**
     * The data used to create many OperationLogs.
     */
    data: Prisma.OperationLogCreateManyInput | Prisma.OperationLogCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OperationLogIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * OperationLog update
 */
export type OperationLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a OperationLog.
     */
    data: Prisma.XOR<Prisma.OperationLogUpdateInput, Prisma.OperationLogUncheckedUpdateInput>;
    /**
     * Choose, which OperationLog to update.
     */
    where: Prisma.OperationLogWhereUniqueInput;
};
/**
 * OperationLog updateMany
 */
export type OperationLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update OperationLogs.
     */
    data: Prisma.XOR<Prisma.OperationLogUpdateManyMutationInput, Prisma.OperationLogUncheckedUpdateManyInput>;
    /**
     * Filter which OperationLogs to update
     */
    where?: Prisma.OperationLogWhereInput;
    /**
     * Limit how many OperationLogs to update.
     */
    limit?: number;
};
/**
 * OperationLog updateManyAndReturn
 */
export type OperationLogUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLog
     */
    select?: Prisma.OperationLogSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the OperationLog
     */
    omit?: Prisma.OperationLogOmit<ExtArgs> | null;
    /**
     * The data used to update OperationLogs.
     */
    data: Prisma.XOR<Prisma.OperationLogUpdateManyMutationInput, Prisma.OperationLogUncheckedUpdateManyInput>;
    /**
     * Filter which OperationLogs to update
     */
    where?: Prisma.OperationLogWhereInput;
    /**
     * Limit how many OperationLogs to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OperationLogIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * OperationLog upsert
 */
export type OperationLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the OperationLog to update in case it exists.
     */
    where: Prisma.OperationLogWhereUniqueInput;
    /**
     * In case the OperationLog found by the `where` argument doesn't exist, create a new OperationLog with this data.
     */
    create: Prisma.XOR<Prisma.OperationLogCreateInput, Prisma.OperationLogUncheckedCreateInput>;
    /**
     * In case the OperationLog was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.OperationLogUpdateInput, Prisma.OperationLogUncheckedUpdateInput>;
};
/**
 * OperationLog delete
 */
export type OperationLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which OperationLog to delete.
     */
    where: Prisma.OperationLogWhereUniqueInput;
};
/**
 * OperationLog deleteMany
 */
export type OperationLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which OperationLogs to delete
     */
    where?: Prisma.OperationLogWhereInput;
    /**
     * Limit how many OperationLogs to delete.
     */
    limit?: number;
};
/**
 * OperationLog.validator
 */
export type OperationLog$validatorArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.UserWhereInput;
};
/**
 * OperationLog.responders
 */
export type OperationLog$respondersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * OperationLog.personsInvolved
 */
export type OperationLog$personsInvolvedArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonsInvolved
     */
    select?: Prisma.PersonsInvolvedSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PersonsInvolved
     */
    omit?: Prisma.PersonsInvolvedOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PersonsInvolvedInclude<ExtArgs> | null;
    where?: Prisma.PersonsInvolvedWhereInput;
    orderBy?: Prisma.PersonsInvolvedOrderByWithRelationInput | Prisma.PersonsInvolvedOrderByWithRelationInput[];
    cursor?: Prisma.PersonsInvolvedWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PersonsInvolvedScalarFieldEnum | Prisma.PersonsInvolvedScalarFieldEnum[];
};
/**
 * OperationLog.inventoryItems
 */
export type OperationLog$inventoryItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationInventory
     */
    select?: Prisma.OperationInventorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OperationInventory
     */
    omit?: Prisma.OperationInventoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OperationInventoryInclude<ExtArgs> | null;
    where?: Prisma.OperationInventoryWhereInput;
    orderBy?: Prisma.OperationInventoryOrderByWithRelationInput | Prisma.OperationInventoryOrderByWithRelationInput[];
    cursor?: Prisma.OperationInventoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OperationInventoryScalarFieldEnum | Prisma.OperationInventoryScalarFieldEnum[];
};
/**
 * OperationLog.edits
 */
export type OperationLog$editsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * OperationLog.archive
 */
export type OperationLog$archiveArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
/**
 * OperationLog.dispatches
 */
export type OperationLog$dispatchesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * OperationLog.images
 */
export type OperationLog$imagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * OperationLog without action
 */
export type OperationLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=OperationLog.d.ts.map