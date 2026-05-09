import type { Stand } from "@/modules/settings/stands/interfaces/stand.interface";
import type { CreateStandPayload } from "@/modules/settings/stands/schemas/stand-create.schema";

import { ApiClient } from "@/lib/api-client";
import { ApiService } from "@/shared/services/api.service";

const STANDS_SERVICE_BASE_PATH = "/stands" as const;

class StandsService extends ApiService {
  async findAll() {
    const { data } = await ApiClient.get<Stand[]>(this.getPath());

    return data;
  }

  async create(payload: CreateStandPayload) {
    const { data } = await ApiClient.post<Stand>(this.getPath(), payload);

    return data;
  }

  async update<T>(standId: string | undefined, payload: T) {
    if (!standId) throw new Error("Stand ID is required to update");

    const { data } = await ApiClient.patch<Stand>(
      this.getPath(`/${standId}`),
      payload,
    );

    return data;
  }

  async findOne(standId: string | undefined) {
    if (!standId) throw new Error("Stand ID is required to find one");

    const { data } = await ApiClient.get<Stand>(this.getPath(`/${standId}`));

    return data;
  }

  async delete(standId: string | undefined) {
    if (!standId) throw new Error("Stand ID is required to delete");

    const { data } = await ApiClient.delete<Stand>(this.getPath(`/${standId}`));

    return data;
  }
}

export default new StandsService(STANDS_SERVICE_BASE_PATH);
