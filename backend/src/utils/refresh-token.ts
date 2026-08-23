import crypto from "node:crypto"
export async function hashRefreshToken(token: string): Promise<string> {
    return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex")
}