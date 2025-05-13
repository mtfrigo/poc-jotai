import { fetchExecution } from "./services/fetch-execution";
import { fetchContent } from "./services/fetch-content";
import { execute } from "./services/execute";
import { fetchPanel } from "./services/fetch-panel";
import { updatePanel } from "./services/update-panel";
import { addPanel } from "./services/add-panel";

export const OracleService = {
  execute,
  addPanel,
  fetchPanel,
  updatePanel,
  fetchExecution,
  fetchContent,
};
