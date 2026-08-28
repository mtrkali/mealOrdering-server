import express from "express";
import { providerController } from "./provider.controller";
import { checkAuth, UserRole } from "../../middleware/auth";


const router = express.Router();

router.get(
    "/",
    providerController.getAllProviders
)

router.post(
    "/",
    providerController.createProvider
)

router.get(
    "/me",
    checkAuth(UserRole.PROVIDER),
    providerController.getMyProviderProfile
);

router.patch(
    "/me",
    checkAuth(UserRole.PROVIDER),
    providerController.updateMyProviderProfile
);

router.get(
    "/:providerId",
    providerController.getSingleProvider
)

router.get(
    "/:providerId/meals",
    providerController.getProviderMeals
)

// provider dashboard statistic
router.get(
    "/dashboard/stats",
    checkAuth(UserRole.PROVIDER),
    providerController.getDashboardStats
)

router.patch(
    "/:providerId",
    checkAuth(UserRole.ADMIN),
    providerController.updateProviders
)

export const providerRouter = router
