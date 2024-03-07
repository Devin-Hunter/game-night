from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.venues import (
    Error,
    VenueIn,
    VenueOut,
    VenuesOnline,
    VenuesInPerson,
    VenueDetails,
    VenueRepository,
)


router = APIRouter()


@router.post("/venues", response_model=Union[VenueOut, Error])
def create_venue(
    venue: VenueIn, response: Response, repo: VenueRepository = Depends()
):
    return repo.create(venue)


@router.get("/venues/online", response_model=Union[Error, List[VenuesOnline]])
def get_online_list(repo: VenueRepository = Depends()):
    return repo.get_online_venues()


@router.get(
    "/venues/inperson", response_model=Union[Error, List[VenuesInPerson]]
)
def get_in_person_list(repo: VenueRepository = Depends()):
    return repo.get_in_person_venues()


@router.get("/venues/{venue_id}", response_model=Union[VenueDetails, Error])
def get_venue_details(
    venue_id: int,
    repo: VenueRepository = Depends(),
) -> VenueOut:
    return repo.get_details(venue_id)


@router.put("/venues/{venue_id}", response_model=Union[VenueOut, Error])
def update_venue(
    venue_id: int,
    venue: VenueIn,
    repo: VenueRepository = Depends(),
) -> Union[Error, VenueOut]:
    return repo.update(venue_id, venue)


@router.delete("/venues/{venue_id}", response_model=bool)
def delete_venue(
    venue_id: int,
    repo: VenueRepository = Depends(),
) -> bool:
    return repo.delete(venue_id)
