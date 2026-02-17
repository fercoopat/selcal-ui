import { memo } from "react";

type Props = {
  children: React.ReactNode;
  renderChildrenWhen: boolean;
  fallback: React.ReactNode;
};
const ConditionContainer = ({
  children,
  renderChildrenWhen = false,
  fallback,
}: Props) => {
  return <>{!renderChildrenWhen ? fallback : children}</>;
};
export default memo(ConditionContainer);
