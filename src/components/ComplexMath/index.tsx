import React, { useState } from "react";
import Latex from "../Latex";
import { calculateResult } from "./math";

export default function ComplexMath() {
  const [showResult, setShowResult] = useState(false);
  const [z1, setZ1] = useState({ re: "0", im: "0" });
  const [z2, setZ2] = useState({ re: "0", im: "0" });
  const [op, setOp] = useState("+");

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">
        Калькулятор для додавання, віднімання, множення та ділення комплексних
        чисел
      </h1>
      <ComplexInput
        name="z_1"
        value={z1}
        setValue={(newValue) => {
          setShowResult(false);
          setZ1(newValue);
        }}
      />
      <ComplexInput
        name="z_2"
        value={z2}
        setValue={(newValue) => {
          setShowResult(false);
          setZ2(newValue);
        }}
      />
      <fieldset>
        <Latex text="z_1\ " />
        <select
          value={op}
          onChange={(e) => {
            setShowResult(false);
            setOp(e.target.value);
          }}
          className="rounded"
        >
          <option value="+"> + </option>
          <option value="-"> - </option>
          <option value="*"> × </option>
          <option value="/"> / </option>
        </select>
        {(() => {
          if (showResult) {
            const result = calculateResult({ z1, z2, op });
            if (result !== undefined) {
              return <Latex text={`\\ z_2 = ${result.re} + ${result.im}i`} />;
            } else {
              return (
                <>
                  <Latex text={`\\ z_2 =\\ `} />
                  <span>невірні вхідні дані</span>
                </>
              );
            }
          } else {
            return <Latex text={`\\ z_2 =`} />;
          }
        })()}
      </fieldset>

      <button onClick={() => setShowResult(true)} className="mt-2 rounded p-2">
        Порахувати
      </button>
    </div>
  );
}

function ComplexInput({
  name,
  value,
  setValue,
}: {
  name: string;
  value: {
    re: string;
    im: string;
  };
  setValue: (newValue: { re: string; im: string }) => void;
}) {
  return (
    <fieldset>
      <Latex text={`${name} =\\ `} />
      <input
        id={`Re(${name})`}
        type="number"
        step="any"
        value={value.re}
        onChange={(e) => setValue({ ...value, re: e.target.value })}
        className="w-16 rounded border-2 border-gray-300"
      />
      <Latex text="\ +\ " />
      <input
        id={`Im(${name})`}
        type="number"
        step="any"
        value={value.im}
        onChange={(e) => setValue({ ...value, im: e.target.value })}
        className="w-16 rounded border-2 border-gray-300"
      />
      <Latex text="i" />
    </fieldset>
  );
}
