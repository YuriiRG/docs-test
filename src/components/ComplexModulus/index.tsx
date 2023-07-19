import React, { useState } from "react";
import { calculateComplexModulus } from "./math";
import Latex from "../Latex";
import { ComplexInput, SubmitButton } from "../shared";

export default function ComplexModulus() {
  const [num, setNum] = useState({
    re: "0",
    im: "0",
  });
  const [showResult, setShowResult] = useState(false);
  const result = calculateComplexModulus(num.re, num.im);

  return (
    <div>
      <h2 className="text-2xl">
        Онлайн калькулятор. Модуль комплексного числа
      </h2>
      <div>
        <ComplexInput
          id="z"
          onChange={(newValue) => {
            setNum(newValue);
            setShowResult(false);
          }}
          value={num}
        />
      </div>
      <div>
        {showResult && result === undefined ? (
          <div>Невірні вхідні дані</div>
        ) : (
          <Latex text={`|z| = ${showResult ? result : ""}`} />
        )}
      </div>
      <SubmitButton className="mt-2" onClick={() => setShowResult(true)}>
        Порахувати
      </SubmitButton>
    </div>
  );
}
