import React, { RefObject, useRef } from "react";
import { Block, InputGroup } from "./shared";
import { NumberInput } from "../shared";

export default function AreaConverter() {
  const km2 = useRef<HTMLInputElement>(null);
  const hectare = useRef<HTMLInputElement>(null);
  const decare = useRef<HTMLInputElement>(null);
  const are = useRef<HTMLInputElement>(null);
  const m2 = useRef<HTMLInputElement>(null);
  const dm2 = useRef<HTMLInputElement>(null);
  const cm2 = useRef<HTMLInputElement>(null);
  const mm2 = useRef<HTMLInputElement>(null);
  const um2 = useRef<HTMLInputElement>(null);
  const nm2 = useRef<HTMLInputElement>(null);
  const barn = useRef<HTMLInputElement>(null);

  const township = useRef<HTMLInputElement>(null);
  const mile2 = useRef<HTMLInputElement>(null);
  const homestead = useRef<HTMLInputElement>(null);
  const acre = useRef<HTMLInputElement>(null);
  const rood = useRef<HTMLInputElement>(null);
  const rod2 = useRef<HTMLInputElement>(null);
  const perch2 = useRef<HTMLInputElement>(null);
  const yard2 = useRef<HTMLInputElement>(null);
  const foot2 = useRef<HTMLInputElement>(null);
  const in2 = useRef<HTMLInputElement>(null);

  const rusVerst2 = useRef<HTMLInputElement>(null);
  const rusDesyatina = useRef<HTMLInputElement>(null);
  const rusDesyatina1 = useRef<HTMLInputElement>(null);
  const rusSazhen2 = useRef<HTMLInputElement>(null);
  const rusArshin2 = useRef<HTMLInputElement>(null);
  const rusFoot2 = useRef<HTMLInputElement>(null);
  const rusVershok2 = useRef<HTMLInputElement>(null);

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
    updateInput(km2, source, n / 1e12);
    updateInput(hectare, source, n / 1e10);
    updateInput(decare, source, n / 1e9);
    updateInput(are, source, n / 1e8);
    updateInput(m2, source, n / 1e6);
    updateInput(dm2, source, n / 1e4);
    updateInput(cm2, source, n / 1e2);
    updateInput(mm2, source, n);
    updateInput(um2, source, n / 1e-6);
    updateInput(nm2, source, n / 1e-12);
    updateInput(barn, source, n / 1e-22);

    updateInput(township, source, n / 93239571972096);
    updateInput(mile2, source, n / 2589988110336);
    updateInput(homestead, source, n / 647497027584);
    updateInput(acre, source, n / 4046856422.4);
    updateInput(rood, source, n / 1011714105.6);
    updateInput(rod2, source, n / 25292852.64);
    updateInput(perch2, source, n / 25292852.64);
    updateInput(yard2, source, n / 836127.36);
    updateInput(foot2, source, n / 92903.04);
    updateInput(in2, source, n / 645.16);

    updateInput(rusVerst2, source, n / 1138062240000);
    updateInput(rusDesyatina, source, n / 14567196672);
    updateInput(rusDesyatina1, source, n / 10925397504);
    updateInput(rusSazhen2, source, n / 4552248.96);
    updateInput(rusArshin2, source, n / 505805.44);
    updateInput(rusFoot2, source, n / 92903.04);
    updateInput(rusVershok2, source, n / 1975.8025);
  };

  const changeHandler =
    (ref: RefObject<HTMLInputElement>, toBase: (value: number) => number) =>
    () => {
      if (ref.current && !isNaN(parseFloat(ref.current.value)))
        updateInputs(toBase(parseFloat(ref.current.value)), ref);
    };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl">Онлайн калькулятор. Конвертер одиниць площі.</h2>
      <Block name="Метричні">
        <InputGroup>
          <span className="w-60">Квадратний кілометр</span>
          <NumberInput
            ref={km2}
            onInput={changeHandler(km2, (n) => n * 1e12)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Гектар</span>
          <NumberInput
            ref={hectare}
            onInput={changeHandler(hectare, (n) => n * 1e10)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Декар</span>
          <NumberInput
            ref={decare}
            onInput={changeHandler(decare, (n) => n * 1e9)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Ар (сотка)</span>
          <NumberInput ref={are} onInput={changeHandler(are, (n) => n * 1e8)} />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Квадратний метр</span>
          <NumberInput ref={m2} onInput={changeHandler(m2, (n) => n * 1e6)} />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Квадратний дециметр</span>
          <NumberInput ref={dm2} onInput={changeHandler(dm2, (n) => n * 1e4)} />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Квадратний сантиметр</span>
          <NumberInput ref={cm2} onInput={changeHandler(cm2, (n) => n * 1e2)} />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Квадратний міліметр</span>
          <NumberInput ref={mm2} onInput={changeHandler(mm2, (n) => n)} />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Квадратний мікрометр</span>
          <NumberInput
            ref={um2}
            onInput={changeHandler(um2, (n) => n * 1e-6)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Квадратний нанометр</span>
          <NumberInput
            ref={nm2}
            onInput={changeHandler(nm2, (n) => n * 1e-12)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Барн</span>
          <NumberInput
            ref={barn}
            onInput={changeHandler(barn, (n) => n * 1e-22)}
          />
        </InputGroup>
      </Block>
      <Block name="Англійські (Американські)">
        <InputGroup>
          <span className="w-60">Тауншип</span>
          <NumberInput
            ref={township}
            onInput={changeHandler(township, (n) => n * 93239571972096)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Квадратна миля</span>
          <NumberInput
            ref={mile2}
            onInput={changeHandler(mile2, (n) => n * 2589988110336)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Хомстед</span>
          <NumberInput
            ref={homestead}
            onInput={changeHandler(homestead, (n) => n * 647497027584)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Акр</span>
          <NumberInput
            ref={acre}
            onInput={changeHandler(acre, (n) => n * 4046856422.4)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Руд</span>
          <NumberInput
            ref={rood}
            onInput={changeHandler(rood, (n) => n * 1011714105.6)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Квадратний род</span>
          <NumberInput
            ref={rod2}
            onInput={changeHandler(rod2, (n) => n * 25292852.64)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Квадратний перч</span>
          <NumberInput
            ref={perch2}
            onInput={changeHandler(perch2, (n) => n * 25292852.64)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Квадратний ярд</span>
          <NumberInput
            ref={yard2}
            onInput={changeHandler(yard2, (n) => n * 836127.36)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Квадратний фут</span>
          <NumberInput
            ref={foot2}
            onInput={changeHandler(foot2, (n) => n * 92903.04)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Квадратний дюйм</span>
          <NumberInput
            ref={in2}
            onInput={changeHandler(in2, (n) => n * 645.16)}
          />
        </InputGroup>
      </Block>
      <Block name="Староруські одиниці площі">
        <InputGroup>
          <span className="w-60">Квадратна верста</span>
          <NumberInput
            ref={rusVerst2}
            onInput={changeHandler(rusVerst2, (n) => n * 1138062240000)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Десятина (господарська)</span>
          <NumberInput
            ref={rusDesyatina}
            onInput={changeHandler(rusDesyatina, (n) => n * 14567196672)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Десятина (казенна)</span>
          <NumberInput
            ref={rusDesyatina1}
            onInput={changeHandler(rusDesyatina1, (n) => n * 10925397504)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Квадратна сажень</span>
          <NumberInput
            ref={rusSazhen2}
            onInput={changeHandler(rusSazhen2, (n) => n * 4552248.96)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Квадратний аршин</span>
          <NumberInput
            ref={rusArshin2}
            onInput={changeHandler(rusArshin2, (n) => n * 505805.44)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Квадратний фут</span>
          <NumberInput
            ref={rusFoot2}
            onInput={changeHandler(rusFoot2, (n) => n * 92903.04)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Квадратний вершок</span>
          <NumberInput
            ref={rusVershok2}
            onInput={changeHandler(rusVershok2, (n) => n * 1975.8025)}
          />
        </InputGroup>
      </Block>
    </div>
  );
}
