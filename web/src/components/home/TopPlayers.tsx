import Table from "../general/Table";
import * as r from "rethinkdb";
import { tables } from "~/server/db/tables";
import { getConnection } from "~/server/db/db";
import { Player } from "~/types/player";

interface TopPlayersProps {}

export const TopPlayers = async (props: TopPlayersProps) => {
  const connection = await getConnection();

  const players: Player[] = await new Promise((resolve, reject) => {
    r.table(tables.players)
      .orderBy({ index: r.desc("goals") })
      .limit(4)
      .run(connection, function (err, cursor) {
        if (err) throw err;
        cursor.toArray().then(function (results) {
          const mappedResults = results.map((result) => {
            return {
              ...result,
              matches: result.games_played,
              redCards: result["red cards"],
              yellowCards: result["yellow cards"],
              shotsOnTargetPercentage: result["shots_on_target_percentage"],
            };
          });
          resolve(mappedResults);
        });
      });
  });


  return (
    <div className="mt-5 flex flex-col justify-between">
      <h3 className="mb-3 text-xl font-bold">Top goalscoring players</h3>
      <Table
        columns={["Name", "Goals", "Played", "onTarget%"]}
        rows={players.map((player) => [
          player.name,
          player.goals,
          player.matches,
          player.shotsOnTargetPercentage,
        ])}
        hrefs={players.map((player) => `/players/${player.name}`)}
        ordered={true}
      />
    </div>
  );
};
