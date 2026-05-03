import type { Material } from "@/modules/settings/materials/interfaces/material.interface";
import type { CreateMaterialPayload } from "@/modules/settings/materials/schemas/material-create.schema";

import { ApiClient } from "@/lib/api-client";
import { ApiService } from "@/shared/services/api.service";

const MATERIALS_SERVICE_BASE_PATH = "/materials" as const;

class MaterialsService extends ApiService {
  async findAll() {
    const { data } = await ApiClient.get<Material[]>(this.getPath());

    return data;
  }

  async create(payload: CreateMaterialPayload) {
    const { data } = await ApiClient.post<Material>(this.getPath(), payload);

    return data;
  }

  async update<T>(materialId: string | undefined, payload: T) {
    if (!materialId) throw new Error("Material ID is required to update");

    const { data } = await ApiClient.patch<Material>(
      this.getPath(`/${materialId}`),
      payload,
    );

    return data;
  }

  async findOne(materialId: string | undefined) {
    if (!materialId) throw new Error("Material ID is required to find one");

    const { data } = await ApiClient.get<Material>(
      this.getPath(`/${materialId}`),
    );

    return data;
  }

  async delete(materialId: string | undefined) {
    if (!materialId) throw new Error("Material ID is required to delete");

    const { data } = await ApiClient.delete<Material>(
      this.getPath(`/${materialId}`),
    );

    return data;
  }
}

export default new MaterialsService(MATERIALS_SERVICE_BASE_PATH);
