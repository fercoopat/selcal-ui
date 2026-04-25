import { memo } from "react";

import { FormSelectField } from "@/components/forms";
import { useFindAllChemicalElements } from "@/modules/chemical-elements/hooks";

type Props = {
  name: string;
  label?: string;
  className?: string
  disabled?: boolean;
  required?: boolean;
};

const ChemicalElementSelect = (props: Props) => {
  const { chemicalElements } = useFindAllChemicalElements();

  return (
    <FormSelectField
      options={chemicalElements}
      getOptionValue={(option) => option?.id ?? ""}
      renderOption={(item) => (
        <div>
          {item?.symbol} - {item?.name}
        </div>
      )}
      {...props}
    />
  );
};

export default memo(ChemicalElementSelect);
