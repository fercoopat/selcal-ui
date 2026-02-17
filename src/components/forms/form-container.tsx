import { FormProvider, type UseFormReturn } from "react-hook-form";

import { genericMemo } from "@/components/hoc/generic-memo";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormContextProps = UseFormReturn<any> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (payload: any) => void;
};

type Props = {
  children: React.ReactNode;
  id?: string;
} & FormContextProps;
const FormContainer = ({ children, onSubmit, ...props }: Props) => {
  return (
    <FormProvider {...props}>
      <form id={props?.id} onSubmit={props.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default genericMemo(FormContainer);
