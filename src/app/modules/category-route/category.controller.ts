import type { Request, Response } from "express";
import { categoryService } from "./category.service";


const createCategory = async (
    req: Request,
    res: Response
) => {
    try {
        const { name } = req.body;

        const result =
            await categoryService.createCategory(name);

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


const getAllCategory = async (
    req: Request,
    res: Response
) => {
    try {
        const result =
            await categoryService.getAllCategory();

        res.status(200).json({
            success: true,
            message: "Categories fetched successfully",
            totalCategory: result.length,
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


const getSingleCategory = async (
    req: Request,
    res: Response
) => {
    try {
        const { categoryId } = req.params;

        const result =
            await categoryService.getSingleCategory(
                categoryId as string
            );

        res.status(200).json({
            success: true,
            message: "Category fetched successfully",
            data: result,
        });
    } catch (error: any) {
        const statusCode =
            error.message === "Category not found"
                ? 404
                : 500;

        res.status(statusCode).json({
            success: false,
            message: error.message,
        });
    }
};


const updateCategory = async (
    req: Request,
    res: Response
) => {
    try {
        const { categoryId } = req.params;

        const result =
            await categoryService.updateCategory(
                categoryId as string,
                req.body
            );

        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: result,
        });
    } catch (error: any) {
        const statusCode =
            error.message === "Category not found"
                ? 404
                : 400;

        res.status(statusCode).json({
            success: false,
            message: error.message,
        });
    }
};


const deleteCategory = async (
    req: Request,
    res: Response
) => {
    try {
        const { categoryId } = req.params;

        const result =
            await categoryService.deleteCategory(
                categoryId as string
            );

        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            data: result,
        });
    } catch (error: any) {
        const statusCode =
            error.message === "Category not found"
                ? 404
                : 400;

        res.status(statusCode).json({
            success: false,
            message: error.message,
        });
    }
};


export const categoryController = {
    createCategory,
    getAllCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory,
};