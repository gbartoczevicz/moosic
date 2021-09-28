import uuid
from cassandra.cqlengine.models import Model
from cassandra.cqlengine import columns
from .comment_udt import CommentUDT


class InviteModel(Model):
    id = columns.UUID(primary_key=True, default=uuid.uuid4)
    date = columns.date()
    establishment_id = columns.UUID()
    artist_id = columns.UUID()
    latitude = columns.Float()
    longitude = columns.Float()
    postal_code = columns.Text()
    address = columns.Text()
    address_number = columns.Integer()
    rating = columns.UserDefinedType(CommentUDT)
