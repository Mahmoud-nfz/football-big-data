"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createWSClient,
  loggerLink,
  unstable_httpBatchStreamLink,
  wsLink,
} from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { useState } from "react";
import SuperJSON from "superjson";
import { env } from "~/env";

import { type AppRouter } from "~/server/api/root";

const createQueryClient = () => new QueryClient();

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return createQueryClient();
  }
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= createQueryClient());
};

export const clientSideApi = createTRPCReact<AppRouter>();

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  const [trpcClient] = useState(() =>
    clientSideApi.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        (function () {
          if (typeof window === "undefined") {
            return unstable_httpBatchStreamLink<AppRouter>({
              transformer: SuperJSON,
              url: getBaseHttpUrl() + "/api/trpc",
              headers: () => {
                const headers = new Headers();
                headers.set("x-trpc-source", "nextjs-react");
                return headers;
              },
            });
          } else {
            const client = createWSClient({
              url: getBaseWsUrl(),
            });
            return wsLink<AppRouter>({
              client,
              /**
               * @link https://trpc.io/docs/v11/data-transformers
               */
              transformer: SuperJSON,
            });
          }
        })(),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <clientSideApi.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </clientSideApi.Provider>
    </QueryClientProvider>
  );
}

function getBaseHttpUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return env.NEXT_PUBLIC_NEXT_URL;
}

function getBaseWsUrl() {
  if (process.env.VERCEL_URL) return `ws://${process.env.VERCEL_URL}`;
  return env.NEXT_PUBLIC_WS_URL;
}
