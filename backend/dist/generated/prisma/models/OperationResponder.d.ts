import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model OperationResponder
 *
 */
export type OperationResponderModel = runtime.Types.Result.DefaultSelection<Prisma.$OperationResponderPayload>;
export type AggregateOperationResponder = {
    _count: OperationResponderCountAggregateOutputType | null;
    _min: OperationResponderMinAggregateOutputType | null;
    _max: OperationResponderMaxAggregateOutputType | null;
};
export type OperationResponderMinAggregateOutputType = {
    operation_id: string | null;
    user_id: string | null;
};
export type OperationResponderMaxAggregateOutputType = {
    operation_id: string | null;
    user_id: string | null;
};
export type OperationResponderCountAggregateOutputType = {
    operation_id: number;
    user_id: number;
    _all: number;
};
export type OperationResponderMinAggregateInputType = {
    operation_id?: true;
    user_id?: true;
};
export type OperationResponderMaxAggregateInputType = {
    operation_id?: true;
    user_id?: true;
};
export type OperationResponderCountAggregateInputType = {
    operation_id?: true;
    user_id?: true;
    _all?: true;
};
export type OperationResponderAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which OperationResponder to aggregate.
     */
    where?: Prisma.OperationResponderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OperationResponders to fetch.
     */
    orderBy?: Prisma.OperationResponderOrderByWithRelationInput | Prisma.OperationResponderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.OperationResponderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OperationResponders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OperationResponders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned OperationResponders
    **/
    _count?: true | OperationResponderCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: OperationResponderMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: OperationResponderMaxAggregateInputType;
};
export type GetOperationResponderAggregateType<T extends OperationResponderAggregateArgs> = {
    [P in keyof T & keyof AggregateOperationResponder]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOperationResponder[P]> : Prisma.GetScalarType<T[P], AggregateOperationResponder[P]>;
};
export type OperationResponderGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OperationResponderWhereInput;
    orderBy?: Prisma.OperationResponderOrderByWithAggregationInput | Prisma.OperationResponderOrderByWithAggregationInput[];
    by: Prisma.OperationResponderScalarFieldEnum[] | Prisma.OperationResponderScalarFieldEnum;
    having?: Prisma.OperationResponderScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OperationResponderCountAggregateInputType | true;
    _min?: OperationResponderMinAggregateInputType;
    _max?: OperationResponderMaxAggregateInputType;
};
export type OperationResponderGroupByOutputType = {
    operation_id: string;
    user_id: string;
    _count: OperationResponderCountAggregateOutputType | null;
    _min: OperationResponderMinAggregateOutputType | null;
    _max: OperationResponderMaxAggregateOutputType | null;
};
export type GetOperationResponderGroupByPayload<T extends OperationResponderGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OperationResponderGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OperationResponderGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OperationResponderGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OperationResponderGroupByOutputType[P]>;
}>>;
export type OperationResponderWhereInput = {
    AND?: Prisma.OperationResponderWhereInput | Prisma.OperationResponderWhereInput[];
    OR?: Prisma.OperationResponderWhereInput[];
    NOT?: Prisma.OperationResponderWhereInput | Prisma.OperationResponderWhereInput[];
    operation_id?: Prisma.StringFilter<"OperationResponder"> | string;
    user_id?: Prisma.StringFilter<"OperationResponder"> | string;
    operation?: Prisma.XOR<Prisma.OperationLogScalarRelationFilter, Prisma.OperationLogWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type OperationResponderOrderByWithRelationInput = {
    operation_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    operation?: Prisma.OperationLogOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type OperationResponderWhereUniqueInput = Prisma.AtLeast<{
    operation_id_user_id?: Prisma.OperationResponderOperation_idUser_idCompoundUniqueInput;
    AND?: Prisma.OperationResponderWhereInput | Prisma.OperationResponderWhereInput[];
    OR?: Prisma.OperationResponderWhereInput[];
    NOT?: Prisma.OperationResponderWhereInput | Prisma.OperationResponderWhereInput[];
    operation_id?: Prisma.StringFilter<"OperationResponder"> | string;
    user_id?: Prisma.StringFilter<"OperationResponder"> | string;
    operation?: Prisma.XOR<Prisma.OperationLogScalarRelationFilter, Prisma.OperationLogWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "operation_id_user_id">;
export type OperationResponderOrderByWithAggregationInput = {
    operation_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    _count?: Prisma.OperationResponderCountOrderByAggregateInput;
    _max?: Prisma.OperationResponderMaxOrderByAggregateInput;
    _min?: Prisma.OperationResponderMinOrderByAggregateInput;
};
export type OperationResponderScalarWhereWithAggregatesInput = {
    AND?: Prisma.OperationResponderScalarWhereWithAggregatesInput | Prisma.OperationResponderScalarWhereWithAggregatesInput[];
    OR?: Prisma.OperationResponderScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OperationResponderScalarWhereWithAggregatesInput | Prisma.OperationResponderScalarWhereWithAggregatesInput[];
    operation_id?: Prisma.StringWithAggregatesFilter<"OperationResponder"> | string;
    user_id?: Prisma.StringWithAggregatesFilter<"OperationResponder"> | string;
};
export type OperationResponderCreateInput = {
    operation: Prisma.OperationLogCreateNestedOneWithoutRespondersInput;
    user: Prisma.UserCreateNestedOneWithoutOperationRespondersInput;
};
export type OperationResponderUncheckedCreateInput = {
    operation_id: string;
    user_id: string;
};
export type OperationResponderUpdateInput = {
    operation?: Prisma.OperationLogUpdateOneRequiredWithoutRespondersNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutOperationRespondersNestedInput;
};
export type OperationResponderUncheckedUpdateInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type OperationResponderCreateManyInput = {
    operation_id: string;
    user_id: string;
};
export type OperationResponderUpdateManyMutationInput = {};
export type OperationResponderUncheckedUpdateManyInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type OperationResponderListRelationFilter = {
    every?: Prisma.OperationResponderWhereInput;
    some?: Prisma.OperationResponderWhereInput;
    none?: Prisma.OperationResponderWhereInput;
};
export type OperationResponderOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type OperationResponderOperation_idUser_idCompoundUniqueInput = {
    operation_id: string;
    user_id: string;
};
export type OperationResponderCountOrderByAggregateInput = {
    operation_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
};
export type OperationResponderMaxOrderByAggregateInput = {
    operation_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
};
export type OperationResponderMinOrderByAggregateInput = {
    operation_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
};
export type OperationResponderCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.OperationResponderCreateWithoutUserInput, Prisma.OperationResponderUncheckedCreateWithoutUserInput> | Prisma.OperationResponderCreateWithoutUserInput[] | Prisma.OperationResponderUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OperationResponderCreateOrConnectWithoutUserInput | Prisma.OperationResponderCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.OperationResponderCreateManyUserInputEnvelope;
    connect?: Prisma.OperationResponderWhereUniqueInput | Prisma.OperationResponderWhereUniqueInput[];
};
export type OperationResponderUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.OperationResponderCreateWithoutUserInput, Prisma.OperationResponderUncheckedCreateWithoutUserInput> | Prisma.OperationResponderCreateWithoutUserInput[] | Prisma.OperationResponderUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OperationResponderCreateOrConnectWithoutUserInput | Prisma.OperationResponderCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.OperationResponderCreateManyUserInputEnvelope;
    connect?: Prisma.OperationResponderWhereUniqueInput | Prisma.OperationResponderWhereUniqueInput[];
};
export type OperationResponderUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.OperationResponderCreateWithoutUserInput, Prisma.OperationResponderUncheckedCreateWithoutUserInput> | Prisma.OperationResponderCreateWithoutUserInput[] | Prisma.OperationResponderUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OperationResponderCreateOrConnectWithoutUserInput | Prisma.OperationResponderCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.OperationResponderUpsertWithWhereUniqueWithoutUserInput | Prisma.OperationResponderUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.OperationResponderCreateManyUserInputEnvelope;
    set?: Prisma.OperationResponderWhereUniqueInput | Prisma.OperationResponderWhereUniqueInput[];
    disconnect?: Prisma.OperationResponderWhereUniqueInput | Prisma.OperationResponderWhereUniqueInput[];
    delete?: Prisma.OperationResponderWhereUniqueInput | Prisma.OperationResponderWhereUniqueInput[];
    connect?: Prisma.OperationResponderWhereUniqueInput | Prisma.OperationResponderWhereUniqueInput[];
    update?: Prisma.OperationResponderUpdateWithWhereUniqueWithoutUserInput | Prisma.OperationResponderUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.OperationResponderUpdateManyWithWhereWithoutUserInput | Prisma.OperationResponderUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.OperationResponderScalarWhereInput | Prisma.OperationResponderScalarWhereInput[];
};
export type OperationResponderUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.OperationResponderCreateWithoutUserInput, Prisma.OperationResponderUncheckedCreateWithoutUserInput> | Prisma.OperationResponderCreateWithoutUserInput[] | Prisma.OperationResponderUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OperationResponderCreateOrConnectWithoutUserInput | Prisma.OperationResponderCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.OperationResponderUpsertWithWhereUniqueWithoutUserInput | Prisma.OperationResponderUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.OperationResponderCreateManyUserInputEnvelope;
    set?: Prisma.OperationResponderWhereUniqueInput | Prisma.OperationResponderWhereUniqueInput[];
    disconnect?: Prisma.OperationResponderWhereUniqueInput | Prisma.OperationResponderWhereUniqueInput[];
    delete?: Prisma.OperationResponderWhereUniqueInput | Prisma.OperationResponderWhereUniqueInput[];
    connect?: Prisma.OperationResponderWhereUniqueInput | Prisma.OperationResponderWhereUniqueInput[];
    update?: Prisma.OperationResponderUpdateWithWhereUniqueWithoutUserInput | Prisma.OperationResponderUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.OperationResponderUpdateManyWithWhereWithoutUserInput | Prisma.OperationResponderUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.OperationResponderScalarWhereInput | Prisma.OperationResponderScalarWhereInput[];
};
export type OperationResponderCreateNestedManyWithoutOperationInput = {
    create?: Prisma.XOR<Prisma.OperationResponderCreateWithoutOperationInput, Prisma.OperationResponderUncheckedCreateWithoutOperationInput> | Prisma.OperationResponderCreateWithoutOperationInput[] | Prisma.OperationResponderUncheckedCreateWithoutOperationInput[];
    connectOrCreate?: Prisma.OperationResponderCreateOrConnectWithoutOperationInput | Prisma.OperationResponderCreateOrConnectWithoutOperationInput[];
    createMany?: Prisma.OperationResponderCreateManyOperationInputEnvelope;
    connect?: Prisma.OperationResponderWhereUniqueInput | Prisma.OperationResponderWhereUniqueInput[];
};
export type OperationResponderUncheckedCreateNestedManyWithoutOperationInput = {
    create?: Prisma.XOR<Prisma.OperationResponderCreateWithoutOperationInput, Prisma.OperationResponderUncheckedCreateWithoutOperationInput> | Prisma.OperationResponderCreateWithoutOperationInput[] | Prisma.OperationResponderUncheckedCreateWithoutOperationInput[];
    connectOrCreate?: Prisma.OperationResponderCreateOrConnectWithoutOperationInput | Prisma.OperationResponderCreateOrConnectWithoutOperationInput[];
    createMany?: Prisma.OperationResponderCreateManyOperationInputEnvelope;
    connect?: Prisma.OperationResponderWhereUniqueInput | Prisma.OperationResponderWhereUniqueInput[];
};
export type OperationResponderUpdateManyWithoutOperationNestedInput = {
    create?: Prisma.XOR<Prisma.OperationResponderCreateWithoutOperationInput, Prisma.OperationResponderUncheckedCreateWithoutOperationInput> | Prisma.OperationResponderCreateWithoutOperationInput[] | Prisma.OperationResponderUncheckedCreateWithoutOperationInput[];
    connectOrCreate?: Prisma.OperationResponderCreateOrConnectWithoutOperationInput | Prisma.OperationResponderCreateOrConnectWithoutOperationInput[];
    upsert?: Prisma.OperationResponderUpsertWithWhereUniqueWithoutOperationInput | Prisma.OperationResponderUpsertWithWhereUniqueWithoutOperationInput[];
    createMany?: Prisma.OperationResponderCreateManyOperationInputEnvelope;
    set?: Prisma.OperationResponderWhereUniqueInput | Prisma.OperationResponderWhereUniqueInput[];
    disconnect?: Prisma.OperationResponderWhereUniqueInput | Prisma.OperationResponderWhereUniqueInput[];
    delete?: Prisma.OperationResponderWhereUniqueInput | Prisma.OperationResponderWhereUniqueInput[];
    connect?: Prisma.OperationResponderWhereUniqueInput | Prisma.OperationResponderWhereUniqueInput[];
    update?: Prisma.OperationResponderUpdateWithWhereUniqueWithoutOperationInput | Prisma.OperationResponderUpdateWithWhereUniqueWithoutOperationInput[];
    updateMany?: Prisma.OperationResponderUpdateManyWithWhereWithoutOperationInput | Prisma.OperationResponderUpdateManyWithWhereWithoutOperationInput[];
    deleteMany?: Prisma.OperationResponderScalarWhereInput | Prisma.OperationResponderScalarWhereInput[];
};
export type OperationResponderUncheckedUpdateManyWithoutOperationNestedInput = {
    create?: Prisma.XOR<Prisma.OperationResponderCreateWithoutOperationInput, Prisma.OperationResponderUncheckedCreateWithoutOperationInput> | Prisma.OperationResponderCreateWithoutOperationInput[] | Prisma.OperationResponderUncheckedCreateWithoutOperationInput[];
    connectOrCreate?: Prisma.OperationResponderCreateOrConnectWithoutOperationInput | Prisma.OperationResponderCreateOrConnectWithoutOperationInput[];
    upsert?: Prisma.OperationResponderUpsertWithWhereUniqueWithoutOperationInput | Prisma.OperationResponderUpsertWithWhereUniqueWithoutOperationInput[];
    createMany?: Prisma.OperationResponderCreateManyOperationInputEnvelope;
    set?: Prisma.OperationResponderWhereUniqueInput | Prisma.OperationResponderWhereUniqueInput[];
    disconnect?: Prisma.OperationResponderWhereUniqueInput | Prisma.OperationResponderWhereUniqueInput[];
    delete?: Prisma.OperationResponderWhereUniqueInput | Prisma.OperationResponderWhereUniqueInput[];
    connect?: Prisma.OperationResponderWhereUniqueInput | Prisma.OperationResponderWhereUniqueInput[];
    update?: Prisma.OperationResponderUpdateWithWhereUniqueWithoutOperationInput | Prisma.OperationResponderUpdateWithWhereUniqueWithoutOperationInput[];
    updateMany?: Prisma.OperationResponderUpdateManyWithWhereWithoutOperationInput | Prisma.OperationResponderUpdateManyWithWhereWithoutOperationInput[];
    deleteMany?: Prisma.OperationResponderScalarWhereInput | Prisma.OperationResponderScalarWhereInput[];
};
export type OperationResponderCreateWithoutUserInput = {
    operation: Prisma.OperationLogCreateNestedOneWithoutRespondersInput;
};
export type OperationResponderUncheckedCreateWithoutUserInput = {
    operation_id: string;
};
export type OperationResponderCreateOrConnectWithoutUserInput = {
    where: Prisma.OperationResponderWhereUniqueInput;
    create: Prisma.XOR<Prisma.OperationResponderCreateWithoutUserInput, Prisma.OperationResponderUncheckedCreateWithoutUserInput>;
};
export type OperationResponderCreateManyUserInputEnvelope = {
    data: Prisma.OperationResponderCreateManyUserInput | Prisma.OperationResponderCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type OperationResponderUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.OperationResponderWhereUniqueInput;
    update: Prisma.XOR<Prisma.OperationResponderUpdateWithoutUserInput, Prisma.OperationResponderUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.OperationResponderCreateWithoutUserInput, Prisma.OperationResponderUncheckedCreateWithoutUserInput>;
};
export type OperationResponderUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.OperationResponderWhereUniqueInput;
    data: Prisma.XOR<Prisma.OperationResponderUpdateWithoutUserInput, Prisma.OperationResponderUncheckedUpdateWithoutUserInput>;
};
export type OperationResponderUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.OperationResponderScalarWhereInput;
    data: Prisma.XOR<Prisma.OperationResponderUpdateManyMutationInput, Prisma.OperationResponderUncheckedUpdateManyWithoutUserInput>;
};
export type OperationResponderScalarWhereInput = {
    AND?: Prisma.OperationResponderScalarWhereInput | Prisma.OperationResponderScalarWhereInput[];
    OR?: Prisma.OperationResponderScalarWhereInput[];
    NOT?: Prisma.OperationResponderScalarWhereInput | Prisma.OperationResponderScalarWhereInput[];
    operation_id?: Prisma.StringFilter<"OperationResponder"> | string;
    user_id?: Prisma.StringFilter<"OperationResponder"> | string;
};
export type OperationResponderCreateWithoutOperationInput = {
    user: Prisma.UserCreateNestedOneWithoutOperationRespondersInput;
};
export type OperationResponderUncheckedCreateWithoutOperationInput = {
    user_id: string;
};
export type OperationResponderCreateOrConnectWithoutOperationInput = {
    where: Prisma.OperationResponderWhereUniqueInput;
    create: Prisma.XOR<Prisma.OperationResponderCreateWithoutOperationInput, Prisma.OperationResponderUncheckedCreateWithoutOperationInput>;
};
export type OperationResponderCreateManyOperationInputEnvelope = {
    data: Prisma.OperationResponderCreateManyOperationInput | Prisma.OperationResponderCreateManyOperationInput[];
    skipDuplicates?: boolean;
};
export type OperationResponderUpsertWithWhereUniqueWithoutOperationInput = {
    where: Prisma.OperationResponderWhereUniqueInput;
    update: Prisma.XOR<Prisma.OperationResponderUpdateWithoutOperationInput, Prisma.OperationResponderUncheckedUpdateWithoutOperationInput>;
    create: Prisma.XOR<Prisma.OperationResponderCreateWithoutOperationInput, Prisma.OperationResponderUncheckedCreateWithoutOperationInput>;
};
export type OperationResponderUpdateWithWhereUniqueWithoutOperationInput = {
    where: Prisma.OperationResponderWhereUniqueInput;
    data: Prisma.XOR<Prisma.OperationResponderUpdateWithoutOperationInput, Prisma.OperationResponderUncheckedUpdateWithoutOperationInput>;
};
export type OperationResponderUpdateManyWithWhereWithoutOperationInput = {
    where: Prisma.OperationResponderScalarWhereInput;
    data: Prisma.XOR<Prisma.OperationResponderUpdateManyMutationInput, Prisma.OperationResponderUncheckedUpdateManyWithoutOperationInput>;
};
export type OperationResponderCreateManyUserInput = {
    operation_id: string;
};
export type OperationResponderUpdateWithoutUserInput = {
    operation?: Prisma.OperationLogUpdateOneRequiredWithoutRespondersNestedInput;
};
export type OperationResponderUncheckedUpdateWithoutUserInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type OperationResponderUncheckedUpdateManyWithoutUserInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type OperationResponderCreateManyOperationInput = {
    user_id: string;
};
export type OperationResponderUpdateWithoutOperationInput = {
    user?: Prisma.UserUpdateOneRequiredWithoutOperationRespondersNestedInput;
};
export type OperationResponderUncheckedUpdateWithoutOperationInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type OperationResponderUncheckedUpdateManyWithoutOperationInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type OperationResponderSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    operation_id?: boolean;
    user_id?: boolean;
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["operationResponder"]>;
export type OperationResponderSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    operation_id?: boolean;
    user_id?: boolean;
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["operationResponder"]>;
export type OperationResponderSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    operation_id?: boolean;
    user_id?: boolean;
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["operationResponder"]>;
export type OperationResponderSelectScalar = {
    operation_id?: boolean;
    user_id?: boolean;
};
export type OperationResponderOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"operation_id" | "user_id", ExtArgs["result"]["operationResponder"]>;
export type OperationResponderInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type OperationResponderIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type OperationResponderIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $OperationResponderPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "OperationResponder";
    objects: {
        operation: Prisma.$OperationLogPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        operation_id: string;
        user_id: string;
    }, ExtArgs["result"]["operationResponder"]>;
    composites: {};
};
export type OperationResponderGetPayload<S extends boolean | null | undefined | OperationResponderDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OperationResponderPayload, S>;
export type OperationResponderCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OperationResponderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OperationResponderCountAggregateInputType | true;
};
export interface OperationResponderDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['OperationResponder'];
        meta: {
            name: 'OperationResponder';
        };
    };
    /**
     * Find zero or one OperationResponder that matches the filter.
     * @param {OperationResponderFindUniqueArgs} args - Arguments to find a OperationResponder
     * @example
     * // Get one OperationResponder
     * const operationResponder = await prisma.operationResponder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OperationResponderFindUniqueArgs>(args: Prisma.SelectSubset<T, OperationResponderFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OperationResponderClient<runtime.Types.Result.GetResult<Prisma.$OperationResponderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one OperationResponder that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OperationResponderFindUniqueOrThrowArgs} args - Arguments to find a OperationResponder
     * @example
     * // Get one OperationResponder
     * const operationResponder = await prisma.operationResponder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OperationResponderFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OperationResponderFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OperationResponderClient<runtime.Types.Result.GetResult<Prisma.$OperationResponderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first OperationResponder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationResponderFindFirstArgs} args - Arguments to find a OperationResponder
     * @example
     * // Get one OperationResponder
     * const operationResponder = await prisma.operationResponder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OperationResponderFindFirstArgs>(args?: Prisma.SelectSubset<T, OperationResponderFindFirstArgs<ExtArgs>>): Prisma.Prisma__OperationResponderClient<runtime.Types.Result.GetResult<Prisma.$OperationResponderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first OperationResponder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationResponderFindFirstOrThrowArgs} args - Arguments to find a OperationResponder
     * @example
     * // Get one OperationResponder
     * const operationResponder = await prisma.operationResponder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OperationResponderFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OperationResponderFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OperationResponderClient<runtime.Types.Result.GetResult<Prisma.$OperationResponderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more OperationResponders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationResponderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OperationResponders
     * const operationResponders = await prisma.operationResponder.findMany()
     *
     * // Get first 10 OperationResponders
     * const operationResponders = await prisma.operationResponder.findMany({ take: 10 })
     *
     * // Only select the `operation_id`
     * const operationResponderWithOperation_idOnly = await prisma.operationResponder.findMany({ select: { operation_id: true } })
     *
     */
    findMany<T extends OperationResponderFindManyArgs>(args?: Prisma.SelectSubset<T, OperationResponderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OperationResponderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a OperationResponder.
     * @param {OperationResponderCreateArgs} args - Arguments to create a OperationResponder.
     * @example
     * // Create one OperationResponder
     * const OperationResponder = await prisma.operationResponder.create({
     *   data: {
     *     // ... data to create a OperationResponder
     *   }
     * })
     *
     */
    create<T extends OperationResponderCreateArgs>(args: Prisma.SelectSubset<T, OperationResponderCreateArgs<ExtArgs>>): Prisma.Prisma__OperationResponderClient<runtime.Types.Result.GetResult<Prisma.$OperationResponderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many OperationResponders.
     * @param {OperationResponderCreateManyArgs} args - Arguments to create many OperationResponders.
     * @example
     * // Create many OperationResponders
     * const operationResponder = await prisma.operationResponder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends OperationResponderCreateManyArgs>(args?: Prisma.SelectSubset<T, OperationResponderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many OperationResponders and returns the data saved in the database.
     * @param {OperationResponderCreateManyAndReturnArgs} args - Arguments to create many OperationResponders.
     * @example
     * // Create many OperationResponders
     * const operationResponder = await prisma.operationResponder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many OperationResponders and only return the `operation_id`
     * const operationResponderWithOperation_idOnly = await prisma.operationResponder.createManyAndReturn({
     *   select: { operation_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends OperationResponderCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OperationResponderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OperationResponderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a OperationResponder.
     * @param {OperationResponderDeleteArgs} args - Arguments to delete one OperationResponder.
     * @example
     * // Delete one OperationResponder
     * const OperationResponder = await prisma.operationResponder.delete({
     *   where: {
     *     // ... filter to delete one OperationResponder
     *   }
     * })
     *
     */
    delete<T extends OperationResponderDeleteArgs>(args: Prisma.SelectSubset<T, OperationResponderDeleteArgs<ExtArgs>>): Prisma.Prisma__OperationResponderClient<runtime.Types.Result.GetResult<Prisma.$OperationResponderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one OperationResponder.
     * @param {OperationResponderUpdateArgs} args - Arguments to update one OperationResponder.
     * @example
     * // Update one OperationResponder
     * const operationResponder = await prisma.operationResponder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends OperationResponderUpdateArgs>(args: Prisma.SelectSubset<T, OperationResponderUpdateArgs<ExtArgs>>): Prisma.Prisma__OperationResponderClient<runtime.Types.Result.GetResult<Prisma.$OperationResponderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more OperationResponders.
     * @param {OperationResponderDeleteManyArgs} args - Arguments to filter OperationResponders to delete.
     * @example
     * // Delete a few OperationResponders
     * const { count } = await prisma.operationResponder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends OperationResponderDeleteManyArgs>(args?: Prisma.SelectSubset<T, OperationResponderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more OperationResponders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationResponderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OperationResponders
     * const operationResponder = await prisma.operationResponder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends OperationResponderUpdateManyArgs>(args: Prisma.SelectSubset<T, OperationResponderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more OperationResponders and returns the data updated in the database.
     * @param {OperationResponderUpdateManyAndReturnArgs} args - Arguments to update many OperationResponders.
     * @example
     * // Update many OperationResponders
     * const operationResponder = await prisma.operationResponder.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more OperationResponders and only return the `operation_id`
     * const operationResponderWithOperation_idOnly = await prisma.operationResponder.updateManyAndReturn({
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
    updateManyAndReturn<T extends OperationResponderUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OperationResponderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OperationResponderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one OperationResponder.
     * @param {OperationResponderUpsertArgs} args - Arguments to update or create a OperationResponder.
     * @example
     * // Update or create a OperationResponder
     * const operationResponder = await prisma.operationResponder.upsert({
     *   create: {
     *     // ... data to create a OperationResponder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OperationResponder we want to update
     *   }
     * })
     */
    upsert<T extends OperationResponderUpsertArgs>(args: Prisma.SelectSubset<T, OperationResponderUpsertArgs<ExtArgs>>): Prisma.Prisma__OperationResponderClient<runtime.Types.Result.GetResult<Prisma.$OperationResponderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of OperationResponders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationResponderCountArgs} args - Arguments to filter OperationResponders to count.
     * @example
     * // Count the number of OperationResponders
     * const count = await prisma.operationResponder.count({
     *   where: {
     *     // ... the filter for the OperationResponders we want to count
     *   }
     * })
    **/
    count<T extends OperationResponderCountArgs>(args?: Prisma.Subset<T, OperationResponderCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OperationResponderCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a OperationResponder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationResponderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OperationResponderAggregateArgs>(args: Prisma.Subset<T, OperationResponderAggregateArgs>): Prisma.PrismaPromise<GetOperationResponderAggregateType<T>>;
    /**
     * Group by OperationResponder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationResponderGroupByArgs} args - Group by arguments.
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
    groupBy<T extends OperationResponderGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OperationResponderGroupByArgs['orderBy'];
    } : {
        orderBy?: OperationResponderGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OperationResponderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOperationResponderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the OperationResponder model
     */
    readonly fields: OperationResponderFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for OperationResponder.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__OperationResponderClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    operation<T extends Prisma.OperationLogDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OperationLogDefaultArgs<ExtArgs>>): Prisma.Prisma__OperationLogClient<runtime.Types.Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the OperationResponder model
 */
export interface OperationResponderFieldRefs {
    readonly operation_id: Prisma.FieldRef<"OperationResponder", 'String'>;
    readonly user_id: Prisma.FieldRef<"OperationResponder", 'String'>;
}
/**
 * OperationResponder findUnique
 */
export type OperationResponderFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OperationResponder to fetch.
     */
    where: Prisma.OperationResponderWhereUniqueInput;
};
/**
 * OperationResponder findUniqueOrThrow
 */
export type OperationResponderFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OperationResponder to fetch.
     */
    where: Prisma.OperationResponderWhereUniqueInput;
};
/**
 * OperationResponder findFirst
 */
export type OperationResponderFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OperationResponder to fetch.
     */
    where?: Prisma.OperationResponderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OperationResponders to fetch.
     */
    orderBy?: Prisma.OperationResponderOrderByWithRelationInput | Prisma.OperationResponderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OperationResponders.
     */
    cursor?: Prisma.OperationResponderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OperationResponders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OperationResponders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OperationResponders.
     */
    distinct?: Prisma.OperationResponderScalarFieldEnum | Prisma.OperationResponderScalarFieldEnum[];
};
/**
 * OperationResponder findFirstOrThrow
 */
export type OperationResponderFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OperationResponder to fetch.
     */
    where?: Prisma.OperationResponderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OperationResponders to fetch.
     */
    orderBy?: Prisma.OperationResponderOrderByWithRelationInput | Prisma.OperationResponderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OperationResponders.
     */
    cursor?: Prisma.OperationResponderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OperationResponders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OperationResponders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OperationResponders.
     */
    distinct?: Prisma.OperationResponderScalarFieldEnum | Prisma.OperationResponderScalarFieldEnum[];
};
/**
 * OperationResponder findMany
 */
export type OperationResponderFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OperationResponders to fetch.
     */
    where?: Prisma.OperationResponderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OperationResponders to fetch.
     */
    orderBy?: Prisma.OperationResponderOrderByWithRelationInput | Prisma.OperationResponderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing OperationResponders.
     */
    cursor?: Prisma.OperationResponderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OperationResponders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OperationResponders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OperationResponders.
     */
    distinct?: Prisma.OperationResponderScalarFieldEnum | Prisma.OperationResponderScalarFieldEnum[];
};
/**
 * OperationResponder create
 */
export type OperationResponderCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a OperationResponder.
     */
    data: Prisma.XOR<Prisma.OperationResponderCreateInput, Prisma.OperationResponderUncheckedCreateInput>;
};
/**
 * OperationResponder createMany
 */
export type OperationResponderCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many OperationResponders.
     */
    data: Prisma.OperationResponderCreateManyInput | Prisma.OperationResponderCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * OperationResponder createManyAndReturn
 */
export type OperationResponderCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationResponder
     */
    select?: Prisma.OperationResponderSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the OperationResponder
     */
    omit?: Prisma.OperationResponderOmit<ExtArgs> | null;
    /**
     * The data used to create many OperationResponders.
     */
    data: Prisma.OperationResponderCreateManyInput | Prisma.OperationResponderCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OperationResponderIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * OperationResponder update
 */
export type OperationResponderUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a OperationResponder.
     */
    data: Prisma.XOR<Prisma.OperationResponderUpdateInput, Prisma.OperationResponderUncheckedUpdateInput>;
    /**
     * Choose, which OperationResponder to update.
     */
    where: Prisma.OperationResponderWhereUniqueInput;
};
/**
 * OperationResponder updateMany
 */
export type OperationResponderUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update OperationResponders.
     */
    data: Prisma.XOR<Prisma.OperationResponderUpdateManyMutationInput, Prisma.OperationResponderUncheckedUpdateManyInput>;
    /**
     * Filter which OperationResponders to update
     */
    where?: Prisma.OperationResponderWhereInput;
    /**
     * Limit how many OperationResponders to update.
     */
    limit?: number;
};
/**
 * OperationResponder updateManyAndReturn
 */
export type OperationResponderUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationResponder
     */
    select?: Prisma.OperationResponderSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the OperationResponder
     */
    omit?: Prisma.OperationResponderOmit<ExtArgs> | null;
    /**
     * The data used to update OperationResponders.
     */
    data: Prisma.XOR<Prisma.OperationResponderUpdateManyMutationInput, Prisma.OperationResponderUncheckedUpdateManyInput>;
    /**
     * Filter which OperationResponders to update
     */
    where?: Prisma.OperationResponderWhereInput;
    /**
     * Limit how many OperationResponders to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OperationResponderIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * OperationResponder upsert
 */
export type OperationResponderUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the OperationResponder to update in case it exists.
     */
    where: Prisma.OperationResponderWhereUniqueInput;
    /**
     * In case the OperationResponder found by the `where` argument doesn't exist, create a new OperationResponder with this data.
     */
    create: Prisma.XOR<Prisma.OperationResponderCreateInput, Prisma.OperationResponderUncheckedCreateInput>;
    /**
     * In case the OperationResponder was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.OperationResponderUpdateInput, Prisma.OperationResponderUncheckedUpdateInput>;
};
/**
 * OperationResponder delete
 */
export type OperationResponderDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which OperationResponder to delete.
     */
    where: Prisma.OperationResponderWhereUniqueInput;
};
/**
 * OperationResponder deleteMany
 */
export type OperationResponderDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which OperationResponders to delete
     */
    where?: Prisma.OperationResponderWhereInput;
    /**
     * Limit how many OperationResponders to delete.
     */
    limit?: number;
};
/**
 * OperationResponder without action
 */
export type OperationResponderDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=OperationResponder.d.ts.map