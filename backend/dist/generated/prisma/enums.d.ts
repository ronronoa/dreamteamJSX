export declare const Role: {
    readonly SUPER_ADMIN: 'SUPER_ADMIN';
    readonly DEPARTMENT_HEAD: 'DEPARTMENT_HEAD';
    readonly DEPUTY: 'DEPUTY';
    readonly TEAM_LEADER: 'TEAM_LEADER';
    readonly MEMBER: 'MEMBER';
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const OperationStatus: {
    readonly PENDING: 'PENDING';
    readonly VALIDATED: 'VALIDATED';
    readonly REJECTED: 'REJECTED';
    readonly ARCHIVED: 'ARCHIVED';
};
export type OperationStatus = (typeof OperationStatus)[keyof typeof OperationStatus];
export declare const Gender: {
    readonly MALE: 'MALE';
    readonly FEMALE: 'FEMALE';
};
export type Gender = (typeof Gender)[keyof typeof Gender];
export declare const InventoryTransactionType: {
    readonly STOCK_IN: 'STOCK_IN';
    readonly STOCK_OUT: 'STOCK_OUT';
    readonly ADJUSTMENT: 'ADJUSTMENT';
};
export type InventoryTransactionType = (typeof InventoryTransactionType)[keyof typeof InventoryTransactionType];
export declare const VehicleStatus: {
    readonly AVAILABLE: 'AVAILABLE';
    readonly IN_USE: 'IN_USE';
    readonly MAINTENANCE: 'MAINTENANCE';
};
export type VehicleStatus = (typeof VehicleStatus)[keyof typeof VehicleStatus];
export declare const PatientRequestType: {
    readonly INTER_FACILITY_TRANSFER: 'INTER_FACILITY_TRANSFER';
    readonly PICK_UP: 'PICK_UP';
    readonly DROP_OFF: 'DROP_OFF';
};
export type PatientRequestType = (typeof PatientRequestType)[keyof typeof PatientRequestType];
export declare const DispatchType: {
    readonly DROP_OFF: 'DROP_OFF';
    readonly PICK_UP: 'PICK_UP';
};
export type DispatchType = (typeof DispatchType)[keyof typeof DispatchType];
//# sourceMappingURL=enums.d.ts.map