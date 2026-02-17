import type { RequestConfig } from "@/config/api";
import { ApiClient } from "@/lib/api-client";
import type { AuthLoginResponse } from "@/modules/auth/interfaces/login.interface";
import type { LoginPayload } from "@/modules/auth/schemas/login.schema";
import type { User } from "@/modules/security/users/interfaces/user.interface";
import { ApiService } from "@/shared/services/api.service";

const AUTH_SERVICE_BASE_PATH = "/auth" as const;

class AuthService extends ApiService {
  async login(payload: LoginPayload, config?: RequestConfig) {
    const { data } = await ApiClient.post<AuthLoginResponse>(
      this.getPath("/login"),
      payload,
      config,
    );

    return data;
  }

  async getCurrentUser(config?: RequestConfig) {
    const { data } = await ApiClient.get<User>(this.getPath("/me"), config);

    return data;
  }

  logout() {
    return ApiClient.post<void>(this.getPath("/logout"));
  }

  refreshToken(refreshToken: string) {
    return ApiClient.post(this.getPath("/refresh"), { refreshToken });
  }

  verifyToken() {
    return ApiClient.get(this.getPath("/verify"));
  }
}

export default new AuthService(AUTH_SERVICE_BASE_PATH);
