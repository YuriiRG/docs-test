import React, { useState } from "react";
import {
  NumberInput,
  Select,
  SubmitButton,
  VectorInput,
  convertPointsToVector,
  floatSchema,
} from "../../shared";
import { z } from "zod";
import Latex from "../../Latex";

export default function ScaleVector() {
  const [showResult, setShowResult] = useState(false);
  const [mode, setMode] = useState("coords");
  const [startPoint, setStartPoint] = useState(["0", "0"]);
  const [endPoint, setEndPoint] = useState(["0", "0"]);
  const [scalar, setScalar] = useState("0");
  const result = calculateResult({
    startPoint,
    endPoint,
    scalar,
  });

  return (
    <div>
      <h2 className="text-2xl">
        Калькулятор для множення вектора на число (скаляр)
      </h2>
      <div>
        Розмірність вектора:{" "}
        <Select
          options={[
            { text: "2", value: "2" },
            { text: "3", value: "3" },
            { text: "4", value: "4" },
            { text: "5", value: "5" },
            { text: "6", value: "6" },
          ]}
          onChange={(newValue) => {
            setShowResult(false);
            setStartPoint(Array(Number(newValue)).fill("0"));
            setEndPoint(Array(Number(newValue)).fill("0"));
          }}
        />
      </div>
      <div>
        Форма представлення вектора:{" "}
        <Select
          value={mode}
          onChange={(newValue) => {
            setShowResult(false);
            setMode(newValue);
            setStartPoint(Array(startPoint.length).fill("0"));
            setEndPoint(Array(endPoint.length).fill("0"));
          }}
          options={[
            { text: "Координатами", value: "coords" },
            { text: "Точками", value: "points" },
          ]}
        />
      </div>
      <div>
        Значення вектора:
        {mode === "coords" ? (
          <VectorInput
            startLabel={<Latex text="\vec{a} = \{" />}
            separator={<Latex text=";\ " />}
            endLabel={<Latex text="\}" />}
            value={endPoint}
            onChange={(newValue) => {
              setShowResult(false);
              setEndPoint(newValue);
            }}
          />
        ) : (
          <div>
            <div>
              Перша точка:
              <VectorInput
                startLabel={<Latex text="A = (" />}
                separator={<Latex text=",\ " />}
                endLabel={<Latex text=")" />}
                value={startPoint}
                onChange={(newValue) => {
                  setShowResult(false);
                  setStartPoint(newValue);
                }}
              />
            </div>
            <div>
              Друга точка:
              <VectorInput
                startLabel={<Latex text="B = (" />}
                separator={<Latex text=",\ " />}
                endLabel={<Latex text=")" />}
                value={endPoint}
                onChange={(newValue) => {
                  setShowResult(false);
                  setEndPoint(newValue);
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div>
        Скаляр:{" "}
        <NumberInput
          value={scalar}
          onChange={(newValue) => {
            setScalar(newValue);
            setShowResult(false);
          }}
        />
      </div>
      <SubmitButton className="my-2" onClick={() => setShowResult(true)}>
        Порахувати
      </SubmitButton>
      {showResult &&
        (result !== undefined ? (
          <div>
            <Latex
              text={`${scalar} \\cdot ${
                mode === "coords" ? "\\vec{a}" : "\\overrightarrow{AB}"
              } = \\{${result.join("; ")}\\}`}
            />
          </div>
        ) : (
          <div>Невірні вхідні дані</div>
        ))}
    </div>
  );
}

const vectorSchema = z.object({
  startPoint: z.array(floatSchema),
  endPoint: z.array(floatSchema),
  scalar: floatSchema,
});

function calculateResult(input: z.input<typeof vectorSchema>) {
  const parseResult = vectorSchema.safeParse(input);
  if (!parseResult.success) {
    return undefined;
  }

  const { startPoint, endPoint, scalar } = parseResult.data;

  const vector = convertPointsToVector(startPoint, endPoint);

  return vector.map((n) => n * scalar);
}
