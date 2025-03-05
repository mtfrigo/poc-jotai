import { Panel } from "./(panel)/panel.view-model";
import { Sidebar } from "./(sidebar)/sidebar.view-model";

export const ConsolePageView = () => {
  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="flex w-[1000px]  h-[600px]">
        <div className="flex items-center justify-start border w-[300px]">
          <Sidebar />
        </div>
        <div className="flex w-full border">
          {Panel()}
        </div>
      </div>
    </div>
  );
};
