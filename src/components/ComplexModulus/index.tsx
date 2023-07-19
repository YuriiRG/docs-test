import React, { useState } from "react";
import { calculateComplexModulus } from "./math";
import Latex from "../Latex";

export default function ComplexModulus() {
  const [re, setRe] = useState("0");
  const [im, setIm] = useState("0");
  const [showResult, setShowResult] = useState(false);
  const result = calculateComplexModulus(re, im);

  return (
    <div>
      <h2 className="text-2xl">
        Онлайн калькулятор. Модуль комплексного числа
      </h2>
      <div>
        <Latex text="z=\ " />
        <input
          type="number"
          value={re}
          className="w-16 rounded border-2 border-gray-300"
          onChange={(e) => {
            setShowResult(false);
            setRe(e.target.value);
          }}
        />
        <Latex text="\ +\ " />
        <input
          type="number"
          value={im}
          className="w-16 rounded border-2 border-gray-300"
          onChange={(e) => {
            setShowResult(false);
            setIm(e.target.value);
          }}
        />
        <Latex text="i" />
      </div>
      <div>
        {showResult && result === undefined ? (
          <div>Невірні вхідні дані</div>
        ) : (
          <Latex text={`|z| = ${showResult ? result : ""}`} />
        )}
      </div>
      <button className="mt-2 rounded p-2" onClick={() => setShowResult(true)}>
        Порахувати
      </button>
    </div>
  );
}
