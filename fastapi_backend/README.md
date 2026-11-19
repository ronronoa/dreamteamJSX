# Local Qwen OCR

The service scans patient log forms with Qwen2-VL-2B-Instruct. Install the
dependencies and download the model once. Scans then run on this PC using the
local weights, with no API key or internet connection required for inference.

## Install on Windows

1. Install [uv](https://docs.astral.sh/uv/getting-started/installation/) and open
   Windows PowerShell. Change to the project's `fastapi_backend` directory.
   Replace `C:\ELMS` if you installed the app elsewhere.

   ```powershell
   Set-Location 'C:\ELMS\fastapi_backend'
   uv venv --python 3.12 .venv
   ```

2. Install PyTorch from the CPU wheel index, then install the OCR dependencies.
   CPU inference can take several minutes. If you have a supported NVIDIA GPU,
   use the matching CUDA wheels from the [PyTorch instructions](https://pytorch.org/get-started/previous-versions/#v2141)
   in place of the CPU wheels. The service uses CUDA when PyTorch detects it.

   ```powershell
   uv pip install --python .\.venv\Scripts\python.exe torch==2.14.1 torchvision==0.29.1 --index-url https://download.pytorch.org/whl/cpu
   uv pip install --python .\.venv\Scripts\python.exe -r requirements.txt
   ```

3. Download the model. This creates `fastapi_backend\models\qwen2-vl-2b` and
   downloads several gigabytes. For an offline installation, you can download
   the weights on another PC and copy the whole model directory. The Python
   environment still needs to be installed on the destination.

   ```powershell
   .\.venv\Scripts\hf.exe download Qwen/Qwen2-VL-2B-Instruct --local-dir .\models\qwen2-vl-2b --include '*.safetensors' '*.json' '*.txt' '*.jinja'
   ```

   If you store the model in a different directory, set
   `$env:QWEN_MODEL_DIR = 'D:\models\qwen2-vl-2b'` in the PowerShell window
   that starts the OCR service.

## Start and connect the OCR service

In a third PowerShell window alongside Express and Caddy, run:

```powershell
Set-Location 'C:\ELMS\fastapi_backend'
.\.venv\Scripts\python.exe -m src.main
```

Leave this window open. In `C:\ELMS\backend\.env`, set:

```dotenv
OCR_BACKEND_URL=http://127.0.0.1:8080/image-scan/qwen-scan
```

Restart Express and use the existing scan button. The first scan also loads
the model and can take longer than later scans. Review the filled fields before
saving the report, especially handwriting, dates, and vitals.

To check the OCR endpoint directly with a sample image:

```powershell
curl.exe --fail-with-body -F "file=@C:\ELMS\fastapi_backend\test\test.jpg" http://127.0.0.1:8080/image-scan/qwen-scan
```

The FastAPI tests can run without the model weights:

```powershell
uv pip install --python .\.venv\Scripts\python.exe pytest httpx
.\.venv\Scripts\python.exe -m pytest
```
