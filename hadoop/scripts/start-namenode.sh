#!/bin/bash

# If you are on windows and this script does not work, it might be due to windows vs unix line endings
# Run the following command in git bash to convert this script to unix endings
# sed -i -e 's/\r$//' start-namenode.sh

hdfs namenode &

# copy required data directories
while ! hdfs dfs -mkdir -p /data/football-events; do
    echo "Failed creating /data/football-events hdfs dir"
done
echo "Created /data/football-events hdfs dir"
hdfs dfs -put /opt/hadoop/data/* /data/football-events

# create a tmp file empty for scores and move it to hdfs
touch scores.csv
echo "id, date, homeTeam, awayTeam, homeTeamScore, awayTeamScore" >> scores.csv
echo "" >> scores.csv
hdfs dfs -moveFromLocal scores.csv /data/football-events/scores.csv

echo "Created /data/football-events hdfs dir"

wait
