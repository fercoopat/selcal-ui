import { AlertCircleIcon, RefreshCwIcon } from "lucide-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  extractErrorMessage,
  extractErrorStatus,
} from "@/shared/utils/error.utils";

type Props = {
  error: unknown;
  title?: string;
  onRetry?: () => void;
  className?: string;
};

export const AlertError = memo(
  ({
    error,
    title = "errors:general-error.title",
    onRetry,
    className,
  }: Props) => {
    const { t } = useTranslation();
    const errorMessage = extractErrorMessage(error);
    const errorStatus = extractErrorStatus(error);

    if (!errorMessage) return null;

    return (
      <div
        className={cn("flex flex-col items-center justify-center", className)}
      >
        <Alert variant="error" className="w-full">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle>{t(title)}</AlertTitle>

          <AlertDescription className="mt-2">
            <div className="space-y-2">
              <p className="text-sm">{errorMessage}</p>

              <p className="text-muted-foreground text-xs">
                {errorStatus
                  ? `${t("errors:general-error.message")} (${errorStatus})`
                  : t("errors:general-error.message")}
              </p>
            </div>

            {!!onRetry && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="mt-4"
              >
                <RefreshCwIcon className="mr-2 h-3 w-3" />
                {t("common:retry")}
              </Button>
            )}
          </AlertDescription>
        </Alert>
      </div>
    );
  },
);

AlertError.displayName = "AlertError";
