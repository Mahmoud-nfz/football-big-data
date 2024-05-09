# This file contains the table schema for the rethinkdb database.
tables = [
    {
        'name': 'players',
        'primary_key': 'name'
    },
    {
        'name': 'teams',
        'primary_key': 'name'
    },
    {
        'name': 'matches',
        'primary_key': 'id'
    }
]