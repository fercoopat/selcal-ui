import { createContext, useContext, useMemo } from "react";

import { useFindOneProject } from "@/modules/projects/hooks/use-find-one-project";
import type { Project } from "@/modules/projects/interfaces/project.interface";

interface ProjectDetailsContextValue {
  error: Error | null;
  isLoading: boolean;
  project: Project | undefined;
}

const ProjectDetailsContext = createContext<
  ProjectDetailsContextValue | undefined
>(undefined);

type Props = {
  children: React.ReactNode;
  projectId: string | undefined;
};

export const ProjectDetailsProvider = ({ children, projectId }: Props) => {
  const { error, isLoading, project } = useFindOneProject(projectId);

  const contextValue = useMemo<ProjectDetailsContextValue>(
    () => ({
      project,
      error,
      isLoading,
    }),
    [error, isLoading, project],
  );

  return (
    <ProjectDetailsContext.Provider value={contextValue}>
      {children}
    </ProjectDetailsContext.Provider>
  );
};

export const useProjectDetails = (): ProjectDetailsContextValue => {
  const context = useContext(ProjectDetailsContext);

  if (!context) {
    throw new Error(
      "useProjectDetails must be used within ProjectDetailsProvider",
    );
  }

  return context;
};
