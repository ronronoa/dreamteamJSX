import io

from fastapi import APIRouter, File, UploadFile
from fastapi.concurrency import run_in_threadpool
from PIL import Image

from src.ocr.gemini_ocr import GeminiOCR

router = APIRouter(tags=["ocr"])

@router.post("/gemini-scan", summary="gemini scan using gemini-3.5-flash-lite")
async def gemini_scan(file: UploadFile = File(...)):
    print("/gemini-scan start")
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes))

    result = await run_in_threadpool(GeminiOCR.scan, image)
    return result.model_dump(by_alias=True)

@router.post("/qwen-scan", summary="unfinished, will need atleast 8gb vram dgpu, minimum rx580")
async def raw_scan_qwen(file: UploadFile = File(...)):
    from ..ocr.qwen_ocr import QwenOCR

    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes))

    raw_text = QwenOCR.scan(image)

    return {"text": raw_text}
