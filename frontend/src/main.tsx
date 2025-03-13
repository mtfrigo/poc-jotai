import { StrictMode } from "react";
import "./index.css";
import ReactDOM from 'react-dom/client'
import { Toaster } from "./components/ui/sonner.tsx";
import { RouterProvider, createRouter } from '@tanstack/react-router'
import "jotai-devtools/styles.css";
import { routeTree } from './routeTree.gen'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
      <Toaster/>
      {/* <DevTools /> */}
    </StrictMode>,
  )
}
