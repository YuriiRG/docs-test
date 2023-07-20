import React, { useState } from "react";
import { NumberInput, Select, SubmitButton } from "../shared";
import Latex from "../Latex";

export default function AddSubPercent() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [showResult, setShowResult] = useState(false);
  const result = calculateResult(num1, num2);
  return (
    <div>
      <h2 className="text-2xl">
        Онлайн калькулятор. Знайти на скільки відсотків число X більше (менше)
        числа Y
      </h2>
      <div>
        Знайти на скільки відсотків число{" "}
        <NumberInput
          className="w-24"
          value={num1}
          onChange={(newValue) => {
            setShowResult(false);
            setNum1(newValue);
          }}
        />{" "}
        більше/менше{" "}
        <NumberInput
          className="w-24"
          value={num2}
          onChange={(newValue) => {
            setShowResult(false);
            setNum2(newValue);
          }}
        />
      </div>
      <SubmitButton onClick={() => setShowResult(true)} className="my-2">
        Порахувати
      </SubmitButton>
      {showResult &&
        (result !== undefined ? (
          <div>
            Число {num1} на {Math.abs(result)}%{" "}
            {result < 0 ? "меньше" : "більше"} числа {num2}
          </div>
        ) : (
          <div>Невірні вхідні дані</div>
        ))}
    </div>
  );
}

function calculateResult(num1Str: string, num2Str: string): number | undefined {
  const a = parseFloat(num1Str);
  const b = parseFloat(num2Str);
  if (isNaN(a) || isNaN(b) || b === 0) {
    return undefined;
  }
  return ((a - b) / b) * 100;
}
