import { AlertCircleIcon, RefreshCwIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { memo } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  error: Error;
  title?: string;
  onRetry?: () => void;
  className?: string;
};
const DataTableError = ({
  error,
  title = "errors:general-error.title",
  onRetry,
  className = "",
}: Props) => {
  const { t } = useTranslation();

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 ${className}`}
    >
      <Alert variant="destructive" className="w-full max-w-md">
        <AlertCircleIcon className="h-4 w-4" />
        <AlertTitle>{t(title)}</AlertTitle>

        <AlertDescription className="mt-2">
          <div className="space-y-2">
            <p className="text-sm">{error.message}</p>

            <p className="text-muted-foreground text-xs">
              {!error?.cause
                ? t("errors:general-error.message")
                : String(error.cause)}
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
};
export default memo(DataTableError);
