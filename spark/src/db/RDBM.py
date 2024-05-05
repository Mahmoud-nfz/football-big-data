from rethinkdb import RethinkDB
from src.db.tables import tables

class RethinkDBManager:
    _instance = None
    
    # Singleton pattern
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.init()
        return cls._instance
    
    def init(self):
        # RethinkDB connection settings
        host = 'rethinkdb'
        port = 28015
        db_name = 'football'
        
        r = RethinkDB()
        
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
        
        self.r = r
        self.db = db
        self.connection = connection
