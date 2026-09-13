import crypto from "node:crypto";
export async function hashRefreshToken(token) {
    return crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
}
//# sourceMappingURL=refresh-token.js.map