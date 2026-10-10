import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "node:path";
import { apiRouter } from "@/routes";
import { notFoundHandler, errorHandler } from "@/middleware/error.middleware";

const app = express();

app.use(helmet());

  app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use("/uploads", express.static(path.resolve("uploads")));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api", apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export { app };
