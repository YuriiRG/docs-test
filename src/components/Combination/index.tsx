import React, { useState } from "react";
import { NumberInput, SubmitButton } from "../shared";
import Latex from "../Latex";

export default function Combination() {
  const [showResult, setShowResult] = useState(false);
  const [n, setN] = useState("");
  const [k, setK] = useState("");
  const result = calculateResult(n, k);
  return (
    <div>
      <h2 className="text-2xl">
        Онлайн калькулятор. Число сполучень з n по k елементів
      </h2>
      <div>
        <fieldset>
          <Latex text="n =\ " />
          <NumberInput
            value={n}
            onChange={(newValue) => {
              setShowResult(false);
              setN(newValue);
            }}
            className="w-16"
          />
        </fieldset>
        <fieldset>
          <Latex text="k =\ " />
          <NumberInput
            value={k}
            onChange={(newValue) => {
              setShowResult(false);
              setK(newValue);
            }}
            className="w-16"
          />
        </fieldset>
      </div>
      <SubmitButton className="my-2" onClick={() => setShowResult(true)}>
        Порахувати
      </SubmitButton>
      {showResult &&
        (result !== undefined ? (
          <div>
            <Latex
              text={`C_{${n}}^{${k}}=${result
                .toString()
                .replace("Infinity", "\\infty")}`}
            />
          </div>
        ) : (
          <div>Невірні вхідні дані</div>
        ))}
    </div>
  );
}

function calculateResult(nStr: string, kStr: string) {
  const n = parseFloat(nStr);
  const k = parseFloat(kStr);

  if (isNaN(n) || isNaN(k) || k > n) {
    return undefined;
  }
  return factorial(n) / (factorial(n - k) * factorial(k));
}

function factorial(n: number): number {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
}
