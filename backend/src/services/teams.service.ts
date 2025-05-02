import { Team } from "../models/team.model";


const teams: Team[] = [
  {
    name: 'Team A',
    id: '1',
    members: [
      { name: 'Alice', id: '1' },
      { name: 'Bob', id: '2' },
    ],
  },
  {
    name: 'Team B',
    id: '2',
    members: [
      { name: 'Alice', id: '1' }
    ],
  },
  {
    name: 'Team C',
    id: '3',
    members: [
      { name: 'Bob', id: '2' },
    ],
  },
  {
    name: 'Team D',
    id: '4',
    members: [
      { name: 'Bob', id: '2' },
    ],
  }
]

export async function fetchTeamById(id: string) {
  const team = teams.find(t => t.id === id);

  if(!team) return  null;

  return team;
}

export async function fetchTeams() {
  return teams;
}


export async function fetchTeamActivities(id: string) {
  const team = teams.find(t => t.id === id);

  if(!team) return  null;

  if(id === "3") return null;

  return [
    "Atividade 1",
    "Atividade 2",
    "Atividade 3"
  ];
}

export async function fetchTeamMembers(id: string) {
  const team = teams.find(t => t.id === id);

  if(!team) return  null;

  if(id === "4") return null;

  return team.members;
}
