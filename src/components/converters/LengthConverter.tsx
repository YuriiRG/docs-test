import React, { RefObject, useRef } from "react";
import { Block, InputGroup } from "./shared";
import { NumberInput } from "../shared";

export default function LengthConverter() {
  const kilometer = useRef<HTMLInputElement>(null);
  const meter = useRef<HTMLInputElement>(null);
  const decimeter = useRef<HTMLInputElement>(null);
  const centimeter = useRef<HTMLInputElement>(null);
  const millimeter = useRef<HTMLInputElement>(null);
  const micrometer = useRef<HTMLInputElement>(null);
  const nanometer = useRef<HTMLInputElement>(null);
  const angstrom = useRef<HTMLInputElement>(null);

  const league = useRef<HTMLInputElement>(null);
  const mile = useRef<HTMLInputElement>(null);
  const land = useRef<HTMLInputElement>(null);
  const furlong = useRef<HTMLInputElement>(null);
  const bolt = useRef<HTMLInputElement>(null);
  const chain = useRef<HTMLInputElement>(null);
  const pole = useRef<HTMLInputElement>(null);
  const rod = useRef<HTMLInputElement>(null);
  const perch = useRef<HTMLInputElement>(null);
  const yard = useRef<HTMLInputElement>(null);
  const foot = useRef<HTMLInputElement>(null);
  const span = useRef<HTMLInputElement>(null);
  const hand = useRef<HTMLInputElement>(null);
  const inch = useRef<HTMLInputElement>(null);
  const line = useRef<HTMLInputElement>(null);
  const mil = useRef<HTMLInputElement>(null);
  const microinch = useRef<HTMLInputElement>(null);

  const parsec = useRef<HTMLInputElement>(null);
  const lightyear = useRef<HTMLInputElement>(null);
  const au = useRef<HTMLInputElement>(null);
  const lightminute = useRef<HTMLInputElement>(null);
  const lightsecond = useRef<HTMLInputElement>(null);

  const nauticalLeague = useRef<HTMLInputElement>(null);
  const nauticalMile = useRef<HTMLInputElement>(null);
  const cable = useRef<HTMLInputElement>(null);
  const fathom = useRef<HTMLInputElement>(null);

  const rusMile = useRef<HTMLInputElement>(null);
  const rusVerst = useRef<HTMLInputElement>(null);
  const rusVerst1 = useRef<HTMLInputElement>(null);
  const rusKosaSazhen = useRef<HTMLInputElement>(null);
  const rusSazhen = useRef<HTMLInputElement>(null);
  const rusMachSazhen = useRef<HTMLInputElement>(null);
  const rusArshin = useRef<HTMLInputElement>(null);
  const rusFoot = useRef<HTMLInputElement>(null);
  const rusPyad = useRef<HTMLInputElement>(null);
  const rusVershok = useRef<HTMLInputElement>(null);
  const rusInch = useRef<HTMLInputElement>(null);
  const rusLine = useRef<HTMLInputElement>(null);

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
    updateInput(kilometer, source, n / 1e6);
    updateInput(meter, source, n / 1e3);
    updateInput(decimeter, source, n / 1e2);
    updateInput(centimeter, source, n / 1e1);
    updateInput(millimeter, source, n);
    updateInput(micrometer, source, n / 1e-3);
    updateInput(nanometer, source, n / 1e-6);
    updateInput(angstrom, source, n / 1e-7);

    updateInput(league, source, n / 4828032);
    updateInput(mile, source, n / 1609344);
    updateInput(land, source, n / 1609344);
    updateInput(furlong, source, n / 201168);
    updateInput(bolt, source, n / 36576);
    updateInput(chain, source, n / 20116.8);
    updateInput(pole, source, n / 5029.2);
    updateInput(rod, source, n / 5029.2);
    updateInput(perch, source, n / 5029.2);
    updateInput(yard, source, n / 914.4);
    updateInput(foot, source, n / 304.8);
    updateInput(span, source, n / 228.6);
    updateInput(hand, source, n / 101.6);
    updateInput(inch, source, n / 25.4);
    updateInput(line, source, n / 2.1166666666666667);
    updateInput(mil, source, n / 0.0254);
    updateInput(microinch, source, n / 25.4e-6);

    updateInput(parsec, source, n / 3.085677581491367e19);
    updateInput(lightyear, source, n / 9.4607304725808e18);
    updateInput(au, source, n / 149597870700000);
    updateInput(lightminute, source, n / 17987547480000);
    updateInput(lightsecond, source, n / 299792458000);

    updateInput(nauticalLeague, source, n / 5556000);
    updateInput(nauticalMile, source, n / 1852000);
    updateInput(cable, source, n / 185200);
    updateInput(fathom, source, n / 1828.8);

    updateInput(rusMile, source, n / 7467600);
    updateInput(rusVerst, source, n / 1066800);
    updateInput(rusVerst1, source, n / 2133600);
    updateInput(rusKosaSazhen, source, n / 2480);
    updateInput(rusSazhen, source, n / 2133.6);
    updateInput(rusMachSazhen, source, n / 1778);
    updateInput(rusArshin, source, n / 711.2);
    updateInput(rusFoot, source, n / 304.8);
    updateInput(rusPyad, source, n / 177.8);
    updateInput(rusVershok, source, n / 44.45);
    updateInput(rusInch, source, n / 25.4);
    updateInput(rusLine, source, n / 2.54);
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
        Онлайн калькулятор. Конвертер одиниць відстані і довжини.
      </h2>
      <Block name="Метричні">
        <InputGroup>
          <span className="w-60">Кілометр</span>
          <NumberInput
            ref={kilometer}
            onInput={changeHandler(kilometer, (n) => n * 1e6)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Метр</span>
          <NumberInput
            ref={meter}
            onInput={changeHandler(meter, (n) => n * 1e3)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Дециметр</span>
          <NumberInput
            ref={decimeter}
            onInput={changeHandler(decimeter, (n) => n * 1e2)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Сантиметр</span>
          <NumberInput
            ref={centimeter}
            onInput={changeHandler(centimeter, (n) => n * 1e1)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Міліметр</span>
          <NumberInput
            ref={millimeter}
            onInput={changeHandler(millimeter, (n) => n)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Мікрометр</span>
          <NumberInput
            ref={micrometer}
            onInput={changeHandler(micrometer, (n) => n * 1e-3)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Нанометр</span>
          <NumberInput
            ref={nanometer}
            onInput={changeHandler(nanometer, (n) => n * 1e-6)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Ангстрем</span>
          <NumberInput
            ref={angstrom}
            onInput={changeHandler(angstrom, (n) => n * 1e-7)}
          />
        </InputGroup>
      </Block>
      <Block name="Англійські (Американські)">
        <InputGroup>
          <span className="w-60">Ліга, лье</span>
          <NumberInput
            ref={league}
            onInput={changeHandler(league, (n) => n * 4828032)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Миля</span>
          <NumberInput
            ref={mile}
            onInput={changeHandler(mile, (n) => n * 1609344)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Ленд</span>
          <NumberInput
            ref={land}
            onInput={changeHandler(land, (n) => n * 1609344)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Фурлонг</span>
          <NumberInput
            ref={furlong}
            onInput={changeHandler(furlong, (n) => n * 201168)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Болт</span>
          <NumberInput
            ref={bolt}
            onInput={changeHandler(bolt, (n) => n * 36576)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Чейн</span>
          <NumberInput
            ref={chain}
            onInput={changeHandler(chain, (n) => n * 20116.8)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Поль</span>
          <NumberInput
            ref={pole}
            onInput={changeHandler(pole, (n) => n * 5029.2)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Род</span>
          <NumberInput
            ref={rod}
            onInput={changeHandler(rod, (n) => n * 5029.2)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Перч</span>
          <NumberInput
            ref={perch}
            onInput={changeHandler(perch, (n) => n * 5029.2)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Ярд</span>
          <NumberInput
            ref={yard}
            onInput={changeHandler(yard, (n) => n * 914.4)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Фут</span>
          <NumberInput
            ref={foot}
            onInput={changeHandler(foot, (n) => n * 304.8)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Спан</span>
          <NumberInput
            ref={span}
            onInput={changeHandler(span, (n) => n * 228.6)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Хенд</span>
          <NumberInput
            ref={hand}
            onInput={changeHandler(hand, (n) => n * 101.6)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Дюйм</span>
          <NumberInput
            ref={inch}
            onInput={changeHandler(inch, (n) => n * 25.4)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Лінія</span>
          <NumberInput
            ref={line}
            onInput={changeHandler(line, (n) => n * 2.1166666666666667)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Міл</span>
          <NumberInput
            ref={mil}
            onInput={changeHandler(mil, (n) => n * 0.0254)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Мікродюйм</span>
          <NumberInput
            ref={microinch}
            onInput={changeHandler(microinch, (n) => n * 25.4e-6)}
          />
        </InputGroup>
      </Block>
      <Block name="Астрономічні">
        <InputGroup>
          <span className="w-60">Парсек</span>
          <NumberInput
            ref={parsec}
            onInput={changeHandler(parsec, (n) => n * 3.085677581491367e19)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Світловий рік</span>
          <NumberInput
            ref={lightyear}
            onInput={changeHandler(lightyear, (n) => n * 9.4607304725808e18)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Астрономічна одиниця</span>
          <NumberInput
            ref={au}
            onInput={changeHandler(au, (n) => n * 149597870700000)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Світлова хвилина</span>
          <NumberInput
            ref={lightminute}
            onInput={changeHandler(lightminute, (n) => n * 17987547480000)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Світлова секунда</span>
          <NumberInput
            ref={lightsecond}
            onInput={changeHandler(lightsecond, (n) => n * 299792458000)}
          />
        </InputGroup>
      </Block>
      <Block name="Міжнародні морські">
        <InputGroup>
          <span className="w-60">Морська ліга</span>
          <NumberInput
            ref={nauticalLeague}
            onInput={changeHandler(nauticalLeague, (n) => n * 5556000)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Морська миля</span>
          <NumberInput
            ref={nauticalMile}
            onInput={changeHandler(nauticalMile, (n) => n * 1852000)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Міжнародний кабельтов</span>
          <NumberInput
            ref={cable}
            onInput={changeHandler(cable, (n) => n * 185200)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Морська сажень</span>
          <NumberInput
            ref={fathom}
            onInput={changeHandler(fathom, (n) => n * 1828.8)}
          />
        </InputGroup>
      </Block>
      <Block name="Староруські міри довжини">
        <InputGroup>
          <span className="w-60">Миля</span>
          <NumberInput
            ref={rusMile}
            onInput={changeHandler(rusMile, (n) => n * 7467600)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Верста</span>
          <NumberInput
            ref={rusVerst}
            onInput={changeHandler(rusVerst, (n) => n * 1066800)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Межева верста</span>
          <NumberInput
            ref={rusVerst1}
            onInput={changeHandler(rusVerst1, (n) => n * 2133600)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Коса сажень</span>
          <NumberInput
            ref={rusKosaSazhen}
            onInput={changeHandler(rusKosaSazhen, (n) => n * 2480)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Сажень</span>
          <NumberInput
            ref={rusSazhen}
            onInput={changeHandler(rusSazhen, (n) => n * 2133.6)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Махова сажень</span>
          <NumberInput
            ref={rusMachSazhen}
            onInput={changeHandler(rusMachSazhen, (n) => n * 1778)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Аршин</span>
          <NumberInput
            ref={rusArshin}
            onInput={changeHandler(rusArshin, (n) => n * 711.2)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Фут</span>
          <NumberInput
            ref={rusFoot}
            onInput={changeHandler(rusFoot, (n) => n * 304.8)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Пядь</span>
          <NumberInput
            ref={rusPyad}
            onInput={changeHandler(rusPyad, (n) => n * 177.8)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Вершок</span>
          <NumberInput
            ref={rusVershok}
            onInput={changeHandler(rusVershok, (n) => n * 44.45)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Дюйм</span>
          <NumberInput
            ref={rusInch}
            onInput={changeHandler(rusInch, (n) => n * 25.4)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Лінія</span>
          <NumberInput
            ref={rusLine}
            onInput={changeHandler(rusLine, (n) => n * 2.54)}
          />
        </InputGroup>
      </Block>
    </div>
  );
}
