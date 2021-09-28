from typing import Final


class CommentUDT(object):

  UDT_NAME: Final[str] = "comment"

  def __init__(self, content: str, feeling: int) -> None:
    self.content: Final[str] = content
    self.feeling: Final[int] = feeling
