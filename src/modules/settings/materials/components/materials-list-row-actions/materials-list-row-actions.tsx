import type { Material } from "@/modules/settings/materials/interfaces/material.interface";

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
import { useDeactivateMaterial } from "@/modules/settings/materials/hooks/use-deactivate-material";

type Props = {
  material: Material | undefined;
};

const MaterialsListRowActions = ({ material }: Props) => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const { isOpen: isOpenDelete, onToggle: onToggleDelete } = useToggle();

  const handleEdit = useCallback(() => {
    if (!material?.id) {
      return;
    }
    searchParams.set("edit", material?.id);
    setSearchParams(searchParams);
  }, [material?.id, searchParams, setSearchParams]);

  const { deleteMaterial, isLoading } = useDeactivateMaterial({
    onSuccess: onToggleDelete,
  });

  const handleDeleteMaterial = useCallback(() => {
    deleteMaterial(material?.id);
  }, [material?.id, deleteMaterial]);

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
            <DialogTitle>{t("materials:deleteTitle")}</DialogTitle>
            <DialogDescription>
              {t("materials:deleteDescription", { name: material?.name })}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={onToggleDelete}>
              {t("common:cancel")}
            </Button>

            <LoadingButton
              variant="destructive"
              isLoading={isLoading}
              onClick={handleDeleteMaterial}
            >
              {t("common:delete")}
            </LoadingButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MaterialsListRowActions;
