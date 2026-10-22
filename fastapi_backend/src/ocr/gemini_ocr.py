from google.genai import types
from PIL import Image

from src.config import GOOGLE_API_KEY


class GeminiOCR:
    _MODEL_NAME = "gemini-3.5-flash-lite"
    _GOOGLE_API_KEY = GOOGLE_API_KEY

    _GEMINI_TIMEOUT_SECONDS = 20

    _client = None

    _PROMPT = (
        "Analyze the data in this image and return it as raw JSON only. "
        "Do not wrap the JSON in markdown code fences (no ```json or ```). "
        "Do not explain your answer. "
        "Do not add labels, punctuation, or extra text before or after the JSON. "
        "If a field is blank/unfilled in the image, return an empty string \"\" "
        "for text fields, null for numbers, and false for unchecked checkboxes. "
        "The format should be:\n"
        "{\n"
        '  "requestFor": "TRANSPORT_ASSISTANCE" | "EMERGENCY" | "INTER_FACILITY_TRANSFER" | "FIRST_AID", \n'
        '  "date": string,\n'
        '  "time": string,\n'
        '  "from": string,\n'
        '  "to": string,\n'
        '  "patient": {\n'
        '    "name": string,\n'
        '    "age": string,\n'
        '    "gender": "MALE" | "FEMALE" | "",\n'
        '    "birthday": string,\n'
        '    "address": {\n'
        '      "phase": number,\n'
        '      "package": number,\n'
        '      "block": number,\n'
        '      "lot": number\n'
        "    },\n"
        '    "contactPerson": string,\n'
        '    "contactNumber": string\n'
        "  },\n"
        '  "assessment": string,\n'
        '  "vitals": {\n'
        '    "bp": string,\n'
        '    "pr": string,\n'
        '    "spo2": string,\n'
        '    "temp": string\n'
        "  },\n"
        '  "dispositionType": "DROP_OFF" | "PICK_UP" | "",\n'
        '  "patientNameAndSignature": string,\n'
        '  "guardianNameAndSignature": string,\n'
        '  "waiver": string,\n'
        '  "teamInformation": {\n'
        '    "ambulanceDriver": string,\n'
        '    "responder": string[]\n'
        "  },\n"
        '  "timeInformation": {\n'
        '    "barangayOut": string,\n'
        '    "barangayIn": string,\n'
        '    "hospitalIn": string,\n'
        '    "hospitalOut": string,\n'
        '    "odometerOut": string,\n'
        '    "odometerIn": string\n'
        "  },\n"
        '  "checkedBy": string,\n'
        '  "hospitalRepresentative": string\n'
        "}"
    )


    @classmethod
    def _load_client(cls):
        if cls._client is None:
            from google import genai

            cls._client = genai.Client(
                api_key=cls._GOOGLE_API_KEY,
                http_options=types.HttpOptions(timeout=cls._GEMINI_TIMEOUT_SECONDS * 1000),
            )

        return cls._client

    @classmethod
    def scan(
        cls,
        image: Image.Image,
        prompt: str | None = None,
    ) -> str:
        client = cls._load_client()

        response = client.models.generate_content(
            model=cls._MODEL_NAME,
            contents=[
                image,
                prompt or cls._PROMPT,
            ],
            config=types.GenerateContentConfig(
                temperature=0,
                response_mime_type="application/json",   # ← add this
                automatic_function_calling=types.AutomaticFunctionCallingConfig(
                    disable=True
                )
            ),
        )

        return response.text.strip()  # type: ignore
