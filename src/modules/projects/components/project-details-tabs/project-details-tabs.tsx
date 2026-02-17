import { lazy } from "react";

import { useDetailsTabs, type DetailsTab } from "@/hooks/use-details-tabs";
import {
  PROJECT_DETAILS_TAB,
  type ProjectDetailsTab,
} from "@/modules/projects/constants/projects-paths";

const ProjectDetailsGeneralTab = lazy(
  () =>
    import("@/modules/projects/components/project-details-tabs/project-details-general-tab"),
);
const ProjectDetailsMembersTab = lazy(
  () =>
    import("@/modules/projects/components/project-details-tabs/project-details-members-tab"),
);
const ProjectDetailsIssuesTab = lazy(
  () =>
    import("@/modules/projects/components/project-details-tabs/project-details-issues-tab"),
);

const PROJECT_DETAILS_TABS = {
  general: {
    title: "projects:tabs.general.title",
    component: ProjectDetailsGeneralTab,
  },
  members: {
    title: "projects:tabs.members.title",
    component: ProjectDetailsMembersTab,
  },
  issues: {
    title: "projects:tabs.issues.title",
    component: ProjectDetailsIssuesTab,
  },
} satisfies Record<ProjectDetailsTab, DetailsTab>;

const ProjectDetailsTabs = () => {
  const { TabsComponent } = useDetailsTabs({
    defaultTab: PROJECT_DETAILS_TAB.GENERAL,
    tabs: PROJECT_DETAILS_TABS,
  });

  return <TabsComponent />;
};
export default ProjectDetailsTabs;
