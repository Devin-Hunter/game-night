from fastapi import APIRouter, Depends, Response
from typing import List, Union
from authenticator import authenticator
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
    # account_data: dict = Depends(authenticator.get_current_account_data),
    repo: LocationRepository = Depends(),
):
    return repo.create(location)


@router.get("/locations", response_model=Union[List[LocationList], Error])
def get_all_locations(
    repo: LocationRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all_locations()


@router.get(
    "/locations/{location_id}", response_model=Union[LocationDetails, Error]
)
def get_location_details(
    location_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: LocationRepository = Depends(),
) -> LocationDetails:
    return repo.get_details(location_id)
