import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { pinRoutes } from "./pin.routes";
import { userRoutes } from "./user.routes";

export const apiRouter = Router()

apiRouter.use(authRoutes)
apiRouter.use(pinRoutes)
apiRouter.use(userRoutes)
