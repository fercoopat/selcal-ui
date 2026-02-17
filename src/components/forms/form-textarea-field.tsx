import { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";

import FormFieldLabel from "@/components/forms/form-field-label";
import { Field, FieldError } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  name: string;
  label?: string;
} & React.ComponentProps<"textarea">;
const FormTextareaField = ({
  name,
  label,
  autoComplete = "off",
  ...props
}: Props) => {
  const form = useFormContext();

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={props?.className}>
          <FormFieldLabel
            htmlFor={`form-${name}-field-title`}
            required={props?.required}
          >
            {label}
          </FormFieldLabel>

          <Textarea
            {...field}
            {...props}
            id={`form-${name}-field-title`}
            aria-invalid={fieldState.invalid}
            autoComplete={autoComplete}
          />

          {!!fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
export default memo(FormTextareaField);
