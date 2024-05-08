import { z } from "zod";
import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Player } from "~/types/player";

export const playerInfosRouter = createTRPCRouter({
  getPlayerInfos: publicProcedure
    .input(z.object({ playerName: z.string().min(1) }))
    .query(async ({ input }) => {
      const url = `${env.SEARCH_ENGINE_URL}?query=${encodeURIComponent(input.playerName)}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch data: ${response.status} ${response.statusText}`,
        );
      }

      const playerInfos = await response.json();

      const player: Player = {
        ...playerInfos,
        countryFlag: playerInfos.country_flag,
        height: playerInfos.height_cm,
        preferredFoot: playerInfos.preferred_foot,
        value: `${playerInfos.value_euro / 1000000} M€`,
      };


      return player;
    }),
});
