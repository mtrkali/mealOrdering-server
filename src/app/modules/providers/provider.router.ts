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
    "/:providerId",
    providerController.getSingleProvider
)

router.get(
    "/:providerId/meals",
    providerController.getProviderMeals
)

router.patch(
    "/:providerId",
    checkAuth(UserRole.ADMIN),
    providerController.updateProviders
)

export const providerRouter = router
