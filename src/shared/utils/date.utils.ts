import type { FirstWeekContainsDate, Locale } from "date-fns";
import { format, formatDistance } from "date-fns";
import { enUS, es } from "date-fns/locale";

export const DATE_FORMAT = {
  // Formato ISO (para APIs y almacenamiento)
  ISO: "yyyy-MM-dd",
  ISO_FULL: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",

  // Formatos de date-fns estándar
  P: "P", // 04/29/2023
  PP: "PP", // Apr 29, 2023
  PPP: "PPP", // April 29th, 2023
  PPPP: "PPPP", // Saturday, April 29th, 2023
  p: "p", // 12:00 AM
  pp: "pp", // 12:00:00 AM
  ppp: "ppp", // 12:00:00 AM GMT+2
  pppp: "pppp", // 12:00:00 AM GMT+02:00
  Pp: "Pp", // 04/29/2023, 12:00 AM
  PPpp: "PPpp", // Apr 29, 2023, 12:00:00 AM
  PPPppp: "PPPppp", // April 29th, 2023 at 12:00:00 AM GMT+2
  PPPPpppp: "PPPPpppp", // Saturday, April 29th, 2023 at 12:00:00 AM GMT+02:00

  // Formatos cortos personalizados
  SHORT_DATE: "dd/MM/yyyy",
  SHORT_DATE_US: "MM/dd/yyyy",
  SHORT_DATE_DOTS: "dd.MM.yyyy",
  MEDIUM_DATE: "dd MMM yyyy",
  LONG_DATE: "dd MMMM yyyy",
  FULL_DATE: "EEEE, dd MMMM yyyy",

  // Formatos de tiempo
  SHORT_TIME: "HH:mm",
  MEDIUM_TIME: "HH:mm:ss",
  LONG_TIME: "HH:mm:ss z",
  FULL_TIME: "HH:mm:ss zzzz",
  TIME_ONLY: "HH:mm",
  TIME_WITH_SECONDS: "HH:mm:ss",

  // Formatos de fecha y hora
  SHORT_DATETIME: "dd/MM/yyyy HH:mm",
  SHORT_DATETIME_24H: "dd/MM/yyyy HH:mm:ss",
  MEDIUM_DATETIME: "dd MMM yyyy, HH:mm",
  LONG_DATETIME: "dd MMMM yyyy, HH:mm",
  FULL_DATETIME: "EEEE, dd MMMM yyyy, HH:mm",
  DATETIME: "dd/MM/yyyy HH:mm", // Alias para compatibilidad
  DATETIME_SECONDS: "dd/MM/yyyy HH:mm:ss",
  DATETIME_ISO: "yyyy-MM-dd'T'HH:mm:ss",

  // Formatos para estimaciones y duraciones
  HOURS_MINUTES: "HH[h] mm[m]",
  DURATION: "HH:mm:ss",

  // Formatos UI específicos
  UI_DATE: "dd/MM/yyyy",
  UI_DATETIME: "dd/MM/yyyy · HH:mm",
  UI_SHORT: "dd MMM",
  UI_MONTH_YEAR: "MMM yyyy",
  UI_YEAR: "yyyy",

  // Formato relativo
  RELATIVE: "relative",

  // Formatos para inputs
  INPUT_DATE: "yyyy-MM-dd",
  INPUT_DATETIME: "yyyy-MM-dd'T'HH:mm",
  INPUT_DATETIME_LOCAL: "yyyy-MM-dd'T'HH:mm:ss",
} as const;

export type DateFormat = (typeof DATE_FORMAT)[keyof typeof DATE_FORMAT];

const LOCALES: Record<string, Locale> = {
  en: enUS,
  es: es,
  // 'fr': fr,
  // 'de': de,
  // 'pt': pt,
};

// Helper para detectar si es formato YYYY-MM-DD (sin hora)
export const isDateOnlyString = (dateString: string): boolean => {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
};

// Helper para detectar si es formato ISO con hora
export const isISOString = (dateString: string): boolean => {
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(dateString);
};

// Función robusta para parsear fechas de cualquier formato
export const safeParseDate = (
  dateInput: Date | string | number | undefined | null,
): Date | null => {
  if (!dateInput) return null;

  // Si ya es un objeto Date válido
  if (dateInput instanceof Date && !isNaN(dateInput.getTime())) {
    return dateInput;
  }

  // Si es string
  if (typeof dateInput === "string") {
    // Si está vacío o solo espacios
    if (dateInput.trim() === "") return null;

    // Si es formato YYYY-MM-DD (sin hora)
    if (isDateOnlyString(dateInput)) {
      // Agregar hora 00:00:00 y timezone
      return new Date(`${dateInput}T00:00:00.000Z`);
    }

    // Si es formato ISO sin timezone, agregar Z
    if (isISOString(dateInput) && !dateInput.includes("Z")) {
      if (!dateInput.includes("+") && !dateInput.includes("-")) {
        return new Date(`${dateInput}Z`);
      }
    }

    // Intentar parsear normalmente
    const date = new Date(dateInput);
    return isNaN(date.getTime()) ? null : date;
  }

  // Si es número (timestamp)
  if (typeof dateInput === "number") {
    const date = new Date(dateInput);
    return isNaN(date.getTime()) ? null : date;
  }

  return null;
};

// Función principal para formatear fechas
export const formatDateValue = (
  date: Date | string | number | undefined | null,
  formatType: DateFormat = DATE_FORMAT.SHORT_DATE,
  options?: {
    locale?: Locale;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    firstWeekContainsDate?: FirstWeekContainsDate;
    useAdditionalWeekYearTokens?: boolean;
    useAdditionalDayOfYearTokens?: boolean;
  },
): string => {
  // Obtener locale del localStorage o usar español por defecto
  const language =
    typeof window !== "undefined"
      ? (window.localStorage.getItem("i18nextLng") ?? "es")
      : "es";

  const defaultLocale = LOCALES[language] || es;
  const locale = options?.locale || defaultLocale;

  // Parsear fecha de manera segura
  const dateValue = safeParseDate(date);

  if (!dateValue) return "-";

  // Si es formato relativo, usar formatDistance
  if (formatType === DATE_FORMAT.RELATIVE) {
    const now = new Date();

    // Si es hoy, mostrar hora
    const isToday = dateValue.toDateString() === now.toDateString();
    if (isToday) {
      return format(dateValue, DATE_FORMAT.SHORT_TIME, { locale });
    }

    // Si es ayer o mañana
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    if (dateValue.toDateString() === yesterday.toDateString()) {
      return locale.code === "es" ? "Ayer" : "Yesterday";
    }

    if (dateValue.toDateString() === tomorrow.toDateString()) {
      return locale.code === "es" ? "Mañana" : "Tomorrow";
    }

    // Para fechas recientes (última semana)
    const diffDays = Math.floor(
      (now.getTime() - dateValue.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (diffDays <= 7) {
      return formatDistance(dateValue, now, {
        locale,
        addSuffix: true,
      });
    }

    // Para fechas más antiguas, mostrar fecha normal
    return format(dateValue, DATE_FORMAT.MEDIUM_DATE, { locale });
  }

  // Formatear normalmente
  return format(dateValue, formatType, {
    locale,
    ...options,
  });
};

// Función específica para mostrar fecha y hora
export const formatDateTimeValue = (
  date: Date | string | number | undefined | null,
  showSeconds: boolean = false,
): string => {
  const formatType = showSeconds
    ? DATE_FORMAT.DATETIME_SECONDS
    : DATE_FORMAT.DATETIME;

  return formatDateValue(date, formatType);
};

// Función para mostrar solo hora
export const formatTimeValue = (
  date: Date | string | number | undefined | null,
  showSeconds: boolean = false,
): string => {
  const formatType = showSeconds
    ? DATE_FORMAT.TIME_WITH_SECONDS
    : DATE_FORMAT.TIME_ONLY;

  return formatDateValue(date, formatType);
};

// Función para mostrar fecha relativa inteligente
export const formatSmartDate = (
  date: Date | string | number | undefined | null,
): string => {
  return formatDateValue(date, DATE_FORMAT.RELATIVE);
};

// Función para calcular duración entre dos fechas
export const calculateDuration = (
  startDate: Date | string | number | undefined | null,
  endDate: Date | string | number | undefined | null,
  formatType: "hours" | "minutes" | "seconds" | "full" = "full",
): string => {
  const start = safeParseDate(startDate);
  const end = safeParseDate(endDate);

  if (!start || !end) return "-";

  const diffMs = Math.abs(end.getTime() - start.getTime());

  switch (formatType) {
    case "hours":
      return `${Math.floor(diffMs / (1000 * 60 * 60))}h`;

    case "minutes":
      return `${Math.floor(diffMs / (1000 * 60))}m`;

    case "seconds":
      return `${Math.floor(diffMs / 1000)}s`;

    case "full":
    default: {
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      if (hours > 0) {
        return `${hours}h ${minutes}m ${seconds}s`;
      } else if (minutes > 0) {
        return `${minutes}m ${seconds}s`;
      } else {
        return `${seconds}s`;
      }
    }
  }
};

// Función para formatear para input de fecha (HTML5)
export const formatForInputDate = (
  date: Date | string | number | undefined | null,
): string => {
  const dateValue = safeParseDate(date);
  if (!dateValue) return "";

  return format(dateValue, DATE_FORMAT.INPUT_DATE);
};

// Función para formatear para input datetime-local (HTML5)
export const formatForInputDateTime = (
  date: Date | string | number | undefined | null,
): string => {
  const dateValue = safeParseDate(date);
  if (!dateValue) return "";

  return format(dateValue, DATE_FORMAT.INPUT_DATETIME);
};
