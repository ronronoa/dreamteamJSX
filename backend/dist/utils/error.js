export class AppError extends Error {
    StatusCode;
    constructor(StatusCode, message) {
        super(message);
        this.StatusCode = StatusCode;
        this.name = "AppError";
    }
}
//# sourceMappingURL=error.js.map