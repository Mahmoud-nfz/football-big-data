#!/bin/bash

data_folder_path="data"

# If folder does not exist, create it
if [ ! -d "$data_folder_path" ]; then
    mkdir "$data_folder_path"
fi
# Check if Python is installed
if ! command -v python3 &> /dev/null
then
    echo "Python could not be found, please install Python or add it to your PATH."
    exit 1
fi

# Check and install Pipenv if not already installed

if ! command -v pipenv &> /dev/null
then
    echo "Pipenv was not found, currently installing pipenv..."
    pip install --user pipenv
    exit 1
fi

# Install dependencies using pipenv
echo "Installing dependencies using Pipenv..."
pipenv install

# Setup Kaggle API Key
echo "Checking for Kaggle API key..."
if [ ! -f "$HOME/.kaggle/kaggle.json" ]; then
    echo "Error: kaggle.json not found in $HOME/.kaggle/kaggle.json"
    echo "Please ensure kaggle.json is in $HOME/.kaggle/kaggle.json and try again."
    echo "For more information on how to get a Kaggle API key, visit https://www.kaggle.com/docs/api"
    echo "You can generate one in https://www.kaggle.com/settings"
    exit 1
fi

# Ensure kaggle.json permissions are correct
chmod 600 "$HOME/.kaggle/kaggle.json"

# Activate the virtual environment and download the dataset
echo "Downloading dataset using Pipenv into $data_folder_path..."
$PIPENV_PATH run kaggle datasets download -d secareanualin/football-events -p "$data_folder_path/football-events" --unzip

echo "Dataset downloaded and extracted to $data_folder_path."
