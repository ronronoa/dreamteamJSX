export function ok(data) {
    return { success: true, data };
}
export function err(error) {
    return { success: false, error };
}
export function isOk(result) {
    return result.success;
}
export function isErr(result) {
    return !result.success;
}
//# sourceMappingURL=result.js.map