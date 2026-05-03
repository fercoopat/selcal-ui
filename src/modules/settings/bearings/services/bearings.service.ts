import { ApiClient } from "@/lib/api-client";
import type { Bearing } from "@/modules/settings/bearings/interfaces/bearing.interface";
import type { CreateBearingPayload } from "@/modules/settings/bearings/schemas/bearings-create.schema";
import { ApiService } from "@/shared/services/api.service";

const BEARINGS_SERVICE_BASE_PATH = "/bearings" as const;

class BearingsService extends ApiService {
  async findAll() {
    const { data } = await ApiClient.get<Bearing[]>(this.getPath());
    return data;
  }

  async create(payload: CreateBearingPayload) {
    const { data } = await ApiClient.post<Bearing>(this.getPath(), payload);
    return data;
  }

  async update<T>(id: string | undefined, payload: T) {
    if (!id) throw new Error("ID is required to update");
    const { data } = await ApiClient.patch<Bearing>(
      this.getPath(`/${id}`),
      payload,
    );
    return data;
  }

  async findOne(id: string | undefined) {
    if (!id) throw new Error("ID is required to find one");
    const { data } = await ApiClient.get<Bearing>(this.getPath(`/${id}`));
    return data;
  }

  async delete(id: string | undefined) {
    if (!id) throw new Error("ID is required to delete");
    const { data } = await ApiClient.delete<Bearing>(this.getPath(`/${id}`));
    return data;
  }
}

export default new BearingsService(BEARINGS_SERVICE_BASE_PATH);
