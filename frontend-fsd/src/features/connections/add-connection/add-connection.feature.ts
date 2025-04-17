import { store } from "@/entities/connections";
import { makeConnection } from "@/shared/test/mock/factories/connections.factory";
import { useSetAtom } from "jotai";


export const useAddConnection = () => {
  const setConnections = useSetAtom(store.connections);

  const handleAddConnection = () => {
    setConnections((prev) => [...prev, makeConnection()]);
  };

  return { handleAddConnection };
};