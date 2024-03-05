from pydantic import BaseModel
from typing import List, Union
from .pool import pool
from datetime import date


class Error(BaseModel):
    message: str


class MemberIn(BaseModel):
    first_name: str
    last_name: str
    username: str
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
    member_since: date


class MemberOutWithPassword(MemberOut):
    hashed_password: str


class MemberRepo:
    def get_all(self) -> Union[List[MemberOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id,
                            first_name,
                            last_name,
                            username,
                            age,
                            skill_level,
                            avatar,
                            about,
                            location_id,
                            member_since
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
                            location_id=record[8],
                            member_since=record[9]
                        )
                        result.append(member)
                    return result
        except Exception as e:
            print(e)
            return {'message': 'could not retrieve all members'}

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
                            avatar,
                            about,
                            location_id
                            )
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING
                            id;
                        """,
                        [
                         member.first_name,
                         member.last_name,
                         member.username,
                         member.age,
                         member.skill_level,
                         member.avatar,
                         member.about,
                         member.location_id
                         ]
                    )
                    id = result.fetchone()[0]
                    reg_date = date.today()
                    old_data = member.dict()
                    return MemberOut(
                        id=id,
                        member_since=reg_date,
                        **old_data
                    )
        except Exception as e:
            print(e)
            return {'message': 'Could not create new member'}
