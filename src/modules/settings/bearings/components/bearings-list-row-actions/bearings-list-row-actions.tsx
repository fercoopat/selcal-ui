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
import { useDeactivateBearing } from "@/modules/settings/bearings/hooks/use-deactivate-bearing";
import type { Bearing } from "@/modules/settings/bearings/interfaces/bearing.interface";
import { useCallback } from "react";
import { useSearchParams } from "react-router";

type Props = {
  bearing: Bearing | undefined;
};

const BearingsListRowActions = ({ bearing }: Props) => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const { isOpen: isOpenDelete, onToggle: onToggleDelete } = useToggle();

  const handleEdit = useCallback(() => {
    if (!bearing?.id) {
      return;
    }
    searchParams.set("edit", bearing?.id);
    setSearchParams(searchParams);
  }, [bearing?.id, searchParams, setSearchParams]);

  const { deleteBearing, isLoading } = useDeactivateBearing({
    onSuccess: onToggleDelete,
  });

  const handleDeleteBearing = useCallback(() => {
    deleteBearing(bearing?.id);
  }, [bearing?.id, deleteBearing]);

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
            <DialogTitle>{t("bearings:deleteTitle")}</DialogTitle>
            <DialogDescription>
              {t("bearings:deleteDescription", { name: bearing?.name })}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={onToggleDelete}>
              {t("common:cancel")}
            </Button>

            <LoadingButton
              variant="destructive"
              isLoading={isLoading}
              onClick={handleDeleteBearing}
            >
              {t("common:delete")}
            </LoadingButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BearingsListRowActions;
