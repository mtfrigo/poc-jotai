import { useAtom } from "jotai";
import { activeConnectionAtom } from "../console.atoms";
import { Connection } from "@/modules/console/schemas/connection";
import { connectionsAtom } from "./sidebar.atoms";
import { makeConnection } from "@/test/mock/connections/factory";

export const useSidebarModel = () => {
  const [connections, setConnections] = useAtom(connectionsAtom);
  const [activeConnection, setActiveConnection] = useAtom(activeConnectionAtom);

  const handleDbClickConnection = (connection: Connection) => {
    setActiveConnection(connection);
  };

  const handleNewConnection = () => {
    setConnections((prev) => [...prev, makeConnection()]);
  };

  const handleResetConnections = () => {
    setConnections([]);
  };

  return {
    activeConnection,
    connections,
    handleDbClickConnection,
    handleNewConnection,
    handleResetConnections,
  };
};
