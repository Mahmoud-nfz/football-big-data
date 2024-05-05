FROM python:3.11-slim

# Install zip utility
RUN apt-get update && \
    apt-get install -y zip

# Install the rethinkdb library
RUN pip install rethinkdb -t /opt/spark/temp/

# Define the command to zip the src folder
CMD ["sh", "-c", "cd /opt/spark/work-dir/src && zip -r -FS ../src.zip . && cd /opt/spark/temp/ && zip -r -FS /opt/spark/work-dir/rethinkdb.zip ."]
