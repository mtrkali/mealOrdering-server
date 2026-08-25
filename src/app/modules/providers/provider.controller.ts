
import type { Request, Response } from "express";
import { providerService } from "./provider.service";



const getAllProviders = async (req: Request, res: Response) => {
    try {
        const result = await providerService.getAllProviders();
        return res.status(200).json({
            success: true,
            message: "provider get success!",
            data: result
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong ggetAllProviders controller",
            details: error,
        })
    }
}

const getSingleProvider = async (req: Request, res: Response) => {
    try {
        const { providerId } = req.params
        const result = await providerService.getSingleProvider(providerId as string);
        return res.status(200).json({
            success: true,
            message: "provider get success!",
            data: result
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong  getSingleProvider controller",
            details: error,
        })
    }
}


const createProvider = async (req: Request, res: Response) => {
    try {
        const { userId, businessName, phone, address } = req.body;
        const result = await providerService.createProvider(userId, businessName, phone, address);
        return res.status(200).json({
            success: true,
            message: "provider created successfully!",
            data: result
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong createProvider controller",
            details: error,
        })
    }
}



const getProviderMeals = async (req: Request, res: Response) => {
    try {
        const { providerId } = req.params
        const result = await providerService.getProviderMeals(providerId as string);
        return res.status(200).json({
            success: true,
            message: "provider meals get success!",
            data: result
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong  getProviderMeals controller",
            details: error,
        })
    }
}

const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const result = await providerService.getProviderDashboarStats(userId as string);
        return res.status(200).json({
            success: true,
            message: "Provider dashboard stats retrieved successfully",
            data: result,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while getting provider dashboard stats",
            error: error.message,
        });
    }
}

const updateProviders = async (req: Request, res: Response) => {
    try {
        const { providerId } = req.params
        const { status } = req.body;
        const result = await providerService.updateProviders(providerId as string, status);
        return res.status(200).json({
            success: true,
            message: "provider update success!",
            data: result
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong  updateProviders controller",
            details: error,
        })
    }
}

export const providerController = {
    getAllProviders,
    createProvider,
    getSingleProvider,
    getProviderMeals,
    updateProviders,
    getDashboardStats,
}