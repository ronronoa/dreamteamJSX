import type { UserProfileData } from "@/api/profile";

export const ROLE_LABELS = {
  SUPER_ADMIN: "Super Admin",
  DEPARTMENT_HEAD: "Department Head",
  DEPUTY: "Deputy",
  TEAM_LEADER: "Team Leader",
  MEMBER: "Member",
} as const;

export const MAX_PROFILE_PHOTO_SIZE = 5 * 1024 * 1024;
export const PROFILE_PHOTO_TYPES = ["image/jpeg", "image/png"];
export const CARD_CLASS = "rounded-2xl border border-gray-600 bg-white";

export interface ProfileForm {
  name: string;
  username: string;
  email: string;
  phone: string;
}

export const EMPTY_PROFILE_FORM: ProfileForm = {
  name: "",
  username: "",
  email: "",
  phone: "",
};

export function toForm(profile: UserProfileData): ProfileForm {
  return {
    name: profile.name,
    username: profile.username,
    email: profile.email ?? "",
    phone: profile.phone ?? "",
  };
}

