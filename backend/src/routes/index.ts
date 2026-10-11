import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { pinRoutes } from "./pin.routes";
import { userRoutes } from "./user.routes";
// import { operationRoutes } from "./operation.routes";
import { inventoryRoutes } from "./inventory.routes";
import { activityLogsRoutes } from "./activityLogs.routes";
import { activityAuditMiddleware } from "@/middleware/activityAudit.middleware";
import { archivesRoutes } from "./archives.routes";
import { vehicleRoutes } from "./vehicle.routes";
import { reportFormsRoutes } from "./reportForms.routes";

export const apiRouter = Router()

apiRouter.use(activityAuditMiddleware)
apiRouter.use(authRoutes)
apiRouter.use(pinRoutes)
apiRouter.use(userRoutes)
// apiRouter.use(operationRoutes)
apiRouter.use(inventoryRoutes)
apiRouter.use(activityLogsRoutes)
apiRouter.use(archivesRoutes)
apiRouter.use(vehicleRoutes)
apiRouter.use(reportFormsRoutes)
