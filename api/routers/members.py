from fastapi import APIRouter

router = APIRouter

@router.post('/user')
def create_member():
    pass

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
