import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { pinRoutes } from "./pin.routes";
import { userRoutes } from "./user.routes";
import { operationRoutes } from "./operation.routes";
import { inventoryRoutes } from "./inventory.routes";
import { activityLogsRoutes } from "./activityLogs.routes";
import { activityAuditMiddleware } from "@/middleware/activityAudit.middleware";
import { archivesRoutes } from "./archives.routes";

export const apiRouter = Router()

apiRouter.use(activityAuditMiddleware)
apiRouter.use(authRoutes)
// apiRouter.use(pinRoutes) // won't need this with multer
apiRouter.use(userRoutes)
apiRouter.use(operationRoutes)
apiRouter.use(inventoryRoutes)
apiRouter.use(activityLogsRoutes)
apiRouter.use(archivesRoutes)
