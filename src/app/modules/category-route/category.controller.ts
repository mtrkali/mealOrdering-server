import type { Request, Response } from "express"
import { categoryService } from "./category.service";

const createCategory = async (req: Request, res: Response)=>{
     try {
            const {name} = req.body;
            const result = await categoryService.createCategory(name)
            res.status(201).json({
                message: "category create success!!",
                data: result,
            })
        } catch (error: any) {
             res.status(500).json({
                message: "Something went wrong from createCategory controller",
                error: error.message,
            })
     }
} 



const getAllCategory = async (req: Request, res: Response)=>{
     try {
            const result = await categoryService.getAllCategory();
            res.status(201).json({
                success: true,
                message: "category get success!!",
                totalCategory: result.total,
                data: result.data
            })
        } catch (error: any) {
             res.status(500).json({
                message: "Something went wrong from getAllCategory controller",
                error: error.message,
            })
     }
} 



const getSingleCategory = async (req: Request, res: Response)=>{
     try {
            const {categoryId} = req.params;
            const result = await categoryService.getSingleCategory(categoryId as string);
            res.status(201).json({
                success: true,
                message: "getSingleCategory success!!",
                data: result
            })
        } catch (error: any) {
             res.status(500).json({
                message: "Something went wrong from getSingleCategory controller",
                error: error.message,
            })
     }
} 




const updateCategory = async (req: Request, res: Response)=>{
     try {
            const {categoryId} = req.params;
            const result = await categoryService.updateCategoy(categoryId as string, req.body);
            res.status(201).json({
                success: true,
                message: "category update success!!",
                data: result
            })
        } catch (error: any) {
             res.status(500).json({
                message: "Something went wrong from updateCategory controller",
                error: error.message,
            })
     }
} 



const deleteCategory = async (req: Request, res: Response)=>{
     try {
            const {categoryId} = req.params;
            const result = await categoryService.deleteCategory(categoryId as string);
            res.status(201).json({
                success: true,
                message: "category delete success!!",
                data: result
            })
        } catch (error: any) {
             res.status(500).json({
                message: "Something went wrong from deleteCategory controller",
                error: error.message,
            })
     }
} 



export const categoryController = {
    createCategory,
    getAllCategory,
    updateCategory,
    getSingleCategory,
    deleteCategory
}