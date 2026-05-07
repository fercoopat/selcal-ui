import type { RollingMill } from "@/modules/settings/rolling-mills/interfaces/rolling-mill.interface";

import { PencilIcon, TrashIcon } from "lucide-react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";

import { IconButton, LoadingButton } from "@/components/buttons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToggle } from "@/hooks/use-toggle";
import { useDeactivateRollingMill } from "@/modules/settings/rolling-mills/hooks";

type Props = {
  rollingMill: RollingMill | undefined;
};

const RollingMillsListRowActions = ({ rollingMill }: Props) => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const { isOpen: isOpenDelete, onToggle: onToggleDelete } = useToggle();

  const handleEdit = useCallback(() => {
    if (!rollingMill?.id) {
      return;
    }
    searchParams.set("edit", rollingMill?.id);
    setSearchParams(searchParams);
  }, [rollingMill?.id, searchParams, setSearchParams]);

  const { deactivateRollingMill, isPending } = useDeactivateRollingMill({
    onSuccess: onToggleDelete,
  });

  const handleDeleteRollingMill = useCallback(() => {
    deactivateRollingMill(rollingMill?.id);
  }, [rollingMill?.id, deactivateRollingMill]);

  return (
    <>
      <div className="flex items-center justify-end gap-2">
        <IconButton tooltip="common:edit" onClick={handleEdit}>
          <PencilIcon />
        </IconButton>

        <IconButton
          tooltip="common:delete"
          onClick={onToggleDelete}
          variant={"destructive"}
        >
          <TrashIcon />
        </IconButton>
      </div>

      <Dialog open={isOpenDelete} onOpenChange={onToggleDelete}>
        <DialogContent showCloseButton>
          <DialogHeader>
            <DialogTitle>{t("rollingMills:deleteTitle")}</DialogTitle>
            <DialogDescription>
              {t("rollingMills:deleteDescription", { name: rollingMill?.name })}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={onToggleDelete}>
              {t("common:cancel")}
            </Button>

            <LoadingButton
              variant="destructive"
              isLoading={isPending}
              onClick={handleDeleteRollingMill}
            >
              {t("common:delete")}
            </LoadingButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RollingMillsListRowActions;
