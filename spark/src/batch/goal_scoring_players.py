from src.persistence.output import save_output
from src.data.load import load_data
from src.spark.context import create_context
from src.data.columns import events_cols as cols

def goal_scoring_players():
    sc = create_context("Top Goal Scoring Players")
    
    data = load_data(sc, "events.csv")

    # Process the data
    goals = data.filter(lambda x: x[cols["is_goal"]] == "1")
    player_goals = goals.map(lambda x: (x[cols["player"]], 1)) # Mapping player names to a count of 1
    goal_counts = player_goals.reduceByKey(lambda a, b: a + b)

    # Retrieve the top 10 goal scorers
    top_scorers = goal_counts.takeOrdered(10, key=lambda x: -x[1])
    
    
    save_output(top_scorers, lambda x: f"{x[0]}: {x[1]} goals", "output_gsp.txt", "Top 10 Goal Scorers")

    sc.stop()
