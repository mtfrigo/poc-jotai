import { StrictMode } from "react";
import "./index.css";
import ReactDOM from 'react-dom/client'
import { Toaster } from "@/shared/ui/primitives//sonner.tsx";
import { RouterProvider, createRouter } from '@tanstack/react-router'
import "jotai-devtools/styles.css";
import { routeTree } from '../routeTree.gen'
import { Provider } from "./providers";

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
      <Provider>
      <RouterProvider router={router} />
      <Toaster/>
      </Provider>
      {/* <DevTools /> */}
    </StrictMode>,
  )
}
