import { TeamPage } from '@/pages/team/team.page'
import { TeamErrorPage } from '@/pages/team/team.error-page'
import { createFileRoute } from '@tanstack/react-router'
import { TeamLoadingPage } from '@/pages/team/team.loading-page'

export const Route = createFileRoute('/teams/$teamId')({
  component: TeamPage,
  pendingComponent: TeamLoadingPage,
  errorComponent: TeamErrorPage,
  loader: () => {
    console.log("Loader...")
  },
})
