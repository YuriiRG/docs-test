import React, { type ReactNode, Fragment } from "react";
import { useState } from "react";
import { z } from "zod";
import { pointDistance, vectorLength } from "./math";
import Latex from "../Latex";
import { Select, SubmitButton, VectorInput, floatSchema } from "../shared";

export default function App() {
  const [vectorStr, setVectorStr] = useState<string[]>(["0", "0"]);
  const [startPointStr, setStartPointStr] = useState<string[]>(["0", "0"]);
  const [endPointStr, setEndPointStr] = useState<string[]>(["0", "0"]);
  const [mode, setMode] = useState<string>("coords");
  const [showResult, setShowResult] = useState(false);

  const vectorParseResult = z.array(floatSchema).safeParse(vectorStr);
  const vector = vectorParseResult.success ? vectorParseResult.data : undefined;

  const startParseResult = z.array(floatSchema).safeParse(startPointStr);
  const startPoint = startParseResult.success
    ? startParseResult.data
    : undefined;

  const endParseResult = z.array(floatSchema).safeParse(endPointStr);
  const endPoint = endParseResult.success ? endParseResult.data : undefined;

  let result: number | undefined = undefined;
  if (vector && mode === "coords") {
    result = vectorLength(vector);
  } else if (startPoint && endPoint && mode === "points") {
    result = pointDistance(startPoint, endPoint);
  }

  return (
    <div>
      <h1 className="mb-3 text-3xl font-bold">
        Калькулятор для обрахунку довжини вектора (модуля вектора)
      </h1>
      <LabeledSelect
        label="Розмірність вектора:"
        id="dimensions"
        value={vectorStr.length.toString()}
        onChange={(newValue) => {
          setVectorStr(Array(parseInt(newValue)).fill("0"));
          setStartPointStr(Array(parseInt(newValue)).fill("0"));
          setEndPointStr(Array(parseInt(newValue)).fill("0"));
          setShowResult(false);
        }}
        options={[
          { value: "2", text: "2" },
          { value: "3", text: "3" },
          { value: "4", text: "4" },
          { value: "5", text: "5" },
          { value: "6", text: "6" },
        ]}
      />
      <LabeledSelect
        label={
          <>
            Форма представлення вектора <Latex text="\vec{a}" />
            {""}:
          </>
        }
        id="mode"
        value={mode}
        onChange={(newValue) => {
          setShowResult(false);
          setMode(newValue);
          setStartPointStr(Array(startPointStr.length).fill("0"));
          setEndPointStr(Array(endPointStr.length).fill("0"));
          setVectorStr(Array(vectorStr.length).fill("0"));
        }}
        options={[
          { value: "coords", text: "Координатами" },
          { value: "points", text: "Точками" },
        ]}
      />
      <p className="mb-1">Введіть значення вектора:</p>
      {mode === "coords" && (
        <VectorInput
          className="mb-2"
          value={vectorStr}
          onChange={(newValue) => {
            setShowResult(false);
            setVectorStr(newValue);
          }}
          startLabel={<Latex text="\vec{a} = \{" />}
          separator={<Latex text=";\ " />}
          endLabel={<Latex text="\}" />}
        />
      )}
      {mode === "points" && (
        <>
          <p className="mb-1">Початкова точка</p>
          <VectorInput
            value={startPointStr}
            onChange={(newValue) => {
              setShowResult(false);
              setStartPointStr(newValue);
            }}
            startLabel={<Latex text="A = (" />}
            separator={<Latex text=",\ " />}
            endLabel={<Latex text=")" />}
          />
          <p className="mb-1">Кінцева точка</p>
          <VectorInput
            value={endPointStr}
            onChange={(newValue) => {
              setShowResult(false);
              setEndPointStr(newValue);
            }}
            startLabel={<Latex text="B = (" />}
            separator={<Latex text=",\ " />}
            endLabel={<Latex text=")" />}
          />
        </>
      )}
      <SubmitButton className="mb-2" onClick={() => setShowResult(true)}>
        Порахувати
      </SubmitButton>
      <br />
      {!showResult && <Latex className="block" text={`|\\vec{a}| =`} />}
      {showResult && result !== undefined && (
        <Latex
          text={`|\\vec{a}| ${
            Number.isInteger(result) ? "=" : "\\approx"
          } ${result}`}
        />
      )}
      {showResult && result === undefined && <>Невірні вхідні дані</>}

      <h2 className="mt-2 text-2xl font-bold">Теорія</h2>
      <p>
        Модуль вектора (довжина вектора) <Latex text="|\vec{a}|" /> в
        прямокутних декартових координатах дорівнює квадратному кореню з суми
        квадратів його координат.
      </p>
      <p>
        Наприклад для вектора <Latex text="\vec{a} = \{a_x; a_y; a_z\}" />{" "}
        довжина вектора обраховується наступним чином:
      </p>
      <Latex
        className="block"
        text="|\vec{a}| = \sqrt{a_x^2 + a_y^2 + a_z^2}"
        blockMode
      />
    </div>
  );
}

function LabeledSelect({
  id,
  label,
  options,
  value,
  onChange,
}: {
  id: string;
  label: ReactNode;
  options: { value: string; text: ReactNode }[];
  value?: string;
  onChange: (newValue: string) => void;
}) {
  return (
    <fieldset className="mb-2">
      <label htmlFor={id} className="mr-2">
        {label}
      </label>
      <Select
        id={id}
        value={value}
        onChange={onChange}
        className="align-baseline"
        options={options}
      />
    </fieldset>
  );
}
