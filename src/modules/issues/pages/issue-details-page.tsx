import { useParams } from "react-router";

import {
  IssueDetailsCommentsForm,
  IssueDetailsGeneralInfoForm,
} from "@/modules/issues/components/issue-details";
import { IssueDetailsProvider } from "@/modules/issues/contexts/issue-details-context";

const IssueDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <IssueDetailsProvider issueId={id}>
      <IssueDetailsGeneralInfoForm />

      <IssueDetailsCommentsForm />
    </IssueDetailsProvider>
  );
};
export default IssueDetailsPage;
