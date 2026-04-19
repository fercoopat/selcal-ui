import { lazy } from 'react';

export const ChemicalElementsListPage = lazy(
  () =>
    import(
      "@/modules/chemical-elements/pages/chemical-elements-list-page"
    ),
);