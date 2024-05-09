import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { observable } from "@trpc/server/observable";

export const streamingRouter = createTRPCRouter({
  latestMatches: publicProcedure.subscription(() => {
    return observable<number>((emit) => {
      const int = setInterval(() => {
        emit.next(Math.random());
      }, 500);
      return () => {
        clearInterval(int);
      };
    });
  }),
});

export type StreamingRouter = typeof streamingRouter;
