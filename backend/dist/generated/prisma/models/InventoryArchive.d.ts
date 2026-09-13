import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model InventoryArchive
 *
 */
export type InventoryArchiveModel = runtime.Types.Result.DefaultSelection<Prisma.$InventoryArchivePayload>;
export type AggregateInventoryArchive = {
    _count: InventoryArchiveCountAggregateOutputType | null;
    _min: InventoryArchiveMinAggregateOutputType | null;
    _max: InventoryArchiveMaxAggregateOutputType | null;
};
export type InventoryArchiveMinAggregateOutputType = {
    archive_id: string | null;
    item_id: string | null;
    archived_by: string | null;
    archivedAt: Date | null;
};
export type InventoryArchiveMaxAggregateOutputType = {
    archive_id: string | null;
    item_id: string | null;
    archived_by: string | null;
    archivedAt: Date | null;
};
export type InventoryArchiveCountAggregateOutputType = {
    archive_id: number;
    item_id: number;
    archived_by: number;
    archivedAt: number;
    _all: number;
};
export type InventoryArchiveMinAggregateInputType = {
    archive_id?: true;
    item_id?: true;
    archived_by?: true;
    archivedAt?: true;
};
export type InventoryArchiveMaxAggregateInputType = {
    archive_id?: true;
    item_id?: true;
    archived_by?: true;
    archivedAt?: true;
};
export type InventoryArchiveCountAggregateInputType = {
    archive_id?: true;
    item_id?: true;
    archived_by?: true;
    archivedAt?: true;
    _all?: true;
};
export type InventoryArchiveAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which InventoryArchive to aggregate.
     */
    where?: Prisma.InventoryArchiveWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of InventoryArchives to fetch.
     */
    orderBy?: Prisma.InventoryArchiveOrderByWithRelationInput | Prisma.InventoryArchiveOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.InventoryArchiveWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` InventoryArchives from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` InventoryArchives.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned InventoryArchives
    **/
    _count?: true | InventoryArchiveCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: InventoryArchiveMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: InventoryArchiveMaxAggregateInputType;
};
export type GetInventoryArchiveAggregateType<T extends InventoryArchiveAggregateArgs> = {
    [P in keyof T & keyof AggregateInventoryArchive]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateInventoryArchive[P]> : Prisma.GetScalarType<T[P], AggregateInventoryArchive[P]>;
};
export type InventoryArchiveGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InventoryArchiveWhereInput;
    orderBy?: Prisma.InventoryArchiveOrderByWithAggregationInput | Prisma.InventoryArchiveOrderByWithAggregationInput[];
    by: Prisma.InventoryArchiveScalarFieldEnum[] | Prisma.InventoryArchiveScalarFieldEnum;
    having?: Prisma.InventoryArchiveScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InventoryArchiveCountAggregateInputType | true;
    _min?: InventoryArchiveMinAggregateInputType;
    _max?: InventoryArchiveMaxAggregateInputType;
};
export type InventoryArchiveGroupByOutputType = {
    archive_id: string;
    item_id: string;
    archived_by: string;
    archivedAt: Date;
    _count: InventoryArchiveCountAggregateOutputType | null;
    _min: InventoryArchiveMinAggregateOutputType | null;
    _max: InventoryArchiveMaxAggregateOutputType | null;
};
export type GetInventoryArchiveGroupByPayload<T extends InventoryArchiveGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<InventoryArchiveGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof InventoryArchiveGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], InventoryArchiveGroupByOutputType[P]> : Prisma.GetScalarType<T[P], InventoryArchiveGroupByOutputType[P]>;
}>>;
export type InventoryArchiveWhereInput = {
    AND?: Prisma.InventoryArchiveWhereInput | Prisma.InventoryArchiveWhereInput[];
    OR?: Prisma.InventoryArchiveWhereInput[];
    NOT?: Prisma.InventoryArchiveWhereInput | Prisma.InventoryArchiveWhereInput[];
    archive_id?: Prisma.StringFilter<"InventoryArchive"> | string;
    item_id?: Prisma.StringFilter<"InventoryArchive"> | string;
    archived_by?: Prisma.StringFilter<"InventoryArchive"> | string;
    archivedAt?: Prisma.DateTimeFilter<"InventoryArchive"> | Date | string;
    item?: Prisma.XOR<Prisma.InventoryItemScalarRelationFilter, Prisma.InventoryItemWhereInput>;
    archiver?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type InventoryArchiveOrderByWithRelationInput = {
    archive_id?: Prisma.SortOrder;
    item_id?: Prisma.SortOrder;
    archived_by?: Prisma.SortOrder;
    archivedAt?: Prisma.SortOrder;
    item?: Prisma.InventoryItemOrderByWithRelationInput;
    archiver?: Prisma.UserOrderByWithRelationInput;
};
export type InventoryArchiveWhereUniqueInput = Prisma.AtLeast<{
    archive_id?: string;
    item_id?: string;
    AND?: Prisma.InventoryArchiveWhereInput | Prisma.InventoryArchiveWhereInput[];
    OR?: Prisma.InventoryArchiveWhereInput[];
    NOT?: Prisma.InventoryArchiveWhereInput | Prisma.InventoryArchiveWhereInput[];
    archived_by?: Prisma.StringFilter<"InventoryArchive"> | string;
    archivedAt?: Prisma.DateTimeFilter<"InventoryArchive"> | Date | string;
    item?: Prisma.XOR<Prisma.InventoryItemScalarRelationFilter, Prisma.InventoryItemWhereInput>;
    archiver?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "archive_id" | "item_id">;
export type InventoryArchiveOrderByWithAggregationInput = {
    archive_id?: Prisma.SortOrder;
    item_id?: Prisma.SortOrder;
    archived_by?: Prisma.SortOrder;
    archivedAt?: Prisma.SortOrder;
    _count?: Prisma.InventoryArchiveCountOrderByAggregateInput;
    _max?: Prisma.InventoryArchiveMaxOrderByAggregateInput;
    _min?: Prisma.InventoryArchiveMinOrderByAggregateInput;
};
export type InventoryArchiveScalarWhereWithAggregatesInput = {
    AND?: Prisma.InventoryArchiveScalarWhereWithAggregatesInput | Prisma.InventoryArchiveScalarWhereWithAggregatesInput[];
    OR?: Prisma.InventoryArchiveScalarWhereWithAggregatesInput[];
    NOT?: Prisma.InventoryArchiveScalarWhereWithAggregatesInput | Prisma.InventoryArchiveScalarWhereWithAggregatesInput[];
    archive_id?: Prisma.StringWithAggregatesFilter<"InventoryArchive"> | string;
    item_id?: Prisma.StringWithAggregatesFilter<"InventoryArchive"> | string;
    archived_by?: Prisma.StringWithAggregatesFilter<"InventoryArchive"> | string;
    archivedAt?: Prisma.DateTimeWithAggregatesFilter<"InventoryArchive"> | Date | string;
};
export type InventoryArchiveCreateInput = {
    archive_id?: string;
    archivedAt?: Date | string;
    item: Prisma.InventoryItemCreateNestedOneWithoutArchiveInput;
    archiver: Prisma.UserCreateNestedOneWithoutInventoryArchivesInput;
};
export type InventoryArchiveUncheckedCreateInput = {
    archive_id?: string;
    item_id: string;
    archived_by: string;
    archivedAt?: Date | string;
};
export type InventoryArchiveUpdateInput = {
    archive_id?: Prisma.StringFieldUpdateOperationsInput | string;
    archivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    item?: Prisma.InventoryItemUpdateOneRequiredWithoutArchiveNestedInput;
    archiver?: Prisma.UserUpdateOneRequiredWithoutInventoryArchivesNestedInput;
};
export type InventoryArchiveUncheckedUpdateInput = {
    archive_id?: Prisma.StringFieldUpdateOperationsInput | string;
    item_id?: Prisma.StringFieldUpdateOperationsInput | string;
    archived_by?: Prisma.StringFieldUpdateOperationsInput | string;
    archivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InventoryArchiveCreateManyInput = {
    archive_id?: string;
    item_id: string;
    archived_by: string;
    archivedAt?: Date | string;
};
export type InventoryArchiveUpdateManyMutationInput = {
    archive_id?: Prisma.StringFieldUpdateOperationsInput | string;
    archivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InventoryArchiveUncheckedUpdateManyInput = {
    archive_id?: Prisma.StringFieldUpdateOperationsInput | string;
    item_id?: Prisma.StringFieldUpdateOperationsInput | string;
    archived_by?: Prisma.StringFieldUpdateOperationsInput | string;
    archivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InventoryArchiveListRelationFilter = {
    every?: Prisma.InventoryArchiveWhereInput;
    some?: Prisma.InventoryArchiveWhereInput;
    none?: Prisma.InventoryArchiveWhereInput;
};
export type InventoryArchiveOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type InventoryArchiveNullableScalarRelationFilter = {
    is?: Prisma.InventoryArchiveWhereInput | null;
    isNot?: Prisma.InventoryArchiveWhereInput | null;
};
export type InventoryArchiveCountOrderByAggregateInput = {
    archive_id?: Prisma.SortOrder;
    item_id?: Prisma.SortOrder;
    archived_by?: Prisma.SortOrder;
    archivedAt?: Prisma.SortOrder;
};
export type InventoryArchiveMaxOrderByAggregateInput = {
    archive_id?: Prisma.SortOrder;
    item_id?: Prisma.SortOrder;
    archived_by?: Prisma.SortOrder;
    archivedAt?: Prisma.SortOrder;
};
export type InventoryArchiveMinOrderByAggregateInput = {
    archive_id?: Prisma.SortOrder;
    item_id?: Prisma.SortOrder;
    archived_by?: Prisma.SortOrder;
    archivedAt?: Prisma.SortOrder;
};
export type InventoryArchiveCreateNestedManyWithoutArchiverInput = {
    create?: Prisma.XOR<Prisma.InventoryArchiveCreateWithoutArchiverInput, Prisma.InventoryArchiveUncheckedCreateWithoutArchiverInput> | Prisma.InventoryArchiveCreateWithoutArchiverInput[] | Prisma.InventoryArchiveUncheckedCreateWithoutArchiverInput[];
    connectOrCreate?: Prisma.InventoryArchiveCreateOrConnectWithoutArchiverInput | Prisma.InventoryArchiveCreateOrConnectWithoutArchiverInput[];
    createMany?: Prisma.InventoryArchiveCreateManyArchiverInputEnvelope;
    connect?: Prisma.InventoryArchiveWhereUniqueInput | Prisma.InventoryArchiveWhereUniqueInput[];
};
export type InventoryArchiveUncheckedCreateNestedManyWithoutArchiverInput = {
    create?: Prisma.XOR<Prisma.InventoryArchiveCreateWithoutArchiverInput, Prisma.InventoryArchiveUncheckedCreateWithoutArchiverInput> | Prisma.InventoryArchiveCreateWithoutArchiverInput[] | Prisma.InventoryArchiveUncheckedCreateWithoutArchiverInput[];
    connectOrCreate?: Prisma.InventoryArchiveCreateOrConnectWithoutArchiverInput | Prisma.InventoryArchiveCreateOrConnectWithoutArchiverInput[];
    createMany?: Prisma.InventoryArchiveCreateManyArchiverInputEnvelope;
    connect?: Prisma.InventoryArchiveWhereUniqueInput | Prisma.InventoryArchiveWhereUniqueInput[];
};
export type InventoryArchiveUpdateManyWithoutArchiverNestedInput = {
    create?: Prisma.XOR<Prisma.InventoryArchiveCreateWithoutArchiverInput, Prisma.InventoryArchiveUncheckedCreateWithoutArchiverInput> | Prisma.InventoryArchiveCreateWithoutArchiverInput[] | Prisma.InventoryArchiveUncheckedCreateWithoutArchiverInput[];
    connectOrCreate?: Prisma.InventoryArchiveCreateOrConnectWithoutArchiverInput | Prisma.InventoryArchiveCreateOrConnectWithoutArchiverInput[];
    upsert?: Prisma.InventoryArchiveUpsertWithWhereUniqueWithoutArchiverInput | Prisma.InventoryArchiveUpsertWithWhereUniqueWithoutArchiverInput[];
    createMany?: Prisma.InventoryArchiveCreateManyArchiverInputEnvelope;
    set?: Prisma.InventoryArchiveWhereUniqueInput | Prisma.InventoryArchiveWhereUniqueInput[];
    disconnect?: Prisma.InventoryArchiveWhereUniqueInput | Prisma.InventoryArchiveWhereUniqueInput[];
    delete?: Prisma.InventoryArchiveWhereUniqueInput | Prisma.InventoryArchiveWhereUniqueInput[];
    connect?: Prisma.InventoryArchiveWhereUniqueInput | Prisma.InventoryArchiveWhereUniqueInput[];
    update?: Prisma.InventoryArchiveUpdateWithWhereUniqueWithoutArchiverInput | Prisma.InventoryArchiveUpdateWithWhereUniqueWithoutArchiverInput[];
    updateMany?: Prisma.InventoryArchiveUpdateManyWithWhereWithoutArchiverInput | Prisma.InventoryArchiveUpdateManyWithWhereWithoutArchiverInput[];
    deleteMany?: Prisma.InventoryArchiveScalarWhereInput | Prisma.InventoryArchiveScalarWhereInput[];
};
export type InventoryArchiveUncheckedUpdateManyWithoutArchiverNestedInput = {
    create?: Prisma.XOR<Prisma.InventoryArchiveCreateWithoutArchiverInput, Prisma.InventoryArchiveUncheckedCreateWithoutArchiverInput> | Prisma.InventoryArchiveCreateWithoutArchiverInput[] | Prisma.InventoryArchiveUncheckedCreateWithoutArchiverInput[];
    connectOrCreate?: Prisma.InventoryArchiveCreateOrConnectWithoutArchiverInput | Prisma.InventoryArchiveCreateOrConnectWithoutArchiverInput[];
    upsert?: Prisma.InventoryArchiveUpsertWithWhereUniqueWithoutArchiverInput | Prisma.InventoryArchiveUpsertWithWhereUniqueWithoutArchiverInput[];
    createMany?: Prisma.InventoryArchiveCreateManyArchiverInputEnvelope;
    set?: Prisma.InventoryArchiveWhereUniqueInput | Prisma.InventoryArchiveWhereUniqueInput[];
    disconnect?: Prisma.InventoryArchiveWhereUniqueInput | Prisma.InventoryArchiveWhereUniqueInput[];
    delete?: Prisma.InventoryArchiveWhereUniqueInput | Prisma.InventoryArchiveWhereUniqueInput[];
    connect?: Prisma.InventoryArchiveWhereUniqueInput | Prisma.InventoryArchiveWhereUniqueInput[];
    update?: Prisma.InventoryArchiveUpdateWithWhereUniqueWithoutArchiverInput | Prisma.InventoryArchiveUpdateWithWhereUniqueWithoutArchiverInput[];
    updateMany?: Prisma.InventoryArchiveUpdateManyWithWhereWithoutArchiverInput | Prisma.InventoryArchiveUpdateManyWithWhereWithoutArchiverInput[];
    deleteMany?: Prisma.InventoryArchiveScalarWhereInput | Prisma.InventoryArchiveScalarWhereInput[];
};
export type InventoryArchiveCreateNestedOneWithoutItemInput = {
    create?: Prisma.XOR<Prisma.InventoryArchiveCreateWithoutItemInput, Prisma.InventoryArchiveUncheckedCreateWithoutItemInput>;
    connectOrCreate?: Prisma.InventoryArchiveCreateOrConnectWithoutItemInput;
    connect?: Prisma.InventoryArchiveWhereUniqueInput;
};
export type InventoryArchiveUncheckedCreateNestedOneWithoutItemInput = {
    create?: Prisma.XOR<Prisma.InventoryArchiveCreateWithoutItemInput, Prisma.InventoryArchiveUncheckedCreateWithoutItemInput>;
    connectOrCreate?: Prisma.InventoryArchiveCreateOrConnectWithoutItemInput;
    connect?: Prisma.InventoryArchiveWhereUniqueInput;
};
export type InventoryArchiveUpdateOneWithoutItemNestedInput = {
    create?: Prisma.XOR<Prisma.InventoryArchiveCreateWithoutItemInput, Prisma.InventoryArchiveUncheckedCreateWithoutItemInput>;
    connectOrCreate?: Prisma.InventoryArchiveCreateOrConnectWithoutItemInput;
    upsert?: Prisma.InventoryArchiveUpsertWithoutItemInput;
    disconnect?: Prisma.InventoryArchiveWhereInput | boolean;
    delete?: Prisma.InventoryArchiveWhereInput | boolean;
    connect?: Prisma.InventoryArchiveWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.InventoryArchiveUpdateToOneWithWhereWithoutItemInput, Prisma.InventoryArchiveUpdateWithoutItemInput>, Prisma.InventoryArchiveUncheckedUpdateWithoutItemInput>;
};
export type InventoryArchiveUncheckedUpdateOneWithoutItemNestedInput = {
    create?: Prisma.XOR<Prisma.InventoryArchiveCreateWithoutItemInput, Prisma.InventoryArchiveUncheckedCreateWithoutItemInput>;
    connectOrCreate?: Prisma.InventoryArchiveCreateOrConnectWithoutItemInput;
    upsert?: Prisma.InventoryArchiveUpsertWithoutItemInput;
    disconnect?: Prisma.InventoryArchiveWhereInput | boolean;
    delete?: Prisma.InventoryArchiveWhereInput | boolean;
    connect?: Prisma.InventoryArchiveWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.InventoryArchiveUpdateToOneWithWhereWithoutItemInput, Prisma.InventoryArchiveUpdateWithoutItemInput>, Prisma.InventoryArchiveUncheckedUpdateWithoutItemInput>;
};
export type InventoryArchiveCreateWithoutArchiverInput = {
    archive_id?: string;
    archivedAt?: Date | string;
    item: Prisma.InventoryItemCreateNestedOneWithoutArchiveInput;
};
export type InventoryArchiveUncheckedCreateWithoutArchiverInput = {
    archive_id?: string;
    item_id: string;
    archivedAt?: Date | string;
};
export type InventoryArchiveCreateOrConnectWithoutArchiverInput = {
    where: Prisma.InventoryArchiveWhereUniqueInput;
    create: Prisma.XOR<Prisma.InventoryArchiveCreateWithoutArchiverInput, Prisma.InventoryArchiveUncheckedCreateWithoutArchiverInput>;
};
export type InventoryArchiveCreateManyArchiverInputEnvelope = {
    data: Prisma.InventoryArchiveCreateManyArchiverInput | Prisma.InventoryArchiveCreateManyArchiverInput[];
    skipDuplicates?: boolean;
};
export type InventoryArchiveUpsertWithWhereUniqueWithoutArchiverInput = {
    where: Prisma.InventoryArchiveWhereUniqueInput;
    update: Prisma.XOR<Prisma.InventoryArchiveUpdateWithoutArchiverInput, Prisma.InventoryArchiveUncheckedUpdateWithoutArchiverInput>;
    create: Prisma.XOR<Prisma.InventoryArchiveCreateWithoutArchiverInput, Prisma.InventoryArchiveUncheckedCreateWithoutArchiverInput>;
};
export type InventoryArchiveUpdateWithWhereUniqueWithoutArchiverInput = {
    where: Prisma.InventoryArchiveWhereUniqueInput;
    data: Prisma.XOR<Prisma.InventoryArchiveUpdateWithoutArchiverInput, Prisma.InventoryArchiveUncheckedUpdateWithoutArchiverInput>;
};
export type InventoryArchiveUpdateManyWithWhereWithoutArchiverInput = {
    where: Prisma.InventoryArchiveScalarWhereInput;
    data: Prisma.XOR<Prisma.InventoryArchiveUpdateManyMutationInput, Prisma.InventoryArchiveUncheckedUpdateManyWithoutArchiverInput>;
};
export type InventoryArchiveScalarWhereInput = {
    AND?: Prisma.InventoryArchiveScalarWhereInput | Prisma.InventoryArchiveScalarWhereInput[];
    OR?: Prisma.InventoryArchiveScalarWhereInput[];
    NOT?: Prisma.InventoryArchiveScalarWhereInput | Prisma.InventoryArchiveScalarWhereInput[];
    archive_id?: Prisma.StringFilter<"InventoryArchive"> | string;
    item_id?: Prisma.StringFilter<"InventoryArchive"> | string;
    archived_by?: Prisma.StringFilter<"InventoryArchive"> | string;
    archivedAt?: Prisma.DateTimeFilter<"InventoryArchive"> | Date | string;
};
export type InventoryArchiveCreateWithoutItemInput = {
    archive_id?: string;
    archivedAt?: Date | string;
    archiver: Prisma.UserCreateNestedOneWithoutInventoryArchivesInput;
};
export type InventoryArchiveUncheckedCreateWithoutItemInput = {
    archive_id?: string;
    archived_by: string;
    archivedAt?: Date | string;
};
export type InventoryArchiveCreateOrConnectWithoutItemInput = {
    where: Prisma.InventoryArchiveWhereUniqueInput;
    create: Prisma.XOR<Prisma.InventoryArchiveCreateWithoutItemInput, Prisma.InventoryArchiveUncheckedCreateWithoutItemInput>;
};
export type InventoryArchiveUpsertWithoutItemInput = {
    update: Prisma.XOR<Prisma.InventoryArchiveUpdateWithoutItemInput, Prisma.InventoryArchiveUncheckedUpdateWithoutItemInput>;
    create: Prisma.XOR<Prisma.InventoryArchiveCreateWithoutItemInput, Prisma.InventoryArchiveUncheckedCreateWithoutItemInput>;
    where?: Prisma.InventoryArchiveWhereInput;
};
export type InventoryArchiveUpdateToOneWithWhereWithoutItemInput = {
    where?: Prisma.InventoryArchiveWhereInput;
    data: Prisma.XOR<Prisma.InventoryArchiveUpdateWithoutItemInput, Prisma.InventoryArchiveUncheckedUpdateWithoutItemInput>;
};
export type InventoryArchiveUpdateWithoutItemInput = {
    archive_id?: Prisma.StringFieldUpdateOperationsInput | string;
    archivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    archiver?: Prisma.UserUpdateOneRequiredWithoutInventoryArchivesNestedInput;
};
export type InventoryArchiveUncheckedUpdateWithoutItemInput = {
    archive_id?: Prisma.StringFieldUpdateOperationsInput | string;
    archived_by?: Prisma.StringFieldUpdateOperationsInput | string;
    archivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InventoryArchiveCreateManyArchiverInput = {
    archive_id?: string;
    item_id: string;
    archivedAt?: Date | string;
};
export type InventoryArchiveUpdateWithoutArchiverInput = {
    archive_id?: Prisma.StringFieldUpdateOperationsInput | string;
    archivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    item?: Prisma.InventoryItemUpdateOneRequiredWithoutArchiveNestedInput;
};
export type InventoryArchiveUncheckedUpdateWithoutArchiverInput = {
    archive_id?: Prisma.StringFieldUpdateOperationsInput | string;
    item_id?: Prisma.StringFieldUpdateOperationsInput | string;
    archivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InventoryArchiveUncheckedUpdateManyWithoutArchiverInput = {
    archive_id?: Prisma.StringFieldUpdateOperationsInput | string;
    item_id?: Prisma.StringFieldUpdateOperationsInput | string;
    archivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InventoryArchiveSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    archive_id?: boolean;
    item_id?: boolean;
    archived_by?: boolean;
    archivedAt?: boolean;
    item?: boolean | Prisma.InventoryItemDefaultArgs<ExtArgs>;
    archiver?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["inventoryArchive"]>;
export type InventoryArchiveSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    archive_id?: boolean;
    item_id?: boolean;
    archived_by?: boolean;
    archivedAt?: boolean;
    item?: boolean | Prisma.InventoryItemDefaultArgs<ExtArgs>;
    archiver?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["inventoryArchive"]>;
export type InventoryArchiveSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    archive_id?: boolean;
    item_id?: boolean;
    archived_by?: boolean;
    archivedAt?: boolean;
    item?: boolean | Prisma.InventoryItemDefaultArgs<ExtArgs>;
    archiver?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["inventoryArchive"]>;
export type InventoryArchiveSelectScalar = {
    archive_id?: boolean;
    item_id?: boolean;
    archived_by?: boolean;
    archivedAt?: boolean;
};
export type InventoryArchiveOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"archive_id" | "item_id" | "archived_by" | "archivedAt", ExtArgs["result"]["inventoryArchive"]>;
export type InventoryArchiveInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    item?: boolean | Prisma.InventoryItemDefaultArgs<ExtArgs>;
    archiver?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type InventoryArchiveIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    item?: boolean | Prisma.InventoryItemDefaultArgs<ExtArgs>;
    archiver?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type InventoryArchiveIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    item?: boolean | Prisma.InventoryItemDefaultArgs<ExtArgs>;
    archiver?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $InventoryArchivePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "InventoryArchive";
    objects: {
        item: Prisma.$InventoryItemPayload<ExtArgs>;
        archiver: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        archive_id: string;
        item_id: string;
        archived_by: string;
        archivedAt: Date;
    }, ExtArgs["result"]["inventoryArchive"]>;
    composites: {};
};
export type InventoryArchiveGetPayload<S extends boolean | null | undefined | InventoryArchiveDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$InventoryArchivePayload, S>;
export type InventoryArchiveCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<InventoryArchiveFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: InventoryArchiveCountAggregateInputType | true;
};
export interface InventoryArchiveDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['InventoryArchive'];
        meta: {
            name: 'InventoryArchive';
        };
    };
    /**
     * Find zero or one InventoryArchive that matches the filter.
     * @param {InventoryArchiveFindUniqueArgs} args - Arguments to find a InventoryArchive
     * @example
     * // Get one InventoryArchive
     * const inventoryArchive = await prisma.inventoryArchive.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InventoryArchiveFindUniqueArgs>(args: Prisma.SelectSubset<T, InventoryArchiveFindUniqueArgs<ExtArgs>>): Prisma.Prisma__InventoryArchiveClient<runtime.Types.Result.GetResult<Prisma.$InventoryArchivePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one InventoryArchive that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InventoryArchiveFindUniqueOrThrowArgs} args - Arguments to find a InventoryArchive
     * @example
     * // Get one InventoryArchive
     * const inventoryArchive = await prisma.inventoryArchive.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InventoryArchiveFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, InventoryArchiveFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__InventoryArchiveClient<runtime.Types.Result.GetResult<Prisma.$InventoryArchivePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first InventoryArchive that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryArchiveFindFirstArgs} args - Arguments to find a InventoryArchive
     * @example
     * // Get one InventoryArchive
     * const inventoryArchive = await prisma.inventoryArchive.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InventoryArchiveFindFirstArgs>(args?: Prisma.SelectSubset<T, InventoryArchiveFindFirstArgs<ExtArgs>>): Prisma.Prisma__InventoryArchiveClient<runtime.Types.Result.GetResult<Prisma.$InventoryArchivePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first InventoryArchive that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryArchiveFindFirstOrThrowArgs} args - Arguments to find a InventoryArchive
     * @example
     * // Get one InventoryArchive
     * const inventoryArchive = await prisma.inventoryArchive.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InventoryArchiveFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, InventoryArchiveFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__InventoryArchiveClient<runtime.Types.Result.GetResult<Prisma.$InventoryArchivePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more InventoryArchives that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryArchiveFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InventoryArchives
     * const inventoryArchives = await prisma.inventoryArchive.findMany()
     *
     * // Get first 10 InventoryArchives
     * const inventoryArchives = await prisma.inventoryArchive.findMany({ take: 10 })
     *
     * // Only select the `archive_id`
     * const inventoryArchiveWithArchive_idOnly = await prisma.inventoryArchive.findMany({ select: { archive_id: true } })
     *
     */
    findMany<T extends InventoryArchiveFindManyArgs>(args?: Prisma.SelectSubset<T, InventoryArchiveFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InventoryArchivePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a InventoryArchive.
     * @param {InventoryArchiveCreateArgs} args - Arguments to create a InventoryArchive.
     * @example
     * // Create one InventoryArchive
     * const InventoryArchive = await prisma.inventoryArchive.create({
     *   data: {
     *     // ... data to create a InventoryArchive
     *   }
     * })
     *
     */
    create<T extends InventoryArchiveCreateArgs>(args: Prisma.SelectSubset<T, InventoryArchiveCreateArgs<ExtArgs>>): Prisma.Prisma__InventoryArchiveClient<runtime.Types.Result.GetResult<Prisma.$InventoryArchivePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many InventoryArchives.
     * @param {InventoryArchiveCreateManyArgs} args - Arguments to create many InventoryArchives.
     * @example
     * // Create many InventoryArchives
     * const inventoryArchive = await prisma.inventoryArchive.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends InventoryArchiveCreateManyArgs>(args?: Prisma.SelectSubset<T, InventoryArchiveCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many InventoryArchives and returns the data saved in the database.
     * @param {InventoryArchiveCreateManyAndReturnArgs} args - Arguments to create many InventoryArchives.
     * @example
     * // Create many InventoryArchives
     * const inventoryArchive = await prisma.inventoryArchive.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many InventoryArchives and only return the `archive_id`
     * const inventoryArchiveWithArchive_idOnly = await prisma.inventoryArchive.createManyAndReturn({
     *   select: { archive_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends InventoryArchiveCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, InventoryArchiveCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InventoryArchivePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a InventoryArchive.
     * @param {InventoryArchiveDeleteArgs} args - Arguments to delete one InventoryArchive.
     * @example
     * // Delete one InventoryArchive
     * const InventoryArchive = await prisma.inventoryArchive.delete({
     *   where: {
     *     // ... filter to delete one InventoryArchive
     *   }
     * })
     *
     */
    delete<T extends InventoryArchiveDeleteArgs>(args: Prisma.SelectSubset<T, InventoryArchiveDeleteArgs<ExtArgs>>): Prisma.Prisma__InventoryArchiveClient<runtime.Types.Result.GetResult<Prisma.$InventoryArchivePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one InventoryArchive.
     * @param {InventoryArchiveUpdateArgs} args - Arguments to update one InventoryArchive.
     * @example
     * // Update one InventoryArchive
     * const inventoryArchive = await prisma.inventoryArchive.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends InventoryArchiveUpdateArgs>(args: Prisma.SelectSubset<T, InventoryArchiveUpdateArgs<ExtArgs>>): Prisma.Prisma__InventoryArchiveClient<runtime.Types.Result.GetResult<Prisma.$InventoryArchivePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more InventoryArchives.
     * @param {InventoryArchiveDeleteManyArgs} args - Arguments to filter InventoryArchives to delete.
     * @example
     * // Delete a few InventoryArchives
     * const { count } = await prisma.inventoryArchive.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends InventoryArchiveDeleteManyArgs>(args?: Prisma.SelectSubset<T, InventoryArchiveDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more InventoryArchives.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryArchiveUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InventoryArchives
     * const inventoryArchive = await prisma.inventoryArchive.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends InventoryArchiveUpdateManyArgs>(args: Prisma.SelectSubset<T, InventoryArchiveUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more InventoryArchives and returns the data updated in the database.
     * @param {InventoryArchiveUpdateManyAndReturnArgs} args - Arguments to update many InventoryArchives.
     * @example
     * // Update many InventoryArchives
     * const inventoryArchive = await prisma.inventoryArchive.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more InventoryArchives and only return the `archive_id`
     * const inventoryArchiveWithArchive_idOnly = await prisma.inventoryArchive.updateManyAndReturn({
     *   select: { archive_id: true },
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
    updateManyAndReturn<T extends InventoryArchiveUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, InventoryArchiveUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InventoryArchivePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one InventoryArchive.
     * @param {InventoryArchiveUpsertArgs} args - Arguments to update or create a InventoryArchive.
     * @example
     * // Update or create a InventoryArchive
     * const inventoryArchive = await prisma.inventoryArchive.upsert({
     *   create: {
     *     // ... data to create a InventoryArchive
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InventoryArchive we want to update
     *   }
     * })
     */
    upsert<T extends InventoryArchiveUpsertArgs>(args: Prisma.SelectSubset<T, InventoryArchiveUpsertArgs<ExtArgs>>): Prisma.Prisma__InventoryArchiveClient<runtime.Types.Result.GetResult<Prisma.$InventoryArchivePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of InventoryArchives.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryArchiveCountArgs} args - Arguments to filter InventoryArchives to count.
     * @example
     * // Count the number of InventoryArchives
     * const count = await prisma.inventoryArchive.count({
     *   where: {
     *     // ... the filter for the InventoryArchives we want to count
     *   }
     * })
    **/
    count<T extends InventoryArchiveCountArgs>(args?: Prisma.Subset<T, InventoryArchiveCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], InventoryArchiveCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a InventoryArchive.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryArchiveAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends InventoryArchiveAggregateArgs>(args: Prisma.Subset<T, InventoryArchiveAggregateArgs>): Prisma.PrismaPromise<GetInventoryArchiveAggregateType<T>>;
    /**
     * Group by InventoryArchive.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryArchiveGroupByArgs} args - Group by arguments.
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
    groupBy<T extends InventoryArchiveGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: InventoryArchiveGroupByArgs['orderBy'];
    } : {
        orderBy?: InventoryArchiveGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, InventoryArchiveGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInventoryArchiveGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the InventoryArchive model
     */
    readonly fields: InventoryArchiveFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for InventoryArchive.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__InventoryArchiveClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    item<T extends Prisma.InventoryItemDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.InventoryItemDefaultArgs<ExtArgs>>): Prisma.Prisma__InventoryItemClient<runtime.Types.Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    archiver<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the InventoryArchive model
 */
export interface InventoryArchiveFieldRefs {
    readonly archive_id: Prisma.FieldRef<"InventoryArchive", 'String'>;
    readonly item_id: Prisma.FieldRef<"InventoryArchive", 'String'>;
    readonly archived_by: Prisma.FieldRef<"InventoryArchive", 'String'>;
    readonly archivedAt: Prisma.FieldRef<"InventoryArchive", 'DateTime'>;
}
/**
 * InventoryArchive findUnique
 */
export type InventoryArchiveFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which InventoryArchive to fetch.
     */
    where: Prisma.InventoryArchiveWhereUniqueInput;
};
/**
 * InventoryArchive findUniqueOrThrow
 */
export type InventoryArchiveFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which InventoryArchive to fetch.
     */
    where: Prisma.InventoryArchiveWhereUniqueInput;
};
/**
 * InventoryArchive findFirst
 */
export type InventoryArchiveFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which InventoryArchive to fetch.
     */
    where?: Prisma.InventoryArchiveWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of InventoryArchives to fetch.
     */
    orderBy?: Prisma.InventoryArchiveOrderByWithRelationInput | Prisma.InventoryArchiveOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for InventoryArchives.
     */
    cursor?: Prisma.InventoryArchiveWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` InventoryArchives from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` InventoryArchives.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of InventoryArchives.
     */
    distinct?: Prisma.InventoryArchiveScalarFieldEnum | Prisma.InventoryArchiveScalarFieldEnum[];
};
/**
 * InventoryArchive findFirstOrThrow
 */
export type InventoryArchiveFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which InventoryArchive to fetch.
     */
    where?: Prisma.InventoryArchiveWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of InventoryArchives to fetch.
     */
    orderBy?: Prisma.InventoryArchiveOrderByWithRelationInput | Prisma.InventoryArchiveOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for InventoryArchives.
     */
    cursor?: Prisma.InventoryArchiveWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` InventoryArchives from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` InventoryArchives.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of InventoryArchives.
     */
    distinct?: Prisma.InventoryArchiveScalarFieldEnum | Prisma.InventoryArchiveScalarFieldEnum[];
};
/**
 * InventoryArchive findMany
 */
export type InventoryArchiveFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which InventoryArchives to fetch.
     */
    where?: Prisma.InventoryArchiveWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of InventoryArchives to fetch.
     */
    orderBy?: Prisma.InventoryArchiveOrderByWithRelationInput | Prisma.InventoryArchiveOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing InventoryArchives.
     */
    cursor?: Prisma.InventoryArchiveWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` InventoryArchives from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` InventoryArchives.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of InventoryArchives.
     */
    distinct?: Prisma.InventoryArchiveScalarFieldEnum | Prisma.InventoryArchiveScalarFieldEnum[];
};
/**
 * InventoryArchive create
 */
export type InventoryArchiveCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a InventoryArchive.
     */
    data: Prisma.XOR<Prisma.InventoryArchiveCreateInput, Prisma.InventoryArchiveUncheckedCreateInput>;
};
/**
 * InventoryArchive createMany
 */
export type InventoryArchiveCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many InventoryArchives.
     */
    data: Prisma.InventoryArchiveCreateManyInput | Prisma.InventoryArchiveCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * InventoryArchive createManyAndReturn
 */
export type InventoryArchiveCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryArchive
     */
    select?: Prisma.InventoryArchiveSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the InventoryArchive
     */
    omit?: Prisma.InventoryArchiveOmit<ExtArgs> | null;
    /**
     * The data used to create many InventoryArchives.
     */
    data: Prisma.InventoryArchiveCreateManyInput | Prisma.InventoryArchiveCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InventoryArchiveIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * InventoryArchive update
 */
export type InventoryArchiveUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a InventoryArchive.
     */
    data: Prisma.XOR<Prisma.InventoryArchiveUpdateInput, Prisma.InventoryArchiveUncheckedUpdateInput>;
    /**
     * Choose, which InventoryArchive to update.
     */
    where: Prisma.InventoryArchiveWhereUniqueInput;
};
/**
 * InventoryArchive updateMany
 */
export type InventoryArchiveUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update InventoryArchives.
     */
    data: Prisma.XOR<Prisma.InventoryArchiveUpdateManyMutationInput, Prisma.InventoryArchiveUncheckedUpdateManyInput>;
    /**
     * Filter which InventoryArchives to update
     */
    where?: Prisma.InventoryArchiveWhereInput;
    /**
     * Limit how many InventoryArchives to update.
     */
    limit?: number;
};
/**
 * InventoryArchive updateManyAndReturn
 */
export type InventoryArchiveUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryArchive
     */
    select?: Prisma.InventoryArchiveSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the InventoryArchive
     */
    omit?: Prisma.InventoryArchiveOmit<ExtArgs> | null;
    /**
     * The data used to update InventoryArchives.
     */
    data: Prisma.XOR<Prisma.InventoryArchiveUpdateManyMutationInput, Prisma.InventoryArchiveUncheckedUpdateManyInput>;
    /**
     * Filter which InventoryArchives to update
     */
    where?: Prisma.InventoryArchiveWhereInput;
    /**
     * Limit how many InventoryArchives to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InventoryArchiveIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * InventoryArchive upsert
 */
export type InventoryArchiveUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the InventoryArchive to update in case it exists.
     */
    where: Prisma.InventoryArchiveWhereUniqueInput;
    /**
     * In case the InventoryArchive found by the `where` argument doesn't exist, create a new InventoryArchive with this data.
     */
    create: Prisma.XOR<Prisma.InventoryArchiveCreateInput, Prisma.InventoryArchiveUncheckedCreateInput>;
    /**
     * In case the InventoryArchive was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.InventoryArchiveUpdateInput, Prisma.InventoryArchiveUncheckedUpdateInput>;
};
/**
 * InventoryArchive delete
 */
export type InventoryArchiveDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which InventoryArchive to delete.
     */
    where: Prisma.InventoryArchiveWhereUniqueInput;
};
/**
 * InventoryArchive deleteMany
 */
export type InventoryArchiveDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which InventoryArchives to delete
     */
    where?: Prisma.InventoryArchiveWhereInput;
    /**
     * Limit how many InventoryArchives to delete.
     */
    limit?: number;
};
/**
 * InventoryArchive without action
 */
export type InventoryArchiveDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=InventoryArchive.d.ts.map