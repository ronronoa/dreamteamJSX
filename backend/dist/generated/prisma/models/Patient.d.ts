import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Patient
 *
 */
export type PatientModel = runtime.Types.Result.DefaultSelection<Prisma.$PatientPayload>;
export type AggregatePatient = {
    _count: PatientCountAggregateOutputType | null;
    _min: PatientMinAggregateOutputType | null;
    _max: PatientMaxAggregateOutputType | null;
};
export type PatientMinAggregateOutputType = {
    patient_id: string | null;
    full_name: string | null;
    birthday: Date | null;
    sex: $Enums.Gender | null;
    contact_person: string | null;
    contact_number: string | null;
    phase: string | null;
    package: string | null;
    block: string | null;
    lot: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PatientMaxAggregateOutputType = {
    patient_id: string | null;
    full_name: string | null;
    birthday: Date | null;
    sex: $Enums.Gender | null;
    contact_person: string | null;
    contact_number: string | null;
    phase: string | null;
    package: string | null;
    block: string | null;
    lot: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PatientCountAggregateOutputType = {
    patient_id: number;
    full_name: number;
    birthday: number;
    sex: number;
    contact_person: number;
    contact_number: number;
    phase: number;
    package: number;
    block: number;
    lot: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PatientMinAggregateInputType = {
    patient_id?: true;
    full_name?: true;
    birthday?: true;
    sex?: true;
    contact_person?: true;
    contact_number?: true;
    phase?: true;
    package?: true;
    block?: true;
    lot?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PatientMaxAggregateInputType = {
    patient_id?: true;
    full_name?: true;
    birthday?: true;
    sex?: true;
    contact_person?: true;
    contact_number?: true;
    phase?: true;
    package?: true;
    block?: true;
    lot?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PatientCountAggregateInputType = {
    patient_id?: true;
    full_name?: true;
    birthday?: true;
    sex?: true;
    contact_person?: true;
    contact_number?: true;
    phase?: true;
    package?: true;
    block?: true;
    lot?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PatientAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Patient to aggregate.
     */
    where?: Prisma.PatientWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Patients to fetch.
     */
    orderBy?: Prisma.PatientOrderByWithRelationInput | Prisma.PatientOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.PatientWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Patients.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Patients
    **/
    _count?: true | PatientCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: PatientMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: PatientMaxAggregateInputType;
};
export type GetPatientAggregateType<T extends PatientAggregateArgs> = {
    [P in keyof T & keyof AggregatePatient]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePatient[P]> : Prisma.GetScalarType<T[P], AggregatePatient[P]>;
};
export type PatientGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PatientWhereInput;
    orderBy?: Prisma.PatientOrderByWithAggregationInput | Prisma.PatientOrderByWithAggregationInput[];
    by: Prisma.PatientScalarFieldEnum[] | Prisma.PatientScalarFieldEnum;
    having?: Prisma.PatientScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PatientCountAggregateInputType | true;
    _min?: PatientMinAggregateInputType;
    _max?: PatientMaxAggregateInputType;
};
export type PatientGroupByOutputType = {
    patient_id: string;
    full_name: string;
    birthday: Date;
    sex: $Enums.Gender;
    contact_person: string;
    contact_number: string;
    phase: string | null;
    package: string | null;
    block: string | null;
    lot: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: PatientCountAggregateOutputType | null;
    _min: PatientMinAggregateOutputType | null;
    _max: PatientMaxAggregateOutputType | null;
};
export type GetPatientGroupByPayload<T extends PatientGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PatientGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PatientGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PatientGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PatientGroupByOutputType[P]>;
}>>;
export type PatientWhereInput = {
    AND?: Prisma.PatientWhereInput | Prisma.PatientWhereInput[];
    OR?: Prisma.PatientWhereInput[];
    NOT?: Prisma.PatientWhereInput | Prisma.PatientWhereInput[];
    patient_id?: Prisma.StringFilter<"Patient"> | string;
    full_name?: Prisma.StringFilter<"Patient"> | string;
    birthday?: Prisma.DateTimeFilter<"Patient"> | Date | string;
    sex?: Prisma.EnumGenderFilter<"Patient"> | $Enums.Gender;
    contact_person?: Prisma.StringFilter<"Patient"> | string;
    contact_number?: Prisma.StringFilter<"Patient"> | string;
    phase?: Prisma.StringNullableFilter<"Patient"> | string | null;
    package?: Prisma.StringNullableFilter<"Patient"> | string | null;
    block?: Prisma.StringNullableFilter<"Patient"> | string | null;
    lot?: Prisma.StringNullableFilter<"Patient"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Patient"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Patient"> | Date | string;
    patientLogs?: Prisma.PatientLogListRelationFilter;
    images?: Prisma.PatientImageAttachmentListRelationFilter;
};
export type PatientOrderByWithRelationInput = {
    patient_id?: Prisma.SortOrder;
    full_name?: Prisma.SortOrder;
    birthday?: Prisma.SortOrder;
    sex?: Prisma.SortOrder;
    contact_person?: Prisma.SortOrder;
    contact_number?: Prisma.SortOrder;
    phase?: Prisma.SortOrderInput | Prisma.SortOrder;
    package?: Prisma.SortOrderInput | Prisma.SortOrder;
    block?: Prisma.SortOrderInput | Prisma.SortOrder;
    lot?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    patientLogs?: Prisma.PatientLogOrderByRelationAggregateInput;
    images?: Prisma.PatientImageAttachmentOrderByRelationAggregateInput;
};
export type PatientWhereUniqueInput = Prisma.AtLeast<{
    patient_id?: string;
    AND?: Prisma.PatientWhereInput | Prisma.PatientWhereInput[];
    OR?: Prisma.PatientWhereInput[];
    NOT?: Prisma.PatientWhereInput | Prisma.PatientWhereInput[];
    full_name?: Prisma.StringFilter<"Patient"> | string;
    birthday?: Prisma.DateTimeFilter<"Patient"> | Date | string;
    sex?: Prisma.EnumGenderFilter<"Patient"> | $Enums.Gender;
    contact_person?: Prisma.StringFilter<"Patient"> | string;
    contact_number?: Prisma.StringFilter<"Patient"> | string;
    phase?: Prisma.StringNullableFilter<"Patient"> | string | null;
    package?: Prisma.StringNullableFilter<"Patient"> | string | null;
    block?: Prisma.StringNullableFilter<"Patient"> | string | null;
    lot?: Prisma.StringNullableFilter<"Patient"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Patient"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Patient"> | Date | string;
    patientLogs?: Prisma.PatientLogListRelationFilter;
    images?: Prisma.PatientImageAttachmentListRelationFilter;
}, "patient_id">;
export type PatientOrderByWithAggregationInput = {
    patient_id?: Prisma.SortOrder;
    full_name?: Prisma.SortOrder;
    birthday?: Prisma.SortOrder;
    sex?: Prisma.SortOrder;
    contact_person?: Prisma.SortOrder;
    contact_number?: Prisma.SortOrder;
    phase?: Prisma.SortOrderInput | Prisma.SortOrder;
    package?: Prisma.SortOrderInput | Prisma.SortOrder;
    block?: Prisma.SortOrderInput | Prisma.SortOrder;
    lot?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PatientCountOrderByAggregateInput;
    _max?: Prisma.PatientMaxOrderByAggregateInput;
    _min?: Prisma.PatientMinOrderByAggregateInput;
};
export type PatientScalarWhereWithAggregatesInput = {
    AND?: Prisma.PatientScalarWhereWithAggregatesInput | Prisma.PatientScalarWhereWithAggregatesInput[];
    OR?: Prisma.PatientScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PatientScalarWhereWithAggregatesInput | Prisma.PatientScalarWhereWithAggregatesInput[];
    patient_id?: Prisma.StringWithAggregatesFilter<"Patient"> | string;
    full_name?: Prisma.StringWithAggregatesFilter<"Patient"> | string;
    birthday?: Prisma.DateTimeWithAggregatesFilter<"Patient"> | Date | string;
    sex?: Prisma.EnumGenderWithAggregatesFilter<"Patient"> | $Enums.Gender;
    contact_person?: Prisma.StringWithAggregatesFilter<"Patient"> | string;
    contact_number?: Prisma.StringWithAggregatesFilter<"Patient"> | string;
    phase?: Prisma.StringNullableWithAggregatesFilter<"Patient"> | string | null;
    package?: Prisma.StringNullableWithAggregatesFilter<"Patient"> | string | null;
    block?: Prisma.StringNullableWithAggregatesFilter<"Patient"> | string | null;
    lot?: Prisma.StringNullableWithAggregatesFilter<"Patient"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Patient"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Patient"> | Date | string;
};
export type PatientCreateInput = {
    patient_id?: string;
    full_name: string;
    birthday: Date | string;
    sex: $Enums.Gender;
    contact_person: string;
    contact_number: string;
    phase?: string | null;
    package?: string | null;
    block?: string | null;
    lot?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    patientLogs?: Prisma.PatientLogCreateNestedManyWithoutPatientInput;
    images?: Prisma.PatientImageAttachmentCreateNestedManyWithoutPatientInput;
};
export type PatientUncheckedCreateInput = {
    patient_id?: string;
    full_name: string;
    birthday: Date | string;
    sex: $Enums.Gender;
    contact_person: string;
    contact_number: string;
    phase?: string | null;
    package?: string | null;
    block?: string | null;
    lot?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    patientLogs?: Prisma.PatientLogUncheckedCreateNestedManyWithoutPatientInput;
    images?: Prisma.PatientImageAttachmentUncheckedCreateNestedManyWithoutPatientInput;
};
export type PatientUpdateInput = {
    patient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    full_name?: Prisma.StringFieldUpdateOperationsInput | string;
    birthday?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sex?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    contact_person?: Prisma.StringFieldUpdateOperationsInput | string;
    contact_number?: Prisma.StringFieldUpdateOperationsInput | string;
    phase?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    package?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    block?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    patientLogs?: Prisma.PatientLogUpdateManyWithoutPatientNestedInput;
    images?: Prisma.PatientImageAttachmentUpdateManyWithoutPatientNestedInput;
};
export type PatientUncheckedUpdateInput = {
    patient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    full_name?: Prisma.StringFieldUpdateOperationsInput | string;
    birthday?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sex?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    contact_person?: Prisma.StringFieldUpdateOperationsInput | string;
    contact_number?: Prisma.StringFieldUpdateOperationsInput | string;
    phase?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    package?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    block?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    patientLogs?: Prisma.PatientLogUncheckedUpdateManyWithoutPatientNestedInput;
    images?: Prisma.PatientImageAttachmentUncheckedUpdateManyWithoutPatientNestedInput;
};
export type PatientCreateManyInput = {
    patient_id?: string;
    full_name: string;
    birthday: Date | string;
    sex: $Enums.Gender;
    contact_person: string;
    contact_number: string;
    phase?: string | null;
    package?: string | null;
    block?: string | null;
    lot?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PatientUpdateManyMutationInput = {
    patient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    full_name?: Prisma.StringFieldUpdateOperationsInput | string;
    birthday?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sex?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    contact_person?: Prisma.StringFieldUpdateOperationsInput | string;
    contact_number?: Prisma.StringFieldUpdateOperationsInput | string;
    phase?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    package?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    block?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientUncheckedUpdateManyInput = {
    patient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    full_name?: Prisma.StringFieldUpdateOperationsInput | string;
    birthday?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sex?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    contact_person?: Prisma.StringFieldUpdateOperationsInput | string;
    contact_number?: Prisma.StringFieldUpdateOperationsInput | string;
    phase?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    package?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    block?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientCountOrderByAggregateInput = {
    patient_id?: Prisma.SortOrder;
    full_name?: Prisma.SortOrder;
    birthday?: Prisma.SortOrder;
    sex?: Prisma.SortOrder;
    contact_person?: Prisma.SortOrder;
    contact_number?: Prisma.SortOrder;
    phase?: Prisma.SortOrder;
    package?: Prisma.SortOrder;
    block?: Prisma.SortOrder;
    lot?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PatientMaxOrderByAggregateInput = {
    patient_id?: Prisma.SortOrder;
    full_name?: Prisma.SortOrder;
    birthday?: Prisma.SortOrder;
    sex?: Prisma.SortOrder;
    contact_person?: Prisma.SortOrder;
    contact_number?: Prisma.SortOrder;
    phase?: Prisma.SortOrder;
    package?: Prisma.SortOrder;
    block?: Prisma.SortOrder;
    lot?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PatientMinOrderByAggregateInput = {
    patient_id?: Prisma.SortOrder;
    full_name?: Prisma.SortOrder;
    birthday?: Prisma.SortOrder;
    sex?: Prisma.SortOrder;
    contact_person?: Prisma.SortOrder;
    contact_number?: Prisma.SortOrder;
    phase?: Prisma.SortOrder;
    package?: Prisma.SortOrder;
    block?: Prisma.SortOrder;
    lot?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PatientScalarRelationFilter = {
    is?: Prisma.PatientWhereInput;
    isNot?: Prisma.PatientWhereInput;
};
export type PatientCreateNestedOneWithoutPatientLogsInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutPatientLogsInput, Prisma.PatientUncheckedCreateWithoutPatientLogsInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutPatientLogsInput;
    connect?: Prisma.PatientWhereUniqueInput;
};
export type PatientUpdateOneRequiredWithoutPatientLogsNestedInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutPatientLogsInput, Prisma.PatientUncheckedCreateWithoutPatientLogsInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutPatientLogsInput;
    upsert?: Prisma.PatientUpsertWithoutPatientLogsInput;
    connect?: Prisma.PatientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PatientUpdateToOneWithWhereWithoutPatientLogsInput, Prisma.PatientUpdateWithoutPatientLogsInput>, Prisma.PatientUncheckedUpdateWithoutPatientLogsInput>;
};
export type PatientCreateNestedOneWithoutImagesInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutImagesInput, Prisma.PatientUncheckedCreateWithoutImagesInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutImagesInput;
    connect?: Prisma.PatientWhereUniqueInput;
};
export type PatientUpdateOneRequiredWithoutImagesNestedInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutImagesInput, Prisma.PatientUncheckedCreateWithoutImagesInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutImagesInput;
    upsert?: Prisma.PatientUpsertWithoutImagesInput;
    connect?: Prisma.PatientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PatientUpdateToOneWithWhereWithoutImagesInput, Prisma.PatientUpdateWithoutImagesInput>, Prisma.PatientUncheckedUpdateWithoutImagesInput>;
};
export type PatientCreateWithoutPatientLogsInput = {
    patient_id?: string;
    full_name: string;
    birthday: Date | string;
    sex: $Enums.Gender;
    contact_person: string;
    contact_number: string;
    phase?: string | null;
    package?: string | null;
    block?: string | null;
    lot?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    images?: Prisma.PatientImageAttachmentCreateNestedManyWithoutPatientInput;
};
export type PatientUncheckedCreateWithoutPatientLogsInput = {
    patient_id?: string;
    full_name: string;
    birthday: Date | string;
    sex: $Enums.Gender;
    contact_person: string;
    contact_number: string;
    phase?: string | null;
    package?: string | null;
    block?: string | null;
    lot?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    images?: Prisma.PatientImageAttachmentUncheckedCreateNestedManyWithoutPatientInput;
};
export type PatientCreateOrConnectWithoutPatientLogsInput = {
    where: Prisma.PatientWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientCreateWithoutPatientLogsInput, Prisma.PatientUncheckedCreateWithoutPatientLogsInput>;
};
export type PatientUpsertWithoutPatientLogsInput = {
    update: Prisma.XOR<Prisma.PatientUpdateWithoutPatientLogsInput, Prisma.PatientUncheckedUpdateWithoutPatientLogsInput>;
    create: Prisma.XOR<Prisma.PatientCreateWithoutPatientLogsInput, Prisma.PatientUncheckedCreateWithoutPatientLogsInput>;
    where?: Prisma.PatientWhereInput;
};
export type PatientUpdateToOneWithWhereWithoutPatientLogsInput = {
    where?: Prisma.PatientWhereInput;
    data: Prisma.XOR<Prisma.PatientUpdateWithoutPatientLogsInput, Prisma.PatientUncheckedUpdateWithoutPatientLogsInput>;
};
export type PatientUpdateWithoutPatientLogsInput = {
    patient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    full_name?: Prisma.StringFieldUpdateOperationsInput | string;
    birthday?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sex?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    contact_person?: Prisma.StringFieldUpdateOperationsInput | string;
    contact_number?: Prisma.StringFieldUpdateOperationsInput | string;
    phase?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    package?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    block?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    images?: Prisma.PatientImageAttachmentUpdateManyWithoutPatientNestedInput;
};
export type PatientUncheckedUpdateWithoutPatientLogsInput = {
    patient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    full_name?: Prisma.StringFieldUpdateOperationsInput | string;
    birthday?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sex?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    contact_person?: Prisma.StringFieldUpdateOperationsInput | string;
    contact_number?: Prisma.StringFieldUpdateOperationsInput | string;
    phase?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    package?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    block?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    images?: Prisma.PatientImageAttachmentUncheckedUpdateManyWithoutPatientNestedInput;
};
export type PatientCreateWithoutImagesInput = {
    patient_id?: string;
    full_name: string;
    birthday: Date | string;
    sex: $Enums.Gender;
    contact_person: string;
    contact_number: string;
    phase?: string | null;
    package?: string | null;
    block?: string | null;
    lot?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    patientLogs?: Prisma.PatientLogCreateNestedManyWithoutPatientInput;
};
export type PatientUncheckedCreateWithoutImagesInput = {
    patient_id?: string;
    full_name: string;
    birthday: Date | string;
    sex: $Enums.Gender;
    contact_person: string;
    contact_number: string;
    phase?: string | null;
    package?: string | null;
    block?: string | null;
    lot?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    patientLogs?: Prisma.PatientLogUncheckedCreateNestedManyWithoutPatientInput;
};
export type PatientCreateOrConnectWithoutImagesInput = {
    where: Prisma.PatientWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientCreateWithoutImagesInput, Prisma.PatientUncheckedCreateWithoutImagesInput>;
};
export type PatientUpsertWithoutImagesInput = {
    update: Prisma.XOR<Prisma.PatientUpdateWithoutImagesInput, Prisma.PatientUncheckedUpdateWithoutImagesInput>;
    create: Prisma.XOR<Prisma.PatientCreateWithoutImagesInput, Prisma.PatientUncheckedCreateWithoutImagesInput>;
    where?: Prisma.PatientWhereInput;
};
export type PatientUpdateToOneWithWhereWithoutImagesInput = {
    where?: Prisma.PatientWhereInput;
    data: Prisma.XOR<Prisma.PatientUpdateWithoutImagesInput, Prisma.PatientUncheckedUpdateWithoutImagesInput>;
};
export type PatientUpdateWithoutImagesInput = {
    patient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    full_name?: Prisma.StringFieldUpdateOperationsInput | string;
    birthday?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sex?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    contact_person?: Prisma.StringFieldUpdateOperationsInput | string;
    contact_number?: Prisma.StringFieldUpdateOperationsInput | string;
    phase?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    package?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    block?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    patientLogs?: Prisma.PatientLogUpdateManyWithoutPatientNestedInput;
};
export type PatientUncheckedUpdateWithoutImagesInput = {
    patient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    full_name?: Prisma.StringFieldUpdateOperationsInput | string;
    birthday?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sex?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    contact_person?: Prisma.StringFieldUpdateOperationsInput | string;
    contact_number?: Prisma.StringFieldUpdateOperationsInput | string;
    phase?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    package?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    block?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    patientLogs?: Prisma.PatientLogUncheckedUpdateManyWithoutPatientNestedInput;
};
/**
 * Count Type PatientCountOutputType
 */
export type PatientCountOutputType = {
    patientLogs: number;
    images: number;
};
export type PatientCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    patientLogs?: boolean | PatientCountOutputTypeCountPatientLogsArgs;
    images?: boolean | PatientCountOutputTypeCountImagesArgs;
};
/**
 * PatientCountOutputType without action
 */
export type PatientCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientCountOutputType
     */
    select?: Prisma.PatientCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * PatientCountOutputType without action
 */
export type PatientCountOutputTypeCountPatientLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PatientLogWhereInput;
};
/**
 * PatientCountOutputType without action
 */
export type PatientCountOutputTypeCountImagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PatientImageAttachmentWhereInput;
};
export type PatientSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    patient_id?: boolean;
    full_name?: boolean;
    birthday?: boolean;
    sex?: boolean;
    contact_person?: boolean;
    contact_number?: boolean;
    phase?: boolean;
    package?: boolean;
    block?: boolean;
    lot?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    patientLogs?: boolean | Prisma.Patient$patientLogsArgs<ExtArgs>;
    images?: boolean | Prisma.Patient$imagesArgs<ExtArgs>;
    _count?: boolean | Prisma.PatientCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["patient"]>;
export type PatientSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    patient_id?: boolean;
    full_name?: boolean;
    birthday?: boolean;
    sex?: boolean;
    contact_person?: boolean;
    contact_number?: boolean;
    phase?: boolean;
    package?: boolean;
    block?: boolean;
    lot?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["patient"]>;
export type PatientSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    patient_id?: boolean;
    full_name?: boolean;
    birthday?: boolean;
    sex?: boolean;
    contact_person?: boolean;
    contact_number?: boolean;
    phase?: boolean;
    package?: boolean;
    block?: boolean;
    lot?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["patient"]>;
export type PatientSelectScalar = {
    patient_id?: boolean;
    full_name?: boolean;
    birthday?: boolean;
    sex?: boolean;
    contact_person?: boolean;
    contact_number?: boolean;
    phase?: boolean;
    package?: boolean;
    block?: boolean;
    lot?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PatientOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"patient_id" | "full_name" | "birthday" | "sex" | "contact_person" | "contact_number" | "phase" | "package" | "block" | "lot" | "createdAt" | "updatedAt", ExtArgs["result"]["patient"]>;
export type PatientInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    patientLogs?: boolean | Prisma.Patient$patientLogsArgs<ExtArgs>;
    images?: boolean | Prisma.Patient$imagesArgs<ExtArgs>;
    _count?: boolean | Prisma.PatientCountOutputTypeDefaultArgs<ExtArgs>;
};
export type PatientIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type PatientIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $PatientPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Patient";
    objects: {
        patientLogs: Prisma.$PatientLogPayload<ExtArgs>[];
        images: Prisma.$PatientImageAttachmentPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        patient_id: string;
        full_name: string;
        birthday: Date;
        sex: $Enums.Gender;
        contact_person: string;
        contact_number: string;
        phase: string | null;
        package: string | null;
        block: string | null;
        lot: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["patient"]>;
    composites: {};
};
export type PatientGetPayload<S extends boolean | null | undefined | PatientDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PatientPayload, S>;
export type PatientCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PatientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PatientCountAggregateInputType | true;
};
export interface PatientDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Patient'];
        meta: {
            name: 'Patient';
        };
    };
    /**
     * Find zero or one Patient that matches the filter.
     * @param {PatientFindUniqueArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientFindUniqueArgs>(args: Prisma.SelectSubset<T, PatientFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Patient that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatientFindUniqueOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PatientFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Patient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientFindFirstArgs>(args?: Prisma.SelectSubset<T, PatientFindFirstArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Patient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PatientFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Patients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Patients
     * const patients = await prisma.patient.findMany()
     *
     * // Get first 10 Patients
     * const patients = await prisma.patient.findMany({ take: 10 })
     *
     * // Only select the `patient_id`
     * const patientWithPatient_idOnly = await prisma.patient.findMany({ select: { patient_id: true } })
     *
     */
    findMany<T extends PatientFindManyArgs>(args?: Prisma.SelectSubset<T, PatientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Patient.
     * @param {PatientCreateArgs} args - Arguments to create a Patient.
     * @example
     * // Create one Patient
     * const Patient = await prisma.patient.create({
     *   data: {
     *     // ... data to create a Patient
     *   }
     * })
     *
     */
    create<T extends PatientCreateArgs>(args: Prisma.SelectSubset<T, PatientCreateArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Patients.
     * @param {PatientCreateManyArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PatientCreateManyArgs>(args?: Prisma.SelectSubset<T, PatientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Patients and returns the data saved in the database.
     * @param {PatientCreateManyAndReturnArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Patients and only return the `patient_id`
     * const patientWithPatient_idOnly = await prisma.patient.createManyAndReturn({
     *   select: { patient_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PatientCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PatientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Patient.
     * @param {PatientDeleteArgs} args - Arguments to delete one Patient.
     * @example
     * // Delete one Patient
     * const Patient = await prisma.patient.delete({
     *   where: {
     *     // ... filter to delete one Patient
     *   }
     * })
     *
     */
    delete<T extends PatientDeleteArgs>(args: Prisma.SelectSubset<T, PatientDeleteArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Patient.
     * @param {PatientUpdateArgs} args - Arguments to update one Patient.
     * @example
     * // Update one Patient
     * const patient = await prisma.patient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PatientUpdateArgs>(args: Prisma.SelectSubset<T, PatientUpdateArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Patients.
     * @param {PatientDeleteManyArgs} args - Arguments to filter Patients to delete.
     * @example
     * // Delete a few Patients
     * const { count } = await prisma.patient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PatientDeleteManyArgs>(args?: Prisma.SelectSubset<T, PatientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Patients
     * const patient = await prisma.patient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PatientUpdateManyArgs>(args: Prisma.SelectSubset<T, PatientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Patients and returns the data updated in the database.
     * @param {PatientUpdateManyAndReturnArgs} args - Arguments to update many Patients.
     * @example
     * // Update many Patients
     * const patient = await prisma.patient.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Patients and only return the `patient_id`
     * const patientWithPatient_idOnly = await prisma.patient.updateManyAndReturn({
     *   select: { patient_id: true },
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
    updateManyAndReturn<T extends PatientUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PatientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Patient.
     * @param {PatientUpsertArgs} args - Arguments to update or create a Patient.
     * @example
     * // Update or create a Patient
     * const patient = await prisma.patient.upsert({
     *   create: {
     *     // ... data to create a Patient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Patient we want to update
     *   }
     * })
     */
    upsert<T extends PatientUpsertArgs>(args: Prisma.SelectSubset<T, PatientUpsertArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientCountArgs} args - Arguments to filter Patients to count.
     * @example
     * // Count the number of Patients
     * const count = await prisma.patient.count({
     *   where: {
     *     // ... the filter for the Patients we want to count
     *   }
     * })
    **/
    count<T extends PatientCountArgs>(args?: Prisma.Subset<T, PatientCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PatientCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PatientAggregateArgs>(args: Prisma.Subset<T, PatientAggregateArgs>): Prisma.PrismaPromise<GetPatientAggregateType<T>>;
    /**
     * Group by Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientGroupByArgs} args - Group by arguments.
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
    groupBy<T extends PatientGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PatientGroupByArgs['orderBy'];
    } : {
        orderBy?: PatientGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PatientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Patient model
     */
    readonly fields: PatientFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Patient.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__PatientClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    patientLogs<T extends Prisma.Patient$patientLogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Patient$patientLogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    images<T extends Prisma.Patient$imagesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Patient$imagesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientImageAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the Patient model
 */
export interface PatientFieldRefs {
    readonly patient_id: Prisma.FieldRef<"Patient", 'String'>;
    readonly full_name: Prisma.FieldRef<"Patient", 'String'>;
    readonly birthday: Prisma.FieldRef<"Patient", 'DateTime'>;
    readonly sex: Prisma.FieldRef<"Patient", 'Gender'>;
    readonly contact_person: Prisma.FieldRef<"Patient", 'String'>;
    readonly contact_number: Prisma.FieldRef<"Patient", 'String'>;
    readonly phase: Prisma.FieldRef<"Patient", 'String'>;
    readonly package: Prisma.FieldRef<"Patient", 'String'>;
    readonly block: Prisma.FieldRef<"Patient", 'String'>;
    readonly lot: Prisma.FieldRef<"Patient", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Patient", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Patient", 'DateTime'>;
}
/**
 * Patient findUnique
 */
export type PatientFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: Prisma.PatientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Patient
     */
    omit?: Prisma.PatientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientInclude<ExtArgs> | null;
    /**
     * Filter, which Patient to fetch.
     */
    where: Prisma.PatientWhereUniqueInput;
};
/**
 * Patient findUniqueOrThrow
 */
export type PatientFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: Prisma.PatientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Patient
     */
    omit?: Prisma.PatientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientInclude<ExtArgs> | null;
    /**
     * Filter, which Patient to fetch.
     */
    where: Prisma.PatientWhereUniqueInput;
};
/**
 * Patient findFirst
 */
export type PatientFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: Prisma.PatientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Patient
     */
    omit?: Prisma.PatientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientInclude<ExtArgs> | null;
    /**
     * Filter, which Patient to fetch.
     */
    where?: Prisma.PatientWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Patients to fetch.
     */
    orderBy?: Prisma.PatientOrderByWithRelationInput | Prisma.PatientOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Patients.
     */
    cursor?: Prisma.PatientWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Patients.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Patients.
     */
    distinct?: Prisma.PatientScalarFieldEnum | Prisma.PatientScalarFieldEnum[];
};
/**
 * Patient findFirstOrThrow
 */
export type PatientFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: Prisma.PatientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Patient
     */
    omit?: Prisma.PatientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientInclude<ExtArgs> | null;
    /**
     * Filter, which Patient to fetch.
     */
    where?: Prisma.PatientWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Patients to fetch.
     */
    orderBy?: Prisma.PatientOrderByWithRelationInput | Prisma.PatientOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Patients.
     */
    cursor?: Prisma.PatientWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Patients.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Patients.
     */
    distinct?: Prisma.PatientScalarFieldEnum | Prisma.PatientScalarFieldEnum[];
};
/**
 * Patient findMany
 */
export type PatientFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: Prisma.PatientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Patient
     */
    omit?: Prisma.PatientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientInclude<ExtArgs> | null;
    /**
     * Filter, which Patients to fetch.
     */
    where?: Prisma.PatientWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Patients to fetch.
     */
    orderBy?: Prisma.PatientOrderByWithRelationInput | Prisma.PatientOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Patients.
     */
    cursor?: Prisma.PatientWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Patients.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Patients.
     */
    distinct?: Prisma.PatientScalarFieldEnum | Prisma.PatientScalarFieldEnum[];
};
/**
 * Patient create
 */
export type PatientCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: Prisma.PatientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Patient
     */
    omit?: Prisma.PatientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientInclude<ExtArgs> | null;
    /**
     * The data needed to create a Patient.
     */
    data: Prisma.XOR<Prisma.PatientCreateInput, Prisma.PatientUncheckedCreateInput>;
};
/**
 * Patient createMany
 */
export type PatientCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Patients.
     */
    data: Prisma.PatientCreateManyInput | Prisma.PatientCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Patient createManyAndReturn
 */
export type PatientCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: Prisma.PatientSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Patient
     */
    omit?: Prisma.PatientOmit<ExtArgs> | null;
    /**
     * The data used to create many Patients.
     */
    data: Prisma.PatientCreateManyInput | Prisma.PatientCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Patient update
 */
export type PatientUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: Prisma.PatientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Patient
     */
    omit?: Prisma.PatientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientInclude<ExtArgs> | null;
    /**
     * The data needed to update a Patient.
     */
    data: Prisma.XOR<Prisma.PatientUpdateInput, Prisma.PatientUncheckedUpdateInput>;
    /**
     * Choose, which Patient to update.
     */
    where: Prisma.PatientWhereUniqueInput;
};
/**
 * Patient updateMany
 */
export type PatientUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Patients.
     */
    data: Prisma.XOR<Prisma.PatientUpdateManyMutationInput, Prisma.PatientUncheckedUpdateManyInput>;
    /**
     * Filter which Patients to update
     */
    where?: Prisma.PatientWhereInput;
    /**
     * Limit how many Patients to update.
     */
    limit?: number;
};
/**
 * Patient updateManyAndReturn
 */
export type PatientUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: Prisma.PatientSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Patient
     */
    omit?: Prisma.PatientOmit<ExtArgs> | null;
    /**
     * The data used to update Patients.
     */
    data: Prisma.XOR<Prisma.PatientUpdateManyMutationInput, Prisma.PatientUncheckedUpdateManyInput>;
    /**
     * Filter which Patients to update
     */
    where?: Prisma.PatientWhereInput;
    /**
     * Limit how many Patients to update.
     */
    limit?: number;
};
/**
 * Patient upsert
 */
export type PatientUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: Prisma.PatientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Patient
     */
    omit?: Prisma.PatientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientInclude<ExtArgs> | null;
    /**
     * The filter to search for the Patient to update in case it exists.
     */
    where: Prisma.PatientWhereUniqueInput;
    /**
     * In case the Patient found by the `where` argument doesn't exist, create a new Patient with this data.
     */
    create: Prisma.XOR<Prisma.PatientCreateInput, Prisma.PatientUncheckedCreateInput>;
    /**
     * In case the Patient was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.PatientUpdateInput, Prisma.PatientUncheckedUpdateInput>;
};
/**
 * Patient delete
 */
export type PatientDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: Prisma.PatientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Patient
     */
    omit?: Prisma.PatientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientInclude<ExtArgs> | null;
    /**
     * Filter which Patient to delete.
     */
    where: Prisma.PatientWhereUniqueInput;
};
/**
 * Patient deleteMany
 */
export type PatientDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Patients to delete
     */
    where?: Prisma.PatientWhereInput;
    /**
     * Limit how many Patients to delete.
     */
    limit?: number;
};
/**
 * Patient.patientLogs
 */
export type Patient$patientLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientLog
     */
    select?: Prisma.PatientLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientLog
     */
    omit?: Prisma.PatientLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientLogInclude<ExtArgs> | null;
    where?: Prisma.PatientLogWhereInput;
    orderBy?: Prisma.PatientLogOrderByWithRelationInput | Prisma.PatientLogOrderByWithRelationInput[];
    cursor?: Prisma.PatientLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PatientLogScalarFieldEnum | Prisma.PatientLogScalarFieldEnum[];
};
/**
 * Patient.images
 */
export type Patient$imagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.PatientImageAttachmentWhereInput;
    orderBy?: Prisma.PatientImageAttachmentOrderByWithRelationInput | Prisma.PatientImageAttachmentOrderByWithRelationInput[];
    cursor?: Prisma.PatientImageAttachmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PatientImageAttachmentScalarFieldEnum | Prisma.PatientImageAttachmentScalarFieldEnum[];
};
/**
 * Patient without action
 */
export type PatientDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: Prisma.PatientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Patient
     */
    omit?: Prisma.PatientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientInclude<ExtArgs> | null;
};
//# sourceMappingURL=Patient.d.ts.map