_events_cols = ["id_odsp","id_event","sort_order","time","text","event_type","event_type2","side","event_team","opponent","player","player2","player_in","player_out","shot_place","shot_outcome","is_goal","location","bodypart","assist_method","situation","fast_break"]

events_cols = {col : idx for idx, col in enumerate(_events_cols)}
