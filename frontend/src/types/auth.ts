export type Role =
| "SUPER_ADMIN"
| "DEPARTMENT_HEAD"
| "DEPUTY"
| "TEAM_LEADER"
| "MEMBER";

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
