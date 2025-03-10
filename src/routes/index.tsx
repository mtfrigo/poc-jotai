import { ConsolePageView } from '@/pages/console.page'
import { QueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'


// TODO
export const queryClient = new QueryClient();

export const Route = createFileRoute('/')({
  component: ConsolePage,
  loader: () => {
    console.log("Loader...")
  },
})

function ConsolePage() {
  return <ConsolePageView />
}