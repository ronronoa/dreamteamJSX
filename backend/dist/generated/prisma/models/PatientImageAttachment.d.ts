import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model PatientImageAttachment
 *
 */
export type PatientImageAttachmentModel = runtime.Types.Result.DefaultSelection<Prisma.$PatientImageAttachmentPayload>;
export type AggregatePatientImageAttachment = {
    _count: PatientImageAttachmentCountAggregateOutputType | null;
    _min: PatientImageAttachmentMinAggregateOutputType | null;
    _max: PatientImageAttachmentMaxAggregateOutputType | null;
};
export type PatientImageAttachmentMinAggregateOutputType = {
    attachment_id: string | null;
    patient_id: string | null;
    image_url: string | null;
    file_type: string | null;
    uploaded_by: string | null;
    uploadedAt: Date | null;
};
export type PatientImageAttachmentMaxAggregateOutputType = {
    attachment_id: string | null;
    patient_id: string | null;
    image_url: string | null;
    file_type: string | null;
    uploaded_by: string | null;
    uploadedAt: Date | null;
};
export type PatientImageAttachmentCountAggregateOutputType = {
    attachment_id: number;
    patient_id: number;
    image_url: number;
    file_type: number;
    uploaded_by: number;
    uploadedAt: number;
    _all: number;
};
export type PatientImageAttachmentMinAggregateInputType = {
    attachment_id?: true;
    patient_id?: true;
    image_url?: true;
    file_type?: true;
    uploaded_by?: true;
    uploadedAt?: true;
};
export type PatientImageAttachmentMaxAggregateInputType = {
    attachment_id?: true;
    patient_id?: true;
    image_url?: true;
    file_type?: true;
    uploaded_by?: true;
    uploadedAt?: true;
};
export type PatientImageAttachmentCountAggregateInputType = {
    attachment_id?: true;
    patient_id?: true;
    image_url?: true;
    file_type?: true;
    uploaded_by?: true;
    uploadedAt?: true;
    _all?: true;
};
export type PatientImageAttachmentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PatientImageAttachment to aggregate.
     */
    where?: Prisma.PatientImageAttachmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PatientImageAttachments to fetch.
     */
    orderBy?: Prisma.PatientImageAttachmentOrderByWithRelationInput | Prisma.PatientImageAttachmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.PatientImageAttachmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PatientImageAttachments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PatientImageAttachments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned PatientImageAttachments
    **/
    _count?: true | PatientImageAttachmentCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: PatientImageAttachmentMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: PatientImageAttachmentMaxAggregateInputType;
};
export type GetPatientImageAttachmentAggregateType<T extends PatientImageAttachmentAggregateArgs> = {
    [P in keyof T & keyof AggregatePatientImageAttachment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePatientImageAttachment[P]> : Prisma.GetScalarType<T[P], AggregatePatientImageAttachment[P]>;
};
export type PatientImageAttachmentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PatientImageAttachmentWhereInput;
    orderBy?: Prisma.PatientImageAttachmentOrderByWithAggregationInput | Prisma.PatientImageAttachmentOrderByWithAggregationInput[];
    by: Prisma.PatientImageAttachmentScalarFieldEnum[] | Prisma.PatientImageAttachmentScalarFieldEnum;
    having?: Prisma.PatientImageAttachmentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PatientImageAttachmentCountAggregateInputType | true;
    _min?: PatientImageAttachmentMinAggregateInputType;
    _max?: PatientImageAttachmentMaxAggregateInputType;
};
export type PatientImageAttachmentGroupByOutputType = {
    attachment_id: string;
    patient_id: string;
    image_url: string;
    file_type: string | null;
    uploaded_by: string;
    uploadedAt: Date;
    _count: PatientImageAttachmentCountAggregateOutputType | null;
    _min: PatientImageAttachmentMinAggregateOutputType | null;
    _max: PatientImageAttachmentMaxAggregateOutputType | null;
};
export type GetPatientImageAttachmentGroupByPayload<T extends PatientImageAttachmentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PatientImageAttachmentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PatientImageAttachmentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PatientImageAttachmentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PatientImageAttachmentGroupByOutputType[P]>;
}>>;
export type PatientImageAttachmentWhereInput = {
    AND?: Prisma.PatientImageAttachmentWhereInput | Prisma.PatientImageAttachmentWhereInput[];
    OR?: Prisma.PatientImageAttachmentWhereInput[];
    NOT?: Prisma.PatientImageAttachmentWhereInput | Prisma.PatientImageAttachmentWhereInput[];
    attachment_id?: Prisma.StringFilter<"PatientImageAttachment"> | string;
    patient_id?: Prisma.StringFilter<"PatientImageAttachment"> | string;
    image_url?: Prisma.StringFilter<"PatientImageAttachment"> | string;
    file_type?: Prisma.StringNullableFilter<"PatientImageAttachment"> | string | null;
    uploaded_by?: Prisma.StringFilter<"PatientImageAttachment"> | string;
    uploadedAt?: Prisma.DateTimeFilter<"PatientImageAttachment"> | Date | string;
    patient?: Prisma.XOR<Prisma.PatientScalarRelationFilter, Prisma.PatientWhereInput>;
    uploader?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type PatientImageAttachmentOrderByWithRelationInput = {
    attachment_id?: Prisma.SortOrder;
    patient_id?: Prisma.SortOrder;
    image_url?: Prisma.SortOrder;
    file_type?: Prisma.SortOrderInput | Prisma.SortOrder;
    uploaded_by?: Prisma.SortOrder;
    uploadedAt?: Prisma.SortOrder;
    patient?: Prisma.PatientOrderByWithRelationInput;
    uploader?: Prisma.UserOrderByWithRelationInput;
};
export type PatientImageAttachmentWhereUniqueInput = Prisma.AtLeast<{
    attachment_id?: string;
    AND?: Prisma.PatientImageAttachmentWhereInput | Prisma.PatientImageAttachmentWhereInput[];
    OR?: Prisma.PatientImageAttachmentWhereInput[];
    NOT?: Prisma.PatientImageAttachmentWhereInput | Prisma.PatientImageAttachmentWhereInput[];
    patient_id?: Prisma.StringFilter<"PatientImageAttachment"> | string;
    image_url?: Prisma.StringFilter<"PatientImageAttachment"> | string;
    file_type?: Prisma.StringNullableFilter<"PatientImageAttachment"> | string | null;
    uploaded_by?: Prisma.StringFilter<"PatientImageAttachment"> | string;
    uploadedAt?: Prisma.DateTimeFilter<"PatientImageAttachment"> | Date | string;
    patient?: Prisma.XOR<Prisma.PatientScalarRelationFilter, Prisma.PatientWhereInput>;
    uploader?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "attachment_id">;
export type PatientImageAttachmentOrderByWithAggregationInput = {
    attachment_id?: Prisma.SortOrder;
    patient_id?: Prisma.SortOrder;
    image_url?: Prisma.SortOrder;
    file_type?: Prisma.SortOrderInput | Prisma.SortOrder;
    uploaded_by?: Prisma.SortOrder;
    uploadedAt?: Prisma.SortOrder;
    _count?: Prisma.PatientImageAttachmentCountOrderByAggregateInput;
    _max?: Prisma.PatientImageAttachmentMaxOrderByAggregateInput;
    _min?: Prisma.PatientImageAttachmentMinOrderByAggregateInput;
};
export type PatientImageAttachmentScalarWhereWithAggregatesInput = {
    AND?: Prisma.PatientImageAttachmentScalarWhereWithAggregatesInput | Prisma.PatientImageAttachmentScalarWhereWithAggregatesInput[];
    OR?: Prisma.PatientImageAttachmentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PatientImageAttachmentScalarWhereWithAggregatesInput | Prisma.PatientImageAttachmentScalarWhereWithAggregatesInput[];
    attachment_id?: Prisma.StringWithAggregatesFilter<"PatientImageAttachment"> | string;
    patient_id?: Prisma.StringWithAggregatesFilter<"PatientImageAttachment"> | string;
    image_url?: Prisma.StringWithAggregatesFilter<"PatientImageAttachment"> | string;
    file_type?: Prisma.StringNullableWithAggregatesFilter<"PatientImageAttachment"> | string | null;
    uploaded_by?: Prisma.StringWithAggregatesFilter<"PatientImageAttachment"> | string;
    uploadedAt?: Prisma.DateTimeWithAggregatesFilter<"PatientImageAttachment"> | Date | string;
};
export type PatientImageAttachmentCreateInput = {
    attachment_id?: string;
    image_url: string;
    file_type?: string | null;
    uploadedAt?: Date | string;
    patient: Prisma.PatientCreateNestedOneWithoutImagesInput;
    uploader: Prisma.UserCreateNestedOneWithoutPatientImagesInput;
};
export type PatientImageAttachmentUncheckedCreateInput = {
    attachment_id?: string;
    patient_id: string;
    image_url: string;
    file_type?: string | null;
    uploaded_by: string;
    uploadedAt?: Date | string;
};
export type PatientImageAttachmentUpdateInput = {
    attachment_id?: Prisma.StringFieldUpdateOperationsInput | string;
    image_url?: Prisma.StringFieldUpdateOperationsInput | string;
    file_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    patient?: Prisma.PatientUpdateOneRequiredWithoutImagesNestedInput;
    uploader?: Prisma.UserUpdateOneRequiredWithoutPatientImagesNestedInput;
};
export type PatientImageAttachmentUncheckedUpdateInput = {
    attachment_id?: Prisma.StringFieldUpdateOperationsInput | string;
    patient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    image_url?: Prisma.StringFieldUpdateOperationsInput | string;
    file_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploaded_by?: Prisma.StringFieldUpdateOperationsInput | string;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientImageAttachmentCreateManyInput = {
    attachment_id?: string;
    patient_id: string;
    image_url: string;
    file_type?: string | null;
    uploaded_by: string;
    uploadedAt?: Date | string;
};
export type PatientImageAttachmentUpdateManyMutationInput = {
    attachment_id?: Prisma.StringFieldUpdateOperationsInput | string;
    image_url?: Prisma.StringFieldUpdateOperationsInput | string;
    file_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientImageAttachmentUncheckedUpdateManyInput = {
    attachment_id?: Prisma.StringFieldUpdateOperationsInput | string;
    patient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    image_url?: Prisma.StringFieldUpdateOperationsInput | string;
    file_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploaded_by?: Prisma.StringFieldUpdateOperationsInput | string;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientImageAttachmentListRelationFilter = {
    every?: Prisma.PatientImageAttachmentWhereInput;
    some?: Prisma.PatientImageAttachmentWhereInput;
    none?: Prisma.PatientImageAttachmentWhereInput;
};
export type PatientImageAttachmentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PatientImageAttachmentCountOrderByAggregateInput = {
    attachment_id?: Prisma.SortOrder;
    patient_id?: Prisma.SortOrder;
    image_url?: Prisma.SortOrder;
    file_type?: Prisma.SortOrder;
    uploaded_by?: Prisma.SortOrder;
    uploadedAt?: Prisma.SortOrder;
};
export type PatientImageAttachmentMaxOrderByAggregateInput = {
    attachment_id?: Prisma.SortOrder;
    patient_id?: Prisma.SortOrder;
    image_url?: Prisma.SortOrder;
    file_type?: Prisma.SortOrder;
    uploaded_by?: Prisma.SortOrder;
    uploadedAt?: Prisma.SortOrder;
};
export type PatientImageAttachmentMinOrderByAggregateInput = {
    attachment_id?: Prisma.SortOrder;
    patient_id?: Prisma.SortOrder;
    image_url?: Prisma.SortOrder;
    file_type?: Prisma.SortOrder;
    uploaded_by?: Prisma.SortOrder;
    uploadedAt?: Prisma.SortOrder;
};
export type PatientImageAttachmentCreateNestedManyWithoutUploaderInput = {
    create?: Prisma.XOR<Prisma.PatientImageAttachmentCreateWithoutUploaderInput, Prisma.PatientImageAttachmentUncheckedCreateWithoutUploaderInput> | Prisma.PatientImageAttachmentCreateWithoutUploaderInput[] | Prisma.PatientImageAttachmentUncheckedCreateWithoutUploaderInput[];
    connectOrCreate?: Prisma.PatientImageAttachmentCreateOrConnectWithoutUploaderInput | Prisma.PatientImageAttachmentCreateOrConnectWithoutUploaderInput[];
    createMany?: Prisma.PatientImageAttachmentCreateManyUploaderInputEnvelope;
    connect?: Prisma.PatientImageAttachmentWhereUniqueInput | Prisma.PatientImageAttachmentWhereUniqueInput[];
};
export type PatientImageAttachmentUncheckedCreateNestedManyWithoutUploaderInput = {
    create?: Prisma.XOR<Prisma.PatientImageAttachmentCreateWithoutUploaderInput, Prisma.PatientImageAttachmentUncheckedCreateWithoutUploaderInput> | Prisma.PatientImageAttachmentCreateWithoutUploaderInput[] | Prisma.PatientImageAttachmentUncheckedCreateWithoutUploaderInput[];
    connectOrCreate?: Prisma.PatientImageAttachmentCreateOrConnectWithoutUploaderInput | Prisma.PatientImageAttachmentCreateOrConnectWithoutUploaderInput[];
    createMany?: Prisma.PatientImageAttachmentCreateManyUploaderInputEnvelope;
    connect?: Prisma.PatientImageAttachmentWhereUniqueInput | Prisma.PatientImageAttachmentWhereUniqueInput[];
};
export type PatientImageAttachmentUpdateManyWithoutUploaderNestedInput = {
    create?: Prisma.XOR<Prisma.PatientImageAttachmentCreateWithoutUploaderInput, Prisma.PatientImageAttachmentUncheckedCreateWithoutUploaderInput> | Prisma.PatientImageAttachmentCreateWithoutUploaderInput[] | Prisma.PatientImageAttachmentUncheckedCreateWithoutUploaderInput[];
    connectOrCreate?: Prisma.PatientImageAttachmentCreateOrConnectWithoutUploaderInput | Prisma.PatientImageAttachmentCreateOrConnectWithoutUploaderInput[];
    upsert?: Prisma.PatientImageAttachmentUpsertWithWhereUniqueWithoutUploaderInput | Prisma.PatientImageAttachmentUpsertWithWhereUniqueWithoutUploaderInput[];
    createMany?: Prisma.PatientImageAttachmentCreateManyUploaderInputEnvelope;
    set?: Prisma.PatientImageAttachmentWhereUniqueInput | Prisma.PatientImageAttachmentWhereUniqueInput[];
    disconnect?: Prisma.PatientImageAttachmentWhereUniqueInput | Prisma.PatientImageAttachmentWhereUniqueInput[];
    delete?: Prisma.PatientImageAttachmentWhereUniqueInput | Prisma.PatientImageAttachmentWhereUniqueInput[];
    connect?: Prisma.PatientImageAttachmentWhereUniqueInput | Prisma.PatientImageAttachmentWhereUniqueInput[];
    update?: Prisma.PatientImageAttachmentUpdateWithWhereUniqueWithoutUploaderInput | Prisma.PatientImageAttachmentUpdateWithWhereUniqueWithoutUploaderInput[];
    updateMany?: Prisma.PatientImageAttachmentUpdateManyWithWhereWithoutUploaderInput | Prisma.PatientImageAttachmentUpdateManyWithWhereWithoutUploaderInput[];
    deleteMany?: Prisma.PatientImageAttachmentScalarWhereInput | Prisma.PatientImageAttachmentScalarWhereInput[];
};
export type PatientImageAttachmentUncheckedUpdateManyWithoutUploaderNestedInput = {
    create?: Prisma.XOR<Prisma.PatientImageAttachmentCreateWithoutUploaderInput, Prisma.PatientImageAttachmentUncheckedCreateWithoutUploaderInput> | Prisma.PatientImageAttachmentCreateWithoutUploaderInput[] | Prisma.PatientImageAttachmentUncheckedCreateWithoutUploaderInput[];
    connectOrCreate?: Prisma.PatientImageAttachmentCreateOrConnectWithoutUploaderInput | Prisma.PatientImageAttachmentCreateOrConnectWithoutUploaderInput[];
    upsert?: Prisma.PatientImageAttachmentUpsertWithWhereUniqueWithoutUploaderInput | Prisma.PatientImageAttachmentUpsertWithWhereUniqueWithoutUploaderInput[];
    createMany?: Prisma.PatientImageAttachmentCreateManyUploaderInputEnvelope;
    set?: Prisma.PatientImageAttachmentWhereUniqueInput | Prisma.PatientImageAttachmentWhereUniqueInput[];
    disconnect?: Prisma.PatientImageAttachmentWhereUniqueInput | Prisma.PatientImageAttachmentWhereUniqueInput[];
    delete?: Prisma.PatientImageAttachmentWhereUniqueInput | Prisma.PatientImageAttachmentWhereUniqueInput[];
    connect?: Prisma.PatientImageAttachmentWhereUniqueInput | Prisma.PatientImageAttachmentWhereUniqueInput[];
    update?: Prisma.PatientImageAttachmentUpdateWithWhereUniqueWithoutUploaderInput | Prisma.PatientImageAttachmentUpdateWithWhereUniqueWithoutUploaderInput[];
    updateMany?: Prisma.PatientImageAttachmentUpdateManyWithWhereWithoutUploaderInput | Prisma.PatientImageAttachmentUpdateManyWithWhereWithoutUploaderInput[];
    deleteMany?: Prisma.PatientImageAttachmentScalarWhereInput | Prisma.PatientImageAttachmentScalarWhereInput[];
};
export type PatientImageAttachmentCreateNestedManyWithoutPatientInput = {
    create?: Prisma.XOR<Prisma.PatientImageAttachmentCreateWithoutPatientInput, Prisma.PatientImageAttachmentUncheckedCreateWithoutPatientInput> | Prisma.PatientImageAttachmentCreateWithoutPatientInput[] | Prisma.PatientImageAttachmentUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.PatientImageAttachmentCreateOrConnectWithoutPatientInput | Prisma.PatientImageAttachmentCreateOrConnectWithoutPatientInput[];
    createMany?: Prisma.PatientImageAttachmentCreateManyPatientInputEnvelope;
    connect?: Prisma.PatientImageAttachmentWhereUniqueInput | Prisma.PatientImageAttachmentWhereUniqueInput[];
};
export type PatientImageAttachmentUncheckedCreateNestedManyWithoutPatientInput = {
    create?: Prisma.XOR<Prisma.PatientImageAttachmentCreateWithoutPatientInput, Prisma.PatientImageAttachmentUncheckedCreateWithoutPatientInput> | Prisma.PatientImageAttachmentCreateWithoutPatientInput[] | Prisma.PatientImageAttachmentUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.PatientImageAttachmentCreateOrConnectWithoutPatientInput | Prisma.PatientImageAttachmentCreateOrConnectWithoutPatientInput[];
    createMany?: Prisma.PatientImageAttachmentCreateManyPatientInputEnvelope;
    connect?: Prisma.PatientImageAttachmentWhereUniqueInput | Prisma.PatientImageAttachmentWhereUniqueInput[];
};
export type PatientImageAttachmentUpdateManyWithoutPatientNestedInput = {
    create?: Prisma.XOR<Prisma.PatientImageAttachmentCreateWithoutPatientInput, Prisma.PatientImageAttachmentUncheckedCreateWithoutPatientInput> | Prisma.PatientImageAttachmentCreateWithoutPatientInput[] | Prisma.PatientImageAttachmentUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.PatientImageAttachmentCreateOrConnectWithoutPatientInput | Prisma.PatientImageAttachmentCreateOrConnectWithoutPatientInput[];
    upsert?: Prisma.PatientImageAttachmentUpsertWithWhereUniqueWithoutPatientInput | Prisma.PatientImageAttachmentUpsertWithWhereUniqueWithoutPatientInput[];
    createMany?: Prisma.PatientImageAttachmentCreateManyPatientInputEnvelope;
    set?: Prisma.PatientImageAttachmentWhereUniqueInput | Prisma.PatientImageAttachmentWhereUniqueInput[];
    disconnect?: Prisma.PatientImageAttachmentWhereUniqueInput | Prisma.PatientImageAttachmentWhereUniqueInput[];
    delete?: Prisma.PatientImageAttachmentWhereUniqueInput | Prisma.PatientImageAttachmentWhereUniqueInput[];
    connect?: Prisma.PatientImageAttachmentWhereUniqueInput | Prisma.PatientImageAttachmentWhereUniqueInput[];
    update?: Prisma.PatientImageAttachmentUpdateWithWhereUniqueWithoutPatientInput | Prisma.PatientImageAttachmentUpdateWithWhereUniqueWithoutPatientInput[];
    updateMany?: Prisma.PatientImageAttachmentUpdateManyWithWhereWithoutPatientInput | Prisma.PatientImageAttachmentUpdateManyWithWhereWithoutPatientInput[];
    deleteMany?: Prisma.PatientImageAttachmentScalarWhereInput | Prisma.PatientImageAttachmentScalarWhereInput[];
};
export type PatientImageAttachmentUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: Prisma.XOR<Prisma.PatientImageAttachmentCreateWithoutPatientInput, Prisma.PatientImageAttachmentUncheckedCreateWithoutPatientInput> | Prisma.PatientImageAttachmentCreateWithoutPatientInput[] | Prisma.PatientImageAttachmentUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.PatientImageAttachmentCreateOrConnectWithoutPatientInput | Prisma.PatientImageAttachmentCreateOrConnectWithoutPatientInput[];
    upsert?: Prisma.PatientImageAttachmentUpsertWithWhereUniqueWithoutPatientInput | Prisma.PatientImageAttachmentUpsertWithWhereUniqueWithoutPatientInput[];
    createMany?: Prisma.PatientImageAttachmentCreateManyPatientInputEnvelope;
    set?: Prisma.PatientImageAttachmentWhereUniqueInput | Prisma.PatientImageAttachmentWhereUniqueInput[];
    disconnect?: Prisma.PatientImageAttachmentWhereUniqueInput | Prisma.PatientImageAttachmentWhereUniqueInput[];
    delete?: Prisma.PatientImageAttachmentWhereUniqueInput | Prisma.PatientImageAttachmentWhereUniqueInput[];
    connect?: Prisma.PatientImageAttachmentWhereUniqueInput | Prisma.PatientImageAttachmentWhereUniqueInput[];
    update?: Prisma.PatientImageAttachmentUpdateWithWhereUniqueWithoutPatientInput | Prisma.PatientImageAttachmentUpdateWithWhereUniqueWithoutPatientInput[];
    updateMany?: Prisma.PatientImageAttachmentUpdateManyWithWhereWithoutPatientInput | Prisma.PatientImageAttachmentUpdateManyWithWhereWithoutPatientInput[];
    deleteMany?: Prisma.PatientImageAttachmentScalarWhereInput | Prisma.PatientImageAttachmentScalarWhereInput[];
};
export type PatientImageAttachmentCreateWithoutUploaderInput = {
    attachment_id?: string;
    image_url: string;
    file_type?: string | null;
    uploadedAt?: Date | string;
    patient: Prisma.PatientCreateNestedOneWithoutImagesInput;
};
export type PatientImageAttachmentUncheckedCreateWithoutUploaderInput = {
    attachment_id?: string;
    patient_id: string;
    image_url: string;
    file_type?: string | null;
    uploadedAt?: Date | string;
};
export type PatientImageAttachmentCreateOrConnectWithoutUploaderInput = {
    where: Prisma.PatientImageAttachmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientImageAttachmentCreateWithoutUploaderInput, Prisma.PatientImageAttachmentUncheckedCreateWithoutUploaderInput>;
};
export type PatientImageAttachmentCreateManyUploaderInputEnvelope = {
    data: Prisma.PatientImageAttachmentCreateManyUploaderInput | Prisma.PatientImageAttachmentCreateManyUploaderInput[];
    skipDuplicates?: boolean;
};
export type PatientImageAttachmentUpsertWithWhereUniqueWithoutUploaderInput = {
    where: Prisma.PatientImageAttachmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.PatientImageAttachmentUpdateWithoutUploaderInput, Prisma.PatientImageAttachmentUncheckedUpdateWithoutUploaderInput>;
    create: Prisma.XOR<Prisma.PatientImageAttachmentCreateWithoutUploaderInput, Prisma.PatientImageAttachmentUncheckedCreateWithoutUploaderInput>;
};
export type PatientImageAttachmentUpdateWithWhereUniqueWithoutUploaderInput = {
    where: Prisma.PatientImageAttachmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.PatientImageAttachmentUpdateWithoutUploaderInput, Prisma.PatientImageAttachmentUncheckedUpdateWithoutUploaderInput>;
};
export type PatientImageAttachmentUpdateManyWithWhereWithoutUploaderInput = {
    where: Prisma.PatientImageAttachmentScalarWhereInput;
    data: Prisma.XOR<Prisma.PatientImageAttachmentUpdateManyMutationInput, Prisma.PatientImageAttachmentUncheckedUpdateManyWithoutUploaderInput>;
};
export type PatientImageAttachmentScalarWhereInput = {
    AND?: Prisma.PatientImageAttachmentScalarWhereInput | Prisma.PatientImageAttachmentScalarWhereInput[];
    OR?: Prisma.PatientImageAttachmentScalarWhereInput[];
    NOT?: Prisma.PatientImageAttachmentScalarWhereInput | Prisma.PatientImageAttachmentScalarWhereInput[];
    attachment_id?: Prisma.StringFilter<"PatientImageAttachment"> | string;
    patient_id?: Prisma.StringFilter<"PatientImageAttachment"> | string;
    image_url?: Prisma.StringFilter<"PatientImageAttachment"> | string;
    file_type?: Prisma.StringNullableFilter<"PatientImageAttachment"> | string | null;
    uploaded_by?: Prisma.StringFilter<"PatientImageAttachment"> | string;
    uploadedAt?: Prisma.DateTimeFilter<"PatientImageAttachment"> | Date | string;
};
export type PatientImageAttachmentCreateWithoutPatientInput = {
    attachment_id?: string;
    image_url: string;
    file_type?: string | null;
    uploadedAt?: Date | string;
    uploader: Prisma.UserCreateNestedOneWithoutPatientImagesInput;
};
export type PatientImageAttachmentUncheckedCreateWithoutPatientInput = {
    attachment_id?: string;
    image_url: string;
    file_type?: string | null;
    uploaded_by: string;
    uploadedAt?: Date | string;
};
export type PatientImageAttachmentCreateOrConnectWithoutPatientInput = {
    where: Prisma.PatientImageAttachmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientImageAttachmentCreateWithoutPatientInput, Prisma.PatientImageAttachmentUncheckedCreateWithoutPatientInput>;
};
export type PatientImageAttachmentCreateManyPatientInputEnvelope = {
    data: Prisma.PatientImageAttachmentCreateManyPatientInput | Prisma.PatientImageAttachmentCreateManyPatientInput[];
    skipDuplicates?: boolean;
};
export type PatientImageAttachmentUpsertWithWhereUniqueWithoutPatientInput = {
    where: Prisma.PatientImageAttachmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.PatientImageAttachmentUpdateWithoutPatientInput, Prisma.PatientImageAttachmentUncheckedUpdateWithoutPatientInput>;
    create: Prisma.XOR<Prisma.PatientImageAttachmentCreateWithoutPatientInput, Prisma.PatientImageAttachmentUncheckedCreateWithoutPatientInput>;
};
export type PatientImageAttachmentUpdateWithWhereUniqueWithoutPatientInput = {
    where: Prisma.PatientImageAttachmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.PatientImageAttachmentUpdateWithoutPatientInput, Prisma.PatientImageAttachmentUncheckedUpdateWithoutPatientInput>;
};
export type PatientImageAttachmentUpdateManyWithWhereWithoutPatientInput = {
    where: Prisma.PatientImageAttachmentScalarWhereInput;
    data: Prisma.XOR<Prisma.PatientImageAttachmentUpdateManyMutationInput, Prisma.PatientImageAttachmentUncheckedUpdateManyWithoutPatientInput>;
};
export type PatientImageAttachmentCreateManyUploaderInput = {
    attachment_id?: string;
    patient_id: string;
    image_url: string;
    file_type?: string | null;
    uploadedAt?: Date | string;
};
export type PatientImageAttachmentUpdateWithoutUploaderInput = {
    attachment_id?: Prisma.StringFieldUpdateOperationsInput | string;
    image_url?: Prisma.StringFieldUpdateOperationsInput | string;
    file_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    patient?: Prisma.PatientUpdateOneRequiredWithoutImagesNestedInput;
};
export type PatientImageAttachmentUncheckedUpdateWithoutUploaderInput = {
    attachment_id?: Prisma.StringFieldUpdateOperationsInput | string;
    patient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    image_url?: Prisma.StringFieldUpdateOperationsInput | string;
    file_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientImageAttachmentUncheckedUpdateManyWithoutUploaderInput = {
    attachment_id?: Prisma.StringFieldUpdateOperationsInput | string;
    patient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    image_url?: Prisma.StringFieldUpdateOperationsInput | string;
    file_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientImageAttachmentCreateManyPatientInput = {
    attachment_id?: string;
    image_url: string;
    file_type?: string | null;
    uploaded_by: string;
    uploadedAt?: Date | string;
};
export type PatientImageAttachmentUpdateWithoutPatientInput = {
    attachment_id?: Prisma.StringFieldUpdateOperationsInput | string;
    image_url?: Prisma.StringFieldUpdateOperationsInput | string;
    file_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    uploader?: Prisma.UserUpdateOneRequiredWithoutPatientImagesNestedInput;
};
export type PatientImageAttachmentUncheckedUpdateWithoutPatientInput = {
    attachment_id?: Prisma.StringFieldUpdateOperationsInput | string;
    image_url?: Prisma.StringFieldUpdateOperationsInput | string;
    file_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploaded_by?: Prisma.StringFieldUpdateOperationsInput | string;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientImageAttachmentUncheckedUpdateManyWithoutPatientInput = {
    attachment_id?: Prisma.StringFieldUpdateOperationsInput | string;
    image_url?: Prisma.StringFieldUpdateOperationsInput | string;
    file_type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploaded_by?: Prisma.StringFieldUpdateOperationsInput | string;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientImageAttachmentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    attachment_id?: boolean;
    patient_id?: boolean;
    image_url?: boolean;
    file_type?: boolean;
    uploaded_by?: boolean;
    uploadedAt?: boolean;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
    uploader?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["patientImageAttachment"]>;
export type PatientImageAttachmentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    attachment_id?: boolean;
    patient_id?: boolean;
    image_url?: boolean;
    file_type?: boolean;
    uploaded_by?: boolean;
    uploadedAt?: boolean;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
    uploader?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["patientImageAttachment"]>;
export type PatientImageAttachmentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    attachment_id?: boolean;
    patient_id?: boolean;
    image_url?: boolean;
    file_type?: boolean;
    uploaded_by?: boolean;
    uploadedAt?: boolean;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
    uploader?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["patientImageAttachment"]>;
export type PatientImageAttachmentSelectScalar = {
    attachment_id?: boolean;
    patient_id?: boolean;
    image_url?: boolean;
    file_type?: boolean;
    uploaded_by?: boolean;
    uploadedAt?: boolean;
};
export type PatientImageAttachmentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"attachment_id" | "patient_id" | "image_url" | "file_type" | "uploaded_by" | "uploadedAt", ExtArgs["result"]["patientImageAttachment"]>;
export type PatientImageAttachmentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
    uploader?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PatientImageAttachmentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
    uploader?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PatientImageAttachmentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
    uploader?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $PatientImageAttachmentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PatientImageAttachment";
    objects: {
        patient: Prisma.$PatientPayload<ExtArgs>;
        uploader: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        attachment_id: string;
        patient_id: string;
        image_url: string;
        file_type: string | null;
        uploaded_by: string;
        uploadedAt: Date;
    }, ExtArgs["result"]["patientImageAttachment"]>;
    composites: {};
};
export type PatientImageAttachmentGetPayload<S extends boolean | null | undefined | PatientImageAttachmentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PatientImageAttachmentPayload, S>;
export type PatientImageAttachmentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PatientImageAttachmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PatientImageAttachmentCountAggregateInputType | true;
};
export interface PatientImageAttachmentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PatientImageAttachment'];
        meta: {
            name: 'PatientImageAttachment';
        };
    };
    /**
     * Find zero or one PatientImageAttachment that matches the filter.
     * @param {PatientImageAttachmentFindUniqueArgs} args - Arguments to find a PatientImageAttachment
     * @example
     * // Get one PatientImageAttachment
     * const patientImageAttachment = await prisma.patientImageAttachment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientImageAttachmentFindUniqueArgs>(args: Prisma.SelectSubset<T, PatientImageAttachmentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PatientImageAttachmentClient<runtime.Types.Result.GetResult<Prisma.$PatientImageAttachmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one PatientImageAttachment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatientImageAttachmentFindUniqueOrThrowArgs} args - Arguments to find a PatientImageAttachment
     * @example
     * // Get one PatientImageAttachment
     * const patientImageAttachment = await prisma.patientImageAttachment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientImageAttachmentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PatientImageAttachmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PatientImageAttachmentClient<runtime.Types.Result.GetResult<Prisma.$PatientImageAttachmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PatientImageAttachment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientImageAttachmentFindFirstArgs} args - Arguments to find a PatientImageAttachment
     * @example
     * // Get one PatientImageAttachment
     * const patientImageAttachment = await prisma.patientImageAttachment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientImageAttachmentFindFirstArgs>(args?: Prisma.SelectSubset<T, PatientImageAttachmentFindFirstArgs<ExtArgs>>): Prisma.Prisma__PatientImageAttachmentClient<runtime.Types.Result.GetResult<Prisma.$PatientImageAttachmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PatientImageAttachment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientImageAttachmentFindFirstOrThrowArgs} args - Arguments to find a PatientImageAttachment
     * @example
     * // Get one PatientImageAttachment
     * const patientImageAttachment = await prisma.patientImageAttachment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientImageAttachmentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PatientImageAttachmentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PatientImageAttachmentClient<runtime.Types.Result.GetResult<Prisma.$PatientImageAttachmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more PatientImageAttachments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientImageAttachmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PatientImageAttachments
     * const patientImageAttachments = await prisma.patientImageAttachment.findMany()
     *
     * // Get first 10 PatientImageAttachments
     * const patientImageAttachments = await prisma.patientImageAttachment.findMany({ take: 10 })
     *
     * // Only select the `attachment_id`
     * const patientImageAttachmentWithAttachment_idOnly = await prisma.patientImageAttachment.findMany({ select: { attachment_id: true } })
     *
     */
    findMany<T extends PatientImageAttachmentFindManyArgs>(args?: Prisma.SelectSubset<T, PatientImageAttachmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientImageAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a PatientImageAttachment.
     * @param {PatientImageAttachmentCreateArgs} args - Arguments to create a PatientImageAttachment.
     * @example
     * // Create one PatientImageAttachment
     * const PatientImageAttachment = await prisma.patientImageAttachment.create({
     *   data: {
     *     // ... data to create a PatientImageAttachment
     *   }
     * })
     *
     */
    create<T extends PatientImageAttachmentCreateArgs>(args: Prisma.SelectSubset<T, PatientImageAttachmentCreateArgs<ExtArgs>>): Prisma.Prisma__PatientImageAttachmentClient<runtime.Types.Result.GetResult<Prisma.$PatientImageAttachmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many PatientImageAttachments.
     * @param {PatientImageAttachmentCreateManyArgs} args - Arguments to create many PatientImageAttachments.
     * @example
     * // Create many PatientImageAttachments
     * const patientImageAttachment = await prisma.patientImageAttachment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PatientImageAttachmentCreateManyArgs>(args?: Prisma.SelectSubset<T, PatientImageAttachmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many PatientImageAttachments and returns the data saved in the database.
     * @param {PatientImageAttachmentCreateManyAndReturnArgs} args - Arguments to create many PatientImageAttachments.
     * @example
     * // Create many PatientImageAttachments
     * const patientImageAttachment = await prisma.patientImageAttachment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many PatientImageAttachments and only return the `attachment_id`
     * const patientImageAttachmentWithAttachment_idOnly = await prisma.patientImageAttachment.createManyAndReturn({
     *   select: { attachment_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PatientImageAttachmentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PatientImageAttachmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientImageAttachmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a PatientImageAttachment.
     * @param {PatientImageAttachmentDeleteArgs} args - Arguments to delete one PatientImageAttachment.
     * @example
     * // Delete one PatientImageAttachment
     * const PatientImageAttachment = await prisma.patientImageAttachment.delete({
     *   where: {
     *     // ... filter to delete one PatientImageAttachment
     *   }
     * })
     *
     */
    delete<T extends PatientImageAttachmentDeleteArgs>(args: Prisma.SelectSubset<T, PatientImageAttachmentDeleteArgs<ExtArgs>>): Prisma.Prisma__PatientImageAttachmentClient<runtime.Types.Result.GetResult<Prisma.$PatientImageAttachmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one PatientImageAttachment.
     * @param {PatientImageAttachmentUpdateArgs} args - Arguments to update one PatientImageAttachment.
     * @example
     * // Update one PatientImageAttachment
     * const patientImageAttachment = await prisma.patientImageAttachment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PatientImageAttachmentUpdateArgs>(args: Prisma.SelectSubset<T, PatientImageAttachmentUpdateArgs<ExtArgs>>): Prisma.Prisma__PatientImageAttachmentClient<runtime.Types.Result.GetResult<Prisma.$PatientImageAttachmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more PatientImageAttachments.
     * @param {PatientImageAttachmentDeleteManyArgs} args - Arguments to filter PatientImageAttachments to delete.
     * @example
     * // Delete a few PatientImageAttachments
     * const { count } = await prisma.patientImageAttachment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PatientImageAttachmentDeleteManyArgs>(args?: Prisma.SelectSubset<T, PatientImageAttachmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PatientImageAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientImageAttachmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PatientImageAttachments
     * const patientImageAttachment = await prisma.patientImageAttachment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PatientImageAttachmentUpdateManyArgs>(args: Prisma.SelectSubset<T, PatientImageAttachmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PatientImageAttachments and returns the data updated in the database.
     * @param {PatientImageAttachmentUpdateManyAndReturnArgs} args - Arguments to update many PatientImageAttachments.
     * @example
     * // Update many PatientImageAttachments
     * const patientImageAttachment = await prisma.patientImageAttachment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more PatientImageAttachments and only return the `attachment_id`
     * const patientImageAttachmentWithAttachment_idOnly = await prisma.patientImageAttachment.updateManyAndReturn({
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
    updateManyAndReturn<T extends PatientImageAttachmentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PatientImageAttachmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientImageAttachmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one PatientImageAttachment.
     * @param {PatientImageAttachmentUpsertArgs} args - Arguments to update or create a PatientImageAttachment.
     * @example
     * // Update or create a PatientImageAttachment
     * const patientImageAttachment = await prisma.patientImageAttachment.upsert({
     *   create: {
     *     // ... data to create a PatientImageAttachment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PatientImageAttachment we want to update
     *   }
     * })
     */
    upsert<T extends PatientImageAttachmentUpsertArgs>(args: Prisma.SelectSubset<T, PatientImageAttachmentUpsertArgs<ExtArgs>>): Prisma.Prisma__PatientImageAttachmentClient<runtime.Types.Result.GetResult<Prisma.$PatientImageAttachmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of PatientImageAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientImageAttachmentCountArgs} args - Arguments to filter PatientImageAttachments to count.
     * @example
     * // Count the number of PatientImageAttachments
     * const count = await prisma.patientImageAttachment.count({
     *   where: {
     *     // ... the filter for the PatientImageAttachments we want to count
     *   }
     * })
    **/
    count<T extends PatientImageAttachmentCountArgs>(args?: Prisma.Subset<T, PatientImageAttachmentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PatientImageAttachmentCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a PatientImageAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientImageAttachmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PatientImageAttachmentAggregateArgs>(args: Prisma.Subset<T, PatientImageAttachmentAggregateArgs>): Prisma.PrismaPromise<GetPatientImageAttachmentAggregateType<T>>;
    /**
     * Group by PatientImageAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientImageAttachmentGroupByArgs} args - Group by arguments.
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
    groupBy<T extends PatientImageAttachmentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PatientImageAttachmentGroupByArgs['orderBy'];
    } : {
        orderBy?: PatientImageAttachmentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PatientImageAttachmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientImageAttachmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the PatientImageAttachment model
     */
    readonly fields: PatientImageAttachmentFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for PatientImageAttachment.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__PatientImageAttachmentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    patient<T extends Prisma.PatientDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PatientDefaultArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the PatientImageAttachment model
 */
export interface PatientImageAttachmentFieldRefs {
    readonly attachment_id: Prisma.FieldRef<"PatientImageAttachment", 'String'>;
    readonly patient_id: Prisma.FieldRef<"PatientImageAttachment", 'String'>;
    readonly image_url: Prisma.FieldRef<"PatientImageAttachment", 'String'>;
    readonly file_type: Prisma.FieldRef<"PatientImageAttachment", 'String'>;
    readonly uploaded_by: Prisma.FieldRef<"PatientImageAttachment", 'String'>;
    readonly uploadedAt: Prisma.FieldRef<"PatientImageAttachment", 'DateTime'>;
}
/**
 * PatientImageAttachment findUnique
 */
export type PatientImageAttachmentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientImageAttachment
     */
    select?: Prisma.PatientImageAttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientImageAttachment
     */
    omit?: Prisma.PatientImageAttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientImageAttachmentInclude<ExtArgs> | null;
    /**
     * Filter, which PatientImageAttachment to fetch.
     */
    where: Prisma.PatientImageAttachmentWhereUniqueInput;
};
/**
 * PatientImageAttachment findUniqueOrThrow
 */
export type PatientImageAttachmentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientImageAttachment
     */
    select?: Prisma.PatientImageAttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientImageAttachment
     */
    omit?: Prisma.PatientImageAttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientImageAttachmentInclude<ExtArgs> | null;
    /**
     * Filter, which PatientImageAttachment to fetch.
     */
    where: Prisma.PatientImageAttachmentWhereUniqueInput;
};
/**
 * PatientImageAttachment findFirst
 */
export type PatientImageAttachmentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientImageAttachment
     */
    select?: Prisma.PatientImageAttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientImageAttachment
     */
    omit?: Prisma.PatientImageAttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientImageAttachmentInclude<ExtArgs> | null;
    /**
     * Filter, which PatientImageAttachment to fetch.
     */
    where?: Prisma.PatientImageAttachmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PatientImageAttachments to fetch.
     */
    orderBy?: Prisma.PatientImageAttachmentOrderByWithRelationInput | Prisma.PatientImageAttachmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PatientImageAttachments.
     */
    cursor?: Prisma.PatientImageAttachmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PatientImageAttachments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PatientImageAttachments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PatientImageAttachments.
     */
    distinct?: Prisma.PatientImageAttachmentScalarFieldEnum | Prisma.PatientImageAttachmentScalarFieldEnum[];
};
/**
 * PatientImageAttachment findFirstOrThrow
 */
export type PatientImageAttachmentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientImageAttachment
     */
    select?: Prisma.PatientImageAttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientImageAttachment
     */
    omit?: Prisma.PatientImageAttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientImageAttachmentInclude<ExtArgs> | null;
    /**
     * Filter, which PatientImageAttachment to fetch.
     */
    where?: Prisma.PatientImageAttachmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PatientImageAttachments to fetch.
     */
    orderBy?: Prisma.PatientImageAttachmentOrderByWithRelationInput | Prisma.PatientImageAttachmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PatientImageAttachments.
     */
    cursor?: Prisma.PatientImageAttachmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PatientImageAttachments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PatientImageAttachments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PatientImageAttachments.
     */
    distinct?: Prisma.PatientImageAttachmentScalarFieldEnum | Prisma.PatientImageAttachmentScalarFieldEnum[];
};
/**
 * PatientImageAttachment findMany
 */
export type PatientImageAttachmentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientImageAttachment
     */
    select?: Prisma.PatientImageAttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientImageAttachment
     */
    omit?: Prisma.PatientImageAttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientImageAttachmentInclude<ExtArgs> | null;
    /**
     * Filter, which PatientImageAttachments to fetch.
     */
    where?: Prisma.PatientImageAttachmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PatientImageAttachments to fetch.
     */
    orderBy?: Prisma.PatientImageAttachmentOrderByWithRelationInput | Prisma.PatientImageAttachmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing PatientImageAttachments.
     */
    cursor?: Prisma.PatientImageAttachmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PatientImageAttachments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PatientImageAttachments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PatientImageAttachments.
     */
    distinct?: Prisma.PatientImageAttachmentScalarFieldEnum | Prisma.PatientImageAttachmentScalarFieldEnum[];
};
/**
 * PatientImageAttachment create
 */
export type PatientImageAttachmentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientImageAttachment
     */
    select?: Prisma.PatientImageAttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientImageAttachment
     */
    omit?: Prisma.PatientImageAttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientImageAttachmentInclude<ExtArgs> | null;
    /**
     * The data needed to create a PatientImageAttachment.
     */
    data: Prisma.XOR<Prisma.PatientImageAttachmentCreateInput, Prisma.PatientImageAttachmentUncheckedCreateInput>;
};
/**
 * PatientImageAttachment createMany
 */
export type PatientImageAttachmentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many PatientImageAttachments.
     */
    data: Prisma.PatientImageAttachmentCreateManyInput | Prisma.PatientImageAttachmentCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * PatientImageAttachment createManyAndReturn
 */
export type PatientImageAttachmentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientImageAttachment
     */
    select?: Prisma.PatientImageAttachmentSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientImageAttachment
     */
    omit?: Prisma.PatientImageAttachmentOmit<ExtArgs> | null;
    /**
     * The data used to create many PatientImageAttachments.
     */
    data: Prisma.PatientImageAttachmentCreateManyInput | Prisma.PatientImageAttachmentCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientImageAttachmentIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * PatientImageAttachment update
 */
export type PatientImageAttachmentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientImageAttachment
     */
    select?: Prisma.PatientImageAttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientImageAttachment
     */
    omit?: Prisma.PatientImageAttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientImageAttachmentInclude<ExtArgs> | null;
    /**
     * The data needed to update a PatientImageAttachment.
     */
    data: Prisma.XOR<Prisma.PatientImageAttachmentUpdateInput, Prisma.PatientImageAttachmentUncheckedUpdateInput>;
    /**
     * Choose, which PatientImageAttachment to update.
     */
    where: Prisma.PatientImageAttachmentWhereUniqueInput;
};
/**
 * PatientImageAttachment updateMany
 */
export type PatientImageAttachmentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update PatientImageAttachments.
     */
    data: Prisma.XOR<Prisma.PatientImageAttachmentUpdateManyMutationInput, Prisma.PatientImageAttachmentUncheckedUpdateManyInput>;
    /**
     * Filter which PatientImageAttachments to update
     */
    where?: Prisma.PatientImageAttachmentWhereInput;
    /**
     * Limit how many PatientImageAttachments to update.
     */
    limit?: number;
};
/**
 * PatientImageAttachment updateManyAndReturn
 */
export type PatientImageAttachmentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientImageAttachment
     */
    select?: Prisma.PatientImageAttachmentSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientImageAttachment
     */
    omit?: Prisma.PatientImageAttachmentOmit<ExtArgs> | null;
    /**
     * The data used to update PatientImageAttachments.
     */
    data: Prisma.XOR<Prisma.PatientImageAttachmentUpdateManyMutationInput, Prisma.PatientImageAttachmentUncheckedUpdateManyInput>;
    /**
     * Filter which PatientImageAttachments to update
     */
    where?: Prisma.PatientImageAttachmentWhereInput;
    /**
     * Limit how many PatientImageAttachments to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientImageAttachmentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * PatientImageAttachment upsert
 */
export type PatientImageAttachmentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientImageAttachment
     */
    select?: Prisma.PatientImageAttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientImageAttachment
     */
    omit?: Prisma.PatientImageAttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientImageAttachmentInclude<ExtArgs> | null;
    /**
     * The filter to search for the PatientImageAttachment to update in case it exists.
     */
    where: Prisma.PatientImageAttachmentWhereUniqueInput;
    /**
     * In case the PatientImageAttachment found by the `where` argument doesn't exist, create a new PatientImageAttachment with this data.
     */
    create: Prisma.XOR<Prisma.PatientImageAttachmentCreateInput, Prisma.PatientImageAttachmentUncheckedCreateInput>;
    /**
     * In case the PatientImageAttachment was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.PatientImageAttachmentUpdateInput, Prisma.PatientImageAttachmentUncheckedUpdateInput>;
};
/**
 * PatientImageAttachment delete
 */
export type PatientImageAttachmentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientImageAttachment
     */
    select?: Prisma.PatientImageAttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientImageAttachment
     */
    omit?: Prisma.PatientImageAttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientImageAttachmentInclude<ExtArgs> | null;
    /**
     * Filter which PatientImageAttachment to delete.
     */
    where: Prisma.PatientImageAttachmentWhereUniqueInput;
};
/**
 * PatientImageAttachment deleteMany
 */
export type PatientImageAttachmentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PatientImageAttachments to delete
     */
    where?: Prisma.PatientImageAttachmentWhereInput;
    /**
     * Limit how many PatientImageAttachments to delete.
     */
    limit?: number;
};
/**
 * PatientImageAttachment without action
 */
export type PatientImageAttachmentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientImageAttachment
     */
    select?: Prisma.PatientImageAttachmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientImageAttachment
     */
    omit?: Prisma.PatientImageAttachmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientImageAttachmentInclude<ExtArgs> | null;
};
//# sourceMappingURL=PatientImageAttachment.d.ts.map