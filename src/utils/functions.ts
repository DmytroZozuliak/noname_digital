export const stringAvatar = (name: string): string => {
  const [first, second] = name.split(' ');
  return second ? `${first[0]}${second[0]}`.toUpperCase() : first[0].toUpperCase();
};

export const getSubstring = (string: string): string => {
  const stringLength = string.length;
  const lastIndex = 20;
  const subString = string.substring(0, lastIndex);
  return stringLength > lastIndex ? `${subString}...` : subString;
};

export const getDynamicPath = (path: string, replacedItem: number) => {
  return path.replace(':id', replacedItem.toString());
};
