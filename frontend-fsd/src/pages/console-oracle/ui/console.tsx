import { useActiveConnection } from "@/entities/connections";
import { useConsoleById } from "@/entities/oracle";
import { useUpdateConsole } from "@/features/oracle";
import { useExecuteWithPolling } from "@/features/oracle";
import { Console } from "@/shared/ui/components/console";
import { Button } from "@/shared/ui/primitives/button";
import { Textarea } from "@/shared/ui/primitives/textarea";
import { formatDatetime } from "@/shared/utils/format-datetime";
import { getDuration } from "@/shared/utils/get-duration-from-start-end";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ClockIcon,
  DownloadCloudIcon,
  PlayCircleIcon,
  RefreshCwIcon,
  SaveIcon,
  StopCircleIcon,
  TrashIcon,
} from "lucide-react";
import { Result } from "./result";

type Props = {
  consoleId: string;
};

export const OracleConsole = ({ consoleId }: Props) => {
  const connection = useActiveConnection();
  const { onUpdateConsole } = useUpdateConsole(consoleId);

  const {
    console: oracleConsole,
    canExecute,
    canRefresh,
  } = useConsoleById(consoleId);

  const { execution, handleExecute } = useExecuteWithPolling({ consoleId });

  const handleRefresh = () => {
    // TODO será que não faria mais sentido ter um endpoint no backend para reexecutar a partir de um executionId?
    // TODO o statement aqui na verdade teria que ver do "execution" não do console...
    if (oracleConsole?.statement) {
      handleExecute({ statement: oracleConsole.statement });
    }
  };

  const handleCloseExecution = () => {
    onUpdateConsole({
      statement: oracleConsole?.statement ?? "",
      status: "IDLE",
      executionId: undefined,
    });
  };

  return (
    <Console data-testid="oracle-console">
      <Console.Panel>
        <Console.Flavor
          flavor="ORACLE"
          name={`${connection?.name} ${status}`}
        />
        <Console.Toolbar>
          <div className="flex flex-1 justify-between items-center">
            <div className="space-x-1">
              <Button
                variant="default"
                size="sm"
                disabled={!canExecute}
                onClick={() =>
                  handleExecute({ statement: oracleConsole?.statement ?? "" })
                }
              >
                Run <PlayCircleIcon />
              </Button>
              <Button variant="outline" size="sm">
                Cancel <StopCircleIcon />
              </Button>
            </div>
            <div>
              <Button
                onClick={() =>
                  onUpdateConsole({ statement: oracleConsole?.statement ?? "" })
                }
                variant="outline"
                size="sm"
              >
                Save <SaveIcon />
              </Button>
            </div>
          </div>
        </Console.Toolbar>
        <Console.Body>
          <Textarea
            className="flex-1"
            defaultValue={oracleConsole?.statement ?? ""}
            onBlur={(e) => {
              onUpdateConsole({ statement: e.target.value });
            }}
          />
        </Console.Body>
      </Console.Panel>
      <Console.Result>
        <Console.Toolbar>
          <div className="flex flex-1 justify-between items-center">
            <div className="flex gap-1">
              <Button variant="outline" size="sm">
                <ChevronLeft />
              </Button>
              <Button variant="outline" size="sm">
                <ChevronRight />
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={!canRefresh}
                onClick={handleRefresh}
              >
                <RefreshCwIcon />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCloseExecution}
              >
                <TrashIcon />
              </Button>
            </div>
            <div>
              <Button variant="outline" size="sm">
                Export <DownloadCloudIcon />
              </Button>
            </div>
          </div>
        </Console.Toolbar>
        {oracleConsole.status === "IDLE" && (
          <div className="flex flex-1 justify-center items-center">
            No execution
          </div>
        )}
        {oracleConsole.status === "PENDING" && (
          <div className="flex flex-1 justify-center items-center">
            Carregando...
          </div>
        )}
        {oracleConsole.status === "SUCCESS" && oracleConsole.executionId && (
          <Result executionId={oracleConsole.executionId} />
        )}
      </Console.Result>
      <Console.Footer>
        <div className="flex gap-2">
          <div className="flex gap-1 items-center">
            <CalendarIcon className="text-slate-500 size-4" />
            Executado em:{" "}
            <span className="text-green-500">
              {execution?.createdAt
                ? formatDatetime(execution?.createdAt)
                : "--/--/--"}
            </span>
          </div>
          <div className="w-px h-full bg-slate-300" />
          <div className="flex gap-1 items-center">
            <CalendarIcon className="text-slate-500 size-4" />
            Finalizado em:{" "}
            <span className="text-green-500">
              {execution?.finishedAt
                ? formatDatetime(execution?.finishedAt)
                : "--/--/--"}
            </span>
          </div>
          {execution?.finishedAt && (
            <>
              <div className="w-px h-full bg-slate-300" />
              <div className="flex gap-1 items-center">
                <ClockIcon className="text-slate-500 size-4" /> Duração:{" "}
                <span className="text-green-500">
                  {`${getDuration({
                    finishedAt: execution.finishedAt,
                    startAt: execution.createdAt,
                  })} ms`}
                </span>
              </div>
            </>
          )}
        </div>
      </Console.Footer>
    </Console>
  );
};
