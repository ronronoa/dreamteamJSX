import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model PersonsInvolved
 *
 */
export type PersonsInvolvedModel = runtime.Types.Result.DefaultSelection<Prisma.$PersonsInvolvedPayload>;
export type AggregatePersonsInvolved = {
    _count: PersonsInvolvedCountAggregateOutputType | null;
    _avg: PersonsInvolvedAvgAggregateOutputType | null;
    _sum: PersonsInvolvedSumAggregateOutputType | null;
    _min: PersonsInvolvedMinAggregateOutputType | null;
    _max: PersonsInvolvedMaxAggregateOutputType | null;
};
export type PersonsInvolvedAvgAggregateOutputType = {
    age: number | null;
};
export type PersonsInvolvedSumAggregateOutputType = {
    age: number | null;
};
export type PersonsInvolvedMinAggregateOutputType = {
    person_id: string | null;
    operation_id: string | null;
    full_name: string | null;
    age: number | null;
    sex: $Enums.Gender | null;
    contact_no: string | null;
    address: string | null;
};
export type PersonsInvolvedMaxAggregateOutputType = {
    person_id: string | null;
    operation_id: string | null;
    full_name: string | null;
    age: number | null;
    sex: $Enums.Gender | null;
    contact_no: string | null;
    address: string | null;
};
export type PersonsInvolvedCountAggregateOutputType = {
    person_id: number;
    operation_id: number;
    full_name: number;
    age: number;
    sex: number;
    contact_no: number;
    address: number;
    _all: number;
};
export type PersonsInvolvedAvgAggregateInputType = {
    age?: true;
};
export type PersonsInvolvedSumAggregateInputType = {
    age?: true;
};
export type PersonsInvolvedMinAggregateInputType = {
    person_id?: true;
    operation_id?: true;
    full_name?: true;
    age?: true;
    sex?: true;
    contact_no?: true;
    address?: true;
};
export type PersonsInvolvedMaxAggregateInputType = {
    person_id?: true;
    operation_id?: true;
    full_name?: true;
    age?: true;
    sex?: true;
    contact_no?: true;
    address?: true;
};
export type PersonsInvolvedCountAggregateInputType = {
    person_id?: true;
    operation_id?: true;
    full_name?: true;
    age?: true;
    sex?: true;
    contact_no?: true;
    address?: true;
    _all?: true;
};
export type PersonsInvolvedAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PersonsInvolved to aggregate.
     */
    where?: Prisma.PersonsInvolvedWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PersonsInvolveds to fetch.
     */
    orderBy?: Prisma.PersonsInvolvedOrderByWithRelationInput | Prisma.PersonsInvolvedOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.PersonsInvolvedWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PersonsInvolveds from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PersonsInvolveds.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned PersonsInvolveds
    **/
    _count?: true | PersonsInvolvedCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: PersonsInvolvedAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: PersonsInvolvedSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: PersonsInvolvedMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: PersonsInvolvedMaxAggregateInputType;
};
export type GetPersonsInvolvedAggregateType<T extends PersonsInvolvedAggregateArgs> = {
    [P in keyof T & keyof AggregatePersonsInvolved]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePersonsInvolved[P]> : Prisma.GetScalarType<T[P], AggregatePersonsInvolved[P]>;
};
export type PersonsInvolvedGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PersonsInvolvedWhereInput;
    orderBy?: Prisma.PersonsInvolvedOrderByWithAggregationInput | Prisma.PersonsInvolvedOrderByWithAggregationInput[];
    by: Prisma.PersonsInvolvedScalarFieldEnum[] | Prisma.PersonsInvolvedScalarFieldEnum;
    having?: Prisma.PersonsInvolvedScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PersonsInvolvedCountAggregateInputType | true;
    _avg?: PersonsInvolvedAvgAggregateInputType;
    _sum?: PersonsInvolvedSumAggregateInputType;
    _min?: PersonsInvolvedMinAggregateInputType;
    _max?: PersonsInvolvedMaxAggregateInputType;
};
export type PersonsInvolvedGroupByOutputType = {
    person_id: string;
    operation_id: string;
    full_name: string;
    age: number;
    sex: $Enums.Gender;
    contact_no: string | null;
    address: string | null;
    _count: PersonsInvolvedCountAggregateOutputType | null;
    _avg: PersonsInvolvedAvgAggregateOutputType | null;
    _sum: PersonsInvolvedSumAggregateOutputType | null;
    _min: PersonsInvolvedMinAggregateOutputType | null;
    _max: PersonsInvolvedMaxAggregateOutputType | null;
};
export type GetPersonsInvolvedGroupByPayload<T extends PersonsInvolvedGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PersonsInvolvedGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PersonsInvolvedGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PersonsInvolvedGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PersonsInvolvedGroupByOutputType[P]>;
}>>;
export type PersonsInvolvedWhereInput = {
    AND?: Prisma.PersonsInvolvedWhereInput | Prisma.PersonsInvolvedWhereInput[];
    OR?: Prisma.PersonsInvolvedWhereInput[];
    NOT?: Prisma.PersonsInvolvedWhereInput | Prisma.PersonsInvolvedWhereInput[];
    person_id?: Prisma.StringFilter<"PersonsInvolved"> | string;
    operation_id?: Prisma.StringFilter<"PersonsInvolved"> | string;
    full_name?: Prisma.StringFilter<"PersonsInvolved"> | string;
    age?: Prisma.IntFilter<"PersonsInvolved"> | number;
    sex?: Prisma.EnumGenderFilter<"PersonsInvolved"> | $Enums.Gender;
    contact_no?: Prisma.StringNullableFilter<"PersonsInvolved"> | string | null;
    address?: Prisma.StringNullableFilter<"PersonsInvolved"> | string | null;
    operation?: Prisma.XOR<Prisma.OperationLogScalarRelationFilter, Prisma.OperationLogWhereInput>;
};
export type PersonsInvolvedOrderByWithRelationInput = {
    person_id?: Prisma.SortOrder;
    operation_id?: Prisma.SortOrder;
    full_name?: Prisma.SortOrder;
    age?: Prisma.SortOrder;
    sex?: Prisma.SortOrder;
    contact_no?: Prisma.SortOrderInput | Prisma.SortOrder;
    address?: Prisma.SortOrderInput | Prisma.SortOrder;
    operation?: Prisma.OperationLogOrderByWithRelationInput;
};
export type PersonsInvolvedWhereUniqueInput = Prisma.AtLeast<{
    person_id?: string;
    AND?: Prisma.PersonsInvolvedWhereInput | Prisma.PersonsInvolvedWhereInput[];
    OR?: Prisma.PersonsInvolvedWhereInput[];
    NOT?: Prisma.PersonsInvolvedWhereInput | Prisma.PersonsInvolvedWhereInput[];
    operation_id?: Prisma.StringFilter<"PersonsInvolved"> | string;
    full_name?: Prisma.StringFilter<"PersonsInvolved"> | string;
    age?: Prisma.IntFilter<"PersonsInvolved"> | number;
    sex?: Prisma.EnumGenderFilter<"PersonsInvolved"> | $Enums.Gender;
    contact_no?: Prisma.StringNullableFilter<"PersonsInvolved"> | string | null;
    address?: Prisma.StringNullableFilter<"PersonsInvolved"> | string | null;
    operation?: Prisma.XOR<Prisma.OperationLogScalarRelationFilter, Prisma.OperationLogWhereInput>;
}, "person_id">;
export type PersonsInvolvedOrderByWithAggregationInput = {
    person_id?: Prisma.SortOrder;
    operation_id?: Prisma.SortOrder;
    full_name?: Prisma.SortOrder;
    age?: Prisma.SortOrder;
    sex?: Prisma.SortOrder;
    contact_no?: Prisma.SortOrderInput | Prisma.SortOrder;
    address?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.PersonsInvolvedCountOrderByAggregateInput;
    _avg?: Prisma.PersonsInvolvedAvgOrderByAggregateInput;
    _max?: Prisma.PersonsInvolvedMaxOrderByAggregateInput;
    _min?: Prisma.PersonsInvolvedMinOrderByAggregateInput;
    _sum?: Prisma.PersonsInvolvedSumOrderByAggregateInput;
};
export type PersonsInvolvedScalarWhereWithAggregatesInput = {
    AND?: Prisma.PersonsInvolvedScalarWhereWithAggregatesInput | Prisma.PersonsInvolvedScalarWhereWithAggregatesInput[];
    OR?: Prisma.PersonsInvolvedScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PersonsInvolvedScalarWhereWithAggregatesInput | Prisma.PersonsInvolvedScalarWhereWithAggregatesInput[];
    person_id?: Prisma.StringWithAggregatesFilter<"PersonsInvolved"> | string;
    operation_id?: Prisma.StringWithAggregatesFilter<"PersonsInvolved"> | string;
    full_name?: Prisma.StringWithAggregatesFilter<"PersonsInvolved"> | string;
    age?: Prisma.IntWithAggregatesFilter<"PersonsInvolved"> | number;
    sex?: Prisma.EnumGenderWithAggregatesFilter<"PersonsInvolved"> | $Enums.Gender;
    contact_no?: Prisma.StringNullableWithAggregatesFilter<"PersonsInvolved"> | string | null;
    address?: Prisma.StringNullableWithAggregatesFilter<"PersonsInvolved"> | string | null;
};
export type PersonsInvolvedCreateInput = {
    person_id?: string;
    full_name: string;
    age: number;
    sex: $Enums.Gender;
    contact_no?: string | null;
    address?: string | null;
    operation: Prisma.OperationLogCreateNestedOneWithoutPersonsInvolvedInput;
};
export type PersonsInvolvedUncheckedCreateInput = {
    person_id?: string;
    operation_id: string;
    full_name: string;
    age: number;
    sex: $Enums.Gender;
    contact_no?: string | null;
    address?: string | null;
};
export type PersonsInvolvedUpdateInput = {
    person_id?: Prisma.StringFieldUpdateOperationsInput | string;
    full_name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    sex?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    contact_no?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operation?: Prisma.OperationLogUpdateOneRequiredWithoutPersonsInvolvedNestedInput;
};
export type PersonsInvolvedUncheckedUpdateInput = {
    person_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    full_name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    sex?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    contact_no?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PersonsInvolvedCreateManyInput = {
    person_id?: string;
    operation_id: string;
    full_name: string;
    age: number;
    sex: $Enums.Gender;
    contact_no?: string | null;
    address?: string | null;
};
export type PersonsInvolvedUpdateManyMutationInput = {
    person_id?: Prisma.StringFieldUpdateOperationsInput | string;
    full_name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    sex?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    contact_no?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PersonsInvolvedUncheckedUpdateManyInput = {
    person_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    full_name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    sex?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    contact_no?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PersonsInvolvedListRelationFilter = {
    every?: Prisma.PersonsInvolvedWhereInput;
    some?: Prisma.PersonsInvolvedWhereInput;
    none?: Prisma.PersonsInvolvedWhereInput;
};
export type PersonsInvolvedOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PersonsInvolvedCountOrderByAggregateInput = {
    person_id?: Prisma.SortOrder;
    operation_id?: Prisma.SortOrder;
    full_name?: Prisma.SortOrder;
    age?: Prisma.SortOrder;
    sex?: Prisma.SortOrder;
    contact_no?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
};
export type PersonsInvolvedAvgOrderByAggregateInput = {
    age?: Prisma.SortOrder;
};
export type PersonsInvolvedMaxOrderByAggregateInput = {
    person_id?: Prisma.SortOrder;
    operation_id?: Prisma.SortOrder;
    full_name?: Prisma.SortOrder;
    age?: Prisma.SortOrder;
    sex?: Prisma.SortOrder;
    contact_no?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
};
export type PersonsInvolvedMinOrderByAggregateInput = {
    person_id?: Prisma.SortOrder;
    operation_id?: Prisma.SortOrder;
    full_name?: Prisma.SortOrder;
    age?: Prisma.SortOrder;
    sex?: Prisma.SortOrder;
    contact_no?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
};
export type PersonsInvolvedSumOrderByAggregateInput = {
    age?: Prisma.SortOrder;
};
export type PersonsInvolvedCreateNestedManyWithoutOperationInput = {
    create?: Prisma.XOR<Prisma.PersonsInvolvedCreateWithoutOperationInput, Prisma.PersonsInvolvedUncheckedCreateWithoutOperationInput> | Prisma.PersonsInvolvedCreateWithoutOperationInput[] | Prisma.PersonsInvolvedUncheckedCreateWithoutOperationInput[];
    connectOrCreate?: Prisma.PersonsInvolvedCreateOrConnectWithoutOperationInput | Prisma.PersonsInvolvedCreateOrConnectWithoutOperationInput[];
    createMany?: Prisma.PersonsInvolvedCreateManyOperationInputEnvelope;
    connect?: Prisma.PersonsInvolvedWhereUniqueInput | Prisma.PersonsInvolvedWhereUniqueInput[];
};
export type PersonsInvolvedUncheckedCreateNestedManyWithoutOperationInput = {
    create?: Prisma.XOR<Prisma.PersonsInvolvedCreateWithoutOperationInput, Prisma.PersonsInvolvedUncheckedCreateWithoutOperationInput> | Prisma.PersonsInvolvedCreateWithoutOperationInput[] | Prisma.PersonsInvolvedUncheckedCreateWithoutOperationInput[];
    connectOrCreate?: Prisma.PersonsInvolvedCreateOrConnectWithoutOperationInput | Prisma.PersonsInvolvedCreateOrConnectWithoutOperationInput[];
    createMany?: Prisma.PersonsInvolvedCreateManyOperationInputEnvelope;
    connect?: Prisma.PersonsInvolvedWhereUniqueInput | Prisma.PersonsInvolvedWhereUniqueInput[];
};
export type PersonsInvolvedUpdateManyWithoutOperationNestedInput = {
    create?: Prisma.XOR<Prisma.PersonsInvolvedCreateWithoutOperationInput, Prisma.PersonsInvolvedUncheckedCreateWithoutOperationInput> | Prisma.PersonsInvolvedCreateWithoutOperationInput[] | Prisma.PersonsInvolvedUncheckedCreateWithoutOperationInput[];
    connectOrCreate?: Prisma.PersonsInvolvedCreateOrConnectWithoutOperationInput | Prisma.PersonsInvolvedCreateOrConnectWithoutOperationInput[];
    upsert?: Prisma.PersonsInvolvedUpsertWithWhereUniqueWithoutOperationInput | Prisma.PersonsInvolvedUpsertWithWhereUniqueWithoutOperationInput[];
    createMany?: Prisma.PersonsInvolvedCreateManyOperationInputEnvelope;
    set?: Prisma.PersonsInvolvedWhereUniqueInput | Prisma.PersonsInvolvedWhereUniqueInput[];
    disconnect?: Prisma.PersonsInvolvedWhereUniqueInput | Prisma.PersonsInvolvedWhereUniqueInput[];
    delete?: Prisma.PersonsInvolvedWhereUniqueInput | Prisma.PersonsInvolvedWhereUniqueInput[];
    connect?: Prisma.PersonsInvolvedWhereUniqueInput | Prisma.PersonsInvolvedWhereUniqueInput[];
    update?: Prisma.PersonsInvolvedUpdateWithWhereUniqueWithoutOperationInput | Prisma.PersonsInvolvedUpdateWithWhereUniqueWithoutOperationInput[];
    updateMany?: Prisma.PersonsInvolvedUpdateManyWithWhereWithoutOperationInput | Prisma.PersonsInvolvedUpdateManyWithWhereWithoutOperationInput[];
    deleteMany?: Prisma.PersonsInvolvedScalarWhereInput | Prisma.PersonsInvolvedScalarWhereInput[];
};
export type PersonsInvolvedUncheckedUpdateManyWithoutOperationNestedInput = {
    create?: Prisma.XOR<Prisma.PersonsInvolvedCreateWithoutOperationInput, Prisma.PersonsInvolvedUncheckedCreateWithoutOperationInput> | Prisma.PersonsInvolvedCreateWithoutOperationInput[] | Prisma.PersonsInvolvedUncheckedCreateWithoutOperationInput[];
    connectOrCreate?: Prisma.PersonsInvolvedCreateOrConnectWithoutOperationInput | Prisma.PersonsInvolvedCreateOrConnectWithoutOperationInput[];
    upsert?: Prisma.PersonsInvolvedUpsertWithWhereUniqueWithoutOperationInput | Prisma.PersonsInvolvedUpsertWithWhereUniqueWithoutOperationInput[];
    createMany?: Prisma.PersonsInvolvedCreateManyOperationInputEnvelope;
    set?: Prisma.PersonsInvolvedWhereUniqueInput | Prisma.PersonsInvolvedWhereUniqueInput[];
    disconnect?: Prisma.PersonsInvolvedWhereUniqueInput | Prisma.PersonsInvolvedWhereUniqueInput[];
    delete?: Prisma.PersonsInvolvedWhereUniqueInput | Prisma.PersonsInvolvedWhereUniqueInput[];
    connect?: Prisma.PersonsInvolvedWhereUniqueInput | Prisma.PersonsInvolvedWhereUniqueInput[];
    update?: Prisma.PersonsInvolvedUpdateWithWhereUniqueWithoutOperationInput | Prisma.PersonsInvolvedUpdateWithWhereUniqueWithoutOperationInput[];
    updateMany?: Prisma.PersonsInvolvedUpdateManyWithWhereWithoutOperationInput | Prisma.PersonsInvolvedUpdateManyWithWhereWithoutOperationInput[];
    deleteMany?: Prisma.PersonsInvolvedScalarWhereInput | Prisma.PersonsInvolvedScalarWhereInput[];
};
export type EnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender;
};
export type PersonsInvolvedCreateWithoutOperationInput = {
    person_id?: string;
    full_name: string;
    age: number;
    sex: $Enums.Gender;
    contact_no?: string | null;
    address?: string | null;
};
export type PersonsInvolvedUncheckedCreateWithoutOperationInput = {
    person_id?: string;
    full_name: string;
    age: number;
    sex: $Enums.Gender;
    contact_no?: string | null;
    address?: string | null;
};
export type PersonsInvolvedCreateOrConnectWithoutOperationInput = {
    where: Prisma.PersonsInvolvedWhereUniqueInput;
    create: Prisma.XOR<Prisma.PersonsInvolvedCreateWithoutOperationInput, Prisma.PersonsInvolvedUncheckedCreateWithoutOperationInput>;
};
export type PersonsInvolvedCreateManyOperationInputEnvelope = {
    data: Prisma.PersonsInvolvedCreateManyOperationInput | Prisma.PersonsInvolvedCreateManyOperationInput[];
    skipDuplicates?: boolean;
};
export type PersonsInvolvedUpsertWithWhereUniqueWithoutOperationInput = {
    where: Prisma.PersonsInvolvedWhereUniqueInput;
    update: Prisma.XOR<Prisma.PersonsInvolvedUpdateWithoutOperationInput, Prisma.PersonsInvolvedUncheckedUpdateWithoutOperationInput>;
    create: Prisma.XOR<Prisma.PersonsInvolvedCreateWithoutOperationInput, Prisma.PersonsInvolvedUncheckedCreateWithoutOperationInput>;
};
export type PersonsInvolvedUpdateWithWhereUniqueWithoutOperationInput = {
    where: Prisma.PersonsInvolvedWhereUniqueInput;
    data: Prisma.XOR<Prisma.PersonsInvolvedUpdateWithoutOperationInput, Prisma.PersonsInvolvedUncheckedUpdateWithoutOperationInput>;
};
export type PersonsInvolvedUpdateManyWithWhereWithoutOperationInput = {
    where: Prisma.PersonsInvolvedScalarWhereInput;
    data: Prisma.XOR<Prisma.PersonsInvolvedUpdateManyMutationInput, Prisma.PersonsInvolvedUncheckedUpdateManyWithoutOperationInput>;
};
export type PersonsInvolvedScalarWhereInput = {
    AND?: Prisma.PersonsInvolvedScalarWhereInput | Prisma.PersonsInvolvedScalarWhereInput[];
    OR?: Prisma.PersonsInvolvedScalarWhereInput[];
    NOT?: Prisma.PersonsInvolvedScalarWhereInput | Prisma.PersonsInvolvedScalarWhereInput[];
    person_id?: Prisma.StringFilter<"PersonsInvolved"> | string;
    operation_id?: Prisma.StringFilter<"PersonsInvolved"> | string;
    full_name?: Prisma.StringFilter<"PersonsInvolved"> | string;
    age?: Prisma.IntFilter<"PersonsInvolved"> | number;
    sex?: Prisma.EnumGenderFilter<"PersonsInvolved"> | $Enums.Gender;
    contact_no?: Prisma.StringNullableFilter<"PersonsInvolved"> | string | null;
    address?: Prisma.StringNullableFilter<"PersonsInvolved"> | string | null;
};
export type PersonsInvolvedCreateManyOperationInput = {
    person_id?: string;
    full_name: string;
    age: number;
    sex: $Enums.Gender;
    contact_no?: string | null;
    address?: string | null;
};
export type PersonsInvolvedUpdateWithoutOperationInput = {
    person_id?: Prisma.StringFieldUpdateOperationsInput | string;
    full_name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    sex?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    contact_no?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PersonsInvolvedUncheckedUpdateWithoutOperationInput = {
    person_id?: Prisma.StringFieldUpdateOperationsInput | string;
    full_name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    sex?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    contact_no?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PersonsInvolvedUncheckedUpdateManyWithoutOperationInput = {
    person_id?: Prisma.StringFieldUpdateOperationsInput | string;
    full_name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    sex?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    contact_no?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PersonsInvolvedSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    person_id?: boolean;
    operation_id?: boolean;
    full_name?: boolean;
    age?: boolean;
    sex?: boolean;
    contact_no?: boolean;
    address?: boolean;
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["personsInvolved"]>;
export type PersonsInvolvedSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    person_id?: boolean;
    operation_id?: boolean;
    full_name?: boolean;
    age?: boolean;
    sex?: boolean;
    contact_no?: boolean;
    address?: boolean;
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["personsInvolved"]>;
export type PersonsInvolvedSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    person_id?: boolean;
    operation_id?: boolean;
    full_name?: boolean;
    age?: boolean;
    sex?: boolean;
    contact_no?: boolean;
    address?: boolean;
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["personsInvolved"]>;
export type PersonsInvolvedSelectScalar = {
    person_id?: boolean;
    operation_id?: boolean;
    full_name?: boolean;
    age?: boolean;
    sex?: boolean;
    contact_no?: boolean;
    address?: boolean;
};
export type PersonsInvolvedOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"person_id" | "operation_id" | "full_name" | "age" | "sex" | "contact_no" | "address", ExtArgs["result"]["personsInvolved"]>;
export type PersonsInvolvedInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
};
export type PersonsInvolvedIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
};
export type PersonsInvolvedIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
};
export type $PersonsInvolvedPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PersonsInvolved";
    objects: {
        operation: Prisma.$OperationLogPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        person_id: string;
        operation_id: string;
        full_name: string;
        age: number;
        sex: $Enums.Gender;
        contact_no: string | null;
        address: string | null;
    }, ExtArgs["result"]["personsInvolved"]>;
    composites: {};
};
export type PersonsInvolvedGetPayload<S extends boolean | null | undefined | PersonsInvolvedDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PersonsInvolvedPayload, S>;
export type PersonsInvolvedCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PersonsInvolvedFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PersonsInvolvedCountAggregateInputType | true;
};
export interface PersonsInvolvedDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PersonsInvolved'];
        meta: {
            name: 'PersonsInvolved';
        };
    };
    /**
     * Find zero or one PersonsInvolved that matches the filter.
     * @param {PersonsInvolvedFindUniqueArgs} args - Arguments to find a PersonsInvolved
     * @example
     * // Get one PersonsInvolved
     * const personsInvolved = await prisma.personsInvolved.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PersonsInvolvedFindUniqueArgs>(args: Prisma.SelectSubset<T, PersonsInvolvedFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PersonsInvolvedClient<runtime.Types.Result.GetResult<Prisma.$PersonsInvolvedPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one PersonsInvolved that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PersonsInvolvedFindUniqueOrThrowArgs} args - Arguments to find a PersonsInvolved
     * @example
     * // Get one PersonsInvolved
     * const personsInvolved = await prisma.personsInvolved.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PersonsInvolvedFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PersonsInvolvedFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PersonsInvolvedClient<runtime.Types.Result.GetResult<Prisma.$PersonsInvolvedPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PersonsInvolved that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonsInvolvedFindFirstArgs} args - Arguments to find a PersonsInvolved
     * @example
     * // Get one PersonsInvolved
     * const personsInvolved = await prisma.personsInvolved.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PersonsInvolvedFindFirstArgs>(args?: Prisma.SelectSubset<T, PersonsInvolvedFindFirstArgs<ExtArgs>>): Prisma.Prisma__PersonsInvolvedClient<runtime.Types.Result.GetResult<Prisma.$PersonsInvolvedPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PersonsInvolved that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonsInvolvedFindFirstOrThrowArgs} args - Arguments to find a PersonsInvolved
     * @example
     * // Get one PersonsInvolved
     * const personsInvolved = await prisma.personsInvolved.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PersonsInvolvedFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PersonsInvolvedFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PersonsInvolvedClient<runtime.Types.Result.GetResult<Prisma.$PersonsInvolvedPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more PersonsInvolveds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonsInvolvedFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PersonsInvolveds
     * const personsInvolveds = await prisma.personsInvolved.findMany()
     *
     * // Get first 10 PersonsInvolveds
     * const personsInvolveds = await prisma.personsInvolved.findMany({ take: 10 })
     *
     * // Only select the `person_id`
     * const personsInvolvedWithPerson_idOnly = await prisma.personsInvolved.findMany({ select: { person_id: true } })
     *
     */
    findMany<T extends PersonsInvolvedFindManyArgs>(args?: Prisma.SelectSubset<T, PersonsInvolvedFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PersonsInvolvedPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a PersonsInvolved.
     * @param {PersonsInvolvedCreateArgs} args - Arguments to create a PersonsInvolved.
     * @example
     * // Create one PersonsInvolved
     * const PersonsInvolved = await prisma.personsInvolved.create({
     *   data: {
     *     // ... data to create a PersonsInvolved
     *   }
     * })
     *
     */
    create<T extends PersonsInvolvedCreateArgs>(args: Prisma.SelectSubset<T, PersonsInvolvedCreateArgs<ExtArgs>>): Prisma.Prisma__PersonsInvolvedClient<runtime.Types.Result.GetResult<Prisma.$PersonsInvolvedPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many PersonsInvolveds.
     * @param {PersonsInvolvedCreateManyArgs} args - Arguments to create many PersonsInvolveds.
     * @example
     * // Create many PersonsInvolveds
     * const personsInvolved = await prisma.personsInvolved.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PersonsInvolvedCreateManyArgs>(args?: Prisma.SelectSubset<T, PersonsInvolvedCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many PersonsInvolveds and returns the data saved in the database.
     * @param {PersonsInvolvedCreateManyAndReturnArgs} args - Arguments to create many PersonsInvolveds.
     * @example
     * // Create many PersonsInvolveds
     * const personsInvolved = await prisma.personsInvolved.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many PersonsInvolveds and only return the `person_id`
     * const personsInvolvedWithPerson_idOnly = await prisma.personsInvolved.createManyAndReturn({
     *   select: { person_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PersonsInvolvedCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PersonsInvolvedCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PersonsInvolvedPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a PersonsInvolved.
     * @param {PersonsInvolvedDeleteArgs} args - Arguments to delete one PersonsInvolved.
     * @example
     * // Delete one PersonsInvolved
     * const PersonsInvolved = await prisma.personsInvolved.delete({
     *   where: {
     *     // ... filter to delete one PersonsInvolved
     *   }
     * })
     *
     */
    delete<T extends PersonsInvolvedDeleteArgs>(args: Prisma.SelectSubset<T, PersonsInvolvedDeleteArgs<ExtArgs>>): Prisma.Prisma__PersonsInvolvedClient<runtime.Types.Result.GetResult<Prisma.$PersonsInvolvedPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one PersonsInvolved.
     * @param {PersonsInvolvedUpdateArgs} args - Arguments to update one PersonsInvolved.
     * @example
     * // Update one PersonsInvolved
     * const personsInvolved = await prisma.personsInvolved.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PersonsInvolvedUpdateArgs>(args: Prisma.SelectSubset<T, PersonsInvolvedUpdateArgs<ExtArgs>>): Prisma.Prisma__PersonsInvolvedClient<runtime.Types.Result.GetResult<Prisma.$PersonsInvolvedPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more PersonsInvolveds.
     * @param {PersonsInvolvedDeleteManyArgs} args - Arguments to filter PersonsInvolveds to delete.
     * @example
     * // Delete a few PersonsInvolveds
     * const { count } = await prisma.personsInvolved.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PersonsInvolvedDeleteManyArgs>(args?: Prisma.SelectSubset<T, PersonsInvolvedDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PersonsInvolveds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonsInvolvedUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PersonsInvolveds
     * const personsInvolved = await prisma.personsInvolved.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PersonsInvolvedUpdateManyArgs>(args: Prisma.SelectSubset<T, PersonsInvolvedUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PersonsInvolveds and returns the data updated in the database.
     * @param {PersonsInvolvedUpdateManyAndReturnArgs} args - Arguments to update many PersonsInvolveds.
     * @example
     * // Update many PersonsInvolveds
     * const personsInvolved = await prisma.personsInvolved.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more PersonsInvolveds and only return the `person_id`
     * const personsInvolvedWithPerson_idOnly = await prisma.personsInvolved.updateManyAndReturn({
     *   select: { person_id: true },
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
    updateManyAndReturn<T extends PersonsInvolvedUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PersonsInvolvedUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PersonsInvolvedPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one PersonsInvolved.
     * @param {PersonsInvolvedUpsertArgs} args - Arguments to update or create a PersonsInvolved.
     * @example
     * // Update or create a PersonsInvolved
     * const personsInvolved = await prisma.personsInvolved.upsert({
     *   create: {
     *     // ... data to create a PersonsInvolved
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PersonsInvolved we want to update
     *   }
     * })
     */
    upsert<T extends PersonsInvolvedUpsertArgs>(args: Prisma.SelectSubset<T, PersonsInvolvedUpsertArgs<ExtArgs>>): Prisma.Prisma__PersonsInvolvedClient<runtime.Types.Result.GetResult<Prisma.$PersonsInvolvedPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of PersonsInvolveds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonsInvolvedCountArgs} args - Arguments to filter PersonsInvolveds to count.
     * @example
     * // Count the number of PersonsInvolveds
     * const count = await prisma.personsInvolved.count({
     *   where: {
     *     // ... the filter for the PersonsInvolveds we want to count
     *   }
     * })
    **/
    count<T extends PersonsInvolvedCountArgs>(args?: Prisma.Subset<T, PersonsInvolvedCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PersonsInvolvedCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a PersonsInvolved.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonsInvolvedAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PersonsInvolvedAggregateArgs>(args: Prisma.Subset<T, PersonsInvolvedAggregateArgs>): Prisma.PrismaPromise<GetPersonsInvolvedAggregateType<T>>;
    /**
     * Group by PersonsInvolved.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonsInvolvedGroupByArgs} args - Group by arguments.
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
    groupBy<T extends PersonsInvolvedGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PersonsInvolvedGroupByArgs['orderBy'];
    } : {
        orderBy?: PersonsInvolvedGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PersonsInvolvedGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPersonsInvolvedGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the PersonsInvolved model
     */
    readonly fields: PersonsInvolvedFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for PersonsInvolved.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__PersonsInvolvedClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    operation<T extends Prisma.OperationLogDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OperationLogDefaultArgs<ExtArgs>>): Prisma.Prisma__OperationLogClient<runtime.Types.Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the PersonsInvolved model
 */
export interface PersonsInvolvedFieldRefs {
    readonly person_id: Prisma.FieldRef<"PersonsInvolved", 'String'>;
    readonly operation_id: Prisma.FieldRef<"PersonsInvolved", 'String'>;
    readonly full_name: Prisma.FieldRef<"PersonsInvolved", 'String'>;
    readonly age: Prisma.FieldRef<"PersonsInvolved", 'Int'>;
    readonly sex: Prisma.FieldRef<"PersonsInvolved", 'Gender'>;
    readonly contact_no: Prisma.FieldRef<"PersonsInvolved", 'String'>;
    readonly address: Prisma.FieldRef<"PersonsInvolved", 'String'>;
}
/**
 * PersonsInvolved findUnique
 */
export type PersonsInvolvedFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PersonsInvolved to fetch.
     */
    where: Prisma.PersonsInvolvedWhereUniqueInput;
};
/**
 * PersonsInvolved findUniqueOrThrow
 */
export type PersonsInvolvedFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PersonsInvolved to fetch.
     */
    where: Prisma.PersonsInvolvedWhereUniqueInput;
};
/**
 * PersonsInvolved findFirst
 */
export type PersonsInvolvedFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PersonsInvolved to fetch.
     */
    where?: Prisma.PersonsInvolvedWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PersonsInvolveds to fetch.
     */
    orderBy?: Prisma.PersonsInvolvedOrderByWithRelationInput | Prisma.PersonsInvolvedOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PersonsInvolveds.
     */
    cursor?: Prisma.PersonsInvolvedWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PersonsInvolveds from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PersonsInvolveds.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PersonsInvolveds.
     */
    distinct?: Prisma.PersonsInvolvedScalarFieldEnum | Prisma.PersonsInvolvedScalarFieldEnum[];
};
/**
 * PersonsInvolved findFirstOrThrow
 */
export type PersonsInvolvedFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PersonsInvolved to fetch.
     */
    where?: Prisma.PersonsInvolvedWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PersonsInvolveds to fetch.
     */
    orderBy?: Prisma.PersonsInvolvedOrderByWithRelationInput | Prisma.PersonsInvolvedOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PersonsInvolveds.
     */
    cursor?: Prisma.PersonsInvolvedWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PersonsInvolveds from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PersonsInvolveds.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PersonsInvolveds.
     */
    distinct?: Prisma.PersonsInvolvedScalarFieldEnum | Prisma.PersonsInvolvedScalarFieldEnum[];
};
/**
 * PersonsInvolved findMany
 */
export type PersonsInvolvedFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PersonsInvolveds to fetch.
     */
    where?: Prisma.PersonsInvolvedWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PersonsInvolveds to fetch.
     */
    orderBy?: Prisma.PersonsInvolvedOrderByWithRelationInput | Prisma.PersonsInvolvedOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing PersonsInvolveds.
     */
    cursor?: Prisma.PersonsInvolvedWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PersonsInvolveds from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PersonsInvolveds.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PersonsInvolveds.
     */
    distinct?: Prisma.PersonsInvolvedScalarFieldEnum | Prisma.PersonsInvolvedScalarFieldEnum[];
};
/**
 * PersonsInvolved create
 */
export type PersonsInvolvedCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a PersonsInvolved.
     */
    data: Prisma.XOR<Prisma.PersonsInvolvedCreateInput, Prisma.PersonsInvolvedUncheckedCreateInput>;
};
/**
 * PersonsInvolved createMany
 */
export type PersonsInvolvedCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many PersonsInvolveds.
     */
    data: Prisma.PersonsInvolvedCreateManyInput | Prisma.PersonsInvolvedCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * PersonsInvolved createManyAndReturn
 */
export type PersonsInvolvedCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonsInvolved
     */
    select?: Prisma.PersonsInvolvedSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PersonsInvolved
     */
    omit?: Prisma.PersonsInvolvedOmit<ExtArgs> | null;
    /**
     * The data used to create many PersonsInvolveds.
     */
    data: Prisma.PersonsInvolvedCreateManyInput | Prisma.PersonsInvolvedCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PersonsInvolvedIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * PersonsInvolved update
 */
export type PersonsInvolvedUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a PersonsInvolved.
     */
    data: Prisma.XOR<Prisma.PersonsInvolvedUpdateInput, Prisma.PersonsInvolvedUncheckedUpdateInput>;
    /**
     * Choose, which PersonsInvolved to update.
     */
    where: Prisma.PersonsInvolvedWhereUniqueInput;
};
/**
 * PersonsInvolved updateMany
 */
export type PersonsInvolvedUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update PersonsInvolveds.
     */
    data: Prisma.XOR<Prisma.PersonsInvolvedUpdateManyMutationInput, Prisma.PersonsInvolvedUncheckedUpdateManyInput>;
    /**
     * Filter which PersonsInvolveds to update
     */
    where?: Prisma.PersonsInvolvedWhereInput;
    /**
     * Limit how many PersonsInvolveds to update.
     */
    limit?: number;
};
/**
 * PersonsInvolved updateManyAndReturn
 */
export type PersonsInvolvedUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonsInvolved
     */
    select?: Prisma.PersonsInvolvedSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PersonsInvolved
     */
    omit?: Prisma.PersonsInvolvedOmit<ExtArgs> | null;
    /**
     * The data used to update PersonsInvolveds.
     */
    data: Prisma.XOR<Prisma.PersonsInvolvedUpdateManyMutationInput, Prisma.PersonsInvolvedUncheckedUpdateManyInput>;
    /**
     * Filter which PersonsInvolveds to update
     */
    where?: Prisma.PersonsInvolvedWhereInput;
    /**
     * Limit how many PersonsInvolveds to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PersonsInvolvedIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * PersonsInvolved upsert
 */
export type PersonsInvolvedUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the PersonsInvolved to update in case it exists.
     */
    where: Prisma.PersonsInvolvedWhereUniqueInput;
    /**
     * In case the PersonsInvolved found by the `where` argument doesn't exist, create a new PersonsInvolved with this data.
     */
    create: Prisma.XOR<Prisma.PersonsInvolvedCreateInput, Prisma.PersonsInvolvedUncheckedCreateInput>;
    /**
     * In case the PersonsInvolved was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.PersonsInvolvedUpdateInput, Prisma.PersonsInvolvedUncheckedUpdateInput>;
};
/**
 * PersonsInvolved delete
 */
export type PersonsInvolvedDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which PersonsInvolved to delete.
     */
    where: Prisma.PersonsInvolvedWhereUniqueInput;
};
/**
 * PersonsInvolved deleteMany
 */
export type PersonsInvolvedDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PersonsInvolveds to delete
     */
    where?: Prisma.PersonsInvolvedWhereInput;
    /**
     * Limit how many PersonsInvolveds to delete.
     */
    limit?: number;
};
/**
 * PersonsInvolved without action
 */
export type PersonsInvolvedDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=PersonsInvolved.d.ts.map