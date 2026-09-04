import type { Request, Response, NextFunction } from "express";
import { isAppError, handleError } from "@/shared/errors/app-error";

export function notFoundHandler(_req: Request, res: Response) {
  res.status(404).json({ code: "NOT_FOUND", message: "Route not found" });
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  const { status, body } = handleError(err);
  res.status(status).json(body);
}