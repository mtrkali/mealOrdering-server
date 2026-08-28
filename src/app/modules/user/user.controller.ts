import type { Request, Response } from "express";
import { userService } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUsers()
        res.status(201).json({
            message: "all user get success!!",
            totalUsers: result.length,
            data: result,
        })
    } catch (error: any) {
        res.status(500).json({
            message: "Something went wrong from getAllUsers controller",
            error: error.message,
        })
    }
}


const getSingleUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await userService.getSingleUser(userId as string)
        res.status(201).json({
            message: "single user get success!!",
            data: result,
        })
    } catch (error: any) {
        res.status(500).json({
            message: "Something went wrong from getSingleUser controller",
            error: error.message,
        })
    }
}


const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await userService.updateUser(userId as string, req.body)
        res.status(201).json({
            message: "user update success!!",
            data: result,
        })
    } catch (error: any) {
        res.status(500).json({
            message: "Something went wrong from updateUser controller",
            error: error.message,
        })
    }
}


const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        if (req.user?.id === userId) {
            return res.status(400).json({
                success: false,
                message: "Admin cannot delete their own account.",

            })
        }
        const result = await userService.deleteUser(userId as string)
        res.status(201).json({
            message: "single user delete success!!",
            data: result,
        })
    } catch (error: any) {
        res.status(500).json({
            message: "Something went wrong from deleteUser controller",
            error: error.message,
        })
    }
}


const getMyProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const result = await userService.getMyProfile(userId);

        return res.status(200).json({
            success: true,
            message: "Profile retrieved successfully",
            data: result,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Failed to get profile",
            error: error.message,
        });
    }
};


const updateMyProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const { name, phone, image } = req.body;
        const result = await userService.updateMyProfile(userId, { name, phone, image })

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: result,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Failed to update profile",
            error: error.message,
        });
    }
};
export const userController = {
    getAllUsers,
    updateUser,
    getSingleUser,
    deleteUser,
    getMyProfile,
    updateMyProfile,
}