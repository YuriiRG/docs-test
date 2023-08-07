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

export default function PointsToVector() {
  const [startPoint, setStartPoint] = useState(["0", "0"]);
  const [endPoint, setEndPoint] = useState(["0", "0"]);
  const [showResult, setShowResult] = useState(false);
  const result = calculateResult(startPoint, endPoint);
  return (
    <div>
      <h2 className="text-2xl">
        Калькулятор для обрахунку координат вектора за двома точками
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
          value={`${startPoint.length}`}
          onChange={(newValue) => {
            setStartPoint(Array(parseInt(newValue)).fill("0"));
            setEndPoint(Array(parseInt(newValue)).fill("0"));
          }}
        />
      </div>
      <div>
        Початкова точка:
        <VectorInput
          startLabel={<Latex text="A = (" />}
          separator={<Latex text=",\ " />}
          endLabel={<Latex text=")" />}
          value={startPoint}
          onChange={(newValue) => {
            setStartPoint(newValue);
            setShowResult(false);
          }}
        />
      </div>
      <div>
        Кінцева точка:
        <VectorInput
          startLabel={<Latex text="B = (" />}
          separator={<Latex text=",\ " />}
          endLabel={<Latex text=")" />}
          value={endPoint}
          onChange={(newValue) => {
            setEndPoint(newValue);
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
            <Latex text={`\\vec{AB} = \\{${result.join("; ")}\\}`} />
          </div>
        ) : (
          <div>Невірні вхідні дані</div>
        ))}
    </div>
  );
}

const pointsSchema = z.object({
  startPoint: z.array(floatSchema),
  endPoint: z.array(floatSchema),
});

function calculateResult(startPointStr: string[], endPointStr: string[]) {
  const parseResult = pointsSchema.safeParse({
    startPoint: startPointStr,
    endPoint: endPointStr,
  });
  if (!parseResult.success) {
    return undefined;
  }
  const { startPoint, endPoint } = parseResult.data;

  return convertPointsToVector(startPoint, endPoint);
}
