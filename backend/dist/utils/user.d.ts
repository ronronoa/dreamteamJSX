import type { User } from "@/generated/prisma/client";
export declare function toSafeUser(user: User): {
    id: string;
    name: string;
    username: string;
    role: import("@/generated/prisma/client").Role;
    createdAt: Date;
    updatedAt: Date;
};
//# sourceMappingURL=user.d.ts.map