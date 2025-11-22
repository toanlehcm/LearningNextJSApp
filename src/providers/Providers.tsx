"use client";
import { JSX, type ReactNode } from "react";
import AppQueryProvider from "./QueryProvider";

const Providers = ({ children }: { children: ReactNode }): JSX.Element => {
  return <AppQueryProvider>{children}</AppQueryProvider>;
};

export { Providers };
