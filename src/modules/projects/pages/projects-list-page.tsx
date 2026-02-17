import { DataTable } from "@/components/data-table";
import ProjectsListToolbar from "@/modules/projects/components/projects-list-toolbar/projects-list-toolbar";
import { projectsListColumns } from "@/modules/projects/constants/projects-list-columns";
import { useFindAllProjects } from "@/modules/projects/hooks/use-find-all-projects";

const ProjectsListPage = () => {
  const { error, isLoading, projects } = useFindAllProjects();

  return (
    <>
      <ProjectsListToolbar />

      <DataTable
        columns={projectsListColumns}
        data={projects}
        error={error}
        isLoading={isLoading}
      />
    </>
  );
};
export default ProjectsListPage;
