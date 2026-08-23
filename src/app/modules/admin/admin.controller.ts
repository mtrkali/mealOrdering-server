import type { Request, Response } from "express";

import { adminService } from "./admin.service";

const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const result = await adminService.getDashboardStats();

        res.status(200).json({
            success: true,
            message: "Admin dashboard stats retrieved successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to get admin dashboard stats",
            error: error.message,
        });
    }
};

export const adminController = {
    getDashboardStats,
};