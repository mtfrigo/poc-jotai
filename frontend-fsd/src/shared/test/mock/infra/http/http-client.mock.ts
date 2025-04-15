import { HttpClient } from "@/shared/infra/http/http-client.contracts";
import { vi } from "vitest";

export const mockResponse = 'Success'
export const httpClientMockSuccess: HttpClient = {
    request: vi.fn().mockResolvedValue(mockResponse)
}

export const httpClientMockFail: HttpClient = {
    request: vi.fn().mockRejectedValue(new Error('Network Error'))
}