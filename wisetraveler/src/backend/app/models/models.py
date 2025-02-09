from pydantic import BaseModel
from typing import List

class ItineraryRequest(BaseModel):
    query: str

class RouteRequest(BaseModel):
    locations: List[str]
