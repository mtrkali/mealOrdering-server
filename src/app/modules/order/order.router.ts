import { Router } from "express";
import { checkAuth, UserRole } from "../../middleware/auth";
import { orderController } from "./order.controller";


const router = Router()



// customer create an order 
router.post(
    "/",
    checkAuth(UserRole.CUSTOMER),
    orderController.createOrder
)

// Admin gets all orders
router.get(
    "/",
    checkAuth(UserRole.ADMIN),
    orderController.getAllOrders
)

// Customer get own orders
router.get(
    "/me",
    checkAuth(UserRole.CUSTOMER),
    orderController.getUsersOrder
)

// provider gets all orders of his meals
router.get(
    "/provider",
    checkAuth(UserRole.PROVIDER),
    orderController.getProviderOrders
)

router.get(
    "/provider/:orderId",
    checkAuth(UserRole.PROVIDER),
    orderController.getProviderSingleOrder
);

// Customer get own single Order
router.get(
    "/me/:orderId",
    checkAuth(UserRole.CUSTOMER),
    orderController.getUserSingleOrder
)

// admin gets any single order
router.get(
    "/:orderId",
    checkAuth(UserRole.ADMIN),
    orderController.getSingleOrders
)

// provider/Admin updates order status
router.patch(
    "/:orderId",
    checkAuth(UserRole.ADMIN, UserRole.PROVIDER),
    orderController.updateOrder
)

// Customer /Admin deltes order
router.delete(
    "/:orderId",
    checkAuth(UserRole.ADMIN, UserRole.CUSTOMER),
    orderController.deleteOrder
)



export const orderRouter: Router = router;