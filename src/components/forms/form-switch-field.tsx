import { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

type Props = {
  name: string;
  label?: string;
} & React.ComponentProps<typeof Switch>;
const FormSwitchField = ({
  name,
  label,
  className,
  disabled,
  ...props
}: Props) => {
  const form = useFormContext();

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-2">
          <Field
            data-invalid={fieldState.invalid}
            className={className}
            orientation={"horizontal"}
          >
            <Switch
              {...props}
              id={`form-${name}-field`}
              checked={field.value ?? false}
              onCheckedChange={field.onChange}
              disabled={disabled}
              aria-invalid={fieldState.invalid}
            />

            <FieldLabel htmlFor={`form-${name}-field`}>
              {label}
              {props?.required && "*"}
            </FieldLabel>
          </Field>

          {!!fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </div>
      )}
    />
  );
};
export default memo(FormSwitchField);
