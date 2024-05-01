#!/bin/bash

# Check for the -download-data argument
if [[ "$1" == "download-data" ]]; then
    echo "Download data option selected. Running data download script."
    # Assuming the download script is named download_data.sh and located in the current directory
    case "$OSTYPE" in
        linux*)   ./scripts/download_data.linux.sh ;;
        msys*|cygwin*)    ./scripts/download_data.windows.sh ;;
        *)        echo "Unsupported OS: $OSTYPE" ;;
    esac
fi

echo "Starting spark docker container mounted to $(pwd)"
docker run -d -it -v "/$(pwd):/opt/spark/work-dir/mount" apache/spark-py bash
