import { useAtomValue } from "jotai";
import { activeConnectionAtom } from "./console.atoms";

export const useConsoleModel = () => {
  const activeConnection = useAtomValue(activeConnectionAtom);

  return {
    activeConnection,
  };
};
