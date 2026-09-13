import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model VehicularDispatch
 *
 */
export type VehicularDispatchModel = runtime.Types.Result.DefaultSelection<Prisma.$VehicularDispatchPayload>;
export type AggregateVehicularDispatch = {
    _count: VehicularDispatchCountAggregateOutputType | null;
    _avg: VehicularDispatchAvgAggregateOutputType | null;
    _sum: VehicularDispatchSumAggregateOutputType | null;
    _min: VehicularDispatchMinAggregateOutputType | null;
    _max: VehicularDispatchMaxAggregateOutputType | null;
};
export type VehicularDispatchAvgAggregateOutputType = {
    odometer_in: number | null;
    odometer_out: number | null;
};
export type VehicularDispatchSumAggregateOutputType = {
    odometer_in: number | null;
    odometer_out: number | null;
};
export type VehicularDispatchMinAggregateOutputType = {
    dispatch_id: string | null;
    operation_id: string | null;
    patient_log_id: string | null;
    dispatch_date: Date | null;
    submitted_by: string | null;
    vehicle_id: string | null;
    driver_id: string | null;
    depart_time: Date | null;
    arrival_time: Date | null;
    brgy_in_time: Date | null;
    brgy_out_time: Date | null;
    dispatch_type: $Enums.DispatchType | null;
    from_location: string | null;
    to_location: string | null;
    odometer_in: number | null;
    odometer_out: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type VehicularDispatchMaxAggregateOutputType = {
    dispatch_id: string | null;
    operation_id: string | null;
    patient_log_id: string | null;
    dispatch_date: Date | null;
    submitted_by: string | null;
    vehicle_id: string | null;
    driver_id: string | null;
    depart_time: Date | null;
    arrival_time: Date | null;
    brgy_in_time: Date | null;
    brgy_out_time: Date | null;
    dispatch_type: $Enums.DispatchType | null;
    from_location: string | null;
    to_location: string | null;
    odometer_in: number | null;
    odometer_out: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type VehicularDispatchCountAggregateOutputType = {
    dispatch_id: number;
    operation_id: number;
    patient_log_id: number;
    dispatch_date: number;
    submitted_by: number;
    vehicle_id: number;
    driver_id: number;
    depart_time: number;
    arrival_time: number;
    brgy_in_time: number;
    brgy_out_time: number;
    dispatch_type: number;
    from_location: number;
    to_location: number;
    odometer_in: number;
    odometer_out: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type VehicularDispatchAvgAggregateInputType = {
    odometer_in?: true;
    odometer_out?: true;
};
export type VehicularDispatchSumAggregateInputType = {
    odometer_in?: true;
    odometer_out?: true;
};
export type VehicularDispatchMinAggregateInputType = {
    dispatch_id?: true;
    operation_id?: true;
    patient_log_id?: true;
    dispatch_date?: true;
    submitted_by?: true;
    vehicle_id?: true;
    driver_id?: true;
    depart_time?: true;
    arrival_time?: true;
    brgy_in_time?: true;
    brgy_out_time?: true;
    dispatch_type?: true;
    from_location?: true;
    to_location?: true;
    odometer_in?: true;
    odometer_out?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type VehicularDispatchMaxAggregateInputType = {
    dispatch_id?: true;
    operation_id?: true;
    patient_log_id?: true;
    dispatch_date?: true;
    submitted_by?: true;
    vehicle_id?: true;
    driver_id?: true;
    depart_time?: true;
    arrival_time?: true;
    brgy_in_time?: true;
    brgy_out_time?: true;
    dispatch_type?: true;
    from_location?: true;
    to_location?: true;
    odometer_in?: true;
    odometer_out?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type VehicularDispatchCountAggregateInputType = {
    dispatch_id?: true;
    operation_id?: true;
    patient_log_id?: true;
    dispatch_date?: true;
    submitted_by?: true;
    vehicle_id?: true;
    driver_id?: true;
    depart_time?: true;
    arrival_time?: true;
    brgy_in_time?: true;
    brgy_out_time?: true;
    dispatch_type?: true;
    from_location?: true;
    to_location?: true;
    odometer_in?: true;
    odometer_out?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type VehicularDispatchAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which VehicularDispatch to aggregate.
     */
    where?: Prisma.VehicularDispatchWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VehicularDispatches to fetch.
     */
    orderBy?: Prisma.VehicularDispatchOrderByWithRelationInput | Prisma.VehicularDispatchOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.VehicularDispatchWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VehicularDispatches from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VehicularDispatches.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned VehicularDispatches
    **/
    _count?: true | VehicularDispatchCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: VehicularDispatchAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: VehicularDispatchSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: VehicularDispatchMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: VehicularDispatchMaxAggregateInputType;
};
export type GetVehicularDispatchAggregateType<T extends VehicularDispatchAggregateArgs> = {
    [P in keyof T & keyof AggregateVehicularDispatch]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateVehicularDispatch[P]> : Prisma.GetScalarType<T[P], AggregateVehicularDispatch[P]>;
};
export type VehicularDispatchGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VehicularDispatchWhereInput;
    orderBy?: Prisma.VehicularDispatchOrderByWithAggregationInput | Prisma.VehicularDispatchOrderByWithAggregationInput[];
    by: Prisma.VehicularDispatchScalarFieldEnum[] | Prisma.VehicularDispatchScalarFieldEnum;
    having?: Prisma.VehicularDispatchScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: VehicularDispatchCountAggregateInputType | true;
    _avg?: VehicularDispatchAvgAggregateInputType;
    _sum?: VehicularDispatchSumAggregateInputType;
    _min?: VehicularDispatchMinAggregateInputType;
    _max?: VehicularDispatchMaxAggregateInputType;
};
export type VehicularDispatchGroupByOutputType = {
    dispatch_id: string;
    operation_id: string | null;
    patient_log_id: string | null;
    dispatch_date: Date;
    submitted_by: string;
    vehicle_id: string | null;
    driver_id: string | null;
    depart_time: Date | null;
    arrival_time: Date | null;
    brgy_in_time: Date | null;
    brgy_out_time: Date | null;
    dispatch_type: $Enums.DispatchType | null;
    from_location: string | null;
    to_location: string | null;
    odometer_in: number | null;
    odometer_out: number | null;
    createdAt: Date;
    updatedAt: Date;
    _count: VehicularDispatchCountAggregateOutputType | null;
    _avg: VehicularDispatchAvgAggregateOutputType | null;
    _sum: VehicularDispatchSumAggregateOutputType | null;
    _min: VehicularDispatchMinAggregateOutputType | null;
    _max: VehicularDispatchMaxAggregateOutputType | null;
};
export type GetVehicularDispatchGroupByPayload<T extends VehicularDispatchGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<VehicularDispatchGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof VehicularDispatchGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], VehicularDispatchGroupByOutputType[P]> : Prisma.GetScalarType<T[P], VehicularDispatchGroupByOutputType[P]>;
}>>;
export type VehicularDispatchWhereInput = {
    AND?: Prisma.VehicularDispatchWhereInput | Prisma.VehicularDispatchWhereInput[];
    OR?: Prisma.VehicularDispatchWhereInput[];
    NOT?: Prisma.VehicularDispatchWhereInput | Prisma.VehicularDispatchWhereInput[];
    dispatch_id?: Prisma.StringFilter<"VehicularDispatch"> | string;
    operation_id?: Prisma.StringNullableFilter<"VehicularDispatch"> | string | null;
    patient_log_id?: Prisma.StringNullableFilter<"VehicularDispatch"> | string | null;
    dispatch_date?: Prisma.DateTimeFilter<"VehicularDispatch"> | Date | string;
    submitted_by?: Prisma.StringFilter<"VehicularDispatch"> | string;
    vehicle_id?: Prisma.StringNullableFilter<"VehicularDispatch"> | string | null;
    driver_id?: Prisma.StringNullableFilter<"VehicularDispatch"> | string | null;
    depart_time?: Prisma.DateTimeNullableFilter<"VehicularDispatch"> | Date | string | null;
    arrival_time?: Prisma.DateTimeNullableFilter<"VehicularDispatch"> | Date | string | null;
    brgy_in_time?: Prisma.DateTimeNullableFilter<"VehicularDispatch"> | Date | string | null;
    brgy_out_time?: Prisma.DateTimeNullableFilter<"VehicularDispatch"> | Date | string | null;
    dispatch_type?: Prisma.EnumDispatchTypeNullableFilter<"VehicularDispatch"> | $Enums.DispatchType | null;
    from_location?: Prisma.StringNullableFilter<"VehicularDispatch"> | string | null;
    to_location?: Prisma.StringNullableFilter<"VehicularDispatch"> | string | null;
    odometer_in?: Prisma.IntNullableFilter<"VehicularDispatch"> | number | null;
    odometer_out?: Prisma.IntNullableFilter<"VehicularDispatch"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"VehicularDispatch"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"VehicularDispatch"> | Date | string;
    operation?: Prisma.XOR<Prisma.OperationLogNullableScalarRelationFilter, Prisma.OperationLogWhereInput> | null;
    patientLog?: Prisma.XOR<Prisma.PatientLogNullableScalarRelationFilter, Prisma.PatientLogWhereInput> | null;
    vehicle?: Prisma.XOR<Prisma.VehicleNullableScalarRelationFilter, Prisma.VehicleWhereInput> | null;
    driver?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    submitter?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    responders?: Prisma.VehicularDispatchResponderListRelationFilter;
    passengers?: Prisma.CivilianPassengerListRelationFilter;
};
export type VehicularDispatchOrderByWithRelationInput = {
    dispatch_id?: Prisma.SortOrder;
    operation_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    patient_log_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    dispatch_date?: Prisma.SortOrder;
    submitted_by?: Prisma.SortOrder;
    vehicle_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    driver_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    depart_time?: Prisma.SortOrderInput | Prisma.SortOrder;
    arrival_time?: Prisma.SortOrderInput | Prisma.SortOrder;
    brgy_in_time?: Prisma.SortOrderInput | Prisma.SortOrder;
    brgy_out_time?: Prisma.SortOrderInput | Prisma.SortOrder;
    dispatch_type?: Prisma.SortOrderInput | Prisma.SortOrder;
    from_location?: Prisma.SortOrderInput | Prisma.SortOrder;
    to_location?: Prisma.SortOrderInput | Prisma.SortOrder;
    odometer_in?: Prisma.SortOrderInput | Prisma.SortOrder;
    odometer_out?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    operation?: Prisma.OperationLogOrderByWithRelationInput;
    patientLog?: Prisma.PatientLogOrderByWithRelationInput;
    vehicle?: Prisma.VehicleOrderByWithRelationInput;
    driver?: Prisma.UserOrderByWithRelationInput;
    submitter?: Prisma.UserOrderByWithRelationInput;
    responders?: Prisma.VehicularDispatchResponderOrderByRelationAggregateInput;
    passengers?: Prisma.CivilianPassengerOrderByRelationAggregateInput;
};
export type VehicularDispatchWhereUniqueInput = Prisma.AtLeast<{
    dispatch_id?: string;
    AND?: Prisma.VehicularDispatchWhereInput | Prisma.VehicularDispatchWhereInput[];
    OR?: Prisma.VehicularDispatchWhereInput[];
    NOT?: Prisma.VehicularDispatchWhereInput | Prisma.VehicularDispatchWhereInput[];
    operation_id?: Prisma.StringNullableFilter<"VehicularDispatch"> | string | null;
    patient_log_id?: Prisma.StringNullableFilter<"VehicularDispatch"> | string | null;
    dispatch_date?: Prisma.DateTimeFilter<"VehicularDispatch"> | Date | string;
    submitted_by?: Prisma.StringFilter<"VehicularDispatch"> | string;
    vehicle_id?: Prisma.StringNullableFilter<"VehicularDispatch"> | string | null;
    driver_id?: Prisma.StringNullableFilter<"VehicularDispatch"> | string | null;
    depart_time?: Prisma.DateTimeNullableFilter<"VehicularDispatch"> | Date | string | null;
    arrival_time?: Prisma.DateTimeNullableFilter<"VehicularDispatch"> | Date | string | null;
    brgy_in_time?: Prisma.DateTimeNullableFilter<"VehicularDispatch"> | Date | string | null;
    brgy_out_time?: Prisma.DateTimeNullableFilter<"VehicularDispatch"> | Date | string | null;
    dispatch_type?: Prisma.EnumDispatchTypeNullableFilter<"VehicularDispatch"> | $Enums.DispatchType | null;
    from_location?: Prisma.StringNullableFilter<"VehicularDispatch"> | string | null;
    to_location?: Prisma.StringNullableFilter<"VehicularDispatch"> | string | null;
    odometer_in?: Prisma.IntNullableFilter<"VehicularDispatch"> | number | null;
    odometer_out?: Prisma.IntNullableFilter<"VehicularDispatch"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"VehicularDispatch"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"VehicularDispatch"> | Date | string;
    operation?: Prisma.XOR<Prisma.OperationLogNullableScalarRelationFilter, Prisma.OperationLogWhereInput> | null;
    patientLog?: Prisma.XOR<Prisma.PatientLogNullableScalarRelationFilter, Prisma.PatientLogWhereInput> | null;
    vehicle?: Prisma.XOR<Prisma.VehicleNullableScalarRelationFilter, Prisma.VehicleWhereInput> | null;
    driver?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    submitter?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    responders?: Prisma.VehicularDispatchResponderListRelationFilter;
    passengers?: Prisma.CivilianPassengerListRelationFilter;
}, "dispatch_id">;
export type VehicularDispatchOrderByWithAggregationInput = {
    dispatch_id?: Prisma.SortOrder;
    operation_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    patient_log_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    dispatch_date?: Prisma.SortOrder;
    submitted_by?: Prisma.SortOrder;
    vehicle_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    driver_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    depart_time?: Prisma.SortOrderInput | Prisma.SortOrder;
    arrival_time?: Prisma.SortOrderInput | Prisma.SortOrder;
    brgy_in_time?: Prisma.SortOrderInput | Prisma.SortOrder;
    brgy_out_time?: Prisma.SortOrderInput | Prisma.SortOrder;
    dispatch_type?: Prisma.SortOrderInput | Prisma.SortOrder;
    from_location?: Prisma.SortOrderInput | Prisma.SortOrder;
    to_location?: Prisma.SortOrderInput | Prisma.SortOrder;
    odometer_in?: Prisma.SortOrderInput | Prisma.SortOrder;
    odometer_out?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.VehicularDispatchCountOrderByAggregateInput;
    _avg?: Prisma.VehicularDispatchAvgOrderByAggregateInput;
    _max?: Prisma.VehicularDispatchMaxOrderByAggregateInput;
    _min?: Prisma.VehicularDispatchMinOrderByAggregateInput;
    _sum?: Prisma.VehicularDispatchSumOrderByAggregateInput;
};
export type VehicularDispatchScalarWhereWithAggregatesInput = {
    AND?: Prisma.VehicularDispatchScalarWhereWithAggregatesInput | Prisma.VehicularDispatchScalarWhereWithAggregatesInput[];
    OR?: Prisma.VehicularDispatchScalarWhereWithAggregatesInput[];
    NOT?: Prisma.VehicularDispatchScalarWhereWithAggregatesInput | Prisma.VehicularDispatchScalarWhereWithAggregatesInput[];
    dispatch_id?: Prisma.StringWithAggregatesFilter<"VehicularDispatch"> | string;
    operation_id?: Prisma.StringNullableWithAggregatesFilter<"VehicularDispatch"> | string | null;
    patient_log_id?: Prisma.StringNullableWithAggregatesFilter<"VehicularDispatch"> | string | null;
    dispatch_date?: Prisma.DateTimeWithAggregatesFilter<"VehicularDispatch"> | Date | string;
    submitted_by?: Prisma.StringWithAggregatesFilter<"VehicularDispatch"> | string;
    vehicle_id?: Prisma.StringNullableWithAggregatesFilter<"VehicularDispatch"> | string | null;
    driver_id?: Prisma.StringNullableWithAggregatesFilter<"VehicularDispatch"> | string | null;
    depart_time?: Prisma.DateTimeNullableWithAggregatesFilter<"VehicularDispatch"> | Date | string | null;
    arrival_time?: Prisma.DateTimeNullableWithAggregatesFilter<"VehicularDispatch"> | Date | string | null;
    brgy_in_time?: Prisma.DateTimeNullableWithAggregatesFilter<"VehicularDispatch"> | Date | string | null;
    brgy_out_time?: Prisma.DateTimeNullableWithAggregatesFilter<"VehicularDispatch"> | Date | string | null;
    dispatch_type?: Prisma.EnumDispatchTypeNullableWithAggregatesFilter<"VehicularDispatch"> | $Enums.DispatchType | null;
    from_location?: Prisma.StringNullableWithAggregatesFilter<"VehicularDispatch"> | string | null;
    to_location?: Prisma.StringNullableWithAggregatesFilter<"VehicularDispatch"> | string | null;
    odometer_in?: Prisma.IntNullableWithAggregatesFilter<"VehicularDispatch"> | number | null;
    odometer_out?: Prisma.IntNullableWithAggregatesFilter<"VehicularDispatch"> | number | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"VehicularDispatch"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"VehicularDispatch"> | Date | string;
};
export type VehicularDispatchCreateInput = {
    dispatch_id?: string;
    dispatch_date: Date | string;
    depart_time?: Date | string | null;
    arrival_time?: Date | string | null;
    brgy_in_time?: Date | string | null;
    brgy_out_time?: Date | string | null;
    dispatch_type?: $Enums.DispatchType | null;
    from_location?: string | null;
    to_location?: string | null;
    odometer_in?: number | null;
    odometer_out?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    operation?: Prisma.OperationLogCreateNestedOneWithoutDispatchesInput;
    patientLog?: Prisma.PatientLogCreateNestedOneWithoutDispatchesInput;
    vehicle?: Prisma.VehicleCreateNestedOneWithoutDispatchesInput;
    driver?: Prisma.UserCreateNestedOneWithoutDrivenDispatchesInput;
    submitter: Prisma.UserCreateNestedOneWithoutSubmittedDispatchesInput;
    responders?: Prisma.VehicularDispatchResponderCreateNestedManyWithoutDispatchInput;
    passengers?: Prisma.CivilianPassengerCreateNestedManyWithoutDispatchInput;
};
export type VehicularDispatchUncheckedCreateInput = {
    dispatch_id?: string;
    operation_id?: string | null;
    patient_log_id?: string | null;
    dispatch_date: Date | string;
    submitted_by: string;
    vehicle_id?: string | null;
    driver_id?: string | null;
    depart_time?: Date | string | null;
    arrival_time?: Date | string | null;
    brgy_in_time?: Date | string | null;
    brgy_out_time?: Date | string | null;
    dispatch_type?: $Enums.DispatchType | null;
    from_location?: string | null;
    to_location?: string | null;
    odometer_in?: number | null;
    odometer_out?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    responders?: Prisma.VehicularDispatchResponderUncheckedCreateNestedManyWithoutDispatchInput;
    passengers?: Prisma.CivilianPassengerUncheckedCreateNestedManyWithoutDispatchInput;
};
export type VehicularDispatchUpdateInput = {
    dispatch_id?: Prisma.StringFieldUpdateOperationsInput | string;
    dispatch_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    depart_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    arrival_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dispatch_type?: Prisma.NullableEnumDispatchTypeFieldUpdateOperationsInput | $Enums.DispatchType | null;
    from_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    odometer_in?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    odometer_out?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    operation?: Prisma.OperationLogUpdateOneWithoutDispatchesNestedInput;
    patientLog?: Prisma.PatientLogUpdateOneWithoutDispatchesNestedInput;
    vehicle?: Prisma.VehicleUpdateOneWithoutDispatchesNestedInput;
    driver?: Prisma.UserUpdateOneWithoutDrivenDispatchesNestedInput;
    submitter?: Prisma.UserUpdateOneRequiredWithoutSubmittedDispatchesNestedInput;
    responders?: Prisma.VehicularDispatchResponderUpdateManyWithoutDispatchNestedInput;
    passengers?: Prisma.CivilianPassengerUpdateManyWithoutDispatchNestedInput;
};
export type VehicularDispatchUncheckedUpdateInput = {
    dispatch_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patient_log_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dispatch_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submitted_by?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicle_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    driver_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    depart_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    arrival_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dispatch_type?: Prisma.NullableEnumDispatchTypeFieldUpdateOperationsInput | $Enums.DispatchType | null;
    from_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    odometer_in?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    odometer_out?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    responders?: Prisma.VehicularDispatchResponderUncheckedUpdateManyWithoutDispatchNestedInput;
    passengers?: Prisma.CivilianPassengerUncheckedUpdateManyWithoutDispatchNestedInput;
};
export type VehicularDispatchCreateManyInput = {
    dispatch_id?: string;
    operation_id?: string | null;
    patient_log_id?: string | null;
    dispatch_date: Date | string;
    submitted_by: string;
    vehicle_id?: string | null;
    driver_id?: string | null;
    depart_time?: Date | string | null;
    arrival_time?: Date | string | null;
    brgy_in_time?: Date | string | null;
    brgy_out_time?: Date | string | null;
    dispatch_type?: $Enums.DispatchType | null;
    from_location?: string | null;
    to_location?: string | null;
    odometer_in?: number | null;
    odometer_out?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type VehicularDispatchUpdateManyMutationInput = {
    dispatch_id?: Prisma.StringFieldUpdateOperationsInput | string;
    dispatch_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    depart_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    arrival_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dispatch_type?: Prisma.NullableEnumDispatchTypeFieldUpdateOperationsInput | $Enums.DispatchType | null;
    from_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    odometer_in?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    odometer_out?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VehicularDispatchUncheckedUpdateManyInput = {
    dispatch_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patient_log_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dispatch_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submitted_by?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicle_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    driver_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    depart_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    arrival_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dispatch_type?: Prisma.NullableEnumDispatchTypeFieldUpdateOperationsInput | $Enums.DispatchType | null;
    from_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    odometer_in?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    odometer_out?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VehicularDispatchListRelationFilter = {
    every?: Prisma.VehicularDispatchWhereInput;
    some?: Prisma.VehicularDispatchWhereInput;
    none?: Prisma.VehicularDispatchWhereInput;
};
export type VehicularDispatchOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type VehicularDispatchCountOrderByAggregateInput = {
    dispatch_id?: Prisma.SortOrder;
    operation_id?: Prisma.SortOrder;
    patient_log_id?: Prisma.SortOrder;
    dispatch_date?: Prisma.SortOrder;
    submitted_by?: Prisma.SortOrder;
    vehicle_id?: Prisma.SortOrder;
    driver_id?: Prisma.SortOrder;
    depart_time?: Prisma.SortOrder;
    arrival_time?: Prisma.SortOrder;
    brgy_in_time?: Prisma.SortOrder;
    brgy_out_time?: Prisma.SortOrder;
    dispatch_type?: Prisma.SortOrder;
    from_location?: Prisma.SortOrder;
    to_location?: Prisma.SortOrder;
    odometer_in?: Prisma.SortOrder;
    odometer_out?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type VehicularDispatchAvgOrderByAggregateInput = {
    odometer_in?: Prisma.SortOrder;
    odometer_out?: Prisma.SortOrder;
};
export type VehicularDispatchMaxOrderByAggregateInput = {
    dispatch_id?: Prisma.SortOrder;
    operation_id?: Prisma.SortOrder;
    patient_log_id?: Prisma.SortOrder;
    dispatch_date?: Prisma.SortOrder;
    submitted_by?: Prisma.SortOrder;
    vehicle_id?: Prisma.SortOrder;
    driver_id?: Prisma.SortOrder;
    depart_time?: Prisma.SortOrder;
    arrival_time?: Prisma.SortOrder;
    brgy_in_time?: Prisma.SortOrder;
    brgy_out_time?: Prisma.SortOrder;
    dispatch_type?: Prisma.SortOrder;
    from_location?: Prisma.SortOrder;
    to_location?: Prisma.SortOrder;
    odometer_in?: Prisma.SortOrder;
    odometer_out?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type VehicularDispatchMinOrderByAggregateInput = {
    dispatch_id?: Prisma.SortOrder;
    operation_id?: Prisma.SortOrder;
    patient_log_id?: Prisma.SortOrder;
    dispatch_date?: Prisma.SortOrder;
    submitted_by?: Prisma.SortOrder;
    vehicle_id?: Prisma.SortOrder;
    driver_id?: Prisma.SortOrder;
    depart_time?: Prisma.SortOrder;
    arrival_time?: Prisma.SortOrder;
    brgy_in_time?: Prisma.SortOrder;
    brgy_out_time?: Prisma.SortOrder;
    dispatch_type?: Prisma.SortOrder;
    from_location?: Prisma.SortOrder;
    to_location?: Prisma.SortOrder;
    odometer_in?: Prisma.SortOrder;
    odometer_out?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type VehicularDispatchSumOrderByAggregateInput = {
    odometer_in?: Prisma.SortOrder;
    odometer_out?: Prisma.SortOrder;
};
export type VehicularDispatchScalarRelationFilter = {
    is?: Prisma.VehicularDispatchWhereInput;
    isNot?: Prisma.VehicularDispatchWhereInput;
};
export type VehicularDispatchCreateNestedManyWithoutDriverInput = {
    create?: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutDriverInput, Prisma.VehicularDispatchUncheckedCreateWithoutDriverInput> | Prisma.VehicularDispatchCreateWithoutDriverInput[] | Prisma.VehicularDispatchUncheckedCreateWithoutDriverInput[];
    connectOrCreate?: Prisma.VehicularDispatchCreateOrConnectWithoutDriverInput | Prisma.VehicularDispatchCreateOrConnectWithoutDriverInput[];
    createMany?: Prisma.VehicularDispatchCreateManyDriverInputEnvelope;
    connect?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
};
export type VehicularDispatchCreateNestedManyWithoutSubmitterInput = {
    create?: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutSubmitterInput, Prisma.VehicularDispatchUncheckedCreateWithoutSubmitterInput> | Prisma.VehicularDispatchCreateWithoutSubmitterInput[] | Prisma.VehicularDispatchUncheckedCreateWithoutSubmitterInput[];
    connectOrCreate?: Prisma.VehicularDispatchCreateOrConnectWithoutSubmitterInput | Prisma.VehicularDispatchCreateOrConnectWithoutSubmitterInput[];
    createMany?: Prisma.VehicularDispatchCreateManySubmitterInputEnvelope;
    connect?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
};
export type VehicularDispatchUncheckedCreateNestedManyWithoutDriverInput = {
    create?: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutDriverInput, Prisma.VehicularDispatchUncheckedCreateWithoutDriverInput> | Prisma.VehicularDispatchCreateWithoutDriverInput[] | Prisma.VehicularDispatchUncheckedCreateWithoutDriverInput[];
    connectOrCreate?: Prisma.VehicularDispatchCreateOrConnectWithoutDriverInput | Prisma.VehicularDispatchCreateOrConnectWithoutDriverInput[];
    createMany?: Prisma.VehicularDispatchCreateManyDriverInputEnvelope;
    connect?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
};
export type VehicularDispatchUncheckedCreateNestedManyWithoutSubmitterInput = {
    create?: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutSubmitterInput, Prisma.VehicularDispatchUncheckedCreateWithoutSubmitterInput> | Prisma.VehicularDispatchCreateWithoutSubmitterInput[] | Prisma.VehicularDispatchUncheckedCreateWithoutSubmitterInput[];
    connectOrCreate?: Prisma.VehicularDispatchCreateOrConnectWithoutSubmitterInput | Prisma.VehicularDispatchCreateOrConnectWithoutSubmitterInput[];
    createMany?: Prisma.VehicularDispatchCreateManySubmitterInputEnvelope;
    connect?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
};
export type VehicularDispatchUpdateManyWithoutDriverNestedInput = {
    create?: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutDriverInput, Prisma.VehicularDispatchUncheckedCreateWithoutDriverInput> | Prisma.VehicularDispatchCreateWithoutDriverInput[] | Prisma.VehicularDispatchUncheckedCreateWithoutDriverInput[];
    connectOrCreate?: Prisma.VehicularDispatchCreateOrConnectWithoutDriverInput | Prisma.VehicularDispatchCreateOrConnectWithoutDriverInput[];
    upsert?: Prisma.VehicularDispatchUpsertWithWhereUniqueWithoutDriverInput | Prisma.VehicularDispatchUpsertWithWhereUniqueWithoutDriverInput[];
    createMany?: Prisma.VehicularDispatchCreateManyDriverInputEnvelope;
    set?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    disconnect?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    delete?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    connect?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    update?: Prisma.VehicularDispatchUpdateWithWhereUniqueWithoutDriverInput | Prisma.VehicularDispatchUpdateWithWhereUniqueWithoutDriverInput[];
    updateMany?: Prisma.VehicularDispatchUpdateManyWithWhereWithoutDriverInput | Prisma.VehicularDispatchUpdateManyWithWhereWithoutDriverInput[];
    deleteMany?: Prisma.VehicularDispatchScalarWhereInput | Prisma.VehicularDispatchScalarWhereInput[];
};
export type VehicularDispatchUpdateManyWithoutSubmitterNestedInput = {
    create?: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutSubmitterInput, Prisma.VehicularDispatchUncheckedCreateWithoutSubmitterInput> | Prisma.VehicularDispatchCreateWithoutSubmitterInput[] | Prisma.VehicularDispatchUncheckedCreateWithoutSubmitterInput[];
    connectOrCreate?: Prisma.VehicularDispatchCreateOrConnectWithoutSubmitterInput | Prisma.VehicularDispatchCreateOrConnectWithoutSubmitterInput[];
    upsert?: Prisma.VehicularDispatchUpsertWithWhereUniqueWithoutSubmitterInput | Prisma.VehicularDispatchUpsertWithWhereUniqueWithoutSubmitterInput[];
    createMany?: Prisma.VehicularDispatchCreateManySubmitterInputEnvelope;
    set?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    disconnect?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    delete?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    connect?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    update?: Prisma.VehicularDispatchUpdateWithWhereUniqueWithoutSubmitterInput | Prisma.VehicularDispatchUpdateWithWhereUniqueWithoutSubmitterInput[];
    updateMany?: Prisma.VehicularDispatchUpdateManyWithWhereWithoutSubmitterInput | Prisma.VehicularDispatchUpdateManyWithWhereWithoutSubmitterInput[];
    deleteMany?: Prisma.VehicularDispatchScalarWhereInput | Prisma.VehicularDispatchScalarWhereInput[];
};
export type VehicularDispatchUncheckedUpdateManyWithoutDriverNestedInput = {
    create?: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutDriverInput, Prisma.VehicularDispatchUncheckedCreateWithoutDriverInput> | Prisma.VehicularDispatchCreateWithoutDriverInput[] | Prisma.VehicularDispatchUncheckedCreateWithoutDriverInput[];
    connectOrCreate?: Prisma.VehicularDispatchCreateOrConnectWithoutDriverInput | Prisma.VehicularDispatchCreateOrConnectWithoutDriverInput[];
    upsert?: Prisma.VehicularDispatchUpsertWithWhereUniqueWithoutDriverInput | Prisma.VehicularDispatchUpsertWithWhereUniqueWithoutDriverInput[];
    createMany?: Prisma.VehicularDispatchCreateManyDriverInputEnvelope;
    set?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    disconnect?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    delete?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    connect?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    update?: Prisma.VehicularDispatchUpdateWithWhereUniqueWithoutDriverInput | Prisma.VehicularDispatchUpdateWithWhereUniqueWithoutDriverInput[];
    updateMany?: Prisma.VehicularDispatchUpdateManyWithWhereWithoutDriverInput | Prisma.VehicularDispatchUpdateManyWithWhereWithoutDriverInput[];
    deleteMany?: Prisma.VehicularDispatchScalarWhereInput | Prisma.VehicularDispatchScalarWhereInput[];
};
export type VehicularDispatchUncheckedUpdateManyWithoutSubmitterNestedInput = {
    create?: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutSubmitterInput, Prisma.VehicularDispatchUncheckedCreateWithoutSubmitterInput> | Prisma.VehicularDispatchCreateWithoutSubmitterInput[] | Prisma.VehicularDispatchUncheckedCreateWithoutSubmitterInput[];
    connectOrCreate?: Prisma.VehicularDispatchCreateOrConnectWithoutSubmitterInput | Prisma.VehicularDispatchCreateOrConnectWithoutSubmitterInput[];
    upsert?: Prisma.VehicularDispatchUpsertWithWhereUniqueWithoutSubmitterInput | Prisma.VehicularDispatchUpsertWithWhereUniqueWithoutSubmitterInput[];
    createMany?: Prisma.VehicularDispatchCreateManySubmitterInputEnvelope;
    set?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    disconnect?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    delete?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    connect?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    update?: Prisma.VehicularDispatchUpdateWithWhereUniqueWithoutSubmitterInput | Prisma.VehicularDispatchUpdateWithWhereUniqueWithoutSubmitterInput[];
    updateMany?: Prisma.VehicularDispatchUpdateManyWithWhereWithoutSubmitterInput | Prisma.VehicularDispatchUpdateManyWithWhereWithoutSubmitterInput[];
    deleteMany?: Prisma.VehicularDispatchScalarWhereInput | Prisma.VehicularDispatchScalarWhereInput[];
};
export type VehicularDispatchCreateNestedManyWithoutOperationInput = {
    create?: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutOperationInput, Prisma.VehicularDispatchUncheckedCreateWithoutOperationInput> | Prisma.VehicularDispatchCreateWithoutOperationInput[] | Prisma.VehicularDispatchUncheckedCreateWithoutOperationInput[];
    connectOrCreate?: Prisma.VehicularDispatchCreateOrConnectWithoutOperationInput | Prisma.VehicularDispatchCreateOrConnectWithoutOperationInput[];
    createMany?: Prisma.VehicularDispatchCreateManyOperationInputEnvelope;
    connect?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
};
export type VehicularDispatchUncheckedCreateNestedManyWithoutOperationInput = {
    create?: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutOperationInput, Prisma.VehicularDispatchUncheckedCreateWithoutOperationInput> | Prisma.VehicularDispatchCreateWithoutOperationInput[] | Prisma.VehicularDispatchUncheckedCreateWithoutOperationInput[];
    connectOrCreate?: Prisma.VehicularDispatchCreateOrConnectWithoutOperationInput | Prisma.VehicularDispatchCreateOrConnectWithoutOperationInput[];
    createMany?: Prisma.VehicularDispatchCreateManyOperationInputEnvelope;
    connect?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
};
export type VehicularDispatchUpdateManyWithoutOperationNestedInput = {
    create?: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutOperationInput, Prisma.VehicularDispatchUncheckedCreateWithoutOperationInput> | Prisma.VehicularDispatchCreateWithoutOperationInput[] | Prisma.VehicularDispatchUncheckedCreateWithoutOperationInput[];
    connectOrCreate?: Prisma.VehicularDispatchCreateOrConnectWithoutOperationInput | Prisma.VehicularDispatchCreateOrConnectWithoutOperationInput[];
    upsert?: Prisma.VehicularDispatchUpsertWithWhereUniqueWithoutOperationInput | Prisma.VehicularDispatchUpsertWithWhereUniqueWithoutOperationInput[];
    createMany?: Prisma.VehicularDispatchCreateManyOperationInputEnvelope;
    set?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    disconnect?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    delete?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    connect?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    update?: Prisma.VehicularDispatchUpdateWithWhereUniqueWithoutOperationInput | Prisma.VehicularDispatchUpdateWithWhereUniqueWithoutOperationInput[];
    updateMany?: Prisma.VehicularDispatchUpdateManyWithWhereWithoutOperationInput | Prisma.VehicularDispatchUpdateManyWithWhereWithoutOperationInput[];
    deleteMany?: Prisma.VehicularDispatchScalarWhereInput | Prisma.VehicularDispatchScalarWhereInput[];
};
export type VehicularDispatchUncheckedUpdateManyWithoutOperationNestedInput = {
    create?: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutOperationInput, Prisma.VehicularDispatchUncheckedCreateWithoutOperationInput> | Prisma.VehicularDispatchCreateWithoutOperationInput[] | Prisma.VehicularDispatchUncheckedCreateWithoutOperationInput[];
    connectOrCreate?: Prisma.VehicularDispatchCreateOrConnectWithoutOperationInput | Prisma.VehicularDispatchCreateOrConnectWithoutOperationInput[];
    upsert?: Prisma.VehicularDispatchUpsertWithWhereUniqueWithoutOperationInput | Prisma.VehicularDispatchUpsertWithWhereUniqueWithoutOperationInput[];
    createMany?: Prisma.VehicularDispatchCreateManyOperationInputEnvelope;
    set?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    disconnect?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    delete?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    connect?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    update?: Prisma.VehicularDispatchUpdateWithWhereUniqueWithoutOperationInput | Prisma.VehicularDispatchUpdateWithWhereUniqueWithoutOperationInput[];
    updateMany?: Prisma.VehicularDispatchUpdateManyWithWhereWithoutOperationInput | Prisma.VehicularDispatchUpdateManyWithWhereWithoutOperationInput[];
    deleteMany?: Prisma.VehicularDispatchScalarWhereInput | Prisma.VehicularDispatchScalarWhereInput[];
};
export type VehicularDispatchCreateNestedManyWithoutVehicleInput = {
    create?: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutVehicleInput, Prisma.VehicularDispatchUncheckedCreateWithoutVehicleInput> | Prisma.VehicularDispatchCreateWithoutVehicleInput[] | Prisma.VehicularDispatchUncheckedCreateWithoutVehicleInput[];
    connectOrCreate?: Prisma.VehicularDispatchCreateOrConnectWithoutVehicleInput | Prisma.VehicularDispatchCreateOrConnectWithoutVehicleInput[];
    createMany?: Prisma.VehicularDispatchCreateManyVehicleInputEnvelope;
    connect?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
};
export type VehicularDispatchUncheckedCreateNestedManyWithoutVehicleInput = {
    create?: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutVehicleInput, Prisma.VehicularDispatchUncheckedCreateWithoutVehicleInput> | Prisma.VehicularDispatchCreateWithoutVehicleInput[] | Prisma.VehicularDispatchUncheckedCreateWithoutVehicleInput[];
    connectOrCreate?: Prisma.VehicularDispatchCreateOrConnectWithoutVehicleInput | Prisma.VehicularDispatchCreateOrConnectWithoutVehicleInput[];
    createMany?: Prisma.VehicularDispatchCreateManyVehicleInputEnvelope;
    connect?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
};
export type VehicularDispatchUpdateManyWithoutVehicleNestedInput = {
    create?: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutVehicleInput, Prisma.VehicularDispatchUncheckedCreateWithoutVehicleInput> | Prisma.VehicularDispatchCreateWithoutVehicleInput[] | Prisma.VehicularDispatchUncheckedCreateWithoutVehicleInput[];
    connectOrCreate?: Prisma.VehicularDispatchCreateOrConnectWithoutVehicleInput | Prisma.VehicularDispatchCreateOrConnectWithoutVehicleInput[];
    upsert?: Prisma.VehicularDispatchUpsertWithWhereUniqueWithoutVehicleInput | Prisma.VehicularDispatchUpsertWithWhereUniqueWithoutVehicleInput[];
    createMany?: Prisma.VehicularDispatchCreateManyVehicleInputEnvelope;
    set?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    disconnect?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    delete?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    connect?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    update?: Prisma.VehicularDispatchUpdateWithWhereUniqueWithoutVehicleInput | Prisma.VehicularDispatchUpdateWithWhereUniqueWithoutVehicleInput[];
    updateMany?: Prisma.VehicularDispatchUpdateManyWithWhereWithoutVehicleInput | Prisma.VehicularDispatchUpdateManyWithWhereWithoutVehicleInput[];
    deleteMany?: Prisma.VehicularDispatchScalarWhereInput | Prisma.VehicularDispatchScalarWhereInput[];
};
export type VehicularDispatchUncheckedUpdateManyWithoutVehicleNestedInput = {
    create?: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutVehicleInput, Prisma.VehicularDispatchUncheckedCreateWithoutVehicleInput> | Prisma.VehicularDispatchCreateWithoutVehicleInput[] | Prisma.VehicularDispatchUncheckedCreateWithoutVehicleInput[];
    connectOrCreate?: Prisma.VehicularDispatchCreateOrConnectWithoutVehicleInput | Prisma.VehicularDispatchCreateOrConnectWithoutVehicleInput[];
    upsert?: Prisma.VehicularDispatchUpsertWithWhereUniqueWithoutVehicleInput | Prisma.VehicularDispatchUpsertWithWhereUniqueWithoutVehicleInput[];
    createMany?: Prisma.VehicularDispatchCreateManyVehicleInputEnvelope;
    set?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    disconnect?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    delete?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    connect?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    update?: Prisma.VehicularDispatchUpdateWithWhereUniqueWithoutVehicleInput | Prisma.VehicularDispatchUpdateWithWhereUniqueWithoutVehicleInput[];
    updateMany?: Prisma.VehicularDispatchUpdateManyWithWhereWithoutVehicleInput | Prisma.VehicularDispatchUpdateManyWithWhereWithoutVehicleInput[];
    deleteMany?: Prisma.VehicularDispatchScalarWhereInput | Prisma.VehicularDispatchScalarWhereInput[];
};
export type VehicularDispatchCreateNestedManyWithoutPatientLogInput = {
    create?: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutPatientLogInput, Prisma.VehicularDispatchUncheckedCreateWithoutPatientLogInput> | Prisma.VehicularDispatchCreateWithoutPatientLogInput[] | Prisma.VehicularDispatchUncheckedCreateWithoutPatientLogInput[];
    connectOrCreate?: Prisma.VehicularDispatchCreateOrConnectWithoutPatientLogInput | Prisma.VehicularDispatchCreateOrConnectWithoutPatientLogInput[];
    createMany?: Prisma.VehicularDispatchCreateManyPatientLogInputEnvelope;
    connect?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
};
export type VehicularDispatchUncheckedCreateNestedManyWithoutPatientLogInput = {
    create?: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutPatientLogInput, Prisma.VehicularDispatchUncheckedCreateWithoutPatientLogInput> | Prisma.VehicularDispatchCreateWithoutPatientLogInput[] | Prisma.VehicularDispatchUncheckedCreateWithoutPatientLogInput[];
    connectOrCreate?: Prisma.VehicularDispatchCreateOrConnectWithoutPatientLogInput | Prisma.VehicularDispatchCreateOrConnectWithoutPatientLogInput[];
    createMany?: Prisma.VehicularDispatchCreateManyPatientLogInputEnvelope;
    connect?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
};
export type VehicularDispatchUpdateManyWithoutPatientLogNestedInput = {
    create?: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutPatientLogInput, Prisma.VehicularDispatchUncheckedCreateWithoutPatientLogInput> | Prisma.VehicularDispatchCreateWithoutPatientLogInput[] | Prisma.VehicularDispatchUncheckedCreateWithoutPatientLogInput[];
    connectOrCreate?: Prisma.VehicularDispatchCreateOrConnectWithoutPatientLogInput | Prisma.VehicularDispatchCreateOrConnectWithoutPatientLogInput[];
    upsert?: Prisma.VehicularDispatchUpsertWithWhereUniqueWithoutPatientLogInput | Prisma.VehicularDispatchUpsertWithWhereUniqueWithoutPatientLogInput[];
    createMany?: Prisma.VehicularDispatchCreateManyPatientLogInputEnvelope;
    set?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    disconnect?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    delete?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    connect?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    update?: Prisma.VehicularDispatchUpdateWithWhereUniqueWithoutPatientLogInput | Prisma.VehicularDispatchUpdateWithWhereUniqueWithoutPatientLogInput[];
    updateMany?: Prisma.VehicularDispatchUpdateManyWithWhereWithoutPatientLogInput | Prisma.VehicularDispatchUpdateManyWithWhereWithoutPatientLogInput[];
    deleteMany?: Prisma.VehicularDispatchScalarWhereInput | Prisma.VehicularDispatchScalarWhereInput[];
};
export type VehicularDispatchUncheckedUpdateManyWithoutPatientLogNestedInput = {
    create?: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutPatientLogInput, Prisma.VehicularDispatchUncheckedCreateWithoutPatientLogInput> | Prisma.VehicularDispatchCreateWithoutPatientLogInput[] | Prisma.VehicularDispatchUncheckedCreateWithoutPatientLogInput[];
    connectOrCreate?: Prisma.VehicularDispatchCreateOrConnectWithoutPatientLogInput | Prisma.VehicularDispatchCreateOrConnectWithoutPatientLogInput[];
    upsert?: Prisma.VehicularDispatchUpsertWithWhereUniqueWithoutPatientLogInput | Prisma.VehicularDispatchUpsertWithWhereUniqueWithoutPatientLogInput[];
    createMany?: Prisma.VehicularDispatchCreateManyPatientLogInputEnvelope;
    set?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    disconnect?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    delete?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    connect?: Prisma.VehicularDispatchWhereUniqueInput | Prisma.VehicularDispatchWhereUniqueInput[];
    update?: Prisma.VehicularDispatchUpdateWithWhereUniqueWithoutPatientLogInput | Prisma.VehicularDispatchUpdateWithWhereUniqueWithoutPatientLogInput[];
    updateMany?: Prisma.VehicularDispatchUpdateManyWithWhereWithoutPatientLogInput | Prisma.VehicularDispatchUpdateManyWithWhereWithoutPatientLogInput[];
    deleteMany?: Prisma.VehicularDispatchScalarWhereInput | Prisma.VehicularDispatchScalarWhereInput[];
};
export type NullableEnumDispatchTypeFieldUpdateOperationsInput = {
    set?: $Enums.DispatchType | null;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type VehicularDispatchCreateNestedOneWithoutRespondersInput = {
    create?: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutRespondersInput, Prisma.VehicularDispatchUncheckedCreateWithoutRespondersInput>;
    connectOrCreate?: Prisma.VehicularDispatchCreateOrConnectWithoutRespondersInput;
    connect?: Prisma.VehicularDispatchWhereUniqueInput;
};
export type VehicularDispatchUpdateOneRequiredWithoutRespondersNestedInput = {
    create?: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutRespondersInput, Prisma.VehicularDispatchUncheckedCreateWithoutRespondersInput>;
    connectOrCreate?: Prisma.VehicularDispatchCreateOrConnectWithoutRespondersInput;
    upsert?: Prisma.VehicularDispatchUpsertWithoutRespondersInput;
    connect?: Prisma.VehicularDispatchWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.VehicularDispatchUpdateToOneWithWhereWithoutRespondersInput, Prisma.VehicularDispatchUpdateWithoutRespondersInput>, Prisma.VehicularDispatchUncheckedUpdateWithoutRespondersInput>;
};
export type VehicularDispatchCreateNestedOneWithoutPassengersInput = {
    create?: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutPassengersInput, Prisma.VehicularDispatchUncheckedCreateWithoutPassengersInput>;
    connectOrCreate?: Prisma.VehicularDispatchCreateOrConnectWithoutPassengersInput;
    connect?: Prisma.VehicularDispatchWhereUniqueInput;
};
export type VehicularDispatchUpdateOneRequiredWithoutPassengersNestedInput = {
    create?: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutPassengersInput, Prisma.VehicularDispatchUncheckedCreateWithoutPassengersInput>;
    connectOrCreate?: Prisma.VehicularDispatchCreateOrConnectWithoutPassengersInput;
    upsert?: Prisma.VehicularDispatchUpsertWithoutPassengersInput;
    connect?: Prisma.VehicularDispatchWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.VehicularDispatchUpdateToOneWithWhereWithoutPassengersInput, Prisma.VehicularDispatchUpdateWithoutPassengersInput>, Prisma.VehicularDispatchUncheckedUpdateWithoutPassengersInput>;
};
export type VehicularDispatchCreateWithoutDriverInput = {
    dispatch_id?: string;
    dispatch_date: Date | string;
    depart_time?: Date | string | null;
    arrival_time?: Date | string | null;
    brgy_in_time?: Date | string | null;
    brgy_out_time?: Date | string | null;
    dispatch_type?: $Enums.DispatchType | null;
    from_location?: string | null;
    to_location?: string | null;
    odometer_in?: number | null;
    odometer_out?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    operation?: Prisma.OperationLogCreateNestedOneWithoutDispatchesInput;
    patientLog?: Prisma.PatientLogCreateNestedOneWithoutDispatchesInput;
    vehicle?: Prisma.VehicleCreateNestedOneWithoutDispatchesInput;
    submitter: Prisma.UserCreateNestedOneWithoutSubmittedDispatchesInput;
    responders?: Prisma.VehicularDispatchResponderCreateNestedManyWithoutDispatchInput;
    passengers?: Prisma.CivilianPassengerCreateNestedManyWithoutDispatchInput;
};
export type VehicularDispatchUncheckedCreateWithoutDriverInput = {
    dispatch_id?: string;
    operation_id?: string | null;
    patient_log_id?: string | null;
    dispatch_date: Date | string;
    submitted_by: string;
    vehicle_id?: string | null;
    depart_time?: Date | string | null;
    arrival_time?: Date | string | null;
    brgy_in_time?: Date | string | null;
    brgy_out_time?: Date | string | null;
    dispatch_type?: $Enums.DispatchType | null;
    from_location?: string | null;
    to_location?: string | null;
    odometer_in?: number | null;
    odometer_out?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    responders?: Prisma.VehicularDispatchResponderUncheckedCreateNestedManyWithoutDispatchInput;
    passengers?: Prisma.CivilianPassengerUncheckedCreateNestedManyWithoutDispatchInput;
};
export type VehicularDispatchCreateOrConnectWithoutDriverInput = {
    where: Prisma.VehicularDispatchWhereUniqueInput;
    create: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutDriverInput, Prisma.VehicularDispatchUncheckedCreateWithoutDriverInput>;
};
export type VehicularDispatchCreateManyDriverInputEnvelope = {
    data: Prisma.VehicularDispatchCreateManyDriverInput | Prisma.VehicularDispatchCreateManyDriverInput[];
    skipDuplicates?: boolean;
};
export type VehicularDispatchCreateWithoutSubmitterInput = {
    dispatch_id?: string;
    dispatch_date: Date | string;
    depart_time?: Date | string | null;
    arrival_time?: Date | string | null;
    brgy_in_time?: Date | string | null;
    brgy_out_time?: Date | string | null;
    dispatch_type?: $Enums.DispatchType | null;
    from_location?: string | null;
    to_location?: string | null;
    odometer_in?: number | null;
    odometer_out?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    operation?: Prisma.OperationLogCreateNestedOneWithoutDispatchesInput;
    patientLog?: Prisma.PatientLogCreateNestedOneWithoutDispatchesInput;
    vehicle?: Prisma.VehicleCreateNestedOneWithoutDispatchesInput;
    driver?: Prisma.UserCreateNestedOneWithoutDrivenDispatchesInput;
    responders?: Prisma.VehicularDispatchResponderCreateNestedManyWithoutDispatchInput;
    passengers?: Prisma.CivilianPassengerCreateNestedManyWithoutDispatchInput;
};
export type VehicularDispatchUncheckedCreateWithoutSubmitterInput = {
    dispatch_id?: string;
    operation_id?: string | null;
    patient_log_id?: string | null;
    dispatch_date: Date | string;
    vehicle_id?: string | null;
    driver_id?: string | null;
    depart_time?: Date | string | null;
    arrival_time?: Date | string | null;
    brgy_in_time?: Date | string | null;
    brgy_out_time?: Date | string | null;
    dispatch_type?: $Enums.DispatchType | null;
    from_location?: string | null;
    to_location?: string | null;
    odometer_in?: number | null;
    odometer_out?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    responders?: Prisma.VehicularDispatchResponderUncheckedCreateNestedManyWithoutDispatchInput;
    passengers?: Prisma.CivilianPassengerUncheckedCreateNestedManyWithoutDispatchInput;
};
export type VehicularDispatchCreateOrConnectWithoutSubmitterInput = {
    where: Prisma.VehicularDispatchWhereUniqueInput;
    create: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutSubmitterInput, Prisma.VehicularDispatchUncheckedCreateWithoutSubmitterInput>;
};
export type VehicularDispatchCreateManySubmitterInputEnvelope = {
    data: Prisma.VehicularDispatchCreateManySubmitterInput | Prisma.VehicularDispatchCreateManySubmitterInput[];
    skipDuplicates?: boolean;
};
export type VehicularDispatchUpsertWithWhereUniqueWithoutDriverInput = {
    where: Prisma.VehicularDispatchWhereUniqueInput;
    update: Prisma.XOR<Prisma.VehicularDispatchUpdateWithoutDriverInput, Prisma.VehicularDispatchUncheckedUpdateWithoutDriverInput>;
    create: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutDriverInput, Prisma.VehicularDispatchUncheckedCreateWithoutDriverInput>;
};
export type VehicularDispatchUpdateWithWhereUniqueWithoutDriverInput = {
    where: Prisma.VehicularDispatchWhereUniqueInput;
    data: Prisma.XOR<Prisma.VehicularDispatchUpdateWithoutDriverInput, Prisma.VehicularDispatchUncheckedUpdateWithoutDriverInput>;
};
export type VehicularDispatchUpdateManyWithWhereWithoutDriverInput = {
    where: Prisma.VehicularDispatchScalarWhereInput;
    data: Prisma.XOR<Prisma.VehicularDispatchUpdateManyMutationInput, Prisma.VehicularDispatchUncheckedUpdateManyWithoutDriverInput>;
};
export type VehicularDispatchScalarWhereInput = {
    AND?: Prisma.VehicularDispatchScalarWhereInput | Prisma.VehicularDispatchScalarWhereInput[];
    OR?: Prisma.VehicularDispatchScalarWhereInput[];
    NOT?: Prisma.VehicularDispatchScalarWhereInput | Prisma.VehicularDispatchScalarWhereInput[];
    dispatch_id?: Prisma.StringFilter<"VehicularDispatch"> | string;
    operation_id?: Prisma.StringNullableFilter<"VehicularDispatch"> | string | null;
    patient_log_id?: Prisma.StringNullableFilter<"VehicularDispatch"> | string | null;
    dispatch_date?: Prisma.DateTimeFilter<"VehicularDispatch"> | Date | string;
    submitted_by?: Prisma.StringFilter<"VehicularDispatch"> | string;
    vehicle_id?: Prisma.StringNullableFilter<"VehicularDispatch"> | string | null;
    driver_id?: Prisma.StringNullableFilter<"VehicularDispatch"> | string | null;
    depart_time?: Prisma.DateTimeNullableFilter<"VehicularDispatch"> | Date | string | null;
    arrival_time?: Prisma.DateTimeNullableFilter<"VehicularDispatch"> | Date | string | null;
    brgy_in_time?: Prisma.DateTimeNullableFilter<"VehicularDispatch"> | Date | string | null;
    brgy_out_time?: Prisma.DateTimeNullableFilter<"VehicularDispatch"> | Date | string | null;
    dispatch_type?: Prisma.EnumDispatchTypeNullableFilter<"VehicularDispatch"> | $Enums.DispatchType | null;
    from_location?: Prisma.StringNullableFilter<"VehicularDispatch"> | string | null;
    to_location?: Prisma.StringNullableFilter<"VehicularDispatch"> | string | null;
    odometer_in?: Prisma.IntNullableFilter<"VehicularDispatch"> | number | null;
    odometer_out?: Prisma.IntNullableFilter<"VehicularDispatch"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"VehicularDispatch"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"VehicularDispatch"> | Date | string;
};
export type VehicularDispatchUpsertWithWhereUniqueWithoutSubmitterInput = {
    where: Prisma.VehicularDispatchWhereUniqueInput;
    update: Prisma.XOR<Prisma.VehicularDispatchUpdateWithoutSubmitterInput, Prisma.VehicularDispatchUncheckedUpdateWithoutSubmitterInput>;
    create: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutSubmitterInput, Prisma.VehicularDispatchUncheckedCreateWithoutSubmitterInput>;
};
export type VehicularDispatchUpdateWithWhereUniqueWithoutSubmitterInput = {
    where: Prisma.VehicularDispatchWhereUniqueInput;
    data: Prisma.XOR<Prisma.VehicularDispatchUpdateWithoutSubmitterInput, Prisma.VehicularDispatchUncheckedUpdateWithoutSubmitterInput>;
};
export type VehicularDispatchUpdateManyWithWhereWithoutSubmitterInput = {
    where: Prisma.VehicularDispatchScalarWhereInput;
    data: Prisma.XOR<Prisma.VehicularDispatchUpdateManyMutationInput, Prisma.VehicularDispatchUncheckedUpdateManyWithoutSubmitterInput>;
};
export type VehicularDispatchCreateWithoutOperationInput = {
    dispatch_id?: string;
    dispatch_date: Date | string;
    depart_time?: Date | string | null;
    arrival_time?: Date | string | null;
    brgy_in_time?: Date | string | null;
    brgy_out_time?: Date | string | null;
    dispatch_type?: $Enums.DispatchType | null;
    from_location?: string | null;
    to_location?: string | null;
    odometer_in?: number | null;
    odometer_out?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    patientLog?: Prisma.PatientLogCreateNestedOneWithoutDispatchesInput;
    vehicle?: Prisma.VehicleCreateNestedOneWithoutDispatchesInput;
    driver?: Prisma.UserCreateNestedOneWithoutDrivenDispatchesInput;
    submitter: Prisma.UserCreateNestedOneWithoutSubmittedDispatchesInput;
    responders?: Prisma.VehicularDispatchResponderCreateNestedManyWithoutDispatchInput;
    passengers?: Prisma.CivilianPassengerCreateNestedManyWithoutDispatchInput;
};
export type VehicularDispatchUncheckedCreateWithoutOperationInput = {
    dispatch_id?: string;
    patient_log_id?: string | null;
    dispatch_date: Date | string;
    submitted_by: string;
    vehicle_id?: string | null;
    driver_id?: string | null;
    depart_time?: Date | string | null;
    arrival_time?: Date | string | null;
    brgy_in_time?: Date | string | null;
    brgy_out_time?: Date | string | null;
    dispatch_type?: $Enums.DispatchType | null;
    from_location?: string | null;
    to_location?: string | null;
    odometer_in?: number | null;
    odometer_out?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    responders?: Prisma.VehicularDispatchResponderUncheckedCreateNestedManyWithoutDispatchInput;
    passengers?: Prisma.CivilianPassengerUncheckedCreateNestedManyWithoutDispatchInput;
};
export type VehicularDispatchCreateOrConnectWithoutOperationInput = {
    where: Prisma.VehicularDispatchWhereUniqueInput;
    create: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutOperationInput, Prisma.VehicularDispatchUncheckedCreateWithoutOperationInput>;
};
export type VehicularDispatchCreateManyOperationInputEnvelope = {
    data: Prisma.VehicularDispatchCreateManyOperationInput | Prisma.VehicularDispatchCreateManyOperationInput[];
    skipDuplicates?: boolean;
};
export type VehicularDispatchUpsertWithWhereUniqueWithoutOperationInput = {
    where: Prisma.VehicularDispatchWhereUniqueInput;
    update: Prisma.XOR<Prisma.VehicularDispatchUpdateWithoutOperationInput, Prisma.VehicularDispatchUncheckedUpdateWithoutOperationInput>;
    create: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutOperationInput, Prisma.VehicularDispatchUncheckedCreateWithoutOperationInput>;
};
export type VehicularDispatchUpdateWithWhereUniqueWithoutOperationInput = {
    where: Prisma.VehicularDispatchWhereUniqueInput;
    data: Prisma.XOR<Prisma.VehicularDispatchUpdateWithoutOperationInput, Prisma.VehicularDispatchUncheckedUpdateWithoutOperationInput>;
};
export type VehicularDispatchUpdateManyWithWhereWithoutOperationInput = {
    where: Prisma.VehicularDispatchScalarWhereInput;
    data: Prisma.XOR<Prisma.VehicularDispatchUpdateManyMutationInput, Prisma.VehicularDispatchUncheckedUpdateManyWithoutOperationInput>;
};
export type VehicularDispatchCreateWithoutVehicleInput = {
    dispatch_id?: string;
    dispatch_date: Date | string;
    depart_time?: Date | string | null;
    arrival_time?: Date | string | null;
    brgy_in_time?: Date | string | null;
    brgy_out_time?: Date | string | null;
    dispatch_type?: $Enums.DispatchType | null;
    from_location?: string | null;
    to_location?: string | null;
    odometer_in?: number | null;
    odometer_out?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    operation?: Prisma.OperationLogCreateNestedOneWithoutDispatchesInput;
    patientLog?: Prisma.PatientLogCreateNestedOneWithoutDispatchesInput;
    driver?: Prisma.UserCreateNestedOneWithoutDrivenDispatchesInput;
    submitter: Prisma.UserCreateNestedOneWithoutSubmittedDispatchesInput;
    responders?: Prisma.VehicularDispatchResponderCreateNestedManyWithoutDispatchInput;
    passengers?: Prisma.CivilianPassengerCreateNestedManyWithoutDispatchInput;
};
export type VehicularDispatchUncheckedCreateWithoutVehicleInput = {
    dispatch_id?: string;
    operation_id?: string | null;
    patient_log_id?: string | null;
    dispatch_date: Date | string;
    submitted_by: string;
    driver_id?: string | null;
    depart_time?: Date | string | null;
    arrival_time?: Date | string | null;
    brgy_in_time?: Date | string | null;
    brgy_out_time?: Date | string | null;
    dispatch_type?: $Enums.DispatchType | null;
    from_location?: string | null;
    to_location?: string | null;
    odometer_in?: number | null;
    odometer_out?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    responders?: Prisma.VehicularDispatchResponderUncheckedCreateNestedManyWithoutDispatchInput;
    passengers?: Prisma.CivilianPassengerUncheckedCreateNestedManyWithoutDispatchInput;
};
export type VehicularDispatchCreateOrConnectWithoutVehicleInput = {
    where: Prisma.VehicularDispatchWhereUniqueInput;
    create: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutVehicleInput, Prisma.VehicularDispatchUncheckedCreateWithoutVehicleInput>;
};
export type VehicularDispatchCreateManyVehicleInputEnvelope = {
    data: Prisma.VehicularDispatchCreateManyVehicleInput | Prisma.VehicularDispatchCreateManyVehicleInput[];
    skipDuplicates?: boolean;
};
export type VehicularDispatchUpsertWithWhereUniqueWithoutVehicleInput = {
    where: Prisma.VehicularDispatchWhereUniqueInput;
    update: Prisma.XOR<Prisma.VehicularDispatchUpdateWithoutVehicleInput, Prisma.VehicularDispatchUncheckedUpdateWithoutVehicleInput>;
    create: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutVehicleInput, Prisma.VehicularDispatchUncheckedCreateWithoutVehicleInput>;
};
export type VehicularDispatchUpdateWithWhereUniqueWithoutVehicleInput = {
    where: Prisma.VehicularDispatchWhereUniqueInput;
    data: Prisma.XOR<Prisma.VehicularDispatchUpdateWithoutVehicleInput, Prisma.VehicularDispatchUncheckedUpdateWithoutVehicleInput>;
};
export type VehicularDispatchUpdateManyWithWhereWithoutVehicleInput = {
    where: Prisma.VehicularDispatchScalarWhereInput;
    data: Prisma.XOR<Prisma.VehicularDispatchUpdateManyMutationInput, Prisma.VehicularDispatchUncheckedUpdateManyWithoutVehicleInput>;
};
export type VehicularDispatchCreateWithoutPatientLogInput = {
    dispatch_id?: string;
    dispatch_date: Date | string;
    depart_time?: Date | string | null;
    arrival_time?: Date | string | null;
    brgy_in_time?: Date | string | null;
    brgy_out_time?: Date | string | null;
    dispatch_type?: $Enums.DispatchType | null;
    from_location?: string | null;
    to_location?: string | null;
    odometer_in?: number | null;
    odometer_out?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    operation?: Prisma.OperationLogCreateNestedOneWithoutDispatchesInput;
    vehicle?: Prisma.VehicleCreateNestedOneWithoutDispatchesInput;
    driver?: Prisma.UserCreateNestedOneWithoutDrivenDispatchesInput;
    submitter: Prisma.UserCreateNestedOneWithoutSubmittedDispatchesInput;
    responders?: Prisma.VehicularDispatchResponderCreateNestedManyWithoutDispatchInput;
    passengers?: Prisma.CivilianPassengerCreateNestedManyWithoutDispatchInput;
};
export type VehicularDispatchUncheckedCreateWithoutPatientLogInput = {
    dispatch_id?: string;
    operation_id?: string | null;
    dispatch_date: Date | string;
    submitted_by: string;
    vehicle_id?: string | null;
    driver_id?: string | null;
    depart_time?: Date | string | null;
    arrival_time?: Date | string | null;
    brgy_in_time?: Date | string | null;
    brgy_out_time?: Date | string | null;
    dispatch_type?: $Enums.DispatchType | null;
    from_location?: string | null;
    to_location?: string | null;
    odometer_in?: number | null;
    odometer_out?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    responders?: Prisma.VehicularDispatchResponderUncheckedCreateNestedManyWithoutDispatchInput;
    passengers?: Prisma.CivilianPassengerUncheckedCreateNestedManyWithoutDispatchInput;
};
export type VehicularDispatchCreateOrConnectWithoutPatientLogInput = {
    where: Prisma.VehicularDispatchWhereUniqueInput;
    create: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutPatientLogInput, Prisma.VehicularDispatchUncheckedCreateWithoutPatientLogInput>;
};
export type VehicularDispatchCreateManyPatientLogInputEnvelope = {
    data: Prisma.VehicularDispatchCreateManyPatientLogInput | Prisma.VehicularDispatchCreateManyPatientLogInput[];
    skipDuplicates?: boolean;
};
export type VehicularDispatchUpsertWithWhereUniqueWithoutPatientLogInput = {
    where: Prisma.VehicularDispatchWhereUniqueInput;
    update: Prisma.XOR<Prisma.VehicularDispatchUpdateWithoutPatientLogInput, Prisma.VehicularDispatchUncheckedUpdateWithoutPatientLogInput>;
    create: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutPatientLogInput, Prisma.VehicularDispatchUncheckedCreateWithoutPatientLogInput>;
};
export type VehicularDispatchUpdateWithWhereUniqueWithoutPatientLogInput = {
    where: Prisma.VehicularDispatchWhereUniqueInput;
    data: Prisma.XOR<Prisma.VehicularDispatchUpdateWithoutPatientLogInput, Prisma.VehicularDispatchUncheckedUpdateWithoutPatientLogInput>;
};
export type VehicularDispatchUpdateManyWithWhereWithoutPatientLogInput = {
    where: Prisma.VehicularDispatchScalarWhereInput;
    data: Prisma.XOR<Prisma.VehicularDispatchUpdateManyMutationInput, Prisma.VehicularDispatchUncheckedUpdateManyWithoutPatientLogInput>;
};
export type VehicularDispatchCreateWithoutRespondersInput = {
    dispatch_id?: string;
    dispatch_date: Date | string;
    depart_time?: Date | string | null;
    arrival_time?: Date | string | null;
    brgy_in_time?: Date | string | null;
    brgy_out_time?: Date | string | null;
    dispatch_type?: $Enums.DispatchType | null;
    from_location?: string | null;
    to_location?: string | null;
    odometer_in?: number | null;
    odometer_out?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    operation?: Prisma.OperationLogCreateNestedOneWithoutDispatchesInput;
    patientLog?: Prisma.PatientLogCreateNestedOneWithoutDispatchesInput;
    vehicle?: Prisma.VehicleCreateNestedOneWithoutDispatchesInput;
    driver?: Prisma.UserCreateNestedOneWithoutDrivenDispatchesInput;
    submitter: Prisma.UserCreateNestedOneWithoutSubmittedDispatchesInput;
    passengers?: Prisma.CivilianPassengerCreateNestedManyWithoutDispatchInput;
};
export type VehicularDispatchUncheckedCreateWithoutRespondersInput = {
    dispatch_id?: string;
    operation_id?: string | null;
    patient_log_id?: string | null;
    dispatch_date: Date | string;
    submitted_by: string;
    vehicle_id?: string | null;
    driver_id?: string | null;
    depart_time?: Date | string | null;
    arrival_time?: Date | string | null;
    brgy_in_time?: Date | string | null;
    brgy_out_time?: Date | string | null;
    dispatch_type?: $Enums.DispatchType | null;
    from_location?: string | null;
    to_location?: string | null;
    odometer_in?: number | null;
    odometer_out?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    passengers?: Prisma.CivilianPassengerUncheckedCreateNestedManyWithoutDispatchInput;
};
export type VehicularDispatchCreateOrConnectWithoutRespondersInput = {
    where: Prisma.VehicularDispatchWhereUniqueInput;
    create: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutRespondersInput, Prisma.VehicularDispatchUncheckedCreateWithoutRespondersInput>;
};
export type VehicularDispatchUpsertWithoutRespondersInput = {
    update: Prisma.XOR<Prisma.VehicularDispatchUpdateWithoutRespondersInput, Prisma.VehicularDispatchUncheckedUpdateWithoutRespondersInput>;
    create: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutRespondersInput, Prisma.VehicularDispatchUncheckedCreateWithoutRespondersInput>;
    where?: Prisma.VehicularDispatchWhereInput;
};
export type VehicularDispatchUpdateToOneWithWhereWithoutRespondersInput = {
    where?: Prisma.VehicularDispatchWhereInput;
    data: Prisma.XOR<Prisma.VehicularDispatchUpdateWithoutRespondersInput, Prisma.VehicularDispatchUncheckedUpdateWithoutRespondersInput>;
};
export type VehicularDispatchUpdateWithoutRespondersInput = {
    dispatch_id?: Prisma.StringFieldUpdateOperationsInput | string;
    dispatch_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    depart_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    arrival_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dispatch_type?: Prisma.NullableEnumDispatchTypeFieldUpdateOperationsInput | $Enums.DispatchType | null;
    from_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    odometer_in?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    odometer_out?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    operation?: Prisma.OperationLogUpdateOneWithoutDispatchesNestedInput;
    patientLog?: Prisma.PatientLogUpdateOneWithoutDispatchesNestedInput;
    vehicle?: Prisma.VehicleUpdateOneWithoutDispatchesNestedInput;
    driver?: Prisma.UserUpdateOneWithoutDrivenDispatchesNestedInput;
    submitter?: Prisma.UserUpdateOneRequiredWithoutSubmittedDispatchesNestedInput;
    passengers?: Prisma.CivilianPassengerUpdateManyWithoutDispatchNestedInput;
};
export type VehicularDispatchUncheckedUpdateWithoutRespondersInput = {
    dispatch_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patient_log_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dispatch_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submitted_by?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicle_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    driver_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    depart_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    arrival_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dispatch_type?: Prisma.NullableEnumDispatchTypeFieldUpdateOperationsInput | $Enums.DispatchType | null;
    from_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    odometer_in?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    odometer_out?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    passengers?: Prisma.CivilianPassengerUncheckedUpdateManyWithoutDispatchNestedInput;
};
export type VehicularDispatchCreateWithoutPassengersInput = {
    dispatch_id?: string;
    dispatch_date: Date | string;
    depart_time?: Date | string | null;
    arrival_time?: Date | string | null;
    brgy_in_time?: Date | string | null;
    brgy_out_time?: Date | string | null;
    dispatch_type?: $Enums.DispatchType | null;
    from_location?: string | null;
    to_location?: string | null;
    odometer_in?: number | null;
    odometer_out?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    operation?: Prisma.OperationLogCreateNestedOneWithoutDispatchesInput;
    patientLog?: Prisma.PatientLogCreateNestedOneWithoutDispatchesInput;
    vehicle?: Prisma.VehicleCreateNestedOneWithoutDispatchesInput;
    driver?: Prisma.UserCreateNestedOneWithoutDrivenDispatchesInput;
    submitter: Prisma.UserCreateNestedOneWithoutSubmittedDispatchesInput;
    responders?: Prisma.VehicularDispatchResponderCreateNestedManyWithoutDispatchInput;
};
export type VehicularDispatchUncheckedCreateWithoutPassengersInput = {
    dispatch_id?: string;
    operation_id?: string | null;
    patient_log_id?: string | null;
    dispatch_date: Date | string;
    submitted_by: string;
    vehicle_id?: string | null;
    driver_id?: string | null;
    depart_time?: Date | string | null;
    arrival_time?: Date | string | null;
    brgy_in_time?: Date | string | null;
    brgy_out_time?: Date | string | null;
    dispatch_type?: $Enums.DispatchType | null;
    from_location?: string | null;
    to_location?: string | null;
    odometer_in?: number | null;
    odometer_out?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    responders?: Prisma.VehicularDispatchResponderUncheckedCreateNestedManyWithoutDispatchInput;
};
export type VehicularDispatchCreateOrConnectWithoutPassengersInput = {
    where: Prisma.VehicularDispatchWhereUniqueInput;
    create: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutPassengersInput, Prisma.VehicularDispatchUncheckedCreateWithoutPassengersInput>;
};
export type VehicularDispatchUpsertWithoutPassengersInput = {
    update: Prisma.XOR<Prisma.VehicularDispatchUpdateWithoutPassengersInput, Prisma.VehicularDispatchUncheckedUpdateWithoutPassengersInput>;
    create: Prisma.XOR<Prisma.VehicularDispatchCreateWithoutPassengersInput, Prisma.VehicularDispatchUncheckedCreateWithoutPassengersInput>;
    where?: Prisma.VehicularDispatchWhereInput;
};
export type VehicularDispatchUpdateToOneWithWhereWithoutPassengersInput = {
    where?: Prisma.VehicularDispatchWhereInput;
    data: Prisma.XOR<Prisma.VehicularDispatchUpdateWithoutPassengersInput, Prisma.VehicularDispatchUncheckedUpdateWithoutPassengersInput>;
};
export type VehicularDispatchUpdateWithoutPassengersInput = {
    dispatch_id?: Prisma.StringFieldUpdateOperationsInput | string;
    dispatch_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    depart_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    arrival_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dispatch_type?: Prisma.NullableEnumDispatchTypeFieldUpdateOperationsInput | $Enums.DispatchType | null;
    from_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    odometer_in?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    odometer_out?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    operation?: Prisma.OperationLogUpdateOneWithoutDispatchesNestedInput;
    patientLog?: Prisma.PatientLogUpdateOneWithoutDispatchesNestedInput;
    vehicle?: Prisma.VehicleUpdateOneWithoutDispatchesNestedInput;
    driver?: Prisma.UserUpdateOneWithoutDrivenDispatchesNestedInput;
    submitter?: Prisma.UserUpdateOneRequiredWithoutSubmittedDispatchesNestedInput;
    responders?: Prisma.VehicularDispatchResponderUpdateManyWithoutDispatchNestedInput;
};
export type VehicularDispatchUncheckedUpdateWithoutPassengersInput = {
    dispatch_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patient_log_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dispatch_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submitted_by?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicle_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    driver_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    depart_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    arrival_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dispatch_type?: Prisma.NullableEnumDispatchTypeFieldUpdateOperationsInput | $Enums.DispatchType | null;
    from_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    odometer_in?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    odometer_out?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    responders?: Prisma.VehicularDispatchResponderUncheckedUpdateManyWithoutDispatchNestedInput;
};
export type VehicularDispatchCreateManyDriverInput = {
    dispatch_id?: string;
    operation_id?: string | null;
    patient_log_id?: string | null;
    dispatch_date: Date | string;
    submitted_by: string;
    vehicle_id?: string | null;
    depart_time?: Date | string | null;
    arrival_time?: Date | string | null;
    brgy_in_time?: Date | string | null;
    brgy_out_time?: Date | string | null;
    dispatch_type?: $Enums.DispatchType | null;
    from_location?: string | null;
    to_location?: string | null;
    odometer_in?: number | null;
    odometer_out?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type VehicularDispatchCreateManySubmitterInput = {
    dispatch_id?: string;
    operation_id?: string | null;
    patient_log_id?: string | null;
    dispatch_date: Date | string;
    vehicle_id?: string | null;
    driver_id?: string | null;
    depart_time?: Date | string | null;
    arrival_time?: Date | string | null;
    brgy_in_time?: Date | string | null;
    brgy_out_time?: Date | string | null;
    dispatch_type?: $Enums.DispatchType | null;
    from_location?: string | null;
    to_location?: string | null;
    odometer_in?: number | null;
    odometer_out?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type VehicularDispatchUpdateWithoutDriverInput = {
    dispatch_id?: Prisma.StringFieldUpdateOperationsInput | string;
    dispatch_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    depart_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    arrival_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dispatch_type?: Prisma.NullableEnumDispatchTypeFieldUpdateOperationsInput | $Enums.DispatchType | null;
    from_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    odometer_in?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    odometer_out?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    operation?: Prisma.OperationLogUpdateOneWithoutDispatchesNestedInput;
    patientLog?: Prisma.PatientLogUpdateOneWithoutDispatchesNestedInput;
    vehicle?: Prisma.VehicleUpdateOneWithoutDispatchesNestedInput;
    submitter?: Prisma.UserUpdateOneRequiredWithoutSubmittedDispatchesNestedInput;
    responders?: Prisma.VehicularDispatchResponderUpdateManyWithoutDispatchNestedInput;
    passengers?: Prisma.CivilianPassengerUpdateManyWithoutDispatchNestedInput;
};
export type VehicularDispatchUncheckedUpdateWithoutDriverInput = {
    dispatch_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patient_log_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dispatch_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submitted_by?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicle_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    depart_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    arrival_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dispatch_type?: Prisma.NullableEnumDispatchTypeFieldUpdateOperationsInput | $Enums.DispatchType | null;
    from_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    odometer_in?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    odometer_out?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    responders?: Prisma.VehicularDispatchResponderUncheckedUpdateManyWithoutDispatchNestedInput;
    passengers?: Prisma.CivilianPassengerUncheckedUpdateManyWithoutDispatchNestedInput;
};
export type VehicularDispatchUncheckedUpdateManyWithoutDriverInput = {
    dispatch_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patient_log_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dispatch_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submitted_by?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicle_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    depart_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    arrival_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dispatch_type?: Prisma.NullableEnumDispatchTypeFieldUpdateOperationsInput | $Enums.DispatchType | null;
    from_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    odometer_in?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    odometer_out?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VehicularDispatchUpdateWithoutSubmitterInput = {
    dispatch_id?: Prisma.StringFieldUpdateOperationsInput | string;
    dispatch_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    depart_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    arrival_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dispatch_type?: Prisma.NullableEnumDispatchTypeFieldUpdateOperationsInput | $Enums.DispatchType | null;
    from_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    odometer_in?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    odometer_out?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    operation?: Prisma.OperationLogUpdateOneWithoutDispatchesNestedInput;
    patientLog?: Prisma.PatientLogUpdateOneWithoutDispatchesNestedInput;
    vehicle?: Prisma.VehicleUpdateOneWithoutDispatchesNestedInput;
    driver?: Prisma.UserUpdateOneWithoutDrivenDispatchesNestedInput;
    responders?: Prisma.VehicularDispatchResponderUpdateManyWithoutDispatchNestedInput;
    passengers?: Prisma.CivilianPassengerUpdateManyWithoutDispatchNestedInput;
};
export type VehicularDispatchUncheckedUpdateWithoutSubmitterInput = {
    dispatch_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patient_log_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dispatch_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vehicle_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    driver_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    depart_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    arrival_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dispatch_type?: Prisma.NullableEnumDispatchTypeFieldUpdateOperationsInput | $Enums.DispatchType | null;
    from_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    odometer_in?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    odometer_out?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    responders?: Prisma.VehicularDispatchResponderUncheckedUpdateManyWithoutDispatchNestedInput;
    passengers?: Prisma.CivilianPassengerUncheckedUpdateManyWithoutDispatchNestedInput;
};
export type VehicularDispatchUncheckedUpdateManyWithoutSubmitterInput = {
    dispatch_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patient_log_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dispatch_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vehicle_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    driver_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    depart_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    arrival_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dispatch_type?: Prisma.NullableEnumDispatchTypeFieldUpdateOperationsInput | $Enums.DispatchType | null;
    from_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    odometer_in?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    odometer_out?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VehicularDispatchCreateManyOperationInput = {
    dispatch_id?: string;
    patient_log_id?: string | null;
    dispatch_date: Date | string;
    submitted_by: string;
    vehicle_id?: string | null;
    driver_id?: string | null;
    depart_time?: Date | string | null;
    arrival_time?: Date | string | null;
    brgy_in_time?: Date | string | null;
    brgy_out_time?: Date | string | null;
    dispatch_type?: $Enums.DispatchType | null;
    from_location?: string | null;
    to_location?: string | null;
    odometer_in?: number | null;
    odometer_out?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type VehicularDispatchUpdateWithoutOperationInput = {
    dispatch_id?: Prisma.StringFieldUpdateOperationsInput | string;
    dispatch_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    depart_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    arrival_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dispatch_type?: Prisma.NullableEnumDispatchTypeFieldUpdateOperationsInput | $Enums.DispatchType | null;
    from_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    odometer_in?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    odometer_out?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    patientLog?: Prisma.PatientLogUpdateOneWithoutDispatchesNestedInput;
    vehicle?: Prisma.VehicleUpdateOneWithoutDispatchesNestedInput;
    driver?: Prisma.UserUpdateOneWithoutDrivenDispatchesNestedInput;
    submitter?: Prisma.UserUpdateOneRequiredWithoutSubmittedDispatchesNestedInput;
    responders?: Prisma.VehicularDispatchResponderUpdateManyWithoutDispatchNestedInput;
    passengers?: Prisma.CivilianPassengerUpdateManyWithoutDispatchNestedInput;
};
export type VehicularDispatchUncheckedUpdateWithoutOperationInput = {
    dispatch_id?: Prisma.StringFieldUpdateOperationsInput | string;
    patient_log_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dispatch_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submitted_by?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicle_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    driver_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    depart_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    arrival_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dispatch_type?: Prisma.NullableEnumDispatchTypeFieldUpdateOperationsInput | $Enums.DispatchType | null;
    from_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    odometer_in?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    odometer_out?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    responders?: Prisma.VehicularDispatchResponderUncheckedUpdateManyWithoutDispatchNestedInput;
    passengers?: Prisma.CivilianPassengerUncheckedUpdateManyWithoutDispatchNestedInput;
};
export type VehicularDispatchUncheckedUpdateManyWithoutOperationInput = {
    dispatch_id?: Prisma.StringFieldUpdateOperationsInput | string;
    patient_log_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dispatch_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submitted_by?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicle_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    driver_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    depart_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    arrival_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dispatch_type?: Prisma.NullableEnumDispatchTypeFieldUpdateOperationsInput | $Enums.DispatchType | null;
    from_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    odometer_in?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    odometer_out?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VehicularDispatchCreateManyVehicleInput = {
    dispatch_id?: string;
    operation_id?: string | null;
    patient_log_id?: string | null;
    dispatch_date: Date | string;
    submitted_by: string;
    driver_id?: string | null;
    depart_time?: Date | string | null;
    arrival_time?: Date | string | null;
    brgy_in_time?: Date | string | null;
    brgy_out_time?: Date | string | null;
    dispatch_type?: $Enums.DispatchType | null;
    from_location?: string | null;
    to_location?: string | null;
    odometer_in?: number | null;
    odometer_out?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type VehicularDispatchUpdateWithoutVehicleInput = {
    dispatch_id?: Prisma.StringFieldUpdateOperationsInput | string;
    dispatch_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    depart_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    arrival_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dispatch_type?: Prisma.NullableEnumDispatchTypeFieldUpdateOperationsInput | $Enums.DispatchType | null;
    from_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    odometer_in?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    odometer_out?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    operation?: Prisma.OperationLogUpdateOneWithoutDispatchesNestedInput;
    patientLog?: Prisma.PatientLogUpdateOneWithoutDispatchesNestedInput;
    driver?: Prisma.UserUpdateOneWithoutDrivenDispatchesNestedInput;
    submitter?: Prisma.UserUpdateOneRequiredWithoutSubmittedDispatchesNestedInput;
    responders?: Prisma.VehicularDispatchResponderUpdateManyWithoutDispatchNestedInput;
    passengers?: Prisma.CivilianPassengerUpdateManyWithoutDispatchNestedInput;
};
export type VehicularDispatchUncheckedUpdateWithoutVehicleInput = {
    dispatch_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patient_log_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dispatch_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submitted_by?: Prisma.StringFieldUpdateOperationsInput | string;
    driver_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    depart_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    arrival_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dispatch_type?: Prisma.NullableEnumDispatchTypeFieldUpdateOperationsInput | $Enums.DispatchType | null;
    from_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    odometer_in?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    odometer_out?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    responders?: Prisma.VehicularDispatchResponderUncheckedUpdateManyWithoutDispatchNestedInput;
    passengers?: Prisma.CivilianPassengerUncheckedUpdateManyWithoutDispatchNestedInput;
};
export type VehicularDispatchUncheckedUpdateManyWithoutVehicleInput = {
    dispatch_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    patient_log_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dispatch_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submitted_by?: Prisma.StringFieldUpdateOperationsInput | string;
    driver_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    depart_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    arrival_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dispatch_type?: Prisma.NullableEnumDispatchTypeFieldUpdateOperationsInput | $Enums.DispatchType | null;
    from_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    odometer_in?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    odometer_out?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VehicularDispatchCreateManyPatientLogInput = {
    dispatch_id?: string;
    operation_id?: string | null;
    dispatch_date: Date | string;
    submitted_by: string;
    vehicle_id?: string | null;
    driver_id?: string | null;
    depart_time?: Date | string | null;
    arrival_time?: Date | string | null;
    brgy_in_time?: Date | string | null;
    brgy_out_time?: Date | string | null;
    dispatch_type?: $Enums.DispatchType | null;
    from_location?: string | null;
    to_location?: string | null;
    odometer_in?: number | null;
    odometer_out?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type VehicularDispatchUpdateWithoutPatientLogInput = {
    dispatch_id?: Prisma.StringFieldUpdateOperationsInput | string;
    dispatch_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    depart_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    arrival_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dispatch_type?: Prisma.NullableEnumDispatchTypeFieldUpdateOperationsInput | $Enums.DispatchType | null;
    from_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    odometer_in?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    odometer_out?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    operation?: Prisma.OperationLogUpdateOneWithoutDispatchesNestedInput;
    vehicle?: Prisma.VehicleUpdateOneWithoutDispatchesNestedInput;
    driver?: Prisma.UserUpdateOneWithoutDrivenDispatchesNestedInput;
    submitter?: Prisma.UserUpdateOneRequiredWithoutSubmittedDispatchesNestedInput;
    responders?: Prisma.VehicularDispatchResponderUpdateManyWithoutDispatchNestedInput;
    passengers?: Prisma.CivilianPassengerUpdateManyWithoutDispatchNestedInput;
};
export type VehicularDispatchUncheckedUpdateWithoutPatientLogInput = {
    dispatch_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dispatch_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submitted_by?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicle_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    driver_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    depart_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    arrival_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dispatch_type?: Prisma.NullableEnumDispatchTypeFieldUpdateOperationsInput | $Enums.DispatchType | null;
    from_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    odometer_in?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    odometer_out?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    responders?: Prisma.VehicularDispatchResponderUncheckedUpdateManyWithoutDispatchNestedInput;
    passengers?: Prisma.CivilianPassengerUncheckedUpdateManyWithoutDispatchNestedInput;
};
export type VehicularDispatchUncheckedUpdateManyWithoutPatientLogInput = {
    dispatch_id?: Prisma.StringFieldUpdateOperationsInput | string;
    operation_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dispatch_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submitted_by?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicle_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    driver_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    depart_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    arrival_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_in_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    brgy_out_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dispatch_type?: Prisma.NullableEnumDispatchTypeFieldUpdateOperationsInput | $Enums.DispatchType | null;
    from_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    to_location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    odometer_in?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    odometer_out?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type VehicularDispatchCountOutputType
 */
export type VehicularDispatchCountOutputType = {
    responders: number;
    passengers: number;
};
export type VehicularDispatchCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    responders?: boolean | VehicularDispatchCountOutputTypeCountRespondersArgs;
    passengers?: boolean | VehicularDispatchCountOutputTypeCountPassengersArgs;
};
/**
 * VehicularDispatchCountOutputType without action
 */
export type VehicularDispatchCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicularDispatchCountOutputType
     */
    select?: Prisma.VehicularDispatchCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * VehicularDispatchCountOutputType without action
 */
export type VehicularDispatchCountOutputTypeCountRespondersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VehicularDispatchResponderWhereInput;
};
/**
 * VehicularDispatchCountOutputType without action
 */
export type VehicularDispatchCountOutputTypeCountPassengersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CivilianPassengerWhereInput;
};
export type VehicularDispatchSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    dispatch_id?: boolean;
    operation_id?: boolean;
    patient_log_id?: boolean;
    dispatch_date?: boolean;
    submitted_by?: boolean;
    vehicle_id?: boolean;
    driver_id?: boolean;
    depart_time?: boolean;
    arrival_time?: boolean;
    brgy_in_time?: boolean;
    brgy_out_time?: boolean;
    dispatch_type?: boolean;
    from_location?: boolean;
    to_location?: boolean;
    odometer_in?: boolean;
    odometer_out?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    operation?: boolean | Prisma.VehicularDispatch$operationArgs<ExtArgs>;
    patientLog?: boolean | Prisma.VehicularDispatch$patientLogArgs<ExtArgs>;
    vehicle?: boolean | Prisma.VehicularDispatch$vehicleArgs<ExtArgs>;
    driver?: boolean | Prisma.VehicularDispatch$driverArgs<ExtArgs>;
    submitter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    responders?: boolean | Prisma.VehicularDispatch$respondersArgs<ExtArgs>;
    passengers?: boolean | Prisma.VehicularDispatch$passengersArgs<ExtArgs>;
    _count?: boolean | Prisma.VehicularDispatchCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["vehicularDispatch"]>;
export type VehicularDispatchSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    dispatch_id?: boolean;
    operation_id?: boolean;
    patient_log_id?: boolean;
    dispatch_date?: boolean;
    submitted_by?: boolean;
    vehicle_id?: boolean;
    driver_id?: boolean;
    depart_time?: boolean;
    arrival_time?: boolean;
    brgy_in_time?: boolean;
    brgy_out_time?: boolean;
    dispatch_type?: boolean;
    from_location?: boolean;
    to_location?: boolean;
    odometer_in?: boolean;
    odometer_out?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    operation?: boolean | Prisma.VehicularDispatch$operationArgs<ExtArgs>;
    patientLog?: boolean | Prisma.VehicularDispatch$patientLogArgs<ExtArgs>;
    vehicle?: boolean | Prisma.VehicularDispatch$vehicleArgs<ExtArgs>;
    driver?: boolean | Prisma.VehicularDispatch$driverArgs<ExtArgs>;
    submitter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["vehicularDispatch"]>;
export type VehicularDispatchSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    dispatch_id?: boolean;
    operation_id?: boolean;
    patient_log_id?: boolean;
    dispatch_date?: boolean;
    submitted_by?: boolean;
    vehicle_id?: boolean;
    driver_id?: boolean;
    depart_time?: boolean;
    arrival_time?: boolean;
    brgy_in_time?: boolean;
    brgy_out_time?: boolean;
    dispatch_type?: boolean;
    from_location?: boolean;
    to_location?: boolean;
    odometer_in?: boolean;
    odometer_out?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    operation?: boolean | Prisma.VehicularDispatch$operationArgs<ExtArgs>;
    patientLog?: boolean | Prisma.VehicularDispatch$patientLogArgs<ExtArgs>;
    vehicle?: boolean | Prisma.VehicularDispatch$vehicleArgs<ExtArgs>;
    driver?: boolean | Prisma.VehicularDispatch$driverArgs<ExtArgs>;
    submitter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["vehicularDispatch"]>;
export type VehicularDispatchSelectScalar = {
    dispatch_id?: boolean;
    operation_id?: boolean;
    patient_log_id?: boolean;
    dispatch_date?: boolean;
    submitted_by?: boolean;
    vehicle_id?: boolean;
    driver_id?: boolean;
    depart_time?: boolean;
    arrival_time?: boolean;
    brgy_in_time?: boolean;
    brgy_out_time?: boolean;
    dispatch_type?: boolean;
    from_location?: boolean;
    to_location?: boolean;
    odometer_in?: boolean;
    odometer_out?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type VehicularDispatchOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"dispatch_id" | "operation_id" | "patient_log_id" | "dispatch_date" | "submitted_by" | "vehicle_id" | "driver_id" | "depart_time" | "arrival_time" | "brgy_in_time" | "brgy_out_time" | "dispatch_type" | "from_location" | "to_location" | "odometer_in" | "odometer_out" | "createdAt" | "updatedAt", ExtArgs["result"]["vehicularDispatch"]>;
export type VehicularDispatchInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    operation?: boolean | Prisma.VehicularDispatch$operationArgs<ExtArgs>;
    patientLog?: boolean | Prisma.VehicularDispatch$patientLogArgs<ExtArgs>;
    vehicle?: boolean | Prisma.VehicularDispatch$vehicleArgs<ExtArgs>;
    driver?: boolean | Prisma.VehicularDispatch$driverArgs<ExtArgs>;
    submitter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    responders?: boolean | Prisma.VehicularDispatch$respondersArgs<ExtArgs>;
    passengers?: boolean | Prisma.VehicularDispatch$passengersArgs<ExtArgs>;
    _count?: boolean | Prisma.VehicularDispatchCountOutputTypeDefaultArgs<ExtArgs>;
};
export type VehicularDispatchIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    operation?: boolean | Prisma.VehicularDispatch$operationArgs<ExtArgs>;
    patientLog?: boolean | Prisma.VehicularDispatch$patientLogArgs<ExtArgs>;
    vehicle?: boolean | Prisma.VehicularDispatch$vehicleArgs<ExtArgs>;
    driver?: boolean | Prisma.VehicularDispatch$driverArgs<ExtArgs>;
    submitter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type VehicularDispatchIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    operation?: boolean | Prisma.VehicularDispatch$operationArgs<ExtArgs>;
    patientLog?: boolean | Prisma.VehicularDispatch$patientLogArgs<ExtArgs>;
    vehicle?: boolean | Prisma.VehicularDispatch$vehicleArgs<ExtArgs>;
    driver?: boolean | Prisma.VehicularDispatch$driverArgs<ExtArgs>;
    submitter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $VehicularDispatchPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "VehicularDispatch";
    objects: {
        operation: Prisma.$OperationLogPayload<ExtArgs> | null;
        patientLog: Prisma.$PatientLogPayload<ExtArgs> | null;
        vehicle: Prisma.$VehiclePayload<ExtArgs> | null;
        driver: Prisma.$UserPayload<ExtArgs> | null;
        submitter: Prisma.$UserPayload<ExtArgs>;
        responders: Prisma.$VehicularDispatchResponderPayload<ExtArgs>[];
        passengers: Prisma.$CivilianPassengerPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        dispatch_id: string;
        operation_id: string | null;
        patient_log_id: string | null;
        dispatch_date: Date;
        submitted_by: string;
        vehicle_id: string | null;
        driver_id: string | null;
        depart_time: Date | null;
        arrival_time: Date | null;
        brgy_in_time: Date | null;
        brgy_out_time: Date | null;
        dispatch_type: $Enums.DispatchType | null;
        from_location: string | null;
        to_location: string | null;
        odometer_in: number | null;
        odometer_out: number | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["vehicularDispatch"]>;
    composites: {};
};
export type VehicularDispatchGetPayload<S extends boolean | null | undefined | VehicularDispatchDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$VehicularDispatchPayload, S>;
export type VehicularDispatchCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<VehicularDispatchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: VehicularDispatchCountAggregateInputType | true;
};
export interface VehicularDispatchDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['VehicularDispatch'];
        meta: {
            name: 'VehicularDispatch';
        };
    };
    /**
     * Find zero or one VehicularDispatch that matches the filter.
     * @param {VehicularDispatchFindUniqueArgs} args - Arguments to find a VehicularDispatch
     * @example
     * // Get one VehicularDispatch
     * const vehicularDispatch = await prisma.vehicularDispatch.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VehicularDispatchFindUniqueArgs>(args: Prisma.SelectSubset<T, VehicularDispatchFindUniqueArgs<ExtArgs>>): Prisma.Prisma__VehicularDispatchClient<runtime.Types.Result.GetResult<Prisma.$VehicularDispatchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one VehicularDispatch that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VehicularDispatchFindUniqueOrThrowArgs} args - Arguments to find a VehicularDispatch
     * @example
     * // Get one VehicularDispatch
     * const vehicularDispatch = await prisma.vehicularDispatch.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VehicularDispatchFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, VehicularDispatchFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__VehicularDispatchClient<runtime.Types.Result.GetResult<Prisma.$VehicularDispatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first VehicularDispatch that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicularDispatchFindFirstArgs} args - Arguments to find a VehicularDispatch
     * @example
     * // Get one VehicularDispatch
     * const vehicularDispatch = await prisma.vehicularDispatch.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VehicularDispatchFindFirstArgs>(args?: Prisma.SelectSubset<T, VehicularDispatchFindFirstArgs<ExtArgs>>): Prisma.Prisma__VehicularDispatchClient<runtime.Types.Result.GetResult<Prisma.$VehicularDispatchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first VehicularDispatch that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicularDispatchFindFirstOrThrowArgs} args - Arguments to find a VehicularDispatch
     * @example
     * // Get one VehicularDispatch
     * const vehicularDispatch = await prisma.vehicularDispatch.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VehicularDispatchFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, VehicularDispatchFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__VehicularDispatchClient<runtime.Types.Result.GetResult<Prisma.$VehicularDispatchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more VehicularDispatches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicularDispatchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VehicularDispatches
     * const vehicularDispatches = await prisma.vehicularDispatch.findMany()
     *
     * // Get first 10 VehicularDispatches
     * const vehicularDispatches = await prisma.vehicularDispatch.findMany({ take: 10 })
     *
     * // Only select the `dispatch_id`
     * const vehicularDispatchWithDispatch_idOnly = await prisma.vehicularDispatch.findMany({ select: { dispatch_id: true } })
     *
     */
    findMany<T extends VehicularDispatchFindManyArgs>(args?: Prisma.SelectSubset<T, VehicularDispatchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VehicularDispatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a VehicularDispatch.
     * @param {VehicularDispatchCreateArgs} args - Arguments to create a VehicularDispatch.
     * @example
     * // Create one VehicularDispatch
     * const VehicularDispatch = await prisma.vehicularDispatch.create({
     *   data: {
     *     // ... data to create a VehicularDispatch
     *   }
     * })
     *
     */
    create<T extends VehicularDispatchCreateArgs>(args: Prisma.SelectSubset<T, VehicularDispatchCreateArgs<ExtArgs>>): Prisma.Prisma__VehicularDispatchClient<runtime.Types.Result.GetResult<Prisma.$VehicularDispatchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many VehicularDispatches.
     * @param {VehicularDispatchCreateManyArgs} args - Arguments to create many VehicularDispatches.
     * @example
     * // Create many VehicularDispatches
     * const vehicularDispatch = await prisma.vehicularDispatch.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends VehicularDispatchCreateManyArgs>(args?: Prisma.SelectSubset<T, VehicularDispatchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many VehicularDispatches and returns the data saved in the database.
     * @param {VehicularDispatchCreateManyAndReturnArgs} args - Arguments to create many VehicularDispatches.
     * @example
     * // Create many VehicularDispatches
     * const vehicularDispatch = await prisma.vehicularDispatch.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many VehicularDispatches and only return the `dispatch_id`
     * const vehicularDispatchWithDispatch_idOnly = await prisma.vehicularDispatch.createManyAndReturn({
     *   select: { dispatch_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends VehicularDispatchCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, VehicularDispatchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VehicularDispatchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a VehicularDispatch.
     * @param {VehicularDispatchDeleteArgs} args - Arguments to delete one VehicularDispatch.
     * @example
     * // Delete one VehicularDispatch
     * const VehicularDispatch = await prisma.vehicularDispatch.delete({
     *   where: {
     *     // ... filter to delete one VehicularDispatch
     *   }
     * })
     *
     */
    delete<T extends VehicularDispatchDeleteArgs>(args: Prisma.SelectSubset<T, VehicularDispatchDeleteArgs<ExtArgs>>): Prisma.Prisma__VehicularDispatchClient<runtime.Types.Result.GetResult<Prisma.$VehicularDispatchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one VehicularDispatch.
     * @param {VehicularDispatchUpdateArgs} args - Arguments to update one VehicularDispatch.
     * @example
     * // Update one VehicularDispatch
     * const vehicularDispatch = await prisma.vehicularDispatch.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends VehicularDispatchUpdateArgs>(args: Prisma.SelectSubset<T, VehicularDispatchUpdateArgs<ExtArgs>>): Prisma.Prisma__VehicularDispatchClient<runtime.Types.Result.GetResult<Prisma.$VehicularDispatchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more VehicularDispatches.
     * @param {VehicularDispatchDeleteManyArgs} args - Arguments to filter VehicularDispatches to delete.
     * @example
     * // Delete a few VehicularDispatches
     * const { count } = await prisma.vehicularDispatch.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends VehicularDispatchDeleteManyArgs>(args?: Prisma.SelectSubset<T, VehicularDispatchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more VehicularDispatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicularDispatchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VehicularDispatches
     * const vehicularDispatch = await prisma.vehicularDispatch.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends VehicularDispatchUpdateManyArgs>(args: Prisma.SelectSubset<T, VehicularDispatchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more VehicularDispatches and returns the data updated in the database.
     * @param {VehicularDispatchUpdateManyAndReturnArgs} args - Arguments to update many VehicularDispatches.
     * @example
     * // Update many VehicularDispatches
     * const vehicularDispatch = await prisma.vehicularDispatch.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more VehicularDispatches and only return the `dispatch_id`
     * const vehicularDispatchWithDispatch_idOnly = await prisma.vehicularDispatch.updateManyAndReturn({
     *   select: { dispatch_id: true },
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
    updateManyAndReturn<T extends VehicularDispatchUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, VehicularDispatchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VehicularDispatchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one VehicularDispatch.
     * @param {VehicularDispatchUpsertArgs} args - Arguments to update or create a VehicularDispatch.
     * @example
     * // Update or create a VehicularDispatch
     * const vehicularDispatch = await prisma.vehicularDispatch.upsert({
     *   create: {
     *     // ... data to create a VehicularDispatch
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VehicularDispatch we want to update
     *   }
     * })
     */
    upsert<T extends VehicularDispatchUpsertArgs>(args: Prisma.SelectSubset<T, VehicularDispatchUpsertArgs<ExtArgs>>): Prisma.Prisma__VehicularDispatchClient<runtime.Types.Result.GetResult<Prisma.$VehicularDispatchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of VehicularDispatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicularDispatchCountArgs} args - Arguments to filter VehicularDispatches to count.
     * @example
     * // Count the number of VehicularDispatches
     * const count = await prisma.vehicularDispatch.count({
     *   where: {
     *     // ... the filter for the VehicularDispatches we want to count
     *   }
     * })
    **/
    count<T extends VehicularDispatchCountArgs>(args?: Prisma.Subset<T, VehicularDispatchCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], VehicularDispatchCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a VehicularDispatch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicularDispatchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VehicularDispatchAggregateArgs>(args: Prisma.Subset<T, VehicularDispatchAggregateArgs>): Prisma.PrismaPromise<GetVehicularDispatchAggregateType<T>>;
    /**
     * Group by VehicularDispatch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicularDispatchGroupByArgs} args - Group by arguments.
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
    groupBy<T extends VehicularDispatchGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: VehicularDispatchGroupByArgs['orderBy'];
    } : {
        orderBy?: VehicularDispatchGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, VehicularDispatchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVehicularDispatchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the VehicularDispatch model
     */
    readonly fields: VehicularDispatchFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for VehicularDispatch.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__VehicularDispatchClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    operation<T extends Prisma.VehicularDispatch$operationArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.VehicularDispatch$operationArgs<ExtArgs>>): Prisma.Prisma__OperationLogClient<runtime.Types.Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    patientLog<T extends Prisma.VehicularDispatch$patientLogArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.VehicularDispatch$patientLogArgs<ExtArgs>>): Prisma.Prisma__PatientLogClient<runtime.Types.Result.GetResult<Prisma.$PatientLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    vehicle<T extends Prisma.VehicularDispatch$vehicleArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.VehicularDispatch$vehicleArgs<ExtArgs>>): Prisma.Prisma__VehicleClient<runtime.Types.Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    driver<T extends Prisma.VehicularDispatch$driverArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.VehicularDispatch$driverArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    submitter<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    responders<T extends Prisma.VehicularDispatch$respondersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.VehicularDispatch$respondersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VehicularDispatchResponderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    passengers<T extends Prisma.VehicularDispatch$passengersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.VehicularDispatch$passengersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CivilianPassengerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the VehicularDispatch model
 */
export interface VehicularDispatchFieldRefs {
    readonly dispatch_id: Prisma.FieldRef<"VehicularDispatch", 'String'>;
    readonly operation_id: Prisma.FieldRef<"VehicularDispatch", 'String'>;
    readonly patient_log_id: Prisma.FieldRef<"VehicularDispatch", 'String'>;
    readonly dispatch_date: Prisma.FieldRef<"VehicularDispatch", 'DateTime'>;
    readonly submitted_by: Prisma.FieldRef<"VehicularDispatch", 'String'>;
    readonly vehicle_id: Prisma.FieldRef<"VehicularDispatch", 'String'>;
    readonly driver_id: Prisma.FieldRef<"VehicularDispatch", 'String'>;
    readonly depart_time: Prisma.FieldRef<"VehicularDispatch", 'DateTime'>;
    readonly arrival_time: Prisma.FieldRef<"VehicularDispatch", 'DateTime'>;
    readonly brgy_in_time: Prisma.FieldRef<"VehicularDispatch", 'DateTime'>;
    readonly brgy_out_time: Prisma.FieldRef<"VehicularDispatch", 'DateTime'>;
    readonly dispatch_type: Prisma.FieldRef<"VehicularDispatch", 'DispatchType'>;
    readonly from_location: Prisma.FieldRef<"VehicularDispatch", 'String'>;
    readonly to_location: Prisma.FieldRef<"VehicularDispatch", 'String'>;
    readonly odometer_in: Prisma.FieldRef<"VehicularDispatch", 'Int'>;
    readonly odometer_out: Prisma.FieldRef<"VehicularDispatch", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"VehicularDispatch", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"VehicularDispatch", 'DateTime'>;
}
/**
 * VehicularDispatch findUnique
 */
export type VehicularDispatchFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which VehicularDispatch to fetch.
     */
    where: Prisma.VehicularDispatchWhereUniqueInput;
};
/**
 * VehicularDispatch findUniqueOrThrow
 */
export type VehicularDispatchFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which VehicularDispatch to fetch.
     */
    where: Prisma.VehicularDispatchWhereUniqueInput;
};
/**
 * VehicularDispatch findFirst
 */
export type VehicularDispatchFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which VehicularDispatch to fetch.
     */
    where?: Prisma.VehicularDispatchWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VehicularDispatches to fetch.
     */
    orderBy?: Prisma.VehicularDispatchOrderByWithRelationInput | Prisma.VehicularDispatchOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for VehicularDispatches.
     */
    cursor?: Prisma.VehicularDispatchWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VehicularDispatches from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VehicularDispatches.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of VehicularDispatches.
     */
    distinct?: Prisma.VehicularDispatchScalarFieldEnum | Prisma.VehicularDispatchScalarFieldEnum[];
};
/**
 * VehicularDispatch findFirstOrThrow
 */
export type VehicularDispatchFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which VehicularDispatch to fetch.
     */
    where?: Prisma.VehicularDispatchWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VehicularDispatches to fetch.
     */
    orderBy?: Prisma.VehicularDispatchOrderByWithRelationInput | Prisma.VehicularDispatchOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for VehicularDispatches.
     */
    cursor?: Prisma.VehicularDispatchWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VehicularDispatches from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VehicularDispatches.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of VehicularDispatches.
     */
    distinct?: Prisma.VehicularDispatchScalarFieldEnum | Prisma.VehicularDispatchScalarFieldEnum[];
};
/**
 * VehicularDispatch findMany
 */
export type VehicularDispatchFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which VehicularDispatches to fetch.
     */
    where?: Prisma.VehicularDispatchWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VehicularDispatches to fetch.
     */
    orderBy?: Prisma.VehicularDispatchOrderByWithRelationInput | Prisma.VehicularDispatchOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing VehicularDispatches.
     */
    cursor?: Prisma.VehicularDispatchWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VehicularDispatches from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VehicularDispatches.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of VehicularDispatches.
     */
    distinct?: Prisma.VehicularDispatchScalarFieldEnum | Prisma.VehicularDispatchScalarFieldEnum[];
};
/**
 * VehicularDispatch create
 */
export type VehicularDispatchCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a VehicularDispatch.
     */
    data: Prisma.XOR<Prisma.VehicularDispatchCreateInput, Prisma.VehicularDispatchUncheckedCreateInput>;
};
/**
 * VehicularDispatch createMany
 */
export type VehicularDispatchCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many VehicularDispatches.
     */
    data: Prisma.VehicularDispatchCreateManyInput | Prisma.VehicularDispatchCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * VehicularDispatch createManyAndReturn
 */
export type VehicularDispatchCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicularDispatch
     */
    select?: Prisma.VehicularDispatchSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the VehicularDispatch
     */
    omit?: Prisma.VehicularDispatchOmit<ExtArgs> | null;
    /**
     * The data used to create many VehicularDispatches.
     */
    data: Prisma.VehicularDispatchCreateManyInput | Prisma.VehicularDispatchCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VehicularDispatchIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * VehicularDispatch update
 */
export type VehicularDispatchUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a VehicularDispatch.
     */
    data: Prisma.XOR<Prisma.VehicularDispatchUpdateInput, Prisma.VehicularDispatchUncheckedUpdateInput>;
    /**
     * Choose, which VehicularDispatch to update.
     */
    where: Prisma.VehicularDispatchWhereUniqueInput;
};
/**
 * VehicularDispatch updateMany
 */
export type VehicularDispatchUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update VehicularDispatches.
     */
    data: Prisma.XOR<Prisma.VehicularDispatchUpdateManyMutationInput, Prisma.VehicularDispatchUncheckedUpdateManyInput>;
    /**
     * Filter which VehicularDispatches to update
     */
    where?: Prisma.VehicularDispatchWhereInput;
    /**
     * Limit how many VehicularDispatches to update.
     */
    limit?: number;
};
/**
 * VehicularDispatch updateManyAndReturn
 */
export type VehicularDispatchUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicularDispatch
     */
    select?: Prisma.VehicularDispatchSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the VehicularDispatch
     */
    omit?: Prisma.VehicularDispatchOmit<ExtArgs> | null;
    /**
     * The data used to update VehicularDispatches.
     */
    data: Prisma.XOR<Prisma.VehicularDispatchUpdateManyMutationInput, Prisma.VehicularDispatchUncheckedUpdateManyInput>;
    /**
     * Filter which VehicularDispatches to update
     */
    where?: Prisma.VehicularDispatchWhereInput;
    /**
     * Limit how many VehicularDispatches to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VehicularDispatchIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * VehicularDispatch upsert
 */
export type VehicularDispatchUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the VehicularDispatch to update in case it exists.
     */
    where: Prisma.VehicularDispatchWhereUniqueInput;
    /**
     * In case the VehicularDispatch found by the `where` argument doesn't exist, create a new VehicularDispatch with this data.
     */
    create: Prisma.XOR<Prisma.VehicularDispatchCreateInput, Prisma.VehicularDispatchUncheckedCreateInput>;
    /**
     * In case the VehicularDispatch was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.VehicularDispatchUpdateInput, Prisma.VehicularDispatchUncheckedUpdateInput>;
};
/**
 * VehicularDispatch delete
 */
export type VehicularDispatchDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which VehicularDispatch to delete.
     */
    where: Prisma.VehicularDispatchWhereUniqueInput;
};
/**
 * VehicularDispatch deleteMany
 */
export type VehicularDispatchDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which VehicularDispatches to delete
     */
    where?: Prisma.VehicularDispatchWhereInput;
    /**
     * Limit how many VehicularDispatches to delete.
     */
    limit?: number;
};
/**
 * VehicularDispatch.operation
 */
export type VehicularDispatch$operationArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLog
     */
    select?: Prisma.OperationLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OperationLog
     */
    omit?: Prisma.OperationLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OperationLogInclude<ExtArgs> | null;
    where?: Prisma.OperationLogWhereInput;
};
/**
 * VehicularDispatch.patientLog
 */
export type VehicularDispatch$patientLogArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
/**
 * VehicularDispatch.vehicle
 */
export type VehicularDispatch$vehicleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: Prisma.VehicleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: Prisma.VehicleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VehicleInclude<ExtArgs> | null;
    where?: Prisma.VehicleWhereInput;
};
/**
 * VehicularDispatch.driver
 */
export type VehicularDispatch$driverArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
/**
 * VehicularDispatch.responders
 */
export type VehicularDispatch$respondersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicularDispatchResponder
     */
    select?: Prisma.VehicularDispatchResponderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VehicularDispatchResponder
     */
    omit?: Prisma.VehicularDispatchResponderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VehicularDispatchResponderInclude<ExtArgs> | null;
    where?: Prisma.VehicularDispatchResponderWhereInput;
    orderBy?: Prisma.VehicularDispatchResponderOrderByWithRelationInput | Prisma.VehicularDispatchResponderOrderByWithRelationInput[];
    cursor?: Prisma.VehicularDispatchResponderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VehicularDispatchResponderScalarFieldEnum | Prisma.VehicularDispatchResponderScalarFieldEnum[];
};
/**
 * VehicularDispatch.passengers
 */
export type VehicularDispatch$passengersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.CivilianPassengerWhereInput;
    orderBy?: Prisma.CivilianPassengerOrderByWithRelationInput | Prisma.CivilianPassengerOrderByWithRelationInput[];
    cursor?: Prisma.CivilianPassengerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CivilianPassengerScalarFieldEnum | Prisma.CivilianPassengerScalarFieldEnum[];
};
/**
 * VehicularDispatch without action
 */
export type VehicularDispatchDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=VehicularDispatch.d.ts.map