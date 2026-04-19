import { useMemo, useState } from "react";

export const useToggle = (initValue = false) => {
  const [isOpen, setIsOpen] = useState(initValue);

  return useMemo(
    () => ({
      isOpen,
      onOpen: () => setIsOpen(true),
      onClose: () => setIsOpen(false),
      onToggle: () => setIsOpen((prev) => !prev),
    }),
    [isOpen],
  );
};
