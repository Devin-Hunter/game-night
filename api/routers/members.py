from fastapi import APIRouter, Depends
from queries.members import MemberIn, MemberOut, MemberRepo
from datetime import date
#from authenticator import authenticator

router = APIRouter()

#--------------------------------EDIT AUTH ROUTER-----------------------------
#@router.post('/api/users', response_model= AccountToken | HttpError)
# async def create_token(
#     #account_data: dict = Depends(authenticator.get_account_data),
# ):
    # pass
#--------------------------------EDIT AUTH ROUTER-----------------------------
# @router.get('/users')
# def get_all_members()

@router.post('/user')
def create_member(
    member: MemberIn,
    repo: MemberRepo = Depends()
):
    print('member:', member)
    print('repo:', repo)
    repo.new_member(member)
    return member
    

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
