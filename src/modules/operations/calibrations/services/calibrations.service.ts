import { ApiClient } from "@/lib/api-client";
import type { Calibration } from "@/modules/operations/calibrations/interfaces/calibration.interface";
import type { CreateCalibrationPayload } from "@/modules/operations/calibrations/schemas/calibration-create.schema";
import { ApiService } from "@/shared/services/api.service";

const CALIBRATIONS_SERVICE_BASE_PATH = "/calibrations" as const;

class CalibrationsService extends ApiService {
  async findAll() {
    const { data } = await ApiClient.get<Calibration[]>(this.getPath());
    return data;
  }

  async findOne(id: string | undefined) {
    if (!id) throw new Error("ID is required to find one");
    const { data } = await ApiClient.get<Calibration>(this.getPath(`/${id}`));
    return data;
  }

  async create(payload: CreateCalibrationPayload) {
    const { data } = await ApiClient.post<Calibration>(this.getPath(), payload);
    return data;
  }

  async update<T>(id: string | undefined, payload: T) {
    if (!id) throw new Error("ID is required to update");
    const { data } = await ApiClient.patch<Calibration>(
      this.getPath(`/${id}`),
      payload,
    );
    return data;
  }

  async delete(id: string | undefined) {
    if (!id) throw new Error("ID is required to delete");
    const { data } = await ApiClient.delete<Calibration>(
      this.getPath(`/${id}`),
    );
    return data;
  }
}

export default new CalibrationsService(CALIBRATIONS_SERVICE_BASE_PATH);
