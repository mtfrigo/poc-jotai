import { ReactNode } from "react";
import { QueryClientProvider } from "./QueryClientProvider";

type Props = {
  children: ReactNode;
};

export const Provider = ({ children }: Props) => {
  return (
    <>
      <QueryClientProvider>{children}</QueryClientProvider>
    </>
  );
};
