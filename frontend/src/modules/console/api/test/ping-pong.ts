import { HttpClient, HttpMethod } from "@/infra/http/http-client.contracts";

export type PingPongServiceContract = {
  exec: () => Promise<any>;
};

export class PingPongService implements PingPongServiceContract {
  constructor(private readonly httpClient: HttpClient) {}

  async exec(): Promise<any> {
    const response = await this.httpClient.request({
      endpoint: "/ping",
      method: HttpMethod.GET,
    });

    return response;
  }
}
