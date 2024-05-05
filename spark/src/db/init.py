from rethinkdb import RethinkDB
from src.db.tables import tables

# RethinkDB connection settings
host = 'rethinkdb'
port = 28015
db_name = 'football'

r = RethinkDB()

def init_db():
    # Connect to RethinkDB
    connection = r.connect(host=host, port=port)
    
    try:
        # Create database if not exists
        r.db_create(db_name).run(connection)
    except r.errors.ReqlOpFailedError:
        print(f"Database '{db_name}' already exists.")
        
    db = r.db(db_name)
    
    # Create tables
    for table in tables:
        try:
            db.table_create(table['name'], primary_key=table['primary_key']).run(connection)
            print(f"Table '{table['name']}' created.")
        except r.errors.ReqlOpFailedError:
            print(f"Table '{table['name']}' already exists.")
    
    print("Tables creation completed.")
    
    return db

