export class AppError extends Error {
    constructor(public StatusCode: number, message: string) {
        super(message)
        this.name = "AppError"
    }
}