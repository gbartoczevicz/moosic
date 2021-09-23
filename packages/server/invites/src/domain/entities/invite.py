from datetime import date
from typing import Optional
from pydantic import BaseModel

from .comment import Comment


class Invite(BaseModel):
  id: Optional[str]
  date: date
  establishment_id: str
  artist_id: str
  latitude: float
  longitude: float
  postal_code: str
  address: str
  address_number: int
  artist_rating: Optional[int]
  establishment_rating: Optional[int]
  artist_comment: Optional[Comment]
  establishment_commnet: Optional[Comment]
