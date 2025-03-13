import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { consoleIdAtom, oracleConsoleAtom } from "./oracle-panel.atoms";
import { toast } from "sonner";
import { activeConnectionAtom } from "../../console.atoms";
import {
  FetchExecutionServiceContract,
  OracleExecuteBody,
  OracleExecuteServiceContract,
} from "../../api/execution/execution.contracts";
import { useQuery } from "@tanstack/react-query";

type UseOraclePanelProps = {
  consoleId: string;
  services: {
    executionService: OracleExecuteServiceContract;
    fetchExecutionService: FetchExecutionServiceContract;
  };
};

export const useOraclePanelModel = ({
  consoleId,
  services: { executionService, fetchExecutionService },
}: UseOraclePanelProps) => {
  const connection = useAtomValue(activeConnectionAtom);
  const setConsoleId = useSetAtom(consoleIdAtom);
  const [oracleConsole, setOracleConsole] = useAtom(oracleConsoleAtom);
  const [statement, setStatement] = useState("");

  useEffect(() => {
    if (!consoleId) return;

    setConsoleId(consoleId);
  }, [consoleId, setConsoleId]);

  useEffect(() => {
    setStatement(oracleConsole?.statement ?? "");
  }, [oracleConsole]);

  const { data: execution } = useQuery({
    queryKey: ["status", oracleConsole?.executionId],
    queryFn: () => fetchExecutionService.exec(oracleConsole?.executionId ?? ""),
    enabled: !!oracleConsole?.executionId,
    refetchInterval: ({ state }) => {
      return state?.status === "error" || state?.data?.status === "SUCCESS"
        ? false
        : 1000;
    },
  });

  useEffect(() => {
    if (execution && oracleConsole && execution.status === "SUCCESS") {
      toast.success("Executed successfully");

      setOracleConsole({
        ...oracleConsole,
        status: execution.status,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [execution]);

  const execute = async (input: OracleExecuteBody) => {
    const toastId = toast.loading("Executando...");

    const execution = await executionService.exec(input);

    toast.dismiss(toastId);
    toast.success("Executed successfully");

    setOracleConsole({
      ...oracleConsole,
      result: {
        ...oracleConsole.result,
        input,
        content: {
          headers: [],
          rows: [],
        },
      },
      executionId: execution.id,
      statement,
      status: execution.status,
      executedAt: execution.createdAt,
    });
  };

  const handleExecute = async () => {
    if (!connection) return;

    const input: OracleExecuteBody = {
      body: {
        statement,
      },
      connectionId: connection.id,
    };

    execute(input);
  };

  const handleSaveConsole = () => {
    if (!oracleConsole) return;

    setOracleConsole({
      ...oracleConsole,
      statement,
    });

    toast.success("Console saved");
  };

  const handleRefresh = () => {
    if (!oracleConsole.result?.input) return;

    execute(oracleConsole.result.input);
  };

  const handleCloseExecution = () => {
    setOracleConsole({
      ...oracleConsole,
      executedAt: undefined,
      status: "IDLE",
      result: undefined,
    });
  };

  const isRefreshDisabled = useMemo(() => {
    return !["ERROR", "SUCCESS"].includes(oracleConsole.status);
  }, [oracleConsole]);

  const isExecuteDisabled = useMemo(() => {
    return oracleConsole.status === "PENDING";
  }, [oracleConsole]);

  return {
    statement,
    execution,
    result: oracleConsole.result,
    connectionName: connection?.name ?? "",
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
