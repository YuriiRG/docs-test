import React, { RefObject, useRef } from "react";
import { Block, InputGroup } from "./shared";
import { NumberInput } from "../shared";

export default function TimeConverter() {
  const millennium = useRef<HTMLInputElement>(null);
  const century = useRef<HTMLInputElement>(null);
  const decade = useRef<HTMLInputElement>(null);
  const gregyear = useRef<HTMLInputElement>(null);
  const julyear = useRef<HTMLInputElement>(null);
  const year = useRef<HTMLInputElement>(null);
  const leapyear = useRef<HTMLInputElement>(null);
  const fortnight = useRef<HTMLInputElement>(null);
  const week = useRef<HTMLInputElement>(null);
  const day = useRef<HTMLInputElement>(null);
  const hour = useRef<HTMLInputElement>(null);
  const minute = useRef<HTMLInputElement>(null);
  const second = useRef<HTMLInputElement>(null);
  const millisecond = useRef<HTMLInputElement>(null);
  const microsecond = useRef<HTMLInputElement>(null);
  const nanosecond = useRef<HTMLInputElement>(null);
  const picosecond = useRef<HTMLInputElement>(null);
  const femtosecond = useRef<HTMLInputElement>(null);

  const anomYear = useRef<HTMLInputElement>(null);
  const sydYear = useRef<HTMLInputElement>(null);
  const tropYear = useRef<HTMLInputElement>(null);
  const dracYear = useRef<HTMLInputElement>(null);
  const synodMonth = useRef<HTMLInputElement>(null);
  const sydMonth = useRef<HTMLInputElement>(null);
  const anomMonth = useRef<HTMLInputElement>(null);
  const dracMonth = useRef<HTMLInputElement>(null);
  const tropMonth = useRef<HTMLInputElement>(null);

  const studHour = useRef<HTMLInputElement>(null);
  const studTime = useRef<HTMLInputElement>(null);

  const planckTime = useRef<HTMLInputElement>(null);

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
    updateInput(millennium, source, n / 31557600000);
    updateInput(century, source, n / 3155760000);
    updateInput(decade, source, n / 315360000);
    updateInput(gregyear, source, n / 31556952);
    updateInput(julyear, source, n / 31557600);
    updateInput(year, source, n / 31536000);
    updateInput(leapyear, source, n / 31622400);
    updateInput(fortnight, source, n / 1209600);
    updateInput(week, source, n / 604800);
    updateInput(day, source, n / 86400);
    updateInput(hour, source, n / 3600);
    updateInput(minute, source, n / 60);
    updateInput(second, source, n);
    updateInput(millisecond, source, n / 1e-3);
    updateInput(microsecond, source, n / 1e-6);
    updateInput(nanosecond, source, n / 1e-9);
    updateInput(picosecond, source, n / 1e-12);
    updateInput(femtosecond, source, n / 1e-15);

    updateInput(anomYear, source, n / 31558432.9824);
    updateInput(sydYear, source, n / 31558152.96);
    updateInput(tropYear, source, n / 31556925.9936);
    updateInput(dracYear, source, n / 29947972.0608);
    updateInput(synodMonth, source, n / 2551442.82);
    updateInput(sydMonth, source, n / 2360591.51);
    updateInput(anomMonth, source, n / 2380713.16);
    updateInput(dracMonth, source, n / 2351135.84);
    updateInput(tropMonth, source, n / 2360584.66);

    updateInput(studHour, source, n / 2700);
    updateInput(studTime, source, n / 5400);

    updateInput(planckTime, source, n / 5.39106323232e-44);
  };

  const changeHandler =
    (ref: RefObject<HTMLInputElement>, toBase: (value: number) => number) =>
    () => {
      if (ref.current && !isNaN(parseFloat(ref.current.value)))
        updateInputs(toBase(parseFloat(ref.current.value)), ref);
    };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl">Онлайн калькулятор. Конвертер одиниць часу</h2>
      <Block name="Повсякденні одиниці">
        <InputGroup>
          <span className="w-60">Тисячоліття</span>
          <NumberInput
            ref={millennium}
            onInput={changeHandler(millennium, (n) => n * 31557600000)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Вік</span>
          <NumberInput
            ref={century}
            onInput={changeHandler(century, (n) => n * 3155760000)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Декада</span>
          <NumberInput
            ref={decade}
            onInput={changeHandler(decade, (n) => n * 315360000)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Рік григоріанський</span>
          <NumberInput
            ref={gregyear}
            onInput={changeHandler(gregyear, (n) => n * 31556952)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Рік юліанський</span>
          <NumberInput
            ref={julyear}
            onInput={changeHandler(julyear, (n) => n * 31557600)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Рік (365 днів)</span>
          <NumberInput
            ref={year}
            onInput={changeHandler(year, (n) => n * 31536000)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Високосний рік</span>
          <NumberInput
            ref={leapyear}
            onInput={changeHandler(leapyear, (n) => n * 31622400)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Фортнайт</span>
          <NumberInput
            ref={fortnight}
            onInput={changeHandler(fortnight, (n) => n * 1209600)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Тиждень</span>
          <NumberInput
            ref={week}
            onInput={changeHandler(week, (n) => n * 604800)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">День</span>
          <NumberInput
            ref={day}
            onInput={changeHandler(day, (n) => n * 86400)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Година</span>
          <NumberInput
            ref={hour}
            onInput={changeHandler(hour, (n) => n * 3600)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Хвилина</span>
          <NumberInput
            ref={minute}
            onInput={changeHandler(minute, (n) => n * 60)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Секунда</span>
          <NumberInput ref={second} onInput={changeHandler(second, (n) => n)} />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Мілісекунда</span>
          <NumberInput
            ref={millisecond}
            onInput={changeHandler(millisecond, (n) => n * 1e-3)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Мікросекунда</span>
          <NumberInput
            ref={microsecond}
            onInput={changeHandler(microsecond, (n) => n * 1e-6)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Наносекунда</span>
          <NumberInput
            ref={nanosecond}
            onInput={changeHandler(nanosecond, (n) => n * 1e-9)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Пікосекунда</span>
          <NumberInput
            ref={picosecond}
            onInput={changeHandler(picosecond, (n) => n * 1e-12)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Фемтосекунда</span>
          <NumberInput
            ref={femtosecond}
            onInput={changeHandler(femtosecond, (n) => n * 1e-15)}
          />
        </InputGroup>
      </Block>
      <Block name="Астрономічні одиниці">
        <InputGroup>
          <span className="w-60">Аномалістичний рік</span>
          <NumberInput
            ref={anomYear}
            onInput={changeHandler(anomYear, (n) => n * 31558432.9824)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Сидеричний рік</span>
          <NumberInput
            ref={sydYear}
            onInput={changeHandler(sydYear, (n) => n * 31558152.96)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Тропічний рік</span>
          <NumberInput
            ref={tropYear}
            onInput={changeHandler(tropYear, (n) => n * 31556925.9936)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Драконічний рік</span>
          <NumberInput
            ref={dracYear}
            onInput={changeHandler(dracYear, (n) => n * 29947972.0608)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Синодеричний місяць</span>
          <NumberInput
            ref={synodMonth}
            onInput={changeHandler(synodMonth, (n) => n * 2551442.82)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Сидеричний місяць</span>
          <NumberInput
            ref={sydMonth}
            onInput={changeHandler(sydMonth, (n) => n * 2360591.51)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Аномалістичний місяць</span>
          <NumberInput
            ref={anomMonth}
            onInput={changeHandler(anomMonth, (n) => n * 2380713.16)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Драконічний місяць</span>
          <NumberInput
            ref={dracMonth}
            onInput={changeHandler(dracMonth, (n) => n * 2351135.84)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Тропічний місяць</span>
          <NumberInput
            ref={tropMonth}
            onInput={changeHandler(tropMonth, (n) => n * 2360584.66)}
          />
        </InputGroup>
      </Block>
      <Block name="Навчальні одиниці">
        <InputGroup>
          <span className="w-60">Академічна година</span>
          <NumberInput
            ref={studHour}
            onInput={changeHandler(studHour, (n) => n * 2700)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Навчальна пара</span>
          <NumberInput
            ref={studTime}
            onInput={changeHandler(studTime, (n) => n * 5400)}
          />
        </InputGroup>
      </Block>
      <Block name="Природні одиниці">
        <InputGroup>
          <span className="w-60">Планківський час</span>
          <NumberInput
            ref={planckTime}
            onInput={changeHandler(planckTime, (n) => n * 5.39106323232e-44)}
          />
        </InputGroup>
      </Block>
    </div>
  );
}
