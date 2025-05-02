import { TeamsQueries } from "@/entities/teams/api";
import { Route } from "@/routes/teams/$teamId";
import { compose, withSuspense } from "@/shared/libs/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary, withErrorBoundary } from "react-error-boundary";

export const TeamPage = () => {
  const { teamId } = Route.useParams();
  const { data: team } = useSuspenseQuery(
    TeamsQueries.fetchTeam({ id: teamId })
  );


  return (
    <div className="flex-1 flex justify-center items-center overflow-hidden border rounded-md">
      <div className="flex-1 grid grid-cols-2 gap-1 c w-full h-full mt-24 mx-8  overflow-hidden ">
        <div className="col-span-2 p-4 rounded border ">
          <div className="text-xl font-bold  w-full ">Informações do time</div>
          <div className=" grid grid-cols-2 pt-4">
            <div>
              <div className="font-bold">id</div>
              <div>{team.id}</div>
            </div>
            <div>
              <div className="font-bold">Nome</div>
              <div>{team.name}</div>
            </div>
            <div>
              <div className="font-bold"># Membros</div>
              <div>{team.members.length}</div>
            </div>
          </div>
        </div>
          
        <div className="col-span-1 p-4 rounded border">
          <TeamActivities id={teamId} />
        </div>
        <div className="col-span-1 p-4 rounded border">
          <ErrorBoundary
            fallback={
              <div className="flex flex-1 items-center justify-center">
                Erro ao carregar membros do time.
              </div>
            }
          >
            <Suspense fallback={<div>Carregando membros</div>}>
              <TeamMembers id={teamId} />
            </Suspense>
          </ErrorBoundary>
        </div>
        </div>
        </div>
  );
};

const TeamMembers = ({ id }: { id: string }) => {
  const { data: members } = useSuspenseQuery(
    TeamsQueries.fetchTeamMembers({ id })
  );
  return (
    <div className="flex flex-1  flex-col">
      <div className="text-xl font-bold  w-full ">Membros</div>
      <div className="flex flex-col  ">
        {members.map((item, i) => (
          <div
            key={item.id}
            className={`border-b p-1 ${i % 2 ? "bg-secondary" : "bg-white"}`}
          >
            <div>{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};


const enhance = compose<{id: string}>(
  (component) =>
    withErrorBoundary(component, {
      FallbackComponent: () => <div className="flex flex-1 items-center justify-center">Erro ao carregar atividades</div>,
    }),
  (component) => withSuspense(component, { FallbackComponent: ()  => <div>Carregando...</div> }) 
);


const TeamActivities = enhance(({ id }: { id: string }) => {
  const { data: activities } = useSuspenseQuery(
    TeamsQueries.fetchTeamActivities({ id })
  );
  return (
    <div className="flex flex-1 flex-col">
      <div className="text-xl font-bold  w-full ">Atividades</div>
      <div className="flex flex-col  ">
        {activities.map((item, i) => (
          <div
            key={item}
            className={`border-b p-1 ${i % 2 ? "bg-secondary" : "bg-white"}`}
          >
            <div>{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
});

