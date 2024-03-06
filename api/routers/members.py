from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
    Response,
    Request
    )
from jwtdown_fastapi.authentication import Token
from pydantic import BaseModel
from authenticator import authenticator
from queries.members import (
    MemberIn,
    MemberOut,
    MemberRepo,
    Error,
    DuplicateAccountError
    )
from typing import List, Union

router = APIRouter()


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: MemberOut


class HttpError(BaseModel):
    detail: str


@router.get('/users', response_model=Union[List[MemberOut], Error])
def get_all_members(
    repo: MemberRepo = Depends(),
):
    return repo.get_all()


@router.post('/user',  response_model=AccountToken | HttpError)
async def create_member(
    info: MemberIn,
    request: Request,
    response: Response,
    repo: MemberRepo = Depends()
):
    print('password:', info.password)
    hashed_password = authenticator.hash_password(info.password)
    print('hashed password:', hashed_password) # this works
    try:
        print('try block start') #this works
        member = repo.new_member(info, hashed_password)
        print('account from create method:', member) #prints {'message': 'Could not create new member'}
        print('end try block') #prints
    except DuplicateAccountError:
        print('exception block')
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='username already exists, please try another'
        )
    form = AccountForm(username=info.username, password=info.password)
    token= await authenticator.login(response, request, form, repo)
    print('token:', token)
    return AccountToken(account=member, **token.dict())



# @router.get('/user/{user_id}')
# def member_details():
#     pass


# @router.put('/user/{user_id}')
# def update_member():
#     pass


# @router.get('user/{user_id}/events')
# def member_events():
#     pass


# @router.get('user/{user_id}/games')
# def member_games():
#     pass
