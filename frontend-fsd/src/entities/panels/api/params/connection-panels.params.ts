import { BaseRequestParam } from "@/shared/api"

export type FetchConnectionPanelsQueryParams = {
    user?: string | null
    connectionId?: string | null
}


export type FetchConnectionPanelsRequestParams = BaseRequestParam & FetchConnectionPanelsQueryParams