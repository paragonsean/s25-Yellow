import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.routes import router as api_router
from app.services import (
    parse_locations,
    fetch_place_details,
    call_create_route_function,
    generate_google_maps_url
)
from app.config import Config

# Initialize FastAPI app
app = FastAPI(
    title="Travel Itinerary API",
    description="API for generating and optimizing travel routes",
    version="1.0.0",
)

# Enable CORS (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes from `routes.py`
app.include_router(api_router, prefix="/api")

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to the Travel Itinerary API!"}

# Run the application if executed directly
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)