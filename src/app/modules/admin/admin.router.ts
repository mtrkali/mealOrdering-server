import { Router } from "express";

import { checkAuth, UserRole } from "../../middleware/auth";
import { adminController } from "./admin.controller";

const router = Router();

router.get(
    "/dashboard-stats",
    checkAuth(UserRole.ADMIN),
    adminController.getDashboardStats
);

export const adminRouter = router;