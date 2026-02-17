import { PlusIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";

import { DataTableToolbar } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { ProjectFormDialog } from "@/modules/projects/components/project-form-dialog";
import { useCreateProjectForm } from "@/modules/projects/hooks/use-create-project-form";
import { useFindOneProject } from "@/modules/projects/hooks/use-find-one-project";

const ProjectsListToolbar = () => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const editValue = useMemo(() => searchParams.get("edit"), [searchParams]);

  const handleToggle = useCallback(() => {
    if (editValue) {
      searchParams.delete("edit");
      setSearchParams(searchParams);
    } else {
      setIsOpen((prev) => !prev);
    }
  }, [editValue, searchParams, setSearchParams]);

  const { isLoading: isLoadingProject, project } = useFindOneProject(
    editValue ?? "",
  );

  const form = useCreateProjectForm({ project, onSuccess: handleToggle });

  return (
    <>
      <DataTableToolbar>
        <Button onClick={handleToggle}>
          <PlusIcon />

          <span>{t("projects:add")}</span>
        </Button>
      </DataTableToolbar>

      <ProjectFormDialog
        {...form}
        isLoading={isLoadingProject ?? form.isLoading}
        open={isOpen || !!editValue}
        onToggle={handleToggle}
      />
    </>
  );
};
export default ProjectsListToolbar;
