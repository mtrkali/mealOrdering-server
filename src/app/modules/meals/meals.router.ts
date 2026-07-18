import express from "express"
import { mealsController } from "./meals.controller";
import { checkAuth, UserRole } from "../../middleware/auth";


const router = express.Router();

router.get(
    "/", 
    mealsController.getAllMeals
);

router.get(
    "/self",
     checkAuth(UserRole.PROVIDER, UserRole.ADMIN, UserRole.CUSTOMER),
     mealsController.getMyMeals 
)

router.get(
    "/:mealId",
    mealsController.getMealById
);

router.post(
    "/", 
    checkAuth(UserRole.PROVIDER, UserRole.ADMIN, UserRole.CUSTOMER),
    mealsController.createMeal
)

router.patch(
    "/:mealId",
     checkAuth(UserRole.PROVIDER, UserRole.ADMIN, UserRole.CUSTOMER),
     mealsController.updateMeal
)

router.delete(
    "/:mealId",
     checkAuth(UserRole.PROVIDER, UserRole.ADMIN, UserRole.CUSTOMER),
     mealsController.deleteMeal 
)


export const mealsRouter = router;