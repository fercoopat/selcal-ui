export const TIME_UNIT = {
  MILLISECONDS: "milliseconds",
  SECONDS: "seconds",
  MINUTES: "minutes",
  HOURS: "hours",
  DAYS: "days",
  WEEKS: "weeks",
  MONTHS: "months",
  YEARS: "years",
} as const;

export type TimeUnit = (typeof TIME_UNIT)[keyof typeof TIME_UNIT];

const TIME_CONVERSIONS = {
  [TIME_UNIT.MILLISECONDS]: 1,
  [TIME_UNIT.SECONDS]: 1000,
  [TIME_UNIT.MINUTES]: 1000 * 60,
  [TIME_UNIT.HOURS]: 1000 * 60 * 60,
  [TIME_UNIT.DAYS]: 1000 * 60 * 60 * 24,
  [TIME_UNIT.WEEKS]: 1000 * 60 * 60 * 24 * 7,
  [TIME_UNIT.MONTHS]: 1000 * 60 * 60 * 24 * 30, // Approximate
  [TIME_UNIT.YEARS]: 1000 * 60 * 60 * 24 * 365, // Approximate, not accounting for leap years
} as const;

/**
 * Converts a duration to milliseconds
 * @param value - The number of time units
 * @param unit - The unit of time to convert from (default: 'days')
 * @returns The duration in milliseconds
 *
 * @example
 * timeToMs(7) // 604800000 (7 days in ms)
 * timeToMs(1, TimeUnit.HOURS) // 3600000 (1 hour in ms)
 * timeToMs(6, TimeUnit.MONTHS) // 15552000000 (6 months in ms, approximate)
 */
export const timeToMs = (
  value: number,
  unit: TimeUnit = TIME_UNIT.DAYS,
): number => {
  return value * TIME_CONVERSIONS[unit];
};

/**
 * Predefined time durations in milliseconds
 */
export const TIME_IN_MS = {
  oneSecond: timeToMs(1, TIME_UNIT.SECONDS),
  oneMinute: timeToMs(1, TIME_UNIT.MINUTES),
  oneHour: timeToMs(1, TIME_UNIT.HOURS),
  oneDay: timeToMs(1, TIME_UNIT.DAYS),
  oneWeek: timeToMs(1, TIME_UNIT.WEEKS),
  oneMonth: timeToMs(1, TIME_UNIT.MONTHS),
  oneYear: timeToMs(1, TIME_UNIT.YEARS),
} as const;
