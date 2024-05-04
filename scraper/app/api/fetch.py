from typing import Dict, Optional
from urllib.parse import urlencode, urljoin
import requests
from ..config.config import config, logger

# Headers for API requests
headers = {
    'X-Auth-Token': config['API_KEY']
}

def fetch_data_from_api(date: str) -> Optional[Dict]:
    try:
        # Build the endpoint URL with the current date parameter
        endpoint = urljoin(config['API_URL'], '/v4/matches')
        query_params = {'status': 'IN_PLAY'}
        url = f"{endpoint}?{urlencode(query_params)}"

        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise an exception for non-2xx status codes
        return response.json()
    except Exception as e:
        logger.error(f"Error fetching data from API: {e}")
        return None