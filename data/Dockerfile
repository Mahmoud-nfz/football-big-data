FROM python:3.11-slim

# Install Kaggle CLI
RUN pip install kaggle

# Create a directory for the app
WORKDIR /app

# Copy the script into the container
COPY main.py /app/

# This command runs when the container starts
CMD ["python", "main.py"]
