import { memo } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  title: string;
  value: number | undefined;
  unit?: string;
};
const StatCard = ({ title, unit, value }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-muted-foreground text-sm font-medium">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">
          {value !== undefined ? (
            unit ? (
              `${value} ${unit}`
            ) : (
              value
            )
          ) : (
            <Skeleton className="h-8 w-24" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default memo(StatCard);
