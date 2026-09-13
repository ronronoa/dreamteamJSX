import type { SignInInput, SignUpInput } from "@/types/auth.types";
export declare const authService: {
    signUp(data: SignUpInput): Promise<{
        user: {
            id: string;
            name: string;
            username: string;
            role: import("../generated/prisma/enums").Role;
            createdAt: Date;
            updatedAt: Date;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    signIn(data: SignInInput): Promise<{
        user: {
            id: string;
            name: string;
            username: string;
            role: import("../generated/prisma/enums").Role;
            createdAt: Date;
            updatedAt: Date;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(refreshToken: string): Promise<{
        user: {
            id: string;
            name: string;
            username: string;
            role: import("../generated/prisma/enums").Role;
            createdAt: Date;
            updatedAt: Date;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    logout(refreshToken?: string): Promise<void>;
};
//# sourceMappingURL=auth.service.d.ts.map