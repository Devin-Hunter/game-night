from fastapi import APIRouter, Depends, HTTPException
from typing import Union, List
from queries.games import (
    Error,
    GameIn,
    GameOut,
    GameRepo,
)
from authenticator import authenticator


router = APIRouter()


@router.post("/api/games", response_model=Union[GameOut, Error])
def create_game(
    game: GameIn,
    repo: GameRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create_game(game)


@router.get("/api/games", response_model=Union[List[GameOut], Error])
def list_all_games(
    repo: GameRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.list_all_games()


@router.get("/api/games/{game_id}", response_model=GameOut)
def get_game_details(
    game_id: int,
    repo: GameRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> GameOut:
    return repo.get_game_details(game_id)


@router.put(
    "/api/games/update/{game_id}",
    response_model=Union[GameOut, Error],
)
def update_game(
    game_id: int,
    game: GameIn,
    repo: GameRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, GameOut]:
    return repo.update_game(game_id, game)


@router.delete("/api/games/{game_id}", response_model=bool)
def delete_game(
    game_id: int,
    repo: GameRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete_game(game_id)


@router.post(
    "/api/games/{game_id}/add_to_owned",
    response_model=Union[bool, Error],
)
def add_to_owned(
    game_id: int,
    repo: GameRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[bool, Error]:
    if not account_data:
        raise HTTPException(status_code=401, detail="Unauthorized")
    member_id = account_data["id"]
    return repo.add_game_to_owned(member_id, game_id)


@router.post(
    "/api/games/{game_id}/add_to_wishlist",
    response_model=Union[bool, Error],
)
def add_to_wishlist(
    game_id: int,
    repo: GameRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[bool, Error]:
    if not account_data:
        raise HTTPException(status_code=401, detail="Unauthorized")
    member_id = account_data["id"]
    return repo.add_game_to_wishlist(member_id, game_id)


@router.post(
    "/api/games/{game_id}/add_to_favorites",
    response_model=Union[bool, Error],
)
def add_to_favorites(
    game_id: int,
    repo: GameRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[bool, Error]:
    if not account_data:
        raise HTTPException(status_code=401, detail="Unauthorized")
    member_id = account_data["id"]
    return repo.add_game_to_favorites(member_id, game_id)


@router.get(
    "/api/members/me/favorite_games",
    response_model=Union[List[GameOut], Error],
)
def list_favorite_games(
    repo: GameRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[List[GameOut], Error]:
    if not account_data:
        raise HTTPException(status_code=401, detail="Unauthorized")
    member_id = account_data["id"]
    return repo.list_favorite_games(member_id)


@router.get(
    "/api/members/me/owned_games",
    response_model=Union[List[GameOut], Error],
)
def list_owned_games(
    repo: GameRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[List[GameOut], Error]:
    if not account_data:
        raise HTTPException(status_code=401, detail="Unauthorized")
    member_id = account_data["id"]
    return repo.list_owned_games(member_id)


@router.get(
    "/api/members/me/wishlist_games",
    response_model=Union[List[GameOut], Error],
)
def list_wishlist_games(
    repo: GameRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[List[GameOut], Error]:
    if not account_data:
        raise HTTPException(status_code=401, detail="Unauthorized")
    member_id = account_data["id"]
    return repo.list_wishlist_games(member_id)


@router.delete(
    "/api/games/{game_id}/remove_from_owned",
    response_model=Union[bool, Error],
)
def remove_from_owned(
    game_id: int,
    repo: GameRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[bool, Error]:
    if not account_data:
        raise HTTPException(status_code=401, detail="Unauthorized")
    member_id = account_data["id"]
    return repo.remove_game_from_owned(member_id, game_id)


@router.delete(
    "/api/games/{game_id}/remove_from_wishlist",
    response_model=Union[bool, Error],
)
def remove_from_wishlist(
    game_id: int,
    repo: GameRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[bool, Error]:
    if not account_data:
        raise HTTPException(status_code=401, detail="Unauthorized")
    member_id = account_data["id"]
    return repo.remove_game_from_wishlist(member_id, game_id)


@router.delete(
    "/api/games/{game_id}/remove_from_favorites",
    response_model=Union[bool, Error],
)
def remove_from_favorites(
    game_id: int,
    repo: GameRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[bool, Error]:
    if not account_data:
        raise HTTPException(status_code=401, detail="Unauthorized")
    member_id = account_data["id"]
    return repo.remove_game_from_favorites(member_id, game_id)
