import { memo, useMemo } from "react";

import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

const SIZE_CONFIG = {
  inline: {
    container: "min-h-16 min-w-16",
    spinner: "size-6",
  },
  content: {
    container: "min-h-64 w-full", // Tamaño para contenido dentro de cards/tabs
    spinner: "size-8",
  },
  page: {
    container: "min-h-[calc(100vh-4rem)] min-w-full",
    spinner: "size-8",
  },
  screen: {
    container: "min-h-dvh min-w-dvw fixed inset-0 z-50",
    spinner: "size-12",
  },
};

type Props = {
  size?: keyof typeof SIZE_CONFIG;
  className?: string;
  spinnerClassName?: string;
  withBackdrop?: boolean;
};
const PageLoader = ({
  size = "page",
  className,
  spinnerClassName,
  withBackdrop = false,
}: Props) => {
  const config = useMemo(() => SIZE_CONFIG[size], [size]);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        config.container,
        size === "screen" &&
          withBackdrop &&
          "bg-background/80 backdrop-blur-sm",
        className,
      )}
    >
      <Spinner
        className={cn(config.spinner, "text-primary", spinnerClassName)}
      />
    </div>
  );
};
export default memo(PageLoader);
