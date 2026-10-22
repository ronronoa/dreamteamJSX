import json

from google.genai import types
from PIL import Image

from src.config import GOOGLE_API_KEY
from src.ocr.patient_log_schema import PatientLogOCR


class GeminiOCR:
    _MODEL_NAME = "gemini-3.5-flash-lite"
    _GOOGLE_API_KEY = GOOGLE_API_KEY
    _GEMINI_TIMEOUT_SECONDS = 120
    _client = None

    _PROMPT = """
Read the patient log form in the image and transcribe only what is visible.

For requestFor, read the checked box and map its printed label exactly:
- Checked T/A -> "TRANSPORT_ASSISTANCE"
- Checked EMERGENCY -> "EMERGENCY"
- Checked IFT -> "INTER_FACILITY_TRANSFER"
- Checked FIRST AID -> "FIRST_AID"
The only allowed requestFor values are "TRANSPORT_ASSISTANCE", "EMERGENCY",
"INTER_FACILITY_TRANSFER", "FIRST_AID", or "" if none is checked.

For gender, read the checked box. The only allowed values are "MALE",
"FEMALE", or "" if neither is checked.
For dispositionType, read the checked box. The only allowed values are
"DROP_OFF", "PICK_UP", or "" if neither is checked. Do not guess these
checkbox values from the other fields.

Transcribe handwritten values as written. Use an empty string for blank text
fields, null for blank numeric address fields, and an empty array when there
are no responders. Ignore preprinted form labels, instructions, and names.
For checkedBy, return a name only if it is handwritten in that field; leave it
empty when the visible name is preprinted on the form.

Format date and patient birthday as YYYY-MM-DD. Format time and all clock
values in timeInformation as 24-hour HH:mm. For example, October 21, 2026
becomes 2026-10-21, and 3:30 PM becomes 15:30. If a date or time is too
unclear to convert confidently, return an empty string instead of guessing.

Return only a JSON object matching this structure. The values below are
examples of valid JSON values and must be replaced by the values visible in
the image:
{
  "requestFor": "",
  "date": "",
  "time": "",
  "from": "",
  "to": "",
  "patient": {
    "name": "",
    "age": "",
    "gender": "",
    "birthday": "",
    "address": {
      "phase": null,
      "package": null,
      "block": null,
      "lot": null
    },
    "contactPerson": "",
    "contactNumber": ""
  },
  "assessment": "",
  "vitals": {
    "bp": "",
    "pr": "",
    "spo2": "",
    "temp": ""
  },
  "dispositionType": "",
  "patientNameAndSignature": "",
  "guardianNameAndSignature": "",
  "waiver": "",
  "teamInformation": {
    "ambulanceDriver": "",
    "responder": []
  },
  "timeInformation": {
    "barangayOut": "",
    "barangayIn": "",
    "hospitalIn": "",
    "hospitalOut": "",
    "odometerOut": "",
    "odometerIn": ""
  },
  "checkedBy": "",
  "hospitalRepresentative": ""
}
"""

    @classmethod
    def _load_client(cls):
        if cls._client is None:
            from google import genai

            cls._client = genai.Client(
                api_key=cls._GOOGLE_API_KEY,
                http_options=types.HttpOptions(
                    timeout=cls._GEMINI_TIMEOUT_SECONDS * 1000
                ),
            )

        return cls._client

    @classmethod
    def scan(
        cls,
        image: Image.Image,
        prompt: str | None = None,
    ) -> PatientLogOCR:
        client = cls._load_client()

        response = client.models.generate_content(
            model=cls._MODEL_NAME,
            contents=[image, prompt or cls._PROMPT],
            config=types.GenerateContentConfig(
                temperature=0,
                response_mime_type="application/json",
                response_json_schema=PatientLogOCR.model_json_schema(by_alias=True),
                automatic_function_calling=types.AutomaticFunctionCallingConfig(
                    disable=True
                ),
            ),
        )

        if not response.text:
            raise RuntimeError("Gemini returned an empty OCR response.")

        try:
            response_data = json.loads(response.text)
        except json.JSONDecodeError as error:
            raise RuntimeError("Gemini returned invalid JSON for the patient log.") from error

        print(json.dumps(response_data, indent=4))

        return PatientLogOCR.model_validate(response_data)
