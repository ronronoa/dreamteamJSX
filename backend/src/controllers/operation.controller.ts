import { CreateOperationSchema, CreateTeamSchema, OperationIdParamSchema, OperationImageSchema, OperationResponderSchema, OperatioStatusSchema, PersonInvolvedIdSchema, PersonInvolvedSchema, SetOperationStatusSchema, TeamIdParamSchema, UpdateOperationSchema, UpdateTeamSchema } from "@/schemas/operation.schema";
import { operationService } from "@/services/operation.service";
import { validateOrThrow } from "@/shared/utils";
import type { Request, Response, NextFunction } from "express";

export const operationController = {
    // Response Team
    async listTeams(_req: Request, res: Response, next: NextFunction) {
        try {
            const teams = await operationService.findAllTeams()
            res.status(200).json({ teams })
        } catch (err) {
            next(err)
        }
    },

    async getTeamById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = validateOrThrow(TeamIdParamSchema.safeParse(req.params))
            const team = await operationService.findTeamById(id)
            res.status(200).json({ team })
        } catch (err) { 
            next( err )
        }
    },

    async createTeam(req: Request, res: Response, next: NextFunction) {
        try {
            const data = validateOrThrow(CreateTeamSchema.safeParse(req.body))
            const team = await operationService.createTeam(data)
            res.status(201).json({team})
        } catch (err) {
            next(err)
        }
    },

    async updateTeam(req: Request, res: Response, next: NextFunction ) {
        try {
            const { id } = validateOrThrow(TeamIdParamSchema.safeParse(req.params))
            const data = validateOrThrow(UpdateTeamSchema.safeParse(req.body))
            const team = await operationService.updateTeam(id, data)
            res.status(200).json({team})
        } catch (err) {
            next(err)
        }
    },

    async deleteTeam(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = validateOrThrow(TeamIdParamSchema.safeParse(req.params))
            const result = await operationService.deleteTeam(id)
            res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    },

    // operation log

    async list(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, team_id, from, to} = req.query as Record<string, string | undefined>
            const operations = await operationService.findAll({
                ...(status !== undefined && { status }),
                ...(team_id !== undefined && { team_id }),
                ...(from !== undefined && { from }),
                ...(to !== undefined && { to }),
            })
            res.status(200).json({operations}) 
        } catch (err) {
            next(err)
        }
    },

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = validateOrThrow(OperationIdParamSchema.safeParse(req.params))
            const operation = await operationService.findById(id)
            res.status(200).json({ operation })
        } catch (err) { next(err) }
    },

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = validateOrThrow(CreateOperationSchema.safeParse(req.body))
            const operation = await operationService.create(req.user!.userId, data)
            res.status(201).json({operation})
        } catch (err) {
            next(err)
        }
    },

    async update(req: Request, res: Response, next: NextFunction ) {
        try {
            const { id } = validateOrThrow(OperationIdParamSchema.safeParse(req.params))
            const data = validateOrThrow(UpdateOperationSchema.safeParse(req.body))
            const operation = await operationService.update(id, data)
            res.status(200).json({ operation })
        } catch (err) {
            next(err)
        }
    },

    async submit(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = validateOrThrow(OperationIdParamSchema.safeParse(req.params))
            const operation = await operationService.submit(id)
            res.status(200).json({operation})
        } catch (err) {
            next(err)
        }
    },

    async setStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = validateOrThrow(OperationIdParamSchema.safeParse(req.params))
            const { status } = validateOrThrow(SetOperationStatusSchema.safeParse(req.body))
            const operation = await operationService.setStatus(id, status, req.user!.userId)
            res.status(200).json({operation})
        } catch (err) {
            next(err)
        }
    },

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = validateOrThrow(OperationIdParamSchema.safeParse(req.params))
            const result = await operationService.delete(id)
            res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    },

    // Person Involved

    async addPerson(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = validateOrThrow(OperationIdParamSchema.safeParse(req.params))
            const data = validateOrThrow(PersonInvolvedSchema.safeParse(req.body))
            const person = await operationService.addPerson(id, data) 
            res.status(200).json({person})
        } catch (err) {
            next(err)
        }
    },

    async removePerson(req: Request, res: Response, next: NextFunction) {
        try {
            const { personId } = req.params as { personId: string }
            const result = await operationService.removePerson(personId)
            res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    },

    // Operation Respondeds

    async addResponder(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = validateOrThrow(OperationIdParamSchema.safeParse(req.params))
            const { user_id } = validateOrThrow(OperationResponderSchema.safeParse(req.body))
            const result = await operationService.addResponder(id, user_id)
            res.status(201).json(result)
        } catch (err) {
            next(err)
        }
    },

    async removeResponder(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, userId } = req.params as { id: string, userId: string }
            const result = await operationService.removeResponder(id, userId)
            res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    },

    // Image Attachments

    async addImage(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = validateOrThrow(OperationIdParamSchema.safeParse(req.params))
            const data = validateOrThrow(OperationImageSchema.safeParse(req.body))
            const image = await operationService.addImage(id, req.user!.userId, data)
            res.status(201).json({ image })
        } catch (err) {
            next(err)
        }
    },

    async removeImage(req: Request, res: Response, next: NextFunction) {
        try {
            const { attachmentId } = req.params as { attachmentId: string }
            const result = await operationService.removeImage(attachmentId)
            res.status(200).json(result)
        } catch (err) {
            next(err)            
        }
    }


}