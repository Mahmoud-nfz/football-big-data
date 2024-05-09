import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { observable } from "@trpc/server/observable";
import r from "rethinkdb";
import { tables } from "~/server/db/tables";
import { getConnection } from "~/server/db/db";
import type { Match } from "~/types/match";

export const streamingRouter = createTRPCRouter({
  latestMatches: publicProcedure.subscription(async () => {
    const connection = await getConnection();

    return observable<Match>((emit) => {
      r.table(tables.matches)
        .changes()
        .run(connection, (err, cursor) => {
          if (err) throw err;
          cursor.each((err, row) => {
            if (err) throw err;
            emit.next(row.new_val as Match);
          });
        });
    });
  }),
});

export type StreamingRouter = typeof streamingRouter;
