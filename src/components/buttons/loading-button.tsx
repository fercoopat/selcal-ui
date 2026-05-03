import { LoaderCircleIcon } from "lucide-react";
import { type ComponentProps, memo } from "react";

import { Button } from "@/components/ui/button";

type Props = {
  isLoading?: boolean;
} & ComponentProps<typeof Button>;

const LoadingButton = ({ children, isLoading = false, ...props }: Props) => {
  return (
    <Button {...props} disabled={isLoading ?? props?.disabled}>
      {!isLoading ? children : <LoaderCircleIcon className="animate-spin" />}
    </Button>
  );
};
export default memo(LoadingButton);
