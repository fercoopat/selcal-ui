import { PlusIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/modules/auth/contexts/auth-context";
import { ProjectAddMembersDialog } from "@/modules/projects/components/project-add-members-dialog";
import { PROJECTS_PERMISSIONS } from "@/modules/projects/constants/projects-permissions";
import { useProjectDetails } from "@/modules/projects/contexts/project-details-context";
import { useAddMembersToProject } from "@/modules/projects/hooks/use-add-members-to-project";
import { usersListColumns } from "@/modules/security/users/constants/users-list-columns";
import { removeAtPosition } from "@/shared/utils/array.utils";

const projectMembersListColumns = removeAtPosition(usersListColumns, 2);

const ProjectDetailsMembersTab = () => {
  const { t } = useTranslation();
  const { error, project, isLoading: isLoadingProject } = useProjectDetails();

  const { hasPermission } = useAuth();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  const form = useAddMembersToProject({ project, onSuccess: handleToggle });

  const canEdit = useMemo<boolean>(
    () => hasPermission([PROJECTS_PERMISSIONS.UPDATE]),
    [hasPermission],
  );

  return (
    <>
      <CardHeader>
        <CardTitle>
          {t(!canEdit ? "projects:tabs.members.subtitle" : "common:edit")}
        </CardTitle>

        {canEdit && (
          <CardAction className="flex items-center gap-4">
            <Button
              variant={"outline"}
              disabled={isLoadingProject}
              onClick={handleToggle}
            >
              <PlusIcon />
              {t("common:add")}
            </Button>
          </CardAction>
        )}
      </CardHeader>

      <CardContent>
        <DataTable
          columns={projectMembersListColumns}
          data={project?.members}
          isLoading={isLoadingProject}
          error={error}
        />
      </CardContent>

      <ProjectAddMembersDialog
        {...form}
        open={isOpen}
        onToggle={handleToggle}
      />
    </>
  );
};
export default ProjectDetailsMembersTab;
