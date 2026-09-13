import * as $Enums from "./enums";
import type * as Prisma from "./internal/prismaNamespace";
export type StringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null;
};
export type IntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
};
export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | Prisma.EnumRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRoleFilter<$PrismaModel> | $Enums.Role;
};
export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type SortOrderInput = {
    sort: Prisma.SortOrder;
    nulls?: Prisma.NullsOrder;
};
export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedIntFilter<$PrismaModel>;
    _max?: Prisma.NestedIntFilter<$PrismaModel>;
};
export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
};
export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | Prisma.EnumRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumRoleFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumRoleFilter<$PrismaModel>;
};
export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type EnumOperationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OperationStatus | Prisma.EnumOperationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OperationStatus[] | Prisma.ListEnumOperationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OperationStatus[] | Prisma.ListEnumOperationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOperationStatusFilter<$PrismaModel> | $Enums.OperationStatus;
};
export type EnumOperationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OperationStatus | Prisma.EnumOperationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OperationStatus[] | Prisma.ListEnumOperationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OperationStatus[] | Prisma.ListEnumOperationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOperationStatusWithAggregatesFilter<$PrismaModel> | $Enums.OperationStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumOperationStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumOperationStatusFilter<$PrismaModel>;
};
export type EnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | Prisma.EnumGenderFieldRefInput<$PrismaModel>;
    in?: $Enums.Gender[] | Prisma.ListEnumGenderFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Gender[] | Prisma.ListEnumGenderFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender;
};
export type EnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | Prisma.EnumGenderFieldRefInput<$PrismaModel>;
    in?: $Enums.Gender[] | Prisma.ListEnumGenderFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Gender[] | Prisma.ListEnumGenderFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumGenderFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumGenderFilter<$PrismaModel>;
};
export type EnumVehicleStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleStatus | Prisma.EnumVehicleStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.VehicleStatus[] | Prisma.ListEnumVehicleStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.VehicleStatus[] | Prisma.ListEnumVehicleStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumVehicleStatusFilter<$PrismaModel> | $Enums.VehicleStatus;
};
export type EnumVehicleStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleStatus | Prisma.EnumVehicleStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.VehicleStatus[] | Prisma.ListEnumVehicleStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.VehicleStatus[] | Prisma.ListEnumVehicleStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumVehicleStatusWithAggregatesFilter<$PrismaModel> | $Enums.VehicleStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumVehicleStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumVehicleStatusFilter<$PrismaModel>;
};
export type EnumInventoryTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.InventoryTransactionType | Prisma.EnumInventoryTransactionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.InventoryTransactionType[] | Prisma.ListEnumInventoryTransactionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InventoryTransactionType[] | Prisma.ListEnumInventoryTransactionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInventoryTransactionTypeFilter<$PrismaModel> | $Enums.InventoryTransactionType;
};
export type EnumInventoryTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InventoryTransactionType | Prisma.EnumInventoryTransactionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.InventoryTransactionType[] | Prisma.ListEnumInventoryTransactionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InventoryTransactionType[] | Prisma.ListEnumInventoryTransactionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInventoryTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.InventoryTransactionType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumInventoryTransactionTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumInventoryTransactionTypeFilter<$PrismaModel>;
};
export type EnumPatientRequestTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PatientRequestType | Prisma.EnumPatientRequestTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.PatientRequestType[] | Prisma.ListEnumPatientRequestTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PatientRequestType[] | Prisma.ListEnumPatientRequestTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPatientRequestTypeFilter<$PrismaModel> | $Enums.PatientRequestType;
};
export type EnumPatientRequestTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PatientRequestType | Prisma.EnumPatientRequestTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.PatientRequestType[] | Prisma.ListEnumPatientRequestTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PatientRequestType[] | Prisma.ListEnumPatientRequestTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPatientRequestTypeWithAggregatesFilter<$PrismaModel> | $Enums.PatientRequestType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPatientRequestTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPatientRequestTypeFilter<$PrismaModel>;
};
export type EnumDispatchTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.DispatchType | Prisma.EnumDispatchTypeFieldRefInput<$PrismaModel> | null;
    in?: $Enums.DispatchType[] | Prisma.ListEnumDispatchTypeFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.DispatchType[] | Prisma.ListEnumDispatchTypeFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumDispatchTypeNullableFilter<$PrismaModel> | $Enums.DispatchType | null;
};
export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableFilter<$PrismaModel> | number | null;
};
export type EnumDispatchTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DispatchType | Prisma.EnumDispatchTypeFieldRefInput<$PrismaModel> | null;
    in?: $Enums.DispatchType[] | Prisma.ListEnumDispatchTypeFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.DispatchType[] | Prisma.ListEnumDispatchTypeFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumDispatchTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.DispatchType | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDispatchTypeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDispatchTypeNullableFilter<$PrismaModel>;
};
export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedIntNullableFilter<$PrismaModel>;
};
export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null;
};
export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
};
export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | Prisma.EnumRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRoleFilter<$PrismaModel> | $Enums.Role;
};
export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableFilter<$PrismaModel> | number | null;
};
export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedIntFilter<$PrismaModel>;
    _max?: Prisma.NestedIntFilter<$PrismaModel>;
};
export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatFilter<$PrismaModel> | number;
};
export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
};
export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | Prisma.EnumRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumRoleFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumRoleFilter<$PrismaModel>;
};
export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type NestedEnumOperationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OperationStatus | Prisma.EnumOperationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OperationStatus[] | Prisma.ListEnumOperationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OperationStatus[] | Prisma.ListEnumOperationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOperationStatusFilter<$PrismaModel> | $Enums.OperationStatus;
};
export type NestedEnumOperationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OperationStatus | Prisma.EnumOperationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OperationStatus[] | Prisma.ListEnumOperationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OperationStatus[] | Prisma.ListEnumOperationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOperationStatusWithAggregatesFilter<$PrismaModel> | $Enums.OperationStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumOperationStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumOperationStatusFilter<$PrismaModel>;
};
export type NestedEnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | Prisma.EnumGenderFieldRefInput<$PrismaModel>;
    in?: $Enums.Gender[] | Prisma.ListEnumGenderFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Gender[] | Prisma.ListEnumGenderFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender;
};
export type NestedEnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | Prisma.EnumGenderFieldRefInput<$PrismaModel>;
    in?: $Enums.Gender[] | Prisma.ListEnumGenderFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Gender[] | Prisma.ListEnumGenderFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumGenderFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumGenderFilter<$PrismaModel>;
};
export type NestedEnumVehicleStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleStatus | Prisma.EnumVehicleStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.VehicleStatus[] | Prisma.ListEnumVehicleStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.VehicleStatus[] | Prisma.ListEnumVehicleStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumVehicleStatusFilter<$PrismaModel> | $Enums.VehicleStatus;
};
export type NestedEnumVehicleStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleStatus | Prisma.EnumVehicleStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.VehicleStatus[] | Prisma.ListEnumVehicleStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.VehicleStatus[] | Prisma.ListEnumVehicleStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumVehicleStatusWithAggregatesFilter<$PrismaModel> | $Enums.VehicleStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumVehicleStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumVehicleStatusFilter<$PrismaModel>;
};
export type NestedEnumInventoryTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.InventoryTransactionType | Prisma.EnumInventoryTransactionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.InventoryTransactionType[] | Prisma.ListEnumInventoryTransactionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InventoryTransactionType[] | Prisma.ListEnumInventoryTransactionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInventoryTransactionTypeFilter<$PrismaModel> | $Enums.InventoryTransactionType;
};
export type NestedEnumInventoryTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InventoryTransactionType | Prisma.EnumInventoryTransactionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.InventoryTransactionType[] | Prisma.ListEnumInventoryTransactionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InventoryTransactionType[] | Prisma.ListEnumInventoryTransactionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInventoryTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.InventoryTransactionType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumInventoryTransactionTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumInventoryTransactionTypeFilter<$PrismaModel>;
};
export type NestedEnumPatientRequestTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PatientRequestType | Prisma.EnumPatientRequestTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.PatientRequestType[] | Prisma.ListEnumPatientRequestTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PatientRequestType[] | Prisma.ListEnumPatientRequestTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPatientRequestTypeFilter<$PrismaModel> | $Enums.PatientRequestType;
};
export type NestedEnumPatientRequestTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PatientRequestType | Prisma.EnumPatientRequestTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.PatientRequestType[] | Prisma.ListEnumPatientRequestTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PatientRequestType[] | Prisma.ListEnumPatientRequestTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPatientRequestTypeWithAggregatesFilter<$PrismaModel> | $Enums.PatientRequestType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPatientRequestTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPatientRequestTypeFilter<$PrismaModel>;
};
export type NestedEnumDispatchTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.DispatchType | Prisma.EnumDispatchTypeFieldRefInput<$PrismaModel> | null;
    in?: $Enums.DispatchType[] | Prisma.ListEnumDispatchTypeFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.DispatchType[] | Prisma.ListEnumDispatchTypeFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumDispatchTypeNullableFilter<$PrismaModel> | $Enums.DispatchType | null;
};
export type NestedEnumDispatchTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DispatchType | Prisma.EnumDispatchTypeFieldRefInput<$PrismaModel> | null;
    in?: $Enums.DispatchType[] | Prisma.ListEnumDispatchTypeFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.DispatchType[] | Prisma.ListEnumDispatchTypeFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumDispatchTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.DispatchType | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDispatchTypeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDispatchTypeNullableFilter<$PrismaModel>;
};
export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedIntNullableFilter<$PrismaModel>;
};
export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatNullableFilter<$PrismaModel> | number | null;
};
//# sourceMappingURL=commonInputTypes.d.ts.map