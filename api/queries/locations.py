from pydantic import BaseModel
from typing import List, Union
from .pool import pool


class Error(BaseModel):
    message: str


class LocationIn(BaseModel):
    city: str
    state: str
    state_abbrev: str
    weather: str


class LocationOut(BaseModel):
    id: int
    city: str
    state: str
    state_abbrev: str
    weather: str


class LocationRepo(BaseModel):
    def get_all(self) -> Union[List[LocationOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, city, state, state_abbrev, weather
                        FROM locations
                        """
                    )
                    result = []
                    for record in db:
                        location = LocationOut(
                            id=record[0],
                            city=record[1],
                            state=record[2],
                            state_abbrev=record[3],
                            weather=record[4]
                        )
                        result.append(location)
                    return result
        except Exception as e:
            print(e)
            return {'message': 'could not retrieve all locations'}

    def create_location(self, location: LocationIn) -> LocationOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO locations (
                            city,
                            state,
                            state_abbrev,
                            weather
                            )
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING
                            id;
                        """,
                        [
                            location.city,
                            location.state,
                            location.state_abbrev,
                            location.weather
                        ]
                    )
                    print(result)
                    id = result.fetchone()[0]
                    old_data = location.dict()
                    return LocationOut(id=id, **old_data)
        except Exception as e:
            print(e)
            return {'message': 'Could not create new location'}
