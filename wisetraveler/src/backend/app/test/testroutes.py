from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_generate_itinerary():
    response = client.post("/generate-itinerary", json={"query": "Visit Spain and Portugal."})
    assert response.status_code == 200
    assert "itinerary" in response.json()
    assert "locations" in response.json()

def test_optimize_route():
    response = client.post("/optimize-route", json={"locations": ["Madrid", "Lisbon"]})
    assert response.status_code == 200
    assert "route" in response.json()
    assert "maps_url" in response.json()

def test_optimize_route_invalid():
    response = client.post("/optimize-route", json={"locations": []})
    assert response.status_code == 400
    assert response.json()["detail"] == "At least two locations are required."
