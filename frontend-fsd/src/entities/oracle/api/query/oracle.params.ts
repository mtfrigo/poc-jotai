import { BaseRequestParam } from "@/shared/api"

export type FetchExecutionQueryParams = {
    id?: string | null
}

export type FetchExecutionRequestParams = BaseRequestParam & FetchExecutionQueryParams

export type FetchPanelQueryParams = {
    id?: string | null
}

export type FetchPanelRequestParams = BaseRequestParam & FetchPanelQueryParams

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

export type UpdatePanelPanelQueryParams = {
    id?: string | null
    user?: string | null
    statement?: string | null
    executionId?: string | null
    schema?: string | null
}

export type UpdatePanelRequestParams = BaseRequestParam & UpdatePanelPanelQueryParams

export type AddPanelQueryParams = {
    user: string;
    id: string;
    name: string;
}

export type AddPanelRequestParams = BaseRequestParam &  AddPanelQueryParams