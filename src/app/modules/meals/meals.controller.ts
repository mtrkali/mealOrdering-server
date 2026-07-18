import type { Request, Response } from "express";
import { mealService } from "./meals.service";


const getAllMeals = async (req: Request, res: Response) => {
    try {
        const meals = await mealService.getAllMeals(req.query);
        res.status(200).json(meals);
    } catch (error: any) {
        res.status(500).json({
            message: "Something went wrong in getAllmeals controller",
            error: error.message,
        })
    }
}

const getMealById = async (req: Request, res: Response) => {
    try {
        const {mealId} = req.params;
        const meal = await mealService.getMealById(mealId as string);
        res.status(200).json(meal);
    } catch (error: any) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        })
    }
}

const createMeal = async (req: Request, res: Response)=>{
    try {
        const user = req.user;
        const result = await mealService.createMeal(req.body, user?.id as string)
        res.status(201).json(result)
    } catch (error: any) {
         res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        })
    }
}

const updateMeal  = async (req: Request, res: Response)=>{
    try {
        const user = req.user;
        const {mealId} = req.params
        const result = await mealService.updateMeal(mealId as string ,req.body, user?.id as string)
        res.status(201).json(result)
    } catch (error: any) {
         res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        })
    }
}


const deleteMeal   = async (req: Request, res: Response)=>{
    try {
        const user = req.user;
        const {mealId} = req.params
        const result = await mealService.deleteMeal(mealId as string, user?.id as string)
        res.status(201).json({
            message: "meal delete success!!",
            meal: result,
        })
    } catch (error: any) {
         res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        })
    }
}


const getMyMeals = async (req: Request, res: Response)=>{
    try {
        const user = req.user;
        const result = await mealService.getMyMeals(user?.id as string)
        res.status(201).json({
            message: "all meal feached success!!",
            meal: result,
        })
    } catch (error: any) {
         res.status(500).json({
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