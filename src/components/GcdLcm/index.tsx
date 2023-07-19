import React, { useState } from "react";
import { calculateGcdLcm } from "./math";
import { NumberInput, SubmitButton } from "../shared";

export default function GcdLcm() {
  const [num1, setNum1] = useState("0");
  const [num2, setNum2] = useState("0");
  const [showResult, setShowResult] = useState(false);
  const result = calculateGcdLcm(num1, num2);
  return (
    <div>
      <h2>Онлайн калькулятор. Обчислити НСД і НСК двох чисел</h2>
      <div>
        <NumberInput
          value={num1}
          onChange={(newValue) => {
            setShowResult(false);
            setNum1(newValue);
          }}
        />{" "}
        і{" "}
        <NumberInput
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
