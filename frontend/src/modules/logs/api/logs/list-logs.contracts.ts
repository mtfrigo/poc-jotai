import { Log } from "../../schemas/logs";
import { LogsFilters } from "../../schemas/logs-filters";

export type ListLogsServiceContract = {
  exec: (filters?: LogsFilters) => Promise<Log[]>;
};