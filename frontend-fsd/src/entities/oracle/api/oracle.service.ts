import { fetchExecution } from "./services/fetch-execution";
import { fetchContent } from "./services/fetch-content";
import { execute } from "./services/execute";

export const OracleService = {
  execute,
  fetchExecution,
  fetchContent,
};
