import { prisma } from "@/lib/prisma";
import { NotFoundError } from "@/shared/errors";
export const operationService = {
    async findAllTeams() {
        return prisma.responseTeam.findMany({ orderBy: { createdAt: "desc" } });
    },
    async findTeamById(teamId) {
        const team = await prisma.responseTeam.findUnique({ where: { team_id: teamId } });
        if (!team)
            throw new NotFoundError("ResponseTeam", teamId);
    },
    async createTeam(data) {
        return prisma.responseTeam.create({ data });
    },
    async updateTeam(teamId, data) {
        await this.findTeamById(teamId);
        return prisma.responseTeam.update({ where: { team_id: teamId }, data });
    },
    async deleteTeam(teamId) {
        await this.findTeamById(teamId);
        await prisma.responseTeam.delete({ where: { team_id: teamId } });
        return { success: true };
    },
    async findAll(filters) {
        const where = {};
        if (filters?.status)
            where["status"] = filters.status;
        if (filters?.team_id)
            where["team_id"] = filters.team_id;
        if (filters?.from || filters?.to) {
            where["operation_date"] = {
                ...(filters.from && { gte: new Date(filters.from) }),
                ...(filters.to && { lte: new Date(filters.to) })
            };
        }
        return prisma.operationLog.findMany({
            where,
            include: {
                team: true,
                submitter: { select: { user_id: true, name: true, username: true } },
                responders: { include: { user: { select: { user_id: true, name: true } } } },
                personsInvolved: true,
                images: true
            },
            orderBy: { createdAt: "desc" }
        });
    },
    async findById(operationId) {
        const op = await prisma.operationLog.findUnique({
            where: { operation_id: operationId },
            include: {
                team: true,
                submitter: { select: { user_id: true, name: true, username: true } },
                validator: { select: { user_id: true, name: true, username: true } },
                responders: { include: { user: { select: { user_id: true, name: true } } } },
                personsInvolved: true,
                images: true,
                edits: { include: { admin: { select: { user_id: true, name: true } } } }
            },
        });
        if (!op)
            throw new NotFoundError("OperationLog", operationId);
        return op;
    },
    async create(submittedBy, data) {
        const { persons_involved, responder_ids, ...operationData } = data;
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
                responders: { include: { user: { select: { user_id: true, name: true } } } },
            }
        });
    },
    async update(operationId, data) {
        await this.findById(operationId);
        const filtered = Object.fromEntries(Object.entries(data).filter(([, v]) => v !== undefined));
        return prisma.operationLog.update({
            where: { operation_id: operationId },
            data: filtered
        });
    },
    async submit(operationId) {
        await this.findById(operationId);
        return prisma.operationLog.update({
            where: { operation_id: operationId },
            data: { status: "PENDING" }
        });
    },
    async setStatus(operationId, status, validatedBy) {
        await this.findById(operationId);
        return prisma.operationLog.update({
            where: { operation_id: operationId },
            data: { status, validated_by: validatedBy }
        });
    },
};
//# sourceMappingURL=operation.service.js.map