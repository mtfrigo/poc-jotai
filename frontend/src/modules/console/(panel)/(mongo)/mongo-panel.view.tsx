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
import { useMongoPanelModel } from "./mongo-panel.model";
import { format } from "date-fns";
import { Console } from "../../components/console";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const MongoPanelView = ({
  // STATES
  // result,
  // execution,
  status,
  filter,
  projection,
  sort,
  executedAt,
  isExecuteDisabled,
  isRefreshDisabled,
  connectionName,
  // HANDLERS
  handleExecute,
  // handleRefresh,
  handleSaveConsole,
  handleCloseExecution,
  handleChangeFilter,
  handleChangeProjection,
  handleChangeSort,
}: ReturnType<typeof useMongoPanelModel>) => {
  return (
    <Console data-testid="mongo-console">
      <Console.Panel>
        <Console.Flavor flavor="MONGO" name={`${connectionName} ${status}`} />
        <Console.Toolbar>
          <div className="flex flex-1 justify-between items-center">
            <div className="space-x-1">
              <Button
                variant="default"
                size="sm"
                disabled={isExecuteDisabled}
                onClick={handleExecute}
              >
                Run <PlayCircleIcon />
              </Button>
              <Button variant="outline" size="sm">
                Cancel <StopCircleIcon />
              </Button>
            </div>
            <div>
              <Button onClick={handleSaveConsole} variant="outline" size="sm">
                Save <SaveIcon />
              </Button>
            </div>
          </div>
        </Console.Toolbar>
        <Console.Body>
          <Textarea
            className="flex-1"
            value={filter ?? ""}
            onChange={(e) => handleChangeFilter(e.target.value)}
          />
          <Textarea
            className="flex-1"
            value={sort ?? ""}
            onChange={(e) => handleChangeSort(e.target.value)}
          />
          <Textarea
            className="flex-1"
            value={projection ?? ""}
            onChange={(e) => handleChangeProjection(e.target.value)}
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
                disabled={isRefreshDisabled}
                // onClick={handleRefresh}
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
        {status === "IDLE" && (
          <div className="flex flex-1 justify-center items-center">
            No execution
          </div>
        )}
        {status === "PENDING" && (
          <div className="flex flex-1 justify-center items-center">
            Carregando...
          </div>
        )}
        {/* {result && status === "SUCCESS" && (
            <Table className="h-full ">
              <TableHeader>
                <TableRow>
                  {result.content?.headers.map((header, i) => (
                    <TableHead key={`${header}${i}`}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.content?.rows.map((row, i) => {
                  return (
                    <TableRow>
                      {result.content?.headers.map((header, j) => (
                        <TableCell key={`${i}-${j}-${header}`}>
                          {row[header]}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )} */}
      </Console.Result>
      <Console.Footer>
        <div className="flex gap-2">
          <div className="flex gap-1 items-center">
            <CalendarIcon className="text-slate-500 size-4" />
            Executado em:{" "}
            <span className="text-green-500">
              {executedAt
                ? format(executedAt, "dd/MM/yyyy HH:mm:ss")
                : "--/--/----"}
            </span>
          </div>
          <div className="w-px h-full bg-slate-300" />
          <div className="flex gap-1 items-center">
            <CalendarIcon className="text-slate-500 size-4" />
            Finalizado em:{" "}
            <span className="text-green-500">
              {/* {execution && execution.finishedAt
                  ? format(execution.finishedAt, "dd/MM/yyyy HH:mm:ss")
                  : "--/--/----"} */}
            </span>
          </div>
          <div className="w-px h-full bg-slate-300" />
          <div className="flex gap-1 items-center">
            <ClockIcon className="text-slate-500 size-4" /> Duração:{" "}
            <span className="text-green-500">
              {/* {executedAt &&
                  execution?.finishedAt &&
                  `${differenceInMilliseconds(execution?.finishedAt, executedAt)} ms`} */}
            </span>
          </div>
        </div>
      </Console.Footer>
    </Console>
  );
};
