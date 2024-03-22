from fastapi.testclient import TestClient
from main import app
from queries.events import EventRepo

client = TestClient(app)


class EmptyEventRepo:
    def list_all_events(self):
        return []


def get_all_events():
    app.dependency_overrides[EventRepo] = EmptyEventRepo
    token = (
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
        'eyJqdGkiOiIyNzlkMWM0Ni01NGMxLTRmNGQtYTE4ZC02ZDYxZDFl'
        'MWM0YWIiLCJleHAiOjE3MTEwNjYyMTUsInN1YiI6Imthc3N5IiwiYWNjb3Vu'
        'dCI6eyJpZCI6MSwiZmlyc3RfbmFtZSI6Imthc3NhbmRyYSIsImxhc3RfbmFtZS'
        'I6InZhc3F1ZXoiLCJ1c2VybmFtZSI6Imthc3N5IiwiYWdlIjoyMSwic2tpbGxfbGV2ZW'
        'wiOiIiLCJhYm91dCI6Imh1bWFuIiwibG9jYXRpb25faWQiOjF9fQ.'
        'no2apIKnBEo2OX77gb1Mw_ibdVLMtwsOCo38bNgOEqw')
    response = client.get('/events',
                          headers={"Authorization": f"Bearer {token}"})
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == {'events': []}


def test_init():
    assert 1 == 1
