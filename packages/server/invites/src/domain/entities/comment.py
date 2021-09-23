from pydantic.main import BaseModel


class Comment(BaseModel):
  content: str
  feeling: int
