import React, { ReactNode, RefObject, useRef, useState } from "react";
import { NumberInput } from "../shared";
import { Block, InputGroup } from "./shared";

export default function MassConverter() {
  const kiloton = useRef<HTMLInputElement>(null);
  const ton = useRef<HTMLInputElement>(null);
  const kilonewton = useRef<HTMLInputElement>(null);
  const centner = useRef<HTMLInputElement>(null);
  const kilogram = useRef<HTMLInputElement>(null);
  const newton = useRef<HTMLInputElement>(null);
  const gram = useRef<HTMLInputElement>(null);
  const carat = useRef<HTMLInputElement>(null);
  const centigram = useRef<HTMLInputElement>(null);
  const milligram = useRef<HTMLInputElement>(null);
  const microgram = useRef<HTMLInputElement>(null);
  const amu = useRef<HTMLInputElement>(null);

  const longTon = useRef<HTMLInputElement>(null);
  const shortTon = useRef<HTMLInputElement>(null);
  const kip = useRef<HTMLInputElement>(null);
  const longHundredweight = useRef<HTMLInputElement>(null);
  const shortHundredweight = useRef<HTMLInputElement>(null);
  const stone = useRef<HTMLInputElement>(null);
  const pound = useRef<HTMLInputElement>(null);
  const ounce = useRef<HTMLInputElement>(null);
  const dram = useRef<HTMLInputElement>(null);
  const grain = useRef<HTMLInputElement>(null);

  const apPound = useRef<HTMLInputElement>(null);
  const apOunce = useRef<HTMLInputElement>(null);
  const apDram = useRef<HTMLInputElement>(null);
  const apScruple = useRef<HTMLInputElement>(null);
  const apGrain = useRef<HTMLInputElement>(null);

  const rusBerkovec = useRef<HTMLInputElement>(null);
  const rusPood = useRef<HTMLInputElement>(null);
  const rusPound = useRef<HTMLInputElement>(null);
  const rusLot = useRef<HTMLInputElement>(null);
  const rusZolotnik = useRef<HTMLInputElement>(null);
  const rusDolya = useRef<HTMLInputElement>(null);

  const updateInputs = (
    newValue: number,
    source: RefObject<HTMLInputElement>,
  ) => {
    if (kiloton !== source && kiloton.current)
      kiloton.current.value = (newValue / 1e15).toString();
    if (ton !== source && ton.current)
      ton.current.value = (newValue / 1e12).toString();
    if (kilonewton !== source && kilonewton.current)
      kilonewton.current.value = ((newValue / 1e12) * 9.80665).toString();
    if (centner !== source && centner.current)
      centner.current.value = (newValue / 1e11).toString();
    if (kilogram !== source && kilogram.current)
      kilogram.current.value = (newValue / 1e9).toString();
    if (newton !== source && newton.current)
      newton.current.value = ((newValue * 9.80665) / 1e9).toString();
    if (gram !== source && gram.current)
      gram.current.value = (newValue / 1e6).toString();
    if (carat !== source && carat.current)
      carat.current.value = ((newValue * 5) / 1e6).toString();
    if (centigram !== source && centigram.current)
      centigram.current.value = (newValue / 1e5).toString();
    if (milligram !== source && milligram.current)
      milligram.current.value = (newValue / 1e3).toString();
    if (microgram !== source && microgram.current)
      microgram.current.value = newValue.toString();
    if (amu !== source && amu.current)
      amu.current.value = ((newValue / 1.660539066605) * 1e18).toString();

    if (longTon !== source && longTon.current)
      longTon.current.value = (newValue / 1016046908800).toString();
    if (shortTon !== source && shortTon.current)
      shortTon.current.value = (newValue / 907184740000).toString();
    if (kip !== source && kip.current)
      kip.current.value = (newValue / 453592370000).toString();
    if (longHundredweight !== source && longHundredweight.current)
      longHundredweight.current.value = (newValue / 50802345440).toString();
    if (shortHundredweight !== source && shortHundredweight.current)
      shortHundredweight.current.value = (newValue / 45359237000).toString();
    if (stone !== source && stone.current)
      stone.current.value = (newValue / 6350293180).toString();
    if (pound !== source && pound.current)
      pound.current.value = (newValue / 453592370).toString();
    if (ounce !== source && ounce.current)
      ounce.current.value = (newValue / 28349523.125).toString();
    if (dram !== source && dram.current)
      dram.current.value = (newValue / 1771845.1953125).toString();
    if (grain !== source && grain.current)
      grain.current.value = (newValue / 64798.91).toString();

    if (apPound !== source && apPound.current)
      apPound.current.value = (newValue / 373241721.6).toString();
    if (apOunce !== source && apOunce.current)
      apOunce.current.value = (newValue / 31103476.8).toString();
    if (apDram !== source && apDram.current)
      apDram.current.value = (newValue / 3887934.6).toString();
    if (apScruple !== source && apScruple.current)
      apScruple.current.value = (newValue / 1295978.2).toString();
    if (apGrain !== source && apGrain.current)
      apGrain.current.value = (newValue / 64798.91).toString();

    if (rusBerkovec !== source && rusBerkovec.current)
      rusBerkovec.current.value = (newValue / 163804964000).toString();
    if (rusPood !== source && rusPood.current)
      rusPood.current.value = (newValue / 16380496400).toString();
    if (rusPound !== source && rusPound.current)
      rusPound.current.value = (newValue / 409512410).toString();
    if (rusLot !== source && rusLot.current)
      rusLot.current.value = (newValue / 12797262.8125).toString();
    if (rusZolotnik !== source && rusZolotnik.current)
      rusZolotnik.current.value = (newValue / 4265754.270833333).toString();
    if (rusDolya !== source && rusDolya.current)
      rusDolya.current.value = (newValue / 4265754.270833333).toString();
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
        Онлайн калькулятор. Конвертер одиниць ваги і маси.
      </h2>
      <Block name="Метрична система">
        <InputGroup>
          <span className="w-60">Кілотонна</span>
          <NumberInput
            ref={kiloton}
            onInput={changeHandler(kiloton, (n) => n * 1e15)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Тонна</span>
          <NumberInput
            ref={ton}
            onInput={changeHandler(ton, (n) => n * 1e12)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Кілоньютон (на поверхні землі)</span>
          <NumberInput
            ref={kilonewton}
            onInput={changeHandler(kilonewton, (n) => (n / 9.80665) * 1e12)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Центнер</span>
          <NumberInput
            ref={centner}
            onInput={changeHandler(centner, (n) => n * 1e11)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Кілограм</span>
          <NumberInput
            ref={kilogram}
            onInput={changeHandler(kilogram, (n) => n * 1e9)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Ньютон (на поверхні землі)</span>
          <NumberInput
            ref={newton}
            onInput={changeHandler(newton, (n) => (n / 9.80665) * 1e9)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Грам</span>
          <NumberInput
            ref={gram}
            onInput={changeHandler(gram, (n) => n * 1e6)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Карат</span>
          <NumberInput
            ref={carat}
            onInput={changeHandler(carat, (n) => (n / 5) * 1e6)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Центиграм</span>
          <NumberInput
            ref={centigram}
            onInput={changeHandler(centigram, (n) => n * 1e5)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Міліграм</span>
          <NumberInput
            ref={milligram}
            onInput={changeHandler(milligram, (n) => n * 1e3)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Мікрограм</span>
          <NumberInput
            ref={microgram}
            onInput={changeHandler(microgram, (n) => n)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Атомна одиниця маси</span>
          <NumberInput
            ref={amu}
            onInput={changeHandler(amu, (n) => (n * 1.660539066605) / 1e18)}
          />
        </InputGroup>
      </Block>
      <Block name="Англійські / Американські">
        <InputGroup>
          <span className="w-60">Довга тонна (брит.)</span>
          <NumberInput
            ref={longTon}
            onInput={changeHandler(longTon, (n) => n * 1016046908800)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Коротка тонна (США)</span>
          <NumberInput
            ref={shortTon}
            onInput={changeHandler(shortTon, (n) => n * 907184740000)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Кілофунт, кіп</span>
          <NumberInput
            ref={kip}
            onInput={changeHandler(kip, (n) => n * 453592370000)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Довгий центнер (брит.)</span>
          <NumberInput
            ref={longHundredweight}
            onInput={changeHandler(longHundredweight, (n) => n * 50802345440)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Короткий центнер (США)</span>
          <NumberInput
            ref={shortHundredweight}
            onInput={changeHandler(shortHundredweight, (n) => n * 45359237000)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Стоун</span>
          <NumberInput
            ref={stone}
            onInput={changeHandler(stone, (n) => n * 6350293180)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Фунт</span>
          <NumberInput
            ref={pound}
            onInput={changeHandler(pound, (n) => n * 453592370)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Унція</span>
          <NumberInput
            ref={ounce}
            onInput={changeHandler(ounce, (n) => n * 28349523.125)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Драхма</span>
          <NumberInput
            ref={dram}
            onInput={changeHandler(dram, (n) => n * 1771845.1953125)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Гран</span>
          <NumberInput
            ref={grain}
            onInput={changeHandler(grain, (n) => n * 64798.91)}
          />
        </InputGroup>
      </Block>
      <Block name="Британська аптечна">
        <InputGroup>
          <span className="w-60">Фунт</span>
          <NumberInput
            ref={apPound}
            onInput={changeHandler(apPound, (n) => n * 373241721.6)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Унція</span>
          <NumberInput
            ref={apOunce}
            onInput={changeHandler(apOunce, (n) => n * 31103476.8)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Драхма</span>
          <NumberInput
            ref={apDram}
            onInput={changeHandler(apDram, (n) => n * 3887934.6)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Скрупул</span>
          <NumberInput
            ref={apScruple}
            onInput={changeHandler(apScruple, (n) => n * 1295978.2)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Гран</span>
          <NumberInput
            ref={apGrain}
            onInput={changeHandler(apGrain, (n) => n * 64798.91)}
          />
        </InputGroup>
      </Block>
      <Block name="Староруські міри ваги">
        <InputGroup>
          <span className="w-60">Берковець</span>
          <NumberInput
            ref={rusBerkovec}
            onInput={changeHandler(rusBerkovec, (n) => n * 163804964000)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Пуд</span>
          <NumberInput
            ref={rusPood}
            onInput={changeHandler(rusPood, (n) => n * 16380496400)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Фунт</span>
          <NumberInput
            ref={rusPound}
            onInput={changeHandler(rusPound, (n) => n * 409512410)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Лот</span>
          <NumberInput
            ref={rusLot}
            onInput={changeHandler(rusLot, (n) => n * 12797262.8125)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Золотнік</span>
          <NumberInput
            ref={rusZolotnik}
            onInput={changeHandler(rusZolotnik, (n) => n * 4265754.270833333)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Доля</span>
          <NumberInput
            ref={rusDolya}
            onInput={changeHandler(rusDolya, (n) => n * 44434.940321180555)}
          />
        </InputGroup>
      </Block>
    </div>
  );
}
