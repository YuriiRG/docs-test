import React, { useState } from "react";
import { Select, SubmitButton, VectorInput, floatSchema } from "../shared";
import Latex from "../Latex";
import { z } from "zod";

export default function Variance() {
  const [values, setValues] = useState(["0", "0"]);
  const [probabilities, setProbabilities] = useState(["0.5", "0.5"]);
  const [showResult, setShowResult] = useState(false);
  const result = calculateResult({ values, probabilities });
  return (
    <div>
      <h2 className="text-2xl">
        Онлайн калькулятор. Обчислення дисперсії дискретного розподілу.
      </h2>
      <div>
        <div>
          Оберіть кількість випадкових величин: <Latex text="n =\ " />
          <Select
            value={values.length.toString()}
            onChange={(newValue) => {
              setShowResult(false);
              setValues(Array(parseInt(newValue)).fill("0"));
              setProbabilities(Array(parseInt(newValue)).fill("0"));
            }}
            options={[
              { text: "2", value: "2" },
              { text: "3", value: "3" },
              { text: "4", value: "4" },
              { text: "5", value: "5" },
              { text: "6", value: "6" },
              { text: "7", value: "7" },
              { text: "8", value: "8" },
              { text: "9", value: "9" },
              { text: "10", value: "10" },
              { text: "11", value: "11" },
              { text: "12", value: "12" },
            ]}
          />
        </div>
        <div>
          <p className="m-0">
            Введіть значення випадкових величин і їх ймовірностей:
          </p>
          <VectorInput
            value={values}
            onChange={(newValues) => {
              setShowResult(false);
              setValues(newValues);
            }}
            startLabel={<Latex text="x_i\ " />}
            separator={<span aria-hidden className="inline-block w-2"></span>}
          />
          <div>
            <VectorInput
              value={probabilities}
              onChange={(newValues) => {
                setShowResult(false);
                setProbabilities(newValues);
              }}
              startLabel={<Latex text="p_i\ " />}
              separator={<span aria-hidden className="inline-block w-2"></span>}
            />
          </div>
        </div>
      </div>
      <SubmitButton className="my-2" onClick={() => setShowResult(true)}>
        Порахувати
      </SubmitButton>
      {showResult &&
        (result !== undefined ? (
          <div>
            <Latex text={`M[X]=${result}`} />
          </div>
        ) : (
          <div>
            Невірні вхідні дані. Всі значення повинні бути валідними числами та
            ймовірності повинні бути в діапазоні від 0 до 1. Сума ймовірностей
            повинна дорівнювати 1
          </div>
        ))}
    </div>
  );
}

const inputSchema = z.object({
  values: z.array(floatSchema),
  probabilities: z.array(floatSchema),
});

function calculateResult(
  input: z.input<typeof inputSchema>,
): number | undefined {
  const parseResult = inputSchema.safeParse(input);
  if (!parseResult.success) {
    return undefined;
  }

  const { values, probabilities } = parseResult.data;

  if (
    !floatEqual(
      probabilities.reduce((sum, n) => sum + n, 0),
      1,
      0.001,
    ) ||
    probabilities.some((val) => val > 1 || val < 0)
  ) {
    return undefined;
  }

  return (
    values.reduce((acc, val, i) => acc + val ** 2 * probabilities[i], 0) -
    values.reduce((acc, val, i) => acc + val * probabilities[i], 0) ** 2
  );
}

function floatEqual(x: number, y: number, tolerance = Number.EPSILON) {
  return Math.abs(x - y) < tolerance;
}
