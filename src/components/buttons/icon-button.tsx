import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { VariantProps } from "class-variance-authority";

type Props = {
  children: React.ReactNode;
  tooltip?: string;
  asChild?: boolean;
} & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;
const IconButton = ({ children, tooltip, asChild = true, ...props }: Props) => {
  const { t } = useTranslation();

  const btnContent = useMemo(
    () => (
      <Button variant="outline" size="icon" {...props}>
        {children}
      </Button>
    ),
    [children, props],
  );

  if (!tooltip) {
    return btnContent;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild={asChild}>{btnContent}</TooltipTrigger>

      <TooltipContent>{t(tooltip)}</TooltipContent>
    </Tooltip>
  );
};
export default memo(IconButton);
