import { EditIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";

import { IconButton } from "@/components/buttons";
import { ConfirmDialog } from "@/components/dialogs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ConditionContainer from "@/components/ui/condition-container";
import { CommentFormDialog } from "@/modules/comments/components/comment-form-dialog";
import { useFindCommentsByIssue } from "@/modules/comments/hooks/use-find-comments-by-issue";
import { useFindOneComment } from "@/modules/comments/hooks/use-find-one-comment";
import { useRemoveComment } from "@/modules/comments/hooks/use-remove-comment";
import { useIssueDetails } from "@/modules/issues/contexts/issue-details-context";
import { useCreateIssueCommentForm } from "@/modules/issues/hooks/use-create-issue-comment-form";
import { Skeleton } from "@/components/ui/skeleton";

const CommentsSkeleton = () => (
  <div className="grid gap-4">
    {Array(5)
      .fill(0)
      .map((_, index) => (
        <Skeleton key={index} className="h-21.5 w-full" />
      ))}
  </div>
);

const IssueDetailsCommentsForm = () => {
  const { t } = useTranslation();

  const { issue } = useIssueDetails();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const editValue = useMemo(() => searchParams.get("edit"), [searchParams]);

  const toggleIsOpen = useCallback(
    () => setIsOpen((prev) => !prev),
    [setIsOpen],
  );

  const handleEdit = useCallback(
    (commentId: string | undefined) => () => {
      if (!commentId)
        throw new Error("Comment ID is required to edit a comment");

      searchParams.set("edit", commentId);
      setSearchParams(searchParams);
      toggleIsOpen();
    },
    [searchParams, setSearchParams, toggleIsOpen],
  );

  const handleToggle = useCallback(() => {
    if (editValue) {
      searchParams.delete("edit");
      setSearchParams(searchParams);
    }
    toggleIsOpen();
  }, [editValue, searchParams, setSearchParams, toggleIsOpen]);

  const {
    // error: errorLoadComments,
    isLoading: isLoadingComments,
    comments,
  } = useFindCommentsByIssue(issue?.id);

  const {
    // error: errorLoadComment,
    comment,
    isLoading: isLoadingComment,
  } = useFindOneComment(issue?.id, editValue ?? "");

  const form = useCreateIssueCommentForm({
    issue,
    comment,
    onSuccess: handleToggle,
  });

  const {
    // error: errorRemoveComment,
    isLoading: isLoadingRemoveComment,
    remove,
  } = useRemoveComment({ issueId: issue?.id });

  const handleRemoveComment = useCallback(
    (commentId: string | undefined) => () => {
      remove(commentId);
    },
    [remove],
  );

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <p>{t("issues:sections.comments.title")}</p>

        <Button onClick={handleToggle}>
          <PlusIcon />

          <span>{t("comments:add")}</span>
        </Button>
      </div>

      <div className="grid gap-4">
        <ConditionContainer
          renderChildrenWhen={!isLoadingComments}
          fallback={<CommentsSkeleton />}
        >
          <ConditionContainer
            renderChildrenWhen={!!comments?.length}
            fallback={<p>{t("common:noResults")}</p>}
          >
            {comments?.map((comment) => (
              <Card key={comment?.id}>
                <CardContent>
                  <div className="flex items-center justify-between gap-4">
                    <p>{comment?.content}</p>

                    <div className="flex items-center gap-2">
                      <IconButton
                        tooltip="common:edit"
                        onClick={handleEdit(comment?.id)}
                      >
                        <EditIcon />
                      </IconButton>

                      <ConfirmDialog
                        title="comments:remove.title"
                        message="comments:remove.message"
                        isLoading={isLoadingRemoveComment}
                        onConfirm={handleRemoveComment(comment?.id)}
                      >
                        <IconButton tooltip="common:remove">
                          <TrashIcon />
                        </IconButton>
                      </ConfirmDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </ConditionContainer>
        </ConditionContainer>
      </div>

      <CommentFormDialog
        {...form}
        disabled={isLoadingComment}
        isLoading={form.isLoading}
        open={isOpen}
        onToggle={handleToggle}
      />
    </>
  );
};
export default IssueDetailsCommentsForm;
