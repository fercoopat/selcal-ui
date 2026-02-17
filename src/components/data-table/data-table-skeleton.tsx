import { memo } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  columnCount: number;
  rowCount?: number;
  searchableColumnCount?: number;
  filterableColumnCount?: number;
  showHeader?: boolean;
  withPagination?: boolean;
};
const DataTableSkeleton = ({
  columnCount,
  rowCount = 10,
  searchableColumnCount = 0,
  filterableColumnCount = 0,
  showHeader = true,
  withPagination = false,
}: Props) => {
  return (
    <div className="space-y-4">
      {/* Search and Filter Skeletons */}
      {(searchableColumnCount > 0 || filterableColumnCount > 0) && (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center space-x-2">
            {searchableColumnCount > 0 && (
              <Skeleton className="h-10 w-full sm:w-75" />
            )}
          </div>
          <div className="flex items-center space-x-2">
            {filterableColumnCount > 0 && (
              <>
                <Skeleton className="h-10 w-25" />
                <Skeleton className="h-10 w-17.5" />
              </>
            )}
          </div>
        </div>
      )}

      {/* Table Skeleton */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          {showHeader && (
            <TableHeader>
              <TableRow>
                {Array.from({ length: columnCount }).map((_, index) => (
                  <TableHead key={index}>
                    <Skeleton className="h-4 w-25" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
          )}
          <TableBody>
            {Array.from({ length: rowCount }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: columnCount }).map((_, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Skeleton */}
      {withPagination && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-24" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      )}
    </div>
  );
};
export default memo(DataTableSkeleton);
