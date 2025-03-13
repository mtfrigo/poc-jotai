import { Input } from "@/components/ui/input";
import { useLogsModel } from "./logs.model";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";

export const LogsView = ({ logs }: ReturnType<typeof useLogsModel>) => {
  return (
    <div className="flex flex-1">
      <div className="p-2 flex w-[300px] border-r flex-col gap-2">
        <Input placeholder="Filtrar..." />

        <Select value="ORACLE">
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ORACLE">Oracle</SelectItem>
          </SelectContent>
        </Select>

        <Button>Filtrar</Button>
      </div>
      <div className="flex-1 p-1 flex flex-col gap-1">
        {logs?.map((log) => (
          <div className="flex flex-col w-full border rounded-md text-sm py-2 px-4 gap-1">
            <div>
              <span className="font-bold">Id:</span> {log.id}
            </div>

            <div>
              <span className="font-bold">Flavor:</span> {log.flavor}
            </div>

            <div>
              <span className="font-bold">Resource</span> TestDb
            </div>

            <div>
              <span className="font-bold">Executed at:</span>{" "}
              {log.finishedAt?.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
