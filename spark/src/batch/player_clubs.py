from src.db.players import update_or_insert_players
from src.db.output import save_output
from src.data.load import load_data
from src.spark.context import get_context
from src.data.columns import events_cols as cols


def player_clubs():
    
    sc = get_context("player clubs")

    events = load_data(sc, "events.csv")

    players_teams = events.map(lambda x: (x[cols["player"]], (x[cols["event_team"]], x[cols["id_event"]])))

    # Reduce by key to find the last team for each player
    last_teams = players_teams.reduceByKey(lambda a, b: b if b[1] > a[1] else a)

    # Map to expected format
    last_teams_dicts = last_teams.map(lambda x: {"name": x[0], "club": x[1][0]}).collect()

    # Update database with the player's last team information
    update_or_insert_players(last_teams_dicts)
    

    sc.stop()
