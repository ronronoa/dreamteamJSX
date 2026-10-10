import type { User } from "@/generated/prisma/client";

export function toSafeUser(user: User) {
  return {
    id: user.user_id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
    phone: user.phone,
    profileImageUrl: user.profileImageUrl,
    isActive: user.isActive,
    team_id: user.team_id,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
