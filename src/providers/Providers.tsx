"use client";
import { JSX, type ReactNode } from "react";
import AppQueryProvider from "./QueryProvider";
import QueryLoadingIndicator from "@/components/QueryLoadingIndicator";

const Providers = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <AppQueryProvider>
      <QueryLoadingIndicator />
      {children}
    </AppQueryProvider>
  );
};

export { Providers };
