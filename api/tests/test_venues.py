from fastapi.testclient import TestClient
from main import app
from queries.venues import VenueRepository
from authenticator import authenticator

client = TestClient(app)


class EmptyVenueRepo:
    def get_in_person_venues(self):
        return []


class CreateVenueRepo:
    def create(self, venue):
        result = {
            "id": 1,
            "venue_name": "str",
            "online_link": "str",
            "location_id": 1,
            "hours_operation": "str",
            "phone_number": "str",
            "venue_type": "str",
            "reservation_req": "bool"
        }
        result.update(venue)
        return result


def mock_venue_data():
    return {
        "id": 1,
        "venue_name": "str",
        "online_link": "str",
        "location_id": 1,
        "hours_operation": "str",
        "phone_number": "str",
        "venue_type": "str",
        "reservation_req": "bool"
    }


def test_get_in_person_venues():
    app.dependency_overrides[VenueRepository] = EmptyVenueRepo
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = mock_venue_data
    response = client.get("/venues/inperson")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []


def test_create_venue():
    app.dependency_overrides[VenueRepository] = CreateVenueRepo
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = mock_venue_data
    venue = {
       "id": 1,
        "venue_name": "Santa's House",
        "online_link": "santashouse.com",
        "location_id": 1,
        "hours_operation": "None",
        "phone_number": "555-123-4567",
        "venue_type": "Residential",
        "reservation_req": False
    }
    response = client.post("/venues", json=venue)
    app.dependency_overrides.clear()
    expected = venue
    expected["id"] = 1
    assert response.status_code == 200
    assert response.json() == expected


def test_init():
    assert 1 == 1
