import { ApiClient } from "@/lib/api-client";
import type { Role } from "@/modules/security/roles/interfaces/role.interface";
import type { CreateRolePayload } from "@/modules/security/roles/schemas/create-role.schema";
import type {
  SearchParams,
  SearchResponse,
} from "@/shared/interfaces/search-params.interface";
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

  async search(params: SearchParams<Role>) {
    const { data } = await ApiClient.post<SearchResponse<Role>>(
      this.getPath("/search"),
      params,
    );

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

    await ApiClient.post(this.getPath(`/${roleId}/activate`));
  }

  async deactivate(roleId: string | undefined) {
    if (!roleId) throw new Error("Role ID is required to deactivate");

    await ApiClient.post(this.getPath(`/${roleId}/deactivate`));
  }
}

export default new RolesService(ROLES_SERVICE_BASE_PATH);
