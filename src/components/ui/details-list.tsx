import { memo, useMemo, type PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type DetailsListDetails = {
  value: PropsWithChildren["children"];
  label: string;
  className?: string;
  labelClassName?: string;
  itemClassName?: string;
};

type Props = {
  details: Array<DetailsListDetails | undefined>;
};
const DetailsList = ({ details }: Props) => {
  const { t } = useTranslation();

  const rows = useMemo(
    () => details.filter((d) => Boolean(d?.value)) as DetailsListDetails[],
    [details],
  );

  if (!details?.length) return null;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="sr-only">Label</TableHead>
          <TableHead className="sr-only">Value</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {rows.map((item, idx) => (
          <TableRow key={idx} className={cn("align-top", item?.itemClassName)}>
            <TableCell
              className={cn(
                "min-w-37.5 text-[14px] font-medium whitespace-nowrap",
                item?.labelClassName,
              )}
            >
              {t(item.label)}
            </TableCell>

            <TableCell
              className={cn(
                "text-[14px] font-light",
                typeof item.value === "string" ? "text-left" : "",
                item?.className,
              )}
            >
              {item.value}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default memo(DetailsList);
