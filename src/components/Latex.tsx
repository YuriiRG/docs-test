import React from "react";
import "katex/dist/katex.min.css";
import { useMemo } from "react";
import katex from "katex";
export default function Latex({
  text,
  className,
  blockMode = false,
}: {
  text: string;
  className?: string;
  blockMode?: boolean;
}) {
  const html = useMemo(() => {
    try {
      return { data: katex.renderToString(text, { displayMode: blockMode }) };
    } catch (error) {
      if (error instanceof katex.ParseError || error instanceof TypeError) {
        return { error };
      }
      throw error;
    }
  }, [text, blockMode]);
  if (html.error) {
    return <span className={className}>Invalid LaTeX</span>;
  }
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html.data }}
    />
  );
}
