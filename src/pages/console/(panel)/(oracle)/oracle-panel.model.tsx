import { useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { oracleConsoleAtom, oraclePanelAtom } from "./oracle-panel.atoms";
import { Connection } from "@/domain/models/connection";
import { toast } from "sonner";
import { ExecuteServiceContract } from "@/data/execution-service/execution.contracts";

type UseOraclePanelProps = {
  connection: Connection;
  executionService: ExecuteServiceContract;
};

export const useOraclePanelModel = ({
  connection,
  executionService,
}: UseOraclePanelProps) => {
  const [oracleConsole, setOracleConsole] = useAtom(oracleConsoleAtom);
  const [oraclePanel, setOraclePanel] = useAtom(oraclePanelAtom);
  const [statement, setStatement] = useState("");

  useEffect(() => {
    setStatement(oracleConsole?.statement ?? "");
  }, [oracleConsole]);

  const handleExecute = async () => {
    const toastId = toast.loading("Executando...");

    // setOracleConsole({
    //   ...oracleConsole,
    //   result: null,
    //   statement,
    //   executedAt: new Date(),
    // });

    const result = await executionService.exec({
      body: {
        statement,
      },
      connectionId: connection.id,
    });

    toast.dismiss(toastId);
    toast.success("Executed successfully");

    // setOracleConsole({
    //   ...oracleConsole,
    //   result,
    //   statement,
    //   executedAt: new Date(),
    // });
  };

  const handleSaveConsole = () => {
    setOracleConsole({
      ...oracleConsole,
      statement,
    });

    toast.success("Console saved");
  };

  return {
    tabs: oraclePanel?.tabs ?? [],
    statement,
    result: oracleConsole?.result,
    connectionName: connection.name,
    executedAt: oracleConsole?.executedAt,

    handleExecute,
    handleSaveConsole,
    handleChangeStatement: setStatement,
  };
};
