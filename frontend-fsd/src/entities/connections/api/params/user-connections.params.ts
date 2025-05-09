import { BaseRequestParam } from "@/shared/api"

export type FetchUserConnectionsQueryParams = {
    user?: string | null
}

export type FetchUserConnectionsRequestParams = BaseRequestParam & FetchUserConnectionsQueryParams


export type AddConnectionParams = BaseRequestParam & {
    user: string;
    id: string;
    name: string;
    flavor: string;
    favorite?: boolean;
}