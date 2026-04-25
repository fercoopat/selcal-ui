export const joinText = (
  textArray: Array<string | number | undefined> = [],
  separator = " ",
): string => {
  return textArray.join(separator);
};
