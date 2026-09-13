import type { CreateUserInput, ResetPasswordInput, UpdateUserInput } from "@/types/user.types";
export declare const userService: {
    findAll(): Promise<{
        id: string;
        name: string;
        username: string;
        role: import("../generated/prisma/enums").Role;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findById(userId: string): Promise<{
        id: string;
        name: string;
        username: string;
        role: import("../generated/prisma/enums").Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(data: CreateUserInput): Promise<{
        id: string;
        name: string;
        username: string;
        role: import("../generated/prisma/enums").Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(userId: string, data: UpdateUserInput): Promise<{
        id: string;
        name: string;
        username: string;
        role: import("../generated/prisma/enums").Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    resetPassword(userId: string, data: ResetPasswordInput): Promise<{
        success: boolean;
    }>;
    delete(userId: string): Promise<{
        success: boolean;
    }>;
};
//# sourceMappingURL=user.service.d.ts.map