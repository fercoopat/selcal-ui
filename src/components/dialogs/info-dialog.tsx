import { CircleQuestionMarkIcon, InfoIcon } from "lucide-react";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";

import { IconButton } from "@/components/buttons";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = React.PropsWithChildren<{
  description: string;
  subtitle: string;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  title: string;
}>;

const InfoDialog = ({
  children = (
    <IconButton tooltip="common:moduleInformation" variant={"ghost"}>
      <CircleQuestionMarkIcon className="text-primary/50 size-6" />
    </IconButton>
  ),
  description,
  subtitle,
  onOpenChange,
  open: externalOpen,
  title,
}: Props) => {
  const { t } = useTranslation();
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = externalOpen !== undefined;
  const isOpen = isControlled ? externalOpen : internalOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open={isOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t(title)}</DialogTitle>

          <DialogDescription className="font-light">
            {t(subtitle)}
          </DialogDescription>
        </DialogHeader>

        <Alert variant={"info"}>
          <InfoIcon />
          <AlertDescription>{t(description)}</AlertDescription>
        </Alert>
      </DialogContent>
    </Dialog>
  );
};

export default memo(InfoDialog);
