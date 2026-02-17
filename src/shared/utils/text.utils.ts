export const joinText = (
  textArray: Array<string | undefined> = [],
  separator = " ",
): string => {
  return textArray.join(separator);
};
