from pydantic import BaseModel
from typing import List, Union
from .pool import pool
from .events import EventOut
# from .games import GameOut


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


class MemberUpdate(BaseModel):
    first_name: str
    last_name: str
    age: int
    skill_level: str
    avatar: str
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
            avatar=record[7],
            about=record[8],
            location_id=record[9],
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
                            location_id=record[8],
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
            return {'message': 'Could not retrieve member'}

    def update_member(
            self,
            username: str,
            member: MemberUpdate
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
                            , avatar = %s
                            , about = %s
                            , location_id = %s
                        WHERE username = %s
                        """,
                        [
                            member.first_name,
                            member.last_name,
                            member.age,
                            member.skill_level,
                            member.avatar,
                            member.about,
                            member.location_id,
                            username
                        ]
                    )
                    old_data = member.dict()
                    updated = self.get(username).dict()
                    id = updated['id']
                    return MemberOut(id=id, username=username, **old_data)

        except Exception as e:
            print(e)
            return {'error': 'could not update member'}

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

    def get_member_attending_events(self, id):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT e.*
                        FROM members_events me
                        JOIN events e
                        ON me.event_id = e.id
                        WHERE attendee_type = 'spectator'
                        AND me.member_id = %s;
                        """,
                        [id]
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
                            min_age=record[7]
                        )
                        result.append(event)
                    return result
        except Exception as e:
            print(e)
            return {'error': 'could not get member events'}

    def get_member_player_events(self, id):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT e.*
                        FROM members_events me
                        JOIN events e
                        ON me.event_id = e.id
                        WHERE attendee_type = 'player'
                        AND me.member_id = %s;
                        """,
                        [id]
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
                            min_age=record[7]
                        )
                        result.append(event)
                    return result
        except Exception as e:
            print(e)
            return {'error': 'could not get member events'}

    # def get_owned_games(self, id):
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 result = db.execute(
    #                     """
    #                     SELECT owned.*
    #                     FROM owned_games owned
    #                     JOIN games g
    #                     ON owned.game_id = g.id
    #                     WHERE owned.member_id = %s;
    #                     """,
    #                     [id]
    #                 )
    #                 result = []
    #                 for record in db:
    #                     print('RECORD', record)
    #                     game = GameOut(
    #                         id=record[0],
    #                         title=record[1],
    #                         year=record[2],
    #                         min_players=record[3],
    #                         max_players=record[4],
    #                         play_time=record[5],
    #                         age=record[6],
    #                         description=record[7],
    #                         rules=record[8],
    #                         picture=record[9],
    #                         video=record[10],
    #                         complexity=record[11],
    #                         category=record[12],
    #                         rating=record[13]
    #                     )
    #                     result.append(game)
    #                 return result
    #     except Exception as e:
    #         print(e)
    #         return {'error': 'could not get owned games'}

    # def get_wishlist_games(self, id):
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 result = db.execute(
    #                     """
    #                     SELECT wishlist.*
    #                     FROM wishlist_games wishlist
    #                     JOIN games
    #                     ON wishlist.game_id = games.id
    #                     WHERE wishlist.member_id = %s;
    #                     """,
    #                     [id]
    #                 )
    #                 result = []
    #                 for record in db:
    #                     game = GameOut(
    #                         id=record[0],
    #                         title=record[1],
    #                         year=record[2],
    #                         min_players=record[3],
    #                         max_players=record[4],
    #                         play_time=record[5],
    #                         age=record[6],
    #                         description=record[7],
    #                         rules=record[8],
    #                         picture=record[9],
    #                         video=record[10],
    #                         complexity=record[11],
    #                         category=record[12],
    #                         rating=record[13]
    #                     )
    #                     result.append(game)
    #                 return result
    #     except Exception as e:
    #         print(e)
    #         return {'error': 'could not get wishlist games'}

    # def get_favorite_games(self, id):
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 result = db.execute(
    #                     """
    #                     SELECT favorite.*
    #                     FROM favorite_games favorite
    #                     JOIN games
    #                     ON favorite.game_id = games.id
    #                     WHERE favorite.member_id = %s;
    #                     """,
    #                     [id]
    #                 )
    #                 result = []
    #                 for record in db:
    #                     game = GameOut(
    #                         id=record[0],
    #                         title=record[1],
    #                         year=record[2],
    #                         min_players=record[3],
    #                         max_players=record[4],
    #                         play_time=record[5],
    #                         age=record[6],
    #                         description=record[7],
    #                         rules=record[8],
    #                         picture=record[9],
    #                         video=record[10],
    #                         complexity=record[11],
    #                         category=record[12],
    #                         rating=record[13]
    #                     )
    #                     result.append(game)
    #                 return result
    #     except Exception as e:
    #         print(e)
    #         return {'error': 'could not get favorite games'}
