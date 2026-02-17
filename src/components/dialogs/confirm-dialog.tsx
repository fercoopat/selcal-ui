import { memo } from "react";
import { useTranslation } from "react-i18next";

import { LoadingButton } from "@/components/buttons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  children: React.ReactNode;
  title: string;
  message: string;
  onConfirm: () => void;
  cancelBtnText?: string;
  confirmBtnText?: string;
  isLoading?: boolean;
  onCancel?: () => void;
};
const ConfirmDialog = ({
  children,
  title,
  message,
  onConfirm,
  cancelBtnText = "common:cancel",
  confirmBtnText = "common:confirm",
  isLoading = false,
  onCancel,
}: Props) => {
  const { t } = useTranslation();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t(title)}</AlertDialogTitle>

          <AlertDialogDescription>{t(message)}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel} disabled={isLoading}>
            {t(cancelBtnText)}
          </AlertDialogCancel>

          <AlertDialogAction asChild onClick={onConfirm}>
            <LoadingButton type="button" isLoading={isLoading}>
              {t(confirmBtnText)}
            </LoadingButton>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default memo(ConfirmDialog);
