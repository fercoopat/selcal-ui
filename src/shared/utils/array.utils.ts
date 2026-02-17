export const arrayByObjectEmpty = <T>(array: T[]) => {
  if (!Array.isArray(array) || array.length === 0) {
    return false;
  }

  for (const element of array) {
    if (
      typeof element === "object" &&
      element !== null &&
      Object.keys(element).length === 0
    ) {
      return true;
    }
  }

  return false;
};

export const insertAtPosition = <T>(
  arr: T[] | undefined,
  obj: T,
  index: number,
): T[] => {
  const newArray = arr ? [...arr] : [];

  newArray.splice(index, 0, obj);

  return newArray;
};

export const replaceAtPosition = <T>(
  arr: T[] | undefined,
  obj: T,
  index: number,
): T[] => {
  const newArray = arr ? [...arr] : [];

  if (index < 0 || index >= newArray.length) {
    return newArray;
  }

  newArray[index] = obj;
  return newArray;
};

export const removeAtPosition = <T>(
  arr: T[] | undefined,
  index: number,
): T[] => {
  const newArray = arr ? [...arr] : [];

  if (index < 0 || index >= newArray.length) {
    return newArray;
  }

  newArray.splice(index, 1);
  return newArray;
};
