from pydantic import BaseModel
from typing import List, Union
from .pool import pool
from .events import EventOut


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
    about: str
    location_id: int


class MemberOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    username: str
    age: int
    skill_level: str
    about: str
    location_id: int


class MemberOutWithPassword(MemberOut):
    hashed_password: str


class MemberUpdate(BaseModel):
    first_name: str
    last_name: str
    age: int
    skill_level: str
    about: str
    location_id: int


class MemberRepo:
    def record_to_member_out(self, record) -> MemberOutWithPassword:
        return MemberOutWithPassword(
            id=record[0],
            first_name=record[1],
            last_name=record[2],
            username=record[3],
            hashed_password=record[4],
            age=record[5],
            skill_level=record[6],
            about=record[7],
            location_id=record[8],
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
                            age,
                            skill_level,
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
                            about=record[6],
                            location_id=record[7],
                        )
                        result.append(member)
                    return result
        except Exception as e:
            print(e)
            return {"message": "could not retrieve all members"}

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
                        [username],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    member_data = self.record_to_member_out(record).dict()
                    return MemberOutWithPassword(**member_data)
        except Exception as e:
            print(str(e))
            return {"message": "Could not retrieve member"}

    def update_member(
        self, username: str, member: MemberUpdate
    ) -> Union[MemberOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE members
                        SET first_name = %s
                            , last_name = %s
                            , age = %s
                            , skill_level = %s
                            , about = %s
                            , location_id = %s
                        WHERE username = %s
                        """,
                        [
                            member.first_name,
                            member.last_name,
                            member.age,
                            member.skill_level,
                            member.about,
                            member.location_id,
                            username,
                        ],
                    )
                    old_data = member.dict()
                    updated = self.get(username).dict()
                    id = updated["id"]
                    return MemberOut(id=id, username=username, **old_data)

        except Exception as e:
            print(e)
            return {"error": "could not update member"}

    def new_member(
        self, member: MemberIn, hashed_password: str
    ) -> MemberOutWithPassword:
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
                            location_id,
                            hashed_password
                            )
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING
                            *;
                        """,
                        [
                            member.first_name,
                            member.last_name,
                            member.username,
                            member.age,
                            member.skill_level,
                            member.about,
                            member.location_id,
                            hashed_password,
                        ],
                    )
                    record = result.fetchone()
                    if record:
                        data = self.record_to_member_out(record).dict()
                        return MemberOutWithPassword(**data)
                    else:
                        return {"nope": "not working"}
        except Exception as e:
            print(e)
            return {"message": "Could not create new member"}

    def get_member_attending_events(self, member_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT e.*
                        FROM members_events me
                        JOIN events e
                        ON me.event_id = e.id
                        JOIN members m
                        ON me.member_id = m.id
                        WHERE attendee_type = 'spectator'
                        AND me.member_id = %s;
                        """,
                        [member_id],
                    )
                    result = []
                    for record in db:
                        event = EventOut(
                            id=record[0],
                            game=record[1],
                            venue=record[2],
                            date_time=record[3],
                            competitive_rating=record[4],
                            max_players=record[5],
                            max_spectators=record[6],
                            min_age=record[7],
                        )
                        result.append(event)
                    return result
        except Exception as e:
            print(e)
            return {"error": "could not get member events"}

    def get_member_player_events(self, member_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT e.*
                        FROM members_events me
                        JOIN events e
                        ON me.event_id = e.id
                        JOIN members m
                        ON me.member_id = m.id
                        WHERE attendee_type = 'player'
                        AND me.member_id = %s;
                        """,
                        [member_id],
                    )
                    result = []
                    for record in db:
                        event = EventOut(
                            id=record[0],
                            game=record[1],
                            venue=record[2],
                            date_time=record[3],
                            competitive_rating=record[4],
                            max_players=record[5],
                            max_spectators=record[6],
                            min_age=record[7],
                        )
                        result.append(event)
                    return result
        except Exception as e:
            print(e)
            return {"error": "could not get member events"}
