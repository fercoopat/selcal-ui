import { CalendarIcon } from "lucide-react";
import { memo } from "react";
import type { Locale } from "react-day-picker";
import { enUS, es } from "react-day-picker/locale";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import FormFieldLabel from "@/components/forms/form-field-label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldError } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { formatDateValue } from "@/shared/utils/date.utils";

const LOCALES: Record<string, Locale> = {
  en: enUS,
  es: es,
  // 'fr': fr,
  // 'de': de,
  // 'pt': pt,
};

type Props = {
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};
const FormDateField = ({
  name,
  placeholder = "dates:dateFieldPlaceholder",
  ...props
}: Props) => {
  const form = useFormContext();

  const { t, i18n } = useTranslation();

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
            {props?.label}
          </FormFieldLabel>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                disabled={props?.disabled}
                className={cn(
                  "w-full pl-3 text-left font-normal",
                  !field.value && "text-muted-foreground",
                )}
              >
                {field.value ? (
                  formatDateValue(field.value)
                ) : (
                  <span>{t(placeholder)}</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                autoFocus
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                locale={LOCALES[i18n.language]}
              />
            </PopoverContent>
          </Popover>

          {!!fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
export default memo(FormDateField);
