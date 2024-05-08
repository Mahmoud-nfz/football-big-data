import Image from "next/image";
import { PlayerInfoCard } from "~/components/players/PlayerInfoCard";
import { PlayerStatsCard } from "~/components/players/PlayerStatsCard";
import * as r from "rethinkdb";
import { player1 } from "~/data/players";
import { latestMatches } from "~/data/matches";
import { getConnection } from "~/server/db/db";
import { tables } from "~/server/db/tables";
import type { Player } from "~/types/player";
import { serverSideApi } from "~/trpc/server";

export const dynamic = 'force-dynamic';

export default async function PlayerScreen({
  params,
}: {
  params: { id: string };
}) {
  const decodedId = decodeURIComponent(params.id);
  const connection = await getConnection();

  const player: Player = await new Promise((resolve, reject) => {
    r.table(tables.players)
      .get(decodedId)
      .run(connection, function (err, result) {
        if (err) throw err;
        if (!result) {
          reject(new Error("Player not found"));
        } else {
          console.log(result);
          resolve(result as Player);
        }
      });
  });

  const image = await serverSideApi.images.search({ playerName: player.name });

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
            player={player1}
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
            latestMatches={latestMatches}
            className="h-full w-1/3 py-4 text-left"
          />
        </div>
      </div>
    </div>
  );
}
