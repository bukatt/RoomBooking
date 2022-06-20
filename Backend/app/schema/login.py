from schema import user
from pydantic import BaseModel

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: user.User