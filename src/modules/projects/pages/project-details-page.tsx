import { useParams } from "react-router";

import { ProjectDetailsTabs } from "@/modules/projects/components/project-details-tabs";
import { ProjectDetailsProvider } from "@/modules/projects/contexts/project-details-context";

const ProjectDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <ProjectDetailsProvider projectId={id}>
      <ProjectDetailsTabs />
    </ProjectDetailsProvider>
  );
};
export default ProjectDetailsPage;
