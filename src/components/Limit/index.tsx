import React, { useState } from "react";
import LatexInput, { fixLatex } from "../LatexInput";
import { NumberInput, Select, SubmitButton } from "../shared";
import nerdamer from "nerdamer";
import Latex from "../Latex";

export default function Limit() {
  const [math, setMath] = useState("");
  const [limitMode, setLimitMode] = useState("plusInf");
  const [limitValue, setLimitValue] = useState("0");
  let limit = limitValue;
  if (limitMode === "plusInf") {
    limit = "Infinity";
  } else if (limitMode === "minusInf") {
    limit = "-Infinity";
  }
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
      <h2 className="text-2xl">Онлайн калькулятор. Границя функції онлайн</h2>
      <div className="mb-2 flex items-baseline gap-2">
        <Latex text="\lim" />
        <LatexInput
          defaultValue={math}
          className="flex-grow text-xl"
          onInput={(newValue) => {
            setResult(undefined);
            setMath(newValue);
          }}
        />
      </div>
      <div className="mb-2 flex">
        <Latex text="x \to\ " />
        <Select
          value={limitMode}
          onChange={(newValue) => {
            setResult(undefined);
            setLimitMode(newValue);
          }}
          className="mr-2"
          options={[
            { text: "+∞", value: "plusInf" },
            { text: "-∞", value: "minusInf" },
            { text: "Інше", value: "other" },
          ]}
        />
        {limitMode === "other" && (
          <NumberInput
            value={limitValue}
            className="w-16"
            onChange={setLimitValue}
          />
        )}
      </div>
      <SubmitButton
        onClick={() => {
          try {
            if (math.includes("null") || math.includes("undefined")) {
              throw "invalid latex";
            }
            const expr = nerdamer.convertFromLaTeX(fixLatex(math));
            try {
              const derivative = nerdamer(
                `limit(${expr.toString()}, x, ${limit})`,
              );
              const tex = derivative.toTeX();
              setResult({ success: true, data: tex });
            } catch (e) {
              setResult({
                success: false,
                error: "Програма не може знайти границю",
              });
            }
          } catch (e) {
            setResult({ success: false, error: "Некоректна формула" });
          }
        }}
      >
        Порахувати
      </SubmitButton>
      <div>
        {result &&
          (result.success ? (
            <Latex
              blockMode
              text={`\\lim_{x\\to${limit.replace(
                "Infinity",
                "\\infty",
              )}} ${math} = ${result.data}`}
            />
          ) : (
            result.error
          ))}
      </div>
    </div>
  );
}
