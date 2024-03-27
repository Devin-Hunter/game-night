from pydantic import BaseModel, validator
from typing import Optional, Union, List
from queries.pool import pool


class Error(BaseModel):
    message: str


class GameIn(BaseModel):
    title: str
    year: int
    min_players: int
    max_players: int
    play_time: str
    age: str
    description: str
    rules: str
    picture: str
    video: Optional[str]
    complexity: str
    category: str
    rating: Optional[int]

    @validator('rating', pre=True, always=True)
    def empty_string_to_none(cls, v):
        return v if v != "" else None


class GameOut(BaseModel):
    id: int
    title: str
    year: int
    min_players: int
    max_players: int
    play_time: str
    age: str
    description: str
    rules: str
    picture: str
    video: Optional[str]
    complexity: str
    category: str
    rating: Optional[int]


class GameRepo:
    def get_random_game(self):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, title, year, min_players,
                                max_players,
                                play_time, age, description,
                                rules, picture, video,
                                complexity, category, rating
                        FROM games
                        ORDER BY RANDOM()
                        LIMIT 1;
                        """
                    )
                    record = result.fetchone()
                    print(record)
                    if record is None:
                        return None
                    return self.record_to_game_out(record)
        except Exception as e:
            print(e)

    def create_game(self, game: GameIn) -> Union[GameOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO games
                            (title, year, min_players, max_players,
                            play_time, age, description,
                            rules, picture, video,
                            complexity, category, rating)
                        VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            game.title,
                            game.year,
                            game.min_players,
                            game.max_players,
                            game.play_time,
                            game.age,
                            game.description,
                            game.rules,
                            game.picture,
                            game.video,
                            game.complexity,
                            game.category,
                            game.rating,
                        ],
                    )
                    id = result.fetchone()[0]
                    old_data = game.dict()
                    return GameOut(id=id, **old_data)
        except Exception:
            return {"message": "Could Not Create Your Game"}

    def list_all_games(self) -> Union[Error, List[GameOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, title, year, min_players, max_players,
                            play_time, age, description,
                            rules, picture, video,
                            complexity, category, rating
                        FROM games
                        ORDER BY id;
                        """
                    )
                    return [
                        self.record_to_game_out(record) for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all games"}

    def record_to_game_out(self, record):
        return GameOut(
            id=record[0],
            title=record[1],
            year=record[2],
            min_players=record[3],
            max_players=record[4],
            play_time=record[5],
            age=record[6],
            description=record[7],
            rules=record[8],
            picture=record[9],
            video=record[10],
            complexity=record[11],
            category=record[12],
            rating=record[13],
        )

    def get_game_details(self, game_id: int) -> Optional[GameOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, title, year, min_players, max_players,
                            play_time, age, description,
                            rules, picture, video,
                            complexity, category, rating
                        FROM games
                        WHERE id = %s
                        """,
                        [game_id],
                    )
                    record = result.fetchone()
                    print(record)
                    if record is None:
                        return None
                    return self.record_to_game_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get the detail of this game"}

    def update_game(self, game_id: int, game: GameIn) -> Union[GameOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE games
                        SET title = %s
                        , year = %s
                        , min_players = %s
                        , max_players = %s
                        , play_time = %s
                        , age = %s
                        , description = %s
                        , rules = %s
                        , picture = %s
                        , video = %s
                        , complexity = %s
                        , category = %s
                        , rating = %s
                        WHERE id = %s
                        """,
                        [
                            game.title,
                            game.year,
                            game.min_players,
                            game.max_players,
                            game.play_time,
                            game.age,
                            game.description,
                            game.rules,
                            game.picture,
                            game.video,
                            game.complexity,
                            game.category,
                            game.rating,
                            game_id,
                        ],
                    )
                    old_data = game.dict()
                    return GameOut(id=game_id, **old_data)
        except Exception as e:
            print(e)
            return {"message": "Could not update the chosen game"}

    def delete_game(self, game_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM games
                        WHERE id = %s
                        """,
                        [game_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def add_game_to_owned(
        self, member_id: int, game_id: int
    ) -> Union[bool, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO owned_games (member_id, game_id)
                        VALUES (%s, %s)
                        """,
                        [member_id, game_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return {"message": "Could not add game to owned games list"}

    def add_game_to_wishlist(
        self, member_id: int, game_id: int
    ) -> Union[bool, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO wishlist_games (member_id, game_id)
                        VALUES (%s, %s)
                        """,
                        [member_id, game_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return {"message": "Could not add game to want to play list"}

    def add_game_to_favorites(
        self, member_id: int, game_id: int
    ) -> Union[bool, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO favorite_games (member_id, game_id)
                        VALUES (%s, %s)
                        """,
                        [member_id, game_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return {"message": "Could not add game to favorites list"}

    def list_favorite_games(
        self, member_id: int
    ) -> Union[Error, List[GameOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT g.id, g.title, g.year, g.min_players,
                            g.max_players,
                            g.play_time, g.age, g.description,
                            g.rules, g.picture, g.video,
                            g.complexity, g.category, g.rating
                        FROM games AS g
                        JOIN favorite_games AS fg ON g.id = fg.game_id
                        WHERE fg.member_id = %s
                        ORDER BY g.title;
                        """,
                        [member_id],
                    )
                    return [
                        self.record_to_game_out(record) for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get favorites games"}

    def list_owned_games(self, member_id: int) -> Union[Error, List[GameOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT g.id, g.title, g.year, g.min_players,
                            g.max_players,
                            g.play_time, g.age, g.description,
                            g.rules, g.picture, g.video,
                            g.complexity, g.category, g.rating,
                            og.member_id
                        FROM games AS g
                        JOIN owned_games AS og ON g.id = og.game_id
                        WHERE og.member_id = %s
                        ORDER BY g.title;
                        """,
                        [member_id],
                    )
                    return [
                        self.record_to_game_out(record) for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get games you own"}

    def list_wishlist_games(
        self, member_id: int
    ) -> Union[Error, List[GameOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT g.id, g.title, g.year, g.min_players,
                            g.max_players,
                            g.play_time, g.age, g.description,
                            g.rules, g.picture, g.video,
                            g.complexity, g.category, g.rating
                        FROM games AS g
                        JOIN wishlist_games AS wg ON g.id = wg.game_id
                        WHERE wg.member_id = %s
                        ORDER BY g.title;
                        """,
                        [member_id],
                    )
                    return [
                        self.record_to_game_out(record) for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get games you want to play"}

    def remove_game_from_owned(
        self, member_id: int, game_id: int
    ) -> Union[bool, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                            DELETE FROM owned_games
                            WHERE member_id = %s AND game_id = %s
                            """,
                        [member_id, game_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return {"message": "Could not remove game from owned games list"}

    def remove_game_from_wishlist(
        self, member_id: int, game_id: int
    ) -> Union[bool, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM wishlist_games
                        WHERE member_id = %s AND game_id = %s
                        """,
                        [member_id, game_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return {"message": "Could not remove game from want to play list"}

    def remove_game_from_favorites(
        self, member_id: int, game_id: int
    ) -> Union[bool, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM favorite_games
                        WHERE member_id = %s AND game_id = %s
                        """,
                        [member_id, game_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return {"message": "Could not remove game from favorites list"}
