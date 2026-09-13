import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model PatientResponder
 *
 */
export type PatientResponderModel = runtime.Types.Result.DefaultSelection<Prisma.$PatientResponderPayload>;
export type AggregatePatientResponder = {
    _count: PatientResponderCountAggregateOutputType | null;
    _min: PatientResponderMinAggregateOutputType | null;
    _max: PatientResponderMaxAggregateOutputType | null;
};
export type PatientResponderMinAggregateOutputType = {
    patient_log_id: string | null;
    user_id: string | null;
};
export type PatientResponderMaxAggregateOutputType = {
    patient_log_id: string | null;
    user_id: string | null;
};
export type PatientResponderCountAggregateOutputType = {
    patient_log_id: number;
    user_id: number;
    _all: number;
};
export type PatientResponderMinAggregateInputType = {
    patient_log_id?: true;
    user_id?: true;
};
export type PatientResponderMaxAggregateInputType = {
    patient_log_id?: true;
    user_id?: true;
};
export type PatientResponderCountAggregateInputType = {
    patient_log_id?: true;
    user_id?: true;
    _all?: true;
};
export type PatientResponderAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PatientResponder to aggregate.
     */
    where?: Prisma.PatientResponderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PatientResponders to fetch.
     */
    orderBy?: Prisma.PatientResponderOrderByWithRelationInput | Prisma.PatientResponderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.PatientResponderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PatientResponders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PatientResponders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned PatientResponders
    **/
    _count?: true | PatientResponderCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: PatientResponderMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: PatientResponderMaxAggregateInputType;
};
export type GetPatientResponderAggregateType<T extends PatientResponderAggregateArgs> = {
    [P in keyof T & keyof AggregatePatientResponder]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePatientResponder[P]> : Prisma.GetScalarType<T[P], AggregatePatientResponder[P]>;
};
export type PatientResponderGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PatientResponderWhereInput;
    orderBy?: Prisma.PatientResponderOrderByWithAggregationInput | Prisma.PatientResponderOrderByWithAggregationInput[];
    by: Prisma.PatientResponderScalarFieldEnum[] | Prisma.PatientResponderScalarFieldEnum;
    having?: Prisma.PatientResponderScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PatientResponderCountAggregateInputType | true;
    _min?: PatientResponderMinAggregateInputType;
    _max?: PatientResponderMaxAggregateInputType;
};
export type PatientResponderGroupByOutputType = {
    patient_log_id: string;
    user_id: string;
    _count: PatientResponderCountAggregateOutputType | null;
    _min: PatientResponderMinAggregateOutputType | null;
    _max: PatientResponderMaxAggregateOutputType | null;
};
export type GetPatientResponderGroupByPayload<T extends PatientResponderGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PatientResponderGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PatientResponderGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PatientResponderGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PatientResponderGroupByOutputType[P]>;
}>>;
export type PatientResponderWhereInput = {
    AND?: Prisma.PatientResponderWhereInput | Prisma.PatientResponderWhereInput[];
    OR?: Prisma.PatientResponderWhereInput[];
    NOT?: Prisma.PatientResponderWhereInput | Prisma.PatientResponderWhereInput[];
    patient_log_id?: Prisma.StringFilter<"PatientResponder"> | string;
    user_id?: Prisma.StringFilter<"PatientResponder"> | string;
    patientLog?: Prisma.XOR<Prisma.PatientLogScalarRelationFilter, Prisma.PatientLogWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type PatientResponderOrderByWithRelationInput = {
    patient_log_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    patientLog?: Prisma.PatientLogOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type PatientResponderWhereUniqueInput = Prisma.AtLeast<{
    patient_log_id_user_id?: Prisma.PatientResponderPatient_log_idUser_idCompoundUniqueInput;
    AND?: Prisma.PatientResponderWhereInput | Prisma.PatientResponderWhereInput[];
    OR?: Prisma.PatientResponderWhereInput[];
    NOT?: Prisma.PatientResponderWhereInput | Prisma.PatientResponderWhereInput[];
    patient_log_id?: Prisma.StringFilter<"PatientResponder"> | string;
    user_id?: Prisma.StringFilter<"PatientResponder"> | string;
    patientLog?: Prisma.XOR<Prisma.PatientLogScalarRelationFilter, Prisma.PatientLogWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "patient_log_id_user_id">;
export type PatientResponderOrderByWithAggregationInput = {
    patient_log_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    _count?: Prisma.PatientResponderCountOrderByAggregateInput;
    _max?: Prisma.PatientResponderMaxOrderByAggregateInput;
    _min?: Prisma.PatientResponderMinOrderByAggregateInput;
};
export type PatientResponderScalarWhereWithAggregatesInput = {
    AND?: Prisma.PatientResponderScalarWhereWithAggregatesInput | Prisma.PatientResponderScalarWhereWithAggregatesInput[];
    OR?: Prisma.PatientResponderScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PatientResponderScalarWhereWithAggregatesInput | Prisma.PatientResponderScalarWhereWithAggregatesInput[];
    patient_log_id?: Prisma.StringWithAggregatesFilter<"PatientResponder"> | string;
    user_id?: Prisma.StringWithAggregatesFilter<"PatientResponder"> | string;
};
export type PatientResponderCreateInput = {
    patientLog: Prisma.PatientLogCreateNestedOneWithoutRespondersInput;
    user: Prisma.UserCreateNestedOneWithoutPatientRespondersInput;
};
export type PatientResponderUncheckedCreateInput = {
    patient_log_id: string;
    user_id: string;
};
export type PatientResponderUpdateInput = {
    patientLog?: Prisma.PatientLogUpdateOneRequiredWithoutRespondersNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutPatientRespondersNestedInput;
};
export type PatientResponderUncheckedUpdateInput = {
    patient_log_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PatientResponderCreateManyInput = {
    patient_log_id: string;
    user_id: string;
};
export type PatientResponderUpdateManyMutationInput = {};
export type PatientResponderUncheckedUpdateManyInput = {
    patient_log_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PatientResponderListRelationFilter = {
    every?: Prisma.PatientResponderWhereInput;
    some?: Prisma.PatientResponderWhereInput;
    none?: Prisma.PatientResponderWhereInput;
};
export type PatientResponderOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PatientResponderPatient_log_idUser_idCompoundUniqueInput = {
    patient_log_id: string;
    user_id: string;
};
export type PatientResponderCountOrderByAggregateInput = {
    patient_log_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
};
export type PatientResponderMaxOrderByAggregateInput = {
    patient_log_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
};
export type PatientResponderMinOrderByAggregateInput = {
    patient_log_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
};
export type PatientResponderCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PatientResponderCreateWithoutUserInput, Prisma.PatientResponderUncheckedCreateWithoutUserInput> | Prisma.PatientResponderCreateWithoutUserInput[] | Prisma.PatientResponderUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PatientResponderCreateOrConnectWithoutUserInput | Prisma.PatientResponderCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PatientResponderCreateManyUserInputEnvelope;
    connect?: Prisma.PatientResponderWhereUniqueInput | Prisma.PatientResponderWhereUniqueInput[];
};
export type PatientResponderUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PatientResponderCreateWithoutUserInput, Prisma.PatientResponderUncheckedCreateWithoutUserInput> | Prisma.PatientResponderCreateWithoutUserInput[] | Prisma.PatientResponderUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PatientResponderCreateOrConnectWithoutUserInput | Prisma.PatientResponderCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PatientResponderCreateManyUserInputEnvelope;
    connect?: Prisma.PatientResponderWhereUniqueInput | Prisma.PatientResponderWhereUniqueInput[];
};
export type PatientResponderUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PatientResponderCreateWithoutUserInput, Prisma.PatientResponderUncheckedCreateWithoutUserInput> | Prisma.PatientResponderCreateWithoutUserInput[] | Prisma.PatientResponderUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PatientResponderCreateOrConnectWithoutUserInput | Prisma.PatientResponderCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PatientResponderUpsertWithWhereUniqueWithoutUserInput | Prisma.PatientResponderUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PatientResponderCreateManyUserInputEnvelope;
    set?: Prisma.PatientResponderWhereUniqueInput | Prisma.PatientResponderWhereUniqueInput[];
    disconnect?: Prisma.PatientResponderWhereUniqueInput | Prisma.PatientResponderWhereUniqueInput[];
    delete?: Prisma.PatientResponderWhereUniqueInput | Prisma.PatientResponderWhereUniqueInput[];
    connect?: Prisma.PatientResponderWhereUniqueInput | Prisma.PatientResponderWhereUniqueInput[];
    update?: Prisma.PatientResponderUpdateWithWhereUniqueWithoutUserInput | Prisma.PatientResponderUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PatientResponderUpdateManyWithWhereWithoutUserInput | Prisma.PatientResponderUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PatientResponderScalarWhereInput | Prisma.PatientResponderScalarWhereInput[];
};
export type PatientResponderUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PatientResponderCreateWithoutUserInput, Prisma.PatientResponderUncheckedCreateWithoutUserInput> | Prisma.PatientResponderCreateWithoutUserInput[] | Prisma.PatientResponderUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PatientResponderCreateOrConnectWithoutUserInput | Prisma.PatientResponderCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PatientResponderUpsertWithWhereUniqueWithoutUserInput | Prisma.PatientResponderUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PatientResponderCreateManyUserInputEnvelope;
    set?: Prisma.PatientResponderWhereUniqueInput | Prisma.PatientResponderWhereUniqueInput[];
    disconnect?: Prisma.PatientResponderWhereUniqueInput | Prisma.PatientResponderWhereUniqueInput[];
    delete?: Prisma.PatientResponderWhereUniqueInput | Prisma.PatientResponderWhereUniqueInput[];
    connect?: Prisma.PatientResponderWhereUniqueInput | Prisma.PatientResponderWhereUniqueInput[];
    update?: Prisma.PatientResponderUpdateWithWhereUniqueWithoutUserInput | Prisma.PatientResponderUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PatientResponderUpdateManyWithWhereWithoutUserInput | Prisma.PatientResponderUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PatientResponderScalarWhereInput | Prisma.PatientResponderScalarWhereInput[];
};
export type PatientResponderCreateNestedManyWithoutPatientLogInput = {
    create?: Prisma.XOR<Prisma.PatientResponderCreateWithoutPatientLogInput, Prisma.PatientResponderUncheckedCreateWithoutPatientLogInput> | Prisma.PatientResponderCreateWithoutPatientLogInput[] | Prisma.PatientResponderUncheckedCreateWithoutPatientLogInput[];
    connectOrCreate?: Prisma.PatientResponderCreateOrConnectWithoutPatientLogInput | Prisma.PatientResponderCreateOrConnectWithoutPatientLogInput[];
    createMany?: Prisma.PatientResponderCreateManyPatientLogInputEnvelope;
    connect?: Prisma.PatientResponderWhereUniqueInput | Prisma.PatientResponderWhereUniqueInput[];
};
export type PatientResponderUncheckedCreateNestedManyWithoutPatientLogInput = {
    create?: Prisma.XOR<Prisma.PatientResponderCreateWithoutPatientLogInput, Prisma.PatientResponderUncheckedCreateWithoutPatientLogInput> | Prisma.PatientResponderCreateWithoutPatientLogInput[] | Prisma.PatientResponderUncheckedCreateWithoutPatientLogInput[];
    connectOrCreate?: Prisma.PatientResponderCreateOrConnectWithoutPatientLogInput | Prisma.PatientResponderCreateOrConnectWithoutPatientLogInput[];
    createMany?: Prisma.PatientResponderCreateManyPatientLogInputEnvelope;
    connect?: Prisma.PatientResponderWhereUniqueInput | Prisma.PatientResponderWhereUniqueInput[];
};
export type PatientResponderUpdateManyWithoutPatientLogNestedInput = {
    create?: Prisma.XOR<Prisma.PatientResponderCreateWithoutPatientLogInput, Prisma.PatientResponderUncheckedCreateWithoutPatientLogInput> | Prisma.PatientResponderCreateWithoutPatientLogInput[] | Prisma.PatientResponderUncheckedCreateWithoutPatientLogInput[];
    connectOrCreate?: Prisma.PatientResponderCreateOrConnectWithoutPatientLogInput | Prisma.PatientResponderCreateOrConnectWithoutPatientLogInput[];
    upsert?: Prisma.PatientResponderUpsertWithWhereUniqueWithoutPatientLogInput | Prisma.PatientResponderUpsertWithWhereUniqueWithoutPatientLogInput[];
    createMany?: Prisma.PatientResponderCreateManyPatientLogInputEnvelope;
    set?: Prisma.PatientResponderWhereUniqueInput | Prisma.PatientResponderWhereUniqueInput[];
    disconnect?: Prisma.PatientResponderWhereUniqueInput | Prisma.PatientResponderWhereUniqueInput[];
    delete?: Prisma.PatientResponderWhereUniqueInput | Prisma.PatientResponderWhereUniqueInput[];
    connect?: Prisma.PatientResponderWhereUniqueInput | Prisma.PatientResponderWhereUniqueInput[];
    update?: Prisma.PatientResponderUpdateWithWhereUniqueWithoutPatientLogInput | Prisma.PatientResponderUpdateWithWhereUniqueWithoutPatientLogInput[];
    updateMany?: Prisma.PatientResponderUpdateManyWithWhereWithoutPatientLogInput | Prisma.PatientResponderUpdateManyWithWhereWithoutPatientLogInput[];
    deleteMany?: Prisma.PatientResponderScalarWhereInput | Prisma.PatientResponderScalarWhereInput[];
};
export type PatientResponderUncheckedUpdateManyWithoutPatientLogNestedInput = {
    create?: Prisma.XOR<Prisma.PatientResponderCreateWithoutPatientLogInput, Prisma.PatientResponderUncheckedCreateWithoutPatientLogInput> | Prisma.PatientResponderCreateWithoutPatientLogInput[] | Prisma.PatientResponderUncheckedCreateWithoutPatientLogInput[];
    connectOrCreate?: Prisma.PatientResponderCreateOrConnectWithoutPatientLogInput | Prisma.PatientResponderCreateOrConnectWithoutPatientLogInput[];
    upsert?: Prisma.PatientResponderUpsertWithWhereUniqueWithoutPatientLogInput | Prisma.PatientResponderUpsertWithWhereUniqueWithoutPatientLogInput[];
    createMany?: Prisma.PatientResponderCreateManyPatientLogInputEnvelope;
    set?: Prisma.PatientResponderWhereUniqueInput | Prisma.PatientResponderWhereUniqueInput[];
    disconnect?: Prisma.PatientResponderWhereUniqueInput | Prisma.PatientResponderWhereUniqueInput[];
    delete?: Prisma.PatientResponderWhereUniqueInput | Prisma.PatientResponderWhereUniqueInput[];
    connect?: Prisma.PatientResponderWhereUniqueInput | Prisma.PatientResponderWhereUniqueInput[];
    update?: Prisma.PatientResponderUpdateWithWhereUniqueWithoutPatientLogInput | Prisma.PatientResponderUpdateWithWhereUniqueWithoutPatientLogInput[];
    updateMany?: Prisma.PatientResponderUpdateManyWithWhereWithoutPatientLogInput | Prisma.PatientResponderUpdateManyWithWhereWithoutPatientLogInput[];
    deleteMany?: Prisma.PatientResponderScalarWhereInput | Prisma.PatientResponderScalarWhereInput[];
};
export type PatientResponderCreateWithoutUserInput = {
    patientLog: Prisma.PatientLogCreateNestedOneWithoutRespondersInput;
};
export type PatientResponderUncheckedCreateWithoutUserInput = {
    patient_log_id: string;
};
export type PatientResponderCreateOrConnectWithoutUserInput = {
    where: Prisma.PatientResponderWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientResponderCreateWithoutUserInput, Prisma.PatientResponderUncheckedCreateWithoutUserInput>;
};
export type PatientResponderCreateManyUserInputEnvelope = {
    data: Prisma.PatientResponderCreateManyUserInput | Prisma.PatientResponderCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type PatientResponderUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.PatientResponderWhereUniqueInput;
    update: Prisma.XOR<Prisma.PatientResponderUpdateWithoutUserInput, Prisma.PatientResponderUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.PatientResponderCreateWithoutUserInput, Prisma.PatientResponderUncheckedCreateWithoutUserInput>;
};
export type PatientResponderUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.PatientResponderWhereUniqueInput;
    data: Prisma.XOR<Prisma.PatientResponderUpdateWithoutUserInput, Prisma.PatientResponderUncheckedUpdateWithoutUserInput>;
};
export type PatientResponderUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.PatientResponderScalarWhereInput;
    data: Prisma.XOR<Prisma.PatientResponderUpdateManyMutationInput, Prisma.PatientResponderUncheckedUpdateManyWithoutUserInput>;
};
export type PatientResponderScalarWhereInput = {
    AND?: Prisma.PatientResponderScalarWhereInput | Prisma.PatientResponderScalarWhereInput[];
    OR?: Prisma.PatientResponderScalarWhereInput[];
    NOT?: Prisma.PatientResponderScalarWhereInput | Prisma.PatientResponderScalarWhereInput[];
    patient_log_id?: Prisma.StringFilter<"PatientResponder"> | string;
    user_id?: Prisma.StringFilter<"PatientResponder"> | string;
};
export type PatientResponderCreateWithoutPatientLogInput = {
    user: Prisma.UserCreateNestedOneWithoutPatientRespondersInput;
};
export type PatientResponderUncheckedCreateWithoutPatientLogInput = {
    user_id: string;
};
export type PatientResponderCreateOrConnectWithoutPatientLogInput = {
    where: Prisma.PatientResponderWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientResponderCreateWithoutPatientLogInput, Prisma.PatientResponderUncheckedCreateWithoutPatientLogInput>;
};
export type PatientResponderCreateManyPatientLogInputEnvelope = {
    data: Prisma.PatientResponderCreateManyPatientLogInput | Prisma.PatientResponderCreateManyPatientLogInput[];
    skipDuplicates?: boolean;
};
export type PatientResponderUpsertWithWhereUniqueWithoutPatientLogInput = {
    where: Prisma.PatientResponderWhereUniqueInput;
    update: Prisma.XOR<Prisma.PatientResponderUpdateWithoutPatientLogInput, Prisma.PatientResponderUncheckedUpdateWithoutPatientLogInput>;
    create: Prisma.XOR<Prisma.PatientResponderCreateWithoutPatientLogInput, Prisma.PatientResponderUncheckedCreateWithoutPatientLogInput>;
};
export type PatientResponderUpdateWithWhereUniqueWithoutPatientLogInput = {
    where: Prisma.PatientResponderWhereUniqueInput;
    data: Prisma.XOR<Prisma.PatientResponderUpdateWithoutPatientLogInput, Prisma.PatientResponderUncheckedUpdateWithoutPatientLogInput>;
};
export type PatientResponderUpdateManyWithWhereWithoutPatientLogInput = {
    where: Prisma.PatientResponderScalarWhereInput;
    data: Prisma.XOR<Prisma.PatientResponderUpdateManyMutationInput, Prisma.PatientResponderUncheckedUpdateManyWithoutPatientLogInput>;
};
export type PatientResponderCreateManyUserInput = {
    patient_log_id: string;
};
export type PatientResponderUpdateWithoutUserInput = {
    patientLog?: Prisma.PatientLogUpdateOneRequiredWithoutRespondersNestedInput;
};
export type PatientResponderUncheckedUpdateWithoutUserInput = {
    patient_log_id?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PatientResponderUncheckedUpdateManyWithoutUserInput = {
    patient_log_id?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PatientResponderCreateManyPatientLogInput = {
    user_id: string;
};
export type PatientResponderUpdateWithoutPatientLogInput = {
    user?: Prisma.UserUpdateOneRequiredWithoutPatientRespondersNestedInput;
};
export type PatientResponderUncheckedUpdateWithoutPatientLogInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PatientResponderUncheckedUpdateManyWithoutPatientLogInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PatientResponderSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    patient_log_id?: boolean;
    user_id?: boolean;
    patientLog?: boolean | Prisma.PatientLogDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["patientResponder"]>;
export type PatientResponderSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    patient_log_id?: boolean;
    user_id?: boolean;
    patientLog?: boolean | Prisma.PatientLogDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["patientResponder"]>;
export type PatientResponderSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    patient_log_id?: boolean;
    user_id?: boolean;
    patientLog?: boolean | Prisma.PatientLogDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["patientResponder"]>;
export type PatientResponderSelectScalar = {
    patient_log_id?: boolean;
    user_id?: boolean;
};
export type PatientResponderOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"patient_log_id" | "user_id", ExtArgs["result"]["patientResponder"]>;
export type PatientResponderInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    patientLog?: boolean | Prisma.PatientLogDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PatientResponderIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    patientLog?: boolean | Prisma.PatientLogDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PatientResponderIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    patientLog?: boolean | Prisma.PatientLogDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $PatientResponderPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PatientResponder";
    objects: {
        patientLog: Prisma.$PatientLogPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        patient_log_id: string;
        user_id: string;
    }, ExtArgs["result"]["patientResponder"]>;
    composites: {};
};
export type PatientResponderGetPayload<S extends boolean | null | undefined | PatientResponderDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PatientResponderPayload, S>;
export type PatientResponderCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PatientResponderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PatientResponderCountAggregateInputType | true;
};
export interface PatientResponderDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PatientResponder'];
        meta: {
            name: 'PatientResponder';
        };
    };
    /**
     * Find zero or one PatientResponder that matches the filter.
     * @param {PatientResponderFindUniqueArgs} args - Arguments to find a PatientResponder
     * @example
     * // Get one PatientResponder
     * const patientResponder = await prisma.patientResponder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientResponderFindUniqueArgs>(args: Prisma.SelectSubset<T, PatientResponderFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PatientResponderClient<runtime.Types.Result.GetResult<Prisma.$PatientResponderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one PatientResponder that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatientResponderFindUniqueOrThrowArgs} args - Arguments to find a PatientResponder
     * @example
     * // Get one PatientResponder
     * const patientResponder = await prisma.patientResponder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientResponderFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PatientResponderFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PatientResponderClient<runtime.Types.Result.GetResult<Prisma.$PatientResponderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PatientResponder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientResponderFindFirstArgs} args - Arguments to find a PatientResponder
     * @example
     * // Get one PatientResponder
     * const patientResponder = await prisma.patientResponder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientResponderFindFirstArgs>(args?: Prisma.SelectSubset<T, PatientResponderFindFirstArgs<ExtArgs>>): Prisma.Prisma__PatientResponderClient<runtime.Types.Result.GetResult<Prisma.$PatientResponderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PatientResponder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientResponderFindFirstOrThrowArgs} args - Arguments to find a PatientResponder
     * @example
     * // Get one PatientResponder
     * const patientResponder = await prisma.patientResponder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientResponderFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PatientResponderFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PatientResponderClient<runtime.Types.Result.GetResult<Prisma.$PatientResponderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more PatientResponders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientResponderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PatientResponders
     * const patientResponders = await prisma.patientResponder.findMany()
     *
     * // Get first 10 PatientResponders
     * const patientResponders = await prisma.patientResponder.findMany({ take: 10 })
     *
     * // Only select the `patient_log_id`
     * const patientResponderWithPatient_log_idOnly = await prisma.patientResponder.findMany({ select: { patient_log_id: true } })
     *
     */
    findMany<T extends PatientResponderFindManyArgs>(args?: Prisma.SelectSubset<T, PatientResponderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientResponderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a PatientResponder.
     * @param {PatientResponderCreateArgs} args - Arguments to create a PatientResponder.
     * @example
     * // Create one PatientResponder
     * const PatientResponder = await prisma.patientResponder.create({
     *   data: {
     *     // ... data to create a PatientResponder
     *   }
     * })
     *
     */
    create<T extends PatientResponderCreateArgs>(args: Prisma.SelectSubset<T, PatientResponderCreateArgs<ExtArgs>>): Prisma.Prisma__PatientResponderClient<runtime.Types.Result.GetResult<Prisma.$PatientResponderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many PatientResponders.
     * @param {PatientResponderCreateManyArgs} args - Arguments to create many PatientResponders.
     * @example
     * // Create many PatientResponders
     * const patientResponder = await prisma.patientResponder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PatientResponderCreateManyArgs>(args?: Prisma.SelectSubset<T, PatientResponderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many PatientResponders and returns the data saved in the database.
     * @param {PatientResponderCreateManyAndReturnArgs} args - Arguments to create many PatientResponders.
     * @example
     * // Create many PatientResponders
     * const patientResponder = await prisma.patientResponder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many PatientResponders and only return the `patient_log_id`
     * const patientResponderWithPatient_log_idOnly = await prisma.patientResponder.createManyAndReturn({
     *   select: { patient_log_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PatientResponderCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PatientResponderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientResponderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a PatientResponder.
     * @param {PatientResponderDeleteArgs} args - Arguments to delete one PatientResponder.
     * @example
     * // Delete one PatientResponder
     * const PatientResponder = await prisma.patientResponder.delete({
     *   where: {
     *     // ... filter to delete one PatientResponder
     *   }
     * })
     *
     */
    delete<T extends PatientResponderDeleteArgs>(args: Prisma.SelectSubset<T, PatientResponderDeleteArgs<ExtArgs>>): Prisma.Prisma__PatientResponderClient<runtime.Types.Result.GetResult<Prisma.$PatientResponderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one PatientResponder.
     * @param {PatientResponderUpdateArgs} args - Arguments to update one PatientResponder.
     * @example
     * // Update one PatientResponder
     * const patientResponder = await prisma.patientResponder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PatientResponderUpdateArgs>(args: Prisma.SelectSubset<T, PatientResponderUpdateArgs<ExtArgs>>): Prisma.Prisma__PatientResponderClient<runtime.Types.Result.GetResult<Prisma.$PatientResponderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more PatientResponders.
     * @param {PatientResponderDeleteManyArgs} args - Arguments to filter PatientResponders to delete.
     * @example
     * // Delete a few PatientResponders
     * const { count } = await prisma.patientResponder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PatientResponderDeleteManyArgs>(args?: Prisma.SelectSubset<T, PatientResponderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PatientResponders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientResponderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PatientResponders
     * const patientResponder = await prisma.patientResponder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PatientResponderUpdateManyArgs>(args: Prisma.SelectSubset<T, PatientResponderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PatientResponders and returns the data updated in the database.
     * @param {PatientResponderUpdateManyAndReturnArgs} args - Arguments to update many PatientResponders.
     * @example
     * // Update many PatientResponders
     * const patientResponder = await prisma.patientResponder.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more PatientResponders and only return the `patient_log_id`
     * const patientResponderWithPatient_log_idOnly = await prisma.patientResponder.updateManyAndReturn({
     *   select: { patient_log_id: true },
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
    updateManyAndReturn<T extends PatientResponderUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PatientResponderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientResponderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one PatientResponder.
     * @param {PatientResponderUpsertArgs} args - Arguments to update or create a PatientResponder.
     * @example
     * // Update or create a PatientResponder
     * const patientResponder = await prisma.patientResponder.upsert({
     *   create: {
     *     // ... data to create a PatientResponder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PatientResponder we want to update
     *   }
     * })
     */
    upsert<T extends PatientResponderUpsertArgs>(args: Prisma.SelectSubset<T, PatientResponderUpsertArgs<ExtArgs>>): Prisma.Prisma__PatientResponderClient<runtime.Types.Result.GetResult<Prisma.$PatientResponderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of PatientResponders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientResponderCountArgs} args - Arguments to filter PatientResponders to count.
     * @example
     * // Count the number of PatientResponders
     * const count = await prisma.patientResponder.count({
     *   where: {
     *     // ... the filter for the PatientResponders we want to count
     *   }
     * })
    **/
    count<T extends PatientResponderCountArgs>(args?: Prisma.Subset<T, PatientResponderCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PatientResponderCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a PatientResponder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientResponderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PatientResponderAggregateArgs>(args: Prisma.Subset<T, PatientResponderAggregateArgs>): Prisma.PrismaPromise<GetPatientResponderAggregateType<T>>;
    /**
     * Group by PatientResponder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientResponderGroupByArgs} args - Group by arguments.
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
    groupBy<T extends PatientResponderGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PatientResponderGroupByArgs['orderBy'];
    } : {
        orderBy?: PatientResponderGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PatientResponderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientResponderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the PatientResponder model
     */
    readonly fields: PatientResponderFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for PatientResponder.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__PatientResponderClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    patientLog<T extends Prisma.PatientLogDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PatientLogDefaultArgs<ExtArgs>>): Prisma.Prisma__PatientLogClient<runtime.Types.Result.GetResult<Prisma.$PatientLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the PatientResponder model
 */
export interface PatientResponderFieldRefs {
    readonly patient_log_id: Prisma.FieldRef<"PatientResponder", 'String'>;
    readonly user_id: Prisma.FieldRef<"PatientResponder", 'String'>;
}
/**
 * PatientResponder findUnique
 */
export type PatientResponderFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PatientResponder to fetch.
     */
    where: Prisma.PatientResponderWhereUniqueInput;
};
/**
 * PatientResponder findUniqueOrThrow
 */
export type PatientResponderFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PatientResponder to fetch.
     */
    where: Prisma.PatientResponderWhereUniqueInput;
};
/**
 * PatientResponder findFirst
 */
export type PatientResponderFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PatientResponder to fetch.
     */
    where?: Prisma.PatientResponderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PatientResponders to fetch.
     */
    orderBy?: Prisma.PatientResponderOrderByWithRelationInput | Prisma.PatientResponderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PatientResponders.
     */
    cursor?: Prisma.PatientResponderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PatientResponders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PatientResponders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PatientResponders.
     */
    distinct?: Prisma.PatientResponderScalarFieldEnum | Prisma.PatientResponderScalarFieldEnum[];
};
/**
 * PatientResponder findFirstOrThrow
 */
export type PatientResponderFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PatientResponder to fetch.
     */
    where?: Prisma.PatientResponderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PatientResponders to fetch.
     */
    orderBy?: Prisma.PatientResponderOrderByWithRelationInput | Prisma.PatientResponderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PatientResponders.
     */
    cursor?: Prisma.PatientResponderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PatientResponders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PatientResponders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PatientResponders.
     */
    distinct?: Prisma.PatientResponderScalarFieldEnum | Prisma.PatientResponderScalarFieldEnum[];
};
/**
 * PatientResponder findMany
 */
export type PatientResponderFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PatientResponders to fetch.
     */
    where?: Prisma.PatientResponderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PatientResponders to fetch.
     */
    orderBy?: Prisma.PatientResponderOrderByWithRelationInput | Prisma.PatientResponderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing PatientResponders.
     */
    cursor?: Prisma.PatientResponderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PatientResponders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PatientResponders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PatientResponders.
     */
    distinct?: Prisma.PatientResponderScalarFieldEnum | Prisma.PatientResponderScalarFieldEnum[];
};
/**
 * PatientResponder create
 */
export type PatientResponderCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a PatientResponder.
     */
    data: Prisma.XOR<Prisma.PatientResponderCreateInput, Prisma.PatientResponderUncheckedCreateInput>;
};
/**
 * PatientResponder createMany
 */
export type PatientResponderCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many PatientResponders.
     */
    data: Prisma.PatientResponderCreateManyInput | Prisma.PatientResponderCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * PatientResponder createManyAndReturn
 */
export type PatientResponderCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientResponder
     */
    select?: Prisma.PatientResponderSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientResponder
     */
    omit?: Prisma.PatientResponderOmit<ExtArgs> | null;
    /**
     * The data used to create many PatientResponders.
     */
    data: Prisma.PatientResponderCreateManyInput | Prisma.PatientResponderCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientResponderIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * PatientResponder update
 */
export type PatientResponderUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a PatientResponder.
     */
    data: Prisma.XOR<Prisma.PatientResponderUpdateInput, Prisma.PatientResponderUncheckedUpdateInput>;
    /**
     * Choose, which PatientResponder to update.
     */
    where: Prisma.PatientResponderWhereUniqueInput;
};
/**
 * PatientResponder updateMany
 */
export type PatientResponderUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update PatientResponders.
     */
    data: Prisma.XOR<Prisma.PatientResponderUpdateManyMutationInput, Prisma.PatientResponderUncheckedUpdateManyInput>;
    /**
     * Filter which PatientResponders to update
     */
    where?: Prisma.PatientResponderWhereInput;
    /**
     * Limit how many PatientResponders to update.
     */
    limit?: number;
};
/**
 * PatientResponder updateManyAndReturn
 */
export type PatientResponderUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientResponder
     */
    select?: Prisma.PatientResponderSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientResponder
     */
    omit?: Prisma.PatientResponderOmit<ExtArgs> | null;
    /**
     * The data used to update PatientResponders.
     */
    data: Prisma.XOR<Prisma.PatientResponderUpdateManyMutationInput, Prisma.PatientResponderUncheckedUpdateManyInput>;
    /**
     * Filter which PatientResponders to update
     */
    where?: Prisma.PatientResponderWhereInput;
    /**
     * Limit how many PatientResponders to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientResponderIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * PatientResponder upsert
 */
export type PatientResponderUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the PatientResponder to update in case it exists.
     */
    where: Prisma.PatientResponderWhereUniqueInput;
    /**
     * In case the PatientResponder found by the `where` argument doesn't exist, create a new PatientResponder with this data.
     */
    create: Prisma.XOR<Prisma.PatientResponderCreateInput, Prisma.PatientResponderUncheckedCreateInput>;
    /**
     * In case the PatientResponder was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.PatientResponderUpdateInput, Prisma.PatientResponderUncheckedUpdateInput>;
};
/**
 * PatientResponder delete
 */
export type PatientResponderDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which PatientResponder to delete.
     */
    where: Prisma.PatientResponderWhereUniqueInput;
};
/**
 * PatientResponder deleteMany
 */
export type PatientResponderDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PatientResponders to delete
     */
    where?: Prisma.PatientResponderWhereInput;
    /**
     * Limit how many PatientResponders to delete.
     */
    limit?: number;
};
/**
 * PatientResponder without action
 */
export type PatientResponderDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=PatientResponder.d.ts.map