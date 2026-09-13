import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model CivilianPassenger
 *
 */
export type CivilianPassengerModel = runtime.Types.Result.DefaultSelection<Prisma.$CivilianPassengerPayload>;
export type AggregateCivilianPassenger = {
    _count: CivilianPassengerCountAggregateOutputType | null;
    _avg: CivilianPassengerAvgAggregateOutputType | null;
    _sum: CivilianPassengerSumAggregateOutputType | null;
    _min: CivilianPassengerMinAggregateOutputType | null;
    _max: CivilianPassengerMaxAggregateOutputType | null;
};
export type CivilianPassengerAvgAggregateOutputType = {
    age: number | null;
};
export type CivilianPassengerSumAggregateOutputType = {
    age: number | null;
};
export type CivilianPassengerMinAggregateOutputType = {
    passenger_id: string | null;
    dispatch_id: string | null;
    full_name: string | null;
    age: number | null;
    sex: $Enums.Gender | null;
    contact_no: string | null;
    barangay: string | null;
    address: string | null;
};
export type CivilianPassengerMaxAggregateOutputType = {
    passenger_id: string | null;
    dispatch_id: string | null;
    full_name: string | null;
    age: number | null;
    sex: $Enums.Gender | null;
    contact_no: string | null;
    barangay: string | null;
    address: string | null;
};
export type CivilianPassengerCountAggregateOutputType = {
    passenger_id: number;
    dispatch_id: number;
    full_name: number;
    age: number;
    sex: number;
    contact_no: number;
    barangay: number;
    address: number;
    _all: number;
};
export type CivilianPassengerAvgAggregateInputType = {
    age?: true;
};
export type CivilianPassengerSumAggregateInputType = {
    age?: true;
};
export type CivilianPassengerMinAggregateInputType = {
    passenger_id?: true;
    dispatch_id?: true;
    full_name?: true;
    age?: true;
    sex?: true;
    contact_no?: true;
    barangay?: true;
    address?: true;
};
export type CivilianPassengerMaxAggregateInputType = {
    passenger_id?: true;
    dispatch_id?: true;
    full_name?: true;
    age?: true;
    sex?: true;
    contact_no?: true;
    barangay?: true;
    address?: true;
};
export type CivilianPassengerCountAggregateInputType = {
    passenger_id?: true;
    dispatch_id?: true;
    full_name?: true;
    age?: true;
    sex?: true;
    contact_no?: true;
    barangay?: true;
    address?: true;
    _all?: true;
};
export type CivilianPassengerAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which CivilianPassenger to aggregate.
     */
    where?: Prisma.CivilianPassengerWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CivilianPassengers to fetch.
     */
    orderBy?: Prisma.CivilianPassengerOrderByWithRelationInput | Prisma.CivilianPassengerOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.CivilianPassengerWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CivilianPassengers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CivilianPassengers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned CivilianPassengers
    **/
    _count?: true | CivilianPassengerCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: CivilianPassengerAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: CivilianPassengerSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: CivilianPassengerMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: CivilianPassengerMaxAggregateInputType;
};
export type GetCivilianPassengerAggregateType<T extends CivilianPassengerAggregateArgs> = {
    [P in keyof T & keyof AggregateCivilianPassenger]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCivilianPassenger[P]> : Prisma.GetScalarType<T[P], AggregateCivilianPassenger[P]>;
};
export type CivilianPassengerGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CivilianPassengerWhereInput;
    orderBy?: Prisma.CivilianPassengerOrderByWithAggregationInput | Prisma.CivilianPassengerOrderByWithAggregationInput[];
    by: Prisma.CivilianPassengerScalarFieldEnum[] | Prisma.CivilianPassengerScalarFieldEnum;
    having?: Prisma.CivilianPassengerScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CivilianPassengerCountAggregateInputType | true;
    _avg?: CivilianPassengerAvgAggregateInputType;
    _sum?: CivilianPassengerSumAggregateInputType;
    _min?: CivilianPassengerMinAggregateInputType;
    _max?: CivilianPassengerMaxAggregateInputType;
};
export type CivilianPassengerGroupByOutputType = {
    passenger_id: string;
    dispatch_id: string;
    full_name: string;
    age: number;
    sex: $Enums.Gender;
    contact_no: string | null;
    barangay: string | null;
    address: string | null;
    _count: CivilianPassengerCountAggregateOutputType | null;
    _avg: CivilianPassengerAvgAggregateOutputType | null;
    _sum: CivilianPassengerSumAggregateOutputType | null;
    _min: CivilianPassengerMinAggregateOutputType | null;
    _max: CivilianPassengerMaxAggregateOutputType | null;
};
export type GetCivilianPassengerGroupByPayload<T extends CivilianPassengerGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CivilianPassengerGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CivilianPassengerGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CivilianPassengerGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CivilianPassengerGroupByOutputType[P]>;
}>>;
export type CivilianPassengerWhereInput = {
    AND?: Prisma.CivilianPassengerWhereInput | Prisma.CivilianPassengerWhereInput[];
    OR?: Prisma.CivilianPassengerWhereInput[];
    NOT?: Prisma.CivilianPassengerWhereInput | Prisma.CivilianPassengerWhereInput[];
    passenger_id?: Prisma.StringFilter<"CivilianPassenger"> | string;
    dispatch_id?: Prisma.StringFilter<"CivilianPassenger"> | string;
    full_name?: Prisma.StringFilter<"CivilianPassenger"> | string;
    age?: Prisma.IntFilter<"CivilianPassenger"> | number;
    sex?: Prisma.EnumGenderFilter<"CivilianPassenger"> | $Enums.Gender;
    contact_no?: Prisma.StringNullableFilter<"CivilianPassenger"> | string | null;
    barangay?: Prisma.StringNullableFilter<"CivilianPassenger"> | string | null;
    address?: Prisma.StringNullableFilter<"CivilianPassenger"> | string | null;
    dispatch?: Prisma.XOR<Prisma.VehicularDispatchScalarRelationFilter, Prisma.VehicularDispatchWhereInput>;
};
export type CivilianPassengerOrderByWithRelationInput = {
    passenger_id?: Prisma.SortOrder;
    dispatch_id?: Prisma.SortOrder;
    full_name?: Prisma.SortOrder;
    age?: Prisma.SortOrder;
    sex?: Prisma.SortOrder;
    contact_no?: Prisma.SortOrderInput | Prisma.SortOrder;
    barangay?: Prisma.SortOrderInput | Prisma.SortOrder;
    address?: Prisma.SortOrderInput | Prisma.SortOrder;
    dispatch?: Prisma.VehicularDispatchOrderByWithRelationInput;
};
export type CivilianPassengerWhereUniqueInput = Prisma.AtLeast<{
    passenger_id?: string;
    AND?: Prisma.CivilianPassengerWhereInput | Prisma.CivilianPassengerWhereInput[];
    OR?: Prisma.CivilianPassengerWhereInput[];
    NOT?: Prisma.CivilianPassengerWhereInput | Prisma.CivilianPassengerWhereInput[];
    dispatch_id?: Prisma.StringFilter<"CivilianPassenger"> | string;
    full_name?: Prisma.StringFilter<"CivilianPassenger"> | string;
    age?: Prisma.IntFilter<"CivilianPassenger"> | number;
    sex?: Prisma.EnumGenderFilter<"CivilianPassenger"> | $Enums.Gender;
    contact_no?: Prisma.StringNullableFilter<"CivilianPassenger"> | string | null;
    barangay?: Prisma.StringNullableFilter<"CivilianPassenger"> | string | null;
    address?: Prisma.StringNullableFilter<"CivilianPassenger"> | string | null;
    dispatch?: Prisma.XOR<Prisma.VehicularDispatchScalarRelationFilter, Prisma.VehicularDispatchWhereInput>;
}, "passenger_id">;
export type CivilianPassengerOrderByWithAggregationInput = {
    passenger_id?: Prisma.SortOrder;
    dispatch_id?: Prisma.SortOrder;
    full_name?: Prisma.SortOrder;
    age?: Prisma.SortOrder;
    sex?: Prisma.SortOrder;
    contact_no?: Prisma.SortOrderInput | Prisma.SortOrder;
    barangay?: Prisma.SortOrderInput | Prisma.SortOrder;
    address?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.CivilianPassengerCountOrderByAggregateInput;
    _avg?: Prisma.CivilianPassengerAvgOrderByAggregateInput;
    _max?: Prisma.CivilianPassengerMaxOrderByAggregateInput;
    _min?: Prisma.CivilianPassengerMinOrderByAggregateInput;
    _sum?: Prisma.CivilianPassengerSumOrderByAggregateInput;
};
export type CivilianPassengerScalarWhereWithAggregatesInput = {
    AND?: Prisma.CivilianPassengerScalarWhereWithAggregatesInput | Prisma.CivilianPassengerScalarWhereWithAggregatesInput[];
    OR?: Prisma.CivilianPassengerScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CivilianPassengerScalarWhereWithAggregatesInput | Prisma.CivilianPassengerScalarWhereWithAggregatesInput[];
    passenger_id?: Prisma.StringWithAggregatesFilter<"CivilianPassenger"> | string;
    dispatch_id?: Prisma.StringWithAggregatesFilter<"CivilianPassenger"> | string;
    full_name?: Prisma.StringWithAggregatesFilter<"CivilianPassenger"> | string;
    age?: Prisma.IntWithAggregatesFilter<"CivilianPassenger"> | number;
    sex?: Prisma.EnumGenderWithAggregatesFilter<"CivilianPassenger"> | $Enums.Gender;
    contact_no?: Prisma.StringNullableWithAggregatesFilter<"CivilianPassenger"> | string | null;
    barangay?: Prisma.StringNullableWithAggregatesFilter<"CivilianPassenger"> | string | null;
    address?: Prisma.StringNullableWithAggregatesFilter<"CivilianPassenger"> | string | null;
};
export type CivilianPassengerCreateInput = {
    passenger_id?: string;
    full_name: string;
    age: number;
    sex: $Enums.Gender;
    contact_no?: string | null;
    barangay?: string | null;
    address?: string | null;
    dispatch: Prisma.VehicularDispatchCreateNestedOneWithoutPassengersInput;
};
export type CivilianPassengerUncheckedCreateInput = {
    passenger_id?: string;
    dispatch_id: string;
    full_name: string;
    age: number;
    sex: $Enums.Gender;
    contact_no?: string | null;
    barangay?: string | null;
    address?: string | null;
};
export type CivilianPassengerUpdateInput = {
    passenger_id?: Prisma.StringFieldUpdateOperationsInput | string;
    full_name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    sex?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    contact_no?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    barangay?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dispatch?: Prisma.VehicularDispatchUpdateOneRequiredWithoutPassengersNestedInput;
};
export type CivilianPassengerUncheckedUpdateInput = {
    passenger_id?: Prisma.StringFieldUpdateOperationsInput | string;
    dispatch_id?: Prisma.StringFieldUpdateOperationsInput | string;
    full_name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    sex?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    contact_no?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    barangay?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type CivilianPassengerCreateManyInput = {
    passenger_id?: string;
    dispatch_id: string;
    full_name: string;
    age: number;
    sex: $Enums.Gender;
    contact_no?: string | null;
    barangay?: string | null;
    address?: string | null;
};
export type CivilianPassengerUpdateManyMutationInput = {
    passenger_id?: Prisma.StringFieldUpdateOperationsInput | string;
    full_name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    sex?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    contact_no?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    barangay?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type CivilianPassengerUncheckedUpdateManyInput = {
    passenger_id?: Prisma.StringFieldUpdateOperationsInput | string;
    dispatch_id?: Prisma.StringFieldUpdateOperationsInput | string;
    full_name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    sex?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    contact_no?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    barangay?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type CivilianPassengerListRelationFilter = {
    every?: Prisma.CivilianPassengerWhereInput;
    some?: Prisma.CivilianPassengerWhereInput;
    none?: Prisma.CivilianPassengerWhereInput;
};
export type CivilianPassengerOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CivilianPassengerCountOrderByAggregateInput = {
    passenger_id?: Prisma.SortOrder;
    dispatch_id?: Prisma.SortOrder;
    full_name?: Prisma.SortOrder;
    age?: Prisma.SortOrder;
    sex?: Prisma.SortOrder;
    contact_no?: Prisma.SortOrder;
    barangay?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
};
export type CivilianPassengerAvgOrderByAggregateInput = {
    age?: Prisma.SortOrder;
};
export type CivilianPassengerMaxOrderByAggregateInput = {
    passenger_id?: Prisma.SortOrder;
    dispatch_id?: Prisma.SortOrder;
    full_name?: Prisma.SortOrder;
    age?: Prisma.SortOrder;
    sex?: Prisma.SortOrder;
    contact_no?: Prisma.SortOrder;
    barangay?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
};
export type CivilianPassengerMinOrderByAggregateInput = {
    passenger_id?: Prisma.SortOrder;
    dispatch_id?: Prisma.SortOrder;
    full_name?: Prisma.SortOrder;
    age?: Prisma.SortOrder;
    sex?: Prisma.SortOrder;
    contact_no?: Prisma.SortOrder;
    barangay?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
};
export type CivilianPassengerSumOrderByAggregateInput = {
    age?: Prisma.SortOrder;
};
export type CivilianPassengerCreateNestedManyWithoutDispatchInput = {
    create?: Prisma.XOR<Prisma.CivilianPassengerCreateWithoutDispatchInput, Prisma.CivilianPassengerUncheckedCreateWithoutDispatchInput> | Prisma.CivilianPassengerCreateWithoutDispatchInput[] | Prisma.CivilianPassengerUncheckedCreateWithoutDispatchInput[];
    connectOrCreate?: Prisma.CivilianPassengerCreateOrConnectWithoutDispatchInput | Prisma.CivilianPassengerCreateOrConnectWithoutDispatchInput[];
    createMany?: Prisma.CivilianPassengerCreateManyDispatchInputEnvelope;
    connect?: Prisma.CivilianPassengerWhereUniqueInput | Prisma.CivilianPassengerWhereUniqueInput[];
};
export type CivilianPassengerUncheckedCreateNestedManyWithoutDispatchInput = {
    create?: Prisma.XOR<Prisma.CivilianPassengerCreateWithoutDispatchInput, Prisma.CivilianPassengerUncheckedCreateWithoutDispatchInput> | Prisma.CivilianPassengerCreateWithoutDispatchInput[] | Prisma.CivilianPassengerUncheckedCreateWithoutDispatchInput[];
    connectOrCreate?: Prisma.CivilianPassengerCreateOrConnectWithoutDispatchInput | Prisma.CivilianPassengerCreateOrConnectWithoutDispatchInput[];
    createMany?: Prisma.CivilianPassengerCreateManyDispatchInputEnvelope;
    connect?: Prisma.CivilianPassengerWhereUniqueInput | Prisma.CivilianPassengerWhereUniqueInput[];
};
export type CivilianPassengerUpdateManyWithoutDispatchNestedInput = {
    create?: Prisma.XOR<Prisma.CivilianPassengerCreateWithoutDispatchInput, Prisma.CivilianPassengerUncheckedCreateWithoutDispatchInput> | Prisma.CivilianPassengerCreateWithoutDispatchInput[] | Prisma.CivilianPassengerUncheckedCreateWithoutDispatchInput[];
    connectOrCreate?: Prisma.CivilianPassengerCreateOrConnectWithoutDispatchInput | Prisma.CivilianPassengerCreateOrConnectWithoutDispatchInput[];
    upsert?: Prisma.CivilianPassengerUpsertWithWhereUniqueWithoutDispatchInput | Prisma.CivilianPassengerUpsertWithWhereUniqueWithoutDispatchInput[];
    createMany?: Prisma.CivilianPassengerCreateManyDispatchInputEnvelope;
    set?: Prisma.CivilianPassengerWhereUniqueInput | Prisma.CivilianPassengerWhereUniqueInput[];
    disconnect?: Prisma.CivilianPassengerWhereUniqueInput | Prisma.CivilianPassengerWhereUniqueInput[];
    delete?: Prisma.CivilianPassengerWhereUniqueInput | Prisma.CivilianPassengerWhereUniqueInput[];
    connect?: Prisma.CivilianPassengerWhereUniqueInput | Prisma.CivilianPassengerWhereUniqueInput[];
    update?: Prisma.CivilianPassengerUpdateWithWhereUniqueWithoutDispatchInput | Prisma.CivilianPassengerUpdateWithWhereUniqueWithoutDispatchInput[];
    updateMany?: Prisma.CivilianPassengerUpdateManyWithWhereWithoutDispatchInput | Prisma.CivilianPassengerUpdateManyWithWhereWithoutDispatchInput[];
    deleteMany?: Prisma.CivilianPassengerScalarWhereInput | Prisma.CivilianPassengerScalarWhereInput[];
};
export type CivilianPassengerUncheckedUpdateManyWithoutDispatchNestedInput = {
    create?: Prisma.XOR<Prisma.CivilianPassengerCreateWithoutDispatchInput, Prisma.CivilianPassengerUncheckedCreateWithoutDispatchInput> | Prisma.CivilianPassengerCreateWithoutDispatchInput[] | Prisma.CivilianPassengerUncheckedCreateWithoutDispatchInput[];
    connectOrCreate?: Prisma.CivilianPassengerCreateOrConnectWithoutDispatchInput | Prisma.CivilianPassengerCreateOrConnectWithoutDispatchInput[];
    upsert?: Prisma.CivilianPassengerUpsertWithWhereUniqueWithoutDispatchInput | Prisma.CivilianPassengerUpsertWithWhereUniqueWithoutDispatchInput[];
    createMany?: Prisma.CivilianPassengerCreateManyDispatchInputEnvelope;
    set?: Prisma.CivilianPassengerWhereUniqueInput | Prisma.CivilianPassengerWhereUniqueInput[];
    disconnect?: Prisma.CivilianPassengerWhereUniqueInput | Prisma.CivilianPassengerWhereUniqueInput[];
    delete?: Prisma.CivilianPassengerWhereUniqueInput | Prisma.CivilianPassengerWhereUniqueInput[];
    connect?: Prisma.CivilianPassengerWhereUniqueInput | Prisma.CivilianPassengerWhereUniqueInput[];
    update?: Prisma.CivilianPassengerUpdateWithWhereUniqueWithoutDispatchInput | Prisma.CivilianPassengerUpdateWithWhereUniqueWithoutDispatchInput[];
    updateMany?: Prisma.CivilianPassengerUpdateManyWithWhereWithoutDispatchInput | Prisma.CivilianPassengerUpdateManyWithWhereWithoutDispatchInput[];
    deleteMany?: Prisma.CivilianPassengerScalarWhereInput | Prisma.CivilianPassengerScalarWhereInput[];
};
export type CivilianPassengerCreateWithoutDispatchInput = {
    passenger_id?: string;
    full_name: string;
    age: number;
    sex: $Enums.Gender;
    contact_no?: string | null;
    barangay?: string | null;
    address?: string | null;
};
export type CivilianPassengerUncheckedCreateWithoutDispatchInput = {
    passenger_id?: string;
    full_name: string;
    age: number;
    sex: $Enums.Gender;
    contact_no?: string | null;
    barangay?: string | null;
    address?: string | null;
};
export type CivilianPassengerCreateOrConnectWithoutDispatchInput = {
    where: Prisma.CivilianPassengerWhereUniqueInput;
    create: Prisma.XOR<Prisma.CivilianPassengerCreateWithoutDispatchInput, Prisma.CivilianPassengerUncheckedCreateWithoutDispatchInput>;
};
export type CivilianPassengerCreateManyDispatchInputEnvelope = {
    data: Prisma.CivilianPassengerCreateManyDispatchInput | Prisma.CivilianPassengerCreateManyDispatchInput[];
    skipDuplicates?: boolean;
};
export type CivilianPassengerUpsertWithWhereUniqueWithoutDispatchInput = {
    where: Prisma.CivilianPassengerWhereUniqueInput;
    update: Prisma.XOR<Prisma.CivilianPassengerUpdateWithoutDispatchInput, Prisma.CivilianPassengerUncheckedUpdateWithoutDispatchInput>;
    create: Prisma.XOR<Prisma.CivilianPassengerCreateWithoutDispatchInput, Prisma.CivilianPassengerUncheckedCreateWithoutDispatchInput>;
};
export type CivilianPassengerUpdateWithWhereUniqueWithoutDispatchInput = {
    where: Prisma.CivilianPassengerWhereUniqueInput;
    data: Prisma.XOR<Prisma.CivilianPassengerUpdateWithoutDispatchInput, Prisma.CivilianPassengerUncheckedUpdateWithoutDispatchInput>;
};
export type CivilianPassengerUpdateManyWithWhereWithoutDispatchInput = {
    where: Prisma.CivilianPassengerScalarWhereInput;
    data: Prisma.XOR<Prisma.CivilianPassengerUpdateManyMutationInput, Prisma.CivilianPassengerUncheckedUpdateManyWithoutDispatchInput>;
};
export type CivilianPassengerScalarWhereInput = {
    AND?: Prisma.CivilianPassengerScalarWhereInput | Prisma.CivilianPassengerScalarWhereInput[];
    OR?: Prisma.CivilianPassengerScalarWhereInput[];
    NOT?: Prisma.CivilianPassengerScalarWhereInput | Prisma.CivilianPassengerScalarWhereInput[];
    passenger_id?: Prisma.StringFilter<"CivilianPassenger"> | string;
    dispatch_id?: Prisma.StringFilter<"CivilianPassenger"> | string;
    full_name?: Prisma.StringFilter<"CivilianPassenger"> | string;
    age?: Prisma.IntFilter<"CivilianPassenger"> | number;
    sex?: Prisma.EnumGenderFilter<"CivilianPassenger"> | $Enums.Gender;
    contact_no?: Prisma.StringNullableFilter<"CivilianPassenger"> | string | null;
    barangay?: Prisma.StringNullableFilter<"CivilianPassenger"> | string | null;
    address?: Prisma.StringNullableFilter<"CivilianPassenger"> | string | null;
};
export type CivilianPassengerCreateManyDispatchInput = {
    passenger_id?: string;
    full_name: string;
    age: number;
    sex: $Enums.Gender;
    contact_no?: string | null;
    barangay?: string | null;
    address?: string | null;
};
export type CivilianPassengerUpdateWithoutDispatchInput = {
    passenger_id?: Prisma.StringFieldUpdateOperationsInput | string;
    full_name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    sex?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    contact_no?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    barangay?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type CivilianPassengerUncheckedUpdateWithoutDispatchInput = {
    passenger_id?: Prisma.StringFieldUpdateOperationsInput | string;
    full_name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    sex?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    contact_no?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    barangay?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type CivilianPassengerUncheckedUpdateManyWithoutDispatchInput = {
    passenger_id?: Prisma.StringFieldUpdateOperationsInput | string;
    full_name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    sex?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    contact_no?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    barangay?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type CivilianPassengerSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    passenger_id?: boolean;
    dispatch_id?: boolean;
    full_name?: boolean;
    age?: boolean;
    sex?: boolean;
    contact_no?: boolean;
    barangay?: boolean;
    address?: boolean;
    dispatch?: boolean | Prisma.VehicularDispatchDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["civilianPassenger"]>;
export type CivilianPassengerSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    passenger_id?: boolean;
    dispatch_id?: boolean;
    full_name?: boolean;
    age?: boolean;
    sex?: boolean;
    contact_no?: boolean;
    barangay?: boolean;
    address?: boolean;
    dispatch?: boolean | Prisma.VehicularDispatchDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["civilianPassenger"]>;
export type CivilianPassengerSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    passenger_id?: boolean;
    dispatch_id?: boolean;
    full_name?: boolean;
    age?: boolean;
    sex?: boolean;
    contact_no?: boolean;
    barangay?: boolean;
    address?: boolean;
    dispatch?: boolean | Prisma.VehicularDispatchDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["civilianPassenger"]>;
export type CivilianPassengerSelectScalar = {
    passenger_id?: boolean;
    dispatch_id?: boolean;
    full_name?: boolean;
    age?: boolean;
    sex?: boolean;
    contact_no?: boolean;
    barangay?: boolean;
    address?: boolean;
};
export type CivilianPassengerOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"passenger_id" | "dispatch_id" | "full_name" | "age" | "sex" | "contact_no" | "barangay" | "address", ExtArgs["result"]["civilianPassenger"]>;
export type CivilianPassengerInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    dispatch?: boolean | Prisma.VehicularDispatchDefaultArgs<ExtArgs>;
};
export type CivilianPassengerIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    dispatch?: boolean | Prisma.VehicularDispatchDefaultArgs<ExtArgs>;
};
export type CivilianPassengerIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    dispatch?: boolean | Prisma.VehicularDispatchDefaultArgs<ExtArgs>;
};
export type $CivilianPassengerPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CivilianPassenger";
    objects: {
        dispatch: Prisma.$VehicularDispatchPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        passenger_id: string;
        dispatch_id: string;
        full_name: string;
        age: number;
        sex: $Enums.Gender;
        contact_no: string | null;
        barangay: string | null;
        address: string | null;
    }, ExtArgs["result"]["civilianPassenger"]>;
    composites: {};
};
export type CivilianPassengerGetPayload<S extends boolean | null | undefined | CivilianPassengerDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CivilianPassengerPayload, S>;
export type CivilianPassengerCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CivilianPassengerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CivilianPassengerCountAggregateInputType | true;
};
export interface CivilianPassengerDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CivilianPassenger'];
        meta: {
            name: 'CivilianPassenger';
        };
    };
    /**
     * Find zero or one CivilianPassenger that matches the filter.
     * @param {CivilianPassengerFindUniqueArgs} args - Arguments to find a CivilianPassenger
     * @example
     * // Get one CivilianPassenger
     * const civilianPassenger = await prisma.civilianPassenger.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CivilianPassengerFindUniqueArgs>(args: Prisma.SelectSubset<T, CivilianPassengerFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CivilianPassengerClient<runtime.Types.Result.GetResult<Prisma.$CivilianPassengerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one CivilianPassenger that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CivilianPassengerFindUniqueOrThrowArgs} args - Arguments to find a CivilianPassenger
     * @example
     * // Get one CivilianPassenger
     * const civilianPassenger = await prisma.civilianPassenger.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CivilianPassengerFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CivilianPassengerFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CivilianPassengerClient<runtime.Types.Result.GetResult<Prisma.$CivilianPassengerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first CivilianPassenger that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CivilianPassengerFindFirstArgs} args - Arguments to find a CivilianPassenger
     * @example
     * // Get one CivilianPassenger
     * const civilianPassenger = await prisma.civilianPassenger.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CivilianPassengerFindFirstArgs>(args?: Prisma.SelectSubset<T, CivilianPassengerFindFirstArgs<ExtArgs>>): Prisma.Prisma__CivilianPassengerClient<runtime.Types.Result.GetResult<Prisma.$CivilianPassengerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first CivilianPassenger that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CivilianPassengerFindFirstOrThrowArgs} args - Arguments to find a CivilianPassenger
     * @example
     * // Get one CivilianPassenger
     * const civilianPassenger = await prisma.civilianPassenger.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CivilianPassengerFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CivilianPassengerFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CivilianPassengerClient<runtime.Types.Result.GetResult<Prisma.$CivilianPassengerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more CivilianPassengers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CivilianPassengerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CivilianPassengers
     * const civilianPassengers = await prisma.civilianPassenger.findMany()
     *
     * // Get first 10 CivilianPassengers
     * const civilianPassengers = await prisma.civilianPassenger.findMany({ take: 10 })
     *
     * // Only select the `passenger_id`
     * const civilianPassengerWithPassenger_idOnly = await prisma.civilianPassenger.findMany({ select: { passenger_id: true } })
     *
     */
    findMany<T extends CivilianPassengerFindManyArgs>(args?: Prisma.SelectSubset<T, CivilianPassengerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CivilianPassengerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a CivilianPassenger.
     * @param {CivilianPassengerCreateArgs} args - Arguments to create a CivilianPassenger.
     * @example
     * // Create one CivilianPassenger
     * const CivilianPassenger = await prisma.civilianPassenger.create({
     *   data: {
     *     // ... data to create a CivilianPassenger
     *   }
     * })
     *
     */
    create<T extends CivilianPassengerCreateArgs>(args: Prisma.SelectSubset<T, CivilianPassengerCreateArgs<ExtArgs>>): Prisma.Prisma__CivilianPassengerClient<runtime.Types.Result.GetResult<Prisma.$CivilianPassengerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many CivilianPassengers.
     * @param {CivilianPassengerCreateManyArgs} args - Arguments to create many CivilianPassengers.
     * @example
     * // Create many CivilianPassengers
     * const civilianPassenger = await prisma.civilianPassenger.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends CivilianPassengerCreateManyArgs>(args?: Prisma.SelectSubset<T, CivilianPassengerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many CivilianPassengers and returns the data saved in the database.
     * @param {CivilianPassengerCreateManyAndReturnArgs} args - Arguments to create many CivilianPassengers.
     * @example
     * // Create many CivilianPassengers
     * const civilianPassenger = await prisma.civilianPassenger.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many CivilianPassengers and only return the `passenger_id`
     * const civilianPassengerWithPassenger_idOnly = await prisma.civilianPassenger.createManyAndReturn({
     *   select: { passenger_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends CivilianPassengerCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CivilianPassengerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CivilianPassengerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a CivilianPassenger.
     * @param {CivilianPassengerDeleteArgs} args - Arguments to delete one CivilianPassenger.
     * @example
     * // Delete one CivilianPassenger
     * const CivilianPassenger = await prisma.civilianPassenger.delete({
     *   where: {
     *     // ... filter to delete one CivilianPassenger
     *   }
     * })
     *
     */
    delete<T extends CivilianPassengerDeleteArgs>(args: Prisma.SelectSubset<T, CivilianPassengerDeleteArgs<ExtArgs>>): Prisma.Prisma__CivilianPassengerClient<runtime.Types.Result.GetResult<Prisma.$CivilianPassengerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one CivilianPassenger.
     * @param {CivilianPassengerUpdateArgs} args - Arguments to update one CivilianPassenger.
     * @example
     * // Update one CivilianPassenger
     * const civilianPassenger = await prisma.civilianPassenger.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends CivilianPassengerUpdateArgs>(args: Prisma.SelectSubset<T, CivilianPassengerUpdateArgs<ExtArgs>>): Prisma.Prisma__CivilianPassengerClient<runtime.Types.Result.GetResult<Prisma.$CivilianPassengerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more CivilianPassengers.
     * @param {CivilianPassengerDeleteManyArgs} args - Arguments to filter CivilianPassengers to delete.
     * @example
     * // Delete a few CivilianPassengers
     * const { count } = await prisma.civilianPassenger.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends CivilianPassengerDeleteManyArgs>(args?: Prisma.SelectSubset<T, CivilianPassengerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more CivilianPassengers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CivilianPassengerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CivilianPassengers
     * const civilianPassenger = await prisma.civilianPassenger.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends CivilianPassengerUpdateManyArgs>(args: Prisma.SelectSubset<T, CivilianPassengerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more CivilianPassengers and returns the data updated in the database.
     * @param {CivilianPassengerUpdateManyAndReturnArgs} args - Arguments to update many CivilianPassengers.
     * @example
     * // Update many CivilianPassengers
     * const civilianPassenger = await prisma.civilianPassenger.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more CivilianPassengers and only return the `passenger_id`
     * const civilianPassengerWithPassenger_idOnly = await prisma.civilianPassenger.updateManyAndReturn({
     *   select: { passenger_id: true },
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
    updateManyAndReturn<T extends CivilianPassengerUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CivilianPassengerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CivilianPassengerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one CivilianPassenger.
     * @param {CivilianPassengerUpsertArgs} args - Arguments to update or create a CivilianPassenger.
     * @example
     * // Update or create a CivilianPassenger
     * const civilianPassenger = await prisma.civilianPassenger.upsert({
     *   create: {
     *     // ... data to create a CivilianPassenger
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CivilianPassenger we want to update
     *   }
     * })
     */
    upsert<T extends CivilianPassengerUpsertArgs>(args: Prisma.SelectSubset<T, CivilianPassengerUpsertArgs<ExtArgs>>): Prisma.Prisma__CivilianPassengerClient<runtime.Types.Result.GetResult<Prisma.$CivilianPassengerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of CivilianPassengers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CivilianPassengerCountArgs} args - Arguments to filter CivilianPassengers to count.
     * @example
     * // Count the number of CivilianPassengers
     * const count = await prisma.civilianPassenger.count({
     *   where: {
     *     // ... the filter for the CivilianPassengers we want to count
     *   }
     * })
    **/
    count<T extends CivilianPassengerCountArgs>(args?: Prisma.Subset<T, CivilianPassengerCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CivilianPassengerCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a CivilianPassenger.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CivilianPassengerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CivilianPassengerAggregateArgs>(args: Prisma.Subset<T, CivilianPassengerAggregateArgs>): Prisma.PrismaPromise<GetCivilianPassengerAggregateType<T>>;
    /**
     * Group by CivilianPassenger.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CivilianPassengerGroupByArgs} args - Group by arguments.
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
    groupBy<T extends CivilianPassengerGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CivilianPassengerGroupByArgs['orderBy'];
    } : {
        orderBy?: CivilianPassengerGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CivilianPassengerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCivilianPassengerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the CivilianPassenger model
     */
    readonly fields: CivilianPassengerFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for CivilianPassenger.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__CivilianPassengerClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    dispatch<T extends Prisma.VehicularDispatchDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.VehicularDispatchDefaultArgs<ExtArgs>>): Prisma.Prisma__VehicularDispatchClient<runtime.Types.Result.GetResult<Prisma.$VehicularDispatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the CivilianPassenger model
 */
export interface CivilianPassengerFieldRefs {
    readonly passenger_id: Prisma.FieldRef<"CivilianPassenger", 'String'>;
    readonly dispatch_id: Prisma.FieldRef<"CivilianPassenger", 'String'>;
    readonly full_name: Prisma.FieldRef<"CivilianPassenger", 'String'>;
    readonly age: Prisma.FieldRef<"CivilianPassenger", 'Int'>;
    readonly sex: Prisma.FieldRef<"CivilianPassenger", 'Gender'>;
    readonly contact_no: Prisma.FieldRef<"CivilianPassenger", 'String'>;
    readonly barangay: Prisma.FieldRef<"CivilianPassenger", 'String'>;
    readonly address: Prisma.FieldRef<"CivilianPassenger", 'String'>;
}
/**
 * CivilianPassenger findUnique
 */
export type CivilianPassengerFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CivilianPassenger
     */
    select?: Prisma.CivilianPassengerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CivilianPassenger
     */
    omit?: Prisma.CivilianPassengerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CivilianPassengerInclude<ExtArgs> | null;
    /**
     * Filter, which CivilianPassenger to fetch.
     */
    where: Prisma.CivilianPassengerWhereUniqueInput;
};
/**
 * CivilianPassenger findUniqueOrThrow
 */
export type CivilianPassengerFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CivilianPassenger
     */
    select?: Prisma.CivilianPassengerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CivilianPassenger
     */
    omit?: Prisma.CivilianPassengerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CivilianPassengerInclude<ExtArgs> | null;
    /**
     * Filter, which CivilianPassenger to fetch.
     */
    where: Prisma.CivilianPassengerWhereUniqueInput;
};
/**
 * CivilianPassenger findFirst
 */
export type CivilianPassengerFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CivilianPassenger
     */
    select?: Prisma.CivilianPassengerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CivilianPassenger
     */
    omit?: Prisma.CivilianPassengerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CivilianPassengerInclude<ExtArgs> | null;
    /**
     * Filter, which CivilianPassenger to fetch.
     */
    where?: Prisma.CivilianPassengerWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CivilianPassengers to fetch.
     */
    orderBy?: Prisma.CivilianPassengerOrderByWithRelationInput | Prisma.CivilianPassengerOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for CivilianPassengers.
     */
    cursor?: Prisma.CivilianPassengerWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CivilianPassengers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CivilianPassengers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of CivilianPassengers.
     */
    distinct?: Prisma.CivilianPassengerScalarFieldEnum | Prisma.CivilianPassengerScalarFieldEnum[];
};
/**
 * CivilianPassenger findFirstOrThrow
 */
export type CivilianPassengerFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CivilianPassenger
     */
    select?: Prisma.CivilianPassengerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CivilianPassenger
     */
    omit?: Prisma.CivilianPassengerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CivilianPassengerInclude<ExtArgs> | null;
    /**
     * Filter, which CivilianPassenger to fetch.
     */
    where?: Prisma.CivilianPassengerWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CivilianPassengers to fetch.
     */
    orderBy?: Prisma.CivilianPassengerOrderByWithRelationInput | Prisma.CivilianPassengerOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for CivilianPassengers.
     */
    cursor?: Prisma.CivilianPassengerWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CivilianPassengers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CivilianPassengers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of CivilianPassengers.
     */
    distinct?: Prisma.CivilianPassengerScalarFieldEnum | Prisma.CivilianPassengerScalarFieldEnum[];
};
/**
 * CivilianPassenger findMany
 */
export type CivilianPassengerFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CivilianPassenger
     */
    select?: Prisma.CivilianPassengerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CivilianPassenger
     */
    omit?: Prisma.CivilianPassengerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CivilianPassengerInclude<ExtArgs> | null;
    /**
     * Filter, which CivilianPassengers to fetch.
     */
    where?: Prisma.CivilianPassengerWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CivilianPassengers to fetch.
     */
    orderBy?: Prisma.CivilianPassengerOrderByWithRelationInput | Prisma.CivilianPassengerOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing CivilianPassengers.
     */
    cursor?: Prisma.CivilianPassengerWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CivilianPassengers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CivilianPassengers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of CivilianPassengers.
     */
    distinct?: Prisma.CivilianPassengerScalarFieldEnum | Prisma.CivilianPassengerScalarFieldEnum[];
};
/**
 * CivilianPassenger create
 */
export type CivilianPassengerCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CivilianPassenger
     */
    select?: Prisma.CivilianPassengerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CivilianPassenger
     */
    omit?: Prisma.CivilianPassengerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CivilianPassengerInclude<ExtArgs> | null;
    /**
     * The data needed to create a CivilianPassenger.
     */
    data: Prisma.XOR<Prisma.CivilianPassengerCreateInput, Prisma.CivilianPassengerUncheckedCreateInput>;
};
/**
 * CivilianPassenger createMany
 */
export type CivilianPassengerCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many CivilianPassengers.
     */
    data: Prisma.CivilianPassengerCreateManyInput | Prisma.CivilianPassengerCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * CivilianPassenger createManyAndReturn
 */
export type CivilianPassengerCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CivilianPassenger
     */
    select?: Prisma.CivilianPassengerSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the CivilianPassenger
     */
    omit?: Prisma.CivilianPassengerOmit<ExtArgs> | null;
    /**
     * The data used to create many CivilianPassengers.
     */
    data: Prisma.CivilianPassengerCreateManyInput | Prisma.CivilianPassengerCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CivilianPassengerIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * CivilianPassenger update
 */
export type CivilianPassengerUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CivilianPassenger
     */
    select?: Prisma.CivilianPassengerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CivilianPassenger
     */
    omit?: Prisma.CivilianPassengerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CivilianPassengerInclude<ExtArgs> | null;
    /**
     * The data needed to update a CivilianPassenger.
     */
    data: Prisma.XOR<Prisma.CivilianPassengerUpdateInput, Prisma.CivilianPassengerUncheckedUpdateInput>;
    /**
     * Choose, which CivilianPassenger to update.
     */
    where: Prisma.CivilianPassengerWhereUniqueInput;
};
/**
 * CivilianPassenger updateMany
 */
export type CivilianPassengerUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update CivilianPassengers.
     */
    data: Prisma.XOR<Prisma.CivilianPassengerUpdateManyMutationInput, Prisma.CivilianPassengerUncheckedUpdateManyInput>;
    /**
     * Filter which CivilianPassengers to update
     */
    where?: Prisma.CivilianPassengerWhereInput;
    /**
     * Limit how many CivilianPassengers to update.
     */
    limit?: number;
};
/**
 * CivilianPassenger updateManyAndReturn
 */
export type CivilianPassengerUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CivilianPassenger
     */
    select?: Prisma.CivilianPassengerSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the CivilianPassenger
     */
    omit?: Prisma.CivilianPassengerOmit<ExtArgs> | null;
    /**
     * The data used to update CivilianPassengers.
     */
    data: Prisma.XOR<Prisma.CivilianPassengerUpdateManyMutationInput, Prisma.CivilianPassengerUncheckedUpdateManyInput>;
    /**
     * Filter which CivilianPassengers to update
     */
    where?: Prisma.CivilianPassengerWhereInput;
    /**
     * Limit how many CivilianPassengers to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CivilianPassengerIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * CivilianPassenger upsert
 */
export type CivilianPassengerUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CivilianPassenger
     */
    select?: Prisma.CivilianPassengerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CivilianPassenger
     */
    omit?: Prisma.CivilianPassengerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CivilianPassengerInclude<ExtArgs> | null;
    /**
     * The filter to search for the CivilianPassenger to update in case it exists.
     */
    where: Prisma.CivilianPassengerWhereUniqueInput;
    /**
     * In case the CivilianPassenger found by the `where` argument doesn't exist, create a new CivilianPassenger with this data.
     */
    create: Prisma.XOR<Prisma.CivilianPassengerCreateInput, Prisma.CivilianPassengerUncheckedCreateInput>;
    /**
     * In case the CivilianPassenger was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.CivilianPassengerUpdateInput, Prisma.CivilianPassengerUncheckedUpdateInput>;
};
/**
 * CivilianPassenger delete
 */
export type CivilianPassengerDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CivilianPassenger
     */
    select?: Prisma.CivilianPassengerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CivilianPassenger
     */
    omit?: Prisma.CivilianPassengerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CivilianPassengerInclude<ExtArgs> | null;
    /**
     * Filter which CivilianPassenger to delete.
     */
    where: Prisma.CivilianPassengerWhereUniqueInput;
};
/**
 * CivilianPassenger deleteMany
 */
export type CivilianPassengerDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which CivilianPassengers to delete
     */
    where?: Prisma.CivilianPassengerWhereInput;
    /**
     * Limit how many CivilianPassengers to delete.
     */
    limit?: number;
};
/**
 * CivilianPassenger without action
 */
export type CivilianPassengerDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CivilianPassenger
     */
    select?: Prisma.CivilianPassengerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CivilianPassenger
     */
    omit?: Prisma.CivilianPassengerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CivilianPassengerInclude<ExtArgs> | null;
};
//# sourceMappingURL=CivilianPassenger.d.ts.map