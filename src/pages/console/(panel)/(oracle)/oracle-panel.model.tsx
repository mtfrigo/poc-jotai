import { useAtom, useAtomValue, useSetAtom,  } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { consoleIdAtom, oracleConsoleAtom,  } from "./oracle-panel.atoms";
import { toast } from "sonner";
import { OracleExecuteBody, OracleExecuteServiceContract } from "@/data/execution-service/execution.contracts";
import { activeConnectionAtom } from "../../console.atoms";

type UseOraclePanelProps = {
  consoleId: string;
  executionService: OracleExecuteServiceContract;
};

export const useOraclePanelModel = ({
  consoleId,
  executionService,
}: UseOraclePanelProps) => {
  const connection = useAtomValue(activeConnectionAtom);
  const setConsoleId = useSetAtom(consoleIdAtom);
  const [oracleConsole, setOracleConsole] = useAtom(oracleConsoleAtom);
  const [statement, setStatement] = useState("");

  useEffect(() => {
    if(!consoleId)  return;

    setConsoleId(consoleId);
  }, [consoleId, setConsoleId]);

  useEffect(() => {
    setStatement(oracleConsole?.statement ?? "");
  }, [oracleConsole]);

  const execute = async (input: OracleExecuteBody) => {
    const toastId = toast.loading("Executando...");

    setOracleConsole({
      ...oracleConsole,
      result: {
        ...oracleConsole.result,
        input,
        content: null
      },
      statement,
      status: 'PENDING',
      executedAt: new Date(),
    });

    const content = await executionService.exec(input);

    toast.dismiss(toastId);
    toast.success("Executed successfully");

    setOracleConsole({
      ...oracleConsole,
      result: {
        ...oracleConsole.result,
        input,
        content
      },
      statement,
      status: 'SUCCESS',
      executedAt: new Date(),
    });

  }

  const handleExecute = async () => {
    if(!connection) return;

    const input = {
      body: {
        statement,
      },
      connectionId: connection.id,
    }

    execute(input)
  };

  const handleSaveConsole = () => {
    if(!oracleConsole) return;

    setOracleConsole({
      ...oracleConsole,
      statement,
    });

    toast.success("Console saved");
  };

  const handleRefresh = () => {
    if(!oracleConsole.result?.input) return;

    execute(oracleConsole.result.input)

  }

  const handleCloseExecution = () => {

    setOracleConsole({
      ...oracleConsole,
      executedAt: undefined,
      status: 'IDLE',
      result: undefined
    })
  }

  const isRefreshDisabled = useMemo(() => {
    return !['ERROR', 'SUCCESS'].includes( oracleConsole.status) 
  }, [oracleConsole])

  const isExecuteDisabled = useMemo(() => {
    return oracleConsole.status === 'PENDING'
  }, [oracleConsole])

  return {
    statement,
    result: oracleConsole.result,
    connectionName: connection?.name ?? "" ,
    executedAt: oracleConsole.executedAt,
    status: oracleConsole.status,

    isRefreshDisabled,
    isExecuteDisabled,

    handleExecute,
    handleRefresh,
    handleSaveConsole,
    handleCloseExecution,
    handleChangeStatement: setStatement,
  };
};
