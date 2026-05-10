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
import { useDeactivateEngine } from "@/modules/settings/engines/hooks/use-deactivate-engine";
import type { Engine } from "@/modules/settings/engines/interfaces/engine.interface";
import { useCallback } from "react";
import { useSearchParams } from "react-router";

type Props = {
  engine: Engine | undefined;
};

const EnginesListRowActions = ({ engine }: Props) => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const { isOpen: isOpenDelete, onToggle: onToggleDelete } = useToggle();

  const handleEdit = useCallback(() => {
    if (!engine?.id) {
      return;
    }
    searchParams.set("edit", engine?.id);
    setSearchParams(searchParams);
  }, [engine?.id, searchParams, setSearchParams]);

  const { deleteEngine, isLoading } = useDeactivateEngine({
    onSuccess: onToggleDelete,
  });

  const handleDeleteEngine = useCallback(() => {
    deleteEngine(engine?.id);
  }, [engine?.id, deleteEngine]);

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
            <DialogTitle>{t("engines:deleteTitle")}</DialogTitle>
            <DialogDescription>
              {t("engines:deleteDescription", { name: engine?.name })}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={onToggleDelete}>
              {t("common:cancel")}
            </Button>

            <LoadingButton
              variant="destructive"
              isLoading={isLoading}
              onClick={handleDeleteEngine}
            >
              {t("common:delete")}
            </LoadingButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EnginesListRowActions;