import { HttpClient, HttpMethod } from "@/infra/http/http-client.contracts";
import {
  OracleExecuteServiceContract,
  OracleExecuteBody,
  MongoExecuteBody,
  MongoExecuteServiceContract,
  ExecutionResponse,
  FetchExecutionServiceContract,
  FetchExecutionsServiceContract,
} from "./execution.contracts";

export class FetchExecutionService implements FetchExecutionServiceContract {
  constructor(private readonly httpClient: HttpClient) {}

  async exec(id: string) {
    const response = await this.httpClient.request<ExecutionResponse>({
      endpoint: `/execution/${id}`,
      method: HttpMethod.GET,
    });

    return response;
  }
}

export class FetchExecutionsService implements FetchExecutionsServiceContract {
  constructor(private readonly httpClient: HttpClient) {}

  async exec() {
    const response = await this.httpClient.request<ExecutionResponse[]>({
      endpoint: `/execution`,
      method: HttpMethod.GET,
    });

    console.log({ response });

    return response;
  }
}

export class OracleExecuteService implements OracleExecuteServiceContract {
  constructor(private readonly httpClient: HttpClient) {}

  async exec(body: OracleExecuteBody) {
    const response = await this.httpClient.request<ExecutionResponse>({
      endpoint: "/execution/oracle",
      method: HttpMethod.POST,
      body: {
        resourceId: body.connectionId,
        statement: body.body.statement,
      },
    });

    return response;

    // return {
    //   headers: [],
    //   rows: [],
    // };
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
