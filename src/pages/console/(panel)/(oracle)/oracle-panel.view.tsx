import { useOraclePanelModel } from "./oracle-panel.model";
import { Console } from "@/components/console";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronLeft,
  ChevronRight,
  DownloadCloudIcon,
  PlayCircleIcon,
  RefreshCwIcon,
  SaveIcon,
  StopCircleIcon,
} from "lucide-react";

export const OraclePanelView = ({
  tabs,
  result,
  statement,
  executedAt,
  connectionName,

  handleExecute,
  handleSaveConsole,
  handleChangeStatement,
}: ReturnType<typeof useOraclePanelModel>) => {
  return (
    <Console>
      <div>
        {tabs.map((tabs) => (
          <Button key={tabs.id} variant="outline" size="sm">
            {tabs.label}
          </Button>
        ))}
      </div>
      <Console.Flavor flavor="ORACLE" name={connectionName} />
      <Console.Toolbar>
        <div className="flex flex-1 justify-between items-center">
          <div>
            <Button variant="outline" size="sm" onClick={handleExecute}>
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
          value={statement ?? ""}
          onChange={(e) => handleChangeStatement(e.target.value)}
        />
      </Console.Body>
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
              <Button variant="outline" size="sm">
                <RefreshCwIcon />
              </Button>
            </div>
            <div>
              <Button variant="outline" size="sm">
                Export <DownloadCloudIcon />
              </Button>
            </div>
          </div>
        </Console.Toolbar>
        {!result && (
          <div className="flex flex-1 items-center justify-center">
            No result
          </div>
        )}
        {result && (
          <Table className="overflow max-h-[50%]">
            <TableHeader>
              <TableRow>
                {result.headers.map((header) => (
                  <TableHead key={header}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.rows.map((row, i) => {
                console.log({ row });
                return (
                  <TableRow>
                    {result.headers.map((header, j) => (
                      <TableCell key={`${i}-${j}-${header}`}>
                        {row[header]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Console.Result>
      <Console.Footer>
        <div className="flex gap-2">
          <div>
            Executado em:{" "}
            <span className="text-green-500">
              {executedAt?.toLocaleDateString() ?? "--/--/----"}
            </span>
          </div>
          <div>
            Duração: <span className="text-green-500">00:00:00</span>
          </div>
        </div>
      </Console.Footer>
    </Console>
  );
};
