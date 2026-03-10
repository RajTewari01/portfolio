from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import projects, emails

app = FastAPI(
    title="Portfolio Suite API",
    description="Backend for the Professional Portfolio Suite",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for development
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Portfolio API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Include Routers
app.include_router(projects.router, prefix="/api/v1/projects", tags=["projects"])
app.include_router(emails.router, prefix="/api/v1/emails", tags=["emails"])

