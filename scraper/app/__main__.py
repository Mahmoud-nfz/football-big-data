import time

from .api.fetch import fetch_data_from_api
from .kafka.send import send_to_kafka
from .config.config import config, logger


def main() -> None:
    interval = float(config['POLLING_INTERVAL'])
    while True:
        # Get the current date in the desired format (e.g., YYYY-MM-DD)
        current_date = time.strftime("%Y-%m-%d", time.localtime())
        data = fetch_data_from_api(current_date)
        if data:
            send_to_kafka(data)
        time.sleep(interval)

if __name__ == "__main__":
    main()
