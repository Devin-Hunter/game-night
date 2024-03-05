from fastapi import APIRouter, Depends
from queries.locations import LocationIn, LocationOut, LocationRepo, Error
from typing import List, Union

router = APIRouter()

@router.get('/locations', response_model=Union[List[LocationOut], Error])
def get_all_locations(
    repo: LocationRepo = Depends(),
):
    return repo.get_all()