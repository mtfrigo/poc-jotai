import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { activeConnectionAtom } from "../../console.atoms";
import { consoleIdAtom, mongoConsoleAtom } from "./mongo-panel.atoms";
import { useEffect, useMemo, useState } from "react";
import { MongoExecuteBody } from "../../api/execution/execution.contracts";
import { toast } from "sonner";

type UseMongoPanelProps = {
  consoleId: string;
  // services: {
  //   executionService: MongoExecuteServiceContract;
  //   fetchExecutionService: FetchExecutionServiceContract;
  // };
};

export const useMongoPanelModel = ({ consoleId }: UseMongoPanelProps) => {
  const connection = useAtomValue(activeConnectionAtom);
  const setConsoleId = useSetAtom(consoleIdAtom);
  const [mongoConsole, setMongoConsole] = useAtom(mongoConsoleAtom);

  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [projection, setProjection] = useState("");

  useEffect(() => {
    if (!consoleId) return;

    setConsoleId(consoleId);
  }, [consoleId, setConsoleId]);

  // const { data: execution } = useQuery({
  //     queryKey: ["status", mongoConsole?.executionId],
  //     queryFn: () => fetchExecutionService.exec(mongoConsole?.executionId ?? ""),
  //     enabled: !!mongoConsole?.executionId,
  //     refetchInterval: ({ state }) => {
  //       return state?.status === "error" || state?.data?.status === "SUCCESS"
  //         ? false
  //         : 1000;
  //     },
  //   });

  // useEffect(() => {
  //   if (execution && mongoConsole && execution.status === "SUCCESS") {
  //     toast.success("Executed successfully");

  //     setMongoConsole({
  //       ...mongoConsole,
  //       status: execution.status,
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [execution]);

  const execute = async (input: MongoExecuteBody) => {
    const toastId = toast.loading("Executando...");

    // const execution = await executionService.exec(input);

    toast.dismiss(toastId);
    toast.success("Executed successfully");

    setMongoConsole({
      ...mongoConsole,
      // result: {
      //   ...mongoConsole.result,
      //   input,
      //   content: {
      //     headers: [],
      //     rows: [],
      //   },
      // },
      // executionId: execution.id,
      find: {
        filter,
        projection,
        sort,
      },
      // status: execution.status,
      // executedAt: execution.createdAt,
    });
  };

  const handleExecute = async () => {
    if (!connection) return;

    const input: MongoExecuteBody = {
      find: {
        filter,
        projection,
        sort,
      },
      connectionId: connection.id,
    };

    execute(input);
  };

  const handleSaveConsole = () => {
    if (!mongoConsole) return;

    setMongoConsole({
      ...mongoConsole,
      find: {
        filter,
        projection,
        sort,
      },
    });

    toast.success("Console saved");
  };

  // const handleRefresh = () => {
  //   if (!mongoConsole.result?.input) return;

  //   execute(mongoConsole.result.input);
  // };

  const handleCloseExecution = () => {
    setMongoConsole({
      ...mongoConsole,
      executedAt: undefined,
      status: "IDLE",
      // result: undefined,
    });
  };

  const isRefreshDisabled = useMemo(() => {
    return !["ERROR", "SUCCESS"].includes(mongoConsole.status);
  }, [mongoConsole]);

  const isExecuteDisabled = useMemo(() => {
    return mongoConsole.status === "PENDING";
  }, [mongoConsole]);

  return {
    filter,
    projection,
    sort,
    // execution,
    // result: mongoConsole.result,
    connectionName: connection?.name ?? "",
    executedAt: mongoConsole.executedAt,
    status: mongoConsole.status,

    isRefreshDisabled,
    isExecuteDisabled,

    handleExecute,
    // handleRefresh,
    handleSaveConsole,
    handleCloseExecution,
    handleChangeSort: setSort,
    handleChangeFilter: setFilter,
    handleChangeProjection: setProjection,
  };
};
