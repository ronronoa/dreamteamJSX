import os

from dotenv import load_dotenv

load_dotenv()

GOOGLE_API_KEY= os.getenv("GOOGLE_API_KEY")


def validate_config():
    required = {
        "GOOGLE_API_KEY": GOOGLE_API_KEY,
    }

    missing = []

    for name, value in required.items():
        if not value:
            missing.append(name)

    if missing:
        raise RuntimeError( "Missing required environment variables: " + ", ".join(missing))
