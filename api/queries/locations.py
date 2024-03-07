from pydantic import BaseModel, Field
from typing import Optional, List, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class LocationIn(BaseModel):
    online: bool = Field(default="false")
    city: str
    state: str
    state_abbrev: str
    weather: Optional[str]


class LocationOut(BaseModel):
    id: int
    online: bool
    city: str
    state: str
    state_abbrev: str
    weather: Optional[str]


class LocationDetails(BaseModel):
    id: int
    city: str
    state: str
    weather: Optional[str]


class LocationList(BaseModel):
    id: int
    city: str
    state_abbrev: str


class LocationRepository:
    def create(self, location: LocationIn):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO locations
                        (online, city, state, state_abbrev, weather)
                    VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        location.online,
                        location.city,
                        location.state,
                        location.state_abbrev,
                        location.weather,
                    ],
                )
                id = result.fetchone()[0]
                old_data = location.dict()
                return LocationOut(id=id, **old_data)

    def get_all_locations(self) -> Union[List[LocationList], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, city, state_abbrev

                        FROM locations

                        ORDER BY (online is true) desc, state_abbrev, city;
                        """
                    )
                    return [
                        LocationList(
                            id=record[0],
                            city=record[1],
                            state_abbrev=record[2],
                        )
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all locations"}

    def get_details(self, location_id: int) -> Optional[LocationDetails]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, city, state, weather

                        FROM locations

                        WHERE id = %s AND online = false;
                        """,
                        [location_id],
                    )
                    record = result.fetchone()
                    return self.record_to_location_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get location details"}

    def record_to_location_out(self, record):
        return LocationDetails(
            id=record[0],
            city=record[1],
            state=record[2],
            weather=record[3],
        )
