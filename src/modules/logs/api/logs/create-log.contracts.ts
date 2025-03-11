import { Log } from "../../schemas/logs";
import { CreateLog } from "../../schemas/create-logs-schema";

export type CreateLogServiceContract = {
  exec: (data: CreateLog) => Promise<Log>;
};