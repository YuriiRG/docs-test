import React, { useState } from "react";
import { calculateGcdLcm } from "./math";

export default function GcdLcm() {
  const [num1, setNum1] = useState("0");
  const [num2, setNum2] = useState("0");
  const [showResult, setShowResult] = useState(false);
  const result = calculateGcdLcm(num1, num2);
  return (
    <div>
      <h2>Онлайн калькулятор. Обчислити НСД і НСК двох чисел</h2>
      <div>
        <input
          type="number"
          className="rounded border-2 border-gray-300"
          value={num1}
          onChange={(e) => {
            setShowResult(false);
            setNum1(e.target.value);
          }}
        />{" "}
        і{" "}
        <input
          type="number"
          value={num2}
          className="rounded border-2 border-gray-300"
          onChange={(e) => {
            setShowResult(false);
            setNum2(e.target.value);
          }}
        />
      </div>
      <button onClick={() => setShowResult(true)} className="mt-2 rounded p-2">
        Порахувати
      </button>
      {showResult &&
        (result ? (
          <>
            <div>Найбільший спільний дільник (НСД): {result.gcd}</div>
            <div>Найменше спільне кратне (НСК): {result.lcm}</div>
          </>
        ) : (
          <div>Невірні вхідні дані</div>
        ))}
      {!showResult && (
        <>
          <div>Найбільший спільний дільник (НСД):</div>
          <div>Найменше спільне кратне (НСК):</div>
        </>
      )}
    </div>
  );
}
