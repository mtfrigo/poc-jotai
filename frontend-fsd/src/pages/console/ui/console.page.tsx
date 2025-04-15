import { ConnectionSidebar } from "@/widgets/connection-sidebar";

export const ConsolePage = () => {
  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="flex w-[1000px]  h-[600px] border rounded-md overflow-hidden">
        <div className="flex items-center justify-start border-r w-[300px]">
          <ConnectionSidebar />
        </div>
        <div className="flex w-full ">panel</div>
      </div>
    </div>
  );
};
