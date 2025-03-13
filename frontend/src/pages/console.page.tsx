import { Panel } from "@/modules/console/(panel)/panel.view-model";
import { Sidebar } from "@/modules/console/(sidebar)/sidebar.view-model";

export const ConsolePageView = () => {
  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="flex w-[1000px]  h-[600px] border rounded-md overflow-hidden">
        <div className="flex items-center justify-start border-r w-[300px]">
          <Sidebar />
        </div>
        <div className="flex w-full ">
          {Panel()}
        </div>
      </div>
    </div>
  );
};
