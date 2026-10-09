import type { Role } from "@/generated/prisma/enums"
import { prisma } from "@/lib/prisma"
import { ConflictError, ForbiddenError, NotFoundError } from "@/shared/errors"
import type { CreateOperationInput, CreateTeamInput, OperationImageInput, PersonInvolvedInput, UpdateOperationInput, UpdateTeamInput } from "@/types/operation.types"
import { pinService } from "./pin.service"

export const operationService = {

    // Response Team
    async findAllTeams() {
        return prisma.responseTeam.findMany({orderBy: {createdAt: "desc"}})
    },

    async findTeamById(teamId: string) {
        const team = await prisma.responseTeam.findUnique({ where: { team_id: teamId}})
        if(!team) throw new NotFoundError("ResponseTeam", teamId)
        return team
    },

    async createTeam(data: CreateTeamInput) {
        return prisma.responseTeam.create({data})
    },

    async updateTeam(teamId: string, data: UpdateTeamInput) {
        await this.findTeamById(teamId)
        return prisma.responseTeam.update({ where: { team_id: teamId}, data})
    },

    async deleteTeam(teamId: string) {
        await this.findTeamById(teamId)
        await prisma.responseTeam.delete({ where: {team_id: teamId}})
        return { success: true }
    },

    // Operation Log
    async findAll(filters?: {status?: string; team_id?: string; from?: string; to?: string}) {
        const where: Record<string, unknown> = {}
        if(filters?.status) where["status"] = filters.status
        if(filters?.team_id) where["team_id"] = filters.team_id
        if(filters?.from || filters?.to) {
            where["operation_date"] = {
                ...(filters.from && { gte: new Date(filters.from)}),
                ...(filters.to && { lte: new Date(filters.to)})
            }
        }

        return prisma.operationLog.findMany({
            where,
            include: {
                team: true,
                submitter: { select: { user_id: true, name: true, username: true}},
                responders: { include: { user: { select: { user_id: true, name: true }}}},
                personsInvolved: true,
                images: true
            },
            orderBy: { createdAt: "desc"}
        })
    },

    async findById(operationId: string) {
        const op = await prisma.operationLog.findUnique({
            where: { operation_id: operationId },
            include: {
                team: true,
                submitter: { select: {user_id: true, name: true, username: true}},
                validator: { select: { user_id: true, name: true, username: true}},
                responders: { include: { user: { select: { user_id: true, name: true}}}},
                personsInvolved: true,
                images: true,
                edits: { include: { admin: { select: { user_id: true, name: true}}}}
            },
        })

        if (!op) throw new NotFoundError("OperationLog", operationId)
            return op
    },

    async create(submittedBy: string, data: CreateOperationInput) {
        const { persons_involved, responder_ids, ...operationData } = data

        return prisma.operationLog.create({
            data: {
        ...operationData,
        submitted_by: submittedBy,
        ...(responder_ids?.length
            ? { responders: { create: responder_ids.map((id) => ({ user_id: id })) } }
            : {}),
        ...(persons_involved?.length
            ? { personsInvolved: { create: persons_involved } }
            : {}),
    },
            include: {
                team: true,
                responders: { include: { user: { select: {user_id: true, name: true}}}},
                
            }
        })
    },

    async update(operationId: string, data: UpdateOperationInput) {
        await this.findById(operationId)

        const filtered = Object.fromEntries(
            Object.entries(data).filter(([, v]) => v !== undefined )
        )

        return prisma.operationLog.update({
            where: { operation_id: operationId },
            data: filtered
        })
    },

    async submit(operationId: string) {
        await this.findById(operationId)
        return prisma.operationLog.update({
            where: { operation_id: operationId },
            data: { status: "PENDING" }
        })
    },

    async authorize(operationId: string, actor: { userId: string; role: Role }, pin: string) {
        const op = await this.findById(operationId)
        await pinService.verifyPin(actor.userId, {pin})

        const isAuto = actor.role === "DEPARTMENT_HEAD" || actor.role === "DEPUTY" || actor.role === "SUPER_ADMIN";
        if(actor.role === "TEAM_LEADER") {
            if(op.status !== "PENDING") throw new ConflictError(`Cannot authorize from ${op.status}`);

            return prisma.$transaction(async (tx) => {
                return tx.operationLog.update({where: { operation_id: operationId }, data: { status: "TO_REVIEW" }})
            })
        }

        if(isAuto) {
            if(op.status !== "PENDING" && op.status !== "TO_REVIEW") throw new ConflictError(
                `Cannot auto-validate from ${op.status}`
            )

            return prisma.$transaction(async (tx) => {
                const updated = await tx.operationLog.update({
                    where: { operation_id: operationId },
                    data: { status: "VALIDATED", validated_by: actor.userId}
                });

                await tx.operationLogEdit.create({
                    data: { operation_id: operationId, admin_id: actor.userId, edit_notes: `Auto-validated from ${op.status}`}
                });

                return updated;
            });
        }

        throw new ForbiddenError("Insufficient permissions.")
    },

    // async setStatus(operationId: string, status: "VALIDATED" | "REJECTED", validatedBy: string ) {
    //     await this.findById(operationId)
    //     return prisma.operationLog.update({
    //         where: { operation_id: operationId },
    //         data: { status, validated_by: validatedBy}
    //     })
    // },

    async validate(operationId: string, actor: { userId: string; role: Role}, pin : string) {
        const op = await this.findById(operationId)
        if(op.status !== "TO_REVIEW" && op.status !== "PENDING") throw new ConflictError(`Cannot validate from ${op.status}`);

        await pinService.verifyPin(actor.userId, { pin });
        return prisma.$transaction(async (tx) => {
            const updated = await tx.operationLog.update({
                where: { operation_id: operationId },
                data: { status: "VALIDATED", validated_by: actor.userId}
            });
            await tx.operationLogEdit.create({
                data: { operation_id: operationId, admin_id: actor.userId, edit_notes: `Validated from ${op.status}`}
            });
            return updated;
        })
    },

    async reject(operationId: string, actor: { userId: string; role: Role }, pin: string) {
        const op = await this.findById(operationId);
        if (op.status !== "TO_REVIEW" && op.status !== "PENDING") throw new ConflictError(`Cannot reject from ${op.status}`);
        
        await pinService.verifyPin(actor.userId, { pin });
        return prisma.$transaction(async (tx) => {
            const updated = await tx.operationLog.update({
                where: { operation_id: operationId },
                data: { status: "REJECTED", validated_by: actor.userId },
            });
            await tx.operationLogEdit.create({
                data: { operation_id: operationId, admin_id: actor.userId, edit_notes: `Rejected from ${op.status}` },
            });
            return updated;
        });
},

    async delete(operationId: string) {
        await this.findById(operationId)
        await prisma.operationLog.delete({ where: { operation_id: operationId }})
        return { success: true}
    },

    // Persons Involved

    async addPerson(operationId: string, data: PersonInvolvedInput) {
        await this.findById(operationId)
        return prisma.personsInvolved.create({
            data: { ...data, operation_id: operationId }
        })
    },

    async removePerson(personId: string) {
        return prisma.personsInvolved.delete({ where: { person_id: personId }})
    },

    // Operation Responders

    async addResponder(operationId: string, userId: string) {
        await this.findById(operationId)
        return prisma.operationResponder.create({
            data: { operation_id: operationId, user_id: userId }
        })
    },

    async removeResponder(operationId: string, userId: string) {
        return prisma.operationResponder.delete({
            where: { operation_id_user_id: { operation_id: operationId, user_id: userId }}
        })
    },

    // Image Attachments

    async addImage(operationId: string, uploadBy: string, data: OperationImageInput) {
        await this.findById(operationId)
        return prisma.operationImageAttachment.create({
            data: { ...data, operation_id: operationId, uploaded_by: uploadBy }
        })
    },

    async removeImage(attachmentId: string) {
        return prisma.operationImageAttachment.delete({
            where: { attachment_id: attachmentId }
        })
    }

}
