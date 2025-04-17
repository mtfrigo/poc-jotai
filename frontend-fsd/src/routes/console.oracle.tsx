import { OracleConsolePage as Page } from '@/pages/console-oracle/ui/oracle.page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/console/oracle')({
  component: Page,
  loader: () => {
    console.log("Loader...")
  },
})
