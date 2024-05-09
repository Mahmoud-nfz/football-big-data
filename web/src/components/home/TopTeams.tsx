import Table from "../general/Table";
import r from "rethinkdb";
import { tables } from "~/server/db/tables";
import { getConnection } from "~/server/db/db";
import { Team } from "~/types/team";

interface TopTeamsProps {}

export const TopTeams = async (props: TopTeamsProps) => {
  const connection = await getConnection();

  const teams: Team[] = await new Promise((resolve, reject) => {
    r.table(tables.teams)
      .orderBy({ index: r.desc("goals") })
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
      <h3 className="mb-3 text-xl font-bold">Top goalscoring teams</h3>
      <Table
        columns={["Name", "Goals", "Played", "Won"]}
        rows={teams.map((team) => [
          team.name,
          team.goals,
          team.goalsPerGame,
          team.goalsAgainst,
        ])}
        ordered={true}
      />
    </div>
  );
};
