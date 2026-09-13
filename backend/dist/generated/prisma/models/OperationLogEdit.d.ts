import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model OperationLogEdit
 *
 */
export type OperationLogEditModel = runtime.Types.Result.DefaultSelection<Prisma.$OperationLogEditPayload>;
export type AggregateOperationLogEdit = {
    _count: OperationLogEditCountAggregateOutputType | null;
    _min: OperationLogEditMinAggregateOutputType | null;
    _max: OperationLogEditMaxAggregateOutputType | null;
};
export type OperationLogEditMinAggregateOutputType = {
    edit_id: string | null;
    operation_id: string | null;
    admin_id: string | null;
    edit_notes: string | null;
    editedAt: Date | null;
};
export type OperationLogEditMaxAggregateOutputType = {
    edit_id: string | null;
    operation_id: string | null;
    admin_id: string | null;
    edit_notes: string | null;
    editedAt: Date | null;
};
export type OperationLogEditCountAggregateOutputType = {
    edit_id: number;
    operation_id: number;
    admin_id: number;
    edit_notes: number;
    editedAt: number;
    _all: number;
};
export type OperationLogEditMinAggregateInputType = {
    edit_id?: true;
    operation_id?: true;
    admin_id?: true;
    edit_notes?: true;
    editedAt?: true;
};
export type OperationLogEditMaxAggregateInputType = {
    edit_id?: true;
    operation_id?: true;
    admin_id?: true;
    edit_notes?: true;
    editedAt?: true;
};
export type OperationLogEditCountAggregateInputType = {
    edit_id?: true;
    operation_id?: true;
    admin_id?: true;
    edit_notes?: true;
    editedAt?: true;
    _all?: true;
};
export type OperationLogEditAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which OperationLogEdit to aggregate.
     */
    where?: Prisma.OperationLogEditWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OperationLogEdits to fetch.
     */
    orderBy?: Prisma.OperationLogEditOrderByWithRelationInput | Prisma.OperationLogEditOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.OperationLogEditWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OperationLogEdits from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OperationLogEdits.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned OperationLogEdits
    **/
    _count?: true | OperationLogEditCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: OperationLogEditMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: OperationLogEditMaxAggregateInputType;
};
export type GetOperationLogEditAggregateType<T extends OperationLogEditAggregateArgs> = {
    [P in keyof T & keyof AggregateOperationLogEdit]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOperationLogEdit[P]> : Prisma.GetScalarType<T[P], AggregateOperationLogEdit[P]>;
};
export type OperationLogEditGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OperationLogEditWhereInput;
    orderBy?: Prisma.OperationLogEditOrderByWithAggregationInput | Prisma.OperationLogEditOrderByWithAggregationInput[];
    by: Prisma.OperationLogEditScalarFieldEnum[] | Prisma.OperationLogEditScalarFieldEnum;
    having?: Prisma.OperationLogEditScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OperationLogEditCountAggregateInputType | true;
    _min?: OperationLogEditMinAggregateInputType;
    _max?: OperationLogEditMaxAggregateInputType;
};
export type OperationLogEditGroupByOutputType = {
    edit_id: string;
    operation_id: string;
    admin_id: string;
    edit_notes: string | null;
    editedAt: Date;
    _count: OperationLogEditCountAggregateOutputType | null;
    _min: OperationLogEditMinAggregateOutputType | null;
    _max: OperationLogEditMaxAggregateOutputType | null;
};
export type GetOperationLogEditGroupByPayload<T extends OperationLogEditGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OperationLogEditGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OperationLogEditGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OperationLogEditGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OperationLogEditGroupByOutputType[P]>;
}>>;
export type OperationLogEditWhereInput = {
    AND?: Prisma.OperationLogEditWhereInput | Prisma.OperationLogEditWhereInput[];
    OR?: Prisma.OperationLogEditWhereInput[];
    NOT?: Prisma.OperationLogEditWhereInput | Prisma.OperationLogEditWhereInput[];
    edit_id?: Prisma.StringFilter<"OperationLogEdit"> | string;
    operation_id?: Prisma.StringFilter<"OperationLogEdit"> | string;
    admin_id?: Prisma.StringFilter<"OperationLogEdit"> | string;
    edit_notes?: Prisma.StringNullableFilter<"OperationLogEdit"> | string | null;
    editedAt?: Prisma.DateTimeFilter<"OperationLogEdit"> | Date | string;
    operation?: Prisma.XOR<Prisma.OperationLogScalarRelationFilter, Prisma.OperationLogWhereInput>;
    admin?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type OperationLogEditOrderByWithRelationInput = {
    edit_id?: Prisma.SortOrder;
    operation_id?: Prisma.SortOrder;
    admin_id?: Prisma.SortOrder;
    edit_notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    editedAt?: Prisma.SortOrder;
    operation?: Prisma.OperationLogOrderByWithRelationInput;
    admin?: Prisma.UserOrderByWithRelationInput;
};
export type OperationLogEditWhereUniqueInput = Prisma.AtLeast<{
    edit_id?: string;
    AND?: Prisma.OperationLogEditWhereInput | Prisma.OperationLogEditWhereInput[];
    OR?: Prisma.OperationLogEditWhereInput[];
    NOT?: Prisma.OperationLogEditWhereInput | Prisma.OperationLogEditWhereInput[];
    operation_id?: Prisma.StringFilter<"OperationLogEdit"> | string;
    admin_id?: Prisma.StringFilter<"OperationLogEdit"> | string;
    edit_notes?: Prisma.StringNullableFilter<"OperationLogEdit"> | string | null;
    editedAt?: Prisma.DateTimeFilter<"OperationLogEdit"> | Date | string;
    operation?: Prisma.XOR<Prisma.OperationLogScalarRelationFilter, Prisma.OperationLogWhereInput>;
    admin?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "edit_id">;
export type OperationLogEditOrderByWithAggregationInput = {
    edit_id?: Prisma.SortOrder;
    operation_id?: Prisma.SortOrder;
    admin_id?: Prisma.SortOrder;
    edit_notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    editedAt?: Prisma.SortOrder;
    _count?: Prisma.OperationLogEditCountOrderByAggregateInput;
    _max?: Prisma.OperationLogEditMaxOrderByAggregateInput;
    _min?: Prisma.OperationLogEditMinOrderByAggregateInput;
};
export type OperationLogEditScalarWhereWithAggregatesInput = {
    AND?: Prisma.OperationLogEditScalarWhereWithAggregatesInput | Prisma.OperationLogEditScalarWhereWithAggregatesInput[];
    OR?: Prisma.OperationLogEditScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OperationLogEditScalarWhereWithAggregatesInput | Prisma.OperationLogEditScalarWhereWithAggregatesInput[];
    edit_id?: Prisma.StringWithAggregatesFilter<"OperationLogEdit"> | string;
    operation_id?: Prisma.StringWithAggregatesFilter<"OperationLogEdit"> | string;
    admin_id?: Prisma.StringWithAggregatesFilter<"OperationLogEdit"> | string;
    edit_notes?: Prisma.StringNullableWithAggregatesFilter<"OperationLogEdit"> | string | null;
    editedAt?: Prisma.DateTimeWithAggregatesFilter<"OperationLogEdit"> | Date | string;
};
export type OperationLogEditCreateInput = {
    edit_id?: string;
    edit_notes?: string | null;
    editedAt?: Date | string;
    operation: Prisma.OperationLogCreateNestedOneWithoutEditsInput;
    admin: Prisma.UserCreateNestedOneWithoutOperationEditsInput;
};
export type OperationLogEditUncheckedCreateInput = {
    edit_id?: string;
    operation_id: string;
    admin_id: string;
    edit_notes?: string | null;
    editedAt?: Date | string;
};
export type OperationLogEditUpdateInput = {
    edit_id?: Prisma.StringFieldUpdateOperationsInput | string;
    edit_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    editedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    operation?: Prisma.OperationLogUpdateOneRequiredWithoutEditsNestedInput;
    admin?: Prisma.UserUpdateOneRequiredWithoutOperationEditsNestedInput;
};
export type OperationLogEditUncheckedUpdateInput = {
    edit_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    admin_id?: Prisma.StringFieldUpdateOperationsInput | string;
    edit_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    editedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OperationLogEditCreateManyInput = {
    edit_id?: string;
    operation_id: string;
    admin_id: string;
    edit_notes?: string | null;
    editedAt?: Date | string;
};
export type OperationLogEditUpdateManyMutationInput = {
    edit_id?: Prisma.StringFieldUpdateOperationsInput | string;
    edit_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    editedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OperationLogEditUncheckedUpdateManyInput = {
    edit_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    admin_id?: Prisma.StringFieldUpdateOperationsInput | string;
    edit_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    editedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OperationLogEditListRelationFilter = {
    every?: Prisma.OperationLogEditWhereInput;
    some?: Prisma.OperationLogEditWhereInput;
    none?: Prisma.OperationLogEditWhereInput;
};
export type OperationLogEditOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type OperationLogEditCountOrderByAggregateInput = {
    edit_id?: Prisma.SortOrder;
    operation_id?: Prisma.SortOrder;
    admin_id?: Prisma.SortOrder;
    edit_notes?: Prisma.SortOrder;
    editedAt?: Prisma.SortOrder;
};
export type OperationLogEditMaxOrderByAggregateInput = {
    edit_id?: Prisma.SortOrder;
    operation_id?: Prisma.SortOrder;
    admin_id?: Prisma.SortOrder;
    edit_notes?: Prisma.SortOrder;
    editedAt?: Prisma.SortOrder;
};
export type OperationLogEditMinOrderByAggregateInput = {
    edit_id?: Prisma.SortOrder;
    operation_id?: Prisma.SortOrder;
    admin_id?: Prisma.SortOrder;
    edit_notes?: Prisma.SortOrder;
    editedAt?: Prisma.SortOrder;
};
export type OperationLogEditCreateNestedManyWithoutAdminInput = {
    create?: Prisma.XOR<Prisma.OperationLogEditCreateWithoutAdminInput, Prisma.OperationLogEditUncheckedCreateWithoutAdminInput> | Prisma.OperationLogEditCreateWithoutAdminInput[] | Prisma.OperationLogEditUncheckedCreateWithoutAdminInput[];
    connectOrCreate?: Prisma.OperationLogEditCreateOrConnectWithoutAdminInput | Prisma.OperationLogEditCreateOrConnectWithoutAdminInput[];
    createMany?: Prisma.OperationLogEditCreateManyAdminInputEnvelope;
    connect?: Prisma.OperationLogEditWhereUniqueInput | Prisma.OperationLogEditWhereUniqueInput[];
};
export type OperationLogEditUncheckedCreateNestedManyWithoutAdminInput = {
    create?: Prisma.XOR<Prisma.OperationLogEditCreateWithoutAdminInput, Prisma.OperationLogEditUncheckedCreateWithoutAdminInput> | Prisma.OperationLogEditCreateWithoutAdminInput[] | Prisma.OperationLogEditUncheckedCreateWithoutAdminInput[];
    connectOrCreate?: Prisma.OperationLogEditCreateOrConnectWithoutAdminInput | Prisma.OperationLogEditCreateOrConnectWithoutAdminInput[];
    createMany?: Prisma.OperationLogEditCreateManyAdminInputEnvelope;
    connect?: Prisma.OperationLogEditWhereUniqueInput | Prisma.OperationLogEditWhereUniqueInput[];
};
export type OperationLogEditUpdateManyWithoutAdminNestedInput = {
    create?: Prisma.XOR<Prisma.OperationLogEditCreateWithoutAdminInput, Prisma.OperationLogEditUncheckedCreateWithoutAdminInput> | Prisma.OperationLogEditCreateWithoutAdminInput[] | Prisma.OperationLogEditUncheckedCreateWithoutAdminInput[];
    connectOrCreate?: Prisma.OperationLogEditCreateOrConnectWithoutAdminInput | Prisma.OperationLogEditCreateOrConnectWithoutAdminInput[];
    upsert?: Prisma.OperationLogEditUpsertWithWhereUniqueWithoutAdminInput | Prisma.OperationLogEditUpsertWithWhereUniqueWithoutAdminInput[];
    createMany?: Prisma.OperationLogEditCreateManyAdminInputEnvelope;
    set?: Prisma.OperationLogEditWhereUniqueInput | Prisma.OperationLogEditWhereUniqueInput[];
    disconnect?: Prisma.OperationLogEditWhereUniqueInput | Prisma.OperationLogEditWhereUniqueInput[];
    delete?: Prisma.OperationLogEditWhereUniqueInput | Prisma.OperationLogEditWhereUniqueInput[];
    connect?: Prisma.OperationLogEditWhereUniqueInput | Prisma.OperationLogEditWhereUniqueInput[];
    update?: Prisma.OperationLogEditUpdateWithWhereUniqueWithoutAdminInput | Prisma.OperationLogEditUpdateWithWhereUniqueWithoutAdminInput[];
    updateMany?: Prisma.OperationLogEditUpdateManyWithWhereWithoutAdminInput | Prisma.OperationLogEditUpdateManyWithWhereWithoutAdminInput[];
    deleteMany?: Prisma.OperationLogEditScalarWhereInput | Prisma.OperationLogEditScalarWhereInput[];
};
export type OperationLogEditUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: Prisma.XOR<Prisma.OperationLogEditCreateWithoutAdminInput, Prisma.OperationLogEditUncheckedCreateWithoutAdminInput> | Prisma.OperationLogEditCreateWithoutAdminInput[] | Prisma.OperationLogEditUncheckedCreateWithoutAdminInput[];
    connectOrCreate?: Prisma.OperationLogEditCreateOrConnectWithoutAdminInput | Prisma.OperationLogEditCreateOrConnectWithoutAdminInput[];
    upsert?: Prisma.OperationLogEditUpsertWithWhereUniqueWithoutAdminInput | Prisma.OperationLogEditUpsertWithWhereUniqueWithoutAdminInput[];
    createMany?: Prisma.OperationLogEditCreateManyAdminInputEnvelope;
    set?: Prisma.OperationLogEditWhereUniqueInput | Prisma.OperationLogEditWhereUniqueInput[];
    disconnect?: Prisma.OperationLogEditWhereUniqueInput | Prisma.OperationLogEditWhereUniqueInput[];
    delete?: Prisma.OperationLogEditWhereUniqueInput | Prisma.OperationLogEditWhereUniqueInput[];
    connect?: Prisma.OperationLogEditWhereUniqueInput | Prisma.OperationLogEditWhereUniqueInput[];
    update?: Prisma.OperationLogEditUpdateWithWhereUniqueWithoutAdminInput | Prisma.OperationLogEditUpdateWithWhereUniqueWithoutAdminInput[];
    updateMany?: Prisma.OperationLogEditUpdateManyWithWhereWithoutAdminInput | Prisma.OperationLogEditUpdateManyWithWhereWithoutAdminInput[];
    deleteMany?: Prisma.OperationLogEditScalarWhereInput | Prisma.OperationLogEditScalarWhereInput[];
};
export type OperationLogEditCreateNestedManyWithoutOperationInput = {
    create?: Prisma.XOR<Prisma.OperationLogEditCreateWithoutOperationInput, Prisma.OperationLogEditUncheckedCreateWithoutOperationInput> | Prisma.OperationLogEditCreateWithoutOperationInput[] | Prisma.OperationLogEditUncheckedCreateWithoutOperationInput[];
    connectOrCreate?: Prisma.OperationLogEditCreateOrConnectWithoutOperationInput | Prisma.OperationLogEditCreateOrConnectWithoutOperationInput[];
    createMany?: Prisma.OperationLogEditCreateManyOperationInputEnvelope;
    connect?: Prisma.OperationLogEditWhereUniqueInput | Prisma.OperationLogEditWhereUniqueInput[];
};
export type OperationLogEditUncheckedCreateNestedManyWithoutOperationInput = {
    create?: Prisma.XOR<Prisma.OperationLogEditCreateWithoutOperationInput, Prisma.OperationLogEditUncheckedCreateWithoutOperationInput> | Prisma.OperationLogEditCreateWithoutOperationInput[] | Prisma.OperationLogEditUncheckedCreateWithoutOperationInput[];
    connectOrCreate?: Prisma.OperationLogEditCreateOrConnectWithoutOperationInput | Prisma.OperationLogEditCreateOrConnectWithoutOperationInput[];
    createMany?: Prisma.OperationLogEditCreateManyOperationInputEnvelope;
    connect?: Prisma.OperationLogEditWhereUniqueInput | Prisma.OperationLogEditWhereUniqueInput[];
};
export type OperationLogEditUpdateManyWithoutOperationNestedInput = {
    create?: Prisma.XOR<Prisma.OperationLogEditCreateWithoutOperationInput, Prisma.OperationLogEditUncheckedCreateWithoutOperationInput> | Prisma.OperationLogEditCreateWithoutOperationInput[] | Prisma.OperationLogEditUncheckedCreateWithoutOperationInput[];
    connectOrCreate?: Prisma.OperationLogEditCreateOrConnectWithoutOperationInput | Prisma.OperationLogEditCreateOrConnectWithoutOperationInput[];
    upsert?: Prisma.OperationLogEditUpsertWithWhereUniqueWithoutOperationInput | Prisma.OperationLogEditUpsertWithWhereUniqueWithoutOperationInput[];
    createMany?: Prisma.OperationLogEditCreateManyOperationInputEnvelope;
    set?: Prisma.OperationLogEditWhereUniqueInput | Prisma.OperationLogEditWhereUniqueInput[];
    disconnect?: Prisma.OperationLogEditWhereUniqueInput | Prisma.OperationLogEditWhereUniqueInput[];
    delete?: Prisma.OperationLogEditWhereUniqueInput | Prisma.OperationLogEditWhereUniqueInput[];
    connect?: Prisma.OperationLogEditWhereUniqueInput | Prisma.OperationLogEditWhereUniqueInput[];
    update?: Prisma.OperationLogEditUpdateWithWhereUniqueWithoutOperationInput | Prisma.OperationLogEditUpdateWithWhereUniqueWithoutOperationInput[];
    updateMany?: Prisma.OperationLogEditUpdateManyWithWhereWithoutOperationInput | Prisma.OperationLogEditUpdateManyWithWhereWithoutOperationInput[];
    deleteMany?: Prisma.OperationLogEditScalarWhereInput | Prisma.OperationLogEditScalarWhereInput[];
};
export type OperationLogEditUncheckedUpdateManyWithoutOperationNestedInput = {
    create?: Prisma.XOR<Prisma.OperationLogEditCreateWithoutOperationInput, Prisma.OperationLogEditUncheckedCreateWithoutOperationInput> | Prisma.OperationLogEditCreateWithoutOperationInput[] | Prisma.OperationLogEditUncheckedCreateWithoutOperationInput[];
    connectOrCreate?: Prisma.OperationLogEditCreateOrConnectWithoutOperationInput | Prisma.OperationLogEditCreateOrConnectWithoutOperationInput[];
    upsert?: Prisma.OperationLogEditUpsertWithWhereUniqueWithoutOperationInput | Prisma.OperationLogEditUpsertWithWhereUniqueWithoutOperationInput[];
    createMany?: Prisma.OperationLogEditCreateManyOperationInputEnvelope;
    set?: Prisma.OperationLogEditWhereUniqueInput | Prisma.OperationLogEditWhereUniqueInput[];
    disconnect?: Prisma.OperationLogEditWhereUniqueInput | Prisma.OperationLogEditWhereUniqueInput[];
    delete?: Prisma.OperationLogEditWhereUniqueInput | Prisma.OperationLogEditWhereUniqueInput[];
    connect?: Prisma.OperationLogEditWhereUniqueInput | Prisma.OperationLogEditWhereUniqueInput[];
    update?: Prisma.OperationLogEditUpdateWithWhereUniqueWithoutOperationInput | Prisma.OperationLogEditUpdateWithWhereUniqueWithoutOperationInput[];
    updateMany?: Prisma.OperationLogEditUpdateManyWithWhereWithoutOperationInput | Prisma.OperationLogEditUpdateManyWithWhereWithoutOperationInput[];
    deleteMany?: Prisma.OperationLogEditScalarWhereInput | Prisma.OperationLogEditScalarWhereInput[];
};
export type OperationLogEditCreateWithoutAdminInput = {
    edit_id?: string;
    edit_notes?: string | null;
    editedAt?: Date | string;
    operation: Prisma.OperationLogCreateNestedOneWithoutEditsInput;
};
export type OperationLogEditUncheckedCreateWithoutAdminInput = {
    edit_id?: string;
    operation_id: string;
    edit_notes?: string | null;
    editedAt?: Date | string;
};
export type OperationLogEditCreateOrConnectWithoutAdminInput = {
    where: Prisma.OperationLogEditWhereUniqueInput;
    create: Prisma.XOR<Prisma.OperationLogEditCreateWithoutAdminInput, Prisma.OperationLogEditUncheckedCreateWithoutAdminInput>;
};
export type OperationLogEditCreateManyAdminInputEnvelope = {
    data: Prisma.OperationLogEditCreateManyAdminInput | Prisma.OperationLogEditCreateManyAdminInput[];
    skipDuplicates?: boolean;
};
export type OperationLogEditUpsertWithWhereUniqueWithoutAdminInput = {
    where: Prisma.OperationLogEditWhereUniqueInput;
    update: Prisma.XOR<Prisma.OperationLogEditUpdateWithoutAdminInput, Prisma.OperationLogEditUncheckedUpdateWithoutAdminInput>;
    create: Prisma.XOR<Prisma.OperationLogEditCreateWithoutAdminInput, Prisma.OperationLogEditUncheckedCreateWithoutAdminInput>;
};
export type OperationLogEditUpdateWithWhereUniqueWithoutAdminInput = {
    where: Prisma.OperationLogEditWhereUniqueInput;
    data: Prisma.XOR<Prisma.OperationLogEditUpdateWithoutAdminInput, Prisma.OperationLogEditUncheckedUpdateWithoutAdminInput>;
};
export type OperationLogEditUpdateManyWithWhereWithoutAdminInput = {
    where: Prisma.OperationLogEditScalarWhereInput;
    data: Prisma.XOR<Prisma.OperationLogEditUpdateManyMutationInput, Prisma.OperationLogEditUncheckedUpdateManyWithoutAdminInput>;
};
export type OperationLogEditScalarWhereInput = {
    AND?: Prisma.OperationLogEditScalarWhereInput | Prisma.OperationLogEditScalarWhereInput[];
    OR?: Prisma.OperationLogEditScalarWhereInput[];
    NOT?: Prisma.OperationLogEditScalarWhereInput | Prisma.OperationLogEditScalarWhereInput[];
    edit_id?: Prisma.StringFilter<"OperationLogEdit"> | string;
    operation_id?: Prisma.StringFilter<"OperationLogEdit"> | string;
    admin_id?: Prisma.StringFilter<"OperationLogEdit"> | string;
    edit_notes?: Prisma.StringNullableFilter<"OperationLogEdit"> | string | null;
    editedAt?: Prisma.DateTimeFilter<"OperationLogEdit"> | Date | string;
};
export type OperationLogEditCreateWithoutOperationInput = {
    edit_id?: string;
    edit_notes?: string | null;
    editedAt?: Date | string;
    admin: Prisma.UserCreateNestedOneWithoutOperationEditsInput;
};
export type OperationLogEditUncheckedCreateWithoutOperationInput = {
    edit_id?: string;
    admin_id: string;
    edit_notes?: string | null;
    editedAt?: Date | string;
};
export type OperationLogEditCreateOrConnectWithoutOperationInput = {
    where: Prisma.OperationLogEditWhereUniqueInput;
    create: Prisma.XOR<Prisma.OperationLogEditCreateWithoutOperationInput, Prisma.OperationLogEditUncheckedCreateWithoutOperationInput>;
};
export type OperationLogEditCreateManyOperationInputEnvelope = {
    data: Prisma.OperationLogEditCreateManyOperationInput | Prisma.OperationLogEditCreateManyOperationInput[];
    skipDuplicates?: boolean;
};
export type OperationLogEditUpsertWithWhereUniqueWithoutOperationInput = {
    where: Prisma.OperationLogEditWhereUniqueInput;
    update: Prisma.XOR<Prisma.OperationLogEditUpdateWithoutOperationInput, Prisma.OperationLogEditUncheckedUpdateWithoutOperationInput>;
    create: Prisma.XOR<Prisma.OperationLogEditCreateWithoutOperationInput, Prisma.OperationLogEditUncheckedCreateWithoutOperationInput>;
};
export type OperationLogEditUpdateWithWhereUniqueWithoutOperationInput = {
    where: Prisma.OperationLogEditWhereUniqueInput;
    data: Prisma.XOR<Prisma.OperationLogEditUpdateWithoutOperationInput, Prisma.OperationLogEditUncheckedUpdateWithoutOperationInput>;
};
export type OperationLogEditUpdateManyWithWhereWithoutOperationInput = {
    where: Prisma.OperationLogEditScalarWhereInput;
    data: Prisma.XOR<Prisma.OperationLogEditUpdateManyMutationInput, Prisma.OperationLogEditUncheckedUpdateManyWithoutOperationInput>;
};
export type OperationLogEditCreateManyAdminInput = {
    edit_id?: string;
    operation_id: string;
    edit_notes?: string | null;
    editedAt?: Date | string;
};
export type OperationLogEditUpdateWithoutAdminInput = {
    edit_id?: Prisma.StringFieldUpdateOperationsInput | string;
    edit_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    editedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    operation?: Prisma.OperationLogUpdateOneRequiredWithoutEditsNestedInput;
};
export type OperationLogEditUncheckedUpdateWithoutAdminInput = {
    edit_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    edit_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    editedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OperationLogEditUncheckedUpdateManyWithoutAdminInput = {
    edit_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    edit_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    editedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OperationLogEditCreateManyOperationInput = {
    edit_id?: string;
    admin_id: string;
    edit_notes?: string | null;
    editedAt?: Date | string;
};
export type OperationLogEditUpdateWithoutOperationInput = {
    edit_id?: Prisma.StringFieldUpdateOperationsInput | string;
    edit_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    editedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    admin?: Prisma.UserUpdateOneRequiredWithoutOperationEditsNestedInput;
};
export type OperationLogEditUncheckedUpdateWithoutOperationInput = {
    edit_id?: Prisma.StringFieldUpdateOperationsInput | string;
    admin_id?: Prisma.StringFieldUpdateOperationsInput | string;
    edit_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    editedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OperationLogEditUncheckedUpdateManyWithoutOperationInput = {
    edit_id?: Prisma.StringFieldUpdateOperationsInput | string;
    admin_id?: Prisma.StringFieldUpdateOperationsInput | string;
    edit_notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    editedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OperationLogEditSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    edit_id?: boolean;
    operation_id?: boolean;
    admin_id?: boolean;
    edit_notes?: boolean;
    editedAt?: boolean;
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
    admin?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["operationLogEdit"]>;
export type OperationLogEditSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    edit_id?: boolean;
    operation_id?: boolean;
    admin_id?: boolean;
    edit_notes?: boolean;
    editedAt?: boolean;
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
    admin?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["operationLogEdit"]>;
export type OperationLogEditSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    edit_id?: boolean;
    operation_id?: boolean;
    admin_id?: boolean;
    edit_notes?: boolean;
    editedAt?: boolean;
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
    admin?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["operationLogEdit"]>;
export type OperationLogEditSelectScalar = {
    edit_id?: boolean;
    operation_id?: boolean;
    admin_id?: boolean;
    edit_notes?: boolean;
    editedAt?: boolean;
};
export type OperationLogEditOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"edit_id" | "operation_id" | "admin_id" | "edit_notes" | "editedAt", ExtArgs["result"]["operationLogEdit"]>;
export type OperationLogEditInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
    admin?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type OperationLogEditIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
    admin?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type OperationLogEditIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
    admin?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $OperationLogEditPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "OperationLogEdit";
    objects: {
        operation: Prisma.$OperationLogPayload<ExtArgs>;
        admin: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        edit_id: string;
        operation_id: string;
        admin_id: string;
        edit_notes: string | null;
        editedAt: Date;
    }, ExtArgs["result"]["operationLogEdit"]>;
    composites: {};
};
export type OperationLogEditGetPayload<S extends boolean | null | undefined | OperationLogEditDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OperationLogEditPayload, S>;
export type OperationLogEditCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OperationLogEditFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OperationLogEditCountAggregateInputType | true;
};
export interface OperationLogEditDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['OperationLogEdit'];
        meta: {
            name: 'OperationLogEdit';
        };
    };
    /**
     * Find zero or one OperationLogEdit that matches the filter.
     * @param {OperationLogEditFindUniqueArgs} args - Arguments to find a OperationLogEdit
     * @example
     * // Get one OperationLogEdit
     * const operationLogEdit = await prisma.operationLogEdit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OperationLogEditFindUniqueArgs>(args: Prisma.SelectSubset<T, OperationLogEditFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OperationLogEditClient<runtime.Types.Result.GetResult<Prisma.$OperationLogEditPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one OperationLogEdit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OperationLogEditFindUniqueOrThrowArgs} args - Arguments to find a OperationLogEdit
     * @example
     * // Get one OperationLogEdit
     * const operationLogEdit = await prisma.operationLogEdit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OperationLogEditFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OperationLogEditFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OperationLogEditClient<runtime.Types.Result.GetResult<Prisma.$OperationLogEditPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first OperationLogEdit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogEditFindFirstArgs} args - Arguments to find a OperationLogEdit
     * @example
     * // Get one OperationLogEdit
     * const operationLogEdit = await prisma.operationLogEdit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OperationLogEditFindFirstArgs>(args?: Prisma.SelectSubset<T, OperationLogEditFindFirstArgs<ExtArgs>>): Prisma.Prisma__OperationLogEditClient<runtime.Types.Result.GetResult<Prisma.$OperationLogEditPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first OperationLogEdit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogEditFindFirstOrThrowArgs} args - Arguments to find a OperationLogEdit
     * @example
     * // Get one OperationLogEdit
     * const operationLogEdit = await prisma.operationLogEdit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OperationLogEditFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OperationLogEditFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OperationLogEditClient<runtime.Types.Result.GetResult<Prisma.$OperationLogEditPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more OperationLogEdits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogEditFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OperationLogEdits
     * const operationLogEdits = await prisma.operationLogEdit.findMany()
     *
     * // Get first 10 OperationLogEdits
     * const operationLogEdits = await prisma.operationLogEdit.findMany({ take: 10 })
     *
     * // Only select the `edit_id`
     * const operationLogEditWithEdit_idOnly = await prisma.operationLogEdit.findMany({ select: { edit_id: true } })
     *
     */
    findMany<T extends OperationLogEditFindManyArgs>(args?: Prisma.SelectSubset<T, OperationLogEditFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OperationLogEditPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a OperationLogEdit.
     * @param {OperationLogEditCreateArgs} args - Arguments to create a OperationLogEdit.
     * @example
     * // Create one OperationLogEdit
     * const OperationLogEdit = await prisma.operationLogEdit.create({
     *   data: {
     *     // ... data to create a OperationLogEdit
     *   }
     * })
     *
     */
    create<T extends OperationLogEditCreateArgs>(args: Prisma.SelectSubset<T, OperationLogEditCreateArgs<ExtArgs>>): Prisma.Prisma__OperationLogEditClient<runtime.Types.Result.GetResult<Prisma.$OperationLogEditPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many OperationLogEdits.
     * @param {OperationLogEditCreateManyArgs} args - Arguments to create many OperationLogEdits.
     * @example
     * // Create many OperationLogEdits
     * const operationLogEdit = await prisma.operationLogEdit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends OperationLogEditCreateManyArgs>(args?: Prisma.SelectSubset<T, OperationLogEditCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many OperationLogEdits and returns the data saved in the database.
     * @param {OperationLogEditCreateManyAndReturnArgs} args - Arguments to create many OperationLogEdits.
     * @example
     * // Create many OperationLogEdits
     * const operationLogEdit = await prisma.operationLogEdit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many OperationLogEdits and only return the `edit_id`
     * const operationLogEditWithEdit_idOnly = await prisma.operationLogEdit.createManyAndReturn({
     *   select: { edit_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends OperationLogEditCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OperationLogEditCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OperationLogEditPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a OperationLogEdit.
     * @param {OperationLogEditDeleteArgs} args - Arguments to delete one OperationLogEdit.
     * @example
     * // Delete one OperationLogEdit
     * const OperationLogEdit = await prisma.operationLogEdit.delete({
     *   where: {
     *     // ... filter to delete one OperationLogEdit
     *   }
     * })
     *
     */
    delete<T extends OperationLogEditDeleteArgs>(args: Prisma.SelectSubset<T, OperationLogEditDeleteArgs<ExtArgs>>): Prisma.Prisma__OperationLogEditClient<runtime.Types.Result.GetResult<Prisma.$OperationLogEditPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one OperationLogEdit.
     * @param {OperationLogEditUpdateArgs} args - Arguments to update one OperationLogEdit.
     * @example
     * // Update one OperationLogEdit
     * const operationLogEdit = await prisma.operationLogEdit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends OperationLogEditUpdateArgs>(args: Prisma.SelectSubset<T, OperationLogEditUpdateArgs<ExtArgs>>): Prisma.Prisma__OperationLogEditClient<runtime.Types.Result.GetResult<Prisma.$OperationLogEditPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more OperationLogEdits.
     * @param {OperationLogEditDeleteManyArgs} args - Arguments to filter OperationLogEdits to delete.
     * @example
     * // Delete a few OperationLogEdits
     * const { count } = await prisma.operationLogEdit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends OperationLogEditDeleteManyArgs>(args?: Prisma.SelectSubset<T, OperationLogEditDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more OperationLogEdits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogEditUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OperationLogEdits
     * const operationLogEdit = await prisma.operationLogEdit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends OperationLogEditUpdateManyArgs>(args: Prisma.SelectSubset<T, OperationLogEditUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more OperationLogEdits and returns the data updated in the database.
     * @param {OperationLogEditUpdateManyAndReturnArgs} args - Arguments to update many OperationLogEdits.
     * @example
     * // Update many OperationLogEdits
     * const operationLogEdit = await prisma.operationLogEdit.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more OperationLogEdits and only return the `edit_id`
     * const operationLogEditWithEdit_idOnly = await prisma.operationLogEdit.updateManyAndReturn({
     *   select: { edit_id: true },
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
    updateManyAndReturn<T extends OperationLogEditUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OperationLogEditUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OperationLogEditPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one OperationLogEdit.
     * @param {OperationLogEditUpsertArgs} args - Arguments to update or create a OperationLogEdit.
     * @example
     * // Update or create a OperationLogEdit
     * const operationLogEdit = await prisma.operationLogEdit.upsert({
     *   create: {
     *     // ... data to create a OperationLogEdit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OperationLogEdit we want to update
     *   }
     * })
     */
    upsert<T extends OperationLogEditUpsertArgs>(args: Prisma.SelectSubset<T, OperationLogEditUpsertArgs<ExtArgs>>): Prisma.Prisma__OperationLogEditClient<runtime.Types.Result.GetResult<Prisma.$OperationLogEditPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of OperationLogEdits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogEditCountArgs} args - Arguments to filter OperationLogEdits to count.
     * @example
     * // Count the number of OperationLogEdits
     * const count = await prisma.operationLogEdit.count({
     *   where: {
     *     // ... the filter for the OperationLogEdits we want to count
     *   }
     * })
    **/
    count<T extends OperationLogEditCountArgs>(args?: Prisma.Subset<T, OperationLogEditCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OperationLogEditCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a OperationLogEdit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogEditAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OperationLogEditAggregateArgs>(args: Prisma.Subset<T, OperationLogEditAggregateArgs>): Prisma.PrismaPromise<GetOperationLogEditAggregateType<T>>;
    /**
     * Group by OperationLogEdit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogEditGroupByArgs} args - Group by arguments.
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
    groupBy<T extends OperationLogEditGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OperationLogEditGroupByArgs['orderBy'];
    } : {
        orderBy?: OperationLogEditGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OperationLogEditGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOperationLogEditGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the OperationLogEdit model
     */
    readonly fields: OperationLogEditFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for OperationLogEdit.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__OperationLogEditClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    operation<T extends Prisma.OperationLogDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OperationLogDefaultArgs<ExtArgs>>): Prisma.Prisma__OperationLogClient<runtime.Types.Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    admin<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the OperationLogEdit model
 */
export interface OperationLogEditFieldRefs {
    readonly edit_id: Prisma.FieldRef<"OperationLogEdit", 'String'>;
    readonly operation_id: Prisma.FieldRef<"OperationLogEdit", 'String'>;
    readonly admin_id: Prisma.FieldRef<"OperationLogEdit", 'String'>;
    readonly edit_notes: Prisma.FieldRef<"OperationLogEdit", 'String'>;
    readonly editedAt: Prisma.FieldRef<"OperationLogEdit", 'DateTime'>;
}
/**
 * OperationLogEdit findUnique
 */
export type OperationLogEditFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OperationLogEdit to fetch.
     */
    where: Prisma.OperationLogEditWhereUniqueInput;
};
/**
 * OperationLogEdit findUniqueOrThrow
 */
export type OperationLogEditFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OperationLogEdit to fetch.
     */
    where: Prisma.OperationLogEditWhereUniqueInput;
};
/**
 * OperationLogEdit findFirst
 */
export type OperationLogEditFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OperationLogEdit to fetch.
     */
    where?: Prisma.OperationLogEditWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OperationLogEdits to fetch.
     */
    orderBy?: Prisma.OperationLogEditOrderByWithRelationInput | Prisma.OperationLogEditOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OperationLogEdits.
     */
    cursor?: Prisma.OperationLogEditWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OperationLogEdits from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OperationLogEdits.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OperationLogEdits.
     */
    distinct?: Prisma.OperationLogEditScalarFieldEnum | Prisma.OperationLogEditScalarFieldEnum[];
};
/**
 * OperationLogEdit findFirstOrThrow
 */
export type OperationLogEditFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OperationLogEdit to fetch.
     */
    where?: Prisma.OperationLogEditWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OperationLogEdits to fetch.
     */
    orderBy?: Prisma.OperationLogEditOrderByWithRelationInput | Prisma.OperationLogEditOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OperationLogEdits.
     */
    cursor?: Prisma.OperationLogEditWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OperationLogEdits from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OperationLogEdits.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OperationLogEdits.
     */
    distinct?: Prisma.OperationLogEditScalarFieldEnum | Prisma.OperationLogEditScalarFieldEnum[];
};
/**
 * OperationLogEdit findMany
 */
export type OperationLogEditFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OperationLogEdits to fetch.
     */
    where?: Prisma.OperationLogEditWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OperationLogEdits to fetch.
     */
    orderBy?: Prisma.OperationLogEditOrderByWithRelationInput | Prisma.OperationLogEditOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing OperationLogEdits.
     */
    cursor?: Prisma.OperationLogEditWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OperationLogEdits from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OperationLogEdits.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OperationLogEdits.
     */
    distinct?: Prisma.OperationLogEditScalarFieldEnum | Prisma.OperationLogEditScalarFieldEnum[];
};
/**
 * OperationLogEdit create
 */
export type OperationLogEditCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a OperationLogEdit.
     */
    data: Prisma.XOR<Prisma.OperationLogEditCreateInput, Prisma.OperationLogEditUncheckedCreateInput>;
};
/**
 * OperationLogEdit createMany
 */
export type OperationLogEditCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many OperationLogEdits.
     */
    data: Prisma.OperationLogEditCreateManyInput | Prisma.OperationLogEditCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * OperationLogEdit createManyAndReturn
 */
export type OperationLogEditCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLogEdit
     */
    select?: Prisma.OperationLogEditSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the OperationLogEdit
     */
    omit?: Prisma.OperationLogEditOmit<ExtArgs> | null;
    /**
     * The data used to create many OperationLogEdits.
     */
    data: Prisma.OperationLogEditCreateManyInput | Prisma.OperationLogEditCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OperationLogEditIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * OperationLogEdit update
 */
export type OperationLogEditUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a OperationLogEdit.
     */
    data: Prisma.XOR<Prisma.OperationLogEditUpdateInput, Prisma.OperationLogEditUncheckedUpdateInput>;
    /**
     * Choose, which OperationLogEdit to update.
     */
    where: Prisma.OperationLogEditWhereUniqueInput;
};
/**
 * OperationLogEdit updateMany
 */
export type OperationLogEditUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update OperationLogEdits.
     */
    data: Prisma.XOR<Prisma.OperationLogEditUpdateManyMutationInput, Prisma.OperationLogEditUncheckedUpdateManyInput>;
    /**
     * Filter which OperationLogEdits to update
     */
    where?: Prisma.OperationLogEditWhereInput;
    /**
     * Limit how many OperationLogEdits to update.
     */
    limit?: number;
};
/**
 * OperationLogEdit updateManyAndReturn
 */
export type OperationLogEditUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLogEdit
     */
    select?: Prisma.OperationLogEditSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the OperationLogEdit
     */
    omit?: Prisma.OperationLogEditOmit<ExtArgs> | null;
    /**
     * The data used to update OperationLogEdits.
     */
    data: Prisma.XOR<Prisma.OperationLogEditUpdateManyMutationInput, Prisma.OperationLogEditUncheckedUpdateManyInput>;
    /**
     * Filter which OperationLogEdits to update
     */
    where?: Prisma.OperationLogEditWhereInput;
    /**
     * Limit how many OperationLogEdits to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OperationLogEditIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * OperationLogEdit upsert
 */
export type OperationLogEditUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the OperationLogEdit to update in case it exists.
     */
    where: Prisma.OperationLogEditWhereUniqueInput;
    /**
     * In case the OperationLogEdit found by the `where` argument doesn't exist, create a new OperationLogEdit with this data.
     */
    create: Prisma.XOR<Prisma.OperationLogEditCreateInput, Prisma.OperationLogEditUncheckedCreateInput>;
    /**
     * In case the OperationLogEdit was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.OperationLogEditUpdateInput, Prisma.OperationLogEditUncheckedUpdateInput>;
};
/**
 * OperationLogEdit delete
 */
export type OperationLogEditDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which OperationLogEdit to delete.
     */
    where: Prisma.OperationLogEditWhereUniqueInput;
};
/**
 * OperationLogEdit deleteMany
 */
export type OperationLogEditDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which OperationLogEdits to delete
     */
    where?: Prisma.OperationLogEditWhereInput;
    /**
     * Limit how many OperationLogEdits to delete.
     */
    limit?: number;
};
/**
 * OperationLogEdit without action
 */
export type OperationLogEditDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=OperationLogEdit.d.ts.map