import React, { useState } from "react";
import Latex from "../Latex";
import LatexInput, { fixLatex } from "../LatexInput";
import nerdamer, { convertFromLaTeX, integrate } from "nerdamer";
import { NumberInput, SubmitButton } from "../shared";

require("nerdamer/all");

export default function DefIntegral() {
  const [math, setMath] = useState("");
  const [from, setFrom] = useState("0");
  const [to, setTo] = useState("0");
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
        Онлайн калькулятор. Розв'язання визначених інтегралів онлайн
      </h2>
      <div>
        Знайти визначений інтеграл від{" "}
        <NumberInput
          value={from}
          onChange={(newValue) => {
            setResult(undefined);
            setFrom(newValue);
          }}
          className="w-20"
        />{" "}
        до{" "}
        <NumberInput
          value={to}
          onChange={(newValue) => {
            setResult(undefined);
            setTo(newValue);
          }}
          className="w-20"
        />
      </div>
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
        <Latex text="dx" />
      </div>
      <SubmitButton
        className="my-2"
        onClick={() => {
          try {
            const expr = convertFromLaTeX(fixLatex(math));
            try {
              const defIntegral = nerdamer(
                `defint(${expr.toString()}, ${from}, ${to}, x)`,
              );
              const tex = defIntegral.toTeX();
              if (tex.includes("\\int")) {
                // it means that nerdamer cannot calculate this def integral

                throw "can't calculate";
              }
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
              text={`\\int_{${nerdamer(from).toTeX()}}^{${nerdamer(
                to,
              ).toTeX()}}\\left(${math}\\right) dx=${result.data}`}
              blockMode
            />
          </div>
        ) : (
          <div>{result.error}</div>
        ))}
    </div>
  );
}
