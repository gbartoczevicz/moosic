from pydantic.main import BaseModel


class Location(BaseModel):
  latitude: float
  longitude: float
  postal_code: str
  address: str
  address_number: int
