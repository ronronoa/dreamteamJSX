import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model OperationInventory
 *
 */
export type OperationInventoryModel = runtime.Types.Result.DefaultSelection<Prisma.$OperationInventoryPayload>;
export type AggregateOperationInventory = {
    _count: OperationInventoryCountAggregateOutputType | null;
    _avg: OperationInventoryAvgAggregateOutputType | null;
    _sum: OperationInventorySumAggregateOutputType | null;
    _min: OperationInventoryMinAggregateOutputType | null;
    _max: OperationInventoryMaxAggregateOutputType | null;
};
export type OperationInventoryAvgAggregateOutputType = {
    quantity: number | null;
};
export type OperationInventorySumAggregateOutputType = {
    quantity: number | null;
};
export type OperationInventoryMinAggregateOutputType = {
    operation_id: string | null;
    item_id: string | null;
    quantity: number | null;
};
export type OperationInventoryMaxAggregateOutputType = {
    operation_id: string | null;
    item_id: string | null;
    quantity: number | null;
};
export type OperationInventoryCountAggregateOutputType = {
    operation_id: number;
    item_id: number;
    quantity: number;
    _all: number;
};
export type OperationInventoryAvgAggregateInputType = {
    quantity?: true;
};
export type OperationInventorySumAggregateInputType = {
    quantity?: true;
};
export type OperationInventoryMinAggregateInputType = {
    operation_id?: true;
    item_id?: true;
    quantity?: true;
};
export type OperationInventoryMaxAggregateInputType = {
    operation_id?: true;
    item_id?: true;
    quantity?: true;
};
export type OperationInventoryCountAggregateInputType = {
    operation_id?: true;
    item_id?: true;
    quantity?: true;
    _all?: true;
};
export type OperationInventoryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which OperationInventory to aggregate.
     */
    where?: Prisma.OperationInventoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OperationInventories to fetch.
     */
    orderBy?: Prisma.OperationInventoryOrderByWithRelationInput | Prisma.OperationInventoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.OperationInventoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OperationInventories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OperationInventories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned OperationInventories
    **/
    _count?: true | OperationInventoryCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: OperationInventoryAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: OperationInventorySumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: OperationInventoryMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: OperationInventoryMaxAggregateInputType;
};
export type GetOperationInventoryAggregateType<T extends OperationInventoryAggregateArgs> = {
    [P in keyof T & keyof AggregateOperationInventory]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOperationInventory[P]> : Prisma.GetScalarType<T[P], AggregateOperationInventory[P]>;
};
export type OperationInventoryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OperationInventoryWhereInput;
    orderBy?: Prisma.OperationInventoryOrderByWithAggregationInput | Prisma.OperationInventoryOrderByWithAggregationInput[];
    by: Prisma.OperationInventoryScalarFieldEnum[] | Prisma.OperationInventoryScalarFieldEnum;
    having?: Prisma.OperationInventoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OperationInventoryCountAggregateInputType | true;
    _avg?: OperationInventoryAvgAggregateInputType;
    _sum?: OperationInventorySumAggregateInputType;
    _min?: OperationInventoryMinAggregateInputType;
    _max?: OperationInventoryMaxAggregateInputType;
};
export type OperationInventoryGroupByOutputType = {
    operation_id: string;
    item_id: string;
    quantity: number;
    _count: OperationInventoryCountAggregateOutputType | null;
    _avg: OperationInventoryAvgAggregateOutputType | null;
    _sum: OperationInventorySumAggregateOutputType | null;
    _min: OperationInventoryMinAggregateOutputType | null;
    _max: OperationInventoryMaxAggregateOutputType | null;
};
export type GetOperationInventoryGroupByPayload<T extends OperationInventoryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OperationInventoryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OperationInventoryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OperationInventoryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OperationInventoryGroupByOutputType[P]>;
}>>;
export type OperationInventoryWhereInput = {
    AND?: Prisma.OperationInventoryWhereInput | Prisma.OperationInventoryWhereInput[];
    OR?: Prisma.OperationInventoryWhereInput[];
    NOT?: Prisma.OperationInventoryWhereInput | Prisma.OperationInventoryWhereInput[];
    operation_id?: Prisma.StringFilter<"OperationInventory"> | string;
    item_id?: Prisma.StringFilter<"OperationInventory"> | string;
    quantity?: Prisma.IntFilter<"OperationInventory"> | number;
    operation?: Prisma.XOR<Prisma.OperationLogScalarRelationFilter, Prisma.OperationLogWhereInput>;
    item?: Prisma.XOR<Prisma.InventoryItemScalarRelationFilter, Prisma.InventoryItemWhereInput>;
};
export type OperationInventoryOrderByWithRelationInput = {
    operation_id?: Prisma.SortOrder;
    item_id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    operation?: Prisma.OperationLogOrderByWithRelationInput;
    item?: Prisma.InventoryItemOrderByWithRelationInput;
};
export type OperationInventoryWhereUniqueInput = Prisma.AtLeast<{
    operation_id_item_id?: Prisma.OperationInventoryOperation_idItem_idCompoundUniqueInput;
    AND?: Prisma.OperationInventoryWhereInput | Prisma.OperationInventoryWhereInput[];
    OR?: Prisma.OperationInventoryWhereInput[];
    NOT?: Prisma.OperationInventoryWhereInput | Prisma.OperationInventoryWhereInput[];
    operation_id?: Prisma.StringFilter<"OperationInventory"> | string;
    item_id?: Prisma.StringFilter<"OperationInventory"> | string;
    quantity?: Prisma.IntFilter<"OperationInventory"> | number;
    operation?: Prisma.XOR<Prisma.OperationLogScalarRelationFilter, Prisma.OperationLogWhereInput>;
    item?: Prisma.XOR<Prisma.InventoryItemScalarRelationFilter, Prisma.InventoryItemWhereInput>;
}, "operation_id_item_id">;
export type OperationInventoryOrderByWithAggregationInput = {
    operation_id?: Prisma.SortOrder;
    item_id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    _count?: Prisma.OperationInventoryCountOrderByAggregateInput;
    _avg?: Prisma.OperationInventoryAvgOrderByAggregateInput;
    _max?: Prisma.OperationInventoryMaxOrderByAggregateInput;
    _min?: Prisma.OperationInventoryMinOrderByAggregateInput;
    _sum?: Prisma.OperationInventorySumOrderByAggregateInput;
};
export type OperationInventoryScalarWhereWithAggregatesInput = {
    AND?: Prisma.OperationInventoryScalarWhereWithAggregatesInput | Prisma.OperationInventoryScalarWhereWithAggregatesInput[];
    OR?: Prisma.OperationInventoryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OperationInventoryScalarWhereWithAggregatesInput | Prisma.OperationInventoryScalarWhereWithAggregatesInput[];
    operation_id?: Prisma.StringWithAggregatesFilter<"OperationInventory"> | string;
    item_id?: Prisma.StringWithAggregatesFilter<"OperationInventory"> | string;
    quantity?: Prisma.IntWithAggregatesFilter<"OperationInventory"> | number;
};
export type OperationInventoryCreateInput = {
    quantity: number;
    operation: Prisma.OperationLogCreateNestedOneWithoutInventoryItemsInput;
    item: Prisma.InventoryItemCreateNestedOneWithoutOperationItemsInput;
};
export type OperationInventoryUncheckedCreateInput = {
    operation_id: string;
    item_id: string;
    quantity: number;
};
export type OperationInventoryUpdateInput = {
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    operation?: Prisma.OperationLogUpdateOneRequiredWithoutInventoryItemsNestedInput;
    item?: Prisma.InventoryItemUpdateOneRequiredWithoutOperationItemsNestedInput;
};
export type OperationInventoryUncheckedUpdateInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    item_id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type OperationInventoryCreateManyInput = {
    operation_id: string;
    item_id: string;
    quantity: number;
};
export type OperationInventoryUpdateManyMutationInput = {
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type OperationInventoryUncheckedUpdateManyInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    item_id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type OperationInventoryListRelationFilter = {
    every?: Prisma.OperationInventoryWhereInput;
    some?: Prisma.OperationInventoryWhereInput;
    none?: Prisma.OperationInventoryWhereInput;
};
export type OperationInventoryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type OperationInventoryOperation_idItem_idCompoundUniqueInput = {
    operation_id: string;
    item_id: string;
};
export type OperationInventoryCountOrderByAggregateInput = {
    operation_id?: Prisma.SortOrder;
    item_id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
};
export type OperationInventoryAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type OperationInventoryMaxOrderByAggregateInput = {
    operation_id?: Prisma.SortOrder;
    item_id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
};
export type OperationInventoryMinOrderByAggregateInput = {
    operation_id?: Prisma.SortOrder;
    item_id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
};
export type OperationInventorySumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type OperationInventoryCreateNestedManyWithoutOperationInput = {
    create?: Prisma.XOR<Prisma.OperationInventoryCreateWithoutOperationInput, Prisma.OperationInventoryUncheckedCreateWithoutOperationInput> | Prisma.OperationInventoryCreateWithoutOperationInput[] | Prisma.OperationInventoryUncheckedCreateWithoutOperationInput[];
    connectOrCreate?: Prisma.OperationInventoryCreateOrConnectWithoutOperationInput | Prisma.OperationInventoryCreateOrConnectWithoutOperationInput[];
    createMany?: Prisma.OperationInventoryCreateManyOperationInputEnvelope;
    connect?: Prisma.OperationInventoryWhereUniqueInput | Prisma.OperationInventoryWhereUniqueInput[];
};
export type OperationInventoryUncheckedCreateNestedManyWithoutOperationInput = {
    create?: Prisma.XOR<Prisma.OperationInventoryCreateWithoutOperationInput, Prisma.OperationInventoryUncheckedCreateWithoutOperationInput> | Prisma.OperationInventoryCreateWithoutOperationInput[] | Prisma.OperationInventoryUncheckedCreateWithoutOperationInput[];
    connectOrCreate?: Prisma.OperationInventoryCreateOrConnectWithoutOperationInput | Prisma.OperationInventoryCreateOrConnectWithoutOperationInput[];
    createMany?: Prisma.OperationInventoryCreateManyOperationInputEnvelope;
    connect?: Prisma.OperationInventoryWhereUniqueInput | Prisma.OperationInventoryWhereUniqueInput[];
};
export type OperationInventoryUpdateManyWithoutOperationNestedInput = {
    create?: Prisma.XOR<Prisma.OperationInventoryCreateWithoutOperationInput, Prisma.OperationInventoryUncheckedCreateWithoutOperationInput> | Prisma.OperationInventoryCreateWithoutOperationInput[] | Prisma.OperationInventoryUncheckedCreateWithoutOperationInput[];
    connectOrCreate?: Prisma.OperationInventoryCreateOrConnectWithoutOperationInput | Prisma.OperationInventoryCreateOrConnectWithoutOperationInput[];
    upsert?: Prisma.OperationInventoryUpsertWithWhereUniqueWithoutOperationInput | Prisma.OperationInventoryUpsertWithWhereUniqueWithoutOperationInput[];
    createMany?: Prisma.OperationInventoryCreateManyOperationInputEnvelope;
    set?: Prisma.OperationInventoryWhereUniqueInput | Prisma.OperationInventoryWhereUniqueInput[];
    disconnect?: Prisma.OperationInventoryWhereUniqueInput | Prisma.OperationInventoryWhereUniqueInput[];
    delete?: Prisma.OperationInventoryWhereUniqueInput | Prisma.OperationInventoryWhereUniqueInput[];
    connect?: Prisma.OperationInventoryWhereUniqueInput | Prisma.OperationInventoryWhereUniqueInput[];
    update?: Prisma.OperationInventoryUpdateWithWhereUniqueWithoutOperationInput | Prisma.OperationInventoryUpdateWithWhereUniqueWithoutOperationInput[];
    updateMany?: Prisma.OperationInventoryUpdateManyWithWhereWithoutOperationInput | Prisma.OperationInventoryUpdateManyWithWhereWithoutOperationInput[];
    deleteMany?: Prisma.OperationInventoryScalarWhereInput | Prisma.OperationInventoryScalarWhereInput[];
};
export type OperationInventoryUncheckedUpdateManyWithoutOperationNestedInput = {
    create?: Prisma.XOR<Prisma.OperationInventoryCreateWithoutOperationInput, Prisma.OperationInventoryUncheckedCreateWithoutOperationInput> | Prisma.OperationInventoryCreateWithoutOperationInput[] | Prisma.OperationInventoryUncheckedCreateWithoutOperationInput[];
    connectOrCreate?: Prisma.OperationInventoryCreateOrConnectWithoutOperationInput | Prisma.OperationInventoryCreateOrConnectWithoutOperationInput[];
    upsert?: Prisma.OperationInventoryUpsertWithWhereUniqueWithoutOperationInput | Prisma.OperationInventoryUpsertWithWhereUniqueWithoutOperationInput[];
    createMany?: Prisma.OperationInventoryCreateManyOperationInputEnvelope;
    set?: Prisma.OperationInventoryWhereUniqueInput | Prisma.OperationInventoryWhereUniqueInput[];
    disconnect?: Prisma.OperationInventoryWhereUniqueInput | Prisma.OperationInventoryWhereUniqueInput[];
    delete?: Prisma.OperationInventoryWhereUniqueInput | Prisma.OperationInventoryWhereUniqueInput[];
    connect?: Prisma.OperationInventoryWhereUniqueInput | Prisma.OperationInventoryWhereUniqueInput[];
    update?: Prisma.OperationInventoryUpdateWithWhereUniqueWithoutOperationInput | Prisma.OperationInventoryUpdateWithWhereUniqueWithoutOperationInput[];
    updateMany?: Prisma.OperationInventoryUpdateManyWithWhereWithoutOperationInput | Prisma.OperationInventoryUpdateManyWithWhereWithoutOperationInput[];
    deleteMany?: Prisma.OperationInventoryScalarWhereInput | Prisma.OperationInventoryScalarWhereInput[];
};
export type OperationInventoryCreateNestedManyWithoutItemInput = {
    create?: Prisma.XOR<Prisma.OperationInventoryCreateWithoutItemInput, Prisma.OperationInventoryUncheckedCreateWithoutItemInput> | Prisma.OperationInventoryCreateWithoutItemInput[] | Prisma.OperationInventoryUncheckedCreateWithoutItemInput[];
    connectOrCreate?: Prisma.OperationInventoryCreateOrConnectWithoutItemInput | Prisma.OperationInventoryCreateOrConnectWithoutItemInput[];
    createMany?: Prisma.OperationInventoryCreateManyItemInputEnvelope;
    connect?: Prisma.OperationInventoryWhereUniqueInput | Prisma.OperationInventoryWhereUniqueInput[];
};
export type OperationInventoryUncheckedCreateNestedManyWithoutItemInput = {
    create?: Prisma.XOR<Prisma.OperationInventoryCreateWithoutItemInput, Prisma.OperationInventoryUncheckedCreateWithoutItemInput> | Prisma.OperationInventoryCreateWithoutItemInput[] | Prisma.OperationInventoryUncheckedCreateWithoutItemInput[];
    connectOrCreate?: Prisma.OperationInventoryCreateOrConnectWithoutItemInput | Prisma.OperationInventoryCreateOrConnectWithoutItemInput[];
    createMany?: Prisma.OperationInventoryCreateManyItemInputEnvelope;
    connect?: Prisma.OperationInventoryWhereUniqueInput | Prisma.OperationInventoryWhereUniqueInput[];
};
export type OperationInventoryUpdateManyWithoutItemNestedInput = {
    create?: Prisma.XOR<Prisma.OperationInventoryCreateWithoutItemInput, Prisma.OperationInventoryUncheckedCreateWithoutItemInput> | Prisma.OperationInventoryCreateWithoutItemInput[] | Prisma.OperationInventoryUncheckedCreateWithoutItemInput[];
    connectOrCreate?: Prisma.OperationInventoryCreateOrConnectWithoutItemInput | Prisma.OperationInventoryCreateOrConnectWithoutItemInput[];
    upsert?: Prisma.OperationInventoryUpsertWithWhereUniqueWithoutItemInput | Prisma.OperationInventoryUpsertWithWhereUniqueWithoutItemInput[];
    createMany?: Prisma.OperationInventoryCreateManyItemInputEnvelope;
    set?: Prisma.OperationInventoryWhereUniqueInput | Prisma.OperationInventoryWhereUniqueInput[];
    disconnect?: Prisma.OperationInventoryWhereUniqueInput | Prisma.OperationInventoryWhereUniqueInput[];
    delete?: Prisma.OperationInventoryWhereUniqueInput | Prisma.OperationInventoryWhereUniqueInput[];
    connect?: Prisma.OperationInventoryWhereUniqueInput | Prisma.OperationInventoryWhereUniqueInput[];
    update?: Prisma.OperationInventoryUpdateWithWhereUniqueWithoutItemInput | Prisma.OperationInventoryUpdateWithWhereUniqueWithoutItemInput[];
    updateMany?: Prisma.OperationInventoryUpdateManyWithWhereWithoutItemInput | Prisma.OperationInventoryUpdateManyWithWhereWithoutItemInput[];
    deleteMany?: Prisma.OperationInventoryScalarWhereInput | Prisma.OperationInventoryScalarWhereInput[];
};
export type OperationInventoryUncheckedUpdateManyWithoutItemNestedInput = {
    create?: Prisma.XOR<Prisma.OperationInventoryCreateWithoutItemInput, Prisma.OperationInventoryUncheckedCreateWithoutItemInput> | Prisma.OperationInventoryCreateWithoutItemInput[] | Prisma.OperationInventoryUncheckedCreateWithoutItemInput[];
    connectOrCreate?: Prisma.OperationInventoryCreateOrConnectWithoutItemInput | Prisma.OperationInventoryCreateOrConnectWithoutItemInput[];
    upsert?: Prisma.OperationInventoryUpsertWithWhereUniqueWithoutItemInput | Prisma.OperationInventoryUpsertWithWhereUniqueWithoutItemInput[];
    createMany?: Prisma.OperationInventoryCreateManyItemInputEnvelope;
    set?: Prisma.OperationInventoryWhereUniqueInput | Prisma.OperationInventoryWhereUniqueInput[];
    disconnect?: Prisma.OperationInventoryWhereUniqueInput | Prisma.OperationInventoryWhereUniqueInput[];
    delete?: Prisma.OperationInventoryWhereUniqueInput | Prisma.OperationInventoryWhereUniqueInput[];
    connect?: Prisma.OperationInventoryWhereUniqueInput | Prisma.OperationInventoryWhereUniqueInput[];
    update?: Prisma.OperationInventoryUpdateWithWhereUniqueWithoutItemInput | Prisma.OperationInventoryUpdateWithWhereUniqueWithoutItemInput[];
    updateMany?: Prisma.OperationInventoryUpdateManyWithWhereWithoutItemInput | Prisma.OperationInventoryUpdateManyWithWhereWithoutItemInput[];
    deleteMany?: Prisma.OperationInventoryScalarWhereInput | Prisma.OperationInventoryScalarWhereInput[];
};
export type OperationInventoryCreateWithoutOperationInput = {
    quantity: number;
    item: Prisma.InventoryItemCreateNestedOneWithoutOperationItemsInput;
};
export type OperationInventoryUncheckedCreateWithoutOperationInput = {
    item_id: string;
    quantity: number;
};
export type OperationInventoryCreateOrConnectWithoutOperationInput = {
    where: Prisma.OperationInventoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.OperationInventoryCreateWithoutOperationInput, Prisma.OperationInventoryUncheckedCreateWithoutOperationInput>;
};
export type OperationInventoryCreateManyOperationInputEnvelope = {
    data: Prisma.OperationInventoryCreateManyOperationInput | Prisma.OperationInventoryCreateManyOperationInput[];
    skipDuplicates?: boolean;
};
export type OperationInventoryUpsertWithWhereUniqueWithoutOperationInput = {
    where: Prisma.OperationInventoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.OperationInventoryUpdateWithoutOperationInput, Prisma.OperationInventoryUncheckedUpdateWithoutOperationInput>;
    create: Prisma.XOR<Prisma.OperationInventoryCreateWithoutOperationInput, Prisma.OperationInventoryUncheckedCreateWithoutOperationInput>;
};
export type OperationInventoryUpdateWithWhereUniqueWithoutOperationInput = {
    where: Prisma.OperationInventoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.OperationInventoryUpdateWithoutOperationInput, Prisma.OperationInventoryUncheckedUpdateWithoutOperationInput>;
};
export type OperationInventoryUpdateManyWithWhereWithoutOperationInput = {
    where: Prisma.OperationInventoryScalarWhereInput;
    data: Prisma.XOR<Prisma.OperationInventoryUpdateManyMutationInput, Prisma.OperationInventoryUncheckedUpdateManyWithoutOperationInput>;
};
export type OperationInventoryScalarWhereInput = {
    AND?: Prisma.OperationInventoryScalarWhereInput | Prisma.OperationInventoryScalarWhereInput[];
    OR?: Prisma.OperationInventoryScalarWhereInput[];
    NOT?: Prisma.OperationInventoryScalarWhereInput | Prisma.OperationInventoryScalarWhereInput[];
    operation_id?: Prisma.StringFilter<"OperationInventory"> | string;
    item_id?: Prisma.StringFilter<"OperationInventory"> | string;
    quantity?: Prisma.IntFilter<"OperationInventory"> | number;
};
export type OperationInventoryCreateWithoutItemInput = {
    quantity: number;
    operation: Prisma.OperationLogCreateNestedOneWithoutInventoryItemsInput;
};
export type OperationInventoryUncheckedCreateWithoutItemInput = {
    operation_id: string;
    quantity: number;
};
export type OperationInventoryCreateOrConnectWithoutItemInput = {
    where: Prisma.OperationInventoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.OperationInventoryCreateWithoutItemInput, Prisma.OperationInventoryUncheckedCreateWithoutItemInput>;
};
export type OperationInventoryCreateManyItemInputEnvelope = {
    data: Prisma.OperationInventoryCreateManyItemInput | Prisma.OperationInventoryCreateManyItemInput[];
    skipDuplicates?: boolean;
};
export type OperationInventoryUpsertWithWhereUniqueWithoutItemInput = {
    where: Prisma.OperationInventoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.OperationInventoryUpdateWithoutItemInput, Prisma.OperationInventoryUncheckedUpdateWithoutItemInput>;
    create: Prisma.XOR<Prisma.OperationInventoryCreateWithoutItemInput, Prisma.OperationInventoryUncheckedCreateWithoutItemInput>;
};
export type OperationInventoryUpdateWithWhereUniqueWithoutItemInput = {
    where: Prisma.OperationInventoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.OperationInventoryUpdateWithoutItemInput, Prisma.OperationInventoryUncheckedUpdateWithoutItemInput>;
};
export type OperationInventoryUpdateManyWithWhereWithoutItemInput = {
    where: Prisma.OperationInventoryScalarWhereInput;
    data: Prisma.XOR<Prisma.OperationInventoryUpdateManyMutationInput, Prisma.OperationInventoryUncheckedUpdateManyWithoutItemInput>;
};
export type OperationInventoryCreateManyOperationInput = {
    item_id: string;
    quantity: number;
};
export type OperationInventoryUpdateWithoutOperationInput = {
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    item?: Prisma.InventoryItemUpdateOneRequiredWithoutOperationItemsNestedInput;
};
export type OperationInventoryUncheckedUpdateWithoutOperationInput = {
    item_id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type OperationInventoryUncheckedUpdateManyWithoutOperationInput = {
    item_id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type OperationInventoryCreateManyItemInput = {
    operation_id: string;
    quantity: number;
};
export type OperationInventoryUpdateWithoutItemInput = {
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    operation?: Prisma.OperationLogUpdateOneRequiredWithoutInventoryItemsNestedInput;
};
export type OperationInventoryUncheckedUpdateWithoutItemInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type OperationInventoryUncheckedUpdateManyWithoutItemInput = {
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type OperationInventorySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    operation_id?: boolean;
    item_id?: boolean;
    quantity?: boolean;
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.InventoryItemDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["operationInventory"]>;
export type OperationInventorySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    operation_id?: boolean;
    item_id?: boolean;
    quantity?: boolean;
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.InventoryItemDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["operationInventory"]>;
export type OperationInventorySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    operation_id?: boolean;
    item_id?: boolean;
    quantity?: boolean;
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.InventoryItemDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["operationInventory"]>;
export type OperationInventorySelectScalar = {
    operation_id?: boolean;
    item_id?: boolean;
    quantity?: boolean;
};
export type OperationInventoryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"operation_id" | "item_id" | "quantity", ExtArgs["result"]["operationInventory"]>;
export type OperationInventoryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.InventoryItemDefaultArgs<ExtArgs>;
};
export type OperationInventoryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.InventoryItemDefaultArgs<ExtArgs>;
};
export type OperationInventoryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.InventoryItemDefaultArgs<ExtArgs>;
};
export type $OperationInventoryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "OperationInventory";
    objects: {
        operation: Prisma.$OperationLogPayload<ExtArgs>;
        item: Prisma.$InventoryItemPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        operation_id: string;
        item_id: string;
        quantity: number;
    }, ExtArgs["result"]["operationInventory"]>;
    composites: {};
};
export type OperationInventoryGetPayload<S extends boolean | null | undefined | OperationInventoryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OperationInventoryPayload, S>;
export type OperationInventoryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OperationInventoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OperationInventoryCountAggregateInputType | true;
};
export interface OperationInventoryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['OperationInventory'];
        meta: {
            name: 'OperationInventory';
        };
    };
    /**
     * Find zero or one OperationInventory that matches the filter.
     * @param {OperationInventoryFindUniqueArgs} args - Arguments to find a OperationInventory
     * @example
     * // Get one OperationInventory
     * const operationInventory = await prisma.operationInventory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OperationInventoryFindUniqueArgs>(args: Prisma.SelectSubset<T, OperationInventoryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OperationInventoryClient<runtime.Types.Result.GetResult<Prisma.$OperationInventoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one OperationInventory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OperationInventoryFindUniqueOrThrowArgs} args - Arguments to find a OperationInventory
     * @example
     * // Get one OperationInventory
     * const operationInventory = await prisma.operationInventory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OperationInventoryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OperationInventoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OperationInventoryClient<runtime.Types.Result.GetResult<Prisma.$OperationInventoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first OperationInventory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationInventoryFindFirstArgs} args - Arguments to find a OperationInventory
     * @example
     * // Get one OperationInventory
     * const operationInventory = await prisma.operationInventory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OperationInventoryFindFirstArgs>(args?: Prisma.SelectSubset<T, OperationInventoryFindFirstArgs<ExtArgs>>): Prisma.Prisma__OperationInventoryClient<runtime.Types.Result.GetResult<Prisma.$OperationInventoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first OperationInventory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationInventoryFindFirstOrThrowArgs} args - Arguments to find a OperationInventory
     * @example
     * // Get one OperationInventory
     * const operationInventory = await prisma.operationInventory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OperationInventoryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OperationInventoryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OperationInventoryClient<runtime.Types.Result.GetResult<Prisma.$OperationInventoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more OperationInventories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationInventoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OperationInventories
     * const operationInventories = await prisma.operationInventory.findMany()
     *
     * // Get first 10 OperationInventories
     * const operationInventories = await prisma.operationInventory.findMany({ take: 10 })
     *
     * // Only select the `operation_id`
     * const operationInventoryWithOperation_idOnly = await prisma.operationInventory.findMany({ select: { operation_id: true } })
     *
     */
    findMany<T extends OperationInventoryFindManyArgs>(args?: Prisma.SelectSubset<T, OperationInventoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OperationInventoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a OperationInventory.
     * @param {OperationInventoryCreateArgs} args - Arguments to create a OperationInventory.
     * @example
     * // Create one OperationInventory
     * const OperationInventory = await prisma.operationInventory.create({
     *   data: {
     *     // ... data to create a OperationInventory
     *   }
     * })
     *
     */
    create<T extends OperationInventoryCreateArgs>(args: Prisma.SelectSubset<T, OperationInventoryCreateArgs<ExtArgs>>): Prisma.Prisma__OperationInventoryClient<runtime.Types.Result.GetResult<Prisma.$OperationInventoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many OperationInventories.
     * @param {OperationInventoryCreateManyArgs} args - Arguments to create many OperationInventories.
     * @example
     * // Create many OperationInventories
     * const operationInventory = await prisma.operationInventory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends OperationInventoryCreateManyArgs>(args?: Prisma.SelectSubset<T, OperationInventoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many OperationInventories and returns the data saved in the database.
     * @param {OperationInventoryCreateManyAndReturnArgs} args - Arguments to create many OperationInventories.
     * @example
     * // Create many OperationInventories
     * const operationInventory = await prisma.operationInventory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many OperationInventories and only return the `operation_id`
     * const operationInventoryWithOperation_idOnly = await prisma.operationInventory.createManyAndReturn({
     *   select: { operation_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends OperationInventoryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OperationInventoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OperationInventoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a OperationInventory.
     * @param {OperationInventoryDeleteArgs} args - Arguments to delete one OperationInventory.
     * @example
     * // Delete one OperationInventory
     * const OperationInventory = await prisma.operationInventory.delete({
     *   where: {
     *     // ... filter to delete one OperationInventory
     *   }
     * })
     *
     */
    delete<T extends OperationInventoryDeleteArgs>(args: Prisma.SelectSubset<T, OperationInventoryDeleteArgs<ExtArgs>>): Prisma.Prisma__OperationInventoryClient<runtime.Types.Result.GetResult<Prisma.$OperationInventoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one OperationInventory.
     * @param {OperationInventoryUpdateArgs} args - Arguments to update one OperationInventory.
     * @example
     * // Update one OperationInventory
     * const operationInventory = await prisma.operationInventory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends OperationInventoryUpdateArgs>(args: Prisma.SelectSubset<T, OperationInventoryUpdateArgs<ExtArgs>>): Prisma.Prisma__OperationInventoryClient<runtime.Types.Result.GetResult<Prisma.$OperationInventoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more OperationInventories.
     * @param {OperationInventoryDeleteManyArgs} args - Arguments to filter OperationInventories to delete.
     * @example
     * // Delete a few OperationInventories
     * const { count } = await prisma.operationInventory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends OperationInventoryDeleteManyArgs>(args?: Prisma.SelectSubset<T, OperationInventoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more OperationInventories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationInventoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OperationInventories
     * const operationInventory = await prisma.operationInventory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends OperationInventoryUpdateManyArgs>(args: Prisma.SelectSubset<T, OperationInventoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more OperationInventories and returns the data updated in the database.
     * @param {OperationInventoryUpdateManyAndReturnArgs} args - Arguments to update many OperationInventories.
     * @example
     * // Update many OperationInventories
     * const operationInventory = await prisma.operationInventory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more OperationInventories and only return the `operation_id`
     * const operationInventoryWithOperation_idOnly = await prisma.operationInventory.updateManyAndReturn({
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
    updateManyAndReturn<T extends OperationInventoryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OperationInventoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OperationInventoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one OperationInventory.
     * @param {OperationInventoryUpsertArgs} args - Arguments to update or create a OperationInventory.
     * @example
     * // Update or create a OperationInventory
     * const operationInventory = await prisma.operationInventory.upsert({
     *   create: {
     *     // ... data to create a OperationInventory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OperationInventory we want to update
     *   }
     * })
     */
    upsert<T extends OperationInventoryUpsertArgs>(args: Prisma.SelectSubset<T, OperationInventoryUpsertArgs<ExtArgs>>): Prisma.Prisma__OperationInventoryClient<runtime.Types.Result.GetResult<Prisma.$OperationInventoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of OperationInventories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationInventoryCountArgs} args - Arguments to filter OperationInventories to count.
     * @example
     * // Count the number of OperationInventories
     * const count = await prisma.operationInventory.count({
     *   where: {
     *     // ... the filter for the OperationInventories we want to count
     *   }
     * })
    **/
    count<T extends OperationInventoryCountArgs>(args?: Prisma.Subset<T, OperationInventoryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OperationInventoryCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a OperationInventory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationInventoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OperationInventoryAggregateArgs>(args: Prisma.Subset<T, OperationInventoryAggregateArgs>): Prisma.PrismaPromise<GetOperationInventoryAggregateType<T>>;
    /**
     * Group by OperationInventory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationInventoryGroupByArgs} args - Group by arguments.
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
    groupBy<T extends OperationInventoryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OperationInventoryGroupByArgs['orderBy'];
    } : {
        orderBy?: OperationInventoryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OperationInventoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOperationInventoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the OperationInventory model
     */
    readonly fields: OperationInventoryFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for OperationInventory.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__OperationInventoryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    operation<T extends Prisma.OperationLogDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OperationLogDefaultArgs<ExtArgs>>): Prisma.Prisma__OperationLogClient<runtime.Types.Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    item<T extends Prisma.InventoryItemDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.InventoryItemDefaultArgs<ExtArgs>>): Prisma.Prisma__InventoryItemClient<runtime.Types.Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the OperationInventory model
 */
export interface OperationInventoryFieldRefs {
    readonly operation_id: Prisma.FieldRef<"OperationInventory", 'String'>;
    readonly item_id: Prisma.FieldRef<"OperationInventory", 'String'>;
    readonly quantity: Prisma.FieldRef<"OperationInventory", 'Int'>;
}
/**
 * OperationInventory findUnique
 */
export type OperationInventoryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OperationInventory to fetch.
     */
    where: Prisma.OperationInventoryWhereUniqueInput;
};
/**
 * OperationInventory findUniqueOrThrow
 */
export type OperationInventoryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OperationInventory to fetch.
     */
    where: Prisma.OperationInventoryWhereUniqueInput;
};
/**
 * OperationInventory findFirst
 */
export type OperationInventoryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OperationInventory to fetch.
     */
    where?: Prisma.OperationInventoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OperationInventories to fetch.
     */
    orderBy?: Prisma.OperationInventoryOrderByWithRelationInput | Prisma.OperationInventoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OperationInventories.
     */
    cursor?: Prisma.OperationInventoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OperationInventories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OperationInventories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OperationInventories.
     */
    distinct?: Prisma.OperationInventoryScalarFieldEnum | Prisma.OperationInventoryScalarFieldEnum[];
};
/**
 * OperationInventory findFirstOrThrow
 */
export type OperationInventoryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OperationInventory to fetch.
     */
    where?: Prisma.OperationInventoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OperationInventories to fetch.
     */
    orderBy?: Prisma.OperationInventoryOrderByWithRelationInput | Prisma.OperationInventoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OperationInventories.
     */
    cursor?: Prisma.OperationInventoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OperationInventories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OperationInventories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OperationInventories.
     */
    distinct?: Prisma.OperationInventoryScalarFieldEnum | Prisma.OperationInventoryScalarFieldEnum[];
};
/**
 * OperationInventory findMany
 */
export type OperationInventoryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OperationInventories to fetch.
     */
    where?: Prisma.OperationInventoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OperationInventories to fetch.
     */
    orderBy?: Prisma.OperationInventoryOrderByWithRelationInput | Prisma.OperationInventoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing OperationInventories.
     */
    cursor?: Prisma.OperationInventoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OperationInventories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OperationInventories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OperationInventories.
     */
    distinct?: Prisma.OperationInventoryScalarFieldEnum | Prisma.OperationInventoryScalarFieldEnum[];
};
/**
 * OperationInventory create
 */
export type OperationInventoryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a OperationInventory.
     */
    data: Prisma.XOR<Prisma.OperationInventoryCreateInput, Prisma.OperationInventoryUncheckedCreateInput>;
};
/**
 * OperationInventory createMany
 */
export type OperationInventoryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many OperationInventories.
     */
    data: Prisma.OperationInventoryCreateManyInput | Prisma.OperationInventoryCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * OperationInventory createManyAndReturn
 */
export type OperationInventoryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationInventory
     */
    select?: Prisma.OperationInventorySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the OperationInventory
     */
    omit?: Prisma.OperationInventoryOmit<ExtArgs> | null;
    /**
     * The data used to create many OperationInventories.
     */
    data: Prisma.OperationInventoryCreateManyInput | Prisma.OperationInventoryCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OperationInventoryIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * OperationInventory update
 */
export type OperationInventoryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a OperationInventory.
     */
    data: Prisma.XOR<Prisma.OperationInventoryUpdateInput, Prisma.OperationInventoryUncheckedUpdateInput>;
    /**
     * Choose, which OperationInventory to update.
     */
    where: Prisma.OperationInventoryWhereUniqueInput;
};
/**
 * OperationInventory updateMany
 */
export type OperationInventoryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update OperationInventories.
     */
    data: Prisma.XOR<Prisma.OperationInventoryUpdateManyMutationInput, Prisma.OperationInventoryUncheckedUpdateManyInput>;
    /**
     * Filter which OperationInventories to update
     */
    where?: Prisma.OperationInventoryWhereInput;
    /**
     * Limit how many OperationInventories to update.
     */
    limit?: number;
};
/**
 * OperationInventory updateManyAndReturn
 */
export type OperationInventoryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationInventory
     */
    select?: Prisma.OperationInventorySelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the OperationInventory
     */
    omit?: Prisma.OperationInventoryOmit<ExtArgs> | null;
    /**
     * The data used to update OperationInventories.
     */
    data: Prisma.XOR<Prisma.OperationInventoryUpdateManyMutationInput, Prisma.OperationInventoryUncheckedUpdateManyInput>;
    /**
     * Filter which OperationInventories to update
     */
    where?: Prisma.OperationInventoryWhereInput;
    /**
     * Limit how many OperationInventories to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OperationInventoryIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * OperationInventory upsert
 */
export type OperationInventoryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the OperationInventory to update in case it exists.
     */
    where: Prisma.OperationInventoryWhereUniqueInput;
    /**
     * In case the OperationInventory found by the `where` argument doesn't exist, create a new OperationInventory with this data.
     */
    create: Prisma.XOR<Prisma.OperationInventoryCreateInput, Prisma.OperationInventoryUncheckedCreateInput>;
    /**
     * In case the OperationInventory was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.OperationInventoryUpdateInput, Prisma.OperationInventoryUncheckedUpdateInput>;
};
/**
 * OperationInventory delete
 */
export type OperationInventoryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which OperationInventory to delete.
     */
    where: Prisma.OperationInventoryWhereUniqueInput;
};
/**
 * OperationInventory deleteMany
 */
export type OperationInventoryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which OperationInventories to delete
     */
    where?: Prisma.OperationInventoryWhereInput;
    /**
     * Limit how many OperationInventories to delete.
     */
    limit?: number;
};
/**
 * OperationInventory without action
 */
export type OperationInventoryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=OperationInventory.d.ts.map