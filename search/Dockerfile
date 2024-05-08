# Use an official Python 3.11 runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the local code to the container
COPY . .

# Install Poetry
RUN pip install poetry

# Install project dependencies via Poetry, disabling virtualenv creation
RUN poetry config virtualenvs.create false \
    && poetry install --no-dev --no-interaction --no-ansi

# Command to run the app when the container launches
CMD ["poetry", "run", "python", "-B", "-m", "app"]
