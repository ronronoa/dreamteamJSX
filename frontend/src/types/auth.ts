export type Role =
| "SUPER_ADMIN"
| "DEPARTMENT_HEAD"
| "DEPUTY"
| "TEAM_LEADER"
| "MEMBER";

export interface ManagedUser {
  id: string;
  name: string;
  firstName?: string | null;
  lastName?: string | null;
  middleInitial?: string | null;
  suffix?: string | null;
  username: string;
  profileImageUrl: string | null;
  email: string | null;
  role: Role;
  phone: string | null;
  isActive: boolean;
  team_id: string | null;
  team_name: string | null;
  createdAt: string;
  updatedAt: string;
}

// export interface User {
//   id: string;
//   name: string;
//   username: string;
//   role: Role;
//   createdAt: string;
//   updatedAt: string;
// }
//
// export interface AuthSession {
//   accessToken: string;
// }

export interface UserSession {
  user: {
    mustChangePassword: boolean;
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    middleInitial: string | null;
    suffix: string | null;
    username: string;
    email: string | null;
    phone: string | null;
    team_id: string | null;
    team_name: string | null;
    profileImageUrl: string | null;
    isActive: boolean;
    role: Role;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
}
