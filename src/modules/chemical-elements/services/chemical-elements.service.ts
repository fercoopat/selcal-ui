import { CrudService } from "@/shared/services";
import type { ChemicalElement } from "@/modules/chemical-elements/interfaces";
import type { CreateChemicalElementPayload } from "@/modules/chemical-elements/schemas";

export const ChemicalElementsService = new CrudService<
  ChemicalElement,
  CreateChemicalElementPayload
>("/chemical-elements");
