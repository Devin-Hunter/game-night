from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.events import Error, EventIn, EventRepo, EventOut, EventList
from authenticator import authenticator

router = APIRouter()


@router.post("/events/new", response_model=Union[EventOut, Error])
def create_event(
    event: EventIn,
    response: Response,
    repo: EventRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create_event(event)


@router.get("/events", response_model=Union[List[EventList], Error])
def list_events(repo: EventRepo = Depends()):
    return repo.list_all()


@router.get("/events/{event_id}", response_model=Union[EventOut, Error])
def event_details(
    event_id: int,
    repo: EventRepo = Depends(),
) -> EventOut:
    return repo.event_details(event_id)


@router.put(
    "/user/{user_id}/events/{event_id}", response_model=Union[EventOut, Error]
)
def update_event(
    user_id: int,
    event_id: int,
    event: EventIn,
    repo: EventRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, EventOut]:
    return repo.update_event(user_id, event_id, event)


@router.delete("/user/events/{event_id}", response_model=bool)
def delete_event(
    event_id: int,
    repo: EventRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(event_id)


@router.post(
    "/events/{event_id}/member_events/{member_id}/is_player",
    response_model=Union[bool, Error],
)
def is_player(
    event_id: int,
    member_id: int,
    repo: EventRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[bool, Error]:
    return repo.is_player(member_id, event_id)


@router.post(
    "/events/{event_id}/members_events/{member_id}/is_spectator",
    response_model=bool,
)
def is_spectator(
    event_id: int,
    member_id: int,
    repo: EventRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[bool, Error]:
    return repo.is_spectator(member_id, event_id)


@router.delete(
    "/events/{event_id}/members_events/{member_id}",
    response_model=Union[bool, Error],
)
def delete_attendance_status(
    member_id: int,
    event_id,
    repo: EventRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[bool, Error]:
    return repo.delete_attendance_status(member_id, event_id)


@router.delete(
    "/events/{event_id}/members_events",
    response_model=Union[bool, Error],
)
def delete_members_events(
    event_id,
    repo: EventRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[bool, Error]:
    return repo.delete_event(event_id)
