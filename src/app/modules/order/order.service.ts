import { create } from "node:domain";
import { Prisma } from "../../../generated/client";
import { prisma } from "../../../lib/prisma";

const getAllOrders = async() =>{
    const totalOrders = await prisma.order.count();
    const orders = await prisma.order.findMany({
        include: {
            user: true,
            items: {
                include: {
                    meal: true,
                },
            },
        },
    });
    return {total: totalOrders, data: orders}
}

const createOrder = async (orderData: any) => {
    const {items, ...order} = orderData;
    return await prisma.order.create({
        data: {
            ...order,
            items: {
                create: items.map((item: any) => ({
                    mealId: item.mealId,
                    quantity: item.quantity,
                    price: item.price,
                }))
            }
        },
        include: {
            items: true,
        }
    })
}

const getSingleOrder = async(orderId: string) =>{
    return await prisma.order.findUnique({
        where: {id: orderId},
        select: {
            id: true,
            status: true,
            totalPrice: true,
            address: true,
            createdAt: true,

            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    image: true,
                },
            },
            items: {
                select: {
                    id: true,
                    quantity: true,
                    price: true,
                    meal: {
                        select:{
                            id: true,
                            title: true,
                            image: true,
                            cuisine: true,
                        }
                    }
                }
            }
        }
    })
}

const updateOrder = async(orderId: string, orderData: Prisma.OrderUpdateInput)=>{
    const isExistOrder = await prisma.order.findFirst({where: {id: orderId}});
    if(!isExistOrder) {throw new Error ("Order is not exist")};
    return await prisma.order.update({
        where: {id: orderId},
        data: orderData
    })
}

const deleteOrder = async(orderId: string, userId: string, role:string) =>{

    
    const isExistOrder = await prisma.order.findFirst({where: {id: orderId}});
    if(!isExistOrder) {throw new Error ("Order is not exist")};
    if(isExistOrder.userId !== userId && role !== "ADMIN") throw new Error("you have not access!!")
    
    return await prisma.$transaction(async(tx) => {
      await tx.orderItem.deleteMany({where: {orderId}})
      return await tx.order.delete({where: {id: orderId}})
    })
   
}

const getUsersOrder = async(userId: string) => {
    const orders = await prisma.order.findMany({
        where: {userId},
        select: {
            id:true,
            status: true,
            totalPrice: true,
            address: true,
            createdAt: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    phone: true,
                    email: true,
                    image: true,
                }
            },
            items: {
                select: {
                    id: true,
                    quantity: true,
                    price: true,
                    meal: {
                        select:{
                            id: true,
                            title: true,
                            image: true,
                            cuisine:true
                        }
                    }
                }
            }
        },
        orderBy: {createdAt: "desc"}
    })
    const totalOrders = await prisma.order.count({where: {userId}});
    return {
        total: totalOrders,
        data: orders,
    }
}

const getUserSingleOrder = async(userId: string, orderId: string) => {
    return await prisma.order.findFirst({
        where: {
            id: orderId,
            userId,
        },
        include: {
            user: true,
            items: {
                include: {
                    meal: true,
                },
            },
        },
    })
}

export const orderService = {
    getAllOrders,
    createOrder,
    getSingleOrder,
    updateOrder, 
    deleteOrder, 
    getUsersOrder,
    getUserSingleOrder,
}
