import { ApiClient } from "@/lib/api-client";
import type { Roller } from "@/modules/settings/rollers/interfaces/roller.interface";
import type { CreateRollerPayload } from "@/modules/settings/rollers/schemas/rollers-create.schema";
import { ApiService } from "@/shared/services/api.service";

const ROLLERS_SERVICE_BASE_PATH = "/rollers" as const;

class RollersService extends ApiService {
  async findAll() {
    const { data } = await ApiClient.get<Roller[]>(this.getPath());
    return data;
  }

  async create(payload: CreateRollerPayload) {
    const { data } = await ApiClient.post<Roller>(this.getPath(), payload);
    return data;
  }

  async update<T>(id: string | undefined, payload: T) {
    if (!id) throw new Error("ID is required to update");
    const { data } = await ApiClient.patch<Roller>(
      this.getPath(`/${id}`),
      payload,
    );
    return data;
  }

  async findOne(id: string | undefined) {
    if (!id) throw new Error("ID is required to find one");
    const { data } = await ApiClient.get<Roller>(this.getPath(`/${id}`));
    return data;
  }

  async delete(id: string | undefined) {
    if (!id) throw new Error("ID is required to delete");
    const { data } = await ApiClient.delete<Roller>(this.getPath(`/${id}`));
    return data;
  }
}

export default new RollersService(ROLLERS_SERVICE_BASE_PATH);