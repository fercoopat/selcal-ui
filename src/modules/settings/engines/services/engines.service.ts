import { ApiClient } from "@/lib/api-client";
import type { Engine } from "@/modules/settings/engines/interfaces/engine.interface";
import type { CreateEnginePayload } from "@/modules/settings/engines/schemas/engines-create.schema";
import { ApiService } from "@/shared/services/api.service";

const ENGINES_SERVICE_BASE_PATH = "/engines" as const;

class EnginesService extends ApiService {
  async findAll() {
    const { data } = await ApiClient.get<Engine[]>(this.getPath());
    return data;
  }

  async create(payload: CreateEnginePayload) {
    const { data } = await ApiClient.post<Engine>(this.getPath(), payload);
    return data;
  }

  async update<T>(id: string | undefined, payload: T) {
    if (!id) throw new Error("ID is required to update");
    const { data } = await ApiClient.patch<Engine>(
      this.getPath(`/${id}`),
      payload,
    );
    return data;
  }

  async findOne(id: string | undefined) {
    if (!id) throw new Error("ID is required to find one");
    const { data } = await ApiClient.get<Engine>(this.getPath(`/${id}`));
    return data;
  }

  async delete(id: string | undefined) {
    if (!id) throw new Error("ID is required to delete");
    const { data } = await ApiClient.delete<Engine>(this.getPath(`/${id}`));
    return data;
  }
}

export default new EnginesService(ENGINES_SERVICE_BASE_PATH);