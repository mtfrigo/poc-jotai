import { useAtom, useAtomValue, useSetAtom,  } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { consoleIdAtom, oracleConsoleAtom,  } from "./oracle-panel.atoms";
import { toast } from "sonner";
import { activeConnectionAtom } from "../../console.atoms";
import { OracleExecuteBody, OracleExecuteServiceContract } from "../../api/execution/execution.contracts";
import { CreateLogServiceContract } from "@/modules/logs/api/logs/create-log.contracts";
import { useMutation } from "@tanstack/react-query";
import { Log } from "@/modules/logs/schemas/logs";
import { CreateLog } from "@/modules/logs/schemas/create-logs-schema";

type UseOraclePanelProps = {
  consoleId: string;
  executionService: OracleExecuteServiceContract;
  createLogService: CreateLogServiceContract;
};

export const useOraclePanelModel = ({
  consoleId,
  executionService,
  createLogService
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

  const { mutate: createLog } = useMutation<Log, Error, CreateLog>({
    mutationFn: (data) => createLogService.exec(data),
    onSuccess: () => {
      console.log("Log criado...")
    }
  })

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

    createLog({
      flavor: 'ORACLE',
      executedAt: new Date()
    })

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

    const input: OracleExecuteBody = {
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
