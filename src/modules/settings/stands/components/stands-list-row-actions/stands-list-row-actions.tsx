import type { Stand } from "@/modules/settings/stands/interfaces/stand.interface";

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
import { useDeactivateStand } from "@/modules/settings/stands/hooks";

type Props = {
  stand: Stand | undefined;
};

const StandsListRowActions = ({ stand }: Props) => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const { isOpen: isOpenDelete, onToggle: onToggleDelete } = useToggle();

  const handleEdit = useCallback(() => {
    if (!stand?.id) {
      return;
    }
    searchParams.set("edit", stand?.id);
    setSearchParams(searchParams);
  }, [stand?.id, searchParams, setSearchParams]);

  const { deactivateStand, isPending } = useDeactivateStand({
    onSuccess: onToggleDelete,
  });

  const handleDeleteStand = useCallback(() => {
    deactivateStand(stand?.id);
  }, [stand?.id, deactivateStand]);

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
            <DialogTitle>{t("stands:deleteTitle")}</DialogTitle>
            <DialogDescription>
              {t("stands:deleteDescription", {
                name:
                  stand?.rollingMill?.name + " - Position " + stand?.position,
              })}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={onToggleDelete}>
              {t("common:cancel")}
            </Button>

            <LoadingButton
              variant="destructive"
              isLoading={isPending}
              onClick={handleDeleteStand}
            >
              {t("common:delete")}
            </LoadingButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StandsListRowActions;
