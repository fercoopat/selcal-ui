import { memo } from "react";
import { useTranslation } from "react-i18next";

import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  children: React.ReactNode;
  tooltip: string;
} & ButtonProps;
const IconButton = ({ children, tooltip, ...props }: Props) => {
  const { t } = useTranslation();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon" {...props}>
          {children}
        </Button>
      </TooltipTrigger>

      <TooltipContent>{t(tooltip)}</TooltipContent>
    </Tooltip>
  );
};
export default memo(IconButton);
