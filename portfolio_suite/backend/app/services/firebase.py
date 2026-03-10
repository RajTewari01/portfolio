import os
import json
import firebase_admin
from firebase_admin import credentials, firestore, auth
from app.core.config import settings

def init_firebase():
    """Initialize Firebase Admin SDK."""
    if not firebase_admin._apps:
        # Check if we have credentials as a JSON string in environment (useful for Vercel deployment)
        if settings.FIREBASE_CREDENTIALS_JSON:
            try:
                cert_dict = json.loads(settings.FIREBASE_CREDENTIALS_JSON)
                cred = credentials.Certificate(cert_dict)
                firebase_admin.initialize_app(cred)
            except Exception as e:
                print(f"Failed to initialize Firebase with JSON from env: {e}")
        else:
            # Fallback to local credential file if available, otherwise default application credentials
            cred_path = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS")
            if cred_path and os.path.exists(cred_path):
                cred = credentials.Certificate(cred_path)
                firebase_admin.initialize_app(cred)
            else:
                # Let Firebase Admin try to find default credentials
                try:
                    firebase_admin.initialize_app()
                except Exception as e:
                    print(f"Warning: Firebase Admin initialized without explicit credentials: {e}")

# Call init on import so the app is ready
init_firebase()

def get_db():
    return firestore.client()

def verify_token(id_token: str):
    return auth.verify_id_token(id_token)
