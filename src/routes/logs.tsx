import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/logs')({
  component: LogsPage,
})

function LogsPage() {
  return <div>WIP</div>
}