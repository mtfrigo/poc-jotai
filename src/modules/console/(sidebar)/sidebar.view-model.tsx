import { useSidebarModel } from "./sidebar.model";
import { SidebarView } from "./sidebar.view";

export const Sidebar = () => {
  const model = useSidebarModel();

  return <SidebarView {...model} />;
};
