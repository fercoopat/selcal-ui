import { PlusIcon, TrashIcon } from "lucide-react";
import { memo } from "react";
import { useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { IconButton } from "@/components/buttons";
import { FormInputField } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { ChemicalElementSelect } from "@/modules/chemical-elements/components/chemical-element-select";
import { joinText } from "@/shared/utils/text.utils";

type Props = {
  name: string;
  disabled?: boolean;
  required?: boolean;
};

const MaterialGradeChemicalCompositionField = ({
  name,
  disabled = false,
  required = false,
}: Props) => {
  const { t } = useTranslation();
  const { fields, append, remove } = useFieldArray({
    name,
  });

  return (
    <div className="mt-4 grid gap-2">
      {!!fields?.length && (
        <Field orientation="horizontal">
          <span className="w-full">
            {t("materialGrades:fields.chemicalElement")}
          </span>
          <span className="max-w-fit">
            {t("materialGrades:fields.percentage")}
          </span>
        </Field>
      )}

      {fields.map((value, index) => (
        <Field key={value.id || index} orientation="horizontal">
          <ChemicalElementSelect
            disabled={disabled}
            required={required}
            name={joinText([name, index, "chemicalElement"])}
          />
          <FormInputField
            disabled={disabled}
            required={required}
            type="number"
            className="max-w-fit"
            min={0}
            max={100}
            name={joinText([name, index, "percentage"])}
          />
          <IconButton
            variant={"ghost"}
            tooltip={t("common:remove")}
            onClick={() => remove(index)}
          >
            <TrashIcon />
          </IconButton>
        </Field>
      ))}

      <Button onClick={append}>
        <PlusIcon />
        <span>{t("common:add")}</span>
      </Button>
    </div>
  );
};

export default memo(MaterialGradeChemicalCompositionField);
