import pandas as pd
from fuzzywuzzy import process

from src.utils.singleton import Singleton

class SearchEngine(metaclass=Singleton):
    def __init__(self, filepath):
        self.df = pd.read_csv(filepath)
    
    def search(self, query, limit=10):
        # Fuzzy search on the 'name' column
        results = process.extractOne(query, self.df['full_name'], score_cutoff=70)  # Using extractOne for best match
        if results:
            best_match_idx = results[2]  # extractOne returns a tuple (matched_term, score, index)
            best_match_row = self.df.iloc[best_match_idx].to_dict()
            return best_match_row
        return None  # Return None if no match found
