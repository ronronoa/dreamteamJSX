import type { SetPinInput, VerifyPinInput } from "@/types/pin.types";
export declare const pinService: {
    setPin(userId: string, data: SetPinInput): Promise<{
        success: boolean;
    }>;
    verifyPin(userId: string, data: VerifyPinInput): Promise<{
        valid: boolean;
    }>;
};
//# sourceMappingURL=pin.service.d.ts.map