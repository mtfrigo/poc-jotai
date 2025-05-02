import { BaseRequestParam } from "@/shared/api"

export type FetchExecutionQueryParams = {
    id?: string | null
}

export type FetchExecutionRequestParams = BaseRequestParam & FetchExecutionQueryParams

export type FetchContentQueryParams = {
    id?: string,
    enabled?: boolean
}

export type FetchContentRequestParams = BaseRequestParam & {
    id?: string,
}


export type ExecuteParams = BaseRequestParam & {
    resourceId: string;
    statement: string;
}