import { describe, it, expect, beforeEach, vi, Mock } from "vitest";
import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { AxiosHttpClientAdapter } from "./axios-client.adapter";
import { HttpMethod, HttpRequest } from "./http-client.contracts";

// Mock do axios
vi.mock("axios", () => ({
  default: {
    request: vi.fn(),
  },
}));

describe("AxiosHttpClientAdapter", () => {
  let mockAxios: { request: Mock };
  let httpClient: AxiosHttpClientAdapter;

  beforeEach(() => {
    mockAxios = axios as unknown as { request: Mock };
    httpClient = new AxiosHttpClientAdapter(
      mockAxios as unknown as AxiosInstance
    );
  });

  it("should return data when request is successful", async () => {
    const responseData = { success: true };
    const request: HttpRequest = {
      endpoint: "/test",
      method: HttpMethod.GET,
    };

    (mockAxios.request as Mock).mockResolvedValueOnce({
      data: responseData,
    } as AxiosResponse<typeof responseData>);

    const result = await httpClient.request<typeof responseData>(request);

    expect(result).toEqual(responseData);
    expect(mockAxios.request).toHaveBeenCalledWith({
      method: HttpMethod.GET,
      headers: undefined,
      data: undefined,
      url: "http://localhost:8080/test",
    });
  });

  it("should handle POST requests with body and headers", async () => {
    const responseData = { success: true };
    const request: HttpRequest = {
      endpoint: "/submit",
      method: HttpMethod.POST,
      body: { key: "value" },
      headers: { "Content-Type": "application/json" },
    };

    (mockAxios.request as Mock).mockResolvedValueOnce({
      data: responseData,
    } as AxiosResponse<typeof responseData>);

    const result = await httpClient.request<typeof responseData>(request);

    expect(result).toEqual(responseData);
    expect(mockAxios.request).toHaveBeenCalledWith({
      method: HttpMethod.POST,
      headers: { "Content-Type": "application/json" },
      data: { key: "value" },
      url: "http://localhost:8080/submit",
    });
  });

  it("should throw an error when the request fails", async () => {
    const request: HttpRequest = {
      endpoint: "/error",
      method: HttpMethod.GET,
    };

    const errorMessage = "Request failed";
    const errorResponse = {
      response: {
        status: 500,
        data: errorMessage,
      },
    };

    (mockAxios.request as Mock).mockRejectedValueOnce(
      errorResponse as AxiosError
    );

    await expect(httpClient.request(request)).rejects.toThrow(
      `Request failed with status 500: ${errorMessage}`
    );

    expect(mockAxios.request).toHaveBeenCalledWith({
      method: HttpMethod.GET,
      headers: undefined,
      data: undefined,
      url: "http://localhost:8080/error",
    });
  });

  it("should handle network errors", async () => {
    const request: HttpRequest = {
      endpoint: "/network-error",
      method: HttpMethod.GET,
    };

    const networkError = new Error("Network Error");
    (mockAxios.request as Mock).mockRejectedValueOnce(networkError);

    await expect(httpClient.request(request)).rejects.toThrow(
      `Request failed with status 500: Network Error`
    );

    expect(mockAxios.request).toHaveBeenCalledWith({
      method: HttpMethod.GET,
      headers: undefined,
      data: undefined,
      url: "http://localhost:8080/network-error",
    });
  });

  it("should handle requests with no headers and body", async () => {
    const responseData = { success: true };
    const request: HttpRequest = {
      endpoint: "/no-header-no-body",
      method: HttpMethod.DELETE,
    };

    (mockAxios.request as Mock).mockResolvedValueOnce({
      data: responseData,
    } as AxiosResponse<typeof responseData>);

    const result = await httpClient.request<typeof responseData>(request);

    expect(result).toEqual(responseData);
    expect(mockAxios.request).toHaveBeenCalledWith({
      method: HttpMethod.DELETE,
      headers: undefined,
      data: undefined,
      url: "http://localhost:8080/no-header-no-body",
    });
  });
});
