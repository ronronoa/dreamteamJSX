export abstract class AppError extends Error {
  abstract readonly code: string;
  abstract readonly statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace?.(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  readonly code = "VALIDATION_ERROR";
  readonly statusCode = 400;

  constructor(message: string, public readonly fields: Record<string, string[]>) {
    super(message);
  }
}

export class NotFoundError extends AppError {
  readonly code = "NOT_FOUND";
  readonly statusCode = 404;

  constructor(resource: string, id: string) {
    super(`${resource} with id ${id} not found`);
  }
}

export class UnauthorizedError extends AppError {
  readonly code = "UNAUTHORIZED";
  readonly statusCode = 401;

  constructor(message = "Authentication required") {
    super(message);
  }
}

export class ForbiddenError extends AppError {
  readonly code = "FORBIDDEN";
  readonly statusCode = 403;

  constructor(message = "Access denied") {
    super(message);
  }
}

export class ConflictError extends AppError {
  readonly code = "CONFLICT";
  readonly statusCode = 409;

  constructor(message: string) {
    super(message);
  }
}

export class InternalError extends AppError {
  readonly code = "INTERNAL_ERROR";
  readonly statusCode = 500;

  constructor(message = "Internal server error") {
    super(message);
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

export function handleError(error: unknown): { status: number; body: object } {
  if (isAppError(error)) {
    const body: Record<string, unknown> = {
      code: error.code,
      message: error.message,
    };
    if (error instanceof ValidationError) {
      body["fields"] = error.fields;
    }
    return { status: error.statusCode, body };
  }

  console.error("Unexpected error:", error);
  return { status: 500, body: { code: "INTERNAL_ERROR", message: "Internal server error" } };
}