from pyspark import SparkConf, SparkContext

# Setting up the Spark configuration and context
conf = SparkConf().setMaster("local").setAppName("Top Teams by Goals Per Game")
sc = SparkContext(conf=conf)

# Load the CSV data and filter out the header
events = sc.textFile("/opt/spark/work-dir/mount/data/football-events/events.csv")
header = events.first()  # capture the header line
events = events.filter(lambda row: row != header)  # filter out the header

# Process the data
events = events.map(lambda line: line.split(","))
goals = events.filter(lambda x: x[16] == "1")  # Filtering only the rows where is_goal is 1

# Assuming x[8] is the Game ID
team_game_goals = goals.map(lambda x: ((x[9], x[0]), 1))  # Mapping team names and game ID to a count of 1
goal_counts_by_game = team_game_goals.reduceByKey(lambda a, b: a + b)
team_goals = goal_counts_by_game.map(lambda x: (x[0][0], (x[1],1)))  # Regroup to just team names

# Calculate average goals per game for each team
total_goals_per_team = team_goals.reduceByKey(lambda a, b: (a[0] + b[0], a[1] + b[1]))

average_goals_per_game = total_goals_per_team.map(lambda x: (x[0], x[1][0] / x[1][1]))

# Retrieve the top teams by best average goals per game
top_teams = average_goals_per_game.takeOrdered(10, key=lambda x: -x[1])

# Output the top teams to console
for team in top_teams:
    # print(f"{team[0]}: {team[1]:.2f} average goals per game")
    print(f"{team[0]}: {team[1]} average goals per game")

# Write the output to a file
with open("/opt/spark/work-dir/mount/data/output.txt", "w") as file:
    file.write("Top Teams by Average Goals Per Game:\n")
    for team in top_teams:
        # file.write(f"{team[0]}: {team[1]:.2f} average goals per game\n")
        file.write(f"{team[0]}: {team[1]} average goals per game\n")

# Stop the Spark context
sc.stop()
