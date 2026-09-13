import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model VehicularDispatchResponder
 *
 */
export type VehicularDispatchResponderModel = runtime.Types.Result.DefaultSelection<Prisma.$VehicularDispatchResponderPayload>;
export type AggregateVehicularDispatchResponder = {
    _count: VehicularDispatchResponderCountAggregateOutputType | null;
    _min: VehicularDispatchResponderMinAggregateOutputType | null;
    _max: VehicularDispatchResponderMaxAggregateOutputType | null;
};
export type VehicularDispatchResponderMinAggregateOutputType = {
    dispatch_id: string | null;
    user_id: string | null;
};
export type VehicularDispatchResponderMaxAggregateOutputType = {
    dispatch_id: string | null;
    user_id: string | null;
};
export type VehicularDispatchResponderCountAggregateOutputType = {
    dispatch_id: number;
    user_id: number;
    _all: number;
};
export type VehicularDispatchResponderMinAggregateInputType = {
    dispatch_id?: true;
    user_id?: true;
};
export type VehicularDispatchResponderMaxAggregateInputType = {
    dispatch_id?: true;
    user_id?: true;
};
export type VehicularDispatchResponderCountAggregateInputType = {
    dispatch_id?: true;
    user_id?: true;
    _all?: true;
};
export type VehicularDispatchResponderAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which VehicularDispatchResponder to aggregate.
     */
    where?: Prisma.VehicularDispatchResponderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VehicularDispatchResponders to fetch.
     */
    orderBy?: Prisma.VehicularDispatchResponderOrderByWithRelationInput | Prisma.VehicularDispatchResponderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.VehicularDispatchResponderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VehicularDispatchResponders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VehicularDispatchResponders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned VehicularDispatchResponders
    **/
    _count?: true | VehicularDispatchResponderCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: VehicularDispatchResponderMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: VehicularDispatchResponderMaxAggregateInputType;
};
export type GetVehicularDispatchResponderAggregateType<T extends VehicularDispatchResponderAggregateArgs> = {
    [P in keyof T & keyof AggregateVehicularDispatchResponder]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateVehicularDispatchResponder[P]> : Prisma.GetScalarType<T[P], AggregateVehicularDispatchResponder[P]>;
};
export type VehicularDispatchResponderGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VehicularDispatchResponderWhereInput;
    orderBy?: Prisma.VehicularDispatchResponderOrderByWithAggregationInput | Prisma.VehicularDispatchResponderOrderByWithAggregationInput[];
    by: Prisma.VehicularDispatchResponderScalarFieldEnum[] | Prisma.VehicularDispatchResponderScalarFieldEnum;
    having?: Prisma.VehicularDispatchResponderScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: VehicularDispatchResponderCountAggregateInputType | true;
    _min?: VehicularDispatchResponderMinAggregateInputType;
    _max?: VehicularDispatchResponderMaxAggregateInputType;
};
export type VehicularDispatchResponderGroupByOutputType = {
    dispatch_id: string;
    user_id: string;
    _count: VehicularDispatchResponderCountAggregateOutputType | null;
    _min: VehicularDispatchResponderMinAggregateOutputType | null;
    _max: VehicularDispatchResponderMaxAggregateOutputType | null;
};
export type GetVehicularDispatchResponderGroupByPayload<T extends VehicularDispatchResponderGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<VehicularDispatchResponderGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof VehicularDispatchResponderGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], VehicularDispatchResponderGroupByOutputType[P]> : Prisma.GetScalarType<T[P], VehicularDispatchResponderGroupByOutputType[P]>;
}>>;
export type VehicularDispatchResponderWhereInput = {
    AND?: Prisma.VehicularDispatchResponderWhereInput | Prisma.VehicularDispatchResponderWhereInput[];
    OR?: Prisma.VehicularDispatchResponderWhereInput[];
    NOT?: Prisma.VehicularDispatchResponderWhereInput | Prisma.VehicularDispatchResponderWhereInput[];
    dispatch_id?: Prisma.StringFilter<"VehicularDispatchResponder"> | string;
    user_id?: Prisma.StringFilter<"VehicularDispatchResponder"> | string;
    dispatch?: Prisma.XOR<Prisma.VehicularDispatchScalarRelationFilter, Prisma.VehicularDispatchWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type VehicularDispatchResponderOrderByWithRelationInput = {
    dispatch_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    dispatch?: Prisma.VehicularDispatchOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type VehicularDispatchResponderWhereUniqueInput = Prisma.AtLeast<{
    dispatch_id_user_id?: Prisma.VehicularDispatchResponderDispatch_idUser_idCompoundUniqueInput;
    AND?: Prisma.VehicularDispatchResponderWhereInput | Prisma.VehicularDispatchResponderWhereInput[];
    OR?: Prisma.VehicularDispatchResponderWhereInput[];
    NOT?: Prisma.VehicularDispatchResponderWhereInput | Prisma.VehicularDispatchResponderWhereInput[];
    dispatch_id?: Prisma.StringFilter<"VehicularDispatchResponder"> | string;
    user_id?: Prisma.StringFilter<"VehicularDispatchResponder"> | string;
    dispatch?: Prisma.XOR<Prisma.VehicularDispatchScalarRelationFilter, Prisma.VehicularDispatchWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "dispatch_id_user_id">;
export type VehicularDispatchResponderOrderByWithAggregationInput = {
    dispatch_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    _count?: Prisma.VehicularDispatchResponderCountOrderByAggregateInput;
    _max?: Prisma.VehicularDispatchResponderMaxOrderByAggregateInput;
    _min?: Prisma.VehicularDispatchResponderMinOrderByAggregateInput;
};
export type VehicularDispatchResponderScalarWhereWithAggregatesInput = {
    AND?: Prisma.VehicularDispatchResponderScalarWhereWithAggregatesInput | Prisma.VehicularDispatchResponderScalarWhereWithAggregatesInput[];
    OR?: Prisma.VehicularDispatchResponderScalarWhereWithAggregatesInput[];
    NOT?: Prisma.VehicularDispatchResponderScalarWhereWithAggregatesInput | Prisma.VehicularDispatchResponderScalarWhereWithAggregatesInput[];
    dispatch_id?: Prisma.StringWithAggregatesFilter<"VehicularDispatchResponder"> | string;
    user_id?: Prisma.StringWithAggregatesFilter<"VehicularDispatchResponder"> | string;
};
export type VehicularDispatchResponderCreateInput = {
    dispatch: Prisma.VehicularDispatchCreateNestedOneWithoutRespondersInput;
    user: Prisma.UserCreateNestedOneWithoutDispatchRespondersInput;
};
export type VehicularDispatchResponderUncheckedCreateInput = {
    dispatch_id: string;
    user_id: string;
};
export type VehicularDispatchResponderUpdateInput = {
    dispatch?: Prisma.VehicularDispatchUpdateOneRequiredWithoutRespondersNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutDispatchRespondersNestedInput;
};
export type VehicularDispatchResponderUncheckedUpdateInput = {
    dispatch_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type VehicularDispatchResponderCreateManyInput = {
    dispatch_id: string;
    user_id: string;
};
export type VehicularDispatchResponderUpdateManyMutationInput = {};
export type VehicularDispatchResponderUncheckedUpdateManyInput = {
    dispatch_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type VehicularDispatchResponderListRelationFilter = {
    every?: Prisma.VehicularDispatchResponderWhereInput;
    some?: Prisma.VehicularDispatchResponderWhereInput;
    none?: Prisma.VehicularDispatchResponderWhereInput;
};
export type VehicularDispatchResponderOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type VehicularDispatchResponderDispatch_idUser_idCompoundUniqueInput = {
    dispatch_id: string;
    user_id: string;
};
export type VehicularDispatchResponderCountOrderByAggregateInput = {
    dispatch_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
};
export type VehicularDispatchResponderMaxOrderByAggregateInput = {
    dispatch_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
};
export type VehicularDispatchResponderMinOrderByAggregateInput = {
    dispatch_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
};
export type VehicularDispatchResponderCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.VehicularDispatchResponderCreateWithoutUserInput, Prisma.VehicularDispatchResponderUncheckedCreateWithoutUserInput> | Prisma.VehicularDispatchResponderCreateWithoutUserInput[] | Prisma.VehicularDispatchResponderUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.VehicularDispatchResponderCreateOrConnectWithoutUserInput | Prisma.VehicularDispatchResponderCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.VehicularDispatchResponderCreateManyUserInputEnvelope;
    connect?: Prisma.VehicularDispatchResponderWhereUniqueInput | Prisma.VehicularDispatchResponderWhereUniqueInput[];
};
export type VehicularDispatchResponderUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.VehicularDispatchResponderCreateWithoutUserInput, Prisma.VehicularDispatchResponderUncheckedCreateWithoutUserInput> | Prisma.VehicularDispatchResponderCreateWithoutUserInput[] | Prisma.VehicularDispatchResponderUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.VehicularDispatchResponderCreateOrConnectWithoutUserInput | Prisma.VehicularDispatchResponderCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.VehicularDispatchResponderCreateManyUserInputEnvelope;
    connect?: Prisma.VehicularDispatchResponderWhereUniqueInput | Prisma.VehicularDispatchResponderWhereUniqueInput[];
};
export type VehicularDispatchResponderUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.VehicularDispatchResponderCreateWithoutUserInput, Prisma.VehicularDispatchResponderUncheckedCreateWithoutUserInput> | Prisma.VehicularDispatchResponderCreateWithoutUserInput[] | Prisma.VehicularDispatchResponderUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.VehicularDispatchResponderCreateOrConnectWithoutUserInput | Prisma.VehicularDispatchResponderCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.VehicularDispatchResponderUpsertWithWhereUniqueWithoutUserInput | Prisma.VehicularDispatchResponderUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.VehicularDispatchResponderCreateManyUserInputEnvelope;
    set?: Prisma.VehicularDispatchResponderWhereUniqueInput | Prisma.VehicularDispatchResponderWhereUniqueInput[];
    disconnect?: Prisma.VehicularDispatchResponderWhereUniqueInput | Prisma.VehicularDispatchResponderWhereUniqueInput[];
    delete?: Prisma.VehicularDispatchResponderWhereUniqueInput | Prisma.VehicularDispatchResponderWhereUniqueInput[];
    connect?: Prisma.VehicularDispatchResponderWhereUniqueInput | Prisma.VehicularDispatchResponderWhereUniqueInput[];
    update?: Prisma.VehicularDispatchResponderUpdateWithWhereUniqueWithoutUserInput | Prisma.VehicularDispatchResponderUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.VehicularDispatchResponderUpdateManyWithWhereWithoutUserInput | Prisma.VehicularDispatchResponderUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.VehicularDispatchResponderScalarWhereInput | Prisma.VehicularDispatchResponderScalarWhereInput[];
};
export type VehicularDispatchResponderUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.VehicularDispatchResponderCreateWithoutUserInput, Prisma.VehicularDispatchResponderUncheckedCreateWithoutUserInput> | Prisma.VehicularDispatchResponderCreateWithoutUserInput[] | Prisma.VehicularDispatchResponderUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.VehicularDispatchResponderCreateOrConnectWithoutUserInput | Prisma.VehicularDispatchResponderCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.VehicularDispatchResponderUpsertWithWhereUniqueWithoutUserInput | Prisma.VehicularDispatchResponderUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.VehicularDispatchResponderCreateManyUserInputEnvelope;
    set?: Prisma.VehicularDispatchResponderWhereUniqueInput | Prisma.VehicularDispatchResponderWhereUniqueInput[];
    disconnect?: Prisma.VehicularDispatchResponderWhereUniqueInput | Prisma.VehicularDispatchResponderWhereUniqueInput[];
    delete?: Prisma.VehicularDispatchResponderWhereUniqueInput | Prisma.VehicularDispatchResponderWhereUniqueInput[];
    connect?: Prisma.VehicularDispatchResponderWhereUniqueInput | Prisma.VehicularDispatchResponderWhereUniqueInput[];
    update?: Prisma.VehicularDispatchResponderUpdateWithWhereUniqueWithoutUserInput | Prisma.VehicularDispatchResponderUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.VehicularDispatchResponderUpdateManyWithWhereWithoutUserInput | Prisma.VehicularDispatchResponderUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.VehicularDispatchResponderScalarWhereInput | Prisma.VehicularDispatchResponderScalarWhereInput[];
};
export type VehicularDispatchResponderCreateNestedManyWithoutDispatchInput = {
    create?: Prisma.XOR<Prisma.VehicularDispatchResponderCreateWithoutDispatchInput, Prisma.VehicularDispatchResponderUncheckedCreateWithoutDispatchInput> | Prisma.VehicularDispatchResponderCreateWithoutDispatchInput[] | Prisma.VehicularDispatchResponderUncheckedCreateWithoutDispatchInput[];
    connectOrCreate?: Prisma.VehicularDispatchResponderCreateOrConnectWithoutDispatchInput | Prisma.VehicularDispatchResponderCreateOrConnectWithoutDispatchInput[];
    createMany?: Prisma.VehicularDispatchResponderCreateManyDispatchInputEnvelope;
    connect?: Prisma.VehicularDispatchResponderWhereUniqueInput | Prisma.VehicularDispatchResponderWhereUniqueInput[];
};
export type VehicularDispatchResponderUncheckedCreateNestedManyWithoutDispatchInput = {
    create?: Prisma.XOR<Prisma.VehicularDispatchResponderCreateWithoutDispatchInput, Prisma.VehicularDispatchResponderUncheckedCreateWithoutDispatchInput> | Prisma.VehicularDispatchResponderCreateWithoutDispatchInput[] | Prisma.VehicularDispatchResponderUncheckedCreateWithoutDispatchInput[];
    connectOrCreate?: Prisma.VehicularDispatchResponderCreateOrConnectWithoutDispatchInput | Prisma.VehicularDispatchResponderCreateOrConnectWithoutDispatchInput[];
    createMany?: Prisma.VehicularDispatchResponderCreateManyDispatchInputEnvelope;
    connect?: Prisma.VehicularDispatchResponderWhereUniqueInput | Prisma.VehicularDispatchResponderWhereUniqueInput[];
};
export type VehicularDispatchResponderUpdateManyWithoutDispatchNestedInput = {
    create?: Prisma.XOR<Prisma.VehicularDispatchResponderCreateWithoutDispatchInput, Prisma.VehicularDispatchResponderUncheckedCreateWithoutDispatchInput> | Prisma.VehicularDispatchResponderCreateWithoutDispatchInput[] | Prisma.VehicularDispatchResponderUncheckedCreateWithoutDispatchInput[];
    connectOrCreate?: Prisma.VehicularDispatchResponderCreateOrConnectWithoutDispatchInput | Prisma.VehicularDispatchResponderCreateOrConnectWithoutDispatchInput[];
    upsert?: Prisma.VehicularDispatchResponderUpsertWithWhereUniqueWithoutDispatchInput | Prisma.VehicularDispatchResponderUpsertWithWhereUniqueWithoutDispatchInput[];
    createMany?: Prisma.VehicularDispatchResponderCreateManyDispatchInputEnvelope;
    set?: Prisma.VehicularDispatchResponderWhereUniqueInput | Prisma.VehicularDispatchResponderWhereUniqueInput[];
    disconnect?: Prisma.VehicularDispatchResponderWhereUniqueInput | Prisma.VehicularDispatchResponderWhereUniqueInput[];
    delete?: Prisma.VehicularDispatchResponderWhereUniqueInput | Prisma.VehicularDispatchResponderWhereUniqueInput[];
    connect?: Prisma.VehicularDispatchResponderWhereUniqueInput | Prisma.VehicularDispatchResponderWhereUniqueInput[];
    update?: Prisma.VehicularDispatchResponderUpdateWithWhereUniqueWithoutDispatchInput | Prisma.VehicularDispatchResponderUpdateWithWhereUniqueWithoutDispatchInput[];
    updateMany?: Prisma.VehicularDispatchResponderUpdateManyWithWhereWithoutDispatchInput | Prisma.VehicularDispatchResponderUpdateManyWithWhereWithoutDispatchInput[];
    deleteMany?: Prisma.VehicularDispatchResponderScalarWhereInput | Prisma.VehicularDispatchResponderScalarWhereInput[];
};
export type VehicularDispatchResponderUncheckedUpdateManyWithoutDispatchNestedInput = {
    create?: Prisma.XOR<Prisma.VehicularDispatchResponderCreateWithoutDispatchInput, Prisma.VehicularDispatchResponderUncheckedCreateWithoutDispatchInput> | Prisma.VehicularDispatchResponderCreateWithoutDispatchInput[] | Prisma.VehicularDispatchResponderUncheckedCreateWithoutDispatchInput[];
    connectOrCreate?: Prisma.VehicularDispatchResponderCreateOrConnectWithoutDispatchInput | Prisma.VehicularDispatchResponderCreateOrConnectWithoutDispatchInput[];
    upsert?: Prisma.VehicularDispatchResponderUpsertWithWhereUniqueWithoutDispatchInput | Prisma.VehicularDispatchResponderUpsertWithWhereUniqueWithoutDispatchInput[];
    createMany?: Prisma.VehicularDispatchResponderCreateManyDispatchInputEnvelope;
    set?: Prisma.VehicularDispatchResponderWhereUniqueInput | Prisma.VehicularDispatchResponderWhereUniqueInput[];
    disconnect?: Prisma.VehicularDispatchResponderWhereUniqueInput | Prisma.VehicularDispatchResponderWhereUniqueInput[];
    delete?: Prisma.VehicularDispatchResponderWhereUniqueInput | Prisma.VehicularDispatchResponderWhereUniqueInput[];
    connect?: Prisma.VehicularDispatchResponderWhereUniqueInput | Prisma.VehicularDispatchResponderWhereUniqueInput[];
    update?: Prisma.VehicularDispatchResponderUpdateWithWhereUniqueWithoutDispatchInput | Prisma.VehicularDispatchResponderUpdateWithWhereUniqueWithoutDispatchInput[];
    updateMany?: Prisma.VehicularDispatchResponderUpdateManyWithWhereWithoutDispatchInput | Prisma.VehicularDispatchResponderUpdateManyWithWhereWithoutDispatchInput[];
    deleteMany?: Prisma.VehicularDispatchResponderScalarWhereInput | Prisma.VehicularDispatchResponderScalarWhereInput[];
};
export type VehicularDispatchResponderCreateWithoutUserInput = {
    dispatch: Prisma.VehicularDispatchCreateNestedOneWithoutRespondersInput;
};
export type VehicularDispatchResponderUncheckedCreateWithoutUserInput = {
    dispatch_id: string;
};
export type VehicularDispatchResponderCreateOrConnectWithoutUserInput = {
    where: Prisma.VehicularDispatchResponderWhereUniqueInput;
    create: Prisma.XOR<Prisma.VehicularDispatchResponderCreateWithoutUserInput, Prisma.VehicularDispatchResponderUncheckedCreateWithoutUserInput>;
};
export type VehicularDispatchResponderCreateManyUserInputEnvelope = {
    data: Prisma.VehicularDispatchResponderCreateManyUserInput | Prisma.VehicularDispatchResponderCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type VehicularDispatchResponderUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.VehicularDispatchResponderWhereUniqueInput;
    update: Prisma.XOR<Prisma.VehicularDispatchResponderUpdateWithoutUserInput, Prisma.VehicularDispatchResponderUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.VehicularDispatchResponderCreateWithoutUserInput, Prisma.VehicularDispatchResponderUncheckedCreateWithoutUserInput>;
};
export type VehicularDispatchResponderUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.VehicularDispatchResponderWhereUniqueInput;
    data: Prisma.XOR<Prisma.VehicularDispatchResponderUpdateWithoutUserInput, Prisma.VehicularDispatchResponderUncheckedUpdateWithoutUserInput>;
};
export type VehicularDispatchResponderUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.VehicularDispatchResponderScalarWhereInput;
    data: Prisma.XOR<Prisma.VehicularDispatchResponderUpdateManyMutationInput, Prisma.VehicularDispatchResponderUncheckedUpdateManyWithoutUserInput>;
};
export type VehicularDispatchResponderScalarWhereInput = {
    AND?: Prisma.VehicularDispatchResponderScalarWhereInput | Prisma.VehicularDispatchResponderScalarWhereInput[];
    OR?: Prisma.VehicularDispatchResponderScalarWhereInput[];
    NOT?: Prisma.VehicularDispatchResponderScalarWhereInput | Prisma.VehicularDispatchResponderScalarWhereInput[];
    dispatch_id?: Prisma.StringFilter<"VehicularDispatchResponder"> | string;
    user_id?: Prisma.StringFilter<"VehicularDispatchResponder"> | string;
};
export type VehicularDispatchResponderCreateWithoutDispatchInput = {
    user: Prisma.UserCreateNestedOneWithoutDispatchRespondersInput;
};
export type VehicularDispatchResponderUncheckedCreateWithoutDispatchInput = {
    user_id: string;
};
export type VehicularDispatchResponderCreateOrConnectWithoutDispatchInput = {
    where: Prisma.VehicularDispatchResponderWhereUniqueInput;
    create: Prisma.XOR<Prisma.VehicularDispatchResponderCreateWithoutDispatchInput, Prisma.VehicularDispatchResponderUncheckedCreateWithoutDispatchInput>;
};
export type VehicularDispatchResponderCreateManyDispatchInputEnvelope = {
    data: Prisma.VehicularDispatchResponderCreateManyDispatchInput | Prisma.VehicularDispatchResponderCreateManyDispatchInput[];
    skipDuplicates?: boolean;
};
export type VehicularDispatchResponderUpsertWithWhereUniqueWithoutDispatchInput = {
    where: Prisma.VehicularDispatchResponderWhereUniqueInput;
    update: Prisma.XOR<Prisma.VehicularDispatchResponderUpdateWithoutDispatchInput, Prisma.VehicularDispatchResponderUncheckedUpdateWithoutDispatchInput>;
    create: Prisma.XOR<Prisma.VehicularDispatchResponderCreateWithoutDispatchInput, Prisma.VehicularDispatchResponderUncheckedCreateWithoutDispatchInput>;
};
export type VehicularDispatchResponderUpdateWithWhereUniqueWithoutDispatchInput = {
    where: Prisma.VehicularDispatchResponderWhereUniqueInput;
    data: Prisma.XOR<Prisma.VehicularDispatchResponderUpdateWithoutDispatchInput, Prisma.VehicularDispatchResponderUncheckedUpdateWithoutDispatchInput>;
};
export type VehicularDispatchResponderUpdateManyWithWhereWithoutDispatchInput = {
    where: Prisma.VehicularDispatchResponderScalarWhereInput;
    data: Prisma.XOR<Prisma.VehicularDispatchResponderUpdateManyMutationInput, Prisma.VehicularDispatchResponderUncheckedUpdateManyWithoutDispatchInput>;
};
export type VehicularDispatchResponderCreateManyUserInput = {
    dispatch_id: string;
};
export type VehicularDispatchResponderUpdateWithoutUserInput = {
    dispatch?: Prisma.VehicularDispatchUpdateOneRequiredWithoutRespondersNestedInput;
};
export type VehicularDispatchResponderUncheckedUpdateWithoutUserInput = {
    dispatch_id?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type VehicularDispatchResponderUncheckedUpdateManyWithoutUserInput = {
    dispatch_id?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type VehicularDispatchResponderCreateManyDispatchInput = {
    user_id: string;
};
export type VehicularDispatchResponderUpdateWithoutDispatchInput = {
    user?: Prisma.UserUpdateOneRequiredWithoutDispatchRespondersNestedInput;
};
export type VehicularDispatchResponderUncheckedUpdateWithoutDispatchInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type VehicularDispatchResponderUncheckedUpdateManyWithoutDispatchInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type VehicularDispatchResponderSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    dispatch_id?: boolean;
    user_id?: boolean;
    dispatch?: boolean | Prisma.VehicularDispatchDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["vehicularDispatchResponder"]>;
export type VehicularDispatchResponderSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    dispatch_id?: boolean;
    user_id?: boolean;
    dispatch?: boolean | Prisma.VehicularDispatchDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["vehicularDispatchResponder"]>;
export type VehicularDispatchResponderSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    dispatch_id?: boolean;
    user_id?: boolean;
    dispatch?: boolean | Prisma.VehicularDispatchDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["vehicularDispatchResponder"]>;
export type VehicularDispatchResponderSelectScalar = {
    dispatch_id?: boolean;
    user_id?: boolean;
};
export type VehicularDispatchResponderOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"dispatch_id" | "user_id", ExtArgs["result"]["vehicularDispatchResponder"]>;
export type VehicularDispatchResponderInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    dispatch?: boolean | Prisma.VehicularDispatchDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type VehicularDispatchResponderIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    dispatch?: boolean | Prisma.VehicularDispatchDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type VehicularDispatchResponderIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    dispatch?: boolean | Prisma.VehicularDispatchDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $VehicularDispatchResponderPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "VehicularDispatchResponder";
    objects: {
        dispatch: Prisma.$VehicularDispatchPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        dispatch_id: string;
        user_id: string;
    }, ExtArgs["result"]["vehicularDispatchResponder"]>;
    composites: {};
};
export type VehicularDispatchResponderGetPayload<S extends boolean | null | undefined | VehicularDispatchResponderDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$VehicularDispatchResponderPayload, S>;
export type VehicularDispatchResponderCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<VehicularDispatchResponderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: VehicularDispatchResponderCountAggregateInputType | true;
};
export interface VehicularDispatchResponderDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['VehicularDispatchResponder'];
        meta: {
            name: 'VehicularDispatchResponder';
        };
    };
    /**
     * Find zero or one VehicularDispatchResponder that matches the filter.
     * @param {VehicularDispatchResponderFindUniqueArgs} args - Arguments to find a VehicularDispatchResponder
     * @example
     * // Get one VehicularDispatchResponder
     * const vehicularDispatchResponder = await prisma.vehicularDispatchResponder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VehicularDispatchResponderFindUniqueArgs>(args: Prisma.SelectSubset<T, VehicularDispatchResponderFindUniqueArgs<ExtArgs>>): Prisma.Prisma__VehicularDispatchResponderClient<runtime.Types.Result.GetResult<Prisma.$VehicularDispatchResponderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one VehicularDispatchResponder that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VehicularDispatchResponderFindUniqueOrThrowArgs} args - Arguments to find a VehicularDispatchResponder
     * @example
     * // Get one VehicularDispatchResponder
     * const vehicularDispatchResponder = await prisma.vehicularDispatchResponder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VehicularDispatchResponderFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, VehicularDispatchResponderFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__VehicularDispatchResponderClient<runtime.Types.Result.GetResult<Prisma.$VehicularDispatchResponderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first VehicularDispatchResponder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicularDispatchResponderFindFirstArgs} args - Arguments to find a VehicularDispatchResponder
     * @example
     * // Get one VehicularDispatchResponder
     * const vehicularDispatchResponder = await prisma.vehicularDispatchResponder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VehicularDispatchResponderFindFirstArgs>(args?: Prisma.SelectSubset<T, VehicularDispatchResponderFindFirstArgs<ExtArgs>>): Prisma.Prisma__VehicularDispatchResponderClient<runtime.Types.Result.GetResult<Prisma.$VehicularDispatchResponderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first VehicularDispatchResponder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicularDispatchResponderFindFirstOrThrowArgs} args - Arguments to find a VehicularDispatchResponder
     * @example
     * // Get one VehicularDispatchResponder
     * const vehicularDispatchResponder = await prisma.vehicularDispatchResponder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VehicularDispatchResponderFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, VehicularDispatchResponderFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__VehicularDispatchResponderClient<runtime.Types.Result.GetResult<Prisma.$VehicularDispatchResponderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more VehicularDispatchResponders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicularDispatchResponderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VehicularDispatchResponders
     * const vehicularDispatchResponders = await prisma.vehicularDispatchResponder.findMany()
     *
     * // Get first 10 VehicularDispatchResponders
     * const vehicularDispatchResponders = await prisma.vehicularDispatchResponder.findMany({ take: 10 })
     *
     * // Only select the `dispatch_id`
     * const vehicularDispatchResponderWithDispatch_idOnly = await prisma.vehicularDispatchResponder.findMany({ select: { dispatch_id: true } })
     *
     */
    findMany<T extends VehicularDispatchResponderFindManyArgs>(args?: Prisma.SelectSubset<T, VehicularDispatchResponderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VehicularDispatchResponderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a VehicularDispatchResponder.
     * @param {VehicularDispatchResponderCreateArgs} args - Arguments to create a VehicularDispatchResponder.
     * @example
     * // Create one VehicularDispatchResponder
     * const VehicularDispatchResponder = await prisma.vehicularDispatchResponder.create({
     *   data: {
     *     // ... data to create a VehicularDispatchResponder
     *   }
     * })
     *
     */
    create<T extends VehicularDispatchResponderCreateArgs>(args: Prisma.SelectSubset<T, VehicularDispatchResponderCreateArgs<ExtArgs>>): Prisma.Prisma__VehicularDispatchResponderClient<runtime.Types.Result.GetResult<Prisma.$VehicularDispatchResponderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many VehicularDispatchResponders.
     * @param {VehicularDispatchResponderCreateManyArgs} args - Arguments to create many VehicularDispatchResponders.
     * @example
     * // Create many VehicularDispatchResponders
     * const vehicularDispatchResponder = await prisma.vehicularDispatchResponder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends VehicularDispatchResponderCreateManyArgs>(args?: Prisma.SelectSubset<T, VehicularDispatchResponderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many VehicularDispatchResponders and returns the data saved in the database.
     * @param {VehicularDispatchResponderCreateManyAndReturnArgs} args - Arguments to create many VehicularDispatchResponders.
     * @example
     * // Create many VehicularDispatchResponders
     * const vehicularDispatchResponder = await prisma.vehicularDispatchResponder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many VehicularDispatchResponders and only return the `dispatch_id`
     * const vehicularDispatchResponderWithDispatch_idOnly = await prisma.vehicularDispatchResponder.createManyAndReturn({
     *   select: { dispatch_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends VehicularDispatchResponderCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, VehicularDispatchResponderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VehicularDispatchResponderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a VehicularDispatchResponder.
     * @param {VehicularDispatchResponderDeleteArgs} args - Arguments to delete one VehicularDispatchResponder.
     * @example
     * // Delete one VehicularDispatchResponder
     * const VehicularDispatchResponder = await prisma.vehicularDispatchResponder.delete({
     *   where: {
     *     // ... filter to delete one VehicularDispatchResponder
     *   }
     * })
     *
     */
    delete<T extends VehicularDispatchResponderDeleteArgs>(args: Prisma.SelectSubset<T, VehicularDispatchResponderDeleteArgs<ExtArgs>>): Prisma.Prisma__VehicularDispatchResponderClient<runtime.Types.Result.GetResult<Prisma.$VehicularDispatchResponderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one VehicularDispatchResponder.
     * @param {VehicularDispatchResponderUpdateArgs} args - Arguments to update one VehicularDispatchResponder.
     * @example
     * // Update one VehicularDispatchResponder
     * const vehicularDispatchResponder = await prisma.vehicularDispatchResponder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends VehicularDispatchResponderUpdateArgs>(args: Prisma.SelectSubset<T, VehicularDispatchResponderUpdateArgs<ExtArgs>>): Prisma.Prisma__VehicularDispatchResponderClient<runtime.Types.Result.GetResult<Prisma.$VehicularDispatchResponderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more VehicularDispatchResponders.
     * @param {VehicularDispatchResponderDeleteManyArgs} args - Arguments to filter VehicularDispatchResponders to delete.
     * @example
     * // Delete a few VehicularDispatchResponders
     * const { count } = await prisma.vehicularDispatchResponder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends VehicularDispatchResponderDeleteManyArgs>(args?: Prisma.SelectSubset<T, VehicularDispatchResponderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more VehicularDispatchResponders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicularDispatchResponderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VehicularDispatchResponders
     * const vehicularDispatchResponder = await prisma.vehicularDispatchResponder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends VehicularDispatchResponderUpdateManyArgs>(args: Prisma.SelectSubset<T, VehicularDispatchResponderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more VehicularDispatchResponders and returns the data updated in the database.
     * @param {VehicularDispatchResponderUpdateManyAndReturnArgs} args - Arguments to update many VehicularDispatchResponders.
     * @example
     * // Update many VehicularDispatchResponders
     * const vehicularDispatchResponder = await prisma.vehicularDispatchResponder.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more VehicularDispatchResponders and only return the `dispatch_id`
     * const vehicularDispatchResponderWithDispatch_idOnly = await prisma.vehicularDispatchResponder.updateManyAndReturn({
     *   select: { dispatch_id: true },
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
    updateManyAndReturn<T extends VehicularDispatchResponderUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, VehicularDispatchResponderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VehicularDispatchResponderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one VehicularDispatchResponder.
     * @param {VehicularDispatchResponderUpsertArgs} args - Arguments to update or create a VehicularDispatchResponder.
     * @example
     * // Update or create a VehicularDispatchResponder
     * const vehicularDispatchResponder = await prisma.vehicularDispatchResponder.upsert({
     *   create: {
     *     // ... data to create a VehicularDispatchResponder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VehicularDispatchResponder we want to update
     *   }
     * })
     */
    upsert<T extends VehicularDispatchResponderUpsertArgs>(args: Prisma.SelectSubset<T, VehicularDispatchResponderUpsertArgs<ExtArgs>>): Prisma.Prisma__VehicularDispatchResponderClient<runtime.Types.Result.GetResult<Prisma.$VehicularDispatchResponderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of VehicularDispatchResponders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicularDispatchResponderCountArgs} args - Arguments to filter VehicularDispatchResponders to count.
     * @example
     * // Count the number of VehicularDispatchResponders
     * const count = await prisma.vehicularDispatchResponder.count({
     *   where: {
     *     // ... the filter for the VehicularDispatchResponders we want to count
     *   }
     * })
    **/
    count<T extends VehicularDispatchResponderCountArgs>(args?: Prisma.Subset<T, VehicularDispatchResponderCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], VehicularDispatchResponderCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a VehicularDispatchResponder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicularDispatchResponderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VehicularDispatchResponderAggregateArgs>(args: Prisma.Subset<T, VehicularDispatchResponderAggregateArgs>): Prisma.PrismaPromise<GetVehicularDispatchResponderAggregateType<T>>;
    /**
     * Group by VehicularDispatchResponder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicularDispatchResponderGroupByArgs} args - Group by arguments.
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
    groupBy<T extends VehicularDispatchResponderGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: VehicularDispatchResponderGroupByArgs['orderBy'];
    } : {
        orderBy?: VehicularDispatchResponderGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, VehicularDispatchResponderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVehicularDispatchResponderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the VehicularDispatchResponder model
     */
    readonly fields: VehicularDispatchResponderFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for VehicularDispatchResponder.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__VehicularDispatchResponderClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    dispatch<T extends Prisma.VehicularDispatchDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.VehicularDispatchDefaultArgs<ExtArgs>>): Prisma.Prisma__VehicularDispatchClient<runtime.Types.Result.GetResult<Prisma.$VehicularDispatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the VehicularDispatchResponder model
 */
export interface VehicularDispatchResponderFieldRefs {
    readonly dispatch_id: Prisma.FieldRef<"VehicularDispatchResponder", 'String'>;
    readonly user_id: Prisma.FieldRef<"VehicularDispatchResponder", 'String'>;
}
/**
 * VehicularDispatchResponder findUnique
 */
export type VehicularDispatchResponderFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which VehicularDispatchResponder to fetch.
     */
    where: Prisma.VehicularDispatchResponderWhereUniqueInput;
};
/**
 * VehicularDispatchResponder findUniqueOrThrow
 */
export type VehicularDispatchResponderFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which VehicularDispatchResponder to fetch.
     */
    where: Prisma.VehicularDispatchResponderWhereUniqueInput;
};
/**
 * VehicularDispatchResponder findFirst
 */
export type VehicularDispatchResponderFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which VehicularDispatchResponder to fetch.
     */
    where?: Prisma.VehicularDispatchResponderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VehicularDispatchResponders to fetch.
     */
    orderBy?: Prisma.VehicularDispatchResponderOrderByWithRelationInput | Prisma.VehicularDispatchResponderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for VehicularDispatchResponders.
     */
    cursor?: Prisma.VehicularDispatchResponderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VehicularDispatchResponders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VehicularDispatchResponders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of VehicularDispatchResponders.
     */
    distinct?: Prisma.VehicularDispatchResponderScalarFieldEnum | Prisma.VehicularDispatchResponderScalarFieldEnum[];
};
/**
 * VehicularDispatchResponder findFirstOrThrow
 */
export type VehicularDispatchResponderFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which VehicularDispatchResponder to fetch.
     */
    where?: Prisma.VehicularDispatchResponderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VehicularDispatchResponders to fetch.
     */
    orderBy?: Prisma.VehicularDispatchResponderOrderByWithRelationInput | Prisma.VehicularDispatchResponderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for VehicularDispatchResponders.
     */
    cursor?: Prisma.VehicularDispatchResponderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VehicularDispatchResponders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VehicularDispatchResponders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of VehicularDispatchResponders.
     */
    distinct?: Prisma.VehicularDispatchResponderScalarFieldEnum | Prisma.VehicularDispatchResponderScalarFieldEnum[];
};
/**
 * VehicularDispatchResponder findMany
 */
export type VehicularDispatchResponderFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which VehicularDispatchResponders to fetch.
     */
    where?: Prisma.VehicularDispatchResponderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VehicularDispatchResponders to fetch.
     */
    orderBy?: Prisma.VehicularDispatchResponderOrderByWithRelationInput | Prisma.VehicularDispatchResponderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing VehicularDispatchResponders.
     */
    cursor?: Prisma.VehicularDispatchResponderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VehicularDispatchResponders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VehicularDispatchResponders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of VehicularDispatchResponders.
     */
    distinct?: Prisma.VehicularDispatchResponderScalarFieldEnum | Prisma.VehicularDispatchResponderScalarFieldEnum[];
};
/**
 * VehicularDispatchResponder create
 */
export type VehicularDispatchResponderCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a VehicularDispatchResponder.
     */
    data: Prisma.XOR<Prisma.VehicularDispatchResponderCreateInput, Prisma.VehicularDispatchResponderUncheckedCreateInput>;
};
/**
 * VehicularDispatchResponder createMany
 */
export type VehicularDispatchResponderCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many VehicularDispatchResponders.
     */
    data: Prisma.VehicularDispatchResponderCreateManyInput | Prisma.VehicularDispatchResponderCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * VehicularDispatchResponder createManyAndReturn
 */
export type VehicularDispatchResponderCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicularDispatchResponder
     */
    select?: Prisma.VehicularDispatchResponderSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the VehicularDispatchResponder
     */
    omit?: Prisma.VehicularDispatchResponderOmit<ExtArgs> | null;
    /**
     * The data used to create many VehicularDispatchResponders.
     */
    data: Prisma.VehicularDispatchResponderCreateManyInput | Prisma.VehicularDispatchResponderCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VehicularDispatchResponderIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * VehicularDispatchResponder update
 */
export type VehicularDispatchResponderUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a VehicularDispatchResponder.
     */
    data: Prisma.XOR<Prisma.VehicularDispatchResponderUpdateInput, Prisma.VehicularDispatchResponderUncheckedUpdateInput>;
    /**
     * Choose, which VehicularDispatchResponder to update.
     */
    where: Prisma.VehicularDispatchResponderWhereUniqueInput;
};
/**
 * VehicularDispatchResponder updateMany
 */
export type VehicularDispatchResponderUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update VehicularDispatchResponders.
     */
    data: Prisma.XOR<Prisma.VehicularDispatchResponderUpdateManyMutationInput, Prisma.VehicularDispatchResponderUncheckedUpdateManyInput>;
    /**
     * Filter which VehicularDispatchResponders to update
     */
    where?: Prisma.VehicularDispatchResponderWhereInput;
    /**
     * Limit how many VehicularDispatchResponders to update.
     */
    limit?: number;
};
/**
 * VehicularDispatchResponder updateManyAndReturn
 */
export type VehicularDispatchResponderUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicularDispatchResponder
     */
    select?: Prisma.VehicularDispatchResponderSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the VehicularDispatchResponder
     */
    omit?: Prisma.VehicularDispatchResponderOmit<ExtArgs> | null;
    /**
     * The data used to update VehicularDispatchResponders.
     */
    data: Prisma.XOR<Prisma.VehicularDispatchResponderUpdateManyMutationInput, Prisma.VehicularDispatchResponderUncheckedUpdateManyInput>;
    /**
     * Filter which VehicularDispatchResponders to update
     */
    where?: Prisma.VehicularDispatchResponderWhereInput;
    /**
     * Limit how many VehicularDispatchResponders to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VehicularDispatchResponderIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * VehicularDispatchResponder upsert
 */
export type VehicularDispatchResponderUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the VehicularDispatchResponder to update in case it exists.
     */
    where: Prisma.VehicularDispatchResponderWhereUniqueInput;
    /**
     * In case the VehicularDispatchResponder found by the `where` argument doesn't exist, create a new VehicularDispatchResponder with this data.
     */
    create: Prisma.XOR<Prisma.VehicularDispatchResponderCreateInput, Prisma.VehicularDispatchResponderUncheckedCreateInput>;
    /**
     * In case the VehicularDispatchResponder was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.VehicularDispatchResponderUpdateInput, Prisma.VehicularDispatchResponderUncheckedUpdateInput>;
};
/**
 * VehicularDispatchResponder delete
 */
export type VehicularDispatchResponderDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which VehicularDispatchResponder to delete.
     */
    where: Prisma.VehicularDispatchResponderWhereUniqueInput;
};
/**
 * VehicularDispatchResponder deleteMany
 */
export type VehicularDispatchResponderDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which VehicularDispatchResponders to delete
     */
    where?: Prisma.VehicularDispatchResponderWhereInput;
    /**
     * Limit how many VehicularDispatchResponders to delete.
     */
    limit?: number;
};
/**
 * VehicularDispatchResponder without action
 */
export type VehicularDispatchResponderDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=VehicularDispatchResponder.d.ts.map