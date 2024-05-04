import logging
import os
from typing import Dict
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
config: Dict[str, str] = {
    'KAFKA_BOOTSTRAP_SERVERS': os.environ.get('KAFKA_BOOTSTRAP_SERVERS', 'localhost:9092'),
    'KAFKA_TOPIC': os.environ.get('KAFKA_TOPIC'),
    'API_URL': os.environ.get('API_URL'),
    'API_KEY': os.environ.get('API_KEY'),
    'POLLING_INTERVAL': os.environ.get('POLLING_INTERVAL'),
}

# Load environment variables
try:
    load_env_vars(config)
except ValueError as e:
    logger.error(str(e))
    raise
