import React, { useState } from "react";
import { calculateDeposit } from "./math";

export default function Deposit() {
  const [inputData, setInputData] = useState({
    initial: "0",
    monthly: "0",
    interest: "0",
    interestType: "year",
    length: "0",
    lengthType: "year",
  });
  const [showResult, setShowResult] = useState(false);
  const result = calculateDeposit(inputData);
  return (
    <div>
      <h2>
        Онлайн калькулятор. Калькулятор складних відсотків. Депозитний
        калькулятор
      </h2>
      <fieldset>
        <label htmlFor="initial" className="mr-2">
          Початковий внесок:
        </label>
        <input
          className="rounded border-2 border-gray-300"
          id="initial"
          type="number"
          value={inputData.initial}
          onChange={(e) => {
            setShowResult(false);
            setInputData({ ...inputData, initial: e.target.value });
          }}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="monthly" className="mr-2">
          Щомісячний внесок:
        </label>
        <input
          className="rounded border-2 border-gray-300"
          id="monthly"
          type="number"
          value={inputData.monthly}
          onChange={(e) => {
            setShowResult(false);
            setInputData({ ...inputData, monthly: e.target.value });
          }}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="interest" className="mr-2">
          Відсоткова ставка:
        </label>
        <input
          className="rounded border-2 border-gray-300"
          id="interest"
          type="number"
          value={inputData.interest}
          onChange={(e) => {
            setShowResult(false);
            setInputData({ ...inputData, interest: e.target.value });
          }}
        />
        <span className="mr-2">%</span>
        <select
          id="interestType"
          className="rounded"
          value={inputData.interestType}
          onChange={(e) => {
            setShowResult(false);
            setInputData({ ...inputData, interestType: e.target.value });
          }}
        >
          <option value="year">за рік</option>
          <option value="month">за місяць</option>
        </select>
      </fieldset>
      <fieldset>
        <label htmlFor="length" className="mr-2">
          Термін депозиту:
        </label>
        <input
          className="mr-2 rounded border-2 border-gray-300"
          id="length"
          min={0}
          type="number"
          value={inputData.length}
          onChange={(e) => {
            setShowResult(false);
            setInputData({ ...inputData, length: e.target.value });
          }}
        />
        <select
          className="rounded"
          id="lengthType"
          value={inputData.lengthType}
          onChange={(e) => {
            setShowResult(false);
            setInputData({ ...inputData, lengthType: e.target.value });
          }}
        >
          <option value="year">років</option>
          <option value="month">місяців</option>
        </select>
      </fieldset>
      <button className="mt-2 rounded p-2" onClick={() => setShowResult(true)}>
        Порахувати
      </button>
      {showResult &&
        (result !== undefined ? (
          <div>Кінцева сума виплат: {result.sum}</div>
        ) : (
          <div>Невірні вхідні дані</div>
        ))}
    </div>
  );
}
