from src.db.matches import update_or_insert_matches
from src.config.config import config
from typing import Dict
from kafka import KafkaConsumer
import json

# Kafka consumer configuration
consumer_conf: Dict[str, str] = {
    'bootstrap_servers': config['KAFKA_BOOTSTRAP_SERVERS'],
    'client_id': 'api-data-consumer',
}


def consume_from_kafka() -> None:
    consumer = KafkaConsumer(config['KAFKA_TOPIC'],
                                client_id=consumer_conf['client_id'],
                                bootstrap_servers=[consumer_conf['bootstrap_servers']]
                            )

    for message in consumer:
        # message value and key are raw bytes -- decode if necessary!
        # e.g., for unicode: `message.value.decode('utf-8')`
        print ("%s:%d:%d: key=%s value=%s" % (message.topic, message.partition,
                                            message.offset, message.key,
                                            message.value))
        
        matches = json.loads(message.value)["matches"]
        
        update_or_insert_matches(matches)

