import { TeamsPage } from '@/pages/teams/teams.page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/teams/')({
  component: TeamsPage,
  loader: () => {
    console.log("Loader...")
  },
})
