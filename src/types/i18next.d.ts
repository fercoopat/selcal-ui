import { defaultNS } from "@/i18n/config";
import resources from "@types/resources";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof resources;
  }
}
