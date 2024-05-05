from src.db.RDBM import RethinkDBManager

def update_or_insert_players(players):    
    rdbm = RethinkDBManager()
    print("Updating/inserting player data")
    try:
        rdbm.db.table("players").insert(
            players,  # New documents
            durability="hard",  # Wait for the write to be committed
            conflict="update"  # Update the existing document
        ).run(rdbm.connection)
        
        print("Player data updated/inserted successfully")
    except Exception as e:
        print("Error updating/inserting player data:", e)