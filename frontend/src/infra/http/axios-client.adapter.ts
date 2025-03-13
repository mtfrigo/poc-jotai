import axios, { AxiosError, AxiosInstance } from "axios";
import { HttpClient, HttpRequest } from "./http-client.contracts";

const URL = "http://localhost:8080";

export class AxiosHttpClientAdapter implements HttpClient {
  constructor(private api: AxiosInstance = axios) {}

  async request<R>({
    endpoint,
    method,
    body,
    headers,
  }: HttpRequest): Promise<R> {
    try {
      const { data } = await this.api.request<R>({
        method,
        headers,
        data: body,
        url: `${URL}${endpoint}`,
      });
      return data;
    } catch (er) {
      const error = er as AxiosError;
      const status = error.response?.status || 500;
      const message = error.response?.data || error.message;
      throw new Error(`Request failed with status ${status}: ${message}`);
    }
  }
}
