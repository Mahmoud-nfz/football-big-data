_events_cols = ["id_odsp","id_event","sort_order","time","text","event_type","event_type2","side","event_team","opponent","player","player2","player_in","player_out","shot_place","shot_outcome","is_goal","location","bodypart","assist_method","situation","fast_break"]

_ginf_cols = ["id_odsp","link_odsp","adv_stats","date","league","season","country","ht","at","fthg","ftag","odd_h","odd_d","odd_a","odd_over","odd_under","odd_bts","odd_bts_n"]

events_cols = {col : idx for idx, col in enumerate(_events_cols)}

ginf_cols = {col : idx for idx, col in enumerate(_ginf_cols)}
