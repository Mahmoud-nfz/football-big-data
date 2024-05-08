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
        .orderBy({index: r.desc('goals')})
      .limit(4)
      .run(connection, function (err, cursor) {
        if (err) throw err;
        cursor.toArray().then(function (results) {
          resolve(results);
        });
      });
  });

  return (
    <div className="mt-5 flex flex-col justify-between">
      <h3 className="mb-3 text-xl font-bold">Top goalscoring players</h3>
      <Table
        columns={["Name", "Goals", "Played", "Won"]}
        rows={players.map((player) => [
          player.name,
          player.goals,
          player.matches,
          player.matchesWon,
        ])}
        ordered={true}
      />
    </div>
  );
};
