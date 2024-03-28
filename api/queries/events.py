from pydantic import BaseModel
from typing import Optional, Union, List
from queries.pool import pool
from datetime import datetime


class Error(BaseModel):
    message: str


class EventIn(BaseModel):
    game: str
    venue: int
    date_time: datetime
    competitive_rating: str
    max_players: int
    max_spectators: int
    min_age: int


class EventOut(BaseModel):
    id: int
    game: str
    venue: str
    date_time: datetime
    competitive_rating: str
    max_players: int
    max_spectators: int
    min_age: int


class EventList(BaseModel):
    id: int
    game: str
    venue_name: str
    date_time: datetime
    max_players: int
    max_spectators: int


class EventRepo:
    def create_event(self, event: EventIn):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO events
                        (game,
                        venue,
                        date_time,
                        competitive_rating,
                        max_players,
                        max_spectators,
                        min_age)
                        VALUES
                        (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING *;
                        """,
                        [
                            event.game,
                            event.venue,
                            event.date_time,
                            event.competitive_rating,
                            event.max_players,
                            event.max_spectators,
                            event.min_age,
                        ],
                    )
                    record = db.fetchone()
                    event_data = self.record_to_event_out(record).dict()
                    return EventOut(**event_data)
        except Exception as e:
            print(e)
            return {"message": "Could not create event"}

    def list_all(self) -> Union[List[EventList], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT e.id, e.game, v.venue_name, e.date_time,
                        e.max_players, e.max_spectators
                        FROM events AS e
                        LEFT JOIN venues AS v on e.venue = v.id
                        ORDER BY e.date_time;
                        """
                    )
                    return [
                        EventList(
                            id=record[0],
                            game=record[1],
                            venue_name=record[2],
                            date_time=record[3],
                            max_players=record[4],
                            max_spectators=record[5],
                        )
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get list of events"}

    def event_details(self, event_id: int) -> Optional[EventOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT e.id
                        , e.game
                        , v.venue_name
                        , e.date_time
                        , e.competitive_rating
                        , e.max_players
                        , e.max_spectators
                        , e.min_age
                        FROM events AS e
                        LEFT JOIN venues AS v on e.venue = v.id
                        WHERE e.id = %s
                        """,
                        [event_id],
                    )
                    record = result.fetchone()
                    return self.record_to_event_out(record)
        except Exception as e:
            print(e)
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

    def update_event(
        self, user_id: int, event_id: int, event: EventIn
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
                            event_id,
                        ],
                    )
                    old_data = event.dict()
                    return EventOut(id=event_id, **old_data)
        except Exception as e:
            print(e)
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
        except Exception as e:
            print(e)
            return {"message": "Could not delete event"}

    def is_player(self, member_id: int, event_id: int) -> Union[bool, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO members_events
                        (member_id, event_id, attendee_type)
                        VALUES (%s, %s, 'player')
                        """,
                        [member_id, event_id],
                    )
                    conn.commit()
                    return True
        except Exception as e:
            print(e)
            return False

    def is_spectator(
        self, member_id: int, event_id: int
    ) -> Union[bool, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO members_events
                        (member_id, event_id, attendee_type)
                        VALUES (%s, %s, 'spectator')
                        """,
                        [member_id, event_id],
                    )
                    conn.commit()
                    return True
        except Exception as e:
            print(e)
            return False

    def delete_attendance_status(
        self, member_id: int, event_id: int
    ) -> Union[bool, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM members_events
                        WHERE member_id = %s AND event_id = %s
                        """,
                        [member_id, event_id],
                    )
                    conn.commit()
                    return True
        except Exception as e:
            print(e)
            return False

    def delete_event(
        self, event_id: int
    ) -> Union[bool, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM members_events
                        WHERE event_id = %s
                        """,
                        [event_id],
                    )
                    conn.commit()
                    return True
        except Exception as e:
            print(e)
            return False
