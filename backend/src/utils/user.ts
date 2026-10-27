import type { User } from "@/generated/prisma/client";

type UserWithTeam = User & {
  team?: { team_name: string } | null;
};

function getNameParts(name: string, middleInitial: string | null, suffix: string | null) {
  const nameParts = name.trim().split(/\s+/).filter(Boolean);
  const suffixIndex = nameParts.length - 1;
  if (suffix && nameParts[suffixIndex]?.toLowerCase() === suffix.toLowerCase()) {
    nameParts.pop();
  }

  const middleNamePart = nameParts[1]?.replace(/\.$/, "");
  if (middleInitial && middleNamePart?.toLowerCase() === middleInitial.toLowerCase()) {
    nameParts.splice(1, 1);
  }

  return {
    firstName: nameParts[0] ?? "",
    lastName: nameParts.slice(1).join(" "),
  };
}

export function toSafeUser(user: UserWithTeam) {
  const fallbackNameParts = getNameParts(user.name, user.middleInitial, user.suffix);
  const firstName = user.firstName?.trim();
  const lastName = user.lastName?.trim();

  return {
    id: user.user_id,
    name: user.name,
    firstName: firstName || fallbackNameParts.firstName,
    lastName: lastName || fallbackNameParts.lastName,
    middleInitial: user.middleInitial,
    suffix: user.suffix,
    username: user.username,
    email: user.email,
    role: user.role,
    phone: user.phone,
    team_id: user.team_id,
    team_name: user.team?.team_name ?? null,
    profileImageUrl: user.profileImageUrl,
    isActive: user.isActive,
    mustChangePassword: user.mustChangePassword,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
