import type { User } from "@/modules/security/users/interfaces/user.interface";

export interface AuthLoginResponse {
  accessToken: string;
  user: User;
}
