from datetime import date
from typing import Optional
from pydantic import BaseModel
from .values import Location, Rating


class Invite(BaseModel):
  id: Optional[str]
  date: date
  establishment_id: str
  artist_id: str
  location: Location
  rating: Optional[Rating]
