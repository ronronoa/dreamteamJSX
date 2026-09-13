export type Result<T, E = Error> = {
    success: true;
    data: T;
} | {
    success: false;
    error: E;
};
export declare function ok<T>(data: T): Result<T, never>;
export declare function err<E>(error: E): Result<never, E>;
export declare function isOk<T, E>(result: Result<T, E>): result is {
    success: true;
    data: T;
};
export declare function isErr<T, E>(result: Result<T, E>): result is {
    success: false;
    error: E;
};
//# sourceMappingURL=result.d.ts.map