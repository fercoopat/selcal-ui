import { PencilIcon, TrashIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

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
import { useDeactivateRoller } from "@/modules/settings/rollers/hooks/use-deactivate-roller";
import type { Roller } from "@/modules/settings/rollers/interfaces/roller.interface";
import { useCallback } from "react";
import { useSearchParams } from "react-router";

type Props = {
  roller: Roller | undefined;
};

const RollersListRowActions = ({ roller }: Props) => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const { isOpen: isOpenDelete, onToggle: onToggleDelete } = useToggle();

  const handleEdit = useCallback(() => {
    if (!roller?.id) {
      return;
    }
    searchParams.set("edit", roller?.id);
    setSearchParams(searchParams);
  }, [roller?.id, searchParams, setSearchParams]);

  const { deleteRoller, isLoading } = useDeactivateRoller({
    onSuccess: onToggleDelete,
  });

  const handleDeleteRoller = useCallback(() => {
    deleteRoller(roller?.id);
  }, [roller?.id, deleteRoller]);

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
            <DialogTitle>{t("rollers:deleteTitle")}</DialogTitle>
            <DialogDescription>
              {t("rollers:deleteDescription", { name: roller?.name })}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={onToggleDelete}>
              {t("common:cancel")}
            </Button>

            <LoadingButton
              variant="destructive"
              isLoading={isLoading}
              onClick={handleDeleteRoller}
            >
              {t("common:delete")}
            </LoadingButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RollersListRowActions;