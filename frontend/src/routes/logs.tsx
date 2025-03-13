import { LogsPageView } from '@/pages/logs.page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/logs')({
  component: LogsPage,
})

function LogsPage() {
  return <LogsPageView />
}