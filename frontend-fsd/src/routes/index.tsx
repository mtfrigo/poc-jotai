import { ConsolePage as Page } from '@/pages/console/ui/console.page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: ConsolePage,
  loader: () => {
    console.log("Loader...")
  },
})

function ConsolePage() {
  return <Page />
}