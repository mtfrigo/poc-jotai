import { Connection } from "@/domain/models/connection";
import { cn } from "@/lib/utils";

const Console = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col flex-1 overflow-hidden">{children}</div>;
};

const ConsoleToolbar = ({ children }: { children: React.ReactNode }) => {
  return <div className="px-1 flex gap-1 h-8">{children}</div>;
};

const ConsoleFlavor = ({
  flavor,
  name,
}: {
  flavor: Connection["flavor"];
  name: Connection["name"];
}) => {
  return (
    <div
      className={cn("uppercase text-xs w-full text-center py-1 font-bold", {
        "text-green-500": flavor === "MONGO",
        "text-red-500": flavor === "ORACLE",
        "text-blue-500": flavor === "POSTGRES",
        "text-gray-500": flavor === "MYSQL",
      })}
    >
      {flavor} <span className="italic text-slate-500">({name})</span>
    </div>
  );
};

const ConsolePanel = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex-1 flex flex-col overflow-hidden border-b">{children}</div>;
};

const ConsoleBody = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex-1 p-1 flex">{children}</div>;
};

const ConsoleResult = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-1 overflow-auto flex-col p-1 flex">{children}</div>
  );
};

const ConsoleFooter = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex gap-1 p-1 text-sm border-t">{children}</div>;
};

Console.Toolbar = ConsoleToolbar;
Console.Body = ConsoleBody;
Console.Panel = ConsolePanel;
Console.Footer = ConsoleFooter;
Console.Result = ConsoleResult;
Console.Flavor = ConsoleFlavor;

export { Console };
