import { Router } from "express";
import { userController } from "./user.controller";
import { checkAuth, UserRole } from "../../middleware/auth";
const router = Router();
router.get("/", checkAuth(UserRole.ADMIN), userController.getAllUsers);
router.get("/:userId", checkAuth(UserRole.ADMIN), userController.getSingleUser);
router.delete("/:userId", checkAuth(UserRole.ADMIN), userController.deleteUser);
router.patch("/", checkAuth(UserRole.ADMIN), userController.updateUser);
export const userRouter = router;
//# sourceMappingURL=user.router.js.map