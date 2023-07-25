import React, { useState } from "react";
import Latex from "../Latex";
import LatexInput, { fixLatex } from "../LatexInput";
import { convertFromLaTeX, integrate } from "nerdamer";
import { SubmitButton } from "../shared";

require("nerdamer/all");

export default function Integral() {
  const [math, setMath] = useState("");
  const [result, setResult] = useState<
    | {
        success: true;
        data: string;
      }
    | {
        success: false;
        error: string;
      }
  >();
  return (
    <div>
      <h2 className="text-2xl">
        Онлайн калькулятор. Розв'язання інтегралів онлайн
      </h2>
      <div className="mt-2 flex items-center">
        <Latex className="text-2xl" text="\int" />
        <LatexInput
          defaultValue={math}
          className="grow text-xl"
          onInput={(newMath) => {
            setResult(undefined);
            setMath(newMath);
          }}
        />
      </div>
      <SubmitButton
        className="my-2"
        onClick={() => {
          try {
            if (math.includes("null") || math.includes("undefined")) {
              throw "invalid latex";
            }
            const expr = convertFromLaTeX(fixLatex(math));
            try {
              const integral = integrate(expr, "x");
              const tex = integral.toTeX();
              console.log(tex);
              setResult({ success: true, data: tex });
            } catch (e) {
              setResult({
                success: false,
                error: "Програма не може знайти інтеграл",
              });
            }
          } catch (e) {
            setResult({ success: false, error: "Некоректна формула" });
          }
        }}
      >
        Порахувати
      </SubmitButton>
      {result &&
        (result.success ? (
          <div>
            <Latex
              text={`\\int\\left(${math}\\right) dx=${result.data} + C`}
              blockMode
            />
          </div>
        ) : (
          <div>{result.error}</div>
        ))}
    </div>
  );
}
