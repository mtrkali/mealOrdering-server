import type { Request, Response } from "express";
import { mealService } from "./meals.service";


const getAllMeals = async (req: Request, res: Response) => {
    try {
        const meals = await mealService.getAllMeals(req.query);
        res.status(200).json({
            success: true,
            data: meals
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Something went wrong in getAllmeals controller",
            error: error.message,
        })
    }
}

const getMealById = async (req: Request, res: Response) => {
    try {
        const { mealId } = req.params;
        const meal = await mealService.getMealById(mealId as string);
        if (!meal) throw new Error("Meal not found");
        res.status(200).json({
            success: true,
            data: meal
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,

            error: error.message,
        })
    }
}

const createMeal = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        const result = await mealService.createMeal(req.body, userId as string)
        res.status(201).json({
            success: true,
            message: "meal created successfully",
            data: result
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Something went wrong while creating the meal",
            error: error.message,
        })
    }
}

const updateMeal = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        const { mealId } = req.params
        const result = await mealService.updateMeal(mealId as string, req.body, userId as string)
        res.status(200).json({
            success: true,
            message: "meal updated successfully",
            data: result
        })
    } catch (error: any) {
        const statusCode =
            error.message.includes("not authorized")
                ? 403
                : error.message.includes("not found")
                    ? 404
                    : 400;
        res.status(statusCode).json({
            success: false,
            message: "Something went wrong while updating the meal",
            error: error.message,
        })
    }
}


const deleteMeal = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const { mealId } = req.params
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            })
        }
        const result = await mealService.deleteMeal(mealId as string, userId as string)
        res.status(200).json({
            success: true,
            message: "meal deleted successfully",
            meal: result,
        })
    } catch (error: any) {
        const statusCode =
            error.message.includes("not authorized")
                ? 403
                : error.message.includes("not found")
                    ? 404
                    : 400;

        res.status(statusCode).json({
            success: false,
            message: "Something went wrong while deleting the meal",
            error: error.message,
        })
    }
}


const getMyMeals = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const result = await mealService.getMyMeals(userId as string)
        res.status(200).json({
            success: true,
            message: "all meal feached success!!",
            totalMeals: result.length,
            meals: result,
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "Something went wrong from getMyMeals controller",
            error: error.message,
        })
    }
}

export const mealsController = {
    getAllMeals,
    getMealById,
    createMeal,
    updateMeal,
    deleteMeal,
    getMyMeals,
}