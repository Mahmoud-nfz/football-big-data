import subprocess
import os

# List of datasets to download
datasets = [
    {"uri": "secareanualin/football-events", "target_path": "/data/football-events"},
    # Add more datasets as needed
]


# Download each dataset
for dataset in datasets:
    uri = dataset["uri"]
    target_path = dataset["target_path"]
    
    os.makedirs(target_path, exist_ok=True)  # Ensure the target directory exists

    # Execute the Kaggle download command
    cmd = [
        "kaggle",
        "datasets",
        "download",
        "-d",
        uri,
        "-p",
        target_path,
        "--unzip"
    ]
    subprocess.run(cmd, check=True)
