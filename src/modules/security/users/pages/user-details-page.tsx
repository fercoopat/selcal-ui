import { useParams } from "react-router";

import { UserDetailsSummary } from "@/modules/security/users/components/user-details-summary";
import { UserDetailsTabs } from "@/modules/security/users/components/user-details-tabs";
import { UserDetailsProvider } from "@/modules/security/users/contexts/user-details-context";

const UserDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <UserDetailsProvider userId={id}>
      <div className="flex flex-col gap-4 lg:flex-row">
        <UserDetailsSummary />

        <UserDetailsTabs />
      </div>
    </UserDetailsProvider>
  );
};
export default UserDetailsPage;
