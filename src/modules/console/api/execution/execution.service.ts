import { OracleExecuteServiceContract, OracleExecuteBody, MongoExecuteBody, MongoExecuteServiceContract } from "./execution.contracts";

export class OracleExecuteService implements OracleExecuteServiceContract {
  async exec(body: OracleExecuteBody) {
    return {
      headers: [],
      rows: [],
    };
  }
}

export class ExecuteService implements MongoExecuteServiceContract {
  async exec(body: MongoExecuteBody) {
    return {
      headers: [],
      rows: [],
    };
  }
}
