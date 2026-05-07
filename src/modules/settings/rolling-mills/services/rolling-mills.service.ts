import type { RollingMill } from "@/modules/settings/rolling-mills/interfaces/rolling-mill.interface";
import type { CreateRollingMillPayload } from "@/modules/settings/rolling-mills/schemas/rolling-mill-create.schema";

import { ApiClient } from "@/lib/api-client";
import { ApiService } from "@/shared/services/api.service";

const ROLLING_MILLS_SERVICE_BASE_PATH = "/rolling-mills" as const;

class RollingMillsService extends ApiService {
  async findAll() {
    const { data } = await ApiClient.get<RollingMill[]>(this.getPath());

    return data;
  }

  async create(payload: CreateRollingMillPayload) {
    const { data } = await ApiClient.post<RollingMill>(this.getPath(), payload);

    return data;
  }

  async update<T>(rollingMillId: string | undefined, payload: T) {
    if (!rollingMillId) throw new Error("RollingMill ID is required to update");

    const { data } = await ApiClient.patch<RollingMill>(
      this.getPath(`/${rollingMillId}`),
      payload,
    );

    return data;
  }

  async findOne(rollingMillId: string | undefined) {
    if (!rollingMillId) throw new Error("RollingMill ID is required to find one");

    const { data } = await ApiClient.get<RollingMill>(
      this.getPath(`/${rollingMillId}`),
    );

    return data;
  }

  async delete(rollingMillId: string | undefined) {
    if (!rollingMillId) throw new Error("RollingMill ID is required to delete");

    const { data } = await ApiClient.delete<RollingMill>(
      this.getPath(`/${rollingMillId}`),
    );

    return data;
  }
}

export default new RollingMillsService(ROLLING_MILLS_SERVICE_BASE_PATH);
