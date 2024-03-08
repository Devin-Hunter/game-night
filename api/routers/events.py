from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.events import (Error, EventIn, EventRepo, EventOut, EventList)
from authenticator import authenticator

router = APIRouter()


@router.post("/events", response_model=Union[EventOut, Error])
def create_event(event: EventIn,
                 response: Response,
                 repo: EventRepo = Depends(),
                 account_data: dict =
                 Depends(authenticator.get_current_account_data),
                 ):
    return repo.create_event(event)


@router.get("/events", response_model=Union[List[EventList], Error])
def list_events(repo: EventRepo = Depends(),):
    return repo.list_all()


@router.get("/events/{event_id}", response_model=Union[EventOut, Error])
def event_details(event_id: int,
                  repo: EventRepo = Depends(),
                  ) -> EventOut:
    return repo.event_details(event_id)


@router.put("/user/{user_id}/events/{event_id}",
            response_model=Union[EventOut, Error])
def update_event(event_id: int,
                 event: EventIn,
                 repo: EventIn = Depends(),
                 account_data: dict =
                 Depends(authenticator.get_current_account_data),
                 ) -> Union[Error, EventOut]:
    return repo.update(event_id, event)


@router.delete("/user/{user_id}/events/{event_id}",
               response_model=bool)
def delete_event(event_id: int, repo: EventRepo = Depends(),
                 account_data: dict =
                 Depends(authenticator.get_current_account_data),
                 ) -> bool:
    return repo.delete(event_id)
