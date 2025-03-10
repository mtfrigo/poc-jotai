import { ConsolePageView } from '@/pages/console.page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: ConsolePage,
  loader: () => {
    console.log("Loader...")
  },
})

function ConsolePage() {
  return <ConsolePageView />
}