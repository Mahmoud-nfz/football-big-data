FROM python:3.11-slim

ENV SRC_DIR=/opt/spark/work-dir/spark-apps
ENV BUILD_DIR=/opt/spark/work-dir/build
ENV PACKAGES_DIR=/opt/spark/temp

# Install zip utility
RUN apt-get update && \
    apt-get install -y zip

# Install the rethinkdb library
RUN pip install rethinkdb -t ${PACKAGES_DIR}/rethinkdb

# Install the kafka-python library
RUN pip install kafka-python -t ${PACKAGES_DIR}/kafka

# Define the command to zip the src folder
CMD ["sh", "-c", "cd $SRC_DIR && zip -r -FS $BUILD_DIR/src.zip . && for folder in $PACKAGES_DIR/*; do cd $folder && zip -r -FS $BUILD_DIR/$(basename $folder).zip .; done"]
