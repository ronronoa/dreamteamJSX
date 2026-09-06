// temporary stuff
// TODO: change later to match backend
export interface UserSession {
  userId: string;
  userName: string;
  email: string;
  role: 'DEPARTMENT_HEAD' | 'DEPUTY' | 'TEAM_LEADER' | 'MEMBER'
}
