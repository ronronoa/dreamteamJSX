import { Router } from "express";
import { authRoutes } from "./auth.routes";

export const apiRouter = Router()

apiRouter.use(authRoutes)

