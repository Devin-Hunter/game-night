from main import app
from queries.members import MemberRepo
from authenticator import authenticator
from fastapi.testclient import TestClient

client = TestClient(app)

class DummyMemberRepo:
    def get_all_members(self):
        return []

class CreateMemberRepo:
    def create_member(self, member):
        result = {
            "id": 1,
            "first_name": "first name",
            "last_name": "last name",
            "username": "username",
            "hashed_password": "165189845asdf1",
            "age": 1,
            "skill_level": "skill",
            "about": "about",
            "location_id": 1
        }
        result.update(member)
        return result
    
def mock_member_data():
    return {
            "id": 1,
            "first_name": "first name",
            "last_name": "last name",
            "username": "username",
            "hashed_password": "165189845asdf1",
            "age": 1,
            "skill_level": "skill",
            "about": "about",
            "location_id": 1
        }

def test_get_members():
    app.dependency_overrides[MemberRepo] = DummyMemberRepo
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = mock_member_data
    response = client.get("/users")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []

def test_create_member():
    