from pydantic import BaseModel
from typing import Optional
from .pool import pool

class Error(BaseModel):
    message: str

class MemberIn(BaseModel):
    pass


class MemberOut(BaseModel):
    pass

class MemberRepo:
    def new_member(self, member: MemberIn) -> MemberOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    pass
        except Exception as e:
            print(e)
            return {'message': 'Could not create new member'}