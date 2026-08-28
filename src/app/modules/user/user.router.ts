import { Router } from "express"
import { userController } from "./user.controller";
import { checkAuth, UserRole } from "../../middleware/auth";

const router = Router()

router.get(
    "/",
    checkAuth(UserRole.ADMIN),
    userController.getAllUsers
)

router.get(
    "/me",
    checkAuth(UserRole.CUSTOMER, UserRole.PROVIDER, UserRole.ADMIN),
    userController.getMyProfile
);

router.patch(
    "/me",
    checkAuth(UserRole.CUSTOMER, UserRole.PROVIDER, UserRole.ADMIN),
    userController.updateMyProfile
);

router.get(
    "/:userId",
    checkAuth(UserRole.ADMIN),
    userController.getSingleUser
)

router.delete(
    "/:userId",
    checkAuth(UserRole.ADMIN),
    userController.deleteUser
)


router.patch(
    "/:userId",
    checkAuth(UserRole.ADMIN),
    userController.updateUser
)


export const userRouter: Router = router;