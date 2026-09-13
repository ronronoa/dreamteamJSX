export class AppError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace?.(this, this.constructor);
    }
}
export class ValidationError extends AppError {
    fields;
    code = "VALIDATION_ERROR";
    statusCode = 400;
    constructor(message, fields) {
        super(message);
        this.fields = fields;
    }
}
export class NotFoundError extends AppError {
    code = "NOT_FOUND";
    statusCode = 404;
    constructor(resource, id) {
        super(`${resource} with id ${id} not found`);
    }
}
export class UnauthorizedError extends AppError {
    code = "UNAUTHORIZED";
    statusCode = 401;
    constructor(message = "Authentication required") {
        super(message);
    }
}
export class ForbiddenError extends AppError {
    code = "FORBIDDEN";
    statusCode = 403;
    constructor(message = "Access denied") {
        super(message);
    }
}
export class ConflictError extends AppError {
    code = "CONFLICT";
    statusCode = 409;
    constructor(message) {
        super(message);
    }
}
export class InternalError extends AppError {
    code = "INTERNAL_ERROR";
    statusCode = 500;
    constructor(message = "Internal server error") {
        super(message);
    }
}
export function isAppError(error) {
    return error instanceof AppError;
}
export function handleError(error) {
    if (isAppError(error)) {
        const body = {
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
//# sourceMappingURL=app-error.js.map