import { InfoIcon, TrashIcon } from "lucide-react";
import { memo } from "react";
import { Link } from "react-router";

import { IconButton } from "@/components/buttons";
import { ConfirmDialog } from "@/components/dialogs";
import { ISSUES_PATHS } from "@/modules/issues/constants/issues-paths";
import { useRemoveIssue } from "@/modules/issues/hooks/use-remove-issue";
import type { Issue } from "@/modules/issues/interfaces/issue.interface";

type Props = {
  issue: Issue | undefined;
};
const IssuesListRowActions = ({ issue }: Props) => {
  const { isLoading, remove } = useRemoveIssue({ issue });

  return (
    <div className="flex items-center gap-2">
      <IconButton tooltip="common:edit" asChild>
        <Link to={ISSUES_PATHS.detailsPath(issue?.id)}>
          <InfoIcon />
        </Link>
      </IconButton>

      <ConfirmDialog
        message="issues:remove.message"
        title="issues:remove.title"
        onConfirm={remove}
        isLoading={isLoading}
      >
        <IconButton tooltip="common:remove">
          <TrashIcon />
        </IconButton>
      </ConfirmDialog>
    </div>
  );
};
export default memo(IssuesListRowActions);
