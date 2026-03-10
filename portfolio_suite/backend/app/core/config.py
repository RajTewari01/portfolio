import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Portfolio Suite API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Needs to be provided in environment variables for deployment
    FIREBASE_CREDENTIALS_JSON: str | None = None

    class Config:
        env_file = ".env"

settings = Settings()
