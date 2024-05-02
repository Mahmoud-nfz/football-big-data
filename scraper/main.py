import os
import requests
from confluent_kafka import Producer
import time
import logging
from typing import Optional, Dict
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def load_env_vars(env_vars: Dict[str, str]) -> None:
    missing_vars = [var_name for var_name, _ in env_vars.items() if var_name not in os.environ]
    if missing_vars:
        raise ValueError(f"Missing environment variables: {', '.join(missing_vars)}")

# Define required environment variables
required_env_vars: Dict[str, str] = {
    'KAFKA_BOOTSTRAP_SERVERS': os.environ.get('KAFKA_BOOTSTRAP_SERVERS', 'localhost:9092'),
    'KAFKA_TOPIC': os.environ.get('KAFKA_TOPIC'),
    'API_URL': os.environ.get('API_URL'),
    'API_KEY': os.environ.get('API_KEY'),
}

# Load environment variables
try:
    load_env_vars(required_env_vars)
except ValueError as e:
    logger.error(str(e))
    raise

# Kafka producer configuration
producer_conf: Dict[str, str] = {
    'bootstrap.servers': required_env_vars['KAFKA_BOOTSTRAP_SERVERS'],
    'client.id': 'api-data-producer',
}

# Headers for API requests
headers = {
    'X-Auth-Token': required_env_vars['API_KEY']
}

def fetch_data_from_api() -> Optional[Dict]:
    try:
        response = requests.get(required_env_vars['API_URL'], headers=headers)
        response.raise_for_status()  # Raise an exception for non-2xx status codes
        return response.json()
    except Exception as e:
        logger.error(f"Error fetching data from API: {e}")
        return None

def send_to_kafka(data: Dict) -> None:
    try:
        producer = Producer(producer_conf)
        producer.produce(required_env_vars['KAFKA_TOPIC'], value=data)
        producer.flush()
        logger.info("Data sent to broker successfully")
    except Exception as e:
        logger.error(f"Error sending data to broker: {e}")

def main() -> None:
    while True:
        data = fetch_data_from_api()
        if data:
            send_to_kafka(data)
        time.sleep(60)  # Polling interval of 60 seconds

if __name__ == "__main__":
    main()
