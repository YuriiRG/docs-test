import React, { useState } from "react";
import {
  Select,
  SubmitButton,
  VectorInput,
  convertPointsToVector,
  floatSchema,
} from "../../shared";
import { z } from "zod";
import Latex from "../../Latex";
import { vectorLength } from "../../VecLength/math";

export default function DotProduct() {
  const [showResult, setShowResult] = useState(false);
  const [firstMode, setFirstMode] = useState("coords");
  const [secondMode, setSecondMode] = useState("coords");
  const [startPoint1, setStartPoint1] = useState(["0", "0"]);
  const [endPoint1, setEndPoint1] = useState(["0", "0"]);
  const [startPoint2, setStartPoint2] = useState(["0", "0"]);
  const [endPoint2, setEndPoint2] = useState(["0", "0"]);
  const result = calculateResult({
    startPoint1,
    endPoint1,
    startPoint2,
    endPoint2,
  });

  return (
    <div>
      <h2 className="text-2xl">
        Онлайн калькулятор. Розрахунок кута між векторами
      </h2>
      <div>
        Розмірність векторів:{" "}
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
            setStartPoint1(Array(Number(newValue)).fill("0"));
            setEndPoint1(Array(Number(newValue)).fill("0"));
            setStartPoint2(Array(Number(newValue)).fill("0"));
            setEndPoint2(Array(Number(newValue)).fill("0"));
          }}
        />
      </div>
      <div>
        Форма представлення першого вектора:{" "}
        <Select
          value={firstMode}
          onChange={(newValue) => {
            setShowResult(false);
            setFirstMode(newValue);
            setStartPoint1(Array(startPoint1.length).fill("0"));
            setEndPoint1(Array(endPoint1.length).fill("0"));
          }}
          options={[
            { text: "Координатами", value: "coords" },
            { text: "Точками", value: "points" },
          ]}
        />
      </div>
      <div>
        Форма представлення другого вектора:{" "}
        <Select
          value={secondMode}
          onChange={(newValue) => {
            setShowResult(false);
            setSecondMode(newValue);
            setStartPoint2(Array(startPoint2.length).fill("0"));
            setEndPoint2(Array(endPoint2.length).fill("0"));
          }}
          options={[
            { text: "Координатами", value: "coords" },
            { text: "Точками", value: "points" },
          ]}
        />
      </div>
      <div className="my-3 w-max border-2 border-x-0 border-y-gray-400 py-1">
        Перший вектор:
        {firstMode === "coords" ? (
          <VectorInput
            startLabel={<Latex text="\vec{a} = \{" />}
            separator={<Latex text=";\ " />}
            endLabel={<Latex text="\}" />}
            value={endPoint1}
            onChange={(newValue) => {
              setShowResult(false);
              setEndPoint1(newValue);
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
                value={startPoint1}
                onChange={(newValue) => {
                  setShowResult(false);
                  setStartPoint1(newValue);
                }}
              />
            </div>
            <div>
              Друга точка:
              <VectorInput
                startLabel={<Latex text="B = (" />}
                separator={<Latex text=",\ " />}
                endLabel={<Latex text=")" />}
                value={endPoint1}
                onChange={(newValue) => {
                  setShowResult(false);
                  setEndPoint1(newValue);
                }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="my-3 w-max border-2 border-x-0 border-y-gray-400 py-1">
        Другий вектор:
        {secondMode === "coords" ? (
          <VectorInput
            startLabel={<Latex text="\vec{b} = \{" />}
            separator={<Latex text=";\ " />}
            endLabel={<Latex text="\}" />}
            value={endPoint2}
            onChange={(newValue) => {
              setShowResult(false);
              setEndPoint2(newValue);
            }}
          />
        ) : (
          <div>
            <div>
              Перша точка:
              <VectorInput
                startLabel={<Latex text="C = (" />}
                separator={<Latex text=",\ " />}
                endLabel={<Latex text=")" />}
                value={startPoint2}
                onChange={(newValue) => {
                  setShowResult(false);
                  setStartPoint2(newValue);
                }}
              />
            </div>
            <div>
              Друга точка:
              <VectorInput
                startLabel={<Latex text="D = (" />}
                separator={<Latex text=",\ " />}
                endLabel={<Latex text=")" />}
                value={endPoint2}
                onChange={(newValue) => {
                  setShowResult(false);
                  setEndPoint2(newValue);
                }}
              />
            </div>
          </div>
        )}
      </div>
      <SubmitButton className="my-2" onClick={() => setShowResult(true)}>
        Порахувати
      </SubmitButton>
      {showResult &&
        (result !== undefined ? (
          <div>
            Кут між векторами{" "}
            <Latex
              text={
                firstMode === "coords" ? "\\vec{a}" : "\\overrightarrow{AB}"
              }
            />{" "}
            і{" "}
            <Latex
              text={
                secondMode === "coords" ? "\\vec{b}" : "\\overrightarrow{CD}"
              }
            />{" "}
            дорівнює <Latex text={`${result}\\degree`} />
          </div>
        ) : (
          <div>Невірні вхідні дані</div>
        ))}
    </div>
  );
}

const vectorSchema = z.object({
  startPoint1: z.array(floatSchema),
  endPoint1: z.array(floatSchema),
  startPoint2: z.array(floatSchema),
  endPoint2: z.array(floatSchema),
});

function calculateResult(input: z.input<typeof vectorSchema>) {
  const parseResult = vectorSchema.safeParse(input);
  if (!parseResult.success) {
    return undefined;
  }

  const { startPoint1, endPoint1, startPoint2, endPoint2 } = parseResult.data;

  const vector1 = convertPointsToVector(startPoint1, endPoint1);
  const vector2 = convertPointsToVector(startPoint2, endPoint2);

  if (vector1.some((n) => n === 0) || vector2.some((n) => n === 0)) {
    return undefined;
  }

  return (
    (Math.acos(
      vector1.map((n, i) => n * vector2[i]).reduce((sum, n) => sum + n, 0) /
        (vectorLength(vector1) * vectorLength(vector2)),
    ) *
      180) /
    Math.PI
  );
}
