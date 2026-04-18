import { ApiClient } from "@/lib/api-client";
import type { User } from "@/modules/security/users/interfaces/user.interface";
import type { CreateUserPayload } from "@/modules/security/users/schemas/create-user.schema";
import type { UpdateUserPasswordPayload } from "@/modules/security/users/schemas/update-user-password.schema";
import { ApiService } from "@/shared/services/api.service";

const USERS_SERVICE_BASE_PATH = "/users" as const;

class UsersService extends ApiService {
  async findAll() {
    const { data } = await ApiClient.get<User[]>(this.getPath());

    return data;
  }

  async findPublic() {
    const { data } = await ApiClient.get<User[]>(this.getPath("/public"));

    return data;
  }

  async create(payload: CreateUserPayload) {
    const { data } = await ApiClient.post<User>(this.getPath(), payload);

    return data;
  }

  async update<T>(userId: string | undefined, payload: T) {
    if (!userId) throw new Error("User ID is required to update");

    const { data } = await ApiClient.patch<User>(
      this.getPath(`/${userId}`),
      payload,
    );

    return data;
  }

  async findOne(userId: string | undefined) {
    if (!userId) throw new Error("User ID is required to find one");

    const { data } = await ApiClient.get<User>(this.getPath(`/${userId}`));

    return data;
  }

  async delete(userId: string | undefined) {
    if (!userId) throw new Error("User ID is required to delete");

    const { data } = await ApiClient.delete<User>(this.getPath(`/${userId}`));

    return data;
  }

  async updatePassword(
    userId: string | undefined,
    payload: UpdateUserPasswordPayload,
  ) {
    if (!userId) throw new Error("User ID is required to update user password");

    const { data } = await ApiClient.patch<User>(
      this.getPath(`/${userId}/update-password`),
      payload,
    );

    return data;
  }

  async deactivate(userId: string | undefined) {
    if (!userId) throw new Error("User ID is required to deactivate");

    const { data } = await ApiClient.patch<User>(
      this.getPath(`/${userId}/deactivate`),
    );

    return data;
  }

  async findNonAdminUsers() {
    const { data } = await ApiClient.get<User[]>(this.getPath("/non-admins"));

    return data;
  }
}

export default new UsersService(USERS_SERVICE_BASE_PATH);
