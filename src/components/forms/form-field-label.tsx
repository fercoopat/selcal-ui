import { memo } from "react";

import { FieldLabel, type FieldLabelProps } from "@/components/ui/field";

type Props = {
  required?: boolean;
} & FieldLabelProps;
const FormFieldLabel = ({ children, required = false, ...props }: Props) => {
  if (!children) return null;

  return (
    <FieldLabel {...props}>
      {children}
      {required && <span className="text-destructive">*</span>}
    </FieldLabel>
  );
};
export default memo(FormFieldLabel);
