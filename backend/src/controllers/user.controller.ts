import { CreateUserSchema, ResetPasswordSchema, UpdateUserSchema, UserIdParamSchema } from "@/schemas/user.schema";
import { userService } from "@/services/user.service";
import { ValidationError } from "@/shared/errors";
import type { Request, Response, NextFunction } from "express";
import type { z } from "zod";

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
            const user = await userService.update(id, data)

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
            const result = await userService.delete(id)

            res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }
}