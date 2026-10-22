import { ActivityLogsQuerySchema } from "@/schemas/activityLogs.schema";
import { activityLedgerService } from "@/services/activityLedger.service";
import { validateOrThrow } from "@/shared/utils";
import type { Request, Response, NextFunction } from "express";

function escapeCsvValue(value: unknown) {
  const text = value === null || value === undefined ? "" : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

export const activityLogsController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const query = validateOrThrow(ActivityLogsQuerySchema.safeParse(req.query));
      const result = await activityLedgerService.list(query);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async archive(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await activityLedgerService.archive(req.user!.userId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async export(_req: Request, res: Response, next: NextFunction) {
    try {
      const logs = await activityLedgerService.export();
      const header = ["Activity ID", "Date", "User", "Username", "Role", "Module", "Action", "Record ID", "Status", "Details"];
      const rows = logs.map((log) => [
        log.id,
        log.date.toISOString(),
        log.user,
        log.userId,
        log.role,
        log.module,
        log.action,
        log.recordId,
        log.status,
        log.details,
      ]);
      const csv = [header, ...rows]
        .map((row) => row.map(escapeCsvValue).join(","))
        .join("\r\n");
      const fileDate = new Date().toISOString().slice(0, 10);

      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename="activity-ledger-${fileDate}.csv"`);
      res.status(200).send(`\uFEFF${csv}`);
    } catch (error) {
      next(error);
    }
  },
};
