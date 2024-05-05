from src.db.RDBM import RethinkDBManager

def update_or_insert_teams(players):    
    rdbm = RethinkDBManager()
    print("Updating/inserting team data")
    try:
        rdbm.db.table("teams").insert(
            players,  # New documents
            durability="hard",  # Wait for the write to be committed
            conflict="update"  # Update the existing document
        ).run(rdbm.connection)
        
        print("team data updated/inserted successfully")
    except Exception as e:
        print("Error updating/inserting team data:", e)