export type Role =
| "SUPER_ADMIN"
| "DEPARTMENT_HEAD"
| "DEPUTY"
| "TEAM_LEADER"
| "MEMBER";

export interface ManagedUser {
  id: string;
  name: string;
  username: string;
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
    id: string;
    name: string;
    username: string;
    email?: string | null;
    profileImageUrl?: string | null;
    role: Role;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
}
