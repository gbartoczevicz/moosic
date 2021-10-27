from typing import Final
from cassandra.cluster import ResultSet
from cassandra.cqlengine import connection

class DataStaxClient:

  def __init__(self, host: str, keyspace: str) -> None:
    connection.setup(hosts=[host], default_keyspace=keyspace)

  def execute_raw(query: str, params: dict) -> ResultSet:
    return connection.execute(query, params)
