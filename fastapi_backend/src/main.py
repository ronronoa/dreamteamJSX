from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.body_limit import RequestBodyLimitMiddleware
from starlette.responses import JSONResponse

from src.routes.image_scan import router as image_scan_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    print(f"""
        {app.title}
            """)
    yield
    print("closing...")


app = FastAPI(
    lifespan=lifespan,
    title="trOCR",
    docs_url="/docs"
)

origins = [
    "http://localhost:5173",
    "https://ruper.dpdpns.org",
    "https://dreamteamjsx.web.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(
    RequestBodyLimitMiddleware,
    max_body_size=10 * 1024 * 1024 # 10mb
)
# app.add_middleware(TrustedHostMiddleware, allowed_hosts=["example.com", "*.example.com"])
#app.add_middleware(GZipMiddleware, minimum_size=1000)

app.include_router(image_scan_router, prefix="/image-scan")


@app.get("/")
def root():
    return JSONResponse(status_code=200, content={"message" : "🗿"})


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "src.main:app",
        host="0.0.0.0",
        port=8080,
        # reload=True,
    )
