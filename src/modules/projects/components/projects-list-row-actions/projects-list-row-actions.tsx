import { InfoIcon, TrashIcon } from "lucide-react";
import { memo } from "react";
import { Link } from "react-router";

import { IconButton } from "@/components/buttons";
import { ConfirmDialog } from "@/components/dialogs";
import { PermissionsCheck } from "@/components/security";
import { PROJECTS_PATHS } from "@/modules/projects/constants/projects-paths";
import { PROJECTS_PERMISSIONS } from "@/modules/projects/constants/projects-permissions";
import { useDeactivateProject } from "@/modules/projects/hooks/use-deactivate-project";
import type { Project } from "@/modules/projects/interfaces/project.interface";

type Props = {
  project: Project | undefined;
};
const ProjectsListRowActions = ({ project }: Props) => {
  const { isLoading, deactivate } = useDeactivateProject({ project });

  return (
    <div className="flex items-center gap-2">
      <IconButton tooltip="common:details" asChild>
        <Link to={PROJECTS_PATHS.detailsPath(project?.id)}>
          <InfoIcon />
        </Link>
      </IconButton>

      <PermissionsCheck permissions={[PROJECTS_PERMISSIONS.DELETE]}>
        <ConfirmDialog
          message="projects:deactivate.message"
          title="projects:deactivate.title"
          onConfirm={deactivate}
          isLoading={isLoading}
        >
          <IconButton tooltip="common:deactivate">
            <TrashIcon />
          </IconButton>
        </ConfirmDialog>
      </PermissionsCheck>
    </div>
  );
};
export default memo(ProjectsListRowActions);
