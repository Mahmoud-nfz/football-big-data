import { z } from "zod";
import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { Player } from "~/types/player";
import OpenAI from "openai";

export const playerInfosRouter = createTRPCRouter({
  getPlayerInfos: publicProcedure
    .input(z.object({ playerName: z.string().min(1) }))
    .query(async ({ input }) => {
      const url = `${env.SEARCH_ENGINE_URL}?resource=players&query=${encodeURIComponent(input.playerName)}`;

      let description = "";
      try {
        const openai = new OpenAI({
          apiKey: env?.OPENAI_API_KEY,
        });

        console.log(
          "Found openai token starting player description generation",
        );

        const completion = await openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content: `Provide a short paragraph talking about footballer ${input.playerName}'s achievements and career`,
            },
          ],
          model: "gpt-3.5-turbo",
        });

        if (completion?.choices) {
          description = completion?.choices[0]?.message.content ?? "";
        }
      } catch (error) {
        console.error(error);
      }

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
        description,
      };

      return player;
    }),

  getClubLogo: publicProcedure
    .input(z.object({ clubName: z.string().min(1) }))
    .query(async ({ input }) => {
      const url = `${env.SEARCH_ENGINE_URL}?resource=clubs&query=${encodeURIComponent(input.clubName)}`;
      console.log(url);

      const response = await fetch(url);

      if (!response.ok) {
        console.error(
          `Failed to fetch data: ${response.status} ${response.statusText}`,
        );
        return { url: null };
      }

      const clubInfos = (await response.json()) as { club_logo_url: string };

      return {
        url: clubInfos.club_logo_url,
      };
    }),
});
