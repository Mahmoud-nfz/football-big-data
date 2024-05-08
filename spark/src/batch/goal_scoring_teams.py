from src.db.teams import update_or_insert_teams
from src.db.output import save_output
from src.data.load import load_data
from src.spark.context import get_context
from src.data.columns import events_cols as cols


def goal_scoring_teams():
    
    sc = get_context("goal scoring teams")
    
    data = load_data(sc, "events.csv")
    
    goals = data.filter(lambda x: x[cols["is_goal"]] == "1")
    team_goals = goals.map(lambda x: (x[cols["event_team"]], 1)) # Mapping team names to a count of 1
    goal_counts = team_goals.reduceByKey(lambda a, b: a + b)

    goal_counts_list = goal_counts.collect()
    
    goal_counts_dicts = [{ "name": x[0], "goals": x[1] } for x in goal_counts_list]
    
    update_or_insert_teams(goal_counts_dicts)
    
    # Retrieve the top 10 goal scorers
    top_scorers = goal_counts.takeOrdered(10, key=lambda x: -x[1])

    save_output(top_scorers, lambda x: f"{x[0]}: {x[1]} goals", "Top 10 Goal Scoring Teams")            

    sc.stop()
