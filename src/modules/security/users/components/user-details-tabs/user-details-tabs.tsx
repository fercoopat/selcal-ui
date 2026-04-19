import { lazy } from "react";

import { useDetailsTabs, type DetailsTab } from "@/hooks/use-details-tabs";
import {
  USER_DETAILS_TAB,
  type UserDetailsTab,
} from "@/modules/security/users/constants/users.paths";

const UserDetailsGeneralTab = lazy(
  () =>
    import("@/modules/security/users/components/user-details-tabs/user-details-general-tab"),
);
const UserDetailsSecurityTab = lazy(
  () =>
    import("@/modules/security/users/components/user-details-tabs/user-details-security-tab"),
);

const USER_DETAILS_TABS = {
  general: {
    title: "users:tabs.general.title",
    component: UserDetailsGeneralTab,
  },
  security: {
    title: "users:tabs.security.title",
    component: UserDetailsSecurityTab,
  },
} satisfies Record<UserDetailsTab, DetailsTab>;

const UserDetailsTabs = () => {
  const { TabsComponent } = useDetailsTabs({
    defaultTab: USER_DETAILS_TAB.GENERAL,
    tabs: USER_DETAILS_TABS,
  });

  return <TabsComponent />;
};
export default UserDetailsTabs;
