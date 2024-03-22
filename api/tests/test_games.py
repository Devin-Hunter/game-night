from fastapi.testclient import TestClient
from main import app
from queries.games import GameRepo
from authenticator import authenticator

client = TestClient(app)


class EmptyGameRepo:
    def list_all_games(self):
        return []


class CreateGameRepo:
    def create_game(self, game):
        result = {
            "id": 1,
            "title": "string",
            "year": 1,
            "min_players": 1,
            "max_players": 1,
            "play_time": "string",
            "age": "string",
            "description": "string",
            "rules": "string",
            "picture": "string",
            "video": "string",
            "complexity": "string",
            "category": "string",
            "rating": 1
        }
        result.update(game)
        return result


def mock_account_data():
    return {
        "id": 1,
        "title": "string",
        "year": 1,
        "min_players": 1,
        "max_players": 1,
        "play_time": "string",
        "age": "string",
        "description": "string",
        "rules": "string",
        "picture": "string",
        "video": "string",
        "complexity": "string",
        "category": "string",
        "rating": 1
    }


def test_get_all_games():
    app.dependency_overrides[GameRepo] = EmptyGameRepo
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = mock_account_data
    response = client.get("/api/games")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []


def test_create_game():
    app.dependency_overrides[GameRepo] = CreateGameRepo
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = mock_account_data
    game = {
        "title": "Takenoko",
        "year": 2019,
        "min_players": 2,
        "max_players": 5,
        "play_time": "30 min to 1 hour ",
        "age": "12+",
        "description": "this is a test",
        "rules": "this is a test",
        "picture": "https://pic1912529.jpg",
        "video": "https://www.youtube.com/watch?v=U725y9I-msE",
        "complexity": "Serene Enigma",
        "category": "Animals, Family, Strategy",
        "rating": 3
    }
    response = client.post("/api/games", json=game)
    app.dependency_overrides.clear()
    expected = game
    expected["id"] = 1
    assert response.status_code == 200
    assert response.json() == expected


def test_init():
    assert 1 == 1
