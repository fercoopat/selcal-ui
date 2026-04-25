import { memo } from "react";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  textClassName?: string;
};

const FormSectionSeparator = ({
  children,
  className,
  textClassName,
}: Props) => {
  return (
    <section className={cn("grid gap-2", className)}>
      <Separator />
      <p className={cn("text-center", textClassName)}>{children}</p>
      <Separator />
    </section>
  );
};

export default memo(FormSectionSeparator);
