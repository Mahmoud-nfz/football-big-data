from src.db.players import update_or_insert_players
from src.db.output import save_output
from src.data.load import load_data
from src.spark.SparkContextManager import SparkContextManager
from src.data.columns import events_cols as cols


def games_played_players():
    
    sc = SparkContextManager("games played players").get_context()
    
    events = load_data(sc, "events.csv")

    player_games = events.map(lambda x: ((x[cols["player"]], x[cols["id_odsp"]]), 1))  # Mapping team names and game ID to a count of 1
    player_games = player_games.reduceByKey(lambda a, b: 1)
    
    player_games = player_games.map(lambda x: (x[0][0], 1))
    
    player_games = player_games.reduceByKey(lambda a, b: a + b)

    player_games_list = player_games.collect()
    
    player_games_dicts = [{ "name": x[0], "games_played": x[1] } for x in player_games_list]
    
    update_or_insert_players(player_games_dicts)

    # Retrieve the top teams by best average goals per game
    top_players = player_games.takeOrdered(10, key=lambda x: -x[1])

    save_output(top_players, lambda x: f"{x[0]}: {x[1]} games played", "Top 10 players by number of games played")
    
    # sc.stop()
