import type { Request, Response } from "express";
import { userService } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUsers()
        res.status(201).json({
            message: "all user get success!!",
            totalUser: result.length,
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

export const userController = {
    getAllUsers,
    updateUser,
    getSingleUser,
    deleteUser,
}