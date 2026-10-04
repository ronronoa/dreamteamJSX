export type Role =
| "SUPER_ADMIN"
| "DEPARTMENT_HEAD"
| "DEPUTY"
| "TEAM_LEADER"
| "MEMBER";

export interface ManagedUser {
  id: string;
  accountHolder: string;
  info: string;
  role: string;
  team: string;
  contact: string;
  status: "Active" | "Inactive";
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
    role: Role;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
}
