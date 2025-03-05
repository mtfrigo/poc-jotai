import { useConsoleModel } from "./console.model";
import { ConsolePageView } from "./console.view";

export const ConsolePage = () => {
  const model = useConsoleModel();

  return <ConsolePageView {...model} />;
};
