import React, { ReactNode } from "react";
import Providers from "../components/Providers";

export default function Root({ children }: { children: ReactNode }) {
  return <Providers>{children}</Providers>;
}
