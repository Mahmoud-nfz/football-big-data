import Image from "next/image";
import { PlayerInfoCard } from "~/components/players/PlayerInfoCard";
import { PlayerStatsCard } from "~/components/players/PlayerStatsCard";
import r from "rethinkdb";
import { getConnection } from "~/server/db/db";
import { tables } from "~/server/db/tables";
import type { Player } from "~/types/player";
import { serverSideApi } from "~/trpc/server";
import type { Match } from "~/types/match";

export const dynamic = "force-dynamic";

export default async function PlayerScreen({
  params,
}: {
  params: { id: string };
}) {
  const decodedName = decodeURIComponent(params.id);

  const connection = await getConnection();

  const playerStatsPromise = new Promise<Player>((resolve, reject) => {
    r.table(tables.players)
      .get(decodedName)
      .run(connection, (err, result) => {
        if (err) reject(err);
        if (!result) {
          reject(new Error("Player not found"));
        } else {
          console.log(result);
          resolve(result as Player);
        }
      });
  });

  const imagePromise = serverSideApi.images.search({ playerName: decodedName });
  const playerInfosPromise = serverSideApi.playerInfos.getPlayerInfos({
    playerName: decodedName,
  });

  const [playerStats, image, playerInfos] = await Promise.all([
    playerStatsPromise,
    imagePromise,
    playerInfosPromise,
  ]);

  const player = { ...playerInfos, ...playerStats };

  const latestMatches = await new Promise<Match[]>((resolve, reject) => {
    r.table(tables.matches)
      .filter(function (row) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return row("ht").match(player.club);
      })
      .limit(4)
      .run(connection, (err, cursor) => {
        if (err) reject(err);
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        cursor.toArray().then(async function (results) {
          console.log("h", results);

          for (const match of results) {
            match.homeTeam.crest = await serverSideApi.playerInfos.getClubLogo({
              clubName: match.homeTeam.name,
            }).then(res => res.url);
            match.awayTeam.crest = await serverSideApi.playerInfos.getClubLogo({
              clubName: match.awayTeam.name,
            }).then(res => res.url);
          }

          resolve(results as Match[]);
        });
      });
  });

  const { url: clubLogo } = await serverSideApi.playerInfos.getClubLogo({
    clubName: player.club ?? "manchester",
  });

  player.clubIcon = clubLogo ?? "";

  return (
    <div
      className="relative min-h-screen bg-cover bg-fixed bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/images/football-stadium-1.jpg")' }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 h-full w-full bg-white bg-opacity-90">
        <div className="z-10 flex h-full items-center justify-between px-5">
          {/* Left Div */}
          <PlayerInfoCard
            player={player}
            className="h-full w-1/3 py-4 text-left"
          />

          {/* Center Image */}
          <div className="flex-shrink-0">
            <Image
              src={image?.url ?? "/images/player.png"}
              alt="Center Image"
              width={300}
              height={300}
            />
          </div>

          {/* Right Div */}
          <PlayerStatsCard
            player={player}
            playerImage={image?.url ?? "/images/player.png"}
            /* TODO: resolve latest matches for a player */
            latestMatches={[...latestMatches]}
            className="h-full w-1/3 py-4 text-left"
          />
        </div>
      </div>
    </div>
  );
}
