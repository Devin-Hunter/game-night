from pydantic import BaseModel
from typing import Optional, Union, List
from queries.pool import pool


class Error(BaseModel):
    message: str


class GameIn(BaseModel):
    title: str
    year: Optional[int]
    min_players: Optional[int]
    max_players: Optional[int]
    play_time: Optional[str]
    age: Optional[str]
    description: Optional[str]
    rules: Optional[str]
    picture: Optional[str]
    video: Optional[str]
    complexity: Optional[str]
    category: Optional[str]
    rating: Optional[int]


class GameOut(BaseModel):
    id: int
    title: str
    year: Optional[int]
    min_players: Optional[int]
    max_players: Optional[int]
    play_time: Optional[str]
    age: Optional[str]
    description: Optional[str]
    rules: Optional[str]
    picture: Optional[str]
    video: Optional[str]
    complexity: Optional[str]
    category: Optional[str]
    rating: Optional[int]


class GameRepo:
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
                    # return self.game_in_to_out(id, game)
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
                        ORDER BY title;
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
