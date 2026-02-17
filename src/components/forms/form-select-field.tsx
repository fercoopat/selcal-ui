import { Controller, useFormContext } from "react-hook-form";

import FormFieldLabel from "@/components/forms/form-field-label";
import { genericMemo } from "@/components/hoc/generic-memo";
import { Field, FieldError } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props<T> = {
  name: string;
  options: Array<T> | undefined;
  getOptionValue: (option: T | undefined) => string;
  renderOption: (option: T | undefined) => React.ReactNode;
  autoFocus?: boolean;
  className?: string;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  required?: boolean;
};
const FormSelectField = <T,>({
  name,
  getOptionValue,
  options,
  renderOption,
  label,
  placeholder,
  ...props
}: Props<T>) => {
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

          <Select
            aria-invalid={fieldState.invalid}
            required={props?.required}
            value={field.value}
            onValueChange={field.onChange}
            disabled={props?.disabled}
          >
            <SelectTrigger
              id={`form-${name}-field-title`}
              disabled={props?.disabled}
            >
              <SelectValue
                autoFocus={props?.autoFocus}
                placeholder={placeholder}
              />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {options?.map((option, index) => (
                  <SelectItem key={index} value={getOptionValue(option)}>
                    {renderOption(option)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {!!fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
export default genericMemo(FormSelectField);
