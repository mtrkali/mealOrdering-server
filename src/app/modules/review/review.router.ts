import { Router } from "express";

import {
    checkAuth,
    UserRole,
} from "../../middleware/auth";

import {
    reviewController,
} from "./review.controller";


const router = Router();


// ==============================
// Public
// ==============================

router.get(
    "/meal/:mealId",
    reviewController.getMealReviews
);


// ==============================
// Customer
// ==============================

router.get(
    "/my",
    checkAuth(UserRole.CUSTOMER),
    reviewController.getMyReviews
);

router.post(
    "/",
    checkAuth(UserRole.CUSTOMER),
    reviewController.createReview
);

router.patch(
    "/:reviewId",
    checkAuth(UserRole.CUSTOMER),
    reviewController.updateReview
);


// ==============================
// Customer/Admin
// ==============================

router.delete(
    "/:reviewId",
    checkAuth(
        UserRole.CUSTOMER,
        UserRole.ADMIN
    ),
    reviewController.deleteReview
);


export const reviewRouter = router;