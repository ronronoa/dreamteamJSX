import io
import logging
from asyncio import Lock

from fastapi import APIRouter, HTTPException, UploadFile
from fastapi.concurrency import run_in_threadpool
from PIL import Image, UnidentifiedImageError

from src.ocr.image_preprocessing import preprocess_document_image
from src.ocr.patient_log_schema import PatientLogOCR
from src.ocr.qwen_ocr import QwenOCR, QwenOutputError

MAX_IMAGE_BYTES = 8 * 1024 * 1024
IMAGE_FORMATS = ("JPEG", "PNG", "WEBP")

router = APIRouter(tags=["ocr"])
logger = logging.getLogger(__name__)
scan_lock = Lock()


def prepare_image(image_bytes: bytes) -> Image.Image:
    try:
        with Image.open(io.BytesIO(image_bytes), formats=IMAGE_FORMATS) as image:
            return preprocess_document_image(image)
    except (UnidentifiedImageError, OSError, ValueError, Image.DecompressionBombError) as error:
        raise HTTPException(
            status_code=400, detail="Choose a readable JPEG, PNG, or WebP image."
        ) from error


@router.post("/qwen-scan", summary="Scan a patient log using local Qwen OCR")
async def scan_patient_log(file: UploadFile) -> PatientLogOCR:
    image_bytes = await file.read(MAX_IMAGE_BYTES + 1)
    if len(image_bytes) > MAX_IMAGE_BYTES:
        raise HTTPException(status_code=413, detail="The image must be 8 MB or smaller.")

    # A second scan can exhaust memory while the model is loading or generating.
    if scan_lock.locked():
        raise HTTPException(status_code=503, detail="Qwen OCR is processing another image.")

    async with scan_lock:
        image = await run_in_threadpool(prepare_image, image_bytes)
        try:
            return await run_in_threadpool(QwenOCR.scan, image)
        except QwenOutputError as error:
            raise HTTPException(
                status_code=502, detail="Qwen could not read the patient log. Try a clearer image."
            ) from error
        except (OSError, ImportError, RuntimeError, ValueError) as error:
            logger.exception("Local Qwen OCR failed.")
            raise HTTPException(
                status_code=503, detail="Local Qwen OCR is unavailable. Check the OCR service setup."
            ) from error
