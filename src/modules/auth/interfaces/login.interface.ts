import type { User } from "@/modules/security/users/interfaces/user.interface";

export interface AuthLoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
