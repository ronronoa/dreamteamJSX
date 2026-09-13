import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model PatientLog
 *
 */
export type PatientLogModel = runtime.Types.Result.DefaultSelection<Prisma.$PatientLogPayload>;
export type AggregatePatientLog = {
    _count: PatientLogCountAggregateOutputType | null;
    _min: PatientLogMinAggregateOutputType | null;
    _max: PatientLogMaxAggregateOutputType | null;
};
export type PatientLogMinAggregateOutputType = {
    patient_log_id: string | null;
    patient_id: string | null;
    log_date: Date | null;
    type_of_request: $Enums.PatientRequestType | null;
    submitted_by: string | null;
    name_of_caller: string | null;
    bp: string | null;
    pr: string | null;
    spo2: string | null;
    temp: string | null;
    medical_assessment: string | null;
    hospital_name: string | null;
    hospital_representative: string | null;
    hospital_in_time: Date | null;
    hospital_out_time: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PatientLogMaxAggregateOutputType = {
    patient_log_id: string | null;
    patient_id: string | null;
    log_date: Date | null;
    type_of_request: $Enums.PatientRequestType | null;
    submitted_by: string | null;
    name_of_caller: string | null;
    bp: string | null;
    pr: string | null;
    spo2: string | null;
    temp: string | null;
    medical_assessment: string | null;
    hospital_name: string | null;
    hospital_representative: string | null;
    hospital_in_time: Date | null;
    hospital_out_time: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PatientLogCountAggregateOutputType = {
    patient_log_id: number;
    patient_id: number;
    log_date: number;
    type_of_request: number;
    submitted_by: number;
    name_of_caller: number;
    bp: number;
    pr: number;
    spo2: number;
    temp: number;
    medical_assessment: number;
    hospital_name: number;
    hospital_representative: number;
    hospital_in_time: number;
    hospital_out_time: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PatientLogMinAggregateInputType = {
    patient_log_id?: true;
    patient_id?: true;
    log_date?: true;
    type_of_request?: true;
    submitted_by?: true;
    name_of_caller?: true;
    bp?: true;
    pr?: true;
    spo2?: true;
    temp?: true;
    medical_assessment?: true;
    hospital_name?: true;
    hospital_representative?: true;
    hospital_in_time?: true;
    hospital_out_time?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PatientLogMaxAggregateInputType = {
    patient_log_id?: true;
    patient_id?: true;
    log_date?: true;
    type_of_request?: true;
    submitted_by?: true;
    name_of_caller?: true;
    bp?: true;
    pr?: true;
    spo2?: true;
    temp?: true;
    medical_assessment?: true;
    hospital_name?: true;
    hospital_representative?: true;
    hospital_in_time?: true;
    hospital_out_time?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PatientLogCountAggregateInputType = {
    patient_log_id?: true;
    patient_id?: true;
    log_date?: true;
    type_of_request?: true;
    submitted_by?: true;
    name_of_caller?: true;
    bp?: true;
    pr?: true;
    spo2?: true;
    temp?: true;
    medical_assessment?: true;
    hospital_name?: true;
    hospital_representative?: true;
    hospital_in_time?: true;
    hospital_out_time?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PatientLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PatientLog to aggregate.
     */
    where?: Prisma.PatientLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PatientLogs to fetch.
     */
    orderBy?: Prisma.PatientLogOrderByWithRelationInput | Prisma.PatientLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.PatientLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PatientLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PatientLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned PatientLogs
    **/
    _count?: true | PatientLogCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: PatientLogMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: PatientLogMaxAggregateInputType;
};
export type GetPatientLogAggregateType<T extends PatientLogAggregateArgs> = {
    [P in keyof T & keyof AggregatePatientLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePatientLog[P]> : Prisma.GetScalarType<T[P], AggregatePatientLog[P]>;
};
export type PatientLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PatientLogWhereInput;
    orderBy?: Prisma.PatientLogOrderByWithAggregationInput | Prisma.PatientLogOrderByWithAggregationInput[];
    by: Prisma.PatientLogScalarFieldEnum[] | Prisma.PatientLogScalarFieldEnum;
    having?: Prisma.PatientLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PatientLogCountAggregateInputType | true;
    _min?: PatientLogMinAggregateInputType;
    _max?: PatientLogMaxAggregateInputType;
};
export type PatientLogGroupByOutputType = {
    patient_log_id: string;
    patient_id: string;
    log_date: Date;
    type_of_request: $Enums.PatientRequestType;
    submitted_by: string;
    name_of_caller: string | null;
    bp: string | null;
    pr: string | null;
    spo2: string | null;
    temp: string | null;
    medical_assessment: string | null;
    hospital_name: string | null;
    hospital_representative: string | null;
    hospital_in_time: Date | null;
    hospital_out_time: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: PatientLogCountAggregateOutputType | null;
    _min: PatientLogMinAggregateOutputType | null;
    _max: PatientLogMaxAggregateOutputType | null;
};
export type GetPatientLogGroupByPayload<T extends PatientLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PatientLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PatientLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PatientLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PatientLogGroupByOutputType[P]>;
}>>;
export type PatientLogWhereInput = {
    AND?: Prisma.PatientLogWhereInput | Prisma.PatientLogWhereInput[];
    OR?: Prisma.PatientLogWhereInput[];
    NOT?: Prisma.PatientLogWhereInput | Prisma.PatientLogWhereInput[];
    patient_log_id?: Prisma.StringFilter<"PatientLog"> | string;
    patient_id?: Prisma.StringFilter<"PatientLog"> | string;
    log_date?: Prisma.DateTimeFilter<"PatientLog"> | Date | string;
    type_of_request?: Prisma.EnumPatientRequestTypeFilter<"PatientLog"> | $Enums.PatientRequestType;
    submitted_by?: Prisma.StringFilter<"PatientLog"> | string;
    name_of_caller?: Prisma.StringNullableFilter<"PatientLog"> | string | null;
    bp?: Prisma.StringNullableFilter<"PatientLog"> | string | null;
    pr?: Prisma.StringNullableFilter<"PatientLog"> | string | null;
    spo2?: Prisma.StringNullableFilter<"PatientLog"> | string | null;
    temp?: Prisma.StringNullableFilter<"PatientLog"> | string | null;
    medical_assessment?: Prisma.StringNullableFilter<"PatientLog"> | string | null;
    hospital_name?: Prisma.StringNullableFilter<"PatientLog"> | string | null;
    hospital_representative?: Prisma.StringNullableFilter<"PatientLog"> | string | null;
    hospital_in_time?: Prisma.DateTimeNullableFilter<"PatientLog"> | Date | string | null;
    hospital_out_time?: Prisma.DateTimeNullableFilter<"PatientLog"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"PatientLog"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PatientLog"> | Date | string;
    patient?: Prisma.XOR<Prisma.PatientScalarRelationFilter, Prisma.PatientWhereInput>;
    submitter?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    responders?: Prisma.PatientResponderListRelationFilter;
    dispatches?: Prisma.VehicularDispatchListRelationFilter;
};
export type PatientLogOrderByWithRelationInput = {
    patient_log_id?: Prisma.SortOrder;
    patient_id?: Prisma.SortOrder;
    log_date?: Prisma.SortOrder;
    type_of_request?: Prisma.SortOrder;
    submitted_by?: Prisma.SortOrder;
    name_of_caller?: Prisma.SortOrderInput | Prisma.SortOrder;
    bp?: Prisma.SortOrderInput | Prisma.SortOrder;
    pr?: Prisma.SortOrderInput | Prisma.SortOrder;
    spo2?: Prisma.SortOrderInput | Prisma.SortOrder;
    temp?: Prisma.SortOrderInput | Prisma.SortOrder;
    medical_assessment?: Prisma.SortOrderInput | Prisma.SortOrder;
    hospital_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    hospital_representative?: Prisma.SortOrderInput | Prisma.SortOrder;
    hospital_in_time?: Prisma.SortOrderInput | Prisma.SortOrder;
    hospital_out_time?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    patient?: Prisma.PatientOrderByWithRelationInput;
    submitter?: Prisma.UserOrderByWithRelationInput;
    responders?: Prisma.PatientResponderOrderByRelationAggregateInput;
    dispatches?: Prisma.VehicularDispatchOrderByRelationAggregateInput;
};
export type PatientLogWhereUniqueInput = Prisma.AtLeast<{
    patient_log_id?: string;
    AND?: Prisma.PatientLogWhereInput | Prisma.PatientLogWhereInput[];
    OR?: Prisma.PatientLogWhereInput[];
    NOT?: Prisma.PatientLogWhereInput | Prisma.PatientLogWhereInput[];
    patient_id?: Prisma.StringFilter<"PatientLog"> | string;
    log_date?: Prisma.DateTimeFilter<"PatientLog"> | Date | string;
    type_of_request?: Prisma.EnumPatientRequestTypeFilter<"PatientLog"> | $Enums.PatientRequestType;
    submitted_by?: Prisma.StringFilter<"PatientLog"> | string;
    name_of_caller?: Prisma.StringNullableFilter<"PatientLog"> | string | null;
    bp?: Prisma.StringNullableFilter<"PatientLog"> | string | null;
    pr?: Prisma.StringNullableFilter<"PatientLog"> | string | null;
    spo2?: Prisma.StringNullableFilter<"PatientLog"> | string | null;
    temp?: Prisma.StringNullableFilter<"PatientLog"> | string | null;
    medical_assessment?: Prisma.StringNullableFilter<"PatientLog"> | string | null;
    hospital_name?: Prisma.StringNullableFilter<"PatientLog"> | string | null;
    hospital_representative?: Prisma.StringNullableFilter<"PatientLog"> | string | null;
    hospital_in_time?: Prisma.DateTimeNullableFilter<"PatientLog"> | Date | string | null;
    hospital_out_time?: Prisma.DateTimeNullableFilter<"PatientLog"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"PatientLog"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PatientLog"> | Date | string;
    patient?: Prisma.XOR<Prisma.PatientScalarRelationFilter, Prisma.PatientWhereInput>;
    submitter?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    responders?: Prisma.PatientResponderListRelationFilter;
    dispatches?: Prisma.VehicularDispatchListRelationFilter;
}, "patient_log_id">;
export type PatientLogOrderByWithAggregationInput = {
    patient_log_id?: Prisma.SortOrder;
    patient_id?: Prisma.SortOrder;
    log_date?: Prisma.SortOrder;
    type_of_request?: Prisma.SortOrder;
    submitted_by?: Prisma.SortOrder;
    name_of_caller?: Prisma.SortOrderInput | Prisma.SortOrder;
    bp?: Prisma.SortOrderInput | Prisma.SortOrder;
    pr?: Prisma.SortOrderInput | Prisma.SortOrder;
    spo2?: Prisma.SortOrderInput | Prisma.SortOrder;
    temp?: Prisma.SortOrderInput | Prisma.SortOrder;
    medical_assessment?: Prisma.SortOrderInput | Prisma.SortOrder;
    hospital_name?: Prisma.SortOrderInput | Prisma.SortOrder;
    hospital_representative?: Prisma.SortOrderInput | Prisma.SortOrder;
    hospital_in_time?: Prisma.SortOrderInput | Prisma.SortOrder;
    hospital_out_time?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PatientLogCountOrderByAggregateInput;
    _max?: Prisma.PatientLogMaxOrderByAggregateInput;
    _min?: Prisma.PatientLogMinOrderByAggregateInput;
};
export type PatientLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.PatientLogScalarWhereWithAggregatesInput | Prisma.PatientLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.PatientLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PatientLogScalarWhereWithAggregatesInput | Prisma.PatientLogScalarWhereWithAggregatesInput[];
    patient_log_id?: Prisma.StringWithAggregatesFilter<"PatientLog"> | string;
    patient_id?: Prisma.StringWithAggregatesFilter<"PatientLog"> | string;
    log_date?: Prisma.DateTimeWithAggregatesFilter<"PatientLog"> | Date | string;
    type_of_request?: Prisma.EnumPatientRequestTypeWithAggregatesFilter<"PatientLog"> | $Enums.PatientRequestType;
    submitted_by?: Prisma.StringWithAggregatesFilter<"PatientLog"> | string;
    name_of_caller?: Prisma.StringNullableWithAggregatesFilter<"PatientLog"> | string | null;
    bp?: Prisma.StringNullableWithAggregatesFilter<"PatientLog"> | string | null;
    pr?: Prisma.StringNullableWithAggregatesFilter<"PatientLog"> | string | null;
    spo2?: Prisma.StringNullableWithAggregatesFilter<"PatientLog"> | string | null;
    temp?: Prisma.StringNullableWithAggregatesFilter<"PatientLog"> | string | null;
    medical_assessment?: Prisma.StringNullableWithAggregatesFilter<"PatientLog"> | string | null;
    hospital_name?: Prisma.StringNullableWithAggregatesFilter<"PatientLog"> | string | null;
    hospital_representative?: Prisma.StringNullableWithAggregatesFilter<"PatientLog"> | string | null;
    hospital_in_time?: Prisma.DateTimeNullableWithAggregatesFilter<"PatientLog"> | Date | string | null;
    hospital_out_time?: Prisma.DateTimeNullableWithAggregatesFilter<"PatientLog"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PatientLog"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"PatientLog"> | Date | string;
};
export type PatientLogCreateInput = {
    patient_log_id?: string;
    log_date: Date | string;
    type_of_request: $Enums.PatientRequestType;
    name_of_caller?: string | null;
    bp?: string | null;
    pr?: string | null;
    spo2?: string | null;
    temp?: string | null;
    medical_assessment?: string | null;
    hospital_name?: string | null;
    hospital_representative?: string | null;
    hospital_in_time?: Date | string | null;
    hospital_out_time?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    patient: Prisma.PatientCreateNestedOneWithoutPatientLogsInput;
    submitter: Prisma.UserCreateNestedOneWithoutSubmittedPatientsInput;
    responders?: Prisma.PatientResponderCreateNestedManyWithoutPatientLogInput;
    dispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutPatientLogInput;
};
export type PatientLogUncheckedCreateInput = {
    patient_log_id?: string;
    patient_id: string;
    log_date: Date | string;
    type_of_request: $Enums.PatientRequestType;
    submitted_by: string;
    name_of_caller?: string | null;
    bp?: string | null;
    pr?: string | null;
    spo2?: string | null;
    temp?: string | null;
    medical_assessment?: string | null;
    hospital_name?: string | null;
    hospital_representative?: string | null;
    hospital_in_time?: Date | string | null;
    hospital_out_time?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    responders?: Prisma.PatientResponderUncheckedCreateNestedManyWithoutPatientLogInput;
    dispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutPatientLogInput;
};
export type PatientLogUpdateInput = {
    patient_log_id?: Prisma.StringFieldUpdateOperationsInput | string;
    log_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type_of_request?: Prisma.EnumPatientRequestTypeFieldUpdateOperationsInput | $Enums.PatientRequestType;
    name_of_caller?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    spo2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    temp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    medical_assessment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_representative?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hospital_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    patient?: Prisma.PatientUpdateOneRequiredWithoutPatientLogsNestedInput;
    submitter?: Prisma.UserUpdateOneRequiredWithoutSubmittedPatientsNestedInput;
    responders?: Prisma.PatientResponderUpdateManyWithoutPatientLogNestedInput;
    dispatches?: Prisma.VehicularDispatchUpdateManyWithoutPatientLogNestedInput;
};
export type PatientLogUncheckedUpdateInput = {
    patient_log_id?: Prisma.StringFieldUpdateOperationsInput | string;
    patient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    log_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type_of_request?: Prisma.EnumPatientRequestTypeFieldUpdateOperationsInput | $Enums.PatientRequestType;
    submitted_by?: Prisma.StringFieldUpdateOperationsInput | string;
    name_of_caller?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    spo2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    temp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    medical_assessment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_representative?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hospital_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    responders?: Prisma.PatientResponderUncheckedUpdateManyWithoutPatientLogNestedInput;
    dispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutPatientLogNestedInput;
};
export type PatientLogCreateManyInput = {
    patient_log_id?: string;
    patient_id: string;
    log_date: Date | string;
    type_of_request: $Enums.PatientRequestType;
    submitted_by: string;
    name_of_caller?: string | null;
    bp?: string | null;
    pr?: string | null;
    spo2?: string | null;
    temp?: string | null;
    medical_assessment?: string | null;
    hospital_name?: string | null;
    hospital_representative?: string | null;
    hospital_in_time?: Date | string | null;
    hospital_out_time?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PatientLogUpdateManyMutationInput = {
    patient_log_id?: Prisma.StringFieldUpdateOperationsInput | string;
    log_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type_of_request?: Prisma.EnumPatientRequestTypeFieldUpdateOperationsInput | $Enums.PatientRequestType;
    name_of_caller?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    spo2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    temp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    medical_assessment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_representative?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hospital_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientLogUncheckedUpdateManyInput = {
    patient_log_id?: Prisma.StringFieldUpdateOperationsInput | string;
    patient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    log_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type_of_request?: Prisma.EnumPatientRequestTypeFieldUpdateOperationsInput | $Enums.PatientRequestType;
    submitted_by?: Prisma.StringFieldUpdateOperationsInput | string;
    name_of_caller?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    spo2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    temp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    medical_assessment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_representative?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hospital_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientLogListRelationFilter = {
    every?: Prisma.PatientLogWhereInput;
    some?: Prisma.PatientLogWhereInput;
    none?: Prisma.PatientLogWhereInput;
};
export type PatientLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PatientLogCountOrderByAggregateInput = {
    patient_log_id?: Prisma.SortOrder;
    patient_id?: Prisma.SortOrder;
    log_date?: Prisma.SortOrder;
    type_of_request?: Prisma.SortOrder;
    submitted_by?: Prisma.SortOrder;
    name_of_caller?: Prisma.SortOrder;
    bp?: Prisma.SortOrder;
    pr?: Prisma.SortOrder;
    spo2?: Prisma.SortOrder;
    temp?: Prisma.SortOrder;
    medical_assessment?: Prisma.SortOrder;
    hospital_name?: Prisma.SortOrder;
    hospital_representative?: Prisma.SortOrder;
    hospital_in_time?: Prisma.SortOrder;
    hospital_out_time?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PatientLogMaxOrderByAggregateInput = {
    patient_log_id?: Prisma.SortOrder;
    patient_id?: Prisma.SortOrder;
    log_date?: Prisma.SortOrder;
    type_of_request?: Prisma.SortOrder;
    submitted_by?: Prisma.SortOrder;
    name_of_caller?: Prisma.SortOrder;
    bp?: Prisma.SortOrder;
    pr?: Prisma.SortOrder;
    spo2?: Prisma.SortOrder;
    temp?: Prisma.SortOrder;
    medical_assessment?: Prisma.SortOrder;
    hospital_name?: Prisma.SortOrder;
    hospital_representative?: Prisma.SortOrder;
    hospital_in_time?: Prisma.SortOrder;
    hospital_out_time?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PatientLogMinOrderByAggregateInput = {
    patient_log_id?: Prisma.SortOrder;
    patient_id?: Prisma.SortOrder;
    log_date?: Prisma.SortOrder;
    type_of_request?: Prisma.SortOrder;
    submitted_by?: Prisma.SortOrder;
    name_of_caller?: Prisma.SortOrder;
    bp?: Prisma.SortOrder;
    pr?: Prisma.SortOrder;
    spo2?: Prisma.SortOrder;
    temp?: Prisma.SortOrder;
    medical_assessment?: Prisma.SortOrder;
    hospital_name?: Prisma.SortOrder;
    hospital_representative?: Prisma.SortOrder;
    hospital_in_time?: Prisma.SortOrder;
    hospital_out_time?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PatientLogScalarRelationFilter = {
    is?: Prisma.PatientLogWhereInput;
    isNot?: Prisma.PatientLogWhereInput;
};
export type PatientLogNullableScalarRelationFilter = {
    is?: Prisma.PatientLogWhereInput | null;
    isNot?: Prisma.PatientLogWhereInput | null;
};
export type PatientLogCreateNestedManyWithoutSubmitterInput = {
    create?: Prisma.XOR<Prisma.PatientLogCreateWithoutSubmitterInput, Prisma.PatientLogUncheckedCreateWithoutSubmitterInput> | Prisma.PatientLogCreateWithoutSubmitterInput[] | Prisma.PatientLogUncheckedCreateWithoutSubmitterInput[];
    connectOrCreate?: Prisma.PatientLogCreateOrConnectWithoutSubmitterInput | Prisma.PatientLogCreateOrConnectWithoutSubmitterInput[];
    createMany?: Prisma.PatientLogCreateManySubmitterInputEnvelope;
    connect?: Prisma.PatientLogWhereUniqueInput | Prisma.PatientLogWhereUniqueInput[];
};
export type PatientLogUncheckedCreateNestedManyWithoutSubmitterInput = {
    create?: Prisma.XOR<Prisma.PatientLogCreateWithoutSubmitterInput, Prisma.PatientLogUncheckedCreateWithoutSubmitterInput> | Prisma.PatientLogCreateWithoutSubmitterInput[] | Prisma.PatientLogUncheckedCreateWithoutSubmitterInput[];
    connectOrCreate?: Prisma.PatientLogCreateOrConnectWithoutSubmitterInput | Prisma.PatientLogCreateOrConnectWithoutSubmitterInput[];
    createMany?: Prisma.PatientLogCreateManySubmitterInputEnvelope;
    connect?: Prisma.PatientLogWhereUniqueInput | Prisma.PatientLogWhereUniqueInput[];
};
export type PatientLogUpdateManyWithoutSubmitterNestedInput = {
    create?: Prisma.XOR<Prisma.PatientLogCreateWithoutSubmitterInput, Prisma.PatientLogUncheckedCreateWithoutSubmitterInput> | Prisma.PatientLogCreateWithoutSubmitterInput[] | Prisma.PatientLogUncheckedCreateWithoutSubmitterInput[];
    connectOrCreate?: Prisma.PatientLogCreateOrConnectWithoutSubmitterInput | Prisma.PatientLogCreateOrConnectWithoutSubmitterInput[];
    upsert?: Prisma.PatientLogUpsertWithWhereUniqueWithoutSubmitterInput | Prisma.PatientLogUpsertWithWhereUniqueWithoutSubmitterInput[];
    createMany?: Prisma.PatientLogCreateManySubmitterInputEnvelope;
    set?: Prisma.PatientLogWhereUniqueInput | Prisma.PatientLogWhereUniqueInput[];
    disconnect?: Prisma.PatientLogWhereUniqueInput | Prisma.PatientLogWhereUniqueInput[];
    delete?: Prisma.PatientLogWhereUniqueInput | Prisma.PatientLogWhereUniqueInput[];
    connect?: Prisma.PatientLogWhereUniqueInput | Prisma.PatientLogWhereUniqueInput[];
    update?: Prisma.PatientLogUpdateWithWhereUniqueWithoutSubmitterInput | Prisma.PatientLogUpdateWithWhereUniqueWithoutSubmitterInput[];
    updateMany?: Prisma.PatientLogUpdateManyWithWhereWithoutSubmitterInput | Prisma.PatientLogUpdateManyWithWhereWithoutSubmitterInput[];
    deleteMany?: Prisma.PatientLogScalarWhereInput | Prisma.PatientLogScalarWhereInput[];
};
export type PatientLogUncheckedUpdateManyWithoutSubmitterNestedInput = {
    create?: Prisma.XOR<Prisma.PatientLogCreateWithoutSubmitterInput, Prisma.PatientLogUncheckedCreateWithoutSubmitterInput> | Prisma.PatientLogCreateWithoutSubmitterInput[] | Prisma.PatientLogUncheckedCreateWithoutSubmitterInput[];
    connectOrCreate?: Prisma.PatientLogCreateOrConnectWithoutSubmitterInput | Prisma.PatientLogCreateOrConnectWithoutSubmitterInput[];
    upsert?: Prisma.PatientLogUpsertWithWhereUniqueWithoutSubmitterInput | Prisma.PatientLogUpsertWithWhereUniqueWithoutSubmitterInput[];
    createMany?: Prisma.PatientLogCreateManySubmitterInputEnvelope;
    set?: Prisma.PatientLogWhereUniqueInput | Prisma.PatientLogWhereUniqueInput[];
    disconnect?: Prisma.PatientLogWhereUniqueInput | Prisma.PatientLogWhereUniqueInput[];
    delete?: Prisma.PatientLogWhereUniqueInput | Prisma.PatientLogWhereUniqueInput[];
    connect?: Prisma.PatientLogWhereUniqueInput | Prisma.PatientLogWhereUniqueInput[];
    update?: Prisma.PatientLogUpdateWithWhereUniqueWithoutSubmitterInput | Prisma.PatientLogUpdateWithWhereUniqueWithoutSubmitterInput[];
    updateMany?: Prisma.PatientLogUpdateManyWithWhereWithoutSubmitterInput | Prisma.PatientLogUpdateManyWithWhereWithoutSubmitterInput[];
    deleteMany?: Prisma.PatientLogScalarWhereInput | Prisma.PatientLogScalarWhereInput[];
};
export type PatientLogCreateNestedManyWithoutPatientInput = {
    create?: Prisma.XOR<Prisma.PatientLogCreateWithoutPatientInput, Prisma.PatientLogUncheckedCreateWithoutPatientInput> | Prisma.PatientLogCreateWithoutPatientInput[] | Prisma.PatientLogUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.PatientLogCreateOrConnectWithoutPatientInput | Prisma.PatientLogCreateOrConnectWithoutPatientInput[];
    createMany?: Prisma.PatientLogCreateManyPatientInputEnvelope;
    connect?: Prisma.PatientLogWhereUniqueInput | Prisma.PatientLogWhereUniqueInput[];
};
export type PatientLogUncheckedCreateNestedManyWithoutPatientInput = {
    create?: Prisma.XOR<Prisma.PatientLogCreateWithoutPatientInput, Prisma.PatientLogUncheckedCreateWithoutPatientInput> | Prisma.PatientLogCreateWithoutPatientInput[] | Prisma.PatientLogUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.PatientLogCreateOrConnectWithoutPatientInput | Prisma.PatientLogCreateOrConnectWithoutPatientInput[];
    createMany?: Prisma.PatientLogCreateManyPatientInputEnvelope;
    connect?: Prisma.PatientLogWhereUniqueInput | Prisma.PatientLogWhereUniqueInput[];
};
export type PatientLogUpdateManyWithoutPatientNestedInput = {
    create?: Prisma.XOR<Prisma.PatientLogCreateWithoutPatientInput, Prisma.PatientLogUncheckedCreateWithoutPatientInput> | Prisma.PatientLogCreateWithoutPatientInput[] | Prisma.PatientLogUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.PatientLogCreateOrConnectWithoutPatientInput | Prisma.PatientLogCreateOrConnectWithoutPatientInput[];
    upsert?: Prisma.PatientLogUpsertWithWhereUniqueWithoutPatientInput | Prisma.PatientLogUpsertWithWhereUniqueWithoutPatientInput[];
    createMany?: Prisma.PatientLogCreateManyPatientInputEnvelope;
    set?: Prisma.PatientLogWhereUniqueInput | Prisma.PatientLogWhereUniqueInput[];
    disconnect?: Prisma.PatientLogWhereUniqueInput | Prisma.PatientLogWhereUniqueInput[];
    delete?: Prisma.PatientLogWhereUniqueInput | Prisma.PatientLogWhereUniqueInput[];
    connect?: Prisma.PatientLogWhereUniqueInput | Prisma.PatientLogWhereUniqueInput[];
    update?: Prisma.PatientLogUpdateWithWhereUniqueWithoutPatientInput | Prisma.PatientLogUpdateWithWhereUniqueWithoutPatientInput[];
    updateMany?: Prisma.PatientLogUpdateManyWithWhereWithoutPatientInput | Prisma.PatientLogUpdateManyWithWhereWithoutPatientInput[];
    deleteMany?: Prisma.PatientLogScalarWhereInput | Prisma.PatientLogScalarWhereInput[];
};
export type PatientLogUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: Prisma.XOR<Prisma.PatientLogCreateWithoutPatientInput, Prisma.PatientLogUncheckedCreateWithoutPatientInput> | Prisma.PatientLogCreateWithoutPatientInput[] | Prisma.PatientLogUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.PatientLogCreateOrConnectWithoutPatientInput | Prisma.PatientLogCreateOrConnectWithoutPatientInput[];
    upsert?: Prisma.PatientLogUpsertWithWhereUniqueWithoutPatientInput | Prisma.PatientLogUpsertWithWhereUniqueWithoutPatientInput[];
    createMany?: Prisma.PatientLogCreateManyPatientInputEnvelope;
    set?: Prisma.PatientLogWhereUniqueInput | Prisma.PatientLogWhereUniqueInput[];
    disconnect?: Prisma.PatientLogWhereUniqueInput | Prisma.PatientLogWhereUniqueInput[];
    delete?: Prisma.PatientLogWhereUniqueInput | Prisma.PatientLogWhereUniqueInput[];
    connect?: Prisma.PatientLogWhereUniqueInput | Prisma.PatientLogWhereUniqueInput[];
    update?: Prisma.PatientLogUpdateWithWhereUniqueWithoutPatientInput | Prisma.PatientLogUpdateWithWhereUniqueWithoutPatientInput[];
    updateMany?: Prisma.PatientLogUpdateManyWithWhereWithoutPatientInput | Prisma.PatientLogUpdateManyWithWhereWithoutPatientInput[];
    deleteMany?: Prisma.PatientLogScalarWhereInput | Prisma.PatientLogScalarWhereInput[];
};
export type EnumPatientRequestTypeFieldUpdateOperationsInput = {
    set?: $Enums.PatientRequestType;
};
export type PatientLogCreateNestedOneWithoutRespondersInput = {
    create?: Prisma.XOR<Prisma.PatientLogCreateWithoutRespondersInput, Prisma.PatientLogUncheckedCreateWithoutRespondersInput>;
    connectOrCreate?: Prisma.PatientLogCreateOrConnectWithoutRespondersInput;
    connect?: Prisma.PatientLogWhereUniqueInput;
};
export type PatientLogUpdateOneRequiredWithoutRespondersNestedInput = {
    create?: Prisma.XOR<Prisma.PatientLogCreateWithoutRespondersInput, Prisma.PatientLogUncheckedCreateWithoutRespondersInput>;
    connectOrCreate?: Prisma.PatientLogCreateOrConnectWithoutRespondersInput;
    upsert?: Prisma.PatientLogUpsertWithoutRespondersInput;
    connect?: Prisma.PatientLogWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PatientLogUpdateToOneWithWhereWithoutRespondersInput, Prisma.PatientLogUpdateWithoutRespondersInput>, Prisma.PatientLogUncheckedUpdateWithoutRespondersInput>;
};
export type PatientLogCreateNestedOneWithoutDispatchesInput = {
    create?: Prisma.XOR<Prisma.PatientLogCreateWithoutDispatchesInput, Prisma.PatientLogUncheckedCreateWithoutDispatchesInput>;
    connectOrCreate?: Prisma.PatientLogCreateOrConnectWithoutDispatchesInput;
    connect?: Prisma.PatientLogWhereUniqueInput;
};
export type PatientLogUpdateOneWithoutDispatchesNestedInput = {
    create?: Prisma.XOR<Prisma.PatientLogCreateWithoutDispatchesInput, Prisma.PatientLogUncheckedCreateWithoutDispatchesInput>;
    connectOrCreate?: Prisma.PatientLogCreateOrConnectWithoutDispatchesInput;
    upsert?: Prisma.PatientLogUpsertWithoutDispatchesInput;
    disconnect?: Prisma.PatientLogWhereInput | boolean;
    delete?: Prisma.PatientLogWhereInput | boolean;
    connect?: Prisma.PatientLogWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PatientLogUpdateToOneWithWhereWithoutDispatchesInput, Prisma.PatientLogUpdateWithoutDispatchesInput>, Prisma.PatientLogUncheckedUpdateWithoutDispatchesInput>;
};
export type PatientLogCreateWithoutSubmitterInput = {
    patient_log_id?: string;
    log_date: Date | string;
    type_of_request: $Enums.PatientRequestType;
    name_of_caller?: string | null;
    bp?: string | null;
    pr?: string | null;
    spo2?: string | null;
    temp?: string | null;
    medical_assessment?: string | null;
    hospital_name?: string | null;
    hospital_representative?: string | null;
    hospital_in_time?: Date | string | null;
    hospital_out_time?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    patient: Prisma.PatientCreateNestedOneWithoutPatientLogsInput;
    responders?: Prisma.PatientResponderCreateNestedManyWithoutPatientLogInput;
    dispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutPatientLogInput;
};
export type PatientLogUncheckedCreateWithoutSubmitterInput = {
    patient_log_id?: string;
    patient_id: string;
    log_date: Date | string;
    type_of_request: $Enums.PatientRequestType;
    name_of_caller?: string | null;
    bp?: string | null;
    pr?: string | null;
    spo2?: string | null;
    temp?: string | null;
    medical_assessment?: string | null;
    hospital_name?: string | null;
    hospital_representative?: string | null;
    hospital_in_time?: Date | string | null;
    hospital_out_time?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    responders?: Prisma.PatientResponderUncheckedCreateNestedManyWithoutPatientLogInput;
    dispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutPatientLogInput;
};
export type PatientLogCreateOrConnectWithoutSubmitterInput = {
    where: Prisma.PatientLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientLogCreateWithoutSubmitterInput, Prisma.PatientLogUncheckedCreateWithoutSubmitterInput>;
};
export type PatientLogCreateManySubmitterInputEnvelope = {
    data: Prisma.PatientLogCreateManySubmitterInput | Prisma.PatientLogCreateManySubmitterInput[];
    skipDuplicates?: boolean;
};
export type PatientLogUpsertWithWhereUniqueWithoutSubmitterInput = {
    where: Prisma.PatientLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.PatientLogUpdateWithoutSubmitterInput, Prisma.PatientLogUncheckedUpdateWithoutSubmitterInput>;
    create: Prisma.XOR<Prisma.PatientLogCreateWithoutSubmitterInput, Prisma.PatientLogUncheckedCreateWithoutSubmitterInput>;
};
export type PatientLogUpdateWithWhereUniqueWithoutSubmitterInput = {
    where: Prisma.PatientLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.PatientLogUpdateWithoutSubmitterInput, Prisma.PatientLogUncheckedUpdateWithoutSubmitterInput>;
};
export type PatientLogUpdateManyWithWhereWithoutSubmitterInput = {
    where: Prisma.PatientLogScalarWhereInput;
    data: Prisma.XOR<Prisma.PatientLogUpdateManyMutationInput, Prisma.PatientLogUncheckedUpdateManyWithoutSubmitterInput>;
};
export type PatientLogScalarWhereInput = {
    AND?: Prisma.PatientLogScalarWhereInput | Prisma.PatientLogScalarWhereInput[];
    OR?: Prisma.PatientLogScalarWhereInput[];
    NOT?: Prisma.PatientLogScalarWhereInput | Prisma.PatientLogScalarWhereInput[];
    patient_log_id?: Prisma.StringFilter<"PatientLog"> | string;
    patient_id?: Prisma.StringFilter<"PatientLog"> | string;
    log_date?: Prisma.DateTimeFilter<"PatientLog"> | Date | string;
    type_of_request?: Prisma.EnumPatientRequestTypeFilter<"PatientLog"> | $Enums.PatientRequestType;
    submitted_by?: Prisma.StringFilter<"PatientLog"> | string;
    name_of_caller?: Prisma.StringNullableFilter<"PatientLog"> | string | null;
    bp?: Prisma.StringNullableFilter<"PatientLog"> | string | null;
    pr?: Prisma.StringNullableFilter<"PatientLog"> | string | null;
    spo2?: Prisma.StringNullableFilter<"PatientLog"> | string | null;
    temp?: Prisma.StringNullableFilter<"PatientLog"> | string | null;
    medical_assessment?: Prisma.StringNullableFilter<"PatientLog"> | string | null;
    hospital_name?: Prisma.StringNullableFilter<"PatientLog"> | string | null;
    hospital_representative?: Prisma.StringNullableFilter<"PatientLog"> | string | null;
    hospital_in_time?: Prisma.DateTimeNullableFilter<"PatientLog"> | Date | string | null;
    hospital_out_time?: Prisma.DateTimeNullableFilter<"PatientLog"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"PatientLog"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PatientLog"> | Date | string;
};
export type PatientLogCreateWithoutPatientInput = {
    patient_log_id?: string;
    log_date: Date | string;
    type_of_request: $Enums.PatientRequestType;
    name_of_caller?: string | null;
    bp?: string | null;
    pr?: string | null;
    spo2?: string | null;
    temp?: string | null;
    medical_assessment?: string | null;
    hospital_name?: string | null;
    hospital_representative?: string | null;
    hospital_in_time?: Date | string | null;
    hospital_out_time?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    submitter: Prisma.UserCreateNestedOneWithoutSubmittedPatientsInput;
    responders?: Prisma.PatientResponderCreateNestedManyWithoutPatientLogInput;
    dispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutPatientLogInput;
};
export type PatientLogUncheckedCreateWithoutPatientInput = {
    patient_log_id?: string;
    log_date: Date | string;
    type_of_request: $Enums.PatientRequestType;
    submitted_by: string;
    name_of_caller?: string | null;
    bp?: string | null;
    pr?: string | null;
    spo2?: string | null;
    temp?: string | null;
    medical_assessment?: string | null;
    hospital_name?: string | null;
    hospital_representative?: string | null;
    hospital_in_time?: Date | string | null;
    hospital_out_time?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    responders?: Prisma.PatientResponderUncheckedCreateNestedManyWithoutPatientLogInput;
    dispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutPatientLogInput;
};
export type PatientLogCreateOrConnectWithoutPatientInput = {
    where: Prisma.PatientLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientLogCreateWithoutPatientInput, Prisma.PatientLogUncheckedCreateWithoutPatientInput>;
};
export type PatientLogCreateManyPatientInputEnvelope = {
    data: Prisma.PatientLogCreateManyPatientInput | Prisma.PatientLogCreateManyPatientInput[];
    skipDuplicates?: boolean;
};
export type PatientLogUpsertWithWhereUniqueWithoutPatientInput = {
    where: Prisma.PatientLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.PatientLogUpdateWithoutPatientInput, Prisma.PatientLogUncheckedUpdateWithoutPatientInput>;
    create: Prisma.XOR<Prisma.PatientLogCreateWithoutPatientInput, Prisma.PatientLogUncheckedCreateWithoutPatientInput>;
};
export type PatientLogUpdateWithWhereUniqueWithoutPatientInput = {
    where: Prisma.PatientLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.PatientLogUpdateWithoutPatientInput, Prisma.PatientLogUncheckedUpdateWithoutPatientInput>;
};
export type PatientLogUpdateManyWithWhereWithoutPatientInput = {
    where: Prisma.PatientLogScalarWhereInput;
    data: Prisma.XOR<Prisma.PatientLogUpdateManyMutationInput, Prisma.PatientLogUncheckedUpdateManyWithoutPatientInput>;
};
export type PatientLogCreateWithoutRespondersInput = {
    patient_log_id?: string;
    log_date: Date | string;
    type_of_request: $Enums.PatientRequestType;
    name_of_caller?: string | null;
    bp?: string | null;
    pr?: string | null;
    spo2?: string | null;
    temp?: string | null;
    medical_assessment?: string | null;
    hospital_name?: string | null;
    hospital_representative?: string | null;
    hospital_in_time?: Date | string | null;
    hospital_out_time?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    patient: Prisma.PatientCreateNestedOneWithoutPatientLogsInput;
    submitter: Prisma.UserCreateNestedOneWithoutSubmittedPatientsInput;
    dispatches?: Prisma.VehicularDispatchCreateNestedManyWithoutPatientLogInput;
};
export type PatientLogUncheckedCreateWithoutRespondersInput = {
    patient_log_id?: string;
    patient_id: string;
    log_date: Date | string;
    type_of_request: $Enums.PatientRequestType;
    submitted_by: string;
    name_of_caller?: string | null;
    bp?: string | null;
    pr?: string | null;
    spo2?: string | null;
    temp?: string | null;
    medical_assessment?: string | null;
    hospital_name?: string | null;
    hospital_representative?: string | null;
    hospital_in_time?: Date | string | null;
    hospital_out_time?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    dispatches?: Prisma.VehicularDispatchUncheckedCreateNestedManyWithoutPatientLogInput;
};
export type PatientLogCreateOrConnectWithoutRespondersInput = {
    where: Prisma.PatientLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientLogCreateWithoutRespondersInput, Prisma.PatientLogUncheckedCreateWithoutRespondersInput>;
};
export type PatientLogUpsertWithoutRespondersInput = {
    update: Prisma.XOR<Prisma.PatientLogUpdateWithoutRespondersInput, Prisma.PatientLogUncheckedUpdateWithoutRespondersInput>;
    create: Prisma.XOR<Prisma.PatientLogCreateWithoutRespondersInput, Prisma.PatientLogUncheckedCreateWithoutRespondersInput>;
    where?: Prisma.PatientLogWhereInput;
};
export type PatientLogUpdateToOneWithWhereWithoutRespondersInput = {
    where?: Prisma.PatientLogWhereInput;
    data: Prisma.XOR<Prisma.PatientLogUpdateWithoutRespondersInput, Prisma.PatientLogUncheckedUpdateWithoutRespondersInput>;
};
export type PatientLogUpdateWithoutRespondersInput = {
    patient_log_id?: Prisma.StringFieldUpdateOperationsInput | string;
    log_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type_of_request?: Prisma.EnumPatientRequestTypeFieldUpdateOperationsInput | $Enums.PatientRequestType;
    name_of_caller?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    spo2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    temp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    medical_assessment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_representative?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hospital_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    patient?: Prisma.PatientUpdateOneRequiredWithoutPatientLogsNestedInput;
    submitter?: Prisma.UserUpdateOneRequiredWithoutSubmittedPatientsNestedInput;
    dispatches?: Prisma.VehicularDispatchUpdateManyWithoutPatientLogNestedInput;
};
export type PatientLogUncheckedUpdateWithoutRespondersInput = {
    patient_log_id?: Prisma.StringFieldUpdateOperationsInput | string;
    patient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    log_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type_of_request?: Prisma.EnumPatientRequestTypeFieldUpdateOperationsInput | $Enums.PatientRequestType;
    submitted_by?: Prisma.StringFieldUpdateOperationsInput | string;
    name_of_caller?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    spo2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    temp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    medical_assessment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_representative?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hospital_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutPatientLogNestedInput;
};
export type PatientLogCreateWithoutDispatchesInput = {
    patient_log_id?: string;
    log_date: Date | string;
    type_of_request: $Enums.PatientRequestType;
    name_of_caller?: string | null;
    bp?: string | null;
    pr?: string | null;
    spo2?: string | null;
    temp?: string | null;
    medical_assessment?: string | null;
    hospital_name?: string | null;
    hospital_representative?: string | null;
    hospital_in_time?: Date | string | null;
    hospital_out_time?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    patient: Prisma.PatientCreateNestedOneWithoutPatientLogsInput;
    submitter: Prisma.UserCreateNestedOneWithoutSubmittedPatientsInput;
    responders?: Prisma.PatientResponderCreateNestedManyWithoutPatientLogInput;
};
export type PatientLogUncheckedCreateWithoutDispatchesInput = {
    patient_log_id?: string;
    patient_id: string;
    log_date: Date | string;
    type_of_request: $Enums.PatientRequestType;
    submitted_by: string;
    name_of_caller?: string | null;
    bp?: string | null;
    pr?: string | null;
    spo2?: string | null;
    temp?: string | null;
    medical_assessment?: string | null;
    hospital_name?: string | null;
    hospital_representative?: string | null;
    hospital_in_time?: Date | string | null;
    hospital_out_time?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    responders?: Prisma.PatientResponderUncheckedCreateNestedManyWithoutPatientLogInput;
};
export type PatientLogCreateOrConnectWithoutDispatchesInput = {
    where: Prisma.PatientLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientLogCreateWithoutDispatchesInput, Prisma.PatientLogUncheckedCreateWithoutDispatchesInput>;
};
export type PatientLogUpsertWithoutDispatchesInput = {
    update: Prisma.XOR<Prisma.PatientLogUpdateWithoutDispatchesInput, Prisma.PatientLogUncheckedUpdateWithoutDispatchesInput>;
    create: Prisma.XOR<Prisma.PatientLogCreateWithoutDispatchesInput, Prisma.PatientLogUncheckedCreateWithoutDispatchesInput>;
    where?: Prisma.PatientLogWhereInput;
};
export type PatientLogUpdateToOneWithWhereWithoutDispatchesInput = {
    where?: Prisma.PatientLogWhereInput;
    data: Prisma.XOR<Prisma.PatientLogUpdateWithoutDispatchesInput, Prisma.PatientLogUncheckedUpdateWithoutDispatchesInput>;
};
export type PatientLogUpdateWithoutDispatchesInput = {
    patient_log_id?: Prisma.StringFieldUpdateOperationsInput | string;
    log_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type_of_request?: Prisma.EnumPatientRequestTypeFieldUpdateOperationsInput | $Enums.PatientRequestType;
    name_of_caller?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    spo2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    temp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    medical_assessment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_representative?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hospital_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    patient?: Prisma.PatientUpdateOneRequiredWithoutPatientLogsNestedInput;
    submitter?: Prisma.UserUpdateOneRequiredWithoutSubmittedPatientsNestedInput;
    responders?: Prisma.PatientResponderUpdateManyWithoutPatientLogNestedInput;
};
export type PatientLogUncheckedUpdateWithoutDispatchesInput = {
    patient_log_id?: Prisma.StringFieldUpdateOperationsInput | string;
    patient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    log_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type_of_request?: Prisma.EnumPatientRequestTypeFieldUpdateOperationsInput | $Enums.PatientRequestType;
    submitted_by?: Prisma.StringFieldUpdateOperationsInput | string;
    name_of_caller?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    spo2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    temp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    medical_assessment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_representative?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hospital_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    responders?: Prisma.PatientResponderUncheckedUpdateManyWithoutPatientLogNestedInput;
};
export type PatientLogCreateManySubmitterInput = {
    patient_log_id?: string;
    patient_id: string;
    log_date: Date | string;
    type_of_request: $Enums.PatientRequestType;
    name_of_caller?: string | null;
    bp?: string | null;
    pr?: string | null;
    spo2?: string | null;
    temp?: string | null;
    medical_assessment?: string | null;
    hospital_name?: string | null;
    hospital_representative?: string | null;
    hospital_in_time?: Date | string | null;
    hospital_out_time?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PatientLogUpdateWithoutSubmitterInput = {
    patient_log_id?: Prisma.StringFieldUpdateOperationsInput | string;
    log_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type_of_request?: Prisma.EnumPatientRequestTypeFieldUpdateOperationsInput | $Enums.PatientRequestType;
    name_of_caller?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    spo2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    temp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    medical_assessment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_representative?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hospital_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    patient?: Prisma.PatientUpdateOneRequiredWithoutPatientLogsNestedInput;
    responders?: Prisma.PatientResponderUpdateManyWithoutPatientLogNestedInput;
    dispatches?: Prisma.VehicularDispatchUpdateManyWithoutPatientLogNestedInput;
};
export type PatientLogUncheckedUpdateWithoutSubmitterInput = {
    patient_log_id?: Prisma.StringFieldUpdateOperationsInput | string;
    patient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    log_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type_of_request?: Prisma.EnumPatientRequestTypeFieldUpdateOperationsInput | $Enums.PatientRequestType;
    name_of_caller?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    spo2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    temp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    medical_assessment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_representative?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hospital_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    responders?: Prisma.PatientResponderUncheckedUpdateManyWithoutPatientLogNestedInput;
    dispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutPatientLogNestedInput;
};
export type PatientLogUncheckedUpdateManyWithoutSubmitterInput = {
    patient_log_id?: Prisma.StringFieldUpdateOperationsInput | string;
    patient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    log_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type_of_request?: Prisma.EnumPatientRequestTypeFieldUpdateOperationsInput | $Enums.PatientRequestType;
    name_of_caller?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    spo2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    temp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    medical_assessment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_representative?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hospital_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientLogCreateManyPatientInput = {
    patient_log_id?: string;
    log_date: Date | string;
    type_of_request: $Enums.PatientRequestType;
    submitted_by: string;
    name_of_caller?: string | null;
    bp?: string | null;
    pr?: string | null;
    spo2?: string | null;
    temp?: string | null;
    medical_assessment?: string | null;
    hospital_name?: string | null;
    hospital_representative?: string | null;
    hospital_in_time?: Date | string | null;
    hospital_out_time?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PatientLogUpdateWithoutPatientInput = {
    patient_log_id?: Prisma.StringFieldUpdateOperationsInput | string;
    log_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type_of_request?: Prisma.EnumPatientRequestTypeFieldUpdateOperationsInput | $Enums.PatientRequestType;
    name_of_caller?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    spo2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    temp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    medical_assessment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_representative?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hospital_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submitter?: Prisma.UserUpdateOneRequiredWithoutSubmittedPatientsNestedInput;
    responders?: Prisma.PatientResponderUpdateManyWithoutPatientLogNestedInput;
    dispatches?: Prisma.VehicularDispatchUpdateManyWithoutPatientLogNestedInput;
};
export type PatientLogUncheckedUpdateWithoutPatientInput = {
    patient_log_id?: Prisma.StringFieldUpdateOperationsInput | string;
    log_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type_of_request?: Prisma.EnumPatientRequestTypeFieldUpdateOperationsInput | $Enums.PatientRequestType;
    submitted_by?: Prisma.StringFieldUpdateOperationsInput | string;
    name_of_caller?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    spo2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    temp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    medical_assessment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_representative?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hospital_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    responders?: Prisma.PatientResponderUncheckedUpdateManyWithoutPatientLogNestedInput;
    dispatches?: Prisma.VehicularDispatchUncheckedUpdateManyWithoutPatientLogNestedInput;
};
export type PatientLogUncheckedUpdateManyWithoutPatientInput = {
    patient_log_id?: Prisma.StringFieldUpdateOperationsInput | string;
    log_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    type_of_request?: Prisma.EnumPatientRequestTypeFieldUpdateOperationsInput | $Enums.PatientRequestType;
    submitted_by?: Prisma.StringFieldUpdateOperationsInput | string;
    name_of_caller?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    spo2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    temp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    medical_assessment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_representative?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hospital_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hospital_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type PatientLogCountOutputType
 */
export type PatientLogCountOutputType = {
    responders: number;
    dispatches: number;
};
export type PatientLogCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    responders?: boolean | PatientLogCountOutputTypeCountRespondersArgs;
    dispatches?: boolean | PatientLogCountOutputTypeCountDispatchesArgs;
};
/**
 * PatientLogCountOutputType without action
 */
export type PatientLogCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientLogCountOutputType
     */
    select?: Prisma.PatientLogCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * PatientLogCountOutputType without action
 */
export type PatientLogCountOutputTypeCountRespondersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PatientResponderWhereInput;
};
/**
 * PatientLogCountOutputType without action
 */
export type PatientLogCountOutputTypeCountDispatchesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VehicularDispatchWhereInput;
};
export type PatientLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    patient_log_id?: boolean;
    patient_id?: boolean;
    log_date?: boolean;
    type_of_request?: boolean;
    submitted_by?: boolean;
    name_of_caller?: boolean;
    bp?: boolean;
    pr?: boolean;
    spo2?: boolean;
    temp?: boolean;
    medical_assessment?: boolean;
    hospital_name?: boolean;
    hospital_representative?: boolean;
    hospital_in_time?: boolean;
    hospital_out_time?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
    submitter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    responders?: boolean | Prisma.PatientLog$respondersArgs<ExtArgs>;
    dispatches?: boolean | Prisma.PatientLog$dispatchesArgs<ExtArgs>;
    _count?: boolean | Prisma.PatientLogCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["patientLog"]>;
export type PatientLogSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    patient_log_id?: boolean;
    patient_id?: boolean;
    log_date?: boolean;
    type_of_request?: boolean;
    submitted_by?: boolean;
    name_of_caller?: boolean;
    bp?: boolean;
    pr?: boolean;
    spo2?: boolean;
    temp?: boolean;
    medical_assessment?: boolean;
    hospital_name?: boolean;
    hospital_representative?: boolean;
    hospital_in_time?: boolean;
    hospital_out_time?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
    submitter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["patientLog"]>;
export type PatientLogSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    patient_log_id?: boolean;
    patient_id?: boolean;
    log_date?: boolean;
    type_of_request?: boolean;
    submitted_by?: boolean;
    name_of_caller?: boolean;
    bp?: boolean;
    pr?: boolean;
    spo2?: boolean;
    temp?: boolean;
    medical_assessment?: boolean;
    hospital_name?: boolean;
    hospital_representative?: boolean;
    hospital_in_time?: boolean;
    hospital_out_time?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
    submitter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["patientLog"]>;
export type PatientLogSelectScalar = {
    patient_log_id?: boolean;
    patient_id?: boolean;
    log_date?: boolean;
    type_of_request?: boolean;
    submitted_by?: boolean;
    name_of_caller?: boolean;
    bp?: boolean;
    pr?: boolean;
    spo2?: boolean;
    temp?: boolean;
    medical_assessment?: boolean;
    hospital_name?: boolean;
    hospital_representative?: boolean;
    hospital_in_time?: boolean;
    hospital_out_time?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PatientLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"patient_log_id" | "patient_id" | "log_date" | "type_of_request" | "submitted_by" | "name_of_caller" | "bp" | "pr" | "spo2" | "temp" | "medical_assessment" | "hospital_name" | "hospital_representative" | "hospital_in_time" | "hospital_out_time" | "createdAt" | "updatedAt", ExtArgs["result"]["patientLog"]>;
export type PatientLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
    submitter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    responders?: boolean | Prisma.PatientLog$respondersArgs<ExtArgs>;
    dispatches?: boolean | Prisma.PatientLog$dispatchesArgs<ExtArgs>;
    _count?: boolean | Prisma.PatientLogCountOutputTypeDefaultArgs<ExtArgs>;
};
export type PatientLogIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
    submitter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PatientLogIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
    submitter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $PatientLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PatientLog";
    objects: {
        patient: Prisma.$PatientPayload<ExtArgs>;
        submitter: Prisma.$UserPayload<ExtArgs>;
        responders: Prisma.$PatientResponderPayload<ExtArgs>[];
        dispatches: Prisma.$VehicularDispatchPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        patient_log_id: string;
        patient_id: string;
        log_date: Date;
        type_of_request: $Enums.PatientRequestType;
        submitted_by: string;
        name_of_caller: string | null;
        bp: string | null;
        pr: string | null;
        spo2: string | null;
        temp: string | null;
        medical_assessment: string | null;
        hospital_name: string | null;
        hospital_representative: string | null;
        hospital_in_time: Date | null;
        hospital_out_time: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["patientLog"]>;
    composites: {};
};
export type PatientLogGetPayload<S extends boolean | null | undefined | PatientLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PatientLogPayload, S>;
export type PatientLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PatientLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PatientLogCountAggregateInputType | true;
};
export interface PatientLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PatientLog'];
        meta: {
            name: 'PatientLog';
        };
    };
    /**
     * Find zero or one PatientLog that matches the filter.
     * @param {PatientLogFindUniqueArgs} args - Arguments to find a PatientLog
     * @example
     * // Get one PatientLog
     * const patientLog = await prisma.patientLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientLogFindUniqueArgs>(args: Prisma.SelectSubset<T, PatientLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PatientLogClient<runtime.Types.Result.GetResult<Prisma.$PatientLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one PatientLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatientLogFindUniqueOrThrowArgs} args - Arguments to find a PatientLog
     * @example
     * // Get one PatientLog
     * const patientLog = await prisma.patientLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PatientLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PatientLogClient<runtime.Types.Result.GetResult<Prisma.$PatientLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PatientLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientLogFindFirstArgs} args - Arguments to find a PatientLog
     * @example
     * // Get one PatientLog
     * const patientLog = await prisma.patientLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientLogFindFirstArgs>(args?: Prisma.SelectSubset<T, PatientLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__PatientLogClient<runtime.Types.Result.GetResult<Prisma.$PatientLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PatientLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientLogFindFirstOrThrowArgs} args - Arguments to find a PatientLog
     * @example
     * // Get one PatientLog
     * const patientLog = await prisma.patientLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PatientLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PatientLogClient<runtime.Types.Result.GetResult<Prisma.$PatientLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more PatientLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PatientLogs
     * const patientLogs = await prisma.patientLog.findMany()
     *
     * // Get first 10 PatientLogs
     * const patientLogs = await prisma.patientLog.findMany({ take: 10 })
     *
     * // Only select the `patient_log_id`
     * const patientLogWithPatient_log_idOnly = await prisma.patientLog.findMany({ select: { patient_log_id: true } })
     *
     */
    findMany<T extends PatientLogFindManyArgs>(args?: Prisma.SelectSubset<T, PatientLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a PatientLog.
     * @param {PatientLogCreateArgs} args - Arguments to create a PatientLog.
     * @example
     * // Create one PatientLog
     * const PatientLog = await prisma.patientLog.create({
     *   data: {
     *     // ... data to create a PatientLog
     *   }
     * })
     *
     */
    create<T extends PatientLogCreateArgs>(args: Prisma.SelectSubset<T, PatientLogCreateArgs<ExtArgs>>): Prisma.Prisma__PatientLogClient<runtime.Types.Result.GetResult<Prisma.$PatientLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many PatientLogs.
     * @param {PatientLogCreateManyArgs} args - Arguments to create many PatientLogs.
     * @example
     * // Create many PatientLogs
     * const patientLog = await prisma.patientLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PatientLogCreateManyArgs>(args?: Prisma.SelectSubset<T, PatientLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many PatientLogs and returns the data saved in the database.
     * @param {PatientLogCreateManyAndReturnArgs} args - Arguments to create many PatientLogs.
     * @example
     * // Create many PatientLogs
     * const patientLog = await prisma.patientLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many PatientLogs and only return the `patient_log_id`
     * const patientLogWithPatient_log_idOnly = await prisma.patientLog.createManyAndReturn({
     *   select: { patient_log_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PatientLogCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PatientLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a PatientLog.
     * @param {PatientLogDeleteArgs} args - Arguments to delete one PatientLog.
     * @example
     * // Delete one PatientLog
     * const PatientLog = await prisma.patientLog.delete({
     *   where: {
     *     // ... filter to delete one PatientLog
     *   }
     * })
     *
     */
    delete<T extends PatientLogDeleteArgs>(args: Prisma.SelectSubset<T, PatientLogDeleteArgs<ExtArgs>>): Prisma.Prisma__PatientLogClient<runtime.Types.Result.GetResult<Prisma.$PatientLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one PatientLog.
     * @param {PatientLogUpdateArgs} args - Arguments to update one PatientLog.
     * @example
     * // Update one PatientLog
     * const patientLog = await prisma.patientLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PatientLogUpdateArgs>(args: Prisma.SelectSubset<T, PatientLogUpdateArgs<ExtArgs>>): Prisma.Prisma__PatientLogClient<runtime.Types.Result.GetResult<Prisma.$PatientLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more PatientLogs.
     * @param {PatientLogDeleteManyArgs} args - Arguments to filter PatientLogs to delete.
     * @example
     * // Delete a few PatientLogs
     * const { count } = await prisma.patientLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PatientLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, PatientLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PatientLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PatientLogs
     * const patientLog = await prisma.patientLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PatientLogUpdateManyArgs>(args: Prisma.SelectSubset<T, PatientLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PatientLogs and returns the data updated in the database.
     * @param {PatientLogUpdateManyAndReturnArgs} args - Arguments to update many PatientLogs.
     * @example
     * // Update many PatientLogs
     * const patientLog = await prisma.patientLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more PatientLogs and only return the `patient_log_id`
     * const patientLogWithPatient_log_idOnly = await prisma.patientLog.updateManyAndReturn({
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
    updateManyAndReturn<T extends PatientLogUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PatientLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one PatientLog.
     * @param {PatientLogUpsertArgs} args - Arguments to update or create a PatientLog.
     * @example
     * // Update or create a PatientLog
     * const patientLog = await prisma.patientLog.upsert({
     *   create: {
     *     // ... data to create a PatientLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PatientLog we want to update
     *   }
     * })
     */
    upsert<T extends PatientLogUpsertArgs>(args: Prisma.SelectSubset<T, PatientLogUpsertArgs<ExtArgs>>): Prisma.Prisma__PatientLogClient<runtime.Types.Result.GetResult<Prisma.$PatientLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of PatientLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientLogCountArgs} args - Arguments to filter PatientLogs to count.
     * @example
     * // Count the number of PatientLogs
     * const count = await prisma.patientLog.count({
     *   where: {
     *     // ... the filter for the PatientLogs we want to count
     *   }
     * })
    **/
    count<T extends PatientLogCountArgs>(args?: Prisma.Subset<T, PatientLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PatientLogCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a PatientLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PatientLogAggregateArgs>(args: Prisma.Subset<T, PatientLogAggregateArgs>): Prisma.PrismaPromise<GetPatientLogAggregateType<T>>;
    /**
     * Group by PatientLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientLogGroupByArgs} args - Group by arguments.
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
    groupBy<T extends PatientLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PatientLogGroupByArgs['orderBy'];
    } : {
        orderBy?: PatientLogGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PatientLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the PatientLog model
     */
    readonly fields: PatientLogFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for PatientLog.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__PatientLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    patient<T extends Prisma.PatientDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PatientDefaultArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    submitter<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    responders<T extends Prisma.PatientLog$respondersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PatientLog$respondersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientResponderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    dispatches<T extends Prisma.PatientLog$dispatchesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PatientLog$dispatchesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VehicularDispatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the PatientLog model
 */
export interface PatientLogFieldRefs {
    readonly patient_log_id: Prisma.FieldRef<"PatientLog", 'String'>;
    readonly patient_id: Prisma.FieldRef<"PatientLog", 'String'>;
    readonly log_date: Prisma.FieldRef<"PatientLog", 'DateTime'>;
    readonly type_of_request: Prisma.FieldRef<"PatientLog", 'PatientRequestType'>;
    readonly submitted_by: Prisma.FieldRef<"PatientLog", 'String'>;
    readonly name_of_caller: Prisma.FieldRef<"PatientLog", 'String'>;
    readonly bp: Prisma.FieldRef<"PatientLog", 'String'>;
    readonly pr: Prisma.FieldRef<"PatientLog", 'String'>;
    readonly spo2: Prisma.FieldRef<"PatientLog", 'String'>;
    readonly temp: Prisma.FieldRef<"PatientLog", 'String'>;
    readonly medical_assessment: Prisma.FieldRef<"PatientLog", 'String'>;
    readonly hospital_name: Prisma.FieldRef<"PatientLog", 'String'>;
    readonly hospital_representative: Prisma.FieldRef<"PatientLog", 'String'>;
    readonly hospital_in_time: Prisma.FieldRef<"PatientLog", 'DateTime'>;
    readonly hospital_out_time: Prisma.FieldRef<"PatientLog", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"PatientLog", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"PatientLog", 'DateTime'>;
}
/**
 * PatientLog findUnique
 */
export type PatientLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PatientLog to fetch.
     */
    where: Prisma.PatientLogWhereUniqueInput;
};
/**
 * PatientLog findUniqueOrThrow
 */
export type PatientLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PatientLog to fetch.
     */
    where: Prisma.PatientLogWhereUniqueInput;
};
/**
 * PatientLog findFirst
 */
export type PatientLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PatientLog to fetch.
     */
    where?: Prisma.PatientLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PatientLogs to fetch.
     */
    orderBy?: Prisma.PatientLogOrderByWithRelationInput | Prisma.PatientLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PatientLogs.
     */
    cursor?: Prisma.PatientLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PatientLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PatientLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PatientLogs.
     */
    distinct?: Prisma.PatientLogScalarFieldEnum | Prisma.PatientLogScalarFieldEnum[];
};
/**
 * PatientLog findFirstOrThrow
 */
export type PatientLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PatientLog to fetch.
     */
    where?: Prisma.PatientLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PatientLogs to fetch.
     */
    orderBy?: Prisma.PatientLogOrderByWithRelationInput | Prisma.PatientLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PatientLogs.
     */
    cursor?: Prisma.PatientLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PatientLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PatientLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PatientLogs.
     */
    distinct?: Prisma.PatientLogScalarFieldEnum | Prisma.PatientLogScalarFieldEnum[];
};
/**
 * PatientLog findMany
 */
export type PatientLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PatientLogs to fetch.
     */
    where?: Prisma.PatientLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PatientLogs to fetch.
     */
    orderBy?: Prisma.PatientLogOrderByWithRelationInput | Prisma.PatientLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing PatientLogs.
     */
    cursor?: Prisma.PatientLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PatientLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PatientLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PatientLogs.
     */
    distinct?: Prisma.PatientLogScalarFieldEnum | Prisma.PatientLogScalarFieldEnum[];
};
/**
 * PatientLog create
 */
export type PatientLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a PatientLog.
     */
    data: Prisma.XOR<Prisma.PatientLogCreateInput, Prisma.PatientLogUncheckedCreateInput>;
};
/**
 * PatientLog createMany
 */
export type PatientLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many PatientLogs.
     */
    data: Prisma.PatientLogCreateManyInput | Prisma.PatientLogCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * PatientLog createManyAndReturn
 */
export type PatientLogCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientLog
     */
    select?: Prisma.PatientLogSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientLog
     */
    omit?: Prisma.PatientLogOmit<ExtArgs> | null;
    /**
     * The data used to create many PatientLogs.
     */
    data: Prisma.PatientLogCreateManyInput | Prisma.PatientLogCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientLogIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * PatientLog update
 */
export type PatientLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a PatientLog.
     */
    data: Prisma.XOR<Prisma.PatientLogUpdateInput, Prisma.PatientLogUncheckedUpdateInput>;
    /**
     * Choose, which PatientLog to update.
     */
    where: Prisma.PatientLogWhereUniqueInput;
};
/**
 * PatientLog updateMany
 */
export type PatientLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update PatientLogs.
     */
    data: Prisma.XOR<Prisma.PatientLogUpdateManyMutationInput, Prisma.PatientLogUncheckedUpdateManyInput>;
    /**
     * Filter which PatientLogs to update
     */
    where?: Prisma.PatientLogWhereInput;
    /**
     * Limit how many PatientLogs to update.
     */
    limit?: number;
};
/**
 * PatientLog updateManyAndReturn
 */
export type PatientLogUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientLog
     */
    select?: Prisma.PatientLogSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientLog
     */
    omit?: Prisma.PatientLogOmit<ExtArgs> | null;
    /**
     * The data used to update PatientLogs.
     */
    data: Prisma.XOR<Prisma.PatientLogUpdateManyMutationInput, Prisma.PatientLogUncheckedUpdateManyInput>;
    /**
     * Filter which PatientLogs to update
     */
    where?: Prisma.PatientLogWhereInput;
    /**
     * Limit how many PatientLogs to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientLogIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * PatientLog upsert
 */
export type PatientLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the PatientLog to update in case it exists.
     */
    where: Prisma.PatientLogWhereUniqueInput;
    /**
     * In case the PatientLog found by the `where` argument doesn't exist, create a new PatientLog with this data.
     */
    create: Prisma.XOR<Prisma.PatientLogCreateInput, Prisma.PatientLogUncheckedCreateInput>;
    /**
     * In case the PatientLog was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.PatientLogUpdateInput, Prisma.PatientLogUncheckedUpdateInput>;
};
/**
 * PatientLog delete
 */
export type PatientLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which PatientLog to delete.
     */
    where: Prisma.PatientLogWhereUniqueInput;
};
/**
 * PatientLog deleteMany
 */
export type PatientLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PatientLogs to delete
     */
    where?: Prisma.PatientLogWhereInput;
    /**
     * Limit how many PatientLogs to delete.
     */
    limit?: number;
};
/**
 * PatientLog.responders
 */
export type PatientLog$respondersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.PatientResponderWhereInput;
    orderBy?: Prisma.PatientResponderOrderByWithRelationInput | Prisma.PatientResponderOrderByWithRelationInput[];
    cursor?: Prisma.PatientResponderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PatientResponderScalarFieldEnum | Prisma.PatientResponderScalarFieldEnum[];
};
/**
 * PatientLog.dispatches
 */
export type PatientLog$dispatchesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicularDispatch
     */
    select?: Prisma.VehicularDispatchSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VehicularDispatch
     */
    omit?: Prisma.VehicularDispatchOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VehicularDispatchInclude<ExtArgs> | null;
    where?: Prisma.VehicularDispatchWhereInput;
    orderBy?: Prisma.VehicularDispatchOrderByWithRelationInput | Prisma.VehicularDispatchOrderByWithRelationInput[];
    cursor?: Prisma.VehicularDispatchWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VehicularDispatchScalarFieldEnum | Prisma.VehicularDispatchScalarFieldEnum[];
};
/**
 * PatientLog without action
 */
export type PatientLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=PatientLog.d.ts.map