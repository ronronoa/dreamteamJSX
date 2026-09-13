import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model InventoryItem
 *
 */
export type InventoryItemModel = runtime.Types.Result.DefaultSelection<Prisma.$InventoryItemPayload>;
export type AggregateInventoryItem = {
    _count: InventoryItemCountAggregateOutputType | null;
    _avg: InventoryItemAvgAggregateOutputType | null;
    _sum: InventoryItemSumAggregateOutputType | null;
    _min: InventoryItemMinAggregateOutputType | null;
    _max: InventoryItemMaxAggregateOutputType | null;
};
export type InventoryItemAvgAggregateOutputType = {
    stock_quantity: number | null;
};
export type InventoryItemSumAggregateOutputType = {
    stock_quantity: number | null;
};
export type InventoryItemMinAggregateOutputType = {
    item_id: string | null;
    item_name: string | null;
    category: string | null;
    unit: string | null;
    stock_quantity: number | null;
    stock_type: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type InventoryItemMaxAggregateOutputType = {
    item_id: string | null;
    item_name: string | null;
    category: string | null;
    unit: string | null;
    stock_quantity: number | null;
    stock_type: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type InventoryItemCountAggregateOutputType = {
    item_id: number;
    item_name: number;
    category: number;
    unit: number;
    stock_quantity: number;
    stock_type: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type InventoryItemAvgAggregateInputType = {
    stock_quantity?: true;
};
export type InventoryItemSumAggregateInputType = {
    stock_quantity?: true;
};
export type InventoryItemMinAggregateInputType = {
    item_id?: true;
    item_name?: true;
    category?: true;
    unit?: true;
    stock_quantity?: true;
    stock_type?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type InventoryItemMaxAggregateInputType = {
    item_id?: true;
    item_name?: true;
    category?: true;
    unit?: true;
    stock_quantity?: true;
    stock_type?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type InventoryItemCountAggregateInputType = {
    item_id?: true;
    item_name?: true;
    category?: true;
    unit?: true;
    stock_quantity?: true;
    stock_type?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type InventoryItemAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which InventoryItem to aggregate.
     */
    where?: Prisma.InventoryItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of InventoryItems to fetch.
     */
    orderBy?: Prisma.InventoryItemOrderByWithRelationInput | Prisma.InventoryItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.InventoryItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` InventoryItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` InventoryItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned InventoryItems
    **/
    _count?: true | InventoryItemCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: InventoryItemAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: InventoryItemSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: InventoryItemMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: InventoryItemMaxAggregateInputType;
};
export type GetInventoryItemAggregateType<T extends InventoryItemAggregateArgs> = {
    [P in keyof T & keyof AggregateInventoryItem]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateInventoryItem[P]> : Prisma.GetScalarType<T[P], AggregateInventoryItem[P]>;
};
export type InventoryItemGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InventoryItemWhereInput;
    orderBy?: Prisma.InventoryItemOrderByWithAggregationInput | Prisma.InventoryItemOrderByWithAggregationInput[];
    by: Prisma.InventoryItemScalarFieldEnum[] | Prisma.InventoryItemScalarFieldEnum;
    having?: Prisma.InventoryItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InventoryItemCountAggregateInputType | true;
    _avg?: InventoryItemAvgAggregateInputType;
    _sum?: InventoryItemSumAggregateInputType;
    _min?: InventoryItemMinAggregateInputType;
    _max?: InventoryItemMaxAggregateInputType;
};
export type InventoryItemGroupByOutputType = {
    item_id: string;
    item_name: string;
    category: string;
    unit: string;
    stock_quantity: number;
    stock_type: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: InventoryItemCountAggregateOutputType | null;
    _avg: InventoryItemAvgAggregateOutputType | null;
    _sum: InventoryItemSumAggregateOutputType | null;
    _min: InventoryItemMinAggregateOutputType | null;
    _max: InventoryItemMaxAggregateOutputType | null;
};
export type GetInventoryItemGroupByPayload<T extends InventoryItemGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<InventoryItemGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof InventoryItemGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], InventoryItemGroupByOutputType[P]> : Prisma.GetScalarType<T[P], InventoryItemGroupByOutputType[P]>;
}>>;
export type InventoryItemWhereInput = {
    AND?: Prisma.InventoryItemWhereInput | Prisma.InventoryItemWhereInput[];
    OR?: Prisma.InventoryItemWhereInput[];
    NOT?: Prisma.InventoryItemWhereInput | Prisma.InventoryItemWhereInput[];
    item_id?: Prisma.StringFilter<"InventoryItem"> | string;
    item_name?: Prisma.StringFilter<"InventoryItem"> | string;
    category?: Prisma.StringFilter<"InventoryItem"> | string;
    unit?: Prisma.StringFilter<"InventoryItem"> | string;
    stock_quantity?: Prisma.IntFilter<"InventoryItem"> | number;
    stock_type?: Prisma.StringNullableFilter<"InventoryItem"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"InventoryItem"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"InventoryItem"> | Date | string;
    transactions?: Prisma.InventoryTransactionListRelationFilter;
    operationItems?: Prisma.OperationInventoryListRelationFilter;
    archive?: Prisma.XOR<Prisma.InventoryArchiveNullableScalarRelationFilter, Prisma.InventoryArchiveWhereInput> | null;
};
export type InventoryItemOrderByWithRelationInput = {
    item_id?: Prisma.SortOrder;
    item_name?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    unit?: Prisma.SortOrder;
    stock_quantity?: Prisma.SortOrder;
    stock_type?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    transactions?: Prisma.InventoryTransactionOrderByRelationAggregateInput;
    operationItems?: Prisma.OperationInventoryOrderByRelationAggregateInput;
    archive?: Prisma.InventoryArchiveOrderByWithRelationInput;
};
export type InventoryItemWhereUniqueInput = Prisma.AtLeast<{
    item_id?: string;
    AND?: Prisma.InventoryItemWhereInput | Prisma.InventoryItemWhereInput[];
    OR?: Prisma.InventoryItemWhereInput[];
    NOT?: Prisma.InventoryItemWhereInput | Prisma.InventoryItemWhereInput[];
    item_name?: Prisma.StringFilter<"InventoryItem"> | string;
    category?: Prisma.StringFilter<"InventoryItem"> | string;
    unit?: Prisma.StringFilter<"InventoryItem"> | string;
    stock_quantity?: Prisma.IntFilter<"InventoryItem"> | number;
    stock_type?: Prisma.StringNullableFilter<"InventoryItem"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"InventoryItem"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"InventoryItem"> | Date | string;
    transactions?: Prisma.InventoryTransactionListRelationFilter;
    operationItems?: Prisma.OperationInventoryListRelationFilter;
    archive?: Prisma.XOR<Prisma.InventoryArchiveNullableScalarRelationFilter, Prisma.InventoryArchiveWhereInput> | null;
}, "item_id">;
export type InventoryItemOrderByWithAggregationInput = {
    item_id?: Prisma.SortOrder;
    item_name?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    unit?: Prisma.SortOrder;
    stock_quantity?: Prisma.SortOrder;
    stock_type?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.InventoryItemCountOrderByAggregateInput;
    _avg?: Prisma.InventoryItemAvgOrderByAggregateInput;
    _max?: Prisma.InventoryItemMaxOrderByAggregateInput;
    _min?: Prisma.InventoryItemMinOrderByAggregateInput;
    _sum?: Prisma.InventoryItemSumOrderByAggregateInput;
};
export type InventoryItemScalarWhereWithAggregatesInput = {
    AND?: Prisma.InventoryItemScalarWhereWithAggregatesInput | Prisma.InventoryItemScalarWhereWithAggregatesInput[];
    OR?: Prisma.InventoryItemScalarWhereWithAggregatesInput[];
    NOT?: Prisma.InventoryItemScalarWhereWithAggregatesInput | Prisma.InventoryItemScalarWhereWithAggregatesInput[];
    item_id?: Prisma.StringWithAggregatesFilter<"InventoryItem"> | string;
    item_name?: Prisma.StringWithAggregatesFilter<"InventoryItem"> | string;
    category?: Prisma.StringWithAggregatesFilter<"InventoryItem"> | string;
    unit?: Prisma.StringWithAggregatesFilter<"InventoryItem"> | string;
    stock_quantity?: Prisma.IntWithAggregatesFilter<"InventoryItem"> | number;
    stock_type?: Prisma.StringNullableWithAggregatesFilter<"InventoryItem"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"InventoryItem"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"InventoryItem"> | Date | string;
};
export type InventoryItemCreateInput = {
    item_id?: string;
    item_name: string;
    category: string;
    unit: string;
    stock_quantity?: number;
    stock_type?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    transactions?: Prisma.InventoryTransactionCreateNestedManyWithoutItemInput;
    operationItems?: Prisma.OperationInventoryCreateNestedManyWithoutItemInput;
    archive?: Prisma.InventoryArchiveCreateNestedOneWithoutItemInput;
};
export type InventoryItemUncheckedCreateInput = {
    item_id?: string;
    item_name: string;
    category: string;
    unit: string;
    stock_quantity?: number;
    stock_type?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    transactions?: Prisma.InventoryTransactionUncheckedCreateNestedManyWithoutItemInput;
    operationItems?: Prisma.OperationInventoryUncheckedCreateNestedManyWithoutItemInput;
    archive?: Prisma.InventoryArchiveUncheckedCreateNestedOneWithoutItemInput;
};
export type InventoryItemUpdateInput = {
    item_id?: Prisma.StringFieldUpdateOperationsInput | string;
    item_name?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    unit?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    stock_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transactions?: Prisma.InventoryTransactionUpdateManyWithoutItemNestedInput;
    operationItems?: Prisma.OperationInventoryUpdateManyWithoutItemNestedInput;
    archive?: Prisma.InventoryArchiveUpdateOneWithoutItemNestedInput;
};
export type InventoryItemUncheckedUpdateInput = {
    item_id?: Prisma.StringFieldUpdateOperationsInput | string;
    item_name?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    unit?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    stock_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transactions?: Prisma.InventoryTransactionUncheckedUpdateManyWithoutItemNestedInput;
    operationItems?: Prisma.OperationInventoryUncheckedUpdateManyWithoutItemNestedInput;
    archive?: Prisma.InventoryArchiveUncheckedUpdateOneWithoutItemNestedInput;
};
export type InventoryItemCreateManyInput = {
    item_id?: string;
    item_name: string;
    category: string;
    unit: string;
    stock_quantity?: number;
    stock_type?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type InventoryItemUpdateManyMutationInput = {
    item_id?: Prisma.StringFieldUpdateOperationsInput | string;
    item_name?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    unit?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    stock_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InventoryItemUncheckedUpdateManyInput = {
    item_id?: Prisma.StringFieldUpdateOperationsInput | string;
    item_name?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    unit?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    stock_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InventoryItemCountOrderByAggregateInput = {
    item_id?: Prisma.SortOrder;
    item_name?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    unit?: Prisma.SortOrder;
    stock_quantity?: Prisma.SortOrder;
    stock_type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type InventoryItemAvgOrderByAggregateInput = {
    stock_quantity?: Prisma.SortOrder;
};
export type InventoryItemMaxOrderByAggregateInput = {
    item_id?: Prisma.SortOrder;
    item_name?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    unit?: Prisma.SortOrder;
    stock_quantity?: Prisma.SortOrder;
    stock_type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type InventoryItemMinOrderByAggregateInput = {
    item_id?: Prisma.SortOrder;
    item_name?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    unit?: Prisma.SortOrder;
    stock_quantity?: Prisma.SortOrder;
    stock_type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type InventoryItemSumOrderByAggregateInput = {
    stock_quantity?: Prisma.SortOrder;
};
export type InventoryItemScalarRelationFilter = {
    is?: Prisma.InventoryItemWhereInput;
    isNot?: Prisma.InventoryItemWhereInput;
};
export type InventoryItemCreateNestedOneWithoutTransactionsInput = {
    create?: Prisma.XOR<Prisma.InventoryItemCreateWithoutTransactionsInput, Prisma.InventoryItemUncheckedCreateWithoutTransactionsInput>;
    connectOrCreate?: Prisma.InventoryItemCreateOrConnectWithoutTransactionsInput;
    connect?: Prisma.InventoryItemWhereUniqueInput;
};
export type InventoryItemUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: Prisma.XOR<Prisma.InventoryItemCreateWithoutTransactionsInput, Prisma.InventoryItemUncheckedCreateWithoutTransactionsInput>;
    connectOrCreate?: Prisma.InventoryItemCreateOrConnectWithoutTransactionsInput;
    upsert?: Prisma.InventoryItemUpsertWithoutTransactionsInput;
    connect?: Prisma.InventoryItemWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.InventoryItemUpdateToOneWithWhereWithoutTransactionsInput, Prisma.InventoryItemUpdateWithoutTransactionsInput>, Prisma.InventoryItemUncheckedUpdateWithoutTransactionsInput>;
};
export type InventoryItemCreateNestedOneWithoutOperationItemsInput = {
    create?: Prisma.XOR<Prisma.InventoryItemCreateWithoutOperationItemsInput, Prisma.InventoryItemUncheckedCreateWithoutOperationItemsInput>;
    connectOrCreate?: Prisma.InventoryItemCreateOrConnectWithoutOperationItemsInput;
    connect?: Prisma.InventoryItemWhereUniqueInput;
};
export type InventoryItemUpdateOneRequiredWithoutOperationItemsNestedInput = {
    create?: Prisma.XOR<Prisma.InventoryItemCreateWithoutOperationItemsInput, Prisma.InventoryItemUncheckedCreateWithoutOperationItemsInput>;
    connectOrCreate?: Prisma.InventoryItemCreateOrConnectWithoutOperationItemsInput;
    upsert?: Prisma.InventoryItemUpsertWithoutOperationItemsInput;
    connect?: Prisma.InventoryItemWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.InventoryItemUpdateToOneWithWhereWithoutOperationItemsInput, Prisma.InventoryItemUpdateWithoutOperationItemsInput>, Prisma.InventoryItemUncheckedUpdateWithoutOperationItemsInput>;
};
export type InventoryItemCreateNestedOneWithoutArchiveInput = {
    create?: Prisma.XOR<Prisma.InventoryItemCreateWithoutArchiveInput, Prisma.InventoryItemUncheckedCreateWithoutArchiveInput>;
    connectOrCreate?: Prisma.InventoryItemCreateOrConnectWithoutArchiveInput;
    connect?: Prisma.InventoryItemWhereUniqueInput;
};
export type InventoryItemUpdateOneRequiredWithoutArchiveNestedInput = {
    create?: Prisma.XOR<Prisma.InventoryItemCreateWithoutArchiveInput, Prisma.InventoryItemUncheckedCreateWithoutArchiveInput>;
    connectOrCreate?: Prisma.InventoryItemCreateOrConnectWithoutArchiveInput;
    upsert?: Prisma.InventoryItemUpsertWithoutArchiveInput;
    connect?: Prisma.InventoryItemWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.InventoryItemUpdateToOneWithWhereWithoutArchiveInput, Prisma.InventoryItemUpdateWithoutArchiveInput>, Prisma.InventoryItemUncheckedUpdateWithoutArchiveInput>;
};
export type InventoryItemCreateWithoutTransactionsInput = {
    item_id?: string;
    item_name: string;
    category: string;
    unit: string;
    stock_quantity?: number;
    stock_type?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    operationItems?: Prisma.OperationInventoryCreateNestedManyWithoutItemInput;
    archive?: Prisma.InventoryArchiveCreateNestedOneWithoutItemInput;
};
export type InventoryItemUncheckedCreateWithoutTransactionsInput = {
    item_id?: string;
    item_name: string;
    category: string;
    unit: string;
    stock_quantity?: number;
    stock_type?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    operationItems?: Prisma.OperationInventoryUncheckedCreateNestedManyWithoutItemInput;
    archive?: Prisma.InventoryArchiveUncheckedCreateNestedOneWithoutItemInput;
};
export type InventoryItemCreateOrConnectWithoutTransactionsInput = {
    where: Prisma.InventoryItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.InventoryItemCreateWithoutTransactionsInput, Prisma.InventoryItemUncheckedCreateWithoutTransactionsInput>;
};
export type InventoryItemUpsertWithoutTransactionsInput = {
    update: Prisma.XOR<Prisma.InventoryItemUpdateWithoutTransactionsInput, Prisma.InventoryItemUncheckedUpdateWithoutTransactionsInput>;
    create: Prisma.XOR<Prisma.InventoryItemCreateWithoutTransactionsInput, Prisma.InventoryItemUncheckedCreateWithoutTransactionsInput>;
    where?: Prisma.InventoryItemWhereInput;
};
export type InventoryItemUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: Prisma.InventoryItemWhereInput;
    data: Prisma.XOR<Prisma.InventoryItemUpdateWithoutTransactionsInput, Prisma.InventoryItemUncheckedUpdateWithoutTransactionsInput>;
};
export type InventoryItemUpdateWithoutTransactionsInput = {
    item_id?: Prisma.StringFieldUpdateOperationsInput | string;
    item_name?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    unit?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    stock_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    operationItems?: Prisma.OperationInventoryUpdateManyWithoutItemNestedInput;
    archive?: Prisma.InventoryArchiveUpdateOneWithoutItemNestedInput;
};
export type InventoryItemUncheckedUpdateWithoutTransactionsInput = {
    item_id?: Prisma.StringFieldUpdateOperationsInput | string;
    item_name?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    unit?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    stock_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    operationItems?: Prisma.OperationInventoryUncheckedUpdateManyWithoutItemNestedInput;
    archive?: Prisma.InventoryArchiveUncheckedUpdateOneWithoutItemNestedInput;
};
export type InventoryItemCreateWithoutOperationItemsInput = {
    item_id?: string;
    item_name: string;
    category: string;
    unit: string;
    stock_quantity?: number;
    stock_type?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    transactions?: Prisma.InventoryTransactionCreateNestedManyWithoutItemInput;
    archive?: Prisma.InventoryArchiveCreateNestedOneWithoutItemInput;
};
export type InventoryItemUncheckedCreateWithoutOperationItemsInput = {
    item_id?: string;
    item_name: string;
    category: string;
    unit: string;
    stock_quantity?: number;
    stock_type?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    transactions?: Prisma.InventoryTransactionUncheckedCreateNestedManyWithoutItemInput;
    archive?: Prisma.InventoryArchiveUncheckedCreateNestedOneWithoutItemInput;
};
export type InventoryItemCreateOrConnectWithoutOperationItemsInput = {
    where: Prisma.InventoryItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.InventoryItemCreateWithoutOperationItemsInput, Prisma.InventoryItemUncheckedCreateWithoutOperationItemsInput>;
};
export type InventoryItemUpsertWithoutOperationItemsInput = {
    update: Prisma.XOR<Prisma.InventoryItemUpdateWithoutOperationItemsInput, Prisma.InventoryItemUncheckedUpdateWithoutOperationItemsInput>;
    create: Prisma.XOR<Prisma.InventoryItemCreateWithoutOperationItemsInput, Prisma.InventoryItemUncheckedCreateWithoutOperationItemsInput>;
    where?: Prisma.InventoryItemWhereInput;
};
export type InventoryItemUpdateToOneWithWhereWithoutOperationItemsInput = {
    where?: Prisma.InventoryItemWhereInput;
    data: Prisma.XOR<Prisma.InventoryItemUpdateWithoutOperationItemsInput, Prisma.InventoryItemUncheckedUpdateWithoutOperationItemsInput>;
};
export type InventoryItemUpdateWithoutOperationItemsInput = {
    item_id?: Prisma.StringFieldUpdateOperationsInput | string;
    item_name?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    unit?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    stock_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transactions?: Prisma.InventoryTransactionUpdateManyWithoutItemNestedInput;
    archive?: Prisma.InventoryArchiveUpdateOneWithoutItemNestedInput;
};
export type InventoryItemUncheckedUpdateWithoutOperationItemsInput = {
    item_id?: Prisma.StringFieldUpdateOperationsInput | string;
    item_name?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    unit?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    stock_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transactions?: Prisma.InventoryTransactionUncheckedUpdateManyWithoutItemNestedInput;
    archive?: Prisma.InventoryArchiveUncheckedUpdateOneWithoutItemNestedInput;
};
export type InventoryItemCreateWithoutArchiveInput = {
    item_id?: string;
    item_name: string;
    category: string;
    unit: string;
    stock_quantity?: number;
    stock_type?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    transactions?: Prisma.InventoryTransactionCreateNestedManyWithoutItemInput;
    operationItems?: Prisma.OperationInventoryCreateNestedManyWithoutItemInput;
};
export type InventoryItemUncheckedCreateWithoutArchiveInput = {
    item_id?: string;
    item_name: string;
    category: string;
    unit: string;
    stock_quantity?: number;
    stock_type?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    transactions?: Prisma.InventoryTransactionUncheckedCreateNestedManyWithoutItemInput;
    operationItems?: Prisma.OperationInventoryUncheckedCreateNestedManyWithoutItemInput;
};
export type InventoryItemCreateOrConnectWithoutArchiveInput = {
    where: Prisma.InventoryItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.InventoryItemCreateWithoutArchiveInput, Prisma.InventoryItemUncheckedCreateWithoutArchiveInput>;
};
export type InventoryItemUpsertWithoutArchiveInput = {
    update: Prisma.XOR<Prisma.InventoryItemUpdateWithoutArchiveInput, Prisma.InventoryItemUncheckedUpdateWithoutArchiveInput>;
    create: Prisma.XOR<Prisma.InventoryItemCreateWithoutArchiveInput, Prisma.InventoryItemUncheckedCreateWithoutArchiveInput>;
    where?: Prisma.InventoryItemWhereInput;
};
export type InventoryItemUpdateToOneWithWhereWithoutArchiveInput = {
    where?: Prisma.InventoryItemWhereInput;
    data: Prisma.XOR<Prisma.InventoryItemUpdateWithoutArchiveInput, Prisma.InventoryItemUncheckedUpdateWithoutArchiveInput>;
};
export type InventoryItemUpdateWithoutArchiveInput = {
    item_id?: Prisma.StringFieldUpdateOperationsInput | string;
    item_name?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    unit?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    stock_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transactions?: Prisma.InventoryTransactionUpdateManyWithoutItemNestedInput;
    operationItems?: Prisma.OperationInventoryUpdateManyWithoutItemNestedInput;
};
export type InventoryItemUncheckedUpdateWithoutArchiveInput = {
    item_id?: Prisma.StringFieldUpdateOperationsInput | string;
    item_name?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    unit?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    stock_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transactions?: Prisma.InventoryTransactionUncheckedUpdateManyWithoutItemNestedInput;
    operationItems?: Prisma.OperationInventoryUncheckedUpdateManyWithoutItemNestedInput;
};
/**
 * Count Type InventoryItemCountOutputType
 */
export type InventoryItemCountOutputType = {
    transactions: number;
    operationItems: number;
};
export type InventoryItemCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    transactions?: boolean | InventoryItemCountOutputTypeCountTransactionsArgs;
    operationItems?: boolean | InventoryItemCountOutputTypeCountOperationItemsArgs;
};
/**
 * InventoryItemCountOutputType without action
 */
export type InventoryItemCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItemCountOutputType
     */
    select?: Prisma.InventoryItemCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * InventoryItemCountOutputType without action
 */
export type InventoryItemCountOutputTypeCountTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InventoryTransactionWhereInput;
};
/**
 * InventoryItemCountOutputType without action
 */
export type InventoryItemCountOutputTypeCountOperationItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OperationInventoryWhereInput;
};
export type InventoryItemSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    item_id?: boolean;
    item_name?: boolean;
    category?: boolean;
    unit?: boolean;
    stock_quantity?: boolean;
    stock_type?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    transactions?: boolean | Prisma.InventoryItem$transactionsArgs<ExtArgs>;
    operationItems?: boolean | Prisma.InventoryItem$operationItemsArgs<ExtArgs>;
    archive?: boolean | Prisma.InventoryItem$archiveArgs<ExtArgs>;
    _count?: boolean | Prisma.InventoryItemCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["inventoryItem"]>;
export type InventoryItemSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    item_id?: boolean;
    item_name?: boolean;
    category?: boolean;
    unit?: boolean;
    stock_quantity?: boolean;
    stock_type?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["inventoryItem"]>;
export type InventoryItemSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    item_id?: boolean;
    item_name?: boolean;
    category?: boolean;
    unit?: boolean;
    stock_quantity?: boolean;
    stock_type?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["inventoryItem"]>;
export type InventoryItemSelectScalar = {
    item_id?: boolean;
    item_name?: boolean;
    category?: boolean;
    unit?: boolean;
    stock_quantity?: boolean;
    stock_type?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type InventoryItemOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"item_id" | "item_name" | "category" | "unit" | "stock_quantity" | "stock_type" | "createdAt" | "updatedAt", ExtArgs["result"]["inventoryItem"]>;
export type InventoryItemInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    transactions?: boolean | Prisma.InventoryItem$transactionsArgs<ExtArgs>;
    operationItems?: boolean | Prisma.InventoryItem$operationItemsArgs<ExtArgs>;
    archive?: boolean | Prisma.InventoryItem$archiveArgs<ExtArgs>;
    _count?: boolean | Prisma.InventoryItemCountOutputTypeDefaultArgs<ExtArgs>;
};
export type InventoryItemIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type InventoryItemIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $InventoryItemPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "InventoryItem";
    objects: {
        transactions: Prisma.$InventoryTransactionPayload<ExtArgs>[];
        operationItems: Prisma.$OperationInventoryPayload<ExtArgs>[];
        archive: Prisma.$InventoryArchivePayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        item_id: string;
        item_name: string;
        category: string;
        unit: string;
        stock_quantity: number;
        stock_type: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["inventoryItem"]>;
    composites: {};
};
export type InventoryItemGetPayload<S extends boolean | null | undefined | InventoryItemDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$InventoryItemPayload, S>;
export type InventoryItemCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<InventoryItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: InventoryItemCountAggregateInputType | true;
};
export interface InventoryItemDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['InventoryItem'];
        meta: {
            name: 'InventoryItem';
        };
    };
    /**
     * Find zero or one InventoryItem that matches the filter.
     * @param {InventoryItemFindUniqueArgs} args - Arguments to find a InventoryItem
     * @example
     * // Get one InventoryItem
     * const inventoryItem = await prisma.inventoryItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InventoryItemFindUniqueArgs>(args: Prisma.SelectSubset<T, InventoryItemFindUniqueArgs<ExtArgs>>): Prisma.Prisma__InventoryItemClient<runtime.Types.Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one InventoryItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InventoryItemFindUniqueOrThrowArgs} args - Arguments to find a InventoryItem
     * @example
     * // Get one InventoryItem
     * const inventoryItem = await prisma.inventoryItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InventoryItemFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, InventoryItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__InventoryItemClient<runtime.Types.Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first InventoryItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemFindFirstArgs} args - Arguments to find a InventoryItem
     * @example
     * // Get one InventoryItem
     * const inventoryItem = await prisma.inventoryItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InventoryItemFindFirstArgs>(args?: Prisma.SelectSubset<T, InventoryItemFindFirstArgs<ExtArgs>>): Prisma.Prisma__InventoryItemClient<runtime.Types.Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first InventoryItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemFindFirstOrThrowArgs} args - Arguments to find a InventoryItem
     * @example
     * // Get one InventoryItem
     * const inventoryItem = await prisma.inventoryItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InventoryItemFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, InventoryItemFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__InventoryItemClient<runtime.Types.Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more InventoryItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InventoryItems
     * const inventoryItems = await prisma.inventoryItem.findMany()
     *
     * // Get first 10 InventoryItems
     * const inventoryItems = await prisma.inventoryItem.findMany({ take: 10 })
     *
     * // Only select the `item_id`
     * const inventoryItemWithItem_idOnly = await prisma.inventoryItem.findMany({ select: { item_id: true } })
     *
     */
    findMany<T extends InventoryItemFindManyArgs>(args?: Prisma.SelectSubset<T, InventoryItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a InventoryItem.
     * @param {InventoryItemCreateArgs} args - Arguments to create a InventoryItem.
     * @example
     * // Create one InventoryItem
     * const InventoryItem = await prisma.inventoryItem.create({
     *   data: {
     *     // ... data to create a InventoryItem
     *   }
     * })
     *
     */
    create<T extends InventoryItemCreateArgs>(args: Prisma.SelectSubset<T, InventoryItemCreateArgs<ExtArgs>>): Prisma.Prisma__InventoryItemClient<runtime.Types.Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many InventoryItems.
     * @param {InventoryItemCreateManyArgs} args - Arguments to create many InventoryItems.
     * @example
     * // Create many InventoryItems
     * const inventoryItem = await prisma.inventoryItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends InventoryItemCreateManyArgs>(args?: Prisma.SelectSubset<T, InventoryItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many InventoryItems and returns the data saved in the database.
     * @param {InventoryItemCreateManyAndReturnArgs} args - Arguments to create many InventoryItems.
     * @example
     * // Create many InventoryItems
     * const inventoryItem = await prisma.inventoryItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many InventoryItems and only return the `item_id`
     * const inventoryItemWithItem_idOnly = await prisma.inventoryItem.createManyAndReturn({
     *   select: { item_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends InventoryItemCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, InventoryItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a InventoryItem.
     * @param {InventoryItemDeleteArgs} args - Arguments to delete one InventoryItem.
     * @example
     * // Delete one InventoryItem
     * const InventoryItem = await prisma.inventoryItem.delete({
     *   where: {
     *     // ... filter to delete one InventoryItem
     *   }
     * })
     *
     */
    delete<T extends InventoryItemDeleteArgs>(args: Prisma.SelectSubset<T, InventoryItemDeleteArgs<ExtArgs>>): Prisma.Prisma__InventoryItemClient<runtime.Types.Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one InventoryItem.
     * @param {InventoryItemUpdateArgs} args - Arguments to update one InventoryItem.
     * @example
     * // Update one InventoryItem
     * const inventoryItem = await prisma.inventoryItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends InventoryItemUpdateArgs>(args: Prisma.SelectSubset<T, InventoryItemUpdateArgs<ExtArgs>>): Prisma.Prisma__InventoryItemClient<runtime.Types.Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more InventoryItems.
     * @param {InventoryItemDeleteManyArgs} args - Arguments to filter InventoryItems to delete.
     * @example
     * // Delete a few InventoryItems
     * const { count } = await prisma.inventoryItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends InventoryItemDeleteManyArgs>(args?: Prisma.SelectSubset<T, InventoryItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more InventoryItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InventoryItems
     * const inventoryItem = await prisma.inventoryItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends InventoryItemUpdateManyArgs>(args: Prisma.SelectSubset<T, InventoryItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more InventoryItems and returns the data updated in the database.
     * @param {InventoryItemUpdateManyAndReturnArgs} args - Arguments to update many InventoryItems.
     * @example
     * // Update many InventoryItems
     * const inventoryItem = await prisma.inventoryItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more InventoryItems and only return the `item_id`
     * const inventoryItemWithItem_idOnly = await prisma.inventoryItem.updateManyAndReturn({
     *   select: { item_id: true },
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
    updateManyAndReturn<T extends InventoryItemUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, InventoryItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one InventoryItem.
     * @param {InventoryItemUpsertArgs} args - Arguments to update or create a InventoryItem.
     * @example
     * // Update or create a InventoryItem
     * const inventoryItem = await prisma.inventoryItem.upsert({
     *   create: {
     *     // ... data to create a InventoryItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InventoryItem we want to update
     *   }
     * })
     */
    upsert<T extends InventoryItemUpsertArgs>(args: Prisma.SelectSubset<T, InventoryItemUpsertArgs<ExtArgs>>): Prisma.Prisma__InventoryItemClient<runtime.Types.Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of InventoryItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemCountArgs} args - Arguments to filter InventoryItems to count.
     * @example
     * // Count the number of InventoryItems
     * const count = await prisma.inventoryItem.count({
     *   where: {
     *     // ... the filter for the InventoryItems we want to count
     *   }
     * })
    **/
    count<T extends InventoryItemCountArgs>(args?: Prisma.Subset<T, InventoryItemCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], InventoryItemCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a InventoryItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends InventoryItemAggregateArgs>(args: Prisma.Subset<T, InventoryItemAggregateArgs>): Prisma.PrismaPromise<GetInventoryItemAggregateType<T>>;
    /**
     * Group by InventoryItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemGroupByArgs} args - Group by arguments.
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
    groupBy<T extends InventoryItemGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: InventoryItemGroupByArgs['orderBy'];
    } : {
        orderBy?: InventoryItemGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, InventoryItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInventoryItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the InventoryItem model
     */
    readonly fields: InventoryItemFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for InventoryItem.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__InventoryItemClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    transactions<T extends Prisma.InventoryItem$transactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.InventoryItem$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InventoryTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    operationItems<T extends Prisma.InventoryItem$operationItemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.InventoryItem$operationItemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OperationInventoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    archive<T extends Prisma.InventoryItem$archiveArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.InventoryItem$archiveArgs<ExtArgs>>): Prisma.Prisma__InventoryArchiveClient<runtime.Types.Result.GetResult<Prisma.$InventoryArchivePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the InventoryItem model
 */
export interface InventoryItemFieldRefs {
    readonly item_id: Prisma.FieldRef<"InventoryItem", 'String'>;
    readonly item_name: Prisma.FieldRef<"InventoryItem", 'String'>;
    readonly category: Prisma.FieldRef<"InventoryItem", 'String'>;
    readonly unit: Prisma.FieldRef<"InventoryItem", 'String'>;
    readonly stock_quantity: Prisma.FieldRef<"InventoryItem", 'Int'>;
    readonly stock_type: Prisma.FieldRef<"InventoryItem", 'String'>;
    readonly createdAt: Prisma.FieldRef<"InventoryItem", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"InventoryItem", 'DateTime'>;
}
/**
 * InventoryItem findUnique
 */
export type InventoryItemFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: Prisma.InventoryItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the InventoryItem
     */
    omit?: Prisma.InventoryItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InventoryItemInclude<ExtArgs> | null;
    /**
     * Filter, which InventoryItem to fetch.
     */
    where: Prisma.InventoryItemWhereUniqueInput;
};
/**
 * InventoryItem findUniqueOrThrow
 */
export type InventoryItemFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: Prisma.InventoryItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the InventoryItem
     */
    omit?: Prisma.InventoryItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InventoryItemInclude<ExtArgs> | null;
    /**
     * Filter, which InventoryItem to fetch.
     */
    where: Prisma.InventoryItemWhereUniqueInput;
};
/**
 * InventoryItem findFirst
 */
export type InventoryItemFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: Prisma.InventoryItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the InventoryItem
     */
    omit?: Prisma.InventoryItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InventoryItemInclude<ExtArgs> | null;
    /**
     * Filter, which InventoryItem to fetch.
     */
    where?: Prisma.InventoryItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of InventoryItems to fetch.
     */
    orderBy?: Prisma.InventoryItemOrderByWithRelationInput | Prisma.InventoryItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for InventoryItems.
     */
    cursor?: Prisma.InventoryItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` InventoryItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` InventoryItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of InventoryItems.
     */
    distinct?: Prisma.InventoryItemScalarFieldEnum | Prisma.InventoryItemScalarFieldEnum[];
};
/**
 * InventoryItem findFirstOrThrow
 */
export type InventoryItemFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: Prisma.InventoryItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the InventoryItem
     */
    omit?: Prisma.InventoryItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InventoryItemInclude<ExtArgs> | null;
    /**
     * Filter, which InventoryItem to fetch.
     */
    where?: Prisma.InventoryItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of InventoryItems to fetch.
     */
    orderBy?: Prisma.InventoryItemOrderByWithRelationInput | Prisma.InventoryItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for InventoryItems.
     */
    cursor?: Prisma.InventoryItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` InventoryItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` InventoryItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of InventoryItems.
     */
    distinct?: Prisma.InventoryItemScalarFieldEnum | Prisma.InventoryItemScalarFieldEnum[];
};
/**
 * InventoryItem findMany
 */
export type InventoryItemFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: Prisma.InventoryItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the InventoryItem
     */
    omit?: Prisma.InventoryItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InventoryItemInclude<ExtArgs> | null;
    /**
     * Filter, which InventoryItems to fetch.
     */
    where?: Prisma.InventoryItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of InventoryItems to fetch.
     */
    orderBy?: Prisma.InventoryItemOrderByWithRelationInput | Prisma.InventoryItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing InventoryItems.
     */
    cursor?: Prisma.InventoryItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` InventoryItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` InventoryItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of InventoryItems.
     */
    distinct?: Prisma.InventoryItemScalarFieldEnum | Prisma.InventoryItemScalarFieldEnum[];
};
/**
 * InventoryItem create
 */
export type InventoryItemCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: Prisma.InventoryItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the InventoryItem
     */
    omit?: Prisma.InventoryItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InventoryItemInclude<ExtArgs> | null;
    /**
     * The data needed to create a InventoryItem.
     */
    data: Prisma.XOR<Prisma.InventoryItemCreateInput, Prisma.InventoryItemUncheckedCreateInput>;
};
/**
 * InventoryItem createMany
 */
export type InventoryItemCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many InventoryItems.
     */
    data: Prisma.InventoryItemCreateManyInput | Prisma.InventoryItemCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * InventoryItem createManyAndReturn
 */
export type InventoryItemCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: Prisma.InventoryItemSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the InventoryItem
     */
    omit?: Prisma.InventoryItemOmit<ExtArgs> | null;
    /**
     * The data used to create many InventoryItems.
     */
    data: Prisma.InventoryItemCreateManyInput | Prisma.InventoryItemCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * InventoryItem update
 */
export type InventoryItemUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: Prisma.InventoryItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the InventoryItem
     */
    omit?: Prisma.InventoryItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InventoryItemInclude<ExtArgs> | null;
    /**
     * The data needed to update a InventoryItem.
     */
    data: Prisma.XOR<Prisma.InventoryItemUpdateInput, Prisma.InventoryItemUncheckedUpdateInput>;
    /**
     * Choose, which InventoryItem to update.
     */
    where: Prisma.InventoryItemWhereUniqueInput;
};
/**
 * InventoryItem updateMany
 */
export type InventoryItemUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update InventoryItems.
     */
    data: Prisma.XOR<Prisma.InventoryItemUpdateManyMutationInput, Prisma.InventoryItemUncheckedUpdateManyInput>;
    /**
     * Filter which InventoryItems to update
     */
    where?: Prisma.InventoryItemWhereInput;
    /**
     * Limit how many InventoryItems to update.
     */
    limit?: number;
};
/**
 * InventoryItem updateManyAndReturn
 */
export type InventoryItemUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: Prisma.InventoryItemSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the InventoryItem
     */
    omit?: Prisma.InventoryItemOmit<ExtArgs> | null;
    /**
     * The data used to update InventoryItems.
     */
    data: Prisma.XOR<Prisma.InventoryItemUpdateManyMutationInput, Prisma.InventoryItemUncheckedUpdateManyInput>;
    /**
     * Filter which InventoryItems to update
     */
    where?: Prisma.InventoryItemWhereInput;
    /**
     * Limit how many InventoryItems to update.
     */
    limit?: number;
};
/**
 * InventoryItem upsert
 */
export type InventoryItemUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: Prisma.InventoryItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the InventoryItem
     */
    omit?: Prisma.InventoryItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InventoryItemInclude<ExtArgs> | null;
    /**
     * The filter to search for the InventoryItem to update in case it exists.
     */
    where: Prisma.InventoryItemWhereUniqueInput;
    /**
     * In case the InventoryItem found by the `where` argument doesn't exist, create a new InventoryItem with this data.
     */
    create: Prisma.XOR<Prisma.InventoryItemCreateInput, Prisma.InventoryItemUncheckedCreateInput>;
    /**
     * In case the InventoryItem was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.InventoryItemUpdateInput, Prisma.InventoryItemUncheckedUpdateInput>;
};
/**
 * InventoryItem delete
 */
export type InventoryItemDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: Prisma.InventoryItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the InventoryItem
     */
    omit?: Prisma.InventoryItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InventoryItemInclude<ExtArgs> | null;
    /**
     * Filter which InventoryItem to delete.
     */
    where: Prisma.InventoryItemWhereUniqueInput;
};
/**
 * InventoryItem deleteMany
 */
export type InventoryItemDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which InventoryItems to delete
     */
    where?: Prisma.InventoryItemWhereInput;
    /**
     * Limit how many InventoryItems to delete.
     */
    limit?: number;
};
/**
 * InventoryItem.transactions
 */
export type InventoryItem$transactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * InventoryItem.operationItems
 */
export type InventoryItem$operationItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * InventoryItem.archive
 */
export type InventoryItem$archiveArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
/**
 * InventoryItem without action
 */
export type InventoryItemDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: Prisma.InventoryItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the InventoryItem
     */
    omit?: Prisma.InventoryItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InventoryItemInclude<ExtArgs> | null;
};
//# sourceMappingURL=InventoryItem.d.ts.map