#!/bin/bash

echo "Running download_data.windows.sh"

data_folder_path="."

# If folder does not exist, create it
if [ ! -d "$data_folder_path" ]; then
    mkdir "$data_folder_path"
fi

# Define base Python path
PYTHON_BASE_PATH="$HOME/AppData/Roaming/Python"

# Find the latest Python 3 version directory
LATEST_PYTHON_DIR=$(ls -d $PYTHON_BASE_PATH/Python3* | sort -V | tail -n 1)

# Check if a Python directory was found
if [ -z "$LATEST_PYTHON_DIR" ]; then
    echo "No Python 3 installation found."
    exit 1
fi

# Define the Pipenv path based on the latest Python version
PIPENV_PATH="${LATEST_PYTHON_DIR}/Scripts/pipenv"

# Check if Python is installed
if ! command -v python &> /dev/null
then
    echo "Python could not be found, please install Python or add it to your PATH."
    exit 1
fi


# Check and install Pipenv if not already installed
if [ ! -f "$PIPENV_PATH" ] && [ ! command -v pipenv &> /dev/null ]; then
    echo "Pipenv is not installed. Installing Pipenv..."
    pip install --user pipenv

    # Check if Pipenv was installed correctly
    if [ ! -f "$PIPENV_PATH" ]; then
        echo "Failed to install Pipenv."
        exit 1
    fi
fi

if command -v pipenv &> /dev/null; then
    PIPENV_PATH=pipenv
fi

cd data 

# Install dependencies using pipenv
$PIPENV_PATH install

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
