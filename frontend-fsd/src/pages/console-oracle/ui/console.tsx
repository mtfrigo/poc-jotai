import { useActiveConnection } from "@/entities/connections";
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
import { useQuery } from "@tanstack/react-query";
import { OracleQueries } from "@/entities/oracle/api";
import { useUpdatePanel } from "@/features/oracle/consoles/update-panel/update-panel.feature";
import { useRef } from "react";

type Props = {
  panelId: string;
};

export const OraclePanel = ({ panelId }: Props) => {
  const connection = useActiveConnection();
  // const { onUpdateConsole } = useUpdateConsole(panelId);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { data: oraclePanel } = useQuery(OracleQueries.fetchPanelQuery({ id: panelId }))

  const { handleUpdatePanel } = useUpdatePanel()

  const { execution, handleExecute,  data, isLoading, loadingMessage } = useExecuteWithPolling({ consoleId: panelId });

  const handleRefresh = () => {
    // TODO será que não faria mais sentido ter um endpoint no backend para reexecutar a partir de um executionId?
    // TODO o statement aqui na verdade teria que ver do "execution" não do console...
    if (oraclePanel?.statement) {
      handleExecute({ statement: oraclePanel.statement });
    }
  };

  const handleCloseExecution = () => {
    // onUpdateConsole({
    //   statement: oraclePanel?.statement ?? "",
    //   executionId: undefined,
    // });
  };

  const handleSavePanel = () => {
    console.log("save")

    console.log(textareaRef.current?.value)

    handleUpdatePanel(panelId, { 
      ...oraclePanel,
      statement: textareaRef.current?.value ?? "",
      schema: undefined
    })
  }

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
                disabled={isLoading}
                // disabled={!canExecute}
                onClick={() =>
                  handleExecute({ statement: oraclePanel?.statement ?? "" })
                }
              >
                Run <PlayCircleIcon />
              </Button>
              <Button variant="outline" size="sm" disabled={!isLoading}>
                Cancel <StopCircleIcon />
              </Button>
            </div>
            <div>
              <Button
                onClick={handleSavePanel}
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
            ref={textareaRef} 
            defaultValue={oraclePanel?.statement ?? ""}
            // onBlur={(e) => {
              // onUpdateConsole({ statement: e.target.value });
            // }}
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
                disabled={!isLoading && !!oraclePanel?.executionId}
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
          <Result 
            loadingMessage={loadingMessage}
            executionId={oraclePanel?.executionId}
            data={data}  
            isLoading={isLoading} 
          />
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
