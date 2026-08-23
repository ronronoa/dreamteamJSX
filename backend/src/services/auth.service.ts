import argon2 from "argon2";
import type { SignInInput, SignUpInput } from "../types/auth.types";
import { hashPassword, verifyPassword } from "../utils/password";
import { prisma } from "../lib/prisma";
import { PrismaClientKnownRequestError } from "../generated/prisma/internal/prismaNamespace";
import { AppError } from "../utils/error";
import { toSafeUser } from "../utils/user.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

import { hashRefreshToken } from "../utils/refresh-token.js";
import jwt from "jsonwebtoken";

const dummyPasswordHash = await argon2.hash("timing-safe-dummy-password");

export const authService = {
  async signUp(data: SignUpInput) {
    const hashedPassword = await hashPassword(data.password);

    try {
      const user = await prisma.user.create({
        data: {
          name: data.name,
          username: data.username,
          passwordHash: String(hashedPassword),
        },
      });

      const accessToken = generateAccessToken({
        userId: user.user_id,
        role: user.role,
      });

      const refreshToken = generateRefreshToken({
        userId: user.user_id,
      });

      const tokenHash = hashRefreshToken(refreshToken);

      await prisma.refreshToken.create({
        data: {
            tokenHash: String(tokenHash),
            userId: user.user_id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        },
      });

      return {
        user: toSafeUser(user),
        accessToken,
        refreshToken,
      };
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError && err.code === "P2002")
        throw new AppError(
          409,
          `username ${data.username} is already registered.`,
        );

      throw err;
    }
  },

  async signIn(data: SignInInput) {
    const user = await prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (!user) {
      await argon2.verify(dummyPasswordHash, data.password);
      throw new AppError(401, "Invalid username or password");
    }

    const passwordValid = await verifyPassword(
      data.password,
      user.passwordHash,
    );

    if (!passwordValid) {
      throw new AppError(401, "Invalid email or password");
    }

    const accessToken = generateAccessToken({
      userId: user.user_id,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      userId: user.user_id,
    });

    const tokenHash = await hashRefreshToken(refreshToken);

    await prisma.refreshToken.create({
      data: {
        tokenHash: String(tokenHash),
        userId: user.user_id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      user: toSafeUser(user),
      accessToken,
      refreshToken
    };
  },

  async refresh(refreshToken: string) {
    const secret = process.env.REFRESH_TOKEN_SECRET

    if(!secret) {
        throw new AppError(500, "REFRESH_TOKEN_SECRET is not defined")
    }

    let payload: {
        userId: string
    }

    try {
        payload = jwt.verify(
            refreshToken,
            secret,
            { algorithms: ["HS256"]}
        ) as { userId: string}
    } catch (error) {
        throw new AppError(401, "Invalid or expired refresh token")
    }

    const tokenHash = await hashRefreshToken(refreshToken)

    const storedToken = await prisma.refreshToken.findUnique({
        where: {
            tokenHash: tokenHash
        },

        include: {
            user: true
        }
    })

    if(!storedToken) {
        throw new AppError(401, "Refresh token is invalid or has been revoked")
    }

    if(storedToken.expiresAt < new Date()) {
        await prisma.refreshToken.delete({
            where: {
                id: storedToken.id
            }
        })

        throw new AppError(401, "Refresh token has expired")
    }

    if(storedToken.userId !== payload.userId) {
        throw new AppError(401, "Invalid refresh token")
    }

    const accessToken = generateAccessToken({
        userId: storedToken.user.user_id,
        role: storedToken.user.role
    })

    const newRefreshToken = generateRefreshToken({
        userId: payload.userId
    })

    const newTokenHash = await hashRefreshToken(
        newRefreshToken
    )

    const newExpiresAt = new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
    )

    await prisma.$transaction([
        prisma.refreshToken.delete({
            where: {
                id: storedToken.id
            }
        }),

        prisma.refreshToken.create({
            data: {
                tokenHash: newTokenHash,
                userId: payload.userId,
                expiresAt: newExpiresAt
            }
        })
    ])

    return {
        accessToken,
        refreshToken: newRefreshToken
    }
  },

  async logout(refreshToken?: string) {
    if (!refreshToken) return

    const tokenHash = await hashRefreshToken(refreshToken)

    await prisma.refreshToken.deleteMany({
        where: {
            tokenHash: tokenHash
        }
    })
  }


};

