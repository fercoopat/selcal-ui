import { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";

import FormFieldLabel from "@/components/forms/form-field-label";
import { Field, FieldError } from "@/components/ui/field";
import {
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";

type Props = {
  name: string;
  children: React.ReactNode;
  label?: string;
  placeholder?: string;
} & React.ComponentProps<"select">;
const FormMultiselectField = ({ children, name, label, ...props }: Props) => {
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

          <MultiSelect
            {...field}
            {...props}
            values={field.value}
            onValuesChange={field.onChange}
          >
            <MultiSelectTrigger
              aria-invalid={fieldState.invalid}
              id={`form-${name}-field-title`}
              className="w-full max-w-100"
              disabled={props?.disabled}
            >
              <MultiSelectValue placeholder={props?.placeholder} />
            </MultiSelectTrigger>

            {children}
          </MultiSelect>

          {!!fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
export default memo(FormMultiselectField);
