import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model OperationImageAttachment
 *
 */
export type OperationImageAttachmentModel = runtime.Types.Result.DefaultSelection<Prisma.$OperationImageAttachmentPayload>;
export type AggregateOperationImageAttachment = {
    _count: OperationImageAttachmentCountAggregateOutputType | null;
    _min: OperationImageAttachmentMinAggregateOutputType | null;
    _max: OperationImageAttachmentMaxAggregateOutputType | null;
};
export type OperationImageAttachmentMinAggregateOutputType = {
    attachment_id: string | null;
    operation_id: string | null;
    image_url: string | null;
    file_type: string | null;
    uploaded_by: string | null;
    uploadedAt: Date | null;
};
export type OperationImageAttachmentMaxAggregateOutputType = {
    attachment_id: string | null;
    operation_id: string | null;
    image_url: string | null;
    file_type: string | null;
    uploaded_by: string | null;
    uploadedAt: Date | null;
};
export type OperationImageAttachmentCountAggregateOutputType = {
    attachment_id: number;
    operation_id: number;
    image_url: number;
    file_type: number;
    uploaded_by: number;
    uploadedAt: number;
    _all: number;
};
export type OperationImageAttachmentMinAggregateInputType = {
    attachment_id?: true;
    operation_id?: true;
    image_url?: true;
    file_type?: true;
    uploaded_by?: true;
    uploadedAt?: true;
};
export type OperationImageAttachmentMaxAggregateInputType = {
    attachment_id?: true;
    operation_id?: true;
    image_url?: true;
    file_type?: true;
    uploaded_by?: true;
    uploadedAt?: true;
};
export type OperationImageAttachmentCountAggregateInputType = {
    attachment_id?: true;
    operation_id?: true;
    image_url?: true;
    file_type?: true;
    uploaded_by?: true;
    uploadedAt?: true;
    _all?: true;
};
export type OperationImageAttachmentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which OperationImageAttachment to aggregate.
     */
    where?: Prisma.OperationImageAttachmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OperationImageAttachments to fetch.
     */
    orderBy?: Prisma.OperationImageAttachmentOrderByWithRelationInput | Prisma.OperationImageAttachmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.OperationImageAttachmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OperationImageAttachments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OperationImageAttachments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned OperationImageAttachments
    **/
    _count?: true | OperationImageAttachmentCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: OperationImageAttachmentMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: OperationImageAttachmentMaxAggregateInputType;
};
export type GetOperationImageAttachmentAggregateType<T extends OperationImageAttachmentAggregateArgs> = {
    [P in keyof T & keyof AggregateOperationImageAttachment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOperationImageAttachment[P]> : Prisma.GetScalarType<T[P], AggregateOperationImageAttachment[P]>;
};
export type OperationImageAttachmentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OperationImageAttachmentWhereInput;
    orderBy?: Prisma.OperationImageAttachmentOrderByWithAggregationInput | Prisma.OperationImageAttachmentOrderByWithAggregationInput[];
    by: Prisma.OperationImageAttachmentScalarFieldEnum[] | Prisma.OperationImageAttachmentScalarFieldEnum;
    having?: Prisma.OperationImageAttachmentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OperationImageAttachmentCountAggregateInputType | true;
    _min?: OperationImageAttachmentMinAggregateInputType;
    _max?: OperationImageAttachmentMaxAggregateInputType;
};
export type OperationImageAttachmentGroupByOutputType = {
    attachment_id: string;
    operation_id: string;
    image_url: string;
    file_type: string | null;
    uploaded_by: string;
    uploadedAt: Date;
    _count: OperationImageAttachmentCountAggregateOutputType | null;
    _min: OperationImageAttachmentMinAggregateOutputType | null;
    _max: OperationImageAttachmentMaxAggregateOutputType | null;
};
export type GetOperationImageAttachmentGroupByPayload<T extends OperationImageAttachmentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OperationImageAttachmentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OperationImageAttachmentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OperationImageAttachmentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OperationImageAttachmentGroupByOutputType[P]>;
}>>;
export type OperationImageAttachmentWhereInput = {
    AND?: Prisma.OperationImageAttachmentWhereInput | Prisma.OperationImageAttachmentWhereInput[];
    OR?: Prisma.OperationImageAttachmentWhereInput[];
    NOT?: Prisma.OperationImageAttachmentWhereInput | Prisma.OperationImageAttachmentWhereInput[];
    attachment_id?: Prisma.StringFilter<"OperationImageAttachment"> | string;
    operation_id?: Prisma.StringFilter<"OperationImageAttachment"> | string;
    image_url?: Prisma.StringFilter<"OperationImageAttachment"> | string;
    file_type?: Prisma.StringNullableFilter<"OperationImageAttachment"> | string | null;
    uploaded_by?: Prisma.StringFilter<"OperationImageAttachment"> | string;
    uploadedAt?: Prisma.DateTimeFilter<"OperationImageAttachment"> | Date | string;
    operation?: Prisma.XOR<Prisma.OperationLogScalarRelationFilter, Prisma.OperationLogWhereInput>;
    uploader?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type OperationImageAttachmentOrderByWithRelationInput = {
    attachment_id?: Prisma.SortOrder;
    operation_id?: Prisma.SortOrder;
    image_url?: Prisma.SortOrder;
    file_type?: Prisma.SortOrderInput | Prisma.SortOrder;
    uploaded_by?: Prisma.SortOrder;
    uploadedAt?: Prisma.SortOrder;
    operation?: Prisma.OperationLogOrderByWithRelationInput;
    uploader?: Prisma.UserOrderByWithRelationInput;
};
export type OperationImageAttachmentWhereUniqueInput = Prisma.AtLeast<{
    attachment_id?: string;
    AND?: Prisma.OperationImageAttachmentWhereInput | Prisma.OperationImageAttachmentWhereInput[];
    OR?: Prisma.OperationImageAttachmentWhereInput[];
    NOT?: Prisma.OperationImageAttachmentWhereInput | Prisma.OperationImageAttachmentWhereInput[];
    operation_id?: Prisma.StringFilter<"OperationImageAttachment"> | string;
    image_url?: Prisma.StringFilter<"OperationImageAttachment"> | string;
    file_type?: Prisma.StringNullableFilter<"OperationImageAttachment"> | string | null;
    uploaded_by?: Prisma.StringFilter<"OperationImageAttachment"> | string;
    uploadedAt?: Prisma.DateTimeFilter<"OperationImageAttachment"> | Date | string;
    operation?: Prisma.XOR<Prisma.OperationLogScalarRelationFilter, Prisma.OperationLogWhereInput>;
    uploader?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "attachment_id">;
export type OperationImageAttachmentOrderByWithAggregationInput = {
    attachment_id?: Prisma.SortOrder;
    operation_id?: Prisma.SortOrder;
    image_url?: Prisma.SortOrder;
    file_type?: Prisma.SortOrderInput | Prisma.SortOrder;
    uploaded_by?: Prisma.SortOrder;
    uploadedAt?: Prisma.SortOrder;
    _count?: Prisma.OperationImageAttachmentCountOrderByAggregateInput;
    _max?: Prisma.OperationImageAttachmentMaxOrderByAggregateInput;
    _min?: Prisma.OperationImageAttachmentMinOrderByAggregateInput;
};
export type OperationImageAttachmentScalarWhereWithAggregatesInput = {
    AND?: Prisma.OperationImageAttachmentScalarWhereWithAggregatesInput | Prisma.OperationImageAttachmentScalarWhereWithAggregatesInput[];
    OR?: Prisma.OperationImageAttachmentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OperationImageAttachmentScalarWhereWithAggregatesInput | Prisma.OperationImageAttachmentScalarWhereWithAggregatesInput[];
    attachment_id?: Prisma.StringWithAggregatesFilter<"OperationImageAttachment"> | string;
    operation_id?: Prisma.StringWithAggregatesFilter<"OperationImageAttachment"> | string;
    image_url?: Prisma.StringWithAggregatesFilter<"OperationImageAttachment"> | string;
    file_type?: Prisma.StringNullableWithAggregatesFilter<"OperationImageAttachment"> | string | null;
    uploaded_by?: Prisma.StringWithAggregatesFilter<"OperationImageAttachment"> | string;
    uploadedAt?: Prisma.DateTimeWithAggregatesFilter<"OperationImageAttachment"> | Date | string;
};
export type OperationImageAttachmentCreateInput = {
    attachment_id?: string;
    image_url: string;
    file_type?: string | null;
    uploadedAt?: Date | string;
    operation: Prisma.OperationLogCreateNestedOneWithoutImagesInput;
    uploader: Prisma.UserCreateNestedOneWithoutOperationImagesInput;
};
export type OperationImageAttachmentUncheckedCreateInput = {
    attachment_id?: string;
    operation_id: string;
    image_url: string;
    file_type?: string | null;
    uploaded_by: string;
    uploadedAt?: Date | string;
};
export type OperationImageAttachmentUpdateInput = {
    attachment_id?: Prisma.StringFieldUpdateOperationsInput | string;
    image_url?: Prisma.StringFieldUpdateOperationsInput | string;
    file_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    operation?: Prisma.OperationLogUpdateOneRequiredWithoutImagesNestedInput;
    uploader?: Prisma.UserUpdateOneRequiredWithoutOperationImagesNestedInput;
};
export type OperationImageAttachmentUncheckedUpdateInput = {
    attachment_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    image_url?: Prisma.StringFieldUpdateOperationsInput | string;
    file_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploaded_by?: Prisma.StringFieldUpdateOperationsInput | string;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OperationImageAttachmentCreateManyInput = {
    attachment_id?: string;
    operation_id: string;
    image_url: string;
    file_type?: string | null;
    uploaded_by: string;
    uploadedAt?: Date | string;
};
export type OperationImageAttachmentUpdateManyMutationInput = {
    attachment_id?: Prisma.StringFieldUpdateOperationsInput | string;
    image_url?: Prisma.StringFieldUpdateOperationsInput | string;
    file_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OperationImageAttachmentUncheckedUpdateManyInput = {
    attachment_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    image_url?: Prisma.StringFieldUpdateOperationsInput | string;
    file_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploaded_by?: Prisma.StringFieldUpdateOperationsInput | string;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OperationImageAttachmentListRelationFilter = {
    every?: Prisma.OperationImageAttachmentWhereInput;
    some?: Prisma.OperationImageAttachmentWhereInput;
    none?: Prisma.OperationImageAttachmentWhereInput;
};
export type OperationImageAttachmentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type OperationImageAttachmentCountOrderByAggregateInput = {
    attachment_id?: Prisma.SortOrder;
    operation_id?: Prisma.SortOrder;
    image_url?: Prisma.SortOrder;
    file_type?: Prisma.SortOrder;
    uploaded_by?: Prisma.SortOrder;
    uploadedAt?: Prisma.SortOrder;
};
export type OperationImageAttachmentMaxOrderByAggregateInput = {
    attachment_id?: Prisma.SortOrder;
    operation_id?: Prisma.SortOrder;
    image_url?: Prisma.SortOrder;
    file_type?: Prisma.SortOrder;
    uploaded_by?: Prisma.SortOrder;
    uploadedAt?: Prisma.SortOrder;
};
export type OperationImageAttachmentMinOrderByAggregateInput = {
    attachment_id?: Prisma.SortOrder;
    operation_id?: Prisma.SortOrder;
    image_url?: Prisma.SortOrder;
    file_type?: Prisma.SortOrder;
    uploaded_by?: Prisma.SortOrder;
    uploadedAt?: Prisma.SortOrder;
};
export type OperationImageAttachmentCreateNestedManyWithoutUploaderInput = {
    create?: Prisma.XOR<Prisma.OperationImageAttachmentCreateWithoutUploaderInput, Prisma.OperationImageAttachmentUncheckedCreateWithoutUploaderInput> | Prisma.OperationImageAttachmentCreateWithoutUploaderInput[] | Prisma.OperationImageAttachmentUncheckedCreateWithoutUploaderInput[];
    connectOrCreate?: Prisma.OperationImageAttachmentCreateOrConnectWithoutUploaderInput | Prisma.OperationImageAttachmentCreateOrConnectWithoutUploaderInput[];
    createMany?: Prisma.OperationImageAttachmentCreateManyUploaderInputEnvelope;
    connect?: Prisma.OperationImageAttachmentWhereUniqueInput | Prisma.OperationImageAttachmentWhereUniqueInput[];
};
export type OperationImageAttachmentUncheckedCreateNestedManyWithoutUploaderInput = {
    create?: Prisma.XOR<Prisma.OperationImageAttachmentCreateWithoutUploaderInput, Prisma.OperationImageAttachmentUncheckedCreateWithoutUploaderInput> | Prisma.OperationImageAttachmentCreateWithoutUploaderInput[] | Prisma.OperationImageAttachmentUncheckedCreateWithoutUploaderInput[];
    connectOrCreate?: Prisma.OperationImageAttachmentCreateOrConnectWithoutUploaderInput | Prisma.OperationImageAttachmentCreateOrConnectWithoutUploaderInput[];
    createMany?: Prisma.OperationImageAttachmentCreateManyUploaderInputEnvelope;
    connect?: Prisma.OperationImageAttachmentWhereUniqueInput | Prisma.OperationImageAttachmentWhereUniqueInput[];
};
export type OperationImageAttachmentUpdateManyWithoutUploaderNestedInput = {
    create?: Prisma.XOR<Prisma.OperationImageAttachmentCreateWithoutUploaderInput, Prisma.OperationImageAttachmentUncheckedCreateWithoutUploaderInput> | Prisma.OperationImageAttachmentCreateWithoutUploaderInput[] | Prisma.OperationImageAttachmentUncheckedCreateWithoutUploaderInput[];
    connectOrCreate?: Prisma.OperationImageAttachmentCreateOrConnectWithoutUploaderInput | Prisma.OperationImageAttachmentCreateOrConnectWithoutUploaderInput[];
    upsert?: Prisma.OperationImageAttachmentUpsertWithWhereUniqueWithoutUploaderInput | Prisma.OperationImageAttachmentUpsertWithWhereUniqueWithoutUploaderInput[];
    createMany?: Prisma.OperationImageAttachmentCreateManyUploaderInputEnvelope;
    set?: Prisma.OperationImageAttachmentWhereUniqueInput | Prisma.OperationImageAttachmentWhereUniqueInput[];
    disconnect?: Prisma.OperationImageAttachmentWhereUniqueInput | Prisma.OperationImageAttachmentWhereUniqueInput[];
    delete?: Prisma.OperationImageAttachmentWhereUniqueInput | Prisma.OperationImageAttachmentWhereUniqueInput[];
    connect?: Prisma.OperationImageAttachmentWhereUniqueInput | Prisma.OperationImageAttachmentWhereUniqueInput[];
    update?: Prisma.OperationImageAttachmentUpdateWithWhereUniqueWithoutUploaderInput | Prisma.OperationImageAttachmentUpdateWithWhereUniqueWithoutUploaderInput[];
    updateMany?: Prisma.OperationImageAttachmentUpdateManyWithWhereWithoutUploaderInput | Prisma.OperationImageAttachmentUpdateManyWithWhereWithoutUploaderInput[];
    deleteMany?: Prisma.OperationImageAttachmentScalarWhereInput | Prisma.OperationImageAttachmentScalarWhereInput[];
};
export type OperationImageAttachmentUncheckedUpdateManyWithoutUploaderNestedInput = {
    create?: Prisma.XOR<Prisma.OperationImageAttachmentCreateWithoutUploaderInput, Prisma.OperationImageAttachmentUncheckedCreateWithoutUploaderInput> | Prisma.OperationImageAttachmentCreateWithoutUploaderInput[] | Prisma.OperationImageAttachmentUncheckedCreateWithoutUploaderInput[];
    connectOrCreate?: Prisma.OperationImageAttachmentCreateOrConnectWithoutUploaderInput | Prisma.OperationImageAttachmentCreateOrConnectWithoutUploaderInput[];
    upsert?: Prisma.OperationImageAttachmentUpsertWithWhereUniqueWithoutUploaderInput | Prisma.OperationImageAttachmentUpsertWithWhereUniqueWithoutUploaderInput[];
    createMany?: Prisma.OperationImageAttachmentCreateManyUploaderInputEnvelope;
    set?: Prisma.OperationImageAttachmentWhereUniqueInput | Prisma.OperationImageAttachmentWhereUniqueInput[];
    disconnect?: Prisma.OperationImageAttachmentWhereUniqueInput | Prisma.OperationImageAttachmentWhereUniqueInput[];
    delete?: Prisma.OperationImageAttachmentWhereUniqueInput | Prisma.OperationImageAttachmentWhereUniqueInput[];
    connect?: Prisma.OperationImageAttachmentWhereUniqueInput | Prisma.OperationImageAttachmentWhereUniqueInput[];
    update?: Prisma.OperationImageAttachmentUpdateWithWhereUniqueWithoutUploaderInput | Prisma.OperationImageAttachmentUpdateWithWhereUniqueWithoutUploaderInput[];
    updateMany?: Prisma.OperationImageAttachmentUpdateManyWithWhereWithoutUploaderInput | Prisma.OperationImageAttachmentUpdateManyWithWhereWithoutUploaderInput[];
    deleteMany?: Prisma.OperationImageAttachmentScalarWhereInput | Prisma.OperationImageAttachmentScalarWhereInput[];
};
export type OperationImageAttachmentCreateNestedManyWithoutOperationInput = {
    create?: Prisma.XOR<Prisma.OperationImageAttachmentCreateWithoutOperationInput, Prisma.OperationImageAttachmentUncheckedCreateWithoutOperationInput> | Prisma.OperationImageAttachmentCreateWithoutOperationInput[] | Prisma.OperationImageAttachmentUncheckedCreateWithoutOperationInput[];
    connectOrCreate?: Prisma.OperationImageAttachmentCreateOrConnectWithoutOperationInput | Prisma.OperationImageAttachmentCreateOrConnectWithoutOperationInput[];
    createMany?: Prisma.OperationImageAttachmentCreateManyOperationInputEnvelope;
    connect?: Prisma.OperationImageAttachmentWhereUniqueInput | Prisma.OperationImageAttachmentWhereUniqueInput[];
};
export type OperationImageAttachmentUncheckedCreateNestedManyWithoutOperationInput = {
    create?: Prisma.XOR<Prisma.OperationImageAttachmentCreateWithoutOperationInput, Prisma.OperationImageAttachmentUncheckedCreateWithoutOperationInput> | Prisma.OperationImageAttachmentCreateWithoutOperationInput[] | Prisma.OperationImageAttachmentUncheckedCreateWithoutOperationInput[];
    connectOrCreate?: Prisma.OperationImageAttachmentCreateOrConnectWithoutOperationInput | Prisma.OperationImageAttachmentCreateOrConnectWithoutOperationInput[];
    createMany?: Prisma.OperationImageAttachmentCreateManyOperationInputEnvelope;
    connect?: Prisma.OperationImageAttachmentWhereUniqueInput | Prisma.OperationImageAttachmentWhereUniqueInput[];
};
export type OperationImageAttachmentUpdateManyWithoutOperationNestedInput = {
    create?: Prisma.XOR<Prisma.OperationImageAttachmentCreateWithoutOperationInput, Prisma.OperationImageAttachmentUncheckedCreateWithoutOperationInput> | Prisma.OperationImageAttachmentCreateWithoutOperationInput[] | Prisma.OperationImageAttachmentUncheckedCreateWithoutOperationInput[];
    connectOrCreate?: Prisma.OperationImageAttachmentCreateOrConnectWithoutOperationInput | Prisma.OperationImageAttachmentCreateOrConnectWithoutOperationInput[];
    upsert?: Prisma.OperationImageAttachmentUpsertWithWhereUniqueWithoutOperationInput | Prisma.OperationImageAttachmentUpsertWithWhereUniqueWithoutOperationInput[];
    createMany?: Prisma.OperationImageAttachmentCreateManyOperationInputEnvelope;
    set?: Prisma.OperationImageAttachmentWhereUniqueInput | Prisma.OperationImageAttachmentWhereUniqueInput[];
    disconnect?: Prisma.OperationImageAttachmentWhereUniqueInput | Prisma.OperationImageAttachmentWhereUniqueInput[];
    delete?: Prisma.OperationImageAttachmentWhereUniqueInput | Prisma.OperationImageAttachmentWhereUniqueInput[];
    connect?: Prisma.OperationImageAttachmentWhereUniqueInput | Prisma.OperationImageAttachmentWhereUniqueInput[];
    update?: Prisma.OperationImageAttachmentUpdateWithWhereUniqueWithoutOperationInput | Prisma.OperationImageAttachmentUpdateWithWhereUniqueWithoutOperationInput[];
    updateMany?: Prisma.OperationImageAttachmentUpdateManyWithWhereWithoutOperationInput | Prisma.OperationImageAttachmentUpdateManyWithWhereWithoutOperationInput[];
    deleteMany?: Prisma.OperationImageAttachmentScalarWhereInput | Prisma.OperationImageAttachmentScalarWhereInput[];
};
export type OperationImageAttachmentUncheckedUpdateManyWithoutOperationNestedInput = {
    create?: Prisma.XOR<Prisma.OperationImageAttachmentCreateWithoutOperationInput, Prisma.OperationImageAttachmentUncheckedCreateWithoutOperationInput> | Prisma.OperationImageAttachmentCreateWithoutOperationInput[] | Prisma.OperationImageAttachmentUncheckedCreateWithoutOperationInput[];
    connectOrCreate?: Prisma.OperationImageAttachmentCreateOrConnectWithoutOperationInput | Prisma.OperationImageAttachmentCreateOrConnectWithoutOperationInput[];
    upsert?: Prisma.OperationImageAttachmentUpsertWithWhereUniqueWithoutOperationInput | Prisma.OperationImageAttachmentUpsertWithWhereUniqueWithoutOperationInput[];
    createMany?: Prisma.OperationImageAttachmentCreateManyOperationInputEnvelope;
    set?: Prisma.OperationImageAttachmentWhereUniqueInput | Prisma.OperationImageAttachmentWhereUniqueInput[];
    disconnect?: Prisma.OperationImageAttachmentWhereUniqueInput | Prisma.OperationImageAttachmentWhereUniqueInput[];
    delete?: Prisma.OperationImageAttachmentWhereUniqueInput | Prisma.OperationImageAttachmentWhereUniqueInput[];
    connect?: Prisma.OperationImageAttachmentWhereUniqueInput | Prisma.OperationImageAttachmentWhereUniqueInput[];
    update?: Prisma.OperationImageAttachmentUpdateWithWhereUniqueWithoutOperationInput | Prisma.OperationImageAttachmentUpdateWithWhereUniqueWithoutOperationInput[];
    updateMany?: Prisma.OperationImageAttachmentUpdateManyWithWhereWithoutOperationInput | Prisma.OperationImageAttachmentUpdateManyWithWhereWithoutOperationInput[];
    deleteMany?: Prisma.OperationImageAttachmentScalarWhereInput | Prisma.OperationImageAttachmentScalarWhereInput[];
};
export type OperationImageAttachmentCreateWithoutUploaderInput = {
    attachment_id?: string;
    image_url: string;
    file_type?: string | null;
    uploadedAt?: Date | string;
    operation: Prisma.OperationLogCreateNestedOneWithoutImagesInput;
};
export type OperationImageAttachmentUncheckedCreateWithoutUploaderInput = {
    attachment_id?: string;
    operation_id: string;
    image_url: string;
    file_type?: string | null;
    uploadedAt?: Date | string;
};
export type OperationImageAttachmentCreateOrConnectWithoutUploaderInput = {
    where: Prisma.OperationImageAttachmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.OperationImageAttachmentCreateWithoutUploaderInput, Prisma.OperationImageAttachmentUncheckedCreateWithoutUploaderInput>;
};
export type OperationImageAttachmentCreateManyUploaderInputEnvelope = {
    data: Prisma.OperationImageAttachmentCreateManyUploaderInput | Prisma.OperationImageAttachmentCreateManyUploaderInput[];
    skipDuplicates?: boolean;
};
export type OperationImageAttachmentUpsertWithWhereUniqueWithoutUploaderInput = {
    where: Prisma.OperationImageAttachmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.OperationImageAttachmentUpdateWithoutUploaderInput, Prisma.OperationImageAttachmentUncheckedUpdateWithoutUploaderInput>;
    create: Prisma.XOR<Prisma.OperationImageAttachmentCreateWithoutUploaderInput, Prisma.OperationImageAttachmentUncheckedCreateWithoutUploaderInput>;
};
export type OperationImageAttachmentUpdateWithWhereUniqueWithoutUploaderInput = {
    where: Prisma.OperationImageAttachmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.OperationImageAttachmentUpdateWithoutUploaderInput, Prisma.OperationImageAttachmentUncheckedUpdateWithoutUploaderInput>;
};
export type OperationImageAttachmentUpdateManyWithWhereWithoutUploaderInput = {
    where: Prisma.OperationImageAttachmentScalarWhereInput;
    data: Prisma.XOR<Prisma.OperationImageAttachmentUpdateManyMutationInput, Prisma.OperationImageAttachmentUncheckedUpdateManyWithoutUploaderInput>;
};
export type OperationImageAttachmentScalarWhereInput = {
    AND?: Prisma.OperationImageAttachmentScalarWhereInput | Prisma.OperationImageAttachmentScalarWhereInput[];
    OR?: Prisma.OperationImageAttachmentScalarWhereInput[];
    NOT?: Prisma.OperationImageAttachmentScalarWhereInput | Prisma.OperationImageAttachmentScalarWhereInput[];
    attachment_id?: Prisma.StringFilter<"OperationImageAttachment"> | string;
    operation_id?: Prisma.StringFilter<"OperationImageAttachment"> | string;
    image_url?: Prisma.StringFilter<"OperationImageAttachment"> | string;
    file_type?: Prisma.StringNullableFilter<"OperationImageAttachment"> | string | null;
    uploaded_by?: Prisma.StringFilter<"OperationImageAttachment"> | string;
    uploadedAt?: Prisma.DateTimeFilter<"OperationImageAttachment"> | Date | string;
};
export type OperationImageAttachmentCreateWithoutOperationInput = {
    attachment_id?: string;
    image_url: string;
    file_type?: string | null;
    uploadedAt?: Date | string;
    uploader: Prisma.UserCreateNestedOneWithoutOperationImagesInput;
};
export type OperationImageAttachmentUncheckedCreateWithoutOperationInput = {
    attachment_id?: string;
    image_url: string;
    file_type?: string | null;
    uploaded_by: string;
    uploadedAt?: Date | string;
};
export type OperationImageAttachmentCreateOrConnectWithoutOperationInput = {
    where: Prisma.OperationImageAttachmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.OperationImageAttachmentCreateWithoutOperationInput, Prisma.OperationImageAttachmentUncheckedCreateWithoutOperationInput>;
};
export type OperationImageAttachmentCreateManyOperationInputEnvelope = {
    data: Prisma.OperationImageAttachmentCreateManyOperationInput | Prisma.OperationImageAttachmentCreateManyOperationInput[];
    skipDuplicates?: boolean;
};
export type OperationImageAttachmentUpsertWithWhereUniqueWithoutOperationInput = {
    where: Prisma.OperationImageAttachmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.OperationImageAttachmentUpdateWithoutOperationInput, Prisma.OperationImageAttachmentUncheckedUpdateWithoutOperationInput>;
    create: Prisma.XOR<Prisma.OperationImageAttachmentCreateWithoutOperationInput, Prisma.OperationImageAttachmentUncheckedCreateWithoutOperationInput>;
};
export type OperationImageAttachmentUpdateWithWhereUniqueWithoutOperationInput = {
    where: Prisma.OperationImageAttachmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.OperationImageAttachmentUpdateWithoutOperationInput, Prisma.OperationImageAttachmentUncheckedUpdateWithoutOperationInput>;
};
export type OperationImageAttachmentUpdateManyWithWhereWithoutOperationInput = {
    where: Prisma.OperationImageAttachmentScalarWhereInput;
    data: Prisma.XOR<Prisma.OperationImageAttachmentUpdateManyMutationInput, Prisma.OperationImageAttachmentUncheckedUpdateManyWithoutOperationInput>;
};
export type OperationImageAttachmentCreateManyUploaderInput = {
    attachment_id?: string;
    operation_id: string;
    image_url: string;
    file_type?: string | null;
    uploadedAt?: Date | string;
};
export type OperationImageAttachmentUpdateWithoutUploaderInput = {
    attachment_id?: Prisma.StringFieldUpdateOperationsInput | string;
    image_url?: Prisma.StringFieldUpdateOperationsInput | string;
    file_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    operation?: Prisma.OperationLogUpdateOneRequiredWithoutImagesNestedInput;
};
export type OperationImageAttachmentUncheckedUpdateWithoutUploaderInput = {
    attachment_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    image_url?: Prisma.StringFieldUpdateOperationsInput | string;
    file_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OperationImageAttachmentUncheckedUpdateManyWithoutUploaderInput = {
    attachment_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_id?: Prisma.StringFieldUpdateOperationsInput | string;
    image_url?: Prisma.StringFieldUpdateOperationsInput | string;
    file_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OperationImageAttachmentCreateManyOperationInput = {
    attachment_id?: string;
    image_url: string;
    file_type?: string | null;
    uploaded_by: string;
    uploadedAt?: Date | string;
};
export type OperationImageAttachmentUpdateWithoutOperationInput = {
    attachment_id?: Prisma.StringFieldUpdateOperationsInput | string;
    image_url?: Prisma.StringFieldUpdateOperationsInput | string;
    file_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    uploader?: Prisma.UserUpdateOneRequiredWithoutOperationImagesNestedInput;
};
export type OperationImageAttachmentUncheckedUpdateWithoutOperationInput = {
    attachment_id?: Prisma.StringFieldUpdateOperationsInput | string;
    image_url?: Prisma.StringFieldUpdateOperationsInput | string;
    file_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploaded_by?: Prisma.StringFieldUpdateOperationsInput | string;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OperationImageAttachmentUncheckedUpdateManyWithoutOperationInput = {
    attachment_id?: Prisma.StringFieldUpdateOperationsInput | string;
    image_url?: Prisma.StringFieldUpdateOperationsInput | string;
    file_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploaded_by?: Prisma.StringFieldUpdateOperationsInput | string;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OperationImageAttachmentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    attachment_id?: boolean;
    operation_id?: boolean;
    image_url?: boolean;
    file_type?: boolean;
    uploaded_by?: boolean;
    uploadedAt?: boolean;
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
    uploader?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["operationImageAttachment"]>;
export type OperationImageAttachmentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    attachment_id?: boolean;
    operation_id?: boolean;
    image_url?: boolean;
    file_type?: boolean;
    uploaded_by?: boolean;
    uploadedAt?: boolean;
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
    uploader?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["operationImageAttachment"]>;
export type OperationImageAttachmentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    attachment_id?: boolean;
    operation_id?: boolean;
    image_url?: boolean;
    file_type?: boolean;
    uploaded_by?: boolean;
    uploadedAt?: boolean;
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
    uploader?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["operationImageAttachment"]>;
export type OperationImageAttachmentSelectScalar = {
    attachment_id?: boolean;
    operation_id?: boolean;
    image_url?: boolean;
    file_type?: boolean;
    uploaded_by?: boolean;
    uploadedAt?: boolean;
};
export type OperationImageAttachmentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"attachment_id" | "operation_id" | "image_url" | "file_type" | "uploaded_by" | "uploadedAt", ExtArgs["result"]["operationImageAttachment"]>;
export type OperationImageAttachmentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
    uploader?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type OperationImageAttachmentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
    uploader?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type OperationImageAttachmentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    operation?: boolean | Prisma.OperationLogDefaultArgs<ExtArgs>;
    uploader?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $OperationImageAttachmentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "OperationImageAttachment";
    objects: {
        operation: Prisma.$OperationLogPayload<ExtArgs>;
        uploader: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        attachment_id: string;
        operation_id: string;
        image_url: string;
        file_type: string | null;
        uploaded_by: string;
        uploadedAt: Date;
    }, ExtArgs["result"]["operationImageAttachment"]>;
    composites: {};
};
export type OperationImageAttachmentGetPayload<S extends boolean | null | undefined | OperationImageAttachmentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OperationImageAttachmentPayload, S>;
export type OperationImageAttachmentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OperationImageAttachmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OperationImageAttachmentCountAggregateInputType | true;
};
export interface OperationImageAttachmentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['OperationImageAttachment'];
        meta: {
            name: 'OperationImageAttachment';
        };
    };
    /**
     * Find zero or one OperationImageAttachment that matches the filter.
     * @param {OperationImageAttachmentFindUniqueArgs} args - Arguments to find a OperationImageAttachment
     * @example
     * // Get one OperationImageAttachment
     * const operationImageAttachment = await prisma.operationImageAttachment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OperationImageAttachmentFindUniqueArgs>(args: Prisma.SelectSubset<T, OperationImageAttachmentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OperationImageAttachmentClient<runtime.Types.Result.GetResult<Prisma.$OperationImageAttachmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one OperationImageAttachment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OperationImageAttachmentFindUniqueOrThrowArgs} args - Arguments to find a OperationImageAttachment
     * @example
     * // Get one OperationImageAttachment
     * const operationImageAttachment = await prisma.operationImageAttachment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OperationImageAttachmentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OperationImageAttachmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OperationImageAttachmentClient<runtime.Types.Result.GetResult<Prisma.$OperationImageAttachmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first OperationImageAttachment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationImageAttachmentFindFirstArgs} args - Arguments to find a OperationImageAttachment
     * @example
     * // Get one OperationImageAttachment
     * const operationImageAttachment = await prisma.operationImageAttachment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OperationImageAttachmentFindFirstArgs>(args?: Prisma.SelectSubset<T, OperationImageAttachmentFindFirstArgs<ExtArgs>>): Prisma.Prisma__OperationImageAttachmentClient<runtime.Types.Result.GetResult<Prisma.$OperationImageAttachmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first OperationImageAttachment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationImageAttachmentFindFirstOrThrowArgs} args - Arguments to find a OperationImageAttachment
     * @example
     * // Get one OperationImageAttachment
     * const operationImageAttachment = await prisma.operationImageAttachment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OperationImageAttachmentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OperationImageAttachmentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OperationImageAttachmentClient<runtime.Types.Result.GetResult<Prisma.$OperationImageAttachmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more OperationImageAttachments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationImageAttachmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OperationImageAttachments
     * const operationImageAttachments = await prisma.operationImageAttachment.findMany()
     *
     * // Get first 10 OperationImageAttachments
     * const operationImageAttachments = await prisma.operationImageAttachment.findMany({ take: 10 })
     *
     * // Only select the `attachment_id`
     * const operationImageAttachmentWithAttachment_idOnly = await prisma.operationImageAttachment.findMany({ select: { attachment_id: true } })
     *
     */
    findMany<T extends OperationImageAttachmentFindManyArgs>(args?: Prisma.SelectSubset<T, OperationImageAttachmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OperationImageAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a OperationImageAttachment.
     * @param {OperationImageAttachmentCreateArgs} args - Arguments to create a OperationImageAttachment.
     * @example
     * // Create one OperationImageAttachment
     * const OperationImageAttachment = await prisma.operationImageAttachment.create({
     *   data: {
     *     // ... data to create a OperationImageAttachment
     *   }
     * })
     *
     */
    create<T extends OperationImageAttachmentCreateArgs>(args: Prisma.SelectSubset<T, OperationImageAttachmentCreateArgs<ExtArgs>>): Prisma.Prisma__OperationImageAttachmentClient<runtime.Types.Result.GetResult<Prisma.$OperationImageAttachmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many OperationImageAttachments.
     * @param {OperationImageAttachmentCreateManyArgs} args - Arguments to create many OperationImageAttachments.
     * @example
     * // Create many OperationImageAttachments
     * const operationImageAttachment = await prisma.operationImageAttachment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends OperationImageAttachmentCreateManyArgs>(args?: Prisma.SelectSubset<T, OperationImageAttachmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many OperationImageAttachments and returns the data saved in the database.
     * @param {OperationImageAttachmentCreateManyAndReturnArgs} args - Arguments to create many OperationImageAttachments.
     * @example
     * // Create many OperationImageAttachments
     * const operationImageAttachment = await prisma.operationImageAttachment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many OperationImageAttachments and only return the `attachment_id`
     * const operationImageAttachmentWithAttachment_idOnly = await prisma.operationImageAttachment.createManyAndReturn({
     *   select: { attachment_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends OperationImageAttachmentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OperationImageAttachmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OperationImageAttachmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a OperationImageAttachment.
     * @param {OperationImageAttachmentDeleteArgs} args - Arguments to delete one OperationImageAttachment.
     * @example
     * // Delete one OperationImageAttachment
     * const OperationImageAttachment = await prisma.operationImageAttachment.delete({
     *   where: {
     *     // ... filter to delete one OperationImageAttachment
     *   }
     * })
     *
     */
    delete<T extends OperationImageAttachmentDeleteArgs>(args: Prisma.SelectSubset<T, OperationImageAttachmentDeleteArgs<ExtArgs>>): Prisma.Prisma__OperationImageAttachmentClient<runtime.Types.Result.GetResult<Prisma.$OperationImageAttachmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one OperationImageAttachment.
     * @param {OperationImageAttachmentUpdateArgs} args - Arguments to update one OperationImageAttachment.
     * @example
     * // Update one OperationImageAttachment
     * const operationImageAttachment = await prisma.operationImageAttachment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends OperationImageAttachmentUpdateArgs>(args: Prisma.SelectSubset<T, OperationImageAttachmentUpdateArgs<ExtArgs>>): Prisma.Prisma__OperationImageAttachmentClient<runtime.Types.Result.GetResult<Prisma.$OperationImageAttachmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more OperationImageAttachments.
     * @param {OperationImageAttachmentDeleteManyArgs} args - Arguments to filter OperationImageAttachments to delete.
     * @example
     * // Delete a few OperationImageAttachments
     * const { count } = await prisma.operationImageAttachment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends OperationImageAttachmentDeleteManyArgs>(args?: Prisma.SelectSubset<T, OperationImageAttachmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more OperationImageAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationImageAttachmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OperationImageAttachments
     * const operationImageAttachment = await prisma.operationImageAttachment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends OperationImageAttachmentUpdateManyArgs>(args: Prisma.SelectSubset<T, OperationImageAttachmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more OperationImageAttachments and returns the data updated in the database.
     * @param {OperationImageAttachmentUpdateManyAndReturnArgs} args - Arguments to update many OperationImageAttachments.
     * @example
     * // Update many OperationImageAttachments
     * const operationImageAttachment = await prisma.operationImageAttachment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more OperationImageAttachments and only return the `attachment_id`
     * const operationImageAttachmentWithAttachment_idOnly = await prisma.operationImageAttachment.updateManyAndReturn({
     *   select: { attachment_id: true },
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
    updateManyAndReturn<T extends OperationImageAttachmentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OperationImageAttachmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OperationImageAttachmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one OperationImageAttachment.
     * @param {OperationImageAttachmentUpsertArgs} args - Arguments to update or create a OperationImageAttachment.
     * @example
     * // Update or create a OperationImageAttachment
     * const operationImageAttachment = await prisma.operationImageAttachment.upsert({
     *   create: {
     *     // ... data to create a OperationImageAttachment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OperationImageAttachment we want to update
     *   }
     * })
     */
    upsert<T extends OperationImageAttachmentUpsertArgs>(args: Prisma.SelectSubset<T, OperationImageAttachmentUpsertArgs<ExtArgs>>): Prisma.Prisma__OperationImageAttachmentClient<runtime.Types.Result.GetResult<Prisma.$OperationImageAttachmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of OperationImageAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationImageAttachmentCountArgs} args - Arguments to filter OperationImageAttachments to count.
     * @example
     * // Count the number of OperationImageAttachments
     * const count = await prisma.operationImageAttachment.count({
     *   where: {
     *     // ... the filter for the OperationImageAttachments we want to count
     *   }
     * })
    **/
    count<T extends OperationImageAttachmentCountArgs>(args?: Prisma.Subset<T, OperationImageAttachmentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OperationImageAttachmentCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a OperationImageAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationImageAttachmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OperationImageAttachmentAggregateArgs>(args: Prisma.Subset<T, OperationImageAttachmentAggregateArgs>): Prisma.PrismaPromise<GetOperationImageAttachmentAggregateType<T>>;
    /**
     * Group by OperationImageAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationImageAttachmentGroupByArgs} args - Group by arguments.
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
    groupBy<T extends OperationImageAttachmentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OperationImageAttachmentGroupByArgs['orderBy'];
    } : {
        orderBy?: OperationImageAttachmentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OperationImageAttachmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOperationImageAttachmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the OperationImageAttachment model
     */
    readonly fields: OperationImageAttachmentFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for OperationImageAttachment.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__OperationImageAttachmentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    operation<T extends Prisma.OperationLogDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OperationLogDefaultArgs<ExtArgs>>): Prisma.Prisma__OperationLogClient<runtime.Types.Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    uploader<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the OperationImageAttachment model
 */
export interface OperationImageAttachmentFieldRefs {
    readonly attachment_id: Prisma.FieldRef<"OperationImageAttachment", 'String'>;
    readonly operation_id: Prisma.FieldRef<"OperationImageAttachment", 'String'>;
    readonly image_url: Prisma.FieldRef<"OperationImageAttachment", 'String'>;
    readonly file_type: Prisma.FieldRef<"OperationImageAttachment", 'String'>;
    readonly uploaded_by: Prisma.FieldRef<"OperationImageAttachment", 'String'>;
    readonly uploadedAt: Prisma.FieldRef<"OperationImageAttachment", 'DateTime'>;
}
/**
 * OperationImageAttachment findUnique
 */
export type OperationImageAttachmentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationImageAttachment
     */
    select?: Prisma.OperationImageAttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OperationImageAttachment
     */
    omit?: Prisma.OperationImageAttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OperationImageAttachmentInclude<ExtArgs> | null;
    /**
     * Filter, which OperationImageAttachment to fetch.
     */
    where: Prisma.OperationImageAttachmentWhereUniqueInput;
};
/**
 * OperationImageAttachment findUniqueOrThrow
 */
export type OperationImageAttachmentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationImageAttachment
     */
    select?: Prisma.OperationImageAttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OperationImageAttachment
     */
    omit?: Prisma.OperationImageAttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OperationImageAttachmentInclude<ExtArgs> | null;
    /**
     * Filter, which OperationImageAttachment to fetch.
     */
    where: Prisma.OperationImageAttachmentWhereUniqueInput;
};
/**
 * OperationImageAttachment findFirst
 */
export type OperationImageAttachmentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationImageAttachment
     */
    select?: Prisma.OperationImageAttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OperationImageAttachment
     */
    omit?: Prisma.OperationImageAttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OperationImageAttachmentInclude<ExtArgs> | null;
    /**
     * Filter, which OperationImageAttachment to fetch.
     */
    where?: Prisma.OperationImageAttachmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OperationImageAttachments to fetch.
     */
    orderBy?: Prisma.OperationImageAttachmentOrderByWithRelationInput | Prisma.OperationImageAttachmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OperationImageAttachments.
     */
    cursor?: Prisma.OperationImageAttachmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OperationImageAttachments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OperationImageAttachments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OperationImageAttachments.
     */
    distinct?: Prisma.OperationImageAttachmentScalarFieldEnum | Prisma.OperationImageAttachmentScalarFieldEnum[];
};
/**
 * OperationImageAttachment findFirstOrThrow
 */
export type OperationImageAttachmentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationImageAttachment
     */
    select?: Prisma.OperationImageAttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OperationImageAttachment
     */
    omit?: Prisma.OperationImageAttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OperationImageAttachmentInclude<ExtArgs> | null;
    /**
     * Filter, which OperationImageAttachment to fetch.
     */
    where?: Prisma.OperationImageAttachmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OperationImageAttachments to fetch.
     */
    orderBy?: Prisma.OperationImageAttachmentOrderByWithRelationInput | Prisma.OperationImageAttachmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OperationImageAttachments.
     */
    cursor?: Prisma.OperationImageAttachmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OperationImageAttachments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OperationImageAttachments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OperationImageAttachments.
     */
    distinct?: Prisma.OperationImageAttachmentScalarFieldEnum | Prisma.OperationImageAttachmentScalarFieldEnum[];
};
/**
 * OperationImageAttachment findMany
 */
export type OperationImageAttachmentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationImageAttachment
     */
    select?: Prisma.OperationImageAttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OperationImageAttachment
     */
    omit?: Prisma.OperationImageAttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OperationImageAttachmentInclude<ExtArgs> | null;
    /**
     * Filter, which OperationImageAttachments to fetch.
     */
    where?: Prisma.OperationImageAttachmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OperationImageAttachments to fetch.
     */
    orderBy?: Prisma.OperationImageAttachmentOrderByWithRelationInput | Prisma.OperationImageAttachmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing OperationImageAttachments.
     */
    cursor?: Prisma.OperationImageAttachmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OperationImageAttachments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OperationImageAttachments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OperationImageAttachments.
     */
    distinct?: Prisma.OperationImageAttachmentScalarFieldEnum | Prisma.OperationImageAttachmentScalarFieldEnum[];
};
/**
 * OperationImageAttachment create
 */
export type OperationImageAttachmentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationImageAttachment
     */
    select?: Prisma.OperationImageAttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OperationImageAttachment
     */
    omit?: Prisma.OperationImageAttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OperationImageAttachmentInclude<ExtArgs> | null;
    /**
     * The data needed to create a OperationImageAttachment.
     */
    data: Prisma.XOR<Prisma.OperationImageAttachmentCreateInput, Prisma.OperationImageAttachmentUncheckedCreateInput>;
};
/**
 * OperationImageAttachment createMany
 */
export type OperationImageAttachmentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many OperationImageAttachments.
     */
    data: Prisma.OperationImageAttachmentCreateManyInput | Prisma.OperationImageAttachmentCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * OperationImageAttachment createManyAndReturn
 */
export type OperationImageAttachmentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationImageAttachment
     */
    select?: Prisma.OperationImageAttachmentSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the OperationImageAttachment
     */
    omit?: Prisma.OperationImageAttachmentOmit<ExtArgs> | null;
    /**
     * The data used to create many OperationImageAttachments.
     */
    data: Prisma.OperationImageAttachmentCreateManyInput | Prisma.OperationImageAttachmentCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OperationImageAttachmentIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * OperationImageAttachment update
 */
export type OperationImageAttachmentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationImageAttachment
     */
    select?: Prisma.OperationImageAttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OperationImageAttachment
     */
    omit?: Prisma.OperationImageAttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OperationImageAttachmentInclude<ExtArgs> | null;
    /**
     * The data needed to update a OperationImageAttachment.
     */
    data: Prisma.XOR<Prisma.OperationImageAttachmentUpdateInput, Prisma.OperationImageAttachmentUncheckedUpdateInput>;
    /**
     * Choose, which OperationImageAttachment to update.
     */
    where: Prisma.OperationImageAttachmentWhereUniqueInput;
};
/**
 * OperationImageAttachment updateMany
 */
export type OperationImageAttachmentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update OperationImageAttachments.
     */
    data: Prisma.XOR<Prisma.OperationImageAttachmentUpdateManyMutationInput, Prisma.OperationImageAttachmentUncheckedUpdateManyInput>;
    /**
     * Filter which OperationImageAttachments to update
     */
    where?: Prisma.OperationImageAttachmentWhereInput;
    /**
     * Limit how many OperationImageAttachments to update.
     */
    limit?: number;
};
/**
 * OperationImageAttachment updateManyAndReturn
 */
export type OperationImageAttachmentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationImageAttachment
     */
    select?: Prisma.OperationImageAttachmentSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the OperationImageAttachment
     */
    omit?: Prisma.OperationImageAttachmentOmit<ExtArgs> | null;
    /**
     * The data used to update OperationImageAttachments.
     */
    data: Prisma.XOR<Prisma.OperationImageAttachmentUpdateManyMutationInput, Prisma.OperationImageAttachmentUncheckedUpdateManyInput>;
    /**
     * Filter which OperationImageAttachments to update
     */
    where?: Prisma.OperationImageAttachmentWhereInput;
    /**
     * Limit how many OperationImageAttachments to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OperationImageAttachmentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * OperationImageAttachment upsert
 */
export type OperationImageAttachmentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationImageAttachment
     */
    select?: Prisma.OperationImageAttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OperationImageAttachment
     */
    omit?: Prisma.OperationImageAttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OperationImageAttachmentInclude<ExtArgs> | null;
    /**
     * The filter to search for the OperationImageAttachment to update in case it exists.
     */
    where: Prisma.OperationImageAttachmentWhereUniqueInput;
    /**
     * In case the OperationImageAttachment found by the `where` argument doesn't exist, create a new OperationImageAttachment with this data.
     */
    create: Prisma.XOR<Prisma.OperationImageAttachmentCreateInput, Prisma.OperationImageAttachmentUncheckedCreateInput>;
    /**
     * In case the OperationImageAttachment was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.OperationImageAttachmentUpdateInput, Prisma.OperationImageAttachmentUncheckedUpdateInput>;
};
/**
 * OperationImageAttachment delete
 */
export type OperationImageAttachmentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationImageAttachment
     */
    select?: Prisma.OperationImageAttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OperationImageAttachment
     */
    omit?: Prisma.OperationImageAttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OperationImageAttachmentInclude<ExtArgs> | null;
    /**
     * Filter which OperationImageAttachment to delete.
     */
    where: Prisma.OperationImageAttachmentWhereUniqueInput;
};
/**
 * OperationImageAttachment deleteMany
 */
export type OperationImageAttachmentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which OperationImageAttachments to delete
     */
    where?: Prisma.OperationImageAttachmentWhereInput;
    /**
     * Limit how many OperationImageAttachments to delete.
     */
    limit?: number;
};
/**
 * OperationImageAttachment without action
 */
export type OperationImageAttachmentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationImageAttachment
     */
    select?: Prisma.OperationImageAttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OperationImageAttachment
     */
    omit?: Prisma.OperationImageAttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OperationImageAttachmentInclude<ExtArgs> | null;
};
//# sourceMappingURL=OperationImageAttachment.d.ts.map