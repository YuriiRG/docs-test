import React, { useState } from "react";
import { calculateDeposit } from "./math";
import { NumberInput, Select } from "../shared";

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
        <NumberInput
          id="initial"
          value={inputData.initial}
          onChange={(newValue) => {
            setShowResult(false);
            setInputData({ ...inputData, initial: newValue });
          }}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="monthly" className="mr-2">
          Щомісячний внесок:
        </label>
        <NumberInput
          id="monthly"
          value={inputData.monthly}
          onChange={(newValue) => {
            setShowResult(false);
            setInputData({ ...inputData, monthly: newValue });
          }}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="interest" className="mr-2">
          Відсоткова ставка:
        </label>
        <NumberInput
          id="interest"
          value={inputData.interest}
          onChange={(newValue) => {
            setShowResult(false);
            setInputData({ ...inputData, interest: newValue });
          }}
        />
        <span className="mr-2">%</span>
        <Select
          id="interestType"
          value={inputData.interestType}
          onChange={(newValue) => {
            setShowResult(false);
            setInputData({ ...inputData, interestType: newValue });
          }}
          options={[
            { value: "year", text: "за рік" },
            { value: "month", text: "за місяць" },
          ]}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="length" className="mr-2">
          Термін депозиту:
        </label>
        <NumberInput
          className="mr-2"
          id="length"
          positive
          value={inputData.length}
          onChange={(newValue) => {
            setShowResult(false);
            setInputData({ ...inputData, length: newValue });
          }}
        />
        <Select
          id="lengthType"
          value={inputData.lengthType}
          onChange={(newValue) => {
            setShowResult(false);
            setInputData({ ...inputData, lengthType: newValue });
          }}
          options={[
            { value: "year", text: "років" },
            { value: "month", text: "місяців" },
          ]}
        />
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
