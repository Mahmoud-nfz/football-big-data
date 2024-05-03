#!/bin/bash

# Check for the download-data argument
if [[ "$1" == "download-data" ]]; then

    echo "Checking for Kaggle API key..."
    if [ ! -f "$HOME/.kaggle/kaggle.json" ]; then
        echo "Error: kaggle.json not found in $HOME/.kaggle/kaggle.json"
        echo "Please ensure kaggle.json is in $HOME/.kaggle/kaggle.json and try again."
        echo "For more information on how to get a Kaggle API key, visit https://www.kaggle.com/docs/api"
        echo "You can generate one in https://www.kaggle.com/settings"
        exit 1
    fi


    echo "Starting spark docker container mounted to $(pwd)"
    docker-compose --profile main --profile datasets up --build

else
    
    echo "Download data option selected. Running data download script."
    docker-compose --profile main up --build
fi