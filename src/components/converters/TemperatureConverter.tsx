import React, { RefObject, useRef } from "react";
import { Block, InputGroup } from "./shared";
import { NumberInput } from "../shared";

export default function VelocityConverter() {
  const kelvin = useRef<HTMLInputElement>(null);
  const celsius = useRef<HTMLInputElement>(null);
  const farenheit = useRef<HTMLInputElement>(null);
  const reaumur = useRef<HTMLInputElement>(null);
  const planck = useRef<HTMLInputElement>(null);

  const rankine = useRef<HTMLInputElement>(null);
  const newton = useRef<HTMLInputElement>(null);
  const roemer = useRef<HTMLInputElement>(null);
  const delisle = useRef<HTMLInputElement>(null);

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
    updateInput(celsius, source, n - 273.15);
    updateInput(farenheit, source, (n * 9) / 5 - 459.67);
    updateInput(kelvin, source, n);
    updateInput(reaumur, source, ((n - 273.15) * 4) / 5);
    updateInput(planck, source, n / 1.41679e32);

    updateInput(rankine, source, (n * 9) / 5);
    updateInput(newton, source, ((n - 273.15) * 33) / 100);
    updateInput(roemer, source, ((n - 273.15) * 21) / 40 + 7.5);
    updateInput(delisle, source, ((373.15 - n) * 3) / 2);
  };

  const changeHandler =
    (ref: RefObject<HTMLInputElement>, toBase: (value: number) => number) =>
    () => {
      if (ref.current && !isNaN(parseFloat(ref.current.value)))
        updateInputs(toBase(parseFloat(ref.current.value)), ref);
    };

  return (
    <div className="flex flex-col gap-4">
      <Block name="Температурні шкали">
        <InputGroup>
          <span className="w-60">Градус Цельсія</span>
          <NumberInput
            ref={celsius}
            onInput={changeHandler(celsius, (n) => n + 273.15)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Градус Фаренгейта</span>
          <NumberInput
            ref={farenheit}
            onInput={changeHandler(farenheit, (n) => ((n + 459.67) * 5) / 9)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Кельвін</span>
          <NumberInput ref={kelvin} onInput={changeHandler(kelvin, (n) => n)} />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Градус Реомюра</span>
          <NumberInput
            ref={reaumur}
            onInput={changeHandler(reaumur, (n) => (n * 5) / 4 + 273.15)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Планківська температура</span>
          <NumberInput
            ref={planck}
            onInput={changeHandler(planck, (n) => n * 1.41679e32)}
          />
        </InputGroup>
      </Block>
      <Block name="Історичні температурні шкали">
        <InputGroup>
          <span className="w-60">градус Ранкіна</span>
          <NumberInput
            ref={rankine}
            onInput={changeHandler(rankine, (n) => (n * 5) / 9)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">градус Ньютона</span>
          <NumberInput
            ref={newton}
            onInput={changeHandler(newton, (n) => (n * 100) / 33 + 273.15)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">градус Рьомера</span>
          <NumberInput
            ref={roemer}
            onInput={changeHandler(
              roemer,
              (n) => ((n - 7.5) * 40) / 21 + 273.15,
            )}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">градус Деліля</span>
          <NumberInput
            ref={delisle}
            onInput={changeHandler(delisle, (n) => 373.15 - (n * 2) / 3)}
          />
        </InputGroup>
      </Block>
    </div>
  );
}
