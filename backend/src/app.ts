import express from "express"
import helmet from "helmet"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.get("api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString()})
})