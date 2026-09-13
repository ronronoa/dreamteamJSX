import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model OperationLogArchive
 *
 */
export type OperationLogArchiveModel = runtime.Types.Result.DefaultSelection<Prisma.$OperationLogArchivePayload>;
export type AggregateOperationLogArchive = {
    _count: OperationLogArchiveCountAggregateOutputType | null;
    _min: OperationLogArchiveMinAggregateOutputType | null;
    _max: OperationLogArchiveMaxAggregateOutputType | null;
};
export type OperationLogArchiveMinAggregateOutputType = {
    archive_id: string | null;
    operation_id: string | null;
    archived_by: string | null;
    archivedAt: Date | null;
};
export type OperationLogArchiveMaxAggregateOutputType = {
    archive_id: string | null;
    operation_id: string | null;
    archived_by: string | null;
    archivedAt: Date | null;
};
export type OperationLogArchiveCountAggregateOutputType = {
    archive_id: number;
    operation_id: number;
    archived_by: number;
    archivedAt: number;
    _all: number;
};
export type OperationLogArchiveMinAggregateInputType = {
    archive_id?: true;
    operation_id?: true;
    archived_by?: true;
    archivedAt?: true;
};
export type OperationLogArchiveMaxAggregateInputType = {
    archive_id?: true;
    operation_id?: true;
    archived_by?: true;
    archivedAt?: true;
};
export type OperationLogArchiveCountAggregateInputType = {
    archive_id?: true;
    operation_id?: true;
    archived_by?: true;
    archivedAt?: true;
    _all?: true;
};
export type OperationLogArchiveAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which OperationLogArchive to aggregate.
     */
    where?: Prisma.OperationLogArchiveWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OperationLogArchives to fetch.
     */
    orderBy?: Prisma.OperationLogArchiveOrderByWithRelationInput | Prisma.OperationLogArchiveOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.OperationLogArchiveWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OperationLogArchives from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OperationLogArchives.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned OperationLogArchives
    **/
    _count?: true | OperationLogArchiveCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: OperationLogArchiveMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: OperationLogArchiveMaxAggregateInputType;
};
export type GetOperationLogArchiveAggregateType<T extends OperationLogArchiveAggregateArgs> = {
    [P in keyof T & keyof AggregateOperationLogArchive]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOperationLogArchive[P]> : Prisma.GetScalarType<T[P], AggregateOperationLogArchive[P]>;
};
export type OperationLogArchiveGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OperationLogArchiveWhereInput;
    orderBy?: Prisma.OperationLogArchiveOrderByWithAggregationInput | Prisma.OperationLogArchiveOrderByWithAggregationInput[];
    by: Prisma.OperationLogArchiveScalarFieldEnum[] | Prisma.OperationLogArchiveScalarFieldEnum;
    having?: Prisma.OperationLogArchiveScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OperationLogArchiveCountAggregateInputType | true;
    _min?: OperationLogArchiveMinAggregateInputType;
    _max?: OperationLogArchiveMaxAggregateInputType;
};
export type OperationLogArchiveGroupByOutputType = {
    archive_id: string;
    operation_id: string;
    archived_by: string;
    archivedAt: Date;
    _count: OperationLogArchiveCountAggregateOutputType | null;
    _min: OperationLogArchiveMinAggregateOutputType | null;
    _max: OperationLogArchiveMaxAggregateOutputType | null;
};
export type GetOperationLogArchiveGroupByPayload<T extends OperationLogArchiveGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OperationLogArchiveGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OperationLogArchiveGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OperationLogArchiveGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OperationLogArchiveGroupByOutputType[P]>;
}>>;
export type OperationLogArchiveWhereInput = {
    AND?: Prisma.OperationLogArchiveWhereInput | Prisma.OperationLogArchiveWhereInput[];
    OR?: Prisma.OperationLogArchiveWhereInput[];
    NOT?: Prisma.OperationLogArchiveWhereInput | Prisma.OperationLogArchiveWhereInput[];
    archive_id?: Prisma.StringFilter<"OperationLogArchive"> | string;
    operation_id?: Prisma.StringFilter<"OperationLogArchive"> | string;
    archived_by?: Prisma.StringFilter<"OperationLogArchive"> | string;
    archivedAt?: Prisma.DateTimeFilter<"OperationLogArchive"> | Date | string;
    operation?: Prisma.XOR<Prisma.OperationLogScalarRelationFilter, Prisma.OperationLogWhereInput>;
    archiver?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type OperationLogArchiveOrderByWithRelationInput = {
    archive_id?: Prisma.SortOrder;
    operation_id?: Prisma.SortOrder;
    archived_by?: Prisma.SortOrder;
    archivedAt?: Prisma.SortOrder;
    operation?: Prisma.OperationLogOrderByWithRelationInput;
    archiver?: Prisma.UserOrderByWithRelationInput;
};
export type OperationLogArchiveWhereUniqueInput = Prisma.AtLeast<{
    archive_id?: string;
    operation_id?: string;
    AND?: Prisma.OperationLogArchiveWhereInput | Prisma.OperationLogArchiveWhereInput[];
    OR?: Prisma.OperationLogArchiveWhereInput[];
    NOT?: Prisma.OperationLogArchiveWhereInput | Prisma.OperationLogArchiveWhereInput[];
    archived_by?: Prisma.StringFilter<"OperationLogArchive"> | string;
    archivedAt?: Prisma.DateTimeFilter<"OperationLogArchive"> | Date | string;
    operation?: Prisma.XOR<Prisma.OperationLogScalarRelationFilter, Prisma.OperationLogWhereInput>;
    archiver?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "archive_id" | "operation_id">;
export type OperationLogArchiveOrderByWithAggregationInput = {
    archive_id?: Prisma.SortOrder;
    operation_id?: Prisma.SortOrder;
    archived_by?: Prisma.SortOrder;
    archivedAt?: Prisma.SortOrder;
    _count?: Prisma.OperationLogArchiveCountOrderByAggregateInput;
    _max?: Prisma.OperationLogArchiveMaxOrderByAggregateInput;
    _min?: Prisma.OperationLogArchiveMinOrderByAggregateInput;
};
export type OperationLogArchiveScalarWhereWithAggregatesInput = {
    AND?: Prisma.OperationLogArchiveScalarWhereWithAggregatesInput | Prisma.OperationLogArchiveScalarWhereWithAggregatesInput[];
    OR?: Prisma.OperationLogArchiveScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OperationLogArchiveScalarWhereWithAggregatesInput | Prisma.OperationLogArchiveScalarWhereWithAggregatesInput[];
    archive_id?: Prisma.StringWithAggregatesFilter<"OperationLogArchive"> | string;
    operation_id?: Prisma.StringWithAggregatesFilter<"OperationLogArchive"> | string;
    archived_by?: Prisma.StringWithAggregatesFilter<"OperationLogArchive"> | string;
    archivedAt?: Prisma.DateTimeWithAggregatesFilter<"OperationLogArchive"> | Date | string;
};
export type OperationLogArchiveCreateInput = {
    archive_id?: string;
    archivedAt?: Date | string;
    operation: Prisma.OperationLogCreateNestedOneWithoutArchiveInput;
    archiver: Prisma.UserCreateNestedOneWithoutOperationArchivesInput;
};
export type OperationLogArchiveUncheckedCreateInput = {
    archive_id?: string;
    operation_id: string;
    archived_by: string;
    archivedAt?: Date | string;
};
export type OperationLogArchiveUpdateInput = {
    archive_id?: Prisma.StringFieldUpdateOperationsInput | string;
    archivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    operation?: Prisma.OperationLogUpdateOneRequiredWithoutArchiveNestedInput;
    archiver?: Prisma.UserUpdateOneRequiredWithoutOperationArchivesNestedInput;
};
export type OperationLogArchiveUncheckedUpdateInput = {
    archive_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    archived_by?: Prisma.StringFieldUpdateOperationsInput | string;
    archivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OperationLogArchiveCreateManyInput = {
    archive_id?: string;
    operation_id: string;
    archived_by: string;
    archivedAt?: Date | string;
};
export type OperationLogArchiveUpdateManyMutationInput = {
    archive_id?: Prisma.StringFieldUpdateOperationsInput | string;
    archivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OperationLogArchiveUncheckedUpdateManyInput = {
    archive_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    archived_by?: Prisma.StringFieldUpdateOperationsInput | string;
    archivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OperationLogArchiveListRelationFilter = {
    every?: Prisma.OperationLogArchiveWhereInput;
    some?: Prisma.OperationLogArchiveWhereInput;
    none?: Prisma.OperationLogArchiveWhereInput;
};
export type OperationLogArchiveOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type OperationLogArchiveNullableScalarRelationFilter = {
    is?: Prisma.OperationLogArchiveWhereInput | null;
    isNot?: Prisma.OperationLogArchiveWhereInput | null;
};
export type OperationLogArchiveCountOrderByAggregateInput = {
    archive_id?: Prisma.SortOrder;
    operation_id?: Prisma.SortOrder;
    archived_by?: Prisma.SortOrder;
    archivedAt?: Prisma.SortOrder;
};
export type OperationLogArchiveMaxOrderByAggregateInput = {
    archive_id?: Prisma.SortOrder;
    operation_id?: Prisma.SortOrder;
    archived_by?: Prisma.SortOrder;
    archivedAt?: Prisma.SortOrder;
};
export type OperationLogArchiveMinOrderByAggregateInput = {
    archive_id?: Prisma.SortOrder;
    operation_id?: Prisma.SortOrder;
    archived_by?: Prisma.SortOrder;
    archivedAt?: Prisma.SortOrder;
};
export type OperationLogArchiveCreateNestedManyWithoutArchiverInput = {
    create?: Prisma.XOR<Prisma.OperationLogArchiveCreateWithoutArchiverInput, Prisma.OperationLogArchiveUncheckedCreateWithoutArchiverInput> | Prisma.OperationLogArchiveCreateWithoutArchiverInput[] | Prisma.OperationLogArchiveUncheckedCreateWithoutArchiverInput[];
    connectOrCreate?: Prisma.OperationLogArchiveCreateOrConnectWithoutArchiverInput | Prisma.OperationLogArchiveCreateOrConnectWithoutArchiverInput[];
    createMany?: Prisma.OperationLogArchiveCreateManyArchiverInputEnvelope;
    connect?: Prisma.OperationLogArchiveWhereUniqueInput | Prisma.OperationLogArchiveWhereUniqueInput[];
};
export type OperationLogArchiveUncheckedCreateNestedManyWithoutArchiverInput = {
    create?: Prisma.XOR<Prisma.OperationLogArchiveCreateWithoutArchiverInput, Prisma.OperationLogArchiveUncheckedCreateWithoutArchiverInput> | Prisma.OperationLogArchiveCreateWithoutArchiverInput[] | Prisma.OperationLogArchiveUncheckedCreateWithoutArchiverInput[];
    connectOrCreate?: Prisma.OperationLogArchiveCreateOrConnectWithoutArchiverInput | Prisma.OperationLogArchiveCreateOrConnectWithoutArchiverInput[];
    createMany?: Prisma.OperationLogArchiveCreateManyArchiverInputEnvelope;
    connect?: Prisma.OperationLogArchiveWhereUniqueInput | Prisma.OperationLogArchiveWhereUniqueInput[];
};
export type OperationLogArchiveUpdateManyWithoutArchiverNestedInput = {
    create?: Prisma.XOR<Prisma.OperationLogArchiveCreateWithoutArchiverInput, Prisma.OperationLogArchiveUncheckedCreateWithoutArchiverInput> | Prisma.OperationLogArchiveCreateWithoutArchiverInput[] | Prisma.OperationLogArchiveUncheckedCreateWithoutArchiverInput[];
    connectOrCreate?: Prisma.OperationLogArchiveCreateOrConnectWithoutArchiverInput | Prisma.OperationLogArchiveCreateOrConnectWithoutArchiverInput[];
    upsert?: Prisma.OperationLogArchiveUpsertWithWhereUniqueWithoutArchiverInput | Prisma.OperationLogArchiveUpsertWithWhereUniqueWithoutArchiverInput[];
    createMany?: Prisma.OperationLogArchiveCreateManyArchiverInputEnvelope;
    set?: Prisma.OperationLogArchiveWhereUniqueInput | Prisma.OperationLogArchiveWhereUniqueInput[];
    disconnect?: Prisma.OperationLogArchiveWhereUniqueInput | Prisma.OperationLogArchiveWhereUniqueInput[];
    delete?: Prisma.OperationLogArchiveWhereUniqueInput | Prisma.OperationLogArchiveWhereUniqueInput[];
    connect?: Prisma.OperationLogArchiveWhereUniqueInput | Prisma.OperationLogArchiveWhereUniqueInput[];
    update?: Prisma.OperationLogArchiveUpdateWithWhereUniqueWithoutArchiverInput | Prisma.OperationLogArchiveUpdateWithWhereUniqueWithoutArchiverInput[];
    updateMany?: Prisma.OperationLogArchiveUpdateManyWithWhereWithoutArchiverInput | Prisma.OperationLogArchiveUpdateManyWithWhereWithoutArchiverInput[];
    deleteMany?: Prisma.OperationLogArchiveScalarWhereInput | Prisma.OperationLogArchiveScalarWhereInput[];
};
export type OperationLogArchiveUncheckedUpdateManyWithoutArchiverNestedInput = {
    create?: Prisma.XOR<Prisma.OperationLogArchiveCreateWithoutArchiverInput, Prisma.OperationLogArchiveUncheckedCreateWithoutArchiverInput> | Prisma.OperationLogArchiveCreateWithoutArchiverInput[] | Prisma.OperationLogArchiveUncheckedCreateWithoutArchiverInput[];
    connectOrCreate?: Prisma.OperationLogArchiveCreateOrConnectWithoutArchiverInput | Prisma.OperationLogArchiveCreateOrConnectWithoutArchiverInput[];
    upsert?: Prisma.OperationLogArchiveUpsertWithWhereUniqueWithoutArchiverInput | Prisma.OperationLogArchiveUpsertWithWhereUniqueWithoutArchiverInput[];
    createMany?: Prisma.OperationLogArchiveCreateManyArchiverInputEnvelope;
    set?: Prisma.OperationLogArchiveWhereUniqueInput | Prisma.OperationLogArchiveWhereUniqueInput[];
    disconnect?: Prisma.OperationLogArchiveWhereUniqueInput | Prisma.OperationLogArchiveWhereUniqueInput[];
    delete?: Prisma.OperationLogArchiveWhereUniqueInput | Prisma.OperationLogArchiveWhereUniqueInput[];
    connect?: Prisma.OperationLogArchiveWhereUniqueInput | Prisma.OperationLogArchiveWhereUniqueInput[];
    update?: Prisma.OperationLogArchiveUpdateWithWhereUniqueWithoutArchiverInput | Prisma.OperationLogArchiveUpdateWithWhereUniqueWithoutArchiverInput[];
    updateMany?: Prisma.OperationLogArchiveUpdateManyWithWhereWithoutArchiverInput | Prisma.OperationLogArchiveUpdateManyWithWhereWithoutArchiverInput[];
    deleteMany?: Prisma.OperationLogArchiveScalarWhereInput | Prisma.OperationLogArchiveScalarWhereInput[];
};
export type OperationLogArchiveCreateNestedOneWithoutOperationInput = {
    create?: Prisma.XOR<Prisma.OperationLogArchiveCreateWithoutOperationInput, Prisma.OperationLogArchiveUncheckedCreateWithoutOperationInput>;
    connectOrCreate?: Prisma.OperationLogArchiveCreateOrConnectWithoutOperationInput;
    connect?: Prisma.OperationLogArchiveWhereUniqueInput;
};
export type OperationLogArchiveUncheckedCreateNestedOneWithoutOperationInput = {
    create?: Prisma.XOR<Prisma.OperationLogArchiveCreateWithoutOperationInput, Prisma.OperationLogArchiveUncheckedCreateWithoutOperationInput>;
    connectOrCreate?: Prisma.OperationLogArchiveCreateOrConnectWithoutOperationInput;
    connect?: Prisma.OperationLogArchiveWhereUniqueInput;
};
export type OperationLogArchiveUpdateOneWithoutOperationNestedInput = {
    create?: Prisma.XOR<Prisma.OperationLogArchiveCreateWithoutOperationInput, Prisma.OperationLogArchiveUncheckedCreateWithoutOperationInput>;
    connectOrCreate?: Prisma.OperationLogArchiveCreateOrConnectWithoutOperationInput;
    upsert?: Prisma.OperationLogArchiveUpsertWithoutOperationInput;
    disconnect?: Prisma.OperationLogArchiveWhereInput | boolean;
    delete?: Prisma.OperationLogArchiveWhereInput | boolean;
    connect?: Prisma.OperationLogArchiveWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OperationLogArchiveUpdateToOneWithWhereWithoutOperationInput, Prisma.OperationLogArchiveUpdateWithoutOperationInput>, Prisma.OperationLogArchiveUncheckedUpdateWithoutOperationInput>;
};
export type OperationLogArchiveUncheckedUpdateOneWithoutOperationNestedInput = {
    create?: Prisma.XOR<Prisma.OperationLogArchiveCreateWithoutOperationInput, Prisma.OperationLogArchiveUncheckedCreateWithoutOperationInput>;
    connectOrCreate?: Prisma.OperationLogArchiveCreateOrConnectWithoutOperationInput;
    upsert?: Prisma.OperationLogArchiveUpsertWithoutOperationInput;
    disconnect?: Prisma.OperationLogArchiveWhereInput | boolean;
    delete?: Prisma.OperationLogArchiveWhereInput | boolean;
    connect?: Prisma.OperationLogArchiveWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OperationLogArchiveUpdateToOneWithWhereWithoutOperationInput, Prisma.OperationLogArchiveUpdateWithoutOperationInput>, Prisma.OperationLogArchiveUncheckedUpdateWithoutOperationInput>;
};
export type OperationLogArchiveCreateWithoutArchiverInput = {
    archive_id?: string;
    archivedAt?: Date | string;
    operation: Prisma.OperationLogCreateNestedOneWithoutArchiveInput;
};
export type OperationLogArchiveUncheckedCreateWithoutArchiverInput = {
    archive_id?: string;
    operation_id: string;
    archivedAt?: Date | string;
};
export type OperationLogArchiveCreateOrConnectWithoutArchiverInput = {
    where: Prisma.OperationLogArchiveWhereUniqueInput;
    create: Prisma.XOR<Prisma.OperationLogArchiveCreateWithoutArchiverInput, Prisma.OperationLogArchiveUncheckedCreateWithoutArchiverInput>;
};
export type OperationLogArchiveCreateManyArchiverInputEnvelope = {
    data: Prisma.OperationLogArchiveCreateManyArchiverInput | Prisma.OperationLogArchiveCreateManyArchiverInput[];
    skipDuplicates?: boolean;
};
export type OperationLogArchiveUpsertWithWhereUniqueWithoutArchiverInput = {
    where: Prisma.OperationLogArchiveWhereUniqueInput;
    update: Prisma.XOR<Prisma.OperationLogArchiveUpdateWithoutArchiverInput, Prisma.OperationLogArchiveUncheckedUpdateWithoutArchiverInput>;
    create: Prisma.XOR<Prisma.OperationLogArchiveCreateWithoutArchiverInput, Prisma.OperationLogArchiveUncheckedCreateWithoutArchiverInput>;
};
export type OperationLogArchiveUpdateWithWhereUniqueWithoutArchiverInput = {
    where: Prisma.OperationLogArchiveWhereUniqueInput;
    data: Prisma.XOR<Prisma.OperationLogArchiveUpdateWithoutArchiverInput, Prisma.OperationLogArchiveUncheckedUpdateWithoutArchiverInput>;
};
export type OperationLogArchiveUpdateManyWithWhereWithoutArchiverInput = {
    where: Prisma.OperationLogArchiveScalarWhereInput;
    data: Prisma.XOR<Prisma.OperationLogArchiveUpdateManyMutationInput, Prisma.OperationLogArchiveUncheckedUpdateManyWithoutArchiverInput>;
};
export type OperationLogArchiveScalarWhereInput = {
    AND?: Prisma.OperationLogArchiveScalarWhereInput | Prisma.OperationLogArchiveScalarWhereInput[];
    OR?: Prisma.OperationLogArchiveScalarWhereInput[];
    NOT?: Prisma.OperationLogArchiveScalarWhereInput | Prisma.OperationLogArchiveScalarWhereInput[];
    archive_id?: Prisma.StringFilter<"OperationLogArchive"> | string;
    operation_id?: Prisma.StringFilter<"OperationLogArchive"> | string;
    archived_by?: Prisma.StringFilter<"OperationLogArchive"> | string;
    archivedAt?: Prisma.DateTimeFilter<"OperationLogArchive"> | Date | string;
};
export type OperationLogArchiveCreateWithoutOperationInput = {
    archive_id?: string;
    archivedAt?: Date | string;
    archiver: Prisma.UserCreateNestedOneWithoutOperationArchivesInput;
};
export type OperationLogArchiveUncheckedCreateWithoutOperationInput = {
    archive_id?: string;
    archived_by: string;
    archivedAt?: Date | string;
};
export type OperationLogArchiveCreateOrConnectWithoutOperationInput = {
    where: Prisma.OperationLogArchiveWhereUniqueInput;
    create: Prisma.XOR<Prisma.OperationLogArchiveCreateWithoutOperationInput, Prisma.OperationLogArchiveUncheckedCreateWithoutOperationInput>;
};
export type OperationLogArchiveUpsertWithoutOperationInput = {
    update: Prisma.XOR<Prisma.OperationLogArchiveUpdateWithoutOperationInput, Prisma.OperationLogArchiveUncheckedUpdateWithoutOperationInput>;
    create: Prisma.XOR<Prisma.OperationLogArchiveCreateWithoutOperationInput, Prisma.OperationLogArchiveUncheckedCreateWithoutOperationInput>;
    where?: Prisma.OperationLogArchiveWhereInput;
};
export type OperationLogArchiveUpdateToOneWithWhereWithoutOperationInput = {
    where?: Prisma.OperationLogArchiveWhereInput;
    data: Prisma.XOR<Prisma.OperationLogArchiveUpdateWithoutOperationInput, Prisma.OperationLogArchiveUncheckedUpdateWithoutOperationInput>;
};
export type OperationLogArchiveUpdateWithoutOperationInput = {
    archive_id?: Prisma.StringFieldUpdateOperationsInput | string;
    archivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    archiver?: Prisma.UserUpdateOneRequiredWithoutOperationArchivesNestedInput;
};
export type OperationLogArchiveUncheckedUpdateWithoutOperationInput = {
    archive_id?: Prisma.StringFieldUpdateOperationsInput | string;
    archived_by?: Prisma.StringFieldUpdateOperationsInput | string;
    archivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OperationLogArchiveCreateManyArchiverInput = {
    archive_id?: string;
    operation_id: string;
    archivedAt?: Date | string;
};
export type OperationLogArchiveUpdateWithoutArchiverInput = {
    archive_id?: Prisma.StringFieldUpdateOperationsInput | string;
    archivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    operation?: Prisma.OperationLogUpdateOneRequiredWithoutArchiveNestedInput;
};
export type OperationLogArchiveUncheckedUpdateWithoutArchiverInput = {
    archive_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    archivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OperationLogArchiveUncheckedUpdateManyWithoutArchiverInput = {
    archive_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    archivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OperationLogArchiveSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    archive_id?: boolean;
    operation_id?: boolean;
    archived_by?: boolean;
    archivedAt?: boolean;
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
    archiver?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["operationLogArchive"]>;
export type OperationLogArchiveSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    archive_id?: boolean;
    operation_id?: boolean;
    archived_by?: boolean;
    archivedAt?: boolean;
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
    archiver?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["operationLogArchive"]>;
export type OperationLogArchiveSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    archive_id?: boolean;
    operation_id?: boolean;
    archived_by?: boolean;
    archivedAt?: boolean;
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
    archiver?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["operationLogArchive"]>;
export type OperationLogArchiveSelectScalar = {
    archive_id?: boolean;
    operation_id?: boolean;
    archived_by?: boolean;
    archivedAt?: boolean;
};
export type OperationLogArchiveOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"archive_id" | "operation_id" | "archived_by" | "archivedAt", ExtArgs["result"]["operationLogArchive"]>;
export type OperationLogArchiveInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
    archiver?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type OperationLogArchiveIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
    archiver?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type OperationLogArchiveIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
    archiver?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $OperationLogArchivePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "OperationLogArchive";
    objects: {
        operation: Prisma.$OperationLogPayload<ExtArgs>;
        archiver: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        archive_id: string;
        operation_id: string;
        archived_by: string;
        archivedAt: Date;
    }, ExtArgs["result"]["operationLogArchive"]>;
    composites: {};
};
export type OperationLogArchiveGetPayload<S extends boolean | null | undefined | OperationLogArchiveDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OperationLogArchivePayload, S>;
export type OperationLogArchiveCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OperationLogArchiveFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OperationLogArchiveCountAggregateInputType | true;
};
export interface OperationLogArchiveDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['OperationLogArchive'];
        meta: {
            name: 'OperationLogArchive';
        };
    };
    /**
     * Find zero or one OperationLogArchive that matches the filter.
     * @param {OperationLogArchiveFindUniqueArgs} args - Arguments to find a OperationLogArchive
     * @example
     * // Get one OperationLogArchive
     * const operationLogArchive = await prisma.operationLogArchive.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OperationLogArchiveFindUniqueArgs>(args: Prisma.SelectSubset<T, OperationLogArchiveFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OperationLogArchiveClient<runtime.Types.Result.GetResult<Prisma.$OperationLogArchivePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one OperationLogArchive that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OperationLogArchiveFindUniqueOrThrowArgs} args - Arguments to find a OperationLogArchive
     * @example
     * // Get one OperationLogArchive
     * const operationLogArchive = await prisma.operationLogArchive.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OperationLogArchiveFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OperationLogArchiveFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OperationLogArchiveClient<runtime.Types.Result.GetResult<Prisma.$OperationLogArchivePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first OperationLogArchive that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogArchiveFindFirstArgs} args - Arguments to find a OperationLogArchive
     * @example
     * // Get one OperationLogArchive
     * const operationLogArchive = await prisma.operationLogArchive.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OperationLogArchiveFindFirstArgs>(args?: Prisma.SelectSubset<T, OperationLogArchiveFindFirstArgs<ExtArgs>>): Prisma.Prisma__OperationLogArchiveClient<runtime.Types.Result.GetResult<Prisma.$OperationLogArchivePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first OperationLogArchive that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogArchiveFindFirstOrThrowArgs} args - Arguments to find a OperationLogArchive
     * @example
     * // Get one OperationLogArchive
     * const operationLogArchive = await prisma.operationLogArchive.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OperationLogArchiveFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OperationLogArchiveFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OperationLogArchiveClient<runtime.Types.Result.GetResult<Prisma.$OperationLogArchivePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more OperationLogArchives that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogArchiveFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OperationLogArchives
     * const operationLogArchives = await prisma.operationLogArchive.findMany()
     *
     * // Get first 10 OperationLogArchives
     * const operationLogArchives = await prisma.operationLogArchive.findMany({ take: 10 })
     *
     * // Only select the `archive_id`
     * const operationLogArchiveWithArchive_idOnly = await prisma.operationLogArchive.findMany({ select: { archive_id: true } })
     *
     */
    findMany<T extends OperationLogArchiveFindManyArgs>(args?: Prisma.SelectSubset<T, OperationLogArchiveFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OperationLogArchivePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a OperationLogArchive.
     * @param {OperationLogArchiveCreateArgs} args - Arguments to create a OperationLogArchive.
     * @example
     * // Create one OperationLogArchive
     * const OperationLogArchive = await prisma.operationLogArchive.create({
     *   data: {
     *     // ... data to create a OperationLogArchive
     *   }
     * })
     *
     */
    create<T extends OperationLogArchiveCreateArgs>(args: Prisma.SelectSubset<T, OperationLogArchiveCreateArgs<ExtArgs>>): Prisma.Prisma__OperationLogArchiveClient<runtime.Types.Result.GetResult<Prisma.$OperationLogArchivePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many OperationLogArchives.
     * @param {OperationLogArchiveCreateManyArgs} args - Arguments to create many OperationLogArchives.
     * @example
     * // Create many OperationLogArchives
     * const operationLogArchive = await prisma.operationLogArchive.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends OperationLogArchiveCreateManyArgs>(args?: Prisma.SelectSubset<T, OperationLogArchiveCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many OperationLogArchives and returns the data saved in the database.
     * @param {OperationLogArchiveCreateManyAndReturnArgs} args - Arguments to create many OperationLogArchives.
     * @example
     * // Create many OperationLogArchives
     * const operationLogArchive = await prisma.operationLogArchive.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many OperationLogArchives and only return the `archive_id`
     * const operationLogArchiveWithArchive_idOnly = await prisma.operationLogArchive.createManyAndReturn({
     *   select: { archive_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends OperationLogArchiveCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OperationLogArchiveCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OperationLogArchivePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a OperationLogArchive.
     * @param {OperationLogArchiveDeleteArgs} args - Arguments to delete one OperationLogArchive.
     * @example
     * // Delete one OperationLogArchive
     * const OperationLogArchive = await prisma.operationLogArchive.delete({
     *   where: {
     *     // ... filter to delete one OperationLogArchive
     *   }
     * })
     *
     */
    delete<T extends OperationLogArchiveDeleteArgs>(args: Prisma.SelectSubset<T, OperationLogArchiveDeleteArgs<ExtArgs>>): Prisma.Prisma__OperationLogArchiveClient<runtime.Types.Result.GetResult<Prisma.$OperationLogArchivePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one OperationLogArchive.
     * @param {OperationLogArchiveUpdateArgs} args - Arguments to update one OperationLogArchive.
     * @example
     * // Update one OperationLogArchive
     * const operationLogArchive = await prisma.operationLogArchive.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends OperationLogArchiveUpdateArgs>(args: Prisma.SelectSubset<T, OperationLogArchiveUpdateArgs<ExtArgs>>): Prisma.Prisma__OperationLogArchiveClient<runtime.Types.Result.GetResult<Prisma.$OperationLogArchivePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more OperationLogArchives.
     * @param {OperationLogArchiveDeleteManyArgs} args - Arguments to filter OperationLogArchives to delete.
     * @example
     * // Delete a few OperationLogArchives
     * const { count } = await prisma.operationLogArchive.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends OperationLogArchiveDeleteManyArgs>(args?: Prisma.SelectSubset<T, OperationLogArchiveDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more OperationLogArchives.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogArchiveUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OperationLogArchives
     * const operationLogArchive = await prisma.operationLogArchive.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends OperationLogArchiveUpdateManyArgs>(args: Prisma.SelectSubset<T, OperationLogArchiveUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more OperationLogArchives and returns the data updated in the database.
     * @param {OperationLogArchiveUpdateManyAndReturnArgs} args - Arguments to update many OperationLogArchives.
     * @example
     * // Update many OperationLogArchives
     * const operationLogArchive = await prisma.operationLogArchive.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more OperationLogArchives and only return the `archive_id`
     * const operationLogArchiveWithArchive_idOnly = await prisma.operationLogArchive.updateManyAndReturn({
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
    updateManyAndReturn<T extends OperationLogArchiveUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OperationLogArchiveUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OperationLogArchivePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one OperationLogArchive.
     * @param {OperationLogArchiveUpsertArgs} args - Arguments to update or create a OperationLogArchive.
     * @example
     * // Update or create a OperationLogArchive
     * const operationLogArchive = await prisma.operationLogArchive.upsert({
     *   create: {
     *     // ... data to create a OperationLogArchive
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OperationLogArchive we want to update
     *   }
     * })
     */
    upsert<T extends OperationLogArchiveUpsertArgs>(args: Prisma.SelectSubset<T, OperationLogArchiveUpsertArgs<ExtArgs>>): Prisma.Prisma__OperationLogArchiveClient<runtime.Types.Result.GetResult<Prisma.$OperationLogArchivePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of OperationLogArchives.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogArchiveCountArgs} args - Arguments to filter OperationLogArchives to count.
     * @example
     * // Count the number of OperationLogArchives
     * const count = await prisma.operationLogArchive.count({
     *   where: {
     *     // ... the filter for the OperationLogArchives we want to count
     *   }
     * })
    **/
    count<T extends OperationLogArchiveCountArgs>(args?: Prisma.Subset<T, OperationLogArchiveCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OperationLogArchiveCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a OperationLogArchive.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogArchiveAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OperationLogArchiveAggregateArgs>(args: Prisma.Subset<T, OperationLogArchiveAggregateArgs>): Prisma.PrismaPromise<GetOperationLogArchiveAggregateType<T>>;
    /**
     * Group by OperationLogArchive.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogArchiveGroupByArgs} args - Group by arguments.
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
    groupBy<T extends OperationLogArchiveGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OperationLogArchiveGroupByArgs['orderBy'];
    } : {
        orderBy?: OperationLogArchiveGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OperationLogArchiveGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOperationLogArchiveGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the OperationLogArchive model
     */
    readonly fields: OperationLogArchiveFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for OperationLogArchive.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__OperationLogArchiveClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    operation<T extends Prisma.OperationLogDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OperationLogDefaultArgs<ExtArgs>>): Prisma.Prisma__OperationLogClient<runtime.Types.Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the OperationLogArchive model
 */
export interface OperationLogArchiveFieldRefs {
    readonly archive_id: Prisma.FieldRef<"OperationLogArchive", 'String'>;
    readonly operation_id: Prisma.FieldRef<"OperationLogArchive", 'String'>;
    readonly archived_by: Prisma.FieldRef<"OperationLogArchive", 'String'>;
    readonly archivedAt: Prisma.FieldRef<"OperationLogArchive", 'DateTime'>;
}
/**
 * OperationLogArchive findUnique
 */
export type OperationLogArchiveFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OperationLogArchive to fetch.
     */
    where: Prisma.OperationLogArchiveWhereUniqueInput;
};
/**
 * OperationLogArchive findUniqueOrThrow
 */
export type OperationLogArchiveFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OperationLogArchive to fetch.
     */
    where: Prisma.OperationLogArchiveWhereUniqueInput;
};
/**
 * OperationLogArchive findFirst
 */
export type OperationLogArchiveFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OperationLogArchive to fetch.
     */
    where?: Prisma.OperationLogArchiveWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OperationLogArchives to fetch.
     */
    orderBy?: Prisma.OperationLogArchiveOrderByWithRelationInput | Prisma.OperationLogArchiveOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OperationLogArchives.
     */
    cursor?: Prisma.OperationLogArchiveWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OperationLogArchives from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OperationLogArchives.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OperationLogArchives.
     */
    distinct?: Prisma.OperationLogArchiveScalarFieldEnum | Prisma.OperationLogArchiveScalarFieldEnum[];
};
/**
 * OperationLogArchive findFirstOrThrow
 */
export type OperationLogArchiveFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OperationLogArchive to fetch.
     */
    where?: Prisma.OperationLogArchiveWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OperationLogArchives to fetch.
     */
    orderBy?: Prisma.OperationLogArchiveOrderByWithRelationInput | Prisma.OperationLogArchiveOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OperationLogArchives.
     */
    cursor?: Prisma.OperationLogArchiveWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OperationLogArchives from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OperationLogArchives.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OperationLogArchives.
     */
    distinct?: Prisma.OperationLogArchiveScalarFieldEnum | Prisma.OperationLogArchiveScalarFieldEnum[];
};
/**
 * OperationLogArchive findMany
 */
export type OperationLogArchiveFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OperationLogArchives to fetch.
     */
    where?: Prisma.OperationLogArchiveWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OperationLogArchives to fetch.
     */
    orderBy?: Prisma.OperationLogArchiveOrderByWithRelationInput | Prisma.OperationLogArchiveOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing OperationLogArchives.
     */
    cursor?: Prisma.OperationLogArchiveWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OperationLogArchives from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OperationLogArchives.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OperationLogArchives.
     */
    distinct?: Prisma.OperationLogArchiveScalarFieldEnum | Prisma.OperationLogArchiveScalarFieldEnum[];
};
/**
 * OperationLogArchive create
 */
export type OperationLogArchiveCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a OperationLogArchive.
     */
    data: Prisma.XOR<Prisma.OperationLogArchiveCreateInput, Prisma.OperationLogArchiveUncheckedCreateInput>;
};
/**
 * OperationLogArchive createMany
 */
export type OperationLogArchiveCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many OperationLogArchives.
     */
    data: Prisma.OperationLogArchiveCreateManyInput | Prisma.OperationLogArchiveCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * OperationLogArchive createManyAndReturn
 */
export type OperationLogArchiveCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLogArchive
     */
    select?: Prisma.OperationLogArchiveSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the OperationLogArchive
     */
    omit?: Prisma.OperationLogArchiveOmit<ExtArgs> | null;
    /**
     * The data used to create many OperationLogArchives.
     */
    data: Prisma.OperationLogArchiveCreateManyInput | Prisma.OperationLogArchiveCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OperationLogArchiveIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * OperationLogArchive update
 */
export type OperationLogArchiveUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a OperationLogArchive.
     */
    data: Prisma.XOR<Prisma.OperationLogArchiveUpdateInput, Prisma.OperationLogArchiveUncheckedUpdateInput>;
    /**
     * Choose, which OperationLogArchive to update.
     */
    where: Prisma.OperationLogArchiveWhereUniqueInput;
};
/**
 * OperationLogArchive updateMany
 */
export type OperationLogArchiveUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update OperationLogArchives.
     */
    data: Prisma.XOR<Prisma.OperationLogArchiveUpdateManyMutationInput, Prisma.OperationLogArchiveUncheckedUpdateManyInput>;
    /**
     * Filter which OperationLogArchives to update
     */
    where?: Prisma.OperationLogArchiveWhereInput;
    /**
     * Limit how many OperationLogArchives to update.
     */
    limit?: number;
};
/**
 * OperationLogArchive updateManyAndReturn
 */
export type OperationLogArchiveUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLogArchive
     */
    select?: Prisma.OperationLogArchiveSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the OperationLogArchive
     */
    omit?: Prisma.OperationLogArchiveOmit<ExtArgs> | null;
    /**
     * The data used to update OperationLogArchives.
     */
    data: Prisma.XOR<Prisma.OperationLogArchiveUpdateManyMutationInput, Prisma.OperationLogArchiveUncheckedUpdateManyInput>;
    /**
     * Filter which OperationLogArchives to update
     */
    where?: Prisma.OperationLogArchiveWhereInput;
    /**
     * Limit how many OperationLogArchives to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OperationLogArchiveIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * OperationLogArchive upsert
 */
export type OperationLogArchiveUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the OperationLogArchive to update in case it exists.
     */
    where: Prisma.OperationLogArchiveWhereUniqueInput;
    /**
     * In case the OperationLogArchive found by the `where` argument doesn't exist, create a new OperationLogArchive with this data.
     */
    create: Prisma.XOR<Prisma.OperationLogArchiveCreateInput, Prisma.OperationLogArchiveUncheckedCreateInput>;
    /**
     * In case the OperationLogArchive was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.OperationLogArchiveUpdateInput, Prisma.OperationLogArchiveUncheckedUpdateInput>;
};
/**
 * OperationLogArchive delete
 */
export type OperationLogArchiveDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which OperationLogArchive to delete.
     */
    where: Prisma.OperationLogArchiveWhereUniqueInput;
};
/**
 * OperationLogArchive deleteMany
 */
export type OperationLogArchiveDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which OperationLogArchives to delete
     */
    where?: Prisma.OperationLogArchiveWhereInput;
    /**
     * Limit how many OperationLogArchives to delete.
     */
    limit?: number;
};
/**
 * OperationLogArchive without action
 */
export type OperationLogArchiveDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=OperationLogArchive.d.ts.map