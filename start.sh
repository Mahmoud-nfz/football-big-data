# !/bin/bash

echo Starting spark docker container mounted to $(pwd)
docker run -it -v $(pwd):/opt/spark/work-dir apache/spark-py bash
