import * as r from "rethinkdb";
import { env } from "~/env";

const indexes: Record<string, string[]> = {
  players: ["goals"],
  teams: ["goals"],
};

let connection: r.Connection | null = null;

/**
 * Establishes a connection to RethinkDB, reusing the existing connection if it's still open.
 * @returns {Promise<r.Connection>} A promise that resolves with the RethinkDB connection.
 */
export async function getConnection(): Promise<r.Connection> {
  if (connection) {
    console.log("Reusing existing connection");
    return connection;
  }

  try {
    connection = await r.connect({
      host: env.DB_HOST,
      port: env.DB_PORT,
      db: env.DB_NAME,
    });
    console.log("Connected to RethinkDB successfully!");
    // Optional: set up a listener for connection close
    connection.on("close", () => {
      console.log("Connection closed!");
      connection = null; // Ensure re-connection in case of accidental close
    });

    // create indexes
    for (const table in indexes) {
      if (indexes.hasOwnProperty(table)) {
        r.table(table)
          .indexList()
          .run(connection, (err, existingIndexes) => {
            if (err) {
              console.error("Error fetching index list:", err);
              return;
            }

            indexes[table]?.forEach((indexName) => {
              if (!existingIndexes.includes(indexName) && connection) {
                r.table(table)
                  .indexCreate(indexName)
                  .run(connection, (error) => {
                    if (error) {
                      console.error(
                        `Error creating index ${indexName} on table ${table}:`,
                        error,
                      );
                    } else {
                      console.log(
                        `Index ${indexName} created successfully on table ${table}`,
                      );
                    }
                  });
              }
            });
          });
      }
    }

    return connection;
  } catch (err) {
    console.error("Failed to connect to RethinkDB:", err);
    throw err;
  }
}
