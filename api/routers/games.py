from fastapi import APIRouter, Depends
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
    # account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create_game(game)


@router.get("/api/games", response_model=Union[List[GameOut], Error])
def list_all_games(
    repo: GameRepo = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.list_all_games()


@router.get("/api/games/{game_id}", response_model=GameOut)
def get_game_details(
    game_id: int,
    repo: GameRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> GameOut:
    return repo.get_game_details(game_id)


@router.put("/api/games/{game_id}", response_model=Union[GameOut, Error])
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


# @router.post("/api/members/{member_id}/games/{game_id}/add_to_owned"
@router.post(
    "/api/games/{game_id}/add_to_owned/{member_id}",
    response_model=Union[bool, Error],
)
def add_to_owned(
    game_id: int,
    member_id: int,
    repo: GameRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[bool, Error]:
    return repo.add_game_to_owned(member_id, game_id)


# @router.post("/api/members/{member_id}/games/{game_id}/add_to_wishlist"
@router.post(
    "/api/games/{game_id}/add_to_wishlist/{member_id}",
    response_model=Union[bool, Error],
)
def add_to_wishlist(
    game_id: int,
    member_id: int,
    repo: GameRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[bool, Error]:
    return repo.add_game_to_wishlist(member_id, game_id)


# @router.post("/api/members/{member_id}/games/{game_id}/add_to_favorites"
# @router.post("/api/members/{member_id}/games/{game_id}/add_to_favorites"
@router.post(
    "/api/games/{game_id}/add_to_favorites/{member_id}",
    response_model=Union[bool, Error],
)
def add_to_favorites(
    game_id: int,
    member_id: int,
    repo: GameRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[bool, Error]:
    return repo.add_game_to_favorites(member_id, game_id)


# @router.delete("/api/members/{member_id}/games/{game_id}/remove_from_owned"
@router.delete(
    "/api/games/{game_id}/remove_from_owned/{member_id}",
    response_model=Union[bool, Error],
)
def remove_from_owned(
    game_id: int,
    member_id: int,
    repo: GameRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[bool, Error]:
    return repo.remove_game_from_owned(member_id, game_id)


# @router.delete("/api/members/{member_id}/games/{game_id}/remove_from_wishlist"
@router.delete(
    "/api/games/{game_id}/remove_from_wishlist/{member_id}",
    response_model=Union[bool, Error],
)
def remove_from_wishlist(
    game_id: int,
    member_id: int,
    repo: GameRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[bool, Error]:
    return repo.remove_game_from_wishlist(member_id, game_id)


# @router.delete(
#     "/api/members/{member_id}/games/{game_id}/remove_from_favorites"
# )
@router.delete(
    "/api/games/{game_id}/remove_from_favorites/{member_id}",
    response_model=Union[bool, Error],
)
def remove_from_favorites(
    game_id: int,
    member_id: int,
    repo: GameRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[bool, Error]:
    return repo.remove_game_from_favorites(member_id, game_id)


@router.get(
        "/api/members/{member_id}/favorite_games",
        response_model=Union[List[GameOut], Error])
def list_favorite_games(
        member_id: int,
        repo: GameRepo = Depends(),
        # account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[List[GameOut], Error]:
    return repo.list_favorite_games(member_id)


@router.get(
        "/api/members/{member_id}/owned_games",
        response_model=Union[List[GameOut], Error])
def list_owned_games(
        member_id: int,
        repo: GameRepo = Depends(),
        # account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[List[GameOut], Error]:
    return repo.list_owned_games(member_id)


@router.get(
        "/api/members/{member_id}/wishlist_games",
        response_model=Union[List[GameOut], Error])
def list_wishlist_games(
        member_id: int,
        repo: GameRepo = Depends(),
        # account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[List[GameOut], Error]:
    return repo.list_wishlist_games(member_id)
