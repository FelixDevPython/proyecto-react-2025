export const parseFloatNumber = (number, afterPoint = 2) => {
  const parsed = parseFloat(number);
  if (isNaN(parsed)) return "-";
  return parsed.toFixed(afterPoint);
};
