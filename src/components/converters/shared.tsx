import React, { ReactNode, useState } from "react";

export function Block({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-lg border-4 border-solid border-gray-300 p-4">
      <div className="flex items-baseline gap-2">
        <span className="font-bold">{name}</span>
        <button className="rounded px-2" onClick={() => setOpen(!open)}>
          {open ? "Скрити" : "Розкрити"}
        </button>
      </div>
      <div
        style={{ display: open ? "block" : "none" }}
        className="my-2 flex flex-col gap-2"
      >
        {children}
      </div>
    </div>
  );
}

export function InputGroup({ children }: { children: ReactNode }) {
  return <div className="flex items-baseline gap-2">{children}</div>;
}
