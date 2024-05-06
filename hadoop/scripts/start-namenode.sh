#!/bin/bash

hdfs namenode &

# copy required data directories
while ! hdfs dfs -mkdir -p /data/football-events; do
    echo "Failed creating /data/football-events hdfs dir"
done
echo "Created /data/football-events hdfs dir"
hdfs dfs -put /opt/hadoop/data/* /data/football-events
echo "Created /data/football-events hdfs dir"

wait
