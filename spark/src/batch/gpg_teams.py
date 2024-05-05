from src.db.teams import update_or_insert_teams
from src.db.output import save_output
from src.data.load import load_data
from src.spark.context import create_context
from src.data.columns import events_cols as cols


def gpg_teams():
    sc = create_context("Top Goals Per Game Teams")
    
    data = load_data(sc, "events.csv")

    goals = data.filter(lambda x: x[cols["is_goal"]] == "1")

    team_game_goals = goals.map(lambda x: ((x[cols["event_team"]], x[cols["id_odsp"]]), 1))  # Mapping team names and game ID to a count of 1
    goal_counts_by_game = team_game_goals.reduceByKey(lambda a, b: a + b)
    team_goals = goal_counts_by_game.map(lambda x: (x[0][0], (x[1],1)))  # Regroup to just team names

    # Calculate total goals and total games for each team
    total_goals_per_team = team_goals.reduceByKey(lambda a, b: (a[0] + b[0], a[1] + b[1]))

    average_goals_per_game = total_goals_per_team.map(lambda x: (x[0], x[1][0] / x[1][1]))
    
    goal_counts_list = average_goals_per_game.collect()
    
    goal_counts_dicts = [{ "name": x[0], "goals_per_game": x[1] } for x in goal_counts_list]
    
    update_or_insert_teams(goal_counts_dicts)

    # Retrieve the top teams by best average goals per game
    top_teams = average_goals_per_game.takeOrdered(10, key=lambda x: -x[1])

    save_output(top_teams, lambda x: f"{x[0]}: {x[1]} goals per game", "output_gpg.txt", "Top 10 Goals Per Game Teams")
    
    sc.stop()
