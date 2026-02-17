import { LoaderCircleIcon } from "lucide-react";
import { memo } from "react";
import type { ButtonProps } from "react-day-picker";

import { Button } from "@/components/ui/button";

type Props = {
  isLoading: boolean;
} & ButtonProps;
const LoadingButton = ({ children, isLoading = false, ...props }: Props) => {
  return (
    <Button {...props} disabled={isLoading ?? props?.disabled}>
      {!isLoading ? children : <LoaderCircleIcon className="animate-spin" />}
    </Button>
  );
};
export default memo(LoadingButton);
