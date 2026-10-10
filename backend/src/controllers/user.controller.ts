import { CreateUserSchema, ResetPasswordSchema, UpdateOwnProfileSchema, UpdateUserSchema, UserIdParamSchema } from "@/schemas/user.schema";
import { userService } from "@/services/user.service";
import { ValidationError } from "@/shared/errors";
import type { Request, Response, NextFunction } from "express";
import type { z } from "zod";
import { promises as fs } from "node:fs";
import path from "node:path";

async function removeProfileImage(imageUrl: string | null) {
    if (!imageUrl?.startsWith("/uploads/profiles/")) return;
    const filePath = path.resolve("uploads/profiles", path.basename(imageUrl));
    try {
        await fs.unlink(filePath);
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
            console.error("Could not remove old profile image:", error);
        }
    }
}

function getFirstZodIssue(error: z.ZodError): z.ZodIssue {
    const issue = error.issues[0]
    if(!issue) throw new Error("Zod error has no issues")

        return issue
}

function validateOrThrow<T>(parsed: z.ZodSafeParseResult<T>) {
    if(!parsed.success) {
        const firstIssue = getFirstZodIssue(parsed.error)
        throw new ValidationError(firstIssue.message, {
            [firstIssue.path.join(".")]: [firstIssue.message]
        });
    }
    return parsed.data
}

export const userController = {
    async getOwnProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userService.findProfile(req.user!.userId);
            res.status(200).json({ user });
        } catch (error) {
            next(error);
        }
    },

    async updateOwnProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const data = validateOrThrow(UpdateOwnProfileSchema.safeParse(req.body));
            const user = await userService.updateOwnProfile(req.user!.userId, data);
            res.status(200).json({ user });
        } catch (error) {
            next(error);
        }
    },

    async uploadOwnProfileImage(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.file) {
                throw new ValidationError("Choose a JPG or PNG profile photo.", {
                    image: ["A profile photo is required."],
                });
            }

            const userId = req.user!.userId;
            const currentProfile = await userService.findProfile(userId);
            const imageUrl = `/uploads/profiles/${req.file.filename}`;
            try {
                await userService.updateProfileImage(userId, imageUrl);
            } catch (error) {
                await removeProfileImage(imageUrl);
                throw error;
            }
            await removeProfileImage(currentProfile.profileImageUrl);
            const user = await userService.findProfile(userId);
            res.status(200).json({ user });
        } catch (error) {
            next(error);
        }
    },

    async list(_req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.findAll()
            res.status(200).json({users})
        } catch (err) {
            next(err)
        }
    },

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = validateOrThrow(UserIdParamSchema.safeParse(req.params))
            const user = await userService.findById(id)
            res.status(200).json({ user })
        } catch (err) {
            next(err)
        }
    },

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = validateOrThrow(CreateUserSchema.safeParse(req.body))
            const user = await userService.create(data)
            res.status(201).json({ user })
        } catch (err) {
            next(err)
        }
    },

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = validateOrThrow(UserIdParamSchema.safeParse(req.params))
            const data = validateOrThrow(UpdateUserSchema.safeParse(req.body))
            const user = await userService.update(id, data, req.user!.userId)

            res.status(200).json({ user })
        } catch (err) {
            next(err)
        }
    },

    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = validateOrThrow(UserIdParamSchema.safeParse(req.params))
            const data = validateOrThrow(ResetPasswordSchema.safeParse(req.body))
            const result = await userService.resetPassword(id, data)

            res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    },

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = validateOrThrow(UserIdParamSchema.safeParse(req.params))
            const result = await userService.deactivate(id, req.user!.userId)

            res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }
}
