import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { imagesRouter } from "./routers/images";
import { streamingRouter } from "./routers/streaming";
import { playerInfosRouter } from "./routers/playerInfos";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  images: imagesRouter,
  streaming: streamingRouter,
  playerInfos: playerInfosRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
