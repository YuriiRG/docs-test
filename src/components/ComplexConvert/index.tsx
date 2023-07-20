import React, { useState } from "react";
import { ComplexInput, SubmitButton } from "../shared";
import { calculateComplexForms } from "./math";
import Latex from "../Latex";

export default function ComplexConvert() {
  const [showResult, setShowResult] = useState(false);
  const [z, setZ] = useState({
    re: "0",
    im: "0",
  });
  const result = calculateComplexForms(z);
  return (
    <div>
      <h2>
        Конвертер алгебраічної форми комплексного числа в тригонометричну та
        показникову
      </h2>
      <div>
        <ComplexInput
          id="z"
          value={z}
          onChange={(newValue) => {
            setShowResult(false);
            setZ(newValue);
          }}
        />
      </div>
      <SubmitButton onClick={() => setShowResult(true)} className="my-2">
        Порахувати
      </SubmitButton>
      {showResult &&
        (result !== undefined ? (
          <div>
            <div>
              Тригонометрична форма:{" "}
              <Latex
                text={`z ${
                  Number.isInteger(result.modulus) &&
                  Number.isInteger(result.argument)
                    ? "="
                    : "\\approx"
                } ${result.modulus}(${
                  result.argument === 0
                    ? `\\cos(0) + \\sin(0)i`
                    : `\\cos(${result.argument}\\pi) + \\sin(${result.argument}\\pi)i`
                })`}
              />
            </div>
            <div>
              Показникова форма:{" "}
              <Latex
                text={`z ${
                  Number.isInteger(result.modulus) &&
                  Number.isInteger(result.argument)
                    ? "="
                    : "\\approx"
                } ${
                  result.modulus === 0
                    ? "0"
                    : result.argument === 0
                    ? result.modulus
                    : `${result.modulus} e ^ {i \\pi ${result.argument}}`
                }`}
              />
            </div>
          </div>
        ) : (
          <div>Невірні вхідні дані</div>
        ))}
      {!showResult && (
        <div>
          <div>Тригонометрична форма:</div>
          <div>Показникова форма:</div>
        </div>
      )}
    </div>
  );
}
