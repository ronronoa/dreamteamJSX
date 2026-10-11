import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { pinRoutes } from "./pin.routes";
import { userRoutes } from "./user.routes";
import { operationRoutes } from "./operation.routes";
import { inventoryRoutes } from "./inventory.routes";

export const apiRouter = Router()

apiRouter.use(authRoutes)
// apiRouter.use(pinRoutes) // won't need this with multer
apiRouter.use(userRoutes)
apiRouter.use(operationRoutes)
apiRouter.use(inventoryRoutes)
