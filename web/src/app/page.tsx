import Image from "next/image";
import { TopLists } from "~/components/home/TopLists";
import { LatestMatchesList } from "~/components/home/LatestMatchesList";
import messiImage from "public/images/player.png";
import { Match } from "~/types/match";
import { tables } from "~/server/db/tables";
import r from "rethinkdb";
import { getConnection } from "~/server/db/db";

export const dynamic = "force-dynamic";

export default async function HomeScreen() {
  const connection = await getConnection();
  const initialLatestMatches = await new Promise<Match[]>((resolve, reject) => {
    r.table(tables.matches)
      .limit(4)
      .run(connection, (err, cursor) => {
        if (err) reject(err);
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        cursor.toArray().then(async function (results) {
          resolve(results as Match[]);
        });
      });
  });

  return (
    <div
      className="relative min-h-screen bg-cover bg-fixed bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/images/football-stadium-1.jpg")' }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 h-full w-full bg-white bg-opacity-90">
        <div className="z-10 flex h-full items-center justify-between px-5">
          {/* Left Div */}
          <TopLists className="h-full w-1/3 py-4 text-left" />

          {/* Center Image */}
          <div className="flex-shrink-0">
            <Image
              src={messiImage}
              alt="Center Image"
              width={300}
              height={300}
            />
          </div>

          {/* Right Div */}
          <LatestMatchesList
            initialLatestMatches={[...initialLatestMatches]}
            className="h-full w-1/3 py-4 text-left"
          />
        </div>
      </div>
    </div>
  );
}
