import { HttpClient } from "@/infra/http/http-client.contracts";
import { CreateLog } from "../../schemas/create-logs-schema";
import { Log } from "../../schemas/logs";
import { CreateLogServiceContract } from "./create-log.contracts";


//  TODO
export class CreateLogService implements CreateLogServiceContract {
  constructor(private readonly httpClient: HttpClient) {}

  async exec(data?: CreateLog): Promise<Log> {

    return {
      executedAt: new Date(),
      flavor: 'MONGO',
      id: '1'
    };
  }
}
