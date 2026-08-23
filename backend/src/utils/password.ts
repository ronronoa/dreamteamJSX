import argon2 from "argon2"

export async function hashPassword(password: string): Promise<String> {
    return await argon2.hash(password)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await argon2.verify(hashedPassword, password)
}