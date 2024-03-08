from pydantic import BaseModel
from typing import Optional
from queries.pool import pool


class Error(BaseModel):
    message: str


class EventIn(BaseModel):
    game: str
    venue: int
    date_time: int
    competitive_rating: str
    max_players: int
    max_spectators: int
    min_age: int


class EventOut(BaseModel):
    id: int
    game: str
    venue: int
    date_time: int
    competitive_rating: str
    max_players: int
    max_spectators: int
    min_age: int


class EventList(BaseModel):
    id: int
    game: str
    venue: int
    date_time: int


class EventRepo:
    def create_event(self, event: EventIn):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO events
                        (game
                        , venue
                        , date_time
                        , competitive_rating
                        , max_players
                        , max_spectators
                        , min_age)
                        VALUES
                        (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            event.game,
                            event.venue,
                            event.date_time,
                            event.competitive_rating,
                            event.max_players,
                            event.max_spectators,
                            event.min_age
                        ],
                    )
                    id = result.fetchone()[0]
                    old_data = event.dict()
                    return EventOut(id=id, **old_data)
        except Exception:
            return {"message": "Could not create event"}

    def list_all(self):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT e.game, v.venue, e.date_time
                        FROM events AS e
                        LEFT JOIN venues AS v on v.venue = v.id
                        ORDER BY date_time;
                        """
                    )
                    return [
                        EventList(id=record[0],
                                  game=record[1],
                                  venue=record[2],
                                  date_time=record[3],)
                        for record in db
                    ]
        except Exception:
            return {"message": "Could not get list of events"}

    def event_details(self, event_id: int) -> Optional[EventOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                        , e.game
                        , v.venue
                        , e.date_time
                        , e.competitive_rating
                        , e.max_players
                        , e.max_spectators
                        , e.min_age
                        FROM events AS e
                        LEFT JOIN venues AS v on v.venue = v.id
                        WHERE id = %s
                        """,
                        [event_id],
                    )
                    record = result.fetchone()
                    return self.record_to_event_out(record)
        except Exception:
            return {"message": "Could not get event details"}

    def record_to_event_out(self, record):
        return EventOut(
            id=record[0],
            game=record[1],
            venue=record[2],
            date_time=record[3],
            competitive_rating=record[4],
            max_players=record[5],
            max_spectators=record[6],
            min_age=record[7],
        )

    def update_event(self, event_id: int, event: EventIn
                     ) -> Optional[EventOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE events
                        SET game = %s
                        , venue = %s
                        , date_time = %s
                        , competitive_rating = %s
                        , max_players = %s
                        , max_spectators = %s
                        , min_age = %s
                        WHERE id = %s
                        """,
                        [
                            event.game,
                            event.venue,
                            event.date_time,
                            event.competitive_rating,
                            event.max_players,
                            event.max_spectators,
                            event.min_age,
                            event_id
                        ],
                    )
                    old_data = event.dict()
                    return EventOut(id=event_id, **old_data)
        except Exception:
            return {"message": "Could not update the event"}

    def delete(self, event_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM events
                        WHERE id = %s
                        """,
                        [event_id],
                    )
                    return True
        except Exception:
            return {"message": "Could not delete event"}
