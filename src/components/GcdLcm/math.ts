export function calculateGcdLcm(
  inputNum1: string,
  inputNum2: string,
):
  | {
      gcd: number;
      lcm: number;
    }
  | undefined {
  const a = parseInt(inputNum1);
  const b = parseInt(inputNum2);
  if (isNaN(a) || isNaN(b)) {
    return undefined;
  }
  if (a === 0 || b === 0) {
    return {
      gcd: 1,
      lcm: 0,
    };
  }
  const gcdResult = gcd(a, b);
  return {
    gcd: gcdResult,
    lcm: Math.abs(a * b) / gcdResult,
  };
}

function gcd(a: number, b: number): number {
  if (b == 0) {
    return a;
  }
  return gcd(b, a % b);
}
