import express from "express";
import { providerController } from "./provider.controller";


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

export const providerRouter = router
