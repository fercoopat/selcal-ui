import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import * as en from "@/i18n/en";
import * as es from "@/i18n/es";

i18next.use(initReactI18next).init({
  lng: "es", // if you're using a language detector, do not define the lng option
  // debug: import.meta.env.DEV,
  debug: false,
  resources: {
    en,
    es,
  },
});
