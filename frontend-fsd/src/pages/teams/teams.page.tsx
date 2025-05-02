import { TeamsQueries } from "@/entities/teams/api";
import { Button } from "@/shared/ui/primitives/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export const TeamsPage = () => {
  const { data: teams } = useQuery(TeamsQueries.fetchTeams());

  return (
    <div className="flex-1 flex justify-center items-center overflow-hidden">
      <div className="flex flex-1 w-full h-full mt-24 mx-8 border rounded-md overflow-hidden flex-col">
        <div className="text-2xl font-bold text-center w-full p-4">Times</div>

        <div>
          {teams?.map((team) => (
            <div className="flex flex-row items-center justify-between p-4 border-b" key={team.id}>
              <div>

              <div className="text-lg font-bold">{team.name}</div>
              <div className="text-sm text-gray-500">Membros: {team.members.length}</div>
              </div>
              <Link to={`/teams/$teamId`} params={{teamId: team.id}}>
              <Button variant="ghost">
                <ChevronRight />
              </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
