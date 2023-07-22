import React, { RefObject, useRef } from "react";
import { Block, InputGroup } from "./shared";
import { NumberInput } from "../shared";

export default function VolumeConverter() {
  const km3 = useRef<HTMLInputElement>(null);
  const m3 = useRef<HTMLInputElement>(null);
  const dm3 = useRef<HTMLInputElement>(null);
  const cm3 = useRef<HTMLInputElement>(null);
  const mm3 = useRef<HTMLInputElement>(null);
  const hectolitre = useRef<HTMLInputElement>(null);
  const dekalitre = useRef<HTMLInputElement>(null);
  const litre = useRef<HTMLInputElement>(null);
  const decilitre = useRef<HTMLInputElement>(null);
  const centilitre = useRef<HTMLInputElement>(null);
  const millilitre = useRef<HTMLInputElement>(null);
  const microlitre = useRef<HTMLInputElement>(null);

  const acreFoot = useRef<HTMLInputElement>(null);
  const barrel = useRef<HTMLInputElement>(null);
  const gallon = useRef<HTMLInputElement>(null);
  const quart = useRef<HTMLInputElement>(null);
  const pint = useRef<HTMLInputElement>(null);
  const gill = useRef<HTMLInputElement>(null);
  const fluidOunce = useRef<HTMLInputElement>(null);
  const fluidDram = useRef<HTMLInputElement>(null);
  const minim = useRef<HTMLInputElement>(null);

  const brPerch = useRef<HTMLInputElement>(null);
  const brBarrel = useRef<HTMLInputElement>(null);
  const brBushel = useRef<HTMLInputElement>(null);
  const brPeck = useRef<HTMLInputElement>(null);
  const brGallon = useRef<HTMLInputElement>(null);
  const brQuart = useRef<HTMLInputElement>(null);
  const brPint = useRef<HTMLInputElement>(null);
  const brFluidOunce = useRef<HTMLInputElement>(null);
  const brYard3 = useRef<HTMLInputElement>(null);
  const brFoot3 = useRef<HTMLInputElement>(null);
  const brInch3 = useRef<HTMLInputElement>(null);

  const ruVedro = useRef<HTMLInputElement>(null);
  const ruShtoff = useRef<HTMLInputElement>(null);
  const ruChetvert = useRef<HTMLInputElement>(null);
  const ruVino = useRef<HTMLInputElement>(null);
  const ruVodka = useRef<HTMLInputElement>(null);
  const ruCharka = useRef<HTMLInputElement>(null);
  const ruShkalik = useRef<HTMLInputElement>(null);

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
    updateInput(km3, source, n / 1e15);
    updateInput(m3, source, n / 1e6);
    updateInput(dm3, source, n / 1e3);
    updateInput(cm3, source, n);
    updateInput(mm3, source, n / 1e-3);

    updateInput(hectolitre, source, n / 1e5);
    updateInput(dekalitre, source, n / 1e4);
    updateInput(litre, source, n / 1e3);
    updateInput(decilitre, source, n / 1e2);
    updateInput(centilitre, source, n / 1e1);
    updateInput(millilitre, source, n);
    updateInput(microlitre, source, n / 1e-3);

    updateInput(acreFoot, source, n / 1233481837.54752);
    updateInput(barrel, source, n / 158987.294928);
    updateInput(gallon, source, n / 3785.411784);
    updateInput(quart, source, n / 946.352946);
    updateInput(pint, source, n / 473.176473);
    updateInput(gill, source, n / 118.29411825);
    updateInput(fluidOunce, source, n / 29.5735295625);
    updateInput(fluidDram, source, n / 3.6966911953125);
    updateInput(minim, source, n / 0.061611519921875);

    updateInput(brPerch, source, n / 700841.953152);
    updateInput(brBarrel, source, n / 163659.24);
    updateInput(brBushel, source, n / 36368.72);
    updateInput(brPeck, source, n / 9092.18);
    updateInput(brGallon, source, n / 4546.09);
    updateInput(brQuart, source, n / 1136.5225);
    updateInput(brPint, source, n / 568.26125);
    updateInput(brFluidOunce, source, n / 28.4130625);
    updateInput(brYard3, source, n / 764554.857984);
    updateInput(brFoot3, source, n / 28316.846592);
    updateInput(brInch3, source, n / 16.387064);

    updateInput(ruVedro, source, n / 12299.41);
    updateInput(ruShtoff, source, n / 1229.941);
    updateInput(ruChetvert, source, n / 3074.8525);
    updateInput(ruVino, source, n / 768.713125);
    updateInput(ruVodka, source, n / 614.9705);
    updateInput(ruCharka, source, n / 122.9941);
    updateInput(ruShkalik, source, n / 61.49705);
  };

  const changeHandler =
    (ref: RefObject<HTMLInputElement>, toBase: (value: number) => number) =>
    () => {
      if (ref.current && !isNaN(parseFloat(ref.current.value)))
        updateInputs(toBase(parseFloat(ref.current.value)), ref);
    };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl">Онлайн калькулятор. Конвертер одиниць об'єму</h2>
      <Block name="Метричні">
        <InputGroup>
          <span className="w-60">Кубічний кілометр</span>
          <NumberInput
            ref={km3}
            onInput={changeHandler(km3, (n) => n * 1e15)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Кубічний метр</span>
          <NumberInput ref={m3} onInput={changeHandler(m3, (n) => n * 1e6)} />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Кубічний дециметрметр</span>
          <NumberInput ref={dm3} onInput={changeHandler(dm3, (n) => n * 1e3)} />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Кубічний сантиметр</span>
          <NumberInput ref={cm3} onInput={changeHandler(cm3, (n) => n)} />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Кубічний міліметр</span>
          <NumberInput
            ref={mm3}
            onInput={changeHandler(mm3, (n) => n * 1e-3)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Гектолітр</span>
          <NumberInput
            ref={hectolitre}
            onInput={changeHandler(hectolitre, (n) => n * 1e5)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Декалітр</span>
          <NumberInput
            ref={dekalitre}
            onInput={changeHandler(dekalitre, (n) => n * 1e4)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Літр</span>
          <NumberInput
            ref={litre}
            onInput={changeHandler(litre, (n) => n * 1e3)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Децилітр</span>
          <NumberInput
            ref={decilitre}
            onInput={changeHandler(decilitre, (n) => n * 1e2)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Сантилітр</span>
          <NumberInput
            ref={centilitre}
            onInput={changeHandler(centilitre, (n) => n * 1e1)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Мілілітр</span>
          <NumberInput
            ref={millilitre}
            onInput={changeHandler(millilitre, (n) => n)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Мікролітр</span>
          <NumberInput
            ref={microlitre}
            onInput={changeHandler(microlitre, (n) => n * 1e-3)}
          />
        </InputGroup>
      </Block>
      <Block name="США (рідина)">
        <InputGroup>
          <span className="w-60">Акр-фут</span>
          <NumberInput
            ref={acreFoot}
            onInput={changeHandler(acreFoot, (n) => n * 1233481837.54752)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Барель (нафтовий)</span>
          <NumberInput
            ref={barrel}
            onInput={changeHandler(barrel, (n) => n * 158987.294928)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Галон</span>
          <NumberInput
            ref={gallon}
            onInput={changeHandler(gallon, (n) => n * 3785.411784)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Кварта</span>
          <NumberInput
            ref={quart}
            onInput={changeHandler(quart, (n) => n * 946.352946)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Пінта</span>
          <NumberInput
            ref={pint}
            onInput={changeHandler(pint, (n) => n * 473.176473)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Гілл</span>
          <NumberInput
            ref={gill}
            onInput={changeHandler(gill, (n) => n * 118.29411825)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Рідка унція</span>
          <NumberInput
            ref={fluidOunce}
            onInput={changeHandler(fluidOunce, (n) => n * 29.5735295625)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Рідка драхма</span>
          <NumberInput
            ref={fluidDram}
            onInput={changeHandler(fluidDram, (n) => n * 3.6966911953125)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Мінім</span>
          <NumberInput
            ref={minim}
            onInput={changeHandler(minim, (n) => n * 0.061611519921875)}
          />
        </InputGroup>
      </Block>
      <Block name="Британські">
        <InputGroup>
          <span className="w-60">Перч</span>
          <NumberInput
            ref={brPerch}
            onInput={changeHandler(brPerch, (n) => n * 700841.953152)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Барель (сухий)</span>
          <NumberInput
            ref={brBarrel}
            onInput={changeHandler(brBarrel, (n) => n * 163659.24)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Бушель</span>
          <NumberInput
            ref={brBushel}
            onInput={changeHandler(brBushel, (n) => n * 36368.72)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Пек</span>
          <NumberInput
            ref={brPeck}
            onInput={changeHandler(brPeck, (n) => n * 9092.18)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Галон</span>
          <NumberInput
            ref={brGallon}
            onInput={changeHandler(brGallon, (n) => n * 4546.09)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Кварта</span>
          <NumberInput
            ref={brQuart}
            onInput={changeHandler(brQuart, (n) => n * 1136.5225)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Пінта</span>
          <NumberInput
            ref={brPint}
            onInput={changeHandler(brPint, (n) => n * 568.26125)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Рідка унція</span>
          <NumberInput
            ref={brFluidOunce}
            onInput={changeHandler(brFluidOunce, (n) => n * 28.4130625)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Кубічний ярд</span>
          <NumberInput
            ref={brYard3}
            onInput={changeHandler(brYard3, (n) => n * 764554.857984)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Кубічний фут</span>
          <NumberInput
            ref={brFoot3}
            onInput={changeHandler(brFoot3, (n) => n * 28316.846592)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Кубічний дюйм</span>
          <NumberInput
            ref={brInch3}
            onInput={changeHandler(brInch3, (n) => n * 16.387064)}
          />
        </InputGroup>
      </Block>
      <Block name="Староруські одиниці об'єму">
        <InputGroup>
          <span className="w-60">Відро</span>
          <NumberInput
            ref={ruVedro}
            onInput={changeHandler(ruVedro, (n) => n * 12299.41)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Штоф (кружка)</span>
          <NumberInput
            ref={ruShtoff}
            onInput={changeHandler(ruShtoff, (n) => n * 1229.941)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Чверть</span>
          <NumberInput
            ref={ruChetvert}
            onInput={changeHandler(ruChetvert, (n) => n * 3074.8525)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Винна пляшка</span>
          <NumberInput
            ref={ruVino}
            onInput={changeHandler(ruVino, (n) => n * 768.713125)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Горілчана пляшка</span>
          <NumberInput
            ref={ruVodka}
            onInput={changeHandler(ruVodka, (n) => n * 614.9705)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Чарка</span>
          <NumberInput
            ref={ruCharka}
            onInput={changeHandler(ruCharka, (n) => n * 122.9941)}
          />
        </InputGroup>
        <InputGroup>
          <span className="w-60">Шкалик</span>
          <NumberInput
            ref={ruShkalik}
            onInput={changeHandler(ruShkalik, (n) => n * 61.49705)}
          />
        </InputGroup>
      </Block>
    </div>
  );
}
