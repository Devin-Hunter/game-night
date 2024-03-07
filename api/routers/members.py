from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
    Response,
    Request
    )
from jwtdown_fastapi.authentication import Token
from pydantic import BaseModel, ValidationError
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


@router.get('/api/protected', response_model=bool)
async def get_token(request: Request, account_data: dict = Depends(authenticator.get_current_account_data)):
    return True


@router.get('/token', response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: MemberOut = Depends(authenticator.try_get_current_account_data)
):
  if account and authenticator.cookie_name in request.cookies:
      return {
          'access_token': request.cookies[authenticator.cookie_name],
          'type': 'Bearer',
          'account': account,
        }


@router.get('/users', response_model=Union[List[MemberOut], Error])
def get_all_members(
    request: Request,
    repo: MemberRepo = Depends(),
    account_data: MemberOut = Depends(authenticator.try_get_current_account_data)
):
    if account_data and authenticator.cookie_name in request.cookies:
        return repo.get_all()
    



@router.post('/user',  response_model=AccountToken | HttpError)
async def create_member(
    info: MemberIn,
    request: Request,
    response: Response,
    repo: MemberRepo = Depends()
):

    hashed_password = authenticator.hash_password(info.password)

    try:
        member = repo.new_member(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='username already exists, please try another'
        )
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=member, **token.dict())


@router.get('/user/{user_id}')
def member_details(
    user_id: int,
    request: Request,
    repo: MemberRepo = Depends(),
    account_data: MemberOut = Depends(authenticator.try_get_current_account_data)
) ->MemberOut:
    print(account_data)
    if account_data and authenticator.cookie_name in request.cookies:
        user_id = account_data['id']
        return repo.get(user_id)
    else:
        return 'Not logged in. Please log in to view member details.'


# @router.put('/user/{user_id}')
# def update_member():
#     pass


# @router.get('user/{user_id}/events')
# def member_events():
#     pass


# @router.get('user/{user_id}/games')
# def member_games():
#     pass
