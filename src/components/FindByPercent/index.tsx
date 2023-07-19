import React, { useState } from "react";
import Latex from "../Latex";
import { NumberInput, SubmitButton } from "../shared";

export default function FindByPercent() {
  const [percent, setPercent] = useState("");
  const [num, setNum] = useState("");
  const [showResult, setShowResult] = useState(false);
  const result = calculateValueByPercent(percent, num);
  return (
    <div>
      <div>
        Знайти число <Latex text="x" /> якщо{" "}
        <NumberInput
          className="w-24"
          value={percent}
          onChange={(newValue) => {
            setPercent(newValue);
            setShowResult(false);
          }}
        />
        % від цього числа дорівнюють{" "}
        <NumberInput
          className="w-24"
          value={num}
          onChange={(newValue) => {
            setNum(newValue);
            setShowResult(false);
          }}
        />
      </div>
      <SubmitButton onClick={() => setShowResult(true)}>
        Порахувати
      </SubmitButton>
      {showResult &&
        (result !== undefined ? (
          <div>
            <Latex text={`x = ${result}`} />
          </div>
        ) : (
          <div>Невірні дані</div>
        ))}
      {!showResult && (
        <div>
          <Latex text="x =" />
        </div>
      )}
    </div>
  );
}

function calculateValueByPercent(
  percentStr: string,
  numStr: string,
): number | undefined {
  const percent = Number(percentStr);
  const num = Number(numStr);
  if (isNaN(percent) || isNaN(num) || num === 0) {
    return undefined;
  }
  return (100 * num) / percent;
}
