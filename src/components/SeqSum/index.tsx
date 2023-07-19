import React from "react";
import {
  ChangeEventHandler,
  MouseEventHandler,
  ReactNode,
  useState,
} from "react";
import { z } from "zod";
import Latex from "../Latex";
import { sumFirstLast, sumFirstStep, sumOneStep, sumTwo } from "./math";
import {
  NumberInput,
  SubmitButton,
  floatSchema,
  integerSchema,
} from "../shared";

export default function SeqSum() {
  const [mode, setMode] = useState("firstLast");
  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">
        Знайти суму арифметичної прогресії
      </h1>
      <h2 className="mb-2 text-2xl font-bold">Калькулятор</h2>
      <fieldset className="border-0">
        <RadioButton
          group="mode"
          id="firstLast"
          checked={mode === "firstLast"}
          label={
            <>
              значення першого та останнього членів арифметичної прогресії (
              <Latex text="a_1" />, <Latex text="a_n" />)
            </>
          }
          onChange={(e) => setMode(e.target.value)}
        />
        <RadioButton
          group="mode"
          id="firstStep"
          checked={mode === "firstStep"}
          label={
            <>
              значення першого члена арифметичної прогресії і крок прогресії (
              <Latex text="a_1" />, <Latex text="d" />)
            </>
          }
          onChange={(e) => setMode(e.target.value)}
        />
        <RadioButton
          group="mode"
          id="oneStep"
          checked={mode === "oneStep"}
          label={
            <>
              значення одного з членів арифметичної прогресії і крок прогресії (
              <Latex text="a_i" />, <Latex text="d" />)
            </>
          }
          onChange={(e) => setMode(e.target.value)}
        />
        <RadioButton
          group="mode"
          id="two"
          checked={mode === "two"}
          label={
            <>
              значення двох членів арифметичної прогресії (
              <Latex text="a_i" />, <Latex text="a_j" />)
            </>
          }
          onChange={(e) => setMode(e.target.value)}
        />
      </fieldset>
      Введіть дані:
      {mode === "firstLast" && <FirstLastForm />}
      {mode === "firstStep" && <FirstStepForm />}
      {mode === "oneStep" && <OneStepForm />}
      {mode === "two" && <TwoForm />}
      <h2 className="my-2 text-2xl font-bold">Теорія</h2>
      Сума перших <Latex text="n" /> членів арифметичної прогресії{" "}
      <Latex text="S_n = a_1 + a_2 + ... + a_n" /> може бути знайдена за
      формулами:
      <Latex
        className="block"
        text="S_n = \frac{a_1+a_n}{2} \cdot n"
        blockMode
      />
      <Latex
        className="block"
        text="S_n = \frac{2a_1+(n-1)d}{2} \cdot n"
        blockMode
      />
    </div>
  );
}

const firstLastSchema = z.object({
  n: integerSchema,
  first: floatSchema,
  last: floatSchema,
});

function FirstLastForm() {
  const [inputVars, setInputVars] = useState({
    n: "",
    first: "",
    last: "",
  });
  const [showResult, setShowResult] = useState(false);

  const parseResult = firstLastSchema.safeParse(inputVars);
  const variables = parseResult.success ? parseResult.data : undefined;

  return (
    <form className="mt-3 flex flex-col items-start gap-3">
      <LabeledNumberInput
        id="n"
        onChange={(newValue) => {
          setInputVars({ ...inputVars, n: newValue });
          setShowResult(false);
        }}
        value={inputVars.n}
        label={<Latex className="block" text="n = " />}
        integer
      />
      <LabeledNumberInput
        label={<Latex className="block" text="a_1 = " />}
        id="first"
        onChange={(newValue) => {
          setInputVars({ ...inputVars, first: newValue });
          setShowResult(false);
        }}
        value={inputVars.first}
      />
      <LabeledNumberInput
        label={<Latex className="block" text="a_n = " />}
        id="last"
        onChange={(newValue) => {
          setInputVars({ ...inputVars, last: newValue });
          setShowResult(false);
        }}
        value={inputVars.last}
      />
      <SubmitButton
        onClick={(e) => {
          e.preventDefault();
          setShowResult(true);
        }}
      >
        Порахувати
      </SubmitButton>
      {!showResult && "Сума:"}
      {showResult && variables !== undefined && (
        <>Сума: {sumFirstLast(variables)}</>
      )}
      {showResult && variables === undefined && "Невірні вхідні дані."}
    </form>
  );
}

const firstStepSchema = z.object({
  n: integerSchema,
  first: floatSchema,
  step: floatSchema,
});

function FirstStepForm() {
  const [inputVars, setInputVars] = useState({
    n: "",
    first: "",
    step: "",
  });
  const [showResult, setShowResult] = useState(false);

  const parseResult = firstStepSchema.safeParse(inputVars);
  const variables = parseResult.success ? parseResult.data : undefined;

  return (
    <form className="mt-3 flex flex-col items-start gap-3">
      <LabeledNumberInput
        label={<Latex className="block" text="n = " />}
        id="n"
        onChange={(newValue) => {
          setInputVars({ ...inputVars, n: newValue });
          setShowResult(false);
        }}
        value={inputVars.n}
        integer
      />
      <LabeledNumberInput
        label={<Latex className="block" text="a_1 = " />}
        id="first"
        onChange={(newValue) => {
          setInputVars({ ...inputVars, first: newValue });
          setShowResult(false);
        }}
        value={inputVars.first}
      />
      <LabeledNumberInput
        label={<Latex className="block" text="d = " />}
        id="step"
        onChange={(newValue) => {
          setInputVars({ ...inputVars, step: newValue });
          setShowResult(false);
        }}
        value={inputVars.step}
      />
      <SubmitButton
        onClick={(e) => {
          e.preventDefault();
          setShowResult(true);
        }}
      >
        Порахувати
      </SubmitButton>
      {!showResult && "Сума:"}
      {showResult && variables !== undefined && (
        <>Сума: {sumFirstStep(variables)}</>
      )}
      {showResult && variables === undefined && "Невірні вхідні дані."}
    </form>
  );
}

const oneStepSchema = z.object({
  n: integerSchema,
  index: integerSchema,
  value: floatSchema,
  step: floatSchema,
});

function OneStepForm() {
  const [inputVars, setInputVars] = useState({
    n: "",
    index: "",
    value: "",
    step: "",
  });
  const [showResult, setShowResult] = useState(false);

  const parseResult = oneStepSchema.safeParse(inputVars);
  const variables = parseResult.success ? parseResult.data : undefined;

  return (
    <form className="mt-3 flex flex-col items-start gap-3">
      <LabeledNumberInput
        label={<Latex className="block" text="n = " />}
        id="n"
        onChange={(newValue) => {
          setInputVars({ ...inputVars, n: newValue });
          setShowResult(false);
        }}
        value={inputVars.n}
        integer
      />
      <div>
        значення коефіцієнтів і відповідні їм значення членів прогресії:
      </div>
      <LabeledNumberInput
        label={<Latex className="block" text="i = " />}
        id="index"
        onChange={(newValue) => {
          setInputVars({ ...inputVars, index: newValue });
          setShowResult(false);
        }}
        value={inputVars.index}
        integer
      />
      <LabeledNumberInput
        id="value"
        label={<Latex className="block" text="a_i = " />}
        onChange={(newValue) => {
          setInputVars({ ...inputVars, value: newValue });
          setShowResult(false);
        }}
        value={inputVars.value}
      />
      <div>крок прогресії:</div>
      <LabeledNumberInput
        id="step"
        label={<Latex className="block" text="d = " />}
        onChange={(newValue) => {
          setInputVars({ ...inputVars, step: newValue });
          setShowResult(false);
        }}
        value={inputVars.step}
      />
      <SubmitButton
        onClick={(e) => {
          e.preventDefault();
          setShowResult(true);
        }}
      >
        Порахувати
      </SubmitButton>
      {!showResult && "Сума:"}
      {showResult && variables !== undefined && (
        <>Сума: {sumOneStep(variables)}</>
      )}
      {showResult && variables === undefined && "Невірні вхідні дані."}
    </form>
  );
}

const twoSchema = z.object({
  n: integerSchema,
  index: integerSchema,
  value: floatSchema,
  index2: integerSchema,
  value2: floatSchema,
});

function TwoForm() {
  const [inputVars, setInputVars] = useState({
    n: "",
    index: "",
    value: "",
    index2: "",
    value2: "",
    step: "",
  });
  const [showResult, setShowResult] = useState(false);

  const parseResult = twoSchema.safeParse(inputVars);
  const variables = parseResult.success ? parseResult.data : undefined;

  return (
    <form className="mt-3 flex flex-col items-start gap-3">
      <LabeledNumberInput
        label={<Latex className="block" text="n = " />}
        id="n"
        onChange={(newValue) => {
          setInputVars({ ...inputVars, n: newValue });
          setShowResult(false);
        }}
        value={inputVars.n}
        integer
      />
      <div>
        значення коефіцієнтів і відповідні їм значення членів прогресії:
      </div>
      <LabeledNumberInput
        label={<Latex className="block" text="i = " />}
        id="index"
        onChange={(newValue) => {
          setInputVars({ ...inputVars, index: newValue });
          setShowResult(false);
        }}
        value={inputVars.index}
        integer
      />
      <LabeledNumberInput
        label={<Latex className="block" text="a_i = " />}
        id="value"
        onChange={(newValue) => {
          setInputVars({ ...inputVars, value: newValue });
          setShowResult(false);
        }}
        value={inputVars.value}
      />
      <LabeledNumberInput
        label={<Latex className="block" text="j = " />}
        id="index2"
        onChange={(newValue) => {
          setInputVars({ ...inputVars, index2: newValue });
          setShowResult(false);
        }}
        value={inputVars.index2}
        integer
      />
      <LabeledNumberInput
        label={<Latex className="block" text="a_j = " />}
        id="value2"
        onChange={(newValue) => {
          setInputVars({ ...inputVars, value2: newValue });
          setShowResult(false);
        }}
        value={inputVars.value2}
      />
      <SubmitButton
        onClick={(e) => {
          e.preventDefault();
          setShowResult(true);
        }}
      >
        Порахувати
      </SubmitButton>
      {!showResult && "Сума:"}
      {showResult && variables !== undefined && <>Сума: {sumTwo(variables)}</>}
      {showResult && variables === undefined && "Невірні вхідні дані."}
    </form>
  );
}

function LabeledNumberInput({
  value,
  onChange,
  id,
  integer = false,
  label,
}: {
  id: string;
  value: string;
  onChange: (newValue: string) => void;
  integer?: boolean;
  label: ReactNode;
}) {
  return (
    <div className="flex w-48 justify-start">
      <label htmlFor={id} className="mr-2">
        {label}
      </label>
      <NumberInput
        id={id}
        onChange={onChange}
        value={value}
        integer={integer}
        className="min-w-0 flex-grow"
      />
    </div>
  );
}

function RadioButton({
  group,
  id,
  checked,
  onChange,
  label,
}: {
  group: string;
  id: string;
  checked: boolean;
  label: ReactNode;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="my-1">
      <input
        type="radio"
        name={group}
        value={id}
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="ml-1">
        {label}
      </label>
    </div>
  );
}
