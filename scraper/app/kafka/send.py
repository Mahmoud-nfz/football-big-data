import json
from ..config.config import config, logger
from typing import Dict
from confluent_kafka import Producer


# Kafka producer configuration
producer_conf: Dict[str, str] = {
    'bootstrap.servers': config['KAFKA_BOOTSTRAP_SERVERS'],
    'client.id': 'api-data-producer',
}


def send_to_kafka(data: Dict) -> None:
    try:
        # Serialize the dictionary to JSON and encode it to bytes
        serialized_data = json.dumps(data).encode('utf-8')
        producer = Producer(producer_conf)
        producer.produce(config['KAFKA_TOPIC'], value=serialized_data)
        producer.flush()
        logger.info("Data sent to broker successfully")
    except Exception as e:
        logger.error(f"Error sending data to broker: {e}")
