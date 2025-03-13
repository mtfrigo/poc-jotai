import { HttpClient } from "@/infra/http/http-client.contracts";
import { ListLogsServiceContract } from "./list-logs.contracts";
import { LogsFilters } from "../../schemas/logs-filters";
import { Log } from "../../schemas/logs";

// TODO
export class ListLogsService implements ListLogsServiceContract {
  constructor(private readonly httpClient: HttpClient) {}

  async exec(filters?: LogsFilters): Promise<Log[]> {

    console.log({filters})

    const list: Log[] = [];

    return list;
  }
}
