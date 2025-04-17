import { store } from "@/entities/connections";
import { useSetAtom } from "jotai";


export const useResetConnections = () => {
  const setConnections = useSetAtom(store.connections);

  const handleResetConnections = () => {
    setConnections([]);
  };

  return { handleResetConnections };
};