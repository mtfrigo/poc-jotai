import { queryOptions } from "@tanstack/react-query";
import { OracleService } from "./oracle.service";

type Props = {
  executionId?: string | null;
  enabled?: boolean;
};

export const fetchByIdQuery = ({ executionId }: Props) =>
  queryOptions({
    queryKey: ["oracle", "execution", executionId],
    queryFn: async () => {
      const res = await OracleService.fetchById({
        executionId: executionId ?? "",
      });
      return res.data;
    },
    enabled: !!executionId,
    refetchInterval: ({ state }) => {
      return state?.status === "error" || state?.data?.status === "SUCCESS"
        ? false
        : 1000;
    },
    staleTime: Infinity,
  });

  export const fetchContentQuery = ({ executionId, enabled }: Props) =>
    queryOptions({
      queryKey: ["oracle", "execution", "content", executionId],
      queryFn: async () => {
        const res = await OracleService.fetchContent({
          executionId: executionId ?? "",
        });

        await new Promise((resolve) => {setTimeout(resolve, 1000)})

        return res.data;
      },
      enabled,
      staleTime: Infinity,
    });

export const OracleQueries = {
  fetchByIdQuery,
  fetchContentQuery
};
