import { ApiClient } from "@/lib/api-client";
import { CrudService } from "@/shared/services";
import type { Calibration, CalibrationResult } from "@/modules/calibrations/interfaces";
import type { CalibrationInputPayload, CreateCalibrationPayload } from "@/modules/calibrations/schemas";

class CalibrationsServiceClass extends CrudService<Calibration, CreateCalibrationPayload> {
  async calculate(payload: CalibrationInputPayload): Promise<CalibrationResult> {
    const { data } = await ApiClient.post<CalibrationResult>(
      this.getPath("/calculate"),
      payload,
    );
    return data;
  }
}

export const CalibrationsService = new CalibrationsServiceClass("/calibrations");
