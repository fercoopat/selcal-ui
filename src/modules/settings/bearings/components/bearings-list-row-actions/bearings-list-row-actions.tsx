import { useTranslation } from "react-i18next";
import { MoreHorizontal } from "lucide-react";

import { LoadingButton } from "@/components/buttons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeactivateBearing } from "@/modules/settings/bearings/hooks/use-deactivate-bearing";
import type { Bearing } from "@/modules/settings/bearings/interfaces/bearing.interface";

type Props = {
  bearing: Bearing | undefined;
};

const BearingsListRowActions = ({ bearing }: Props) => {
  const { t } = useTranslation();
  const { deleteBearing, isLoading } = useDeactivateBearing({ onSuccess: () => {} });

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">{t("common:openMenu")}</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => {}}>
            {t("common:edit")}
          </DropdownMenuItem>
          <DialogTrigger asChild>
            <DropdownMenuItem>{t("common:delete")}</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("bearings:deleteTitle")}</DialogTitle>
          <DialogDescription>
            {t("bearings:deleteDescription", { name: bearing?.name })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">{t("common:cancel")}</Button>
          <LoadingButton
            variant="destructive"
            isLoading={isLoading}
            onClick={() => deleteBearing(bearing?.id)}
          >
            {t("common:delete")}
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BearingsListRowActions;
