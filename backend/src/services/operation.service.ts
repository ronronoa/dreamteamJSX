import { InventoryTransactionType, Prisma, type Role } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"
import { ConflictError, NotFoundError } from "@/shared/errors"
import type { CreateOperationInput, CreateTeamInput, OperationImageInput, PersonInvolvedInput, UpdateOperationInput, UpdateTeamInput } from "@/types/operation.types"
import { prepareReportReview } from "@/services/reportReviewWorkflow"

async function syncOperationDispatchReview(
    tx: Prisma.TransactionClient,
    operationId: string,
    status: "VALIDATED" | "REJECTED",
    rejectedReason: string | null,
    reviewerId: string,
) {
    await tx.vehicularDispatch.updateMany({
        where: { operation_id: operationId, archive: null },
        data: {
          status,
          rejected_reason: rejectedReason,
          validated_by: reviewerId,
        },
    })
}

export async function decrementOperationInventory(
  transaction: Prisma.TransactionClient,
  operationId: string,
  actorId: string,
) {
  const entries = await transaction.operationInventoryEntry.findMany({
    where: { operation_id: operationId, item_id: { not: null } },
    select: { item_id: true, item_name: true, quantity: true },
    orderBy: { entry_id: "asc" },
  })

  for (const entry of entries) {
    if (!entry.item_id || entry.quantity <= 0) continue

    const updatedItems = await transaction.inventoryItem.updateMany({
      where: { item_id: entry.item_id, stock_quantity: { gte: entry.quantity } },
      data: { stock_quantity: { decrement: entry.quantity } },
    })
    if (updatedItems.count === 0) {
      throw new ConflictError(`Not enough stock for ${entry.item_name} to approve this operation.`)
    }

    await transaction.inventoryTransaction.create({
      data: {
        item_id: entry.item_id,
        user_id: actorId,
        transaction_type: InventoryTransactionType.STOCK_OUT,
        quantity: entry.quantity,
        reason: `Used in operation ${operationId}`,
      },
    })
  }
}

export const operationService = {

  // Response Team
  async findAllTeams() {
    return prisma.responseTeam.findMany({
      where: { isArchived: false },
      orderBy: { createdAt: "desc" },
    })
  },

  async findTeamById(teamId: string) {
    const team = await prisma.responseTeam.findUnique({ where: { team_id: teamId}})
    if(!team) throw new NotFoundError("ResponseTeam", teamId)
    return team
  },

  async createTeam(data: CreateTeamInput) {
    const teamName = data.team_name.trim();

    return prisma.$transaction(async (transaction) => {
      const archivedTeam = await transaction.responseTeam.findFirst({
        where: {
          team_name: { equals: teamName, mode: "insensitive" },
          isArchived: true,
        },
        orderBy: { updatedAt: "desc" },
      });

      if (archivedTeam) {
        const activeDuplicates = await transaction.responseTeam.findMany({
          where: {
            team_name: { equals: teamName, mode: "insensitive" },
            isArchived: false,
          },
          select: { team_id: true },
        });
        const activeDuplicateIds = activeDuplicates.map((team) => team.team_id);

        if (activeDuplicateIds.length > 0) {
          await transaction.user.updateMany({
            where: { team_id: { in: activeDuplicateIds } },
            data: { team_id: archivedTeam.team_id },
          });
          await transaction.responseTeam.updateMany({
            where: { team_id: { in: activeDuplicateIds } },
            data: { isArchived: true },
          });
        }

        const team = await transaction.responseTeam.update({
          where: { team_id: archivedTeam.team_id },
          data: { isArchived: false },
        });
        return { team, restored: true };
      }

      const activeTeam = await transaction.responseTeam.findFirst({
        where: {
          team_name: { equals: teamName, mode: "insensitive" },
          isArchived: false,
        },
      });
      if (activeTeam) throw new ConflictError("A team with this name already exists.");

      const team = await transaction.responseTeam.create({
        data: { ...data, team_name: teamName },
      });
      return { team, restored: false };
    });
  },

  async updateTeam(teamId: string, data: UpdateTeamInput) {
    const team = await this.findTeamById(teamId)
    if (team.isArchived) throw new ConflictError("Archived teams cannot be edited.")
    if (team.team_name.trim().charAt(0).toUpperCase() !== data.team_name.trim().charAt(0).toUpperCase()) {
      const pinOwners = await prisma.user.count({ where: { team_id: teamId, pinLookupHash: { not: null } } });
      if (pinOwners > 0) throw new ConflictError("This team has report PINs. Keep its initial or reassign its users before renaming it.");
    }
    return prisma.responseTeam.update({ where: { team_id: teamId}, data})
  },

  async deleteTeam(teamId: string) {
    try {
      return await prisma.$transaction(async (transaction) => {
        const team = await transaction.responseTeam.findUnique({ where: { team_id: teamId } });
        if (!team) throw new NotFoundError("ResponseTeam", teamId);

        if (team.isArchived) return { success: true };

        const [operationCount, assignmentCount] = await Promise.all([
          transaction.operationLog.count({ where: { team_id: teamId } }),
          transaction.operationTeamAssignment.count({ where: { team_id: teamId } }),
        ]);
        if (operationCount > 0 || assignmentCount > 0) {
          throw new ConflictError("This team is referenced by operation records and cannot be deleted.");
        }

        await transaction.user.updateMany({
          where: { team_id: teamId },
          data: { team_id: null },
        });
        await transaction.responseTeam.delete({ where: { team_id: teamId } });
        return { success: true };
      });
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof ConflictError) throw error;
      if (
        error && typeof error === "object" && "code" in error &&
          error.code === "P2003"
      ) {
        throw new ConflictError("This team is still in use and cannot be deleted.");
      }
      throw error;
    }
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
      where: { ...where, archive: null },
      include: {
        team: true,
        teamAssignments: { include: { team: true } },
        submitter: { select: { user_id: true, name: true, username: true, role: true}},
        validator: { select: { user_id: true, name: true, username: true, role: true}},
        responders: { include: { user: { select: { user_id: true, name: true }}}},
        personsInvolved: true,
        inventoryEntries: true,
        dispatches: { include: { vehicle: true } },
        images: true
      },
      orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }]
    })
  },

  async findById(operationId: string) {
    const op = await prisma.operationLog.findUnique({
      where: { operation_id: operationId },
      include: {
        team: true,
        submitter: { select: {user_id: true, name: true, username: true, role: true}},
        validator: { select: { user_id: true, name: true, username: true, role: true}},
        responders: { include: { user: { select: { user_id: true, name: true}}}},
        personsInvolved: true,
        teamAssignments: { include: { team: true } },
        inventoryEntries: true,
        dispatches: { include: { vehicle: true } },
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
    const action = "validate"
    const nextStatus = await prepareReportReview({ actor, pin, action, currentStatus: op.status })

    return prisma.$transaction(async (tx) => {
      const updatedCount = await tx.operationLog.updateMany({
        where: { operation_id: operationId, status: op.status },
        data: {
          status: nextStatus,
          ...(nextStatus === "VALIDATED" ? { validated_by: actor.userId } : {}),
        },
      })
      if (updatedCount.count === 0) throw new ConflictError("This operation was already reviewed.")

      if (nextStatus === "VALIDATED") {
        await decrementOperationInventory(tx, operationId, actor.userId)
      }

      await syncOperationDispatchReview(tx, operationId, nextStatus, null, actor.userId)

      const updated = await tx.operationLog.findUniqueOrThrow({ where: { operation_id: operationId } })

      if (nextStatus === "VALIDATED") {
        await tx.operationLogEdit.create({
          data: { operation_id: operationId, admin_id: actor.userId, edit_notes: `Auto-validated from ${op.status}` },
        })
      }

      return updated
    })
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
    const nextStatus = await prepareReportReview({ actor, pin, action: "validate", currentStatus: op.status })
    return prisma.$transaction(async (tx) => {
      const updatedCount = await tx.operationLog.updateMany({
        where: { operation_id: operationId, status: op.status },
        data: { status: nextStatus, validated_by: actor.userId, rejected_reason: null},
      });

      await syncOperationDispatchReview(tx, operationId, nextStatus, null, actor.userId)

      if (updatedCount.count === 0) throw new ConflictError("This operation was already reviewed.");

      await decrementOperationInventory(tx, operationId, actor.userId);
      const updated = await tx.operationLog.findUniqueOrThrow({ where: { operation_id: operationId } });
      await tx.operationLogEdit.create({
        data: { operation_id: operationId, admin_id: actor.userId, edit_notes: `Validated from ${op.status}`}
      });
      return updated;
    })
  },

  async reject(operationId: string, actor: { userId: string; role: Role }, pin: string, rejectedReason: string) {
    const op = await this.findById(operationId);
    const nextStatus = await prepareReportReview({ actor, pin, action: "reject", currentStatus: op.status });
    return prisma.$transaction(async (tx) => {
      const updated = await tx.operationLog.update({
        where: { operation_id: operationId },
        data: { status: nextStatus, validated_by: actor.userId, rejected_reason: rejectedReason },
      });

      await syncOperationDispatchReview(tx, operationId, nextStatus, rejectedReason, actor.userId)

      await tx.operationLogEdit.create({
        data: { operation_id: operationId, admin_id: actor.userId, edit_notes: `Rejected from ${op.status}` },
      });
      return updated;
    });
  },

  // Persons Involved

  async addPerson(operationId: string, data: PersonInvolvedInput) {
    await this.findById(operationId)
    return prisma.personsInvolved.create({
      data: { ...data, operation_id: operationId }
    })
  },

  // Operation Responders

  async addResponder(operationId: string, userId: string) {
    await this.findById(operationId)
    return prisma.operationResponder.create({
      data: { operation_id: operationId, user_id: userId }
    })
  },

  // Image Attachments

  async addImage(operationId: string, uploadBy: string, data: OperationImageInput) {
    await this.findById(operationId)
    return prisma.operationImageAttachment.create({
      data: { ...data, operation_id: operationId, uploaded_by: uploadBy }
    })
  },

}
