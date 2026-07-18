import { Router } from "express";
import { checkAuth, UserRole } from "../../middleware/auth";
import { orderController } from "./order.controller";


const router = Router()
router.post(
    "/",
    orderController.createOrder
)

router.get(
    "/",
    orderController.getAllOrders
)

router.get(
    "/me",
    checkAuth(UserRole.ADMIN, UserRole.CUSTOMER),
    orderController.getUsersOrder
)

router.get(
    "/me/:orderId",
    checkAuth(UserRole.ADMIN, UserRole.CUSTOMER),
    orderController.getUserSingleOrder
)

router.get(
    "/:orderId",
    orderController.getSingleOrders
)
   

router.patch(
    "/:orderId",
    checkAuth(UserRole.ADMIN, UserRole.PROVIDER),
    orderController.updateOrder
)

router.delete(
    "/:orderId",
    checkAuth(UserRole.ADMIN,UserRole.CUSTOMER),
    orderController.deleteOrder
)

export const  orderRouter: Router = router;