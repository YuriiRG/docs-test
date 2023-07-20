export function calculateComplexForms(inputZ: { re: string; im: string }):
  | {
      modulus: number;
      argument: number;
    }
  | undefined {
  const x = parseFloat(inputZ.re);
  const y = parseFloat(inputZ.im);
  if (isNaN(x) || isNaN(y)) {
    return undefined;
  }

  const modulus = Math.sqrt(x ** 2 + y ** 2);

  let argument = 0;

  if (x > 0) {
    argument = Math.atan(y / x);
  } else if (x < 0 && y >= 0) {
    argument = Math.PI + Math.atan(y / x);
  } else if (x < 0 && y < 0) {
    argument = Math.atan(y / x) - Math.PI;
  } else if (x === 0 && y > 0) {
    argument = Math.PI / 2;
  } else if (x === 0 && y < 0) {
    argument = -Math.PI / 2;
  }

  return {
    argument: Math.round((argument / Math.PI) * 1000) / 1000,
    modulus: Math.round(modulus * 1000) / 1000,
  };
}
