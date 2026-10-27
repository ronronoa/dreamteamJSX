from pathlib import Path

from fastapi.testclient import TestClient

from src.main import app


TEST_IMAGE = Path(__file__).parent / "test.jpg"

EXPECTED_OCR_RESULT = {
    "requestFor": "INTER_FACILITY_TRANSFER",
    "date": "2026-10-21",
    "time": "15:30",
    "from": "UCC",
    "to": "Barangay hall",
    "patient": {
        "name": "Ruzel Montiman",
        "age": "20",
        "gender": "MALE",
        "birthday": "2006-01-01",
        "address": {
            "phase": 9,
            "package": 5,
            "block": 11,
            "lot": 13,
        },
        "contactPerson": "Romelle Navea",
        "contactNumber": "09123456789",
    },
    "assessment": "Broken heart",
    "vitals": {
        "bp": "90/120",
        "pr": "90",
        "spo2": "95%",
        "temp": "36C",
    },
    "dispositionType": "PICK_UP",
    "patientNameAndSignature": "Ruzel",
    "guardianNameAndSignature": "Naelgas",
    "waiver": "What is Waiver for?",
    "teamInformation": {
        "ambulanceDriver": "Mang Juan",
        "responder": ["Guy Gardner"],
    },
    "timeInformation": {
        "barangayOut": "15:00",
        "barangayIn": "16:00",
        "hospitalIn": "15:50",
        "hospitalOut": "16:30",
        "odometerOut": "10,045",
        "odometerIn": "10,050",
    },
    "checkedBy": "",
    "hospitalRepresentative": "",
}


def test_gemini_scan_matches_test_image_exactly():
    with TEST_IMAGE.open("rb") as image_file:
        with TestClient(app) as client:
            response = client.post(
                "/image-scan/gemini-scan",
                files={"file": (TEST_IMAGE.name, image_file, "image/jpeg")},
            )

    assert response.status_code == 200, response.text
    assert response.json() == EXPECTED_OCR_RESULT
