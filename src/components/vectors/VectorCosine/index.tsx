import React, { type ReactNode, Fragment } from "react";
import { useState } from "react";
import { z } from "zod";
import Latex from "../../Latex";
import {
  Select,
  SubmitButton,
  VectorInput,
  convertPointsToVector,
  floatSchema,
} from "../../shared";
import { vectorLength } from "../../VecLength/math";

export default function App() {
  const [vector, setVector] = useState<string[]>(["0", "0"]);
  const [startPoint, setStartPoint] = useState<string[]>(["0", "0"]);
  const [endPoint, setEndPoint] = useState<string[]>(["0", "0"]);
  const [mode, setMode] = useState<string>("coords");
  const [showResult, setShowResult] = useState(false);

  let result = calculateResult(
    mode === "coords" ? { vector } : { startPoint, endPoint },
  );

  return (
    <div>
      <h1 className="mb-3 text-3xl font-bold">
        Калькулятор для обрахунку напрямних косинусів вектора
      </h1>
      <img
        src="https://ua.onlinemschool.com/pictures/vector/cos.png"
        alt="An image showing a vector and it's direction angles"
      />
      <div>
        Розмірність вектора:{" "}
        <Select
          id="dimensions"
          value={vector.length.toString()}
          onChange={(newValue) => {
            setVector(Array(parseInt(newValue)).fill("0"));
            setStartPoint(Array(parseInt(newValue)).fill("0"));
            setEndPoint(Array(parseInt(newValue)).fill("0"));
            setShowResult(false);
          }}
          options={[
            { value: "2", text: "2" },
            { value: "3", text: "3" },
          ]}
        />
      </div>
      <div>
        Форма представлення вектора <Latex text="\vec{a}" />:{" "}
        <Select
          id="mode"
          value={mode}
          onChange={(newValue) => {
            setShowResult(false);
            setMode(newValue);
          }}
          options={[
            { value: "coords", text: "Координатами" },
            { value: "points", text: "Точками" },
          ]}
        />
      </div>
      Введіть значення вектора:
      {mode === "coords" && (
        <VectorInput
          className="mb-2"
          value={vector}
          onChange={(newValue) => {
            setShowResult(false);
            setVector(newValue);
          }}
          startLabel={<Latex text="\vec{a} = \{" />}
          separator={<Latex text=";\ " />}
          endLabel={<Latex text="\}" />}
        />
      )}
      {mode === "points" && (
        <>
          <div>
            Початкова точка
            <VectorInput
              value={startPoint}
              onChange={(newValue) => {
                setShowResult(false);
                setStartPoint(newValue);
              }}
              startLabel={<Latex text="A = (" />}
              separator={<Latex text=",\ " />}
              endLabel={<Latex text=")" />}
            />
          </div>
          <div>
            Кінцева точка
            <VectorInput
              value={endPoint}
              onChange={(newValue) => {
                setShowResult(false);
                setEndPoint(newValue);
              }}
              startLabel={<Latex text="B = (" />}
              separator={<Latex text=",\ " />}
              endLabel={<Latex text=")" />}
            />
          </div>
        </>
      )}
      <SubmitButton className="my-2" onClick={() => setShowResult(true)}>
        Порахувати
      </SubmitButton>
      {showResult &&
        (result !== undefined ? (
          <div>
            {result[0] !== undefined && (
              <div>
                <Latex text={`\\cos\\alpha = ${result[0]}`} />
              </div>
            )}
            {result[1] !== undefined && (
              <div>
                <Latex text={`\\cos\\beta = ${result[1]}`} />
              </div>
            )}
            {result[2] !== undefined && (
              <div>
                <Latex text={`\\cos\\gamma = ${result[2]}`} />
              </div>
            )}
          </div>
        ) : (
          <div>Невірні вхідні дані</div>
        ))}
    </div>
  );
}

const inputSchema = z.union([
  z.object({
    vector: z.array(floatSchema),
  }),
  z.object({
    startPoint: z.array(floatSchema),
    endPoint: z.array(floatSchema),
  }),
]);

function calculateResult(input: z.input<typeof inputSchema>) {
  const parseResult = inputSchema.safeParse(input);
  if (!parseResult.success) {
    return undefined;
  }
  const vector =
    "vector" in parseResult.data
      ? parseResult.data.vector
      : convertPointsToVector(
          parseResult.data.startPoint,
          parseResult.data.endPoint,
        );

  const length = vectorLength(vector);

  if (length === 0) {
    return undefined;
  }

  return vector.map((n) => n / length);
}
