import { z } from "zod";

const floatRegex = /^-?[0-9]+([.,][0-9]+)?$/;
const floatTransform = (str: string) => {
  return Number(str.replace(",", "."));
};

const floatSchema = z.string().regex(floatRegex).transform(floatTransform);

export function calculateDeposit(inputData: {
  initial: string;
  monthly: string;
  interest: string;
  interestType: string;
  length: string;
  lengthType: string;
}):
  | {
      sum: number;
    }
  | undefined {
  const parseResult = z
    .object({
      initial: floatSchema,
      monthly: floatSchema,
      interest: floatSchema,
      interestType: z.enum(["year", "month"]),
      length: floatSchema.refine((n) => n >= 0),
      lengthType: z.enum(["year", "month"]),
    })
    .safeParse(inputData);
  if (parseResult.success === false) {
    return undefined;
  }

  let { initial, monthly, interest, interestType, length, lengthType } =
    parseResult.data;

  if (lengthType === "year") {
    length *= 12;
  }

  if (interestType === "year") {
    interest = (1 + interest / 100) ** (1 / 12) * 100 - 100;
  }

  console.log(interest, initial);

  let sum = initial;

  for (let i = 0; i < length; i++) {
    sum *= 1 + interest / 100;
    console.log(sum);
    sum += monthly;
  }

  sum -= monthly;

  sum = Math.round(sum * 100) / 100;

  return {
    sum,
  };
}
