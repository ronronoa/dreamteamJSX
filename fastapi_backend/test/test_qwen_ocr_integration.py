import io
import json

import pytest
from fastapi.testclient import TestClient
from PIL import Image

from src.main import app
from src.ocr.qwen_ocr import QwenOCR, QwenOutputError, parse_patient_log

SCAN_URL = "/image-scan/qwen-scan"
EXAMPLE_LOG = {
    "requestFor": "INTER_FACILITY_TRANSFER",
    "date": "2026-10-21",
    "time": "15:30",
    "from": "Clinic",
    "to": "Hospital",
    "patient": {
        "name": "Sample Patient",
        "age": "20",
        "gender": "MALE",
        "birthday": "",
        "address": {"phase": 9, "package": None, "block": None, "lot": None},
        "contactPerson": "",
        "contactNumber": "",
    },
    "assessment": "",
    "vitals": {"bp": "", "pr": "", "spo2": "", "temp": ""},
    "dispositionType": "PICK_UP",
    "patientNameAndSignature": "",
    "guardianNameAndSignature": "",
    "waiver": "",
    "teamInformation": {"ambulanceDriver": "", "responder": ["Sample Responder"]},
    "timeInformation": {
        "barangayOut": "", "barangayIn": "", "hospitalIn": "", "hospitalOut": "",
        "odometerOut": "", "odometerIn": "",
    },
    "checkedBy": "",
    "hospitalRepresentative": "",
}


def make_test_image() -> bytes:
    image_file = io.BytesIO()
    Image.new("RGB", (40, 60), "white").save(image_file, format="PNG")
    return image_file.getvalue()


def test_qwen_scan_returns_structured_patient_log(monkeypatch):
    def scan(image):
        assert image.size == (40, 60)
        return parse_patient_log("```json\n" + json.dumps(EXAMPLE_LOG) + "\n```")

    monkeypatch.setattr(QwenOCR, "scan", scan)
    with TestClient(app) as client:
        response = client.post(SCAN_URL, files={"file": ("sample.png", make_test_image(), "image/png")})

    assert response.status_code == 200
    assert response.json() == EXAMPLE_LOG


def test_invalid_upload_is_rejected():
    with TestClient(app) as client:
        response = client.post(SCAN_URL, files={"file": ("sample.png", b"not an image", "image/png")})

    assert response.status_code == 400


@pytest.mark.parametrize("error, status_code", [
    (QwenOutputError("Invalid output"), 502),
    (FileNotFoundError("Missing weights"), 503),
])
def test_scan_errors_are_reported(monkeypatch, error, status_code):
    def scan(_image):
        raise error

    monkeypatch.setattr(QwenOCR, "scan", scan)
    with TestClient(app) as client:
        response = client.post(SCAN_URL, files={"file": ("sample.png", make_test_image(), "image/png")})

    assert response.status_code == status_code


@pytest.mark.parametrize("output", ["not JSON", '{"patient": {"name": "Incomplete"}}'])
def test_invalid_qwen_output_is_rejected(output):
    with pytest.raises(QwenOutputError):
        parse_patient_log(output)
