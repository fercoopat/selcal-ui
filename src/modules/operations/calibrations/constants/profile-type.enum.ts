export const PROFILE_TYPE = {
  ROUND: "ROUND",
  SQUARE: "SQUARE",
  HEXAGONAL: "HEXAGONAL",
} as const;

export type ProfileType = (typeof PROFILE_TYPE)[keyof typeof PROFILE_TYPE];
