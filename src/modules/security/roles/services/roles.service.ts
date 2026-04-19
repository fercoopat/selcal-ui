import { ApiClient } from "@/lib/api-client";
import type { Role } from "@/modules/security/roles/interfaces/role.interface";
import type { CreateRolePayload } from "@/modules/security/roles/schemas/role-create.schema";
import { ApiService } from "@/shared/services/api.service";

const ROLES_SERVICE_BASE_PATH = "/security/roles" as const;

class RolesService extends ApiService {
  async create(payload: CreateRolePayload) {
    const { data } = await ApiClient.post<Role>(this.getPath(), payload);

    return data;
  }

  async findAll() {
    const { data } = await ApiClient.get<Role[]>(this.getPath());

    return data;
  }

  async findOne(roleId: string | undefined) {
    if (!roleId) throw new Error("Role ID is required to find one");

    const { data } = await ApiClient.get<Role>(this.getPath(`/${roleId}`));

    return data;
  }

  async update(
    roleId: string | undefined,
    payload: Partial<CreateRolePayload>,
  ) {
    if (!roleId) throw new Error("Role ID is required to update");

    const { data } = await ApiClient.patch<Role>(
      this.getPath(`/${roleId}`),
      payload,
    );

    return data;
  }

  async activate(roleId: string | undefined) {
    if (!roleId) throw new Error("Role ID is required to activate");

    const { data } = await ApiClient.post<Role>(
      this.getPath(`/${roleId}/activate`),
    );

    return data;
  }

  async deactivate(roleId: string | undefined) {
    if (!roleId) throw new Error("Role ID is required to deactivate");

    const { data } = await ApiClient.post<Role>(
      this.getPath(`/${roleId}/deactivate`),
    );

    return data;
  }

  async delete(roleId: string | undefined) {
    if (!roleId) throw new Error("Role ID is required to delete");

    const { data } = await ApiClient.delete<Role>(this.getPath(`/${roleId}`));

    return data;
  }
}

export default new RolesService(ROLES_SERVICE_BASE_PATH);
