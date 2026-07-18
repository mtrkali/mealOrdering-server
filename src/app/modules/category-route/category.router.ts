import { Router } from "express"
import { checkAuth } from "../../middleware/auth";
import { categoryController } from "./category.controller";

const router = Router();

router.post (
    "/",
    checkAuth("ADMIN"),
    categoryController.createCategory
)

router.get(
    "/",
    checkAuth("ADMIN"),
    categoryController.getAllCategory
)

router.get(
    "/:categoryId",
    checkAuth("ADMIN"),
    categoryController.getSingleCategory
)

router.delete(
    "/:categoryId",
    checkAuth("ADMIN"),
    categoryController.deleteCategory
)

router.patch(
    "/:categoryId",
    checkAuth("ADMIN"),
    categoryController.updateCategory
)
export const categoryRouter:Router = router 