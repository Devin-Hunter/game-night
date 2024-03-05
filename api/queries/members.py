from pydantic import BaseModel
from typing import Optional
from .pool import pool
from datetime import date


class Error(BaseModel):
    message: str

class MemberIn(BaseModel):
    first_name: str
    last_name:str
    username:str
    age: int
    skill_level: str
    about: str
    # location: int
    member_since: date
    
    


class MemberOut(BaseModel):
    id: int
    first_name: str
    last_name:str
    username:str
    age: int
    skill_level: str
    about: str
    # location: int
    # member_since: date
    

class MemberOutWithPassword(MemberOut):
    hashed_password: str

class MemberRepo:
    def get(self, username: str) -> MemberOut:
        pass
    def new_member(self, member: MemberIn) -> MemberOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO members
                            (first_name, 
                            last_name, 
                            username, 
                            age, 
                            skill_level,
                            about,
                            location
                            )
                        VALUES
                            (%s, %s, %s, %s, %s, %s)
                        RETURNING 
                            id;
                        """,
                        [
                         member.first_name, 
                         member.last_name, 
                         member.username, 
                         member.age,
                         member.skill_level,
                         member.about,
                        #  member.location
                         ]
                    )
                    print(result)
                    id = result.fetchone()[0]
                    old_data = member.dict()
                    
                    return MemberOut(id=id, **old_data)
        except Exception as e:
            print(e)
            return {'message': 'Could not create new member'}