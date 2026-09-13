export function validateUserId(input) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(input)) {
        throw new Error("Invalid user ID: must be a valid UUID");
    }
    return input;
}
export function validateEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input)) {
        throw new Error("Invalid email format");
    }
    return input;
}
export function toTokenHash(input) {
    return input;
}
//# sourceMappingURL=branded.js.map