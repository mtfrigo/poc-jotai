import { ConsoleLayout as Layout } from '@/pages/console/ui/console.layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/console')({
  component: Layout,
  loader: () => {
    console.log("Loader...")
  },
  notFoundComponent: () => {
    return (<div>Console not implemented</div>)
  },
  
})
