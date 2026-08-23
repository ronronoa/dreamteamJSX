import jwt from "jsonwebtoken"
import { randomUUID } from "node:crypto"
import type { Role } from "../generated/prisma/client"

export function generateAccessToken(payload: { userId: string; role: Role}) {
    const secret = process.env.ACCESS_TOKEN_SECRET

    if(!secret) {
        throw new Error("ACCESS_TOKEN_SECRET is not defined")
    }

    return jwt.sign(
        payload,
        secret,
        { expiresIn: "15m"}
    )
}

export function generateRefreshToken(payload: {userId: string}) {
    const refresh_secret =process.env.REFRESH_TOKEN_SECRET

    if(!refresh_secret) {
        throw new Error("REFRESH_TOKEN_SECRET is not defined")
    }
    return jwt.sign({...payload, jti: randomUUID}, refresh_secret, { expiresIn: "7d"})
}