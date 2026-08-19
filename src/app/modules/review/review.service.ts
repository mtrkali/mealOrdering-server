import { prisma } from "../../../lib/prisma";
import { Prisma } from "../../../generated/client";

type CreateReviewData = {
    mealId: string,
    orderId: string,
    rating: number,
    comment: string
}

const createReview = async (
    userId: string,
    reviewData: CreateReviewData
) => {
    const {
        mealId,
        orderId,
        rating,
        comment,
    } = reviewData;

    // Validate rating 
    if (!rating || rating < 1 || rating > 5) throw new Error("Rating must be between 1 and");

    // Check order 

    const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
            items: {
                include: {
                    meal: true,
                }
            }
        }
    })

    if (!order) throw new Error("Order not found");

    // Check order Owner.
    if (order.userId !== userId) throw new Error("you are not authorized to review this order");

    // Check meal exist in order
    const orderedMeal = order.items.find(
        (item) => item.mealId === mealId
    );

    if (!orderedMeal) {
        throw new Error(
            "you can not review a meal that you did not ordered"
        )
    }

    // Check duplicate review
    const existingReview =
        await prisma.review.findFirst({
            where: {
                userId,
                mealId,
            }
        })
    if (existingReview) {
        throw new Error(
            "You have already reviewed this meal"
        )
    }

    // Create review

    const review = await prisma.review.create({
        data: {
            userId,
            mealId,
            orderId,
            rating,
            comment: comment?.trim() || null,
        },

        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                }
            },

            meal: {
                select: {
                    id: true,
                    title: true,
                }
            }
        }
    })
    return review;
}


const getMealReviews = async (
    mealId: string
) => {
    const reviews = await prisma.review.findMany({
        where: { mealId },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                }
            }
        },
        orderBy: { createdAt: "desc" }
    })
    const totalReviews = reviews.length;
    const averageRating =
        reviews.length > 0
            ? reviews.reduce(
                (sum, review) =>
                    sum + review.rating,
                0
            ) / reviews.length
            : 0;

    return { reviews, averageRating, totalReviews }
}


const getMyReviews = async (
    userId: string
) => {
    return prisma.review.findMany({
        where: { userId },
        include: {
            meal: {
                select: {
                    id: true,
                    title: true,
                    image: true,
                }
            }
        },
        orderBy: { createdAt: "desc" }
    })
};

const updateReview = async (
    reviewId: string,
    userId: string,
    data: {
        rating?: number;
        comment?: string;
    }
) => {
    const review =
        await prisma.review.findUnique({ where: { id: reviewId } })
    if (!review) throw new Error("review not found");
    if (review.userId! == userId) {
        throw new Error(
            "You are nto authorized to update this review"
        )
    }
    if (data.rating !== undefined &&
        (data.rating < 1 ||
            data.rating > 5
        )
    ) {
        throw new Error(
            "Rating must be between 1 and 5"
        )
    }
    return prisma.review.update({
        where: { id: reviewId },
        data: {
            ...(data.rating !== undefined && {
                rating: data.rating,
            }),
            ...(data.comment !== undefined && {
                comment: data.comment.trim(),
            })
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                }
            }
        }
    })
}

const deleteReview = async (
    reviewId: string,
    userId: string,
    isAdmin: boolean
) => {
    const review = await prisma.review.findUnique({
        where: { id: reviewId }
    })
    if (!review) throw new Error("Review not found");

    if (!isAdmin &&
        review.userId !== userId
    ) {
        throw new Error(
            "you are not authorized to delete this review"
        )
    }
    return prisma.review.delete({
        where: {
            id: reviewId,
        }
    })
}

export const reviewService = {
    createReview,
    getMealReviews,
    getMyReviews,
    updateReview,
    deleteReview,
};