import { BaseRequestParam } from "@/shared/api"

export type FetchTeamsQueryRequest = BaseRequestParam

export type FetchTeamQueryParams = {
    id?: string,
}

export type FetchTeamRequestParams = BaseRequestParam & FetchTeamQueryParams

export type FetchTeamMembersQueryParams = {
    id?: string,
}

export type FetchTeamMembersRequestParams = BaseRequestParam & FetchTeamQueryParams

export type FetchTeamActivitiesQueryParams = {
    id?: string,
}

export type FetchTeamActivitiesRequestParams = BaseRequestParam & FetchTeamQueryParams
