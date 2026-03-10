from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
import smtplib
from email.message import EmailMessage
import os

router = APIRouter()

class EmailPayload(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

@router.post("/send", status_code=status.HTTP_200_OK)
def send_email_contact(payload: EmailPayload):
    """
    Sends an email to the admin using SMTP.
    Requires SMTP_SERVER, SMTP_PORT, SMTP_USERNAME, and SMTP_PASSWORD env vars.
    """
    smtp_server = os.environ.get("SMTP_SERVER", "smtp.gmail.com")
    smtp_port = int(os.environ.get("SMTP_PORT", 587))
    smtp_username = os.environ.get("SMTP_USERNAME")
    smtp_password = os.environ.get("SMTP_PASSWORD")
    
    # The email address receiving the contact forms
    admin_email = os.environ.get("ADMIN_EMAIL", smtp_username)
    
    if not smtp_username or not smtp_password:
        # If not configured, just return success for development/testing
        print(f"Mock Email Sent from {payload.name} ({payload.email}): {payload.subject}\n{payload.message}")
        return {"message": "Email logged (SMTP credentials not configured)"}

    try:
        msg = EmailMessage()
        msg.set_content(f"New contact form submission from {payload.name} ({payload.email}):\n\n{payload.message}")
        msg['Subject'] = f"Portfolio Contact: {payload.subject}"
        msg['From'] = smtp_username
        msg['To'] = admin_email
        msg['Reply-To'] = payload.email

        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(smtp_username, smtp_password)
            server.send_message(msg)
            
        return {"message": "Email sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")
