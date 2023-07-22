import React, { RefObject, useRef } from "react";
import { Block, InputGroup } from "./shared";
import { NumberInput } from "../shared";

export default function VelocityConverter() {
  const kmHour = useRef<HTMLInputElement>(null);
  const kmMin = useRef<HTMLInputElement>(null);
  const kmSec = useRef<HTMLInputElement>(null);
  const mMin = useRef<HTMLInputElement>(null);
  const mSec = useRef<HTMLInputElement>(null);
  const cmMin = useRef<HTMLInputElement>(null);
  const cmSec = useRef<HTMLInputElement>(null);
  const mmMin = useRef<HTMLInputElement>(null);
  const mmSec = useRef<HTMLInputElement>(null);

  const knot = useRef<HTMLInputElement>(null);
  const nauticalMileHour = useRef<HTMLInputElement>(null);

  const mach = useRef<HTMLInputElement>(null);
  const soundAir = useRef<HTMLInputElement>(null);
  const lightVaccum = useRef<HTMLInputElement>(null);

  const mileHour = useRef<HTMLInputElement>(null);
  const mileSecond = useRef<HTMLInputElement>(null);
  const footMinute = useRef<HTMLInputElement>(null);
  const footSecond = useRef<HTMLInputElement>(null);
  const inchSecond = useRef<HTMLInputElement>(null);

  const updateInput = (
    ref: RefObject<HTMLInputElement>,
    source: RefObject<HTMLInputElement>,
    newValue: number,
  ) => {
    if (ref !== source && ref.current) {
      ref.current.value = newValue.toString();
    }
  };

  const updateInputs = (n: number, source: RefObject<HTMLInputElement>) => {
    updateInput(kmHour, source, n / 16666.666666666668);
    updateInput(kmMin, source, n / 1000000);
    updateInput(kmSec, source, n / 60000000);
    updateInput(mMin, source, n / 1000);
    updateInput(mSec, source, n / 60000);
    updateInput(cmMin, source, n / 10);
    updateInput(cmSec, source, n / 600);
    updateInput(mmMin, source, n);
    updateInput(mmSec, source, n / 60);

    updateInput(knot, source, n / 30866.666666666668);
    updateInput(nauticalMileHour, source, n / 30866.666666666668);

    updateInput(mach, source, n / 20417400);
    updateInput(soundAir, source, n / 20417400);
    updateInput(lightVaccum, source, n / 17987547480000);

    updateInput(mileHour, source, n / 26822.4);
    updateInput(mileSecond, source, n / 96560640);
    updateInput(footMinute, source, n / 304.8);
    updateInput(footSecond, source, n / 18288);
    updateInput(inchSecond, source, n / 1524);
  };

  const changeHandler =
    (ref: RefObject<HTMLInputElement>, toBase: (value: number) => number) =>
    () => {
      if (ref.current && !isNaN(parseFloat(ref.current.value)))
        updateInputs(toBase(parseFloat(ref.current.value)), ref);
    };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl">
        Онлайн калькулятор. Конвертер одиниць швидкості
      </h2>
      <Block name="Система СІ">
        <InputGroup>
          <span className="w-60">Кілометр в годину</span>
          <NumberInput
            ref={kmHour}
            onInput={changeHandler(kmHour, (n) => n * 16666.666666666668)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Кілометр в хвилину</span>
          <NumberInput
            ref={kmMin}
            onInput={changeHandler(kmMin, (n) => n * 1000000)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Кілометр в секунду</span>
          <NumberInput
            ref={kmSec}
            onInput={changeHandler(kmSec, (n) => n * 60000000)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Метр в хвилину</span>
          <NumberInput
            ref={mMin}
            onInput={changeHandler(mMin, (n) => n * 1000)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Метр в секунду</span>
          <NumberInput
            ref={mSec}
            onInput={changeHandler(mSec, (n) => n * 60000)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Сантиметр в хвилину</span>
          <NumberInput
            ref={cmMin}
            onInput={changeHandler(cmMin, (n) => n * 10)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Сантиметр в секунду</span>
          <NumberInput
            ref={cmSec}
            onInput={changeHandler(cmSec, (n) => n * 600)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Міліметр в хвилину</span>
          <NumberInput ref={mmMin} onInput={changeHandler(mmMin, (n) => n)} />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Міліметр в секунду</span>
          <NumberInput
            ref={mmSec}
            onInput={changeHandler(mmSec, (n) => n * 60)}
          />
        </InputGroup>
      </Block>
      <Block name="Морські одиниці">
        <InputGroup>
          <span className="w-60">Вузел</span>
          <NumberInput
            ref={knot}
            onInput={changeHandler(knot, (n) => n * 30866.666666666668)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Морська миля в годину</span>
          <NumberInput
            ref={nauticalMileHour}
            onInput={changeHandler(
              nauticalMileHour,
              (n) => n * 30866.666666666668,
            )}
          />
        </InputGroup>
      </Block>
      <Block name="Інші одиниці">
        <InputGroup>
          <span className="w-60">Число Маха</span>
          <NumberInput
            ref={mach}
            onInput={changeHandler(mach, (n) => n * 20417400)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Швидкість звука у повітрі</span>
          <NumberInput
            ref={soundAir}
            onInput={changeHandler(soundAir, (n) => n * 20417400)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Швидкість світла у вакуумі</span>
          <NumberInput
            ref={lightVaccum}
            onInput={changeHandler(lightVaccum, (n) => n * 17987547480000)}
          />
        </InputGroup>
      </Block>
      <Block name="Американські (англійські)">
        <InputGroup>
          <span className="w-60">Миля в годину</span>
          <NumberInput
            ref={mileHour}
            onInput={changeHandler(mileHour, (n) => n * 26822.4)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Миля в секунду</span>
          <NumberInput
            ref={mileSecond}
            onInput={changeHandler(mileSecond, (n) => n * 96560640)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Фут в хвилину</span>
          <NumberInput
            ref={footMinute}
            onInput={changeHandler(footMinute, (n) => n * 304.8)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Фут в секунду</span>
          <NumberInput
            ref={footSecond}
            onInput={changeHandler(footSecond, (n) => n * 18288)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Дюйм в секунду</span>
          <NumberInput
            ref={inchSecond}
            onInput={changeHandler(inchSecond, (n) => n * 1524)}
          />
        </InputGroup>
      </Block>
    </div>
  );
}
