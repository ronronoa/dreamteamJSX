import {
  CreateInventoryItemSchema,
  InventoryAdjustmentSchema,
  InventoryItemIdSchema,
  InventoryStockInSchema,
  InventoryTransactionsQuerySchema,
  UpdateInventoryItemSchema,
} from "@/schemas/inventory.schema";
import { inventoryService } from "@/services/inventory.service";
import { validateOrThrow } from "@/shared/utils";
import type { Request, Response, NextFunction } from "express";

export const inventoryController = {
  async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await inventoryService.list();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = validateOrThrow(CreateInventoryItemSchema.safeParse(req.body));
      const item = await inventoryService.create(data, req.user!.userId);
      res.status(201).json({ item });
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = validateOrThrow(InventoryItemIdSchema.safeParse(req.params));
      const data = validateOrThrow(UpdateInventoryItemSchema.safeParse(req.body));
      const item = await inventoryService.update(id, data, req.user!.userId);
      res.status(200).json({ item });
    } catch (error) {
      next(error);
    }
  },

  async stockIn(req: Request, res: Response, next: NextFunction) {
    try {
      const data = validateOrThrow(InventoryStockInSchema.safeParse(req.body));
      const result = await inventoryService.stockIn(data, req.user!.userId);
      res.status(200).json({ transaction: result.transaction, newStock: result.item.stock_quantity });
    } catch (error) {
      next(error);
    }
  },

  async adjust(req: Request, res: Response, next: NextFunction) {
    try {
      const data = validateOrThrow(InventoryAdjustmentSchema.safeParse(req.body));
      const result = await inventoryService.adjust(data, req.user!.userId);
      res.status(200).json({ transaction: result.transaction, newStock: result.item.stock_quantity });
    } catch (error) {
      next(error);
    }
  },

  async transactions(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = validateOrThrow(InventoryItemIdSchema.safeParse(req.params));
      const { limit, offset } = validateOrThrow(InventoryTransactionsQuerySchema.safeParse(req.query));
      const transactions = await inventoryService.transactions(id, limit, offset);
      res.status(200).json({ transactions });
    } catch (error) {
      next(error);
    }
  },
};
