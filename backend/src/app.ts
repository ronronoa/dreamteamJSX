import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { apiRouter } from "@/routes";
import { notFoundHandler, errorHandler } from "@/middleware/error.middleware";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api", apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export { app };