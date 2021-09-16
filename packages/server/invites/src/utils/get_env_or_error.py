import os


class EnvNotFound(Exception):
  def __init__(self, field: str) -> None:
      super().__init__("Variable env {0} not found".format(field))

def get_env_or_error(field: str):
  env_value = os.getenv(field)

  if env_value is None:
    raise EnvNotFound(field)

  return env_value
