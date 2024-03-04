from pydantic import BaseModel
from typing import Optional
from .pool import pool

class Error(BaseModel):
    message: str

class MemberIn(BaseModel):
    first_name,
    last_name,
    username,
    age,
    skill_level,
    about,
    location,


class MemberOut(BaseModel):
    id,
    first_name,
    last_name,
    username,
    age,
    skill_level,
    about,
    location, 
    member_since,

class MemberRepo:
    def new_member(self, member: MemberIn) -> MemberOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO
                        """
                    )
        except Exception as e:
            print(e)
            return {'message': 'Could not create new member'}