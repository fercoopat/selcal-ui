import type { MillType } from "@/modules/settings/mill-types/interfaces/mill-type.interface";
import type { CreateMillTypePayload } from "@/modules/settings/mill-types/schemas/mill-type-create.schema";

import { ApiClient } from "@/lib/api-client";
import { ApiService } from "@/shared/services/api.service";

const MILL_TYPES_SERVICE_BASE_PATH = "/mill-types" as const;

class MillTypesService extends ApiService {
  async findAll() {
    const { data } = await ApiClient.get<MillType[]>(this.getPath());

    return data;
  }

  async create(payload: CreateMillTypePayload) {
    const { data } = await ApiClient.post<MillType>(this.getPath(), payload);

    return data;
  }

  async update<T>(millTypeId: string | undefined, payload: T) {
    if (!millTypeId) throw new Error("MillType ID is required to update");

    const { data } = await ApiClient.patch<MillType>(
      this.getPath(`/${millTypeId}`),
      payload,
    );

    return data;
  }

  async findOne(millTypeId: string | undefined) {
    if (!millTypeId) throw new Error("MillType ID is required to find one");

    const { data } = await ApiClient.get<MillType>(
      this.getPath(`/${millTypeId}`),
    );

    return data;
  }

  async delete(millTypeId: string | undefined) {
    if (!millTypeId) throw new Error("MillType ID is required to delete");

    const { data } = await ApiClient.delete<MillType>(
      this.getPath(`/${millTypeId}`),
    );

    return data;
  }
}

export default new MillTypesService(MILL_TYPES_SERVICE_BASE_PATH);
