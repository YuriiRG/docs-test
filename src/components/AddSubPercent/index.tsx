import React, { useState } from "react";
import { NumberInput, Select, SubmitButton } from "../shared";
import Latex from "../Latex";

export default function AddSubPercent() {
  const [percent, setPercent] = useState("");
  const [sign, setSign] = useState("+");
  const [num, setNum] = useState("");
  const [showResult, setShowResult] = useState(false);
  const result = calculateResult(percent, num, sign);
  return (
    <div>
      <h2 className="text-2xl">
        Онлайн калькулятор. Додати або відняти X відсотків від числа
      </h2>
      <div>
        Знайти число <Latex text="x" /> на{" "}
        <NumberInput
          className="w-24"
          value={percent}
          onChange={(newValue) => {
            setShowResult(false);
            setPercent(newValue);
          }}
        />
        %{" "}
        <Select
          value={sign}
          onChange={(newValue) => {
            setSign(newValue);
          }}
          options={[
            { value: "+", text: "більше" },
            { value: "-", text: "меньше" },
          ]}
        />{" "}
        від числа{" "}
        <NumberInput
          className="w-24"
          value={num}
          onChange={(newValue) => {
            setShowResult(false);
            setNum(newValue);
          }}
        />
      </div>
      <SubmitButton onClick={() => setShowResult(true)} className="my-2">
        Порахувати
      </SubmitButton>
      {showResult &&
        (result !== undefined ? (
          <div>
            <Latex text={`x = ${result}`} />
          </div>
        ) : (
          <div>Невірні вхідні дані</div>
        ))}
      {!showResult && (
        <div>
          <Latex text="x =" />
        </div>
      )}
    </div>
  );
}

function calculateResult(
  percentStr: string,
  numStr: string,
  sign: string,
): number | undefined {
  const percent = parseFloat(percentStr);
  const num = parseFloat(numStr);
  if (isNaN(num) || isNaN(percent) || !["+", "-"].includes(sign)) {
    return undefined;
  }
  if (sign === "+") {
    return num + num * (percent / 100);
  } else {
    return num - num * (percent / 100);
  }
}
