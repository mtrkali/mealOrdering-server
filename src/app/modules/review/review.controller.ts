import type {
    Request,
    Response,
} from "express";

import { reviewService } from "./review.service";


const createReview = async (
    req: Request,
    res: Response
) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }


        const result =
            await reviewService.createReview(
                userId,
                req.body
            );


        res.status(201).json({
            success: true,
            message: "Review created successfully",
            data: result,
        });

    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getMealReviews = async (
    req: Request,
    res: Response
) => {
    try {
        const { mealId } = req.params;


        const result =
            await reviewService.getMealReviews(
                mealId as string
            );


        res.status(200).json({
            success: true,
            data: result,
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getMyReviews = async (
    req: Request,
    res: Response
) => {
    try {
        const userId = req.user?.id;


        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }


        const result =
            await reviewService.getMyReviews(
                userId
            );


        res.status(200).json({
            success: true,
            data: result,
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateReview = async (
    req: Request,
    res: Response
) => {
    try {
        const userId = req.user?.id;
        const { reviewId } = req.params;


        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }


        const result =
            await reviewService.updateReview(
                reviewId as string,
                userId,
                req.body
            );


        res.status(200).json({
            success: true,
            message: "Review updated successfully",
            data: result,
        });

    } catch (error: any) {
        const status =
            error.message.includes(
                "not authorized"
            )
                ? 403
                : 400;


        res.status(status).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteReview = async (
    req: Request,
    res: Response
) => {
    try {
        const userId = req.user?.id;
        const { reviewId } = req.params;

        const isAdmin =
            req.user?.role === "ADMIN";


        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }


        const result =
            await reviewService.deleteReview(
                reviewId as string,
                userId,
                isAdmin
            );


        res.status(200).json({
            success: true,
            message: "Review deleted successfully",
            data: result,
        });

    } catch (error: any) {
        const status =
            error.message.includes(
                "not authorized"
            )
                ? 403
                : 400;


        res.status(status).json({
            success: false,
            message: error.message,
        });
    }
};


export const reviewController = {
    createReview,
    getMealReviews,
    getMyReviews,
    updateReview,
    deleteReview,
};