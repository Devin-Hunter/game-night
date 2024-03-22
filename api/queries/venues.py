from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class VenueIn(BaseModel):
    venue_name: str
    online_link: str
    location_id: int
    hours_operation: str
    phone_number: Optional[str]
    venue_type: Optional[str]
    reservation_req: bool


class VenueOut(BaseModel):
    id: int
    venue_name: str
    online_link: str
    location_id: int
    hours_operation: str
    phone_number: Optional[str]
    venue_type: Optional[str]
    reservation_req: bool


class VenuesOnline(BaseModel):
    id: int
    venue_name: str


class VenuesInPerson(BaseModel):
    id: int
    venue_name: str
    city: str
    state_abbrev: str


class VenueDetails(BaseModel):
    id: int
    venue_name: str
    online_link: str
    city: str
    state_abbrev: str
    hours_operation: str
    phone_number: Optional[str]
    venue_type: Optional[str]
    reservation_req: bool


class VenueRepository:
    def create(self, venue: VenueIn):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO venues
                        (
                            venue_name
                            , online_link
                            , location_id
                            , hours_operation
                            , phone_number
                            , venue_type
                            , reservation_req
                        )
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s)
                    RETURNING id
                    """,
                    [
                        venue.venue_name,
                        venue.online_link,
                        venue.location_id,
                        venue.hours_operation,
                        venue.phone_number,
                        venue.venue_type,
                        venue.reservation_req,
                    ],
                )
                id = result.fetchone()[0]
                old_data = venue.dict()
                return VenueOut(id=id, **old_data)

    def get_online_venues(self) -> Union[Error, List[VenuesOnline]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT v.id, v.venue_name, l.online

                        FROM venues AS v

                        LEFT JOIN locations AS l on v.location_id = l.id

                        WHERE l.online = true;
                        """
                    )
                    return [
                        VenuesOnline(
                            id=record[0],
                            venue_name=record[1],
                        )
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get list of online venues"}

    def get_in_person_venues(self) -> Union[Error, List[VenuesInPerson]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT v.id, v.venue_name, l.city,
                        l.state_abbrev, l.online

                        FROM venues AS v

                        LEFT JOIN locations AS l on v.location_id = l.id

                        WHERE l.online = false;
                        """
                    )
                    return [
                        VenuesInPerson(
                            id=record[0],
                            venue_name=record[1],
                            city=record[2],
                            state_abbrev=record[3],
                        )
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get list of in-person venues"}

    def get_details(self, venue_id: int) -> Optional[VenueDetails]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT v.id
                            , v.venue_name
                            , v.online_link
                            , l.city
                            , l.state_abbrev
                            , v.hours_operation
                            , v.phone_number
                            , v.venue_type
                            , v.reservation_req

                        FROM venues AS v

                        LEFT JOIN locations AS l on v.location_id = l.id

                        WHERE v.id = %s
                        """,
                        [venue_id],
                    )
                    record = result.fetchone()
                    return self.record_to_venue_details(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get venue details"}

    def update(self, venue_id: int, venue: VenueIn) -> Optional[VenueOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE venues

                        SET venue_name = %s
                            , online_link = %s
                            , location_id = %s
                            , hours_operation = %s
                            , phone_number = %s
                            , venue_type = %s
                            , reservation_req = %s

                        WHERE id = %s
                        """,
                        [
                            venue.venue_name,
                            venue.online_link,
                            venue.location_id,
                            venue.hours_operation,
                            venue.phone_number,
                            venue.venue_type,
                            venue.reservation_req,
                            venue_id,
                        ],
                    )
                    old_data = venue.dict()
                    return VenueOut(id=venue_id, **old_data)
        except Exception as e:
            print(e)
            return {"message": "Could not update this vacation"}

    def delete(self, venue_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM venues
                        WHERE id = %s
                        """,
                        [venue_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def record_to_venue_out(self, record):
        return VenueOut(
            id=record[0],
            venue_name=record[1],
            online_link=record[2],
            location_id=record[3],
            hours_operation=record[4],
            phone_number=record[5],
            venue_type=record[6],
            reservation_req=record[7],
        )

    def record_to_venue_details(self, record):
        return VenueDetails(
            id=record[0],
            venue_name=record[1],
            online_link=record[2],
            city=record[3],
            state_abbrev=record[4],
            hours_operation=record[5],
            phone_number=record[6],
            venue_type=record[7],
            reservation_req=record[8],
        )
