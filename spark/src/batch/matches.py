from src.db.matches import update_or_insert_matches
from src.db.players import update_or_insert_players
from src.db.output import save_output
from src.data.load import load_data
from src.spark.context import get_context
from src.data.columns import _ginf_cols as cols


def matches():
    
    sc = get_context("matches")
    
    events = load_data(sc, "ginf.csv")

    matches_list = events.collect()
    
    matches_dicts = [{name: x[idx] for idx, name in enumerate(cols)} for x in matches_list]  

    toInsert = []

    for match in matches_dicts:
        match["awayTeam"] = { 
            "name": match["at"]
        }
        match["homeTeam"] = { 
            "name": match["ht"]
        }
        match["competition"] = {
            "name": match["league"]
        }
        match["score"] = {
            "fullTime": {
                "home": match["fthg"],
                "away": match["ftag"]
            } 
        }
        toInsert.append(match)
    
    update_or_insert_matches(toInsert)
    
    sc.stop()
