import { memo } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";

type Props = {
  children: React.ReactNode;
  tooltip: string;
  asChild?: boolean;
} & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;
const IconButton = ({ children, tooltip, asChild, ...props }: Props) => {
  const { t } = useTranslation();

  return (
    <Tooltip>
      <TooltipTrigger asChild={asChild}>
        <Button variant="outline" size="icon" {...props}>
          {children}
        </Button>
      </TooltipTrigger>

      <TooltipContent>{t(tooltip)}</TooltipContent>
    </Tooltip>
  );
};
export default memo(IconButton);
