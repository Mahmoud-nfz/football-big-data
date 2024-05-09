import Table from "../general/Table";
import * as r from "rethinkdb";
import { tables } from "~/server/db/tables";
import { getConnection } from "~/server/db/db";
import { Team } from "~/types/team";

interface TopTeamsProps {}

export const TopTeams = async (props: TopTeamsProps) => {
  const connection = await getConnection();

  const teams: Team[] = await new Promise((resolve, reject) => {
    r.table(tables.teams)
        .orderBy({index: r.desc('goals')})
      .limit(4)
      .run(connection, function (err, cursor) {
        if (err) throw err;
        cursor.toArray().then(function (results) {
          const mappedResults = results.map((result) => {
            return {
              ...result,
              goalsPerGame: result["goals_per_game"],
              redCards: result["red cards"],
              yellowCards: result["yellow cards"],
            };
          });
          resolve(mappedResults);
        });
      });
  });

  return (
    <div className="mt-5 flex flex-col justify-between">
      <h3 className="mb-3 text-xl font-bold">Top goalscoring teams</h3>
      <Table
        columns={["Name", "Goals", "Goals Per Game", "Yellow Cards"]}
        rows={teams.map((team) => [
          team.name,
          team.goals,
          team.goalsPerGame,
          team.yellowCards,
        ])}
        ordered={true}
      />
    </div>
  );
};
