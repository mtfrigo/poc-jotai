import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: ConsolePage,
  loader: () => {
    console.log("Loader...")
  },
})

function ConsolePage() {
  return <div>HOME</div>
}