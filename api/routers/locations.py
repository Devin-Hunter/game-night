from fastapi import APIRouter, Depends
from queries.locations import LocationIn, LocationOut, LocationRepo, Error
from typing import List, Union

router = APIRouter()


@router.get('/locations', response_model=Union[List[LocationOut], Error])
def get_all_locations(
    repo: LocationRepo = Depends(),
):
    return repo.get_all()

@router.post('/locations', response_model=Union[LocationOut, Error])
def create_location(
    location: LocationIn,
    repo: LocationRepo = Depends()
):
    print('location:', location)
    print('repo:', repo)
    return repo.create_location(location)