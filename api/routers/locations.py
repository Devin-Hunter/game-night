from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.locations import (
    Error,
    LocationIn,
    LocationOut,
    LocationList,
    LocationDetails,
    LocationRepository,
)


router = APIRouter()


@router.post("/locations", response_model=Union[LocationOut, Error])
def create_location(
    location: LocationIn,
    response: Response,
    repo: LocationRepository = Depends(),
):
    return repo.create(location)


@router.get("/locations", response_model=Union[List[LocationList], Error])
def get_all_locations(repo: LocationRepository = Depends()):
    return repo.get_all_locations()


@router.get(
    "/locations/{location_id}", response_model=Union[LocationDetails, Error]
)
def get_location_details(
    location_id: int, repo: LocationRepository = Depends()
) -> LocationDetails:
    return repo.get_details(location_id)
