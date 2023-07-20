export function calculateComplexModulus(
  inputRe: string,
  inputIm: string,
): number | undefined {
  const re = parseFloat(inputRe);
  const im = parseFloat(inputIm);
  if (isNaN(re) || isNaN(im)) {
    return undefined;
  }
  return Math.sqrt(re ** 2 + im ** 2);
}
