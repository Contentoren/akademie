import { ConvexQueryClient } from "@convex-dev/react-query"
import { ConvexAuthProvider } from "@convex-dev/auth/react"
import { QueryClient } from "@tanstack/react-query"
import { createRouter } from "@tanstack/react-router"
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query"
import { createElement } from "react"

import { routeTree } from "./routeTree.gen"

export function getRouter() {
  const convexUrl = import.meta.env.VITE_CONVEX_URL as string | undefined

  if (!convexUrl) {
    throw new Error("Missing VITE_CONVEX_URL")
  }

  const convexQueryClient = new ConvexQueryClient(convexUrl)
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryKeyHashFn: convexQueryClient.hashFn(),
        queryFn: convexQueryClient.queryFn(),
      },
    },
  })

  convexQueryClient.connect(queryClient)

  const router = createRouter({
    routeTree,
    defaultPreload: "intent",
    context: { queryClient },
    scrollRestoration: true,
    Wrap: ({ children }) => createElement(ConvexAuthProvider, { client: convexQueryClient.convexClient, children }),
  })

  setupRouterSsrQueryIntegration({ router, queryClient })

  return router
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
