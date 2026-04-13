import {
  HEXAGONAL_PROFILES,
  ROUND_PROFILES,
  SQUARE_PROFILES,
  STEEL_GRADES,
} from "../constants/profiles";
import type { ProfileType, SteelGrade } from "@/modules/calibrations/interfaces";

/**
 * Service for material and profile data
 */
class MaterialsServiceClass {
  /**
   * Get all available steel grades
   */
  getSteelGrades(): SteelGrade[] {
    return Object.keys(STEEL_GRADES) as SteelGrade[];
  }

  /**
   * Get steel grade properties
   */
  getSteelGradeProperties(grade: SteelGrade) {
    return STEEL_GRADES[grade];
  }

  /**
   * Get round profiles
   */
  getRoundProfiles() {
    return ROUND_PROFILES;
  }

  /**
   * Get square profiles
   */
  getSquareProfiles() {
    return SQUARE_PROFILES;
  }

  /**
   * Get hexagonal profiles
   */
  getHexagonalProfiles() {
    return HEXAGONAL_PROFILES;
  }

  /**
   * Get profiles by type
   */
  getProfilesByType(type: ProfileType) {
    switch (type) {
      case "round":
        return this.getRoundProfiles();
      case "square":
        return this.getSquareProfiles();
      case "hexagonal":
        return this.getHexagonalProfiles();
    }
  }

  /**
   * Calculate area for a profile
   */
  calculateProfileArea(
    type: ProfileType,
    dimension: number,
  ): number {
    switch (type) {
      case "round": {
        const profile = ROUND_PROFILES.find((p) => p.diameter === dimension);
        if (!profile) return 0;
        return Math.PI * Math.pow(dimension / 2, 2);
      }
      case "square": {
        const profile = SQUARE_PROFILES.find((p) => p.side === dimension);
        if (!profile) return 0;
        return Math.pow(dimension, 2);
      }
      case "hexagonal": {
        const profile = HEXAGONAL_PROFILES.find(
          (p: { flatDistance: number; label: string }) => p.flatDistance === dimension,
        );
        if (!profile) return 0;
        return (Math.sqrt(3) / 2) * Math.pow(dimension, 2);
      }
    }
  }
}

const MaterialsService = new MaterialsServiceClass();
export { MaterialsService };
export default MaterialsService;
