import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type TableOptions,
  useReactTable,
} from "@tanstack/react-table";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import DataTableError from "@/components/data-table/data-table-error";
import DataTableSkeleton from "@/components/data-table/data-table-skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const useTable = <T,>(options: TableOptions<T>) => {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable(options);

  return useMemo(() => table, [table]);
};

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<any>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[] | undefined;
  isLoading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
};
const DataTable = ({
  columns,
  data = [],
  error = null,
  isLoading = false,
  onRetry,
}: Props) => {
  const { t } = useTranslation("common");

  const table = useTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <DataTableSkeleton columnCount={columns.length} />;
  }

  if (error) {
    return <DataTableError error={error} onRetry={onRetry} />;
  }

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const headerContent = header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    );

                return (
                  <TableHead
                    key={header.id}
                    className={header.column.columnDef.meta?.headerClassName}
                  >
                    {typeof headerContent === "string"
                      ? t(headerContent)
                      : headerContent}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cell.column.columnDef.meta?.cellClassName}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {t("noResults")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
export default memo(DataTable);
