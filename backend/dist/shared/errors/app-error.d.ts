export declare abstract class AppError extends Error {
    abstract readonly code: string;
    abstract readonly statusCode: number;
    constructor(message: string);
}
export declare class ValidationError extends AppError {
    readonly fields: Record<string, string[]>;
    readonly code = "VALIDATION_ERROR";
    readonly statusCode = 400;
    constructor(message: string, fields: Record<string, string[]>);
}
export declare class NotFoundError extends AppError {
    readonly code = "NOT_FOUND";
    readonly statusCode = 404;
    constructor(resource: string, id: string);
}
export declare class UnauthorizedError extends AppError {
    readonly code = "UNAUTHORIZED";
    readonly statusCode = 401;
    constructor(message?: string);
}
export declare class ForbiddenError extends AppError {
    readonly code = "FORBIDDEN";
    readonly statusCode = 403;
    constructor(message?: string);
}
export declare class ConflictError extends AppError {
    readonly code = "CONFLICT";
    readonly statusCode = 409;
    constructor(message: string);
}
export declare class InternalError extends AppError {
    readonly code = "INTERNAL_ERROR";
    readonly statusCode = 500;
    constructor(message?: string);
}
export declare function isAppError(error: unknown): error is AppError;
export declare function handleError(error: unknown): {
    status: number;
    body: object;
};
//# sourceMappingURL=app-error.d.ts.map