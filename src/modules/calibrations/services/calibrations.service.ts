import { ApiClient } from "@/lib/api-client";
import type {
  CalibrationInput,
  CalibrationResult,
  SimulationComparison,
  SteelProfile,
} from "@/modules/calibrations/interfaces";
import type { CalibrationInputPayload } from "@/modules/calibrations/schemas";
import { ApiService } from "@/shared/services/api.service";
import { CALIBRATIONS_PATHS } from "../constants";

class CalibrationsServiceClass extends ApiService {
  /**
   * Calculate a complete calibration sequence
   */
  async calculate(payload: CalibrationInputPayload) {
    const { data } = await ApiClient.post<CalibrationResult>(
      CALIBRATIONS_PATHS.calculate,
      payload,
    );

    return data;
  }

  /**
   * Run a what-if simulation comparing baseline vs modified parameters
   */
  async simulate(payload: CalibrationInputPayload) {
    const { data } = await ApiClient.post<SimulationComparison>(
      CALIBRATIONS_PATHS.simulate,
      payload,
    );

    return data;
  }

  /**
   * Get available steel profiles (round, square, hexagonal)
   */
  async getProfiles() {
    const { data } = await ApiClient.get<SteelProfile[]>(
      CALIBRATIONS_PATHS.profiles,
    );

    return data;
  }

  /**
   * Get available steel grades/materials
   */
  async getMaterials() {
    const { data } = await ApiClient.get<string[]>(
      CALIBRATIONS_PATHS.materials,
    );

    return data;
  }

  /**
   * Save a calibration sequence
   */
  async save(payload: CalibrationInput) {
    const { data } = await ApiClient.post(
      this.getPath(),
      payload,
    );

    return data;
  }

  /**
   * Get all saved calibrations
   */
  async findAll() {
    const { data } = await ApiClient.get<CalibrationResult[]>(this.getPath());

    return data;
  }

  /**
   * Get a specific calibration by ID
   */
  async findOne(calibrationId: string) {
    const { data } = await ApiClient.get<CalibrationResult>(
      this.getPath(`/${calibrationId}`),
    );

    return data;
  }

  /**
   * Delete a calibration
   */
  async delete(calibrationId: string) {
    await ApiClient.delete(this.getPath(`/${calibrationId}`));
  }
}

const CalibrationsService = new CalibrationsServiceClass(CALIBRATIONS_PATHS.base);
export { CalibrationsService };
export default CalibrationsService;
