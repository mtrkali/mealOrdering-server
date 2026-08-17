import { orderService } from "./order.service";
import type { Request, Response } from "express";


const getAllOrders  = async(req: Request, res:Response)=>{
    try {
         const result = await orderService.getAllOrders();
         res.status(201).json({
             message: "all order get success for admin!!",
             data: result,
         })
        } catch (error: any) {
            res.status(500).json({
               message: "Something went wrong from getAllOrders controller (admin)",
               error: error.message,
        })
     }
}


const getSingleOrders  = async(req: Request, res:Response)=>{
    try {
        const {orderId} = req.params;
         const result = await orderService.getSingleOrder(orderId as string);
         res.status(201).json({
             message: "single order get success for admin!!",
             data: result,
         })
        } catch (error: any) {
            res.status(500).json({
               message: "Something went wrong from getSingleOrder controller ",
               error: error.message,
        })
     }
}


const createOrder  = async(req: Request, res:Response)=>{
    try {
        const {id: userId} = req.user;
         const result = await orderService.createOrder(userId, req.body);
         res.status(201).json({
             message: " order create success ",
             data: result,
         })
        } catch (error: any) {
            res.status(500).json({
               message: "Something went wrong from createOrder controller (admin)",
               error: error.message,
        })
     }
}


const updateOrder = async(req: Request, res:Response)=>{
    try {
        const{orderId} = req.params;
        const {id: userId, role} = req.user;
        const {status} = req.body;
        if(!status) {
            return res.status(400).json({
                success: false,
                message: "order status is required",
            })
        }
         const result = await orderService.updateOrder(orderId as string, userId as string, role as string, status);
         res.status(201).json({
             message: "update order success",
             data: result,
         })
        } catch (error: any) {
            res.status(500).json({
               message: "Something went wrong from updateOrder controller",
               error: error.message,
        })
     }
}


const deleteOrder  = async(req: Request, res:Response)=>{
    try {
        const {orderId} = req.params;
        const{id: userId, role} = req.user;
         const result = await orderService.deleteOrder(orderId as string, userId as string, role as string);
         res.status(201).json({
             message: "delete order success!!",
             data: result,
         })
        } catch (error: any) {
            res.status(500).json({
               message: "Something went wrong from deleteOrder controller",
               error: error.message,
        })
     }
}


const getUsersOrder  = async(req: Request, res:Response)=>{
    try {
        const {id} = req.user;
         const result = await orderService.getUsersOrder(id as string);
         res.status(200).json({
             message: "all order get success of self User",
             totalOrder: result.total,
             data: result.data,
         })
        } catch (error: any) {
            res.status(500).json({
               message: "Something went wrong from getUsersOrder controller",
               error: error.message,
        })
     }
}

const getUserSingleOrder = async(req: Request, res: Response) => {
    try {
        const { id } = await req.user;
        console.log("in",id)
        const { orderId } = req.params;
        const result = await orderService.getUserSingleOrder(id as string, orderId as string);
        res.status(200).json({
            message: "single order get success of self User",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            message: "Something went wrong from getUserSingleOrder controller",
            error: error.message,
        });
    }
}


const getProviderOrders = async (req: Request, res: Response) => {
    try {
        const { id: userId } = req.user;
        const orders = await orderService.getProviderOrders(userId as string);
        res.status(200).json({
            message: "Provider orders retrieved successfully",
            totalOrders: orders.length,
            data: orders,
        });
    } catch (error: any) {
        res.status(500).json({
            message: "Something went wrong from getProviderOrders controller",
            error: error.message,
        });
    }
}

export const orderController = {
    getAllOrders, 
    getSingleOrders, 
    createOrder,
    updateOrder,
    deleteOrder,
    getUsersOrder,
    getUserSingleOrder,
    getProviderOrders,
}
