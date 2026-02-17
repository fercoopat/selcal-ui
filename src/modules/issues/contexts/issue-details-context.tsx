import { createContext, useContext, useMemo } from "react";

import { useFindOneIssue } from "@/modules/issues/hooks/use-find-one-issue";
import type { Issue } from "@/modules/issues/interfaces/issue.interface";

interface IssueDetailsContextValue {
  error: Error | null;
  isLoading: boolean;
  issue: Issue | undefined;
}

const IssueDetailsContext = createContext<IssueDetailsContextValue | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
  issueId: string | undefined;
};

export const IssueDetailsProvider = ({ children, issueId }: Props) => {
  const { error, isLoading, issue } = useFindOneIssue(issueId ?? null);

  const contextValue = useMemo<IssueDetailsContextValue>(
    () => ({
      issue,
      error,
      isLoading,
    }),
    [error, isLoading, issue],
  );

  return (
    <IssueDetailsContext.Provider value={contextValue}>
      {children}
    </IssueDetailsContext.Provider>
  );
};

export const useIssueDetails = (): IssueDetailsContextValue => {
  const context = useContext(IssueDetailsContext);

  if (!context) {
    throw new Error("useIssueDetails must be used within IssueDetailsProvider");
  }

  return context;
};
