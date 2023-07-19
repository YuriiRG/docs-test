import React, { useState } from "react";
import Latex from "../Latex";
import { calculateComplexMath } from "./math";
import { ComplexInput, SubmitButton } from "../shared";
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
        id="z_1"
        value={z1}
        onChange={(newValue) => {
          setShowResult(false);
          setZ1(newValue);
        }}
      />
      <ComplexInput
        id="z_2"
        value={z2}
        onChange={(newValue) => {
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
            const result = calculateComplexMath({ z1, z2, op });
            if (result !== undefined) {
              return (
                <Latex
                  text={`\\ z_2 = ${result.re} ${
                    result.im !== 0 ? `+ ${result.im}i` : ""
                  }`}
                />
              );
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

      <SubmitButton onClick={() => setShowResult(true)} className="mt-1">
        Порахувати
      </SubmitButton>
    </div>
  );
}
