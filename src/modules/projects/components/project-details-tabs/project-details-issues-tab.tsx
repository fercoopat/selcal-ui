import { PlusIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

import { DataTable } from "@/components/data-table";
import { PermissionsCheck } from "@/components/security";
import { Button } from "@/components/ui/button";
import {
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { issuesListColumns } from "@/modules/issues/constants/issues-list-columns";
import { ISSUES_PERMISSIONS } from "@/modules/issues/constants/issues.permissions";
import { useCreateIssueForm } from "@/modules/issues/hooks/use-create-issue-form";
import { useFindIssuesByProject } from "@/modules/issues/hooks/use-find-issues-by-project";
import { ProjectAddIssueDialog } from "@/modules/projects/components/project-add-issue-dialog";
import { useProjectDetails } from "@/modules/projects/contexts/project-details-context";
import { removeAtPosition } from "@/shared/utils/array.utils";

const projectIssuesListColumns = removeAtPosition(issuesListColumns, 5);

const ProjectDetailsIssuesTab = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    error: errorProject,
    project,
    isLoading: isLoadingProject,
  } = useProjectDetails();

  const {
    error: errorIssues,
    isLoading: isLoadingIssues,
    issues,
  } = useFindIssuesByProject({ projectId: project?.id ?? id });

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  const form = useCreateIssueForm({
    projectId: project?.id ?? id ?? "",
    onSuccess: handleToggle,
  });

  return (
    <>
      <CardHeader>
        <CardTitle>{t("projects:tabs.issues.subtitle")}</CardTitle>

        <PermissionsCheck permissions={[ISSUES_PERMISSIONS.CREATE]}>
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
        </PermissionsCheck>
      </CardHeader>

      <CardContent>
        <DataTable
          columns={projectIssuesListColumns}
          data={issues}
          isLoading={isLoadingProject ?? isLoadingIssues}
          error={errorProject ?? errorIssues}
        />
      </CardContent>

      <ProjectAddIssueDialog {...form} open={isOpen} onToggle={handleToggle} />
    </>
  );
};
export default ProjectDetailsIssuesTab;
