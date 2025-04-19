# Import all models to ensure SQLAlchemy registers them
from backend.db.base_class import Base
from backend.models.user import User
from backend.models.conversation import Conversation
from backend.models.document import Document 