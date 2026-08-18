import { Router } from "express"
import { checkAuth } from "../../middleware/auth";
import { categoryController } from "./category.controller";

const router = Router();

// ==============================
// Public Routes
// ==============================

// Get All Category
router.get(
    "/",
    categoryController.getAllCategory
)


// Get Single Category
router.get(
    "/:categoryId",
    checkAuth("ADMIN"),
    categoryController.getSingleCategory
)

// ==============================
// Admin Routes
// ==============================


// create Category
router.post(
    "/",
    checkAuth("ADMIN"),
    categoryController.createCategory
)

// update cateroy
router.patch(
    "/:categoryId",
    checkAuth("ADMIN"),
    categoryController.updateCategory
)

// delete category
router.delete(
    "/:categoryId",
    checkAuth("ADMIN"),
    categoryController.deleteCategory
)


export const categoryRouter: Router = router 