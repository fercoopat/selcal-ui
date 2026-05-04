import type { MillType } from "@/modules/settings/mill-types/interfaces/mill-type.interface";

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
import { useDeactivateMillType } from "@/modules/settings/mill-types/hooks";

type Props = {
  millType: MillType | undefined;
};

const MillTypesListRowActions = ({ millType }: Props) => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const { isOpen: isOpenDelete, onToggle: onToggleDelete } = useToggle();

  const handleEdit = useCallback(() => {
    if (!millType?.id) {
      return;
    }
    searchParams.set("edit", millType?.id);
    setSearchParams(searchParams);
  }, [millType?.id, searchParams, setSearchParams]);

  const { deleteMillType, isLoading } = useDeactivateMillType({
    onSuccess: onToggleDelete,
  });

  const handleDeleteMillType = useCallback(() => {
    deleteMillType(millType?.id);
  }, [millType?.id, deleteMillType]);

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
            <DialogTitle>{t("millTypes:deleteTitle")}</DialogTitle>
            <DialogDescription>
              {t("millTypes:deleteDescription", { name: millType?.name })}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={onToggleDelete}>
              {t("common:cancel")}
            </Button>

            <LoadingButton
              variant="destructive"
              isLoading={isLoading}
              onClick={handleDeleteMillType}
            >
              {t("common:delete")}
            </LoadingButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MillTypesListRowActions;
