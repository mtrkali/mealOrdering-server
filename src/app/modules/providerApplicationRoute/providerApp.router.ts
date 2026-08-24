import { Router } from "express";
import { providerApplicationController } from "./providerApp.controller";
import { checkAuth, UserRole } from "../../middleware/auth";

const router = Router()


router.post(
    "/",
    checkAuth(UserRole.CUSTOMER),
    providerApplicationController.createProviderApplicationController
)

// Admin gets all provider applications
router.get(
    "/",
    checkAuth(UserRole.ADMIN),
    providerApplicationController.getAllProviderApplications
);

router.patch(
    "/",
    checkAuth(UserRole.ADMIN),
    providerApplicationController.approveBeProviderApplication
)

export const providerApplicationRouter: Router = router;