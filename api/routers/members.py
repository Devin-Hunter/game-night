from fastapi import APIRouter, Depends
from queries.members import MemberIn, MemberOut, MemberRepo, Error
from typing import List, Union
from authenticator import authenticator

router = APIRouter()


# --------------------------------EDIT AUTH ROUTER-----------------------------
# @router.post('/api/users', response_model=AccountToken | HttpError)
# async def create_token(
#     account_data: dict = Depends(authenticator.get_account_data),
# ):
# --------------------------------EDIT AUTH ROUTER-----------------------------
@router.get('/users', response_model=Union[List[MemberOut], Error])
def get_all_members(
    repo: MemberRepo = Depends(),
):
    return repo.get_all()


@router.post('/user', response_model=Union[MemberOut, Error])
def create_member(
    member: MemberIn,
    repo: MemberRepo = Depends()
):
    print('member:', member)
    print('repo:', repo)
    return repo.new_member(member)


@router.get('/user/{user_id}')
def member_details():
    pass


@router.put('/user/{user_id}')
def update_member():
    pass


@router.get('user/{user_id}/events')
def member_events():
    pass


@router.get('user/{user_id}/games')
def member_games():
    pass
