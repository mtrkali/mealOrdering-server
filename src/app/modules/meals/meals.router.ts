import express from "express";
import { mealsController } from "./meals.controller";
import { checkAuth, UserRole } from "../../middleware/auth";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Provider Routes
|--------------------------------------------------------------------------
*/

// Get provider's own meals
router.get(
    "/self",
    checkAuth(UserRole.PROVIDER),
    mealsController.getMyMeals
);

// Create a meal
router.post(
    "/",
    checkAuth(UserRole.PROVIDER),
    mealsController.createMeal
);



/*
|--------------------------------------------------------------------------
| Admin Routes - Meal Management
|--------------------------------------------------------------------------
*/

// Admin update any meal
router.patch(
    "/admin/:mealId",
    checkAuth(UserRole.ADMIN),
    mealsController.adminUpdateMeal
);

// Admin delete any meal
router.delete(
    "/admin/:mealId",
    checkAuth(UserRole.ADMIN),
    mealsController.adminDeleteMeal
);
/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Get all meals
router.get(
    "/",
    mealsController.getAllMeals
);

// Get single meal
router.get(
    "/:mealId",
    mealsController.getMealById
);

/*
|--------------------------------------------------------------------------
| Provider Routes - Meal Management
|--------------------------------------------------------------------------
*/

// Update own meal
router.patch(
    "/:mealId",
    checkAuth(UserRole.PROVIDER),
    mealsController.updateMeal
);

// Delete own meal
router.delete(
    "/:mealId",
    checkAuth(UserRole.PROVIDER),
    mealsController.deleteMeal
);




export const mealsRouter = router;