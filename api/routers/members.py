from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
    Response,
    Request,
)
from jwtdown_fastapi.authentication import Token
from pydantic import BaseModel
from authenticator import authenticator
from queries.members import (
    MemberIn,
    MemberOut,
    MemberUpdate,
    MemberRepo,
    Error,
    DuplicateAccountError,
)
from queries.events import EventOut
# from queries.games import GameOut
from typing import List, Union

router = APIRouter()


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: MemberOut


class HttpError(BaseModel):
    detail: str


@router.get("/users", response_model=Union[List[MemberOut], Error])
def get_all_members(
    request: Request,
    repo: MemberRepo = Depends(),
    account_data: MemberOut = Depends(
        authenticator.try_get_current_account_data
    )
):
    if account_data and authenticator.cookie_name in request.cookies:
        return repo.get_all()


@router.get('/user/{username}', response_model=Union[MemberOut, Error])
def member_details(
    username: str,
    request: Request,
    repo: MemberRepo = Depends(),
    account_data: MemberOut = Depends(
        authenticator.try_get_current_account_data
    )
) -> MemberOut:
    print(account_data)
    if account_data and authenticator.cookie_name in request.cookies:
        return repo.get(username)


@router.post('/user',  response_model=AccountToken | HttpError)
async def create_member(
    info: MemberIn,
    request: Request,
    response: Response,
    repo: MemberRepo = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        member = repo.new_member(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="username already exists, please try another",
        )
    print('INFO from router', info)
    form = AccountForm(username=info.username, password=info.password)
    print('FORM', form)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=member, **token.dict())


@router.put('/user/{username}', response_model=Union[MemberOut, Error])
def update_member(
    username: str,
    request: Request,
    info: MemberUpdate,
    repo: MemberRepo = Depends(),
    account_data: MemberOut = Depends(
        authenticator.try_get_current_account_data
    )
) -> Union[MemberOut, Error]:
    if account_data and authenticator.cookie_name in request.cookies:
        return repo.update_member(username, info)


@router.get(
        '/user/{username}/events/spectator',
        response_model=Union[List[EventOut], Error]
)
def member_spec_events(
    username: str,
    request: Request,
    repo: MemberRepo = Depends(),
    account_data: MemberOut = Depends(
        authenticator.try_get_current_account_data
    )
) -> bool:
    member_id = account_data['id']
    if account_data and authenticator.cookie_name in request.cookies:
        return repo.get_member_attending_events(member_id)


@router.get(
        '/user/{username}/events/player',
        response_model=Union[List[EventOut], Error]
)
def member_player_events(
    username: str,
    request: Request,
    repo: MemberRepo = Depends(),
    account_data: MemberOut = Depends(
        authenticator.try_get_current_account_data
    )
) -> bool:
    member_id = account_data['id']
    if account_data and authenticator.cookie_name in request.cookies:
        return repo.get_member_player_events(member_id)


# @router.get(
#         '/user/{username}/games/owned',
#         response_model=Union[List[GameOut], Error]
# )
# def owned_games(
#     username: str,
#     request: Request,
#     repo: MemberRepo = Depends(),
#     account_data: MemberOut = Depends(
#         authenticator.try_get_current_account_data
#     )
# ) -> bool:
#     member_id = account_data['id']
#     if account_data and authenticator.cookie_name in request.cookies:
#         return repo.get_owned_games(member_id)


# @router.get(
#         '/user/{username}/games/wishlist',
#         response_model=Union[List[GameOut], Error]
# )
# def wishlist_games(
#     username: str,
#     request: Request,
#     repo: MemberRepo = Depends(),
#     account_data: MemberOut = Depends(
#         authenticator.try_get_current_account_data
#     )
# ):
#     member_id = account_data['id']
#     if account_data and authenticator.cookie_name in request.cookies:
#         return repo.get_wishlist_games(member_id)


# @router.get(
#         '/user/{username}/games/favorites',
#         response_model=Union[List[GameOut], Error]
# )
# def favorite_games(
#     username: str,
#     request: Request,
#     repo: MemberRepo = Depends(),
#     account_data: MemberOut = Depends(
#         authenticator.try_get_current_account_data
#     )
# ):
#     member_id = account_data['id']
#     if account_data and authenticator.cookie_name in request.cookies:
#         return repo.get_favorite_games(member_id)
