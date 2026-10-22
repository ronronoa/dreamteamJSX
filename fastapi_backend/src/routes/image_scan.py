import io
import logging
import time

from fastapi import APIRouter, File, HTTPException, UploadFile
from fastapi.concurrency import run_in_threadpool
from google.genai.errors import APIError as GeminiAPIError
from PIL import Image

from src.ocr.gemini_ocr import GeminiOCR
from src.ocr.image_preprocessing import preprocess_document_image

router = APIRouter(tags=["ocr"])
logger = logging.getLogger(__name__)

@router.post("/gemini-scan", summary="gemini scan using gemini-3.5-flash-lite")
async def gemini_scan(file: UploadFile = File(...)):
    start_time = time.perf_counter()
    print("/gemini-scan start")

    image_bytes = await file.read()
    with Image.open(io.BytesIO(image_bytes)) as uploaded_image:
        original_size = uploaded_image.size
        image = preprocess_document_image(uploaded_image)
    logger.info("Prepared patient form image from %s to %s", original_size, image.size)

    try:
        result = await run_in_threadpool(GeminiOCR.scan, image)
    except GeminiAPIError as error:
        if error.code == 504:
            logger.warning("Gemini OCR timed out: %s", error.message)
            raise HTTPException(
                status_code=504,
                detail="Gemini OCR timed out while processing this image. Please try again.",
            ) from error

        logger.error("Gemini OCR request failed (status %s): %s", error.code, error.message)
        raise HTTPException(
            status_code=502,
            detail="Gemini could not process this image. Please try again.",
        ) from error
    except RuntimeError as error:
        logger.error("Gemini OCR returned an unusable result: %s", error)
        raise HTTPException(
            status_code=502,
            detail="Gemini returned an unreadable result. Please try again.",
        ) from error

    end_time = time.perf_counter()
    elapsed_time = end_time - start_time
    print(f"Elapsed time: {elapsed_time:.4f} seconds")

    return result.model_dump(by_alias=True)

@router.post("/qwen-scan", summary="unfinished, will need atleast 8gb vram dgpu, minimum rx580")
async def raw_scan_qwen(file: UploadFile = File(...)):
    from ..ocr.qwen_ocr import QwenOCR

    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes))

    raw_text = QwenOCR.scan(image)

    return {"text": raw_text}
