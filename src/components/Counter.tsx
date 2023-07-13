import React, { useState } from "react";

export default function Counter() {
  const [counter, setCounter] = useState(0);
  return (
    <>
      react component {counter}{" "}
      <button onClick={() => setCounter((c) => c + 1)}>Increment</button>
    </>
  );
}
