from src.db.RDBM import RethinkDBManager

def update_or_insert_matches(matches):    
    rdbm = RethinkDBManager()
    print("Updating/inserting match data")
    try:
        rdbm.db.table("matches").insert(
            matches,
            durability="hard",  # Wait for the write to be committed
            conflict="update"  # Update the existing document
        ).run(rdbm.connection)
        
        print("Match data updated/inserted successfully")
    except Exception as e:
        print("Error updating/inserting Match data:", e)