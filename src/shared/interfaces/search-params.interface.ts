export interface SearchParams<T> {
  search?: string;
  size?: number;
  sort?: Partial<Record<keyof T, "asc" | "desc">>;
}

export const SORT_SENSE = {
  ASC: "ASC",
  DESC: "DESC",
} as const;

export type SortSense = (typeof SORT_SENSE)[keyof typeof SORT_SENSE];

export interface SearchResponse<T> {
  data: T[];
  page: number;
  size: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
