import os
import json
import firebase_admin
from firebase_admin import credentials, firestore, auth
from app.core.config import settings

def init_firebase():
    """Initialize Firebase Admin SDK. Fallback safely if no credentials found locally to prevent crash."""
    if not firebase_admin._apps:
        try:
            if settings.FIREBASE_CREDENTIALS_JSON:
                try:
                    cert_dict = json.loads(settings.FIREBASE_CREDENTIALS_JSON)
                    cred = credentials.Certificate(cert_dict)
                    firebase_admin.initialize_app(cred)
                    print("Firebase initialized with JSON env.")
                    return
                except Exception as e:
                    print(f"Failed to initialize Firebase with JSON from env: {e}")
            
            cred_path = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS")
            if cred_path and os.path.exists(cred_path):
                cred = credentials.Certificate(cred_path)
                firebase_admin.initialize_app(cred)
                print("Firebase initialized with local file.")
            else:
                # To prevent the backend from hard crashing on local dev without creds:
                print("WARNING: No Firebase Credentials found. Firebase Auth dependent routes will fail.")
                # We will NOT initialize_app() here without creds to avoid the DefaultCredentialsError
        except Exception as e:
            print(f"Firebase Init Error caught: {e}")

# Call init on import
init_firebase()

def get_db():
    if not firebase_admin._apps:
        raise Exception("Firebase Admin is not configured. Database unavailable.")
    return firestore.client()

def verify_token(id_token: str):
    if not firebase_admin._apps:
        raise Exception("Firebase Admin is not configured. Authentication unavailable.")
    return auth.verify_id_token(id_token)
