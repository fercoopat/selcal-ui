import { DataTable } from "@/components/data-table";
import { IssuesListToolbar } from "@/modules/issues/components/issues-list-toolbar";
import { issuesListColumns } from "@/modules/issues/constants/issues-list-columns";
import { useFindAllIssues } from "@/modules/issues/hooks/use-find-all-issues";

const IssuesListPage = () => {
  const { error, isLoading, issues } = useFindAllIssues();

  return (
    <>
      <IssuesListToolbar />

      <DataTable
        columns={issuesListColumns}
        data={issues}
        error={error}
        isLoading={isLoading}
      />
    </>
  );
};
export default IssuesListPage;
