import os
from pymongo import MongoClient

MONGODB_URI = os.getenv("MONGODB_URI", "your_mongodb_connection_string_here")

client = MongoClient(MONGODB_URI)
db = client.get_database()

def test_connection():
    try:
        print("Databases:", client.list_database_names())
        print("Connection successful.")
    except Exception as e:
        print("Connection failed:", e)

if __name__ == "__main__":
    test_connection()