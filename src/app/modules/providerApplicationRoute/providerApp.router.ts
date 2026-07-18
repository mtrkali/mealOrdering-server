import { Router } from "express";
import { providerApplicationController } from "./providerApp.controller";

const router = Router()


router.post(
    "/",
    providerApplicationController.createProviderApplicationController
)

router.patch(
    "/",
    providerApplicationController.approveBeProviderApplication
)

export const providerApplicationRouter: Router = router;