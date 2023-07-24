import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  useRef,
  useState,
} from "react";
import { MathfieldElement, MathfieldOptions } from "mathlive";
import "mathlive";
import ConvertAsciiMathToLatex from "asciimath-to-latex";
// some black ts magic to type mathfield web component.
// it basically combines mathlive specific attributes
// with default html attributes and replaces className with class
declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["math-field"]: Partial<MathfieldOptions> &
        Omit<
          DetailedHTMLProps<HTMLAttributes<MathfieldElement>, MathfieldElement>,
          "className"
        > & {
          class?: string;
        };
    }
  }
}

export default function MathInput({
  defaultValue,
  onInput,
  className,
}: {
  className?: string;
  defaultValue?: string;
  onInput?: (newValue: string) => void;
}) {
  const ref = useRef<MathfieldElement>(null);
  return (
    <math-field
      ref={ref}
      onInput={() => {
        if (ref.current) {
          onInput?.(ref.current.getValue("latex"));
        }
      }}
      class={className}
    >
      {defaultValue}
    </math-field>
  );
}
