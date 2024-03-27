from main import app
from queries.members import MemberRepo, MemberOutWithPassword
from authenticator import authenticator
from fastapi.testclient import TestClient

client = TestClient(app)


class DummyMemberRepo:
    def get_all(self):
        return []


class CreateMemberRepo:
    def new_member(self, member, hashed_password):
        result = {
            "first_name": "string",
            "last_name": "string",
            "username": "string",
            "age": 1,
            "skill_level": "text",
            "about": "text",
            "location_id": 1,
            "hashed_password": "string",
        }
        result.update(member)
        return result

    def get(self, username):
        result = {
            "id": 1,
            "first_name": "Julie",
            "last_name": "Andrews",
            "username": "Poppins",
            "hashed_password": "165189845asdf1",
            "age": 75,
            "skill_level": "Master",
            "about": "This is an about section",
            "location_id": 1,
        }

        return MemberOutWithPassword(**result)


def mock_member_data():
    return {
            "first_name": "string",
            "last_name": "string",
            "username": "string",
            "password": "string",
            "age": 1,
            "skill_level": "text",
            "about": "text",
            "location_id": 1,
        }


def test_get_members():
    app.dependency_overrides[MemberRepo] = DummyMemberRepo
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = mock_member_data
    response = client.get(
        "/users",
        cookies={"fastapi_token": "eyJhbGciOiJIUz91dCI6IlVwZGF0"}
    )
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []
