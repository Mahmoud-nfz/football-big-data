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

    echo "Checking for .env file in ./scraper..."
    if [ ! -f "./scraper/.env" ]; then
        echo "Error: ./scraper/.env not found."
        echo "Please create it by copying ./scraper/.env.example to ./scraper/.env"
        exit 1
    fi

    echo "Checking for football-data.org API key in ./scraper/.env..."
    if [ -z "$(source ./scraper/.env && echo $API_KEY)" ]; then
        echo "Error: API_KEY not found or is empty in ./scraper/.env."
        echo "Please add your football-data.org API key to the API_KEY variable in ./scraper/.env"
        echo "You can generate one by registering in https://www.football-data.org/client/register"
        exit 1
    fi

    echo "Starting spark docker container mounted to $(pwd)"
    docker compose --profile datasets up --build

else
    
    echo "Download data option selected. Running data download script."
    docker compose up --build
fi