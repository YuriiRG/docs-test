import { z } from "zod";

const floatRegex = /^-?[0-9]+([.,][0-9]+)?$/;
const floatTransform = (str: string) => {
  return Number(str.replace(",", "."));
};

const floatSchema = z.string().regex(floatRegex).transform(floatTransform);

const complexSchema = z.object({
  re: floatSchema,
  im: floatSchema,
});

const complexMathSchema = z.object({
  z1: complexSchema,
  z2: complexSchema,
  op: z.enum(["+", "-", "*", "/"]),
});

export function calculateComplexMath(input: {
  z1: { re: string; im: string };
  z2: { re: string; im: string };
  op: string;
}):
  | {
      re: number;
      im: number;
    }
  | undefined {
  const parseResult = complexMathSchema.safeParse(input);
  if (parseResult.success) {
    const { z1, z2, op } = parseResult.data;
    switch (op) {
      case "+":
        return {
          re: z1.re + z2.re,
          im: z1.im + z2.im,
        };
      case "-":
        return {
          re: z1.re - z2.re,
          im: z1.im - z2.im,
        };
      case "*":
        return {
          re: z1.re * z2.re - z1.im * z2.im,
          im: z1.re * z2.im + z1.im * z2.re,
        };
      case "/":
        return {
          re: (z1.re * z2.re + z1.im * z2.im) / (z2.re ** 2 + z2.im ** 2),
          im: (z1.im * z2.re - z1.re * z2.im) / (z2.re ** 2 + z2.im ** 2),
        };
    }
  } else {
    return undefined;
  }
}
