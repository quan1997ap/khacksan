export interface AuthModel {
  employee: User;
  accessToken: string;
  refreshToken: string;
}

export class User {
  id?: number;
  name: string;
  code?: string;
  username?: string;
  department?: string;
  branch?: string;
  role?: string;
  status?: string;
  email?: string;
}
