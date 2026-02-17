import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { LoadingButton } from "@/components/buttons";
import { FormContainer } from "@/components/forms";
import { Button } from "@/components/ui/button";
import {
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ConditionContainer from "@/components/ui/condition-container";
import DetailsList, {
  type DetailsListDetails,
} from "@/components/ui/details-list";
import { useAuth } from "@/modules/auth/contexts/auth-context";
import { ProjectForm } from "@/modules/projects/components/project-form";
import { PROJECTS_PERMISSIONS } from "@/modules/projects/constants/projects-permissions";
import { useProjectDetails } from "@/modules/projects/contexts/project-details-context";
import { useCreateProjectForm } from "@/modules/projects/hooks/use-create-project-form";
import type { Project } from "@/modules/projects/interfaces/project.interface";
import { formatDateValue } from "@/shared/utils/date.utils";
import { joinText } from "@/shared/utils/text.utils";

const ProjectGeneralInfo = () => {
  const { project } = useProjectDetails();

  const parsedData = useMemo<DetailsListDetails[]>(() => {
    if (!project) return [];

    return Object.entries(project).map(([field, value]) => {
      switch (field as keyof Project) {
        case "author":
          return {
            value: joinText([
              project?.author?.firstName,
              project?.author?.lastName,
            ]),
            label: "projects:fields.author",
          };

        case "description":
        case "name":
          return {
            value,
            label: `projects:fields.${field}`,
          };

        case "endDate":
        case "startDate":
          return {
            value: formatDateValue(value),
            label: `projects:fields.${field}`,
          };

        default:
          return {
            value: null,
            label: "",
          };
      }
    });
  }, [project]);

  return <DetailsList details={parsedData} />;
};

const PROJECT_DETAILS_GENERAL_FORM_ID = "project-details-general-form" as const;

const ProjectDetailsGeneralTab = () => {
  const { t } = useTranslation();
  const { project } = useProjectDetails();

  const { hasPermission } = useAuth();

  const canEdit = useMemo<boolean>(
    () => hasPermission([PROJECTS_PERMISSIONS.UPDATE]),
    [hasPermission],
  );

  const form = useCreateProjectForm({ project });

  return (
    <>
      <CardHeader>
        <CardTitle>
          {t(!canEdit ? "projects:tabs.general.subtitle" : "common:edit")}
        </CardTitle>

        {canEdit && (
          <CardAction className="flex items-center gap-4">
            <Button
              variant={"outline"}
              disabled={form.isLoading}
              onClick={form.reset}
            >
              {t("common:reset")}
            </Button>

            <LoadingButton
              isLoading={form.isLoading}
              type="submit"
              form={PROJECT_DETAILS_GENERAL_FORM_ID}
            >
              {t("common:accept")}
            </LoadingButton>
          </CardAction>
        )}
      </CardHeader>

      <CardContent>
        <ConditionContainer renderChildrenWhen={canEdit} fallback={<ProjectGeneralInfo />}>
          <FormContainer {...form} id={PROJECT_DETAILS_GENERAL_FORM_ID}>
            <ProjectForm isLoading={form.isLoading} />
          </FormContainer>
        </ConditionContainer>
      </CardContent>
    </>
  );
};
export default ProjectDetailsGeneralTab;
