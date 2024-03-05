from fastapi import APIRouter, Depends
from typing import Union
from queries.games import (
    Error,
    GameIn,
    GameOut,
    GameRepo,
)


router = APIRouter()


@router.post("/api/games", response_model=Union[GameOut, Error])
def create_game(
    game: GameIn,
    repo: GameRepo = Depends(),
):
    return repo.create_game(game)


@router.get("/api/games")
def list_all_games(
    repo: GameRepo = Depends(),
):
    return repo.list_all_games()


@router.get("/api/games/{game_id}")
def get_game_details():
    pass


@router.put("/api/games/{game_id}")
def update_game():
    pass


@router.delete("/api/games/{game_id}")
def delete_game():
    pass
