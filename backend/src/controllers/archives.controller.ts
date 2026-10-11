import { ArchiveQuerySchema, ArchiveRestoreParamsSchema } from "@/schemas/archives.schema";
import { archivesService } from "@/services/archives.service";
import { validateOrThrow } from "@/shared/utils";
import type { Request, Response, NextFunction } from "express";

export const archivesController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const query = validateOrThrow(ArchiveQuerySchema.safeParse(req.query));
      const result = await archivesService.list(query);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async restore(req: Request, res: Response, next: NextFunction) {
    try {
      const params = validateOrThrow(ArchiveRestoreParamsSchema.safeParse(req.params));
      await archivesService.restore(params);
      res.status(200).json({ restored: true });
    } catch (error) {
      next(error);
    }
  },

  async archive(req: Request, res: Response, next: NextFunction) {
    try {
      const params = validateOrThrow(ArchiveRestoreParamsSchema.safeParse(req.params));
      await archivesService.archive(params, req.user!.userId);
      res.status(201).json({ archived: true });
    } catch (error) {
      next(error);
    }
  },
};
