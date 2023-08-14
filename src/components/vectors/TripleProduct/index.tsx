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

export default function TripleProduct() {
  const [showResult, setShowResult] = useState(false);
  const [firstMode, setFirstMode] = useState("coords");
  const [secondMode, setSecondMode] = useState("coords");
  const [thirdMode, setThirdMode] = useState("coords");
  const [startPoint1, setStartPoint1] = useState(["0", "0", "0"]);
  const [endPoint1, setEndPoint1] = useState(["0", "0", "0"]);
  const [startPoint2, setStartPoint2] = useState(["0", "0", "0"]);
  const [endPoint2, setEndPoint2] = useState(["0", "0", "0"]);
  const [startPoint3, setStartPoint3] = useState(["0", "0", "0"]);
  const [endPoint3, setEndPoint3] = useState(["0", "0", "0"]);
  const result = calculateResult({
    startPoint1,
    endPoint1,
    startPoint2,
    endPoint2,
    startPoint3,
    endPoint3,
  });

  return (
    <div>
      <h2 className="text-2xl">
        Калькулятор для обрахунку мішаного добутку векторів
      </h2>
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
      <div>
        Форма представлення третього вектора:{" "}
        <Select
          value={thirdMode}
          onChange={(newValue) => {
            setShowResult(false);
            setThirdMode(newValue);
            setStartPoint3(Array(startPoint2.length).fill("0"));
            setEndPoint3(Array(endPoint2.length).fill("0"));
          }}
          options={[
            { text: "Координатами", value: "coords" },
            { text: "Точками", value: "points" },
          ]}
        />
      </div>
      <div className="my-3 max-w-max border-2 border-x-0 border-y-gray-400 py-1">
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
      <div className="my-3 max-w-max border-2 border-x-0 border-y-gray-400 py-1">
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
      <div className="my-3 max-w-max border-2 border-x-0 border-y-gray-400 py-1">
        Третій вектор:
        {thirdMode === "coords" ? (
          <VectorInput
            startLabel={<Latex text="\vec{c} = \{" />}
            separator={<Latex text=";\ " />}
            endLabel={<Latex text="\}" />}
            value={endPoint3}
            onChange={(newValue) => {
              setShowResult(false);
              setEndPoint3(newValue);
            }}
          />
        ) : (
          <div>
            <div>
              Перша точка:
              <VectorInput
                startLabel={<Latex text="E = (" />}
                separator={<Latex text=",\ " />}
                endLabel={<Latex text=")" />}
                value={startPoint3}
                onChange={(newValue) => {
                  setShowResult(false);
                  setStartPoint3(newValue);
                }}
              />
            </div>
            <div>
              Друга точка:
              <VectorInput
                startLabel={<Latex text="F = (" />}
                separator={<Latex text=",\ " />}
                endLabel={<Latex text=")" />}
                value={endPoint3}
                onChange={(newValue) => {
                  setShowResult(false);
                  setEndPoint3(newValue);
                }}
              />
            </div>
          </div>
        )}
      </div>
      <SubmitButton className="my-2" onClick={() => setShowResult(true)}>
        Порахувати
      </SubmitButton>
      {showResult ? (
        result !== undefined ? (
          <div>
            <Latex
              text={`${
                firstMode === "coords" ? "\\vec{a}" : "\\overrightarrow{AB}"
              } \\cdot (${
                secondMode === "coords" ? "\\vec{b}" : "\\overrightarrow{CD}"
              } \\times ${
                thirdMode === "coords" ? "\\vec{c}" : "\\overrightarrow{EF}"
              }) = ${result}`}
            />
          </div>
        ) : (
          <div>Невірні вхідні дані</div>
        )
      ) : (
        <div>
          <Latex
            text={`${
              firstMode === "coords" ? "\\vec{a}" : "\\overrightarrow{AB}"
            } \\cdot (${
              secondMode === "coords" ? "\\vec{b}" : "\\overrightarrow{CD}"
            } \\times ${
              thirdMode === "coords" ? "\\vec{c}" : "\\overrightarrow{EF}"
            }) =`}
          />
        </div>
      )}
    </div>
  );
}

const vectorSchema = z.object({
  startPoint1: z.array(floatSchema).length(3),
  endPoint1: z.array(floatSchema).length(3),
  startPoint2: z.array(floatSchema).length(3),
  endPoint2: z.array(floatSchema).length(3),
  startPoint3: z.array(floatSchema).length(3),
  endPoint3: z.array(floatSchema).length(3),
});

function calculateResult(input: z.input<typeof vectorSchema>) {
  const parseResult = vectorSchema.safeParse(input);
  if (!parseResult.success) {
    return undefined;
  }

  const {
    startPoint1,
    endPoint1,
    startPoint2,
    endPoint2,
    startPoint3,
    endPoint3,
  } = parseResult.data;

  const vector1 = convertPointsToVector(startPoint1, endPoint1);
  const vector2 = convertPointsToVector(startPoint2, endPoint2);
  const vector3 = convertPointsToVector(startPoint3, endPoint3);

  const crossProduct = [
    vector2[1] * vector3[2] - vector2[2] * vector3[1],
    -(vector2[0] * vector3[2] - vector2[2] * vector3[0]),
    vector2[0] * vector3[1] - vector2[1] * vector3[0],
  ];

  return vector1
    .map((n, i) => n * crossProduct[i])
    .reduce((sum, n) => sum + n, 0);
}
