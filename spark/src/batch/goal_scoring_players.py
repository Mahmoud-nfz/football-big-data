from pyspark import SparkConf, SparkContext

def goal_scoring_players():

    # Setting up the Spark configuration and context
    conf = SparkConf().setMaster("local").setAppName("Top Goal Scorers")
    sc = SparkContext(conf=conf)

    # Load the CSV data and filter out the header
    data = sc.textFile("/opt/spark/work-dir/data/football-events/events.csv")
    header = data.first()  # capture the header line
    data = data.filter(lambda row: row != header)  # filter out the header

    # Process the data
    data = data.map(lambda line: line.split(","))
    goals = data.filter(lambda x: x[16] == "1")  # Filtering only the rows where is_goal is 1
    player_goals = goals.map(lambda x: (x[11], 1)) # Mapping player names to a count of 1
    goal_counts = player_goals.reduceByKey(lambda a, b: a + b)

    # Retrieve the top 10 goal scorers
    top_scorers = goal_counts.takeOrdered(10, key=lambda x: -x[1])

    # Output the top 10 goal scorers to console
    for scorer in top_scorers:
        print(f"{scorer[0]}: {scorer[1]} goals")

    # Write the output to a file
    with open("/opt/spark/work-dir/data/output_gsp.txt", "w") as file:
        file.write("Top 10 Goal Scorers:\n")
        
        for scorer in top_scorers:
            file.write(f"{scorer[0]}: {scorer[1]} goals\n")

    # Stop the Spark context
    sc.stop()
