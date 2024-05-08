from src.db.players import update_or_insert_players
from src.db.output import save_output
from src.data.load import load_data
from src.spark.SparkContextManager import SparkContextManager
from src.data.columns import events_cols as cols


def shots_on_target_percentage_players():
    
    sc = SparkContextManager("shots on target players").get_context()
    
    events = load_data(sc, "events.csv")
    
    shots = events.filter(lambda x: x[cols["event_type"]] == "1")
    
    # mapping to (player, (total_shots_on_target, total_shots)
    shots = shots.map(lambda x: (x[cols["player"]], (x[cols["shot_outcome"]] == "1", 1)))
    shots = shots.reduceByKey(lambda a, b: (a[0] + b[0], a[1] + b[1]))
    
    shots_percentage = shots.map(lambda x: (x[0], (x[1][0] / x[1][1])*100))
    
    shots_percentage_list = shots_percentage.collect()
    
    shots_percentage_dicts = [{ "name": x[0], "shots_on_target_percentage": x[1] } for x in shots_percentage_list]
    
    update_or_insert_players(shots_percentage_dicts)

    top_players = shots_percentage.takeOrdered(10, key=lambda x: -x[1])

    save_output(top_players, lambda x: f"{x[0]}: {x[1]} Shots on target percentage", "Top 10 players by percentage of shots on target")
    
    # sc.stop()
