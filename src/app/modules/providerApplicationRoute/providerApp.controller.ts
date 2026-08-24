import type { Request, Response } from "express";
import { providerApplicationService } from "./providerApp.service";
import { Prisma } from "../../../generated/client";

const createProviderApplicationController = async (req: Request, res: Response) => {
    try {
        const { businessName, phone, address } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const inputData: Prisma.providerApplicationCreateInput = {
            businessName,
            phone,
            address,
            user: {
                connect: {
                    id: userId
                }
            }
        }
        const result = await providerApplicationService.createProviderApplication(inputData)

        return res.status(201).json({
            success: true,
            message: "beProvider application success!!",
            data: result
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "an error occured in createProviderApplicationController",
            details: error.message
        })
    }
}

const approveBeProviderApplication = async (req: Request, res: Response) => {
    try {
        const result = await providerApplicationService.approveBeProviderApplication(req.body)
        return res.status(200).json({
            success: true,
            message: "provider approve success",
            data: result,
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "an error occured approveBeProviderApplication controller",
            error: error.message
        })
    }
}

export const providerApplicationController = {
    createProviderApplicationController,
    approveBeProviderApplication
}