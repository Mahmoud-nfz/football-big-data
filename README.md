# Football Big Data

This is a project for processing large amounts of football data and finding unseen player traits as well as forecasting match results.

Using Apache Spark to store the data and kafka to handle streamin gof new data.

### How do I run this ?

- Run `bash start.sh` (note that if you are on windows you can run it on a git bash terminal)

If running for the first time run `bash start.sh download-data` in order to download the datasets we're going to be using.


- Run `docker compose run spark bash` to launch a shell inside the container.


#### All of the following commands will be run inside the container

- Run `../bin/spark-submit mount/main.py` and it will load the `ginf.csv` file into spark and then run an sql query on it.