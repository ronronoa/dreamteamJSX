export function toISOString(date) {
    return date.toISOString();
}
export function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
export function isExpired(expiryDate) {
    return expiryDate < new Date();
}
export function getCurrentTimestamp() {
    return new Date().toISOString();
}
//# sourceMappingURL=date.js.map