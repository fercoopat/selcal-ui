export const CHEMICAL_ELEMENTS_PERMISSIONS = {
  READ: "chemical_elements.read",
  CREATE: "chemical_elements.create",
  UPDATE: "chemical_elements.update",
  DELETE: "chemical_elements.delete",
} as const;

export type ChemicalElementsPermission =
  (typeof CHEMICAL_ELEMENTS_PERMISSIONS)[keyof typeof CHEMICAL_ELEMENTS_PERMISSIONS];

export const CHEMICAL_ELEMENTS_PERMISSIONS_VALUES = Object.values(CHEMICAL_ELEMENTS_PERMISSIONS);
