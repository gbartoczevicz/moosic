from pydantic.main import BaseModel
from .comment import Comment


class Rating(BaseModel):
  artist_rating: int
  establishment_rating: int
  artist_comment: Comment
  establishment_commnet: Comment
