import { queryOptions } from "@tanstack/react-query";
import { OracleService } from "./oracle.service";
import { FetchContentQueryParams, FetchExecutionQueryParams } from "./query/oracle.params";

export const OracleQueries = {
  all: () => ['oracle'],
  
  fetchByIdQuery: ({ id }: FetchExecutionQueryParams) => 
    queryOptions({
      queryKey: [...OracleQueries.all(), id],
      queryFn: async () => OracleService.fetchExecution({ id: id ?? "" }),
      enabled: !!id,
      refetchInterval: ({ state }) => {
        return state?.status === "error" || state?.data?.status === "SUCCESS"
          ? false
          : 1000;
      },
      staleTime: Infinity,
    }),
    
  fetchContentQuery: ({ id, enabled }: FetchContentQueryParams ) => 
    queryOptions({
      queryKey: [...OracleQueries.all(), id, 'content'],
      queryFn: async () => OracleService.fetchContent({ id: id ?? ""}),
      enabled,
      staleTime: Infinity,
  })
};
