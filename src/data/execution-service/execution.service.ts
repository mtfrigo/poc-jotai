import { ExecuteBody, ExecuteServiceContract } from "./execution.contracts";

export class ExecuteService implements ExecuteServiceContract {
  async exec(body: ExecuteBody) {
    return {
      headers: [],
      rows: [],
    };
  }
}
