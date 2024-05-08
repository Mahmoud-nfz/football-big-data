from src.db.players import update_or_insert_players
from src.db.output import save_output
from src.data.load import load_data
from src.spark.SparkContextManager import SparkContextManager
from src.data.columns import events_cols as cols

def goal_scoring_players():
    
    sc = SparkContextManager("goal scoring players").get_context()
    
    data = load_data(sc, "events.csv")

    # Process the data
    goals = data.filter(lambda x: x[cols["is_goal"]] == "1")
    player_goals = goals.map(lambda x: (x[cols["player"]], 1)) # Mapping player names to a count of 1
    goal_counts = player_goals.reduceByKey(lambda a, b: a + b)
    
    goal_counts_list = goal_counts.collect()
    
    goal_counts_dicts = [{ "name": x[0], "goals": x[1] } for x in goal_counts_list]
    
    update_or_insert_players(goal_counts_dicts)

    # Retrieve the top 10 goal scorers
    top_scorers = goal_counts.takeOrdered(10, key=lambda x: -x[1])
    
    
    save_output(top_scorers, lambda x: f"{x[0]}: {x[1]} goals", "Top 10 Goal Scorers")

    # sc.stop()
