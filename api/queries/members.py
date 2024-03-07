from pydantic import BaseModel
from typing import List, Union
from .pool import pool



class Error(BaseModel):
    message: str


class DuplicateAccountError(ValueError):
    pass

class MemberIn(BaseModel):
    first_name: str
    last_name: str
    username: str
    password: str
    age: int
    skill_level: str
    avatar: str
    about: str
    location_id: int


class MemberOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    username: str
    age: int
    skill_level: str
    avatar: str
    about: str
    location_id: int


class MemberOutWithPassword(MemberOut):
    hashed_password: str


class MemberRepo:
    def record_to_member_out(self, record) -> MemberOutWithPassword:
        print('record to out', record)
        return MemberOutWithPassword (
            id = record[0],
            first_name = record[1],
            last_name  = record[2],
            username = record[3],
            hashed_password = record[4],
            age = record[5],
            skill_level = record[6],
            avatar = record[7],
            about = record[8],
            location_id = record[9],
        )
        

    def get_all(self) -> Union[List[MemberOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT 
                            id,
                            first_name,
                            last_name,
                            username,
                            password,
                            age,
                            skill_level,
                            avatar,
                            about,
                            location_id
                        FROM members
                        """
                    )
                    result = []
                    for record in db:
                        member = MemberOut(
                            id=record[0],
                            first_name=record[1],
                            last_name=record[2],
                            username=record[3],
                            age=record[4],
                            skill_level=record[5],
                            avatar=record[6],
                            about=record[7],
                            location_id=record[8]
                        )
                        result.append(member)
                    return result
        except Exception as e:
            print(e)
            return {'message': 'could not retrieve all members'}

    def get(self, username: str) -> MemberOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT 
                        *
                        FROM members
                        WHERE username = %s;
                        """,
                        [username]
                    )
                    record = result.fetchone()
                    print('RECORD',record)
                    if record is None:
                        return None
                    member_data= self.record_to_member_out(record).dict()
                    print('MEMBER DATA:', member_data)
                    return MemberOutWithPassword(**member_data)
        except Exception as e:
            print(str(e))
            return {'message': 'Could not retrieve member'}

    def new_member(self, member: MemberIn, hashed_password: str) -> MemberOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    print('new_member result:', member)#this prints, nothing below here does
                    print('hashed pw', hashed_password)
                    result = db.execute(
                        """
                        INSERT INTO members
                            (first_name,
                            last_name,
                            username,
                            age,
                            skill_level,
                            avatar,
                            about,
                            location_id,
                            hashed_password
                            )
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING
                            *;
                        """,
                        [
                         member.first_name,
                         member.last_name,
                         member.username,
                         member.age,
                         member.skill_level,
                         member.avatar,
                         member.about,
                         member.location_id,
                         hashed_password
                        ]
                    )
                    record = result.fetchone()
                    if record:
                        id = record[0]
                    #old_data = member.dict()
                    #print('old data:', old_data)
                        data = self.record_to_member_out(record).dict()
                        print(data)
                        return MemberOutWithPassword(
                            **data
                            )
                    else:
                        return {'nope': 'not working'}
        except Exception as e:
            print(e) #NoneType object not subscriptable
            return {'message': 'Could not create new member'} #this gets thrown
