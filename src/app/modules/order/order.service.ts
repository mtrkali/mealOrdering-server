
import { Prisma } from "../../../generated/client";
import { prisma } from "../../../lib/prisma";
import { UserRole } from "../../middleware/auth";

const getAllOrders = async () => {
    return await prisma.order.findMany({
        include: {
            user: true,
            items: {
                include: {
                    meal: true,
                },
            },
        },
    });
}

const createOrder = async (
    userId: string,
    orderData: {
        address: string;
        items: {
            mealId: string;
            quantity: number;
        }[];
    }
) => {
    const { address, items } = orderData;

    if (!address?.trim()) {
        throw new Error("Delivery address is required");
    }

    if (!items || items.length === 0) {
        throw new Error("Order must contain at least one meal");
    }

    // Prevent duplicate meal IDs
    const mealIds = [...new Set(items.map((item) => item.mealId))];

    if (mealIds.length !== items.length) {
        throw new Error("Duplicate meals are not allowed in the same order");
    }

    // Validate quantities
    for (const item of items) {
        if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
            throw new Error("Quantity must be a positive integer");
        }
    }

    // Get actual meals from database
    const meals = await prisma.meal.findMany({
        where: {
            id: {
                in: mealIds,
            },
        },
        select: {
            id: true,
            price: true,
            title: true,
        },
    });

    // Check all requested meals exist
    if (meals.length !== mealIds.length) {
        const foundMealIds = new Set(meals.map((meal) => meal.id));

        const missingMeals = mealIds.filter(
            (mealId) => !foundMealIds.has(mealId)
        );

        throw new Error(
            `Some meals were not found: ${missingMeals.join(", ")}`
        );
    }

    const mealMap = new Map(
        meals.map((meal) => [meal.id, meal])
    );

    // Calculate total using DB prices
    const orderItems = items.map((item) => {
        const meal = mealMap.get(item.mealId)!;

        return {
            mealId: meal.id,
            quantity: item.quantity,
            price: meal.price,
        };
    });

    const totalPrice = orderItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const order = await prisma.order.create({
        data: {
            userId,
            address: address.trim(),
            totalPrice,
            items: {
                create: orderItems,
            },
        },
        include: {
            items: {
                include: {
                    meal: true,
                },
            },
        },
    });

    return order;
};

const getSingleOrder = async (orderId: string) => {
    return await prisma.order.findUnique({
        where: { id: orderId },
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
                        select: {
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

const updateOrder = async (
    orderId: string,
    userId: string,
    role: string,
    status: Prisma.OrderUpdateInput["status"]
) => {
    const order = await prisma.order.findUnique({
        where: { id: orderId },

        include: {
            items: {
                include: {
                    meal: {
                        select: {
                            providerId: true,
                        },
                    },
                },
            },
        },
    });

    if (!order) throw new Error("Order not found");
    // Admin can update any order
    if (role === UserRole.ADMIN) {
        const data: Prisma.OrderUpdateInput = status === undefined ? {} : { status };

        return await prisma.order.update({
            where: { id: orderId },
            data,
        });
    }

    // provider profile 
    const provider = await prisma.providerProfile.findUnique({
        where: { userId },
        select: { id: true }
    });
    if (!provider) throw new Error("Provider profile not found for this user");
    // check whether this order contains this provider's meal
    const owsMeal = order.items.some(item => item.meal.providerId === provider.id);
    if (!owsMeal) throw new Error("you don't have permission to update this order");
    return prisma.order.update({
        where: { id: orderId },
        data: status === undefined ? {} : { status },
    })
}

const deleteOrder = async (orderId: string, userId: string, role: string) => {


    const isExistOrder = await prisma.order.findFirst({ where: { id: orderId } });
    if (!isExistOrder) { throw new Error("Order is not exist") };
    if (isExistOrder.userId !== userId && role !== "ADMIN") throw new Error("you have not access!!")

    return await prisma.$transaction(async (tx) => {
        await tx.orderItem.deleteMany({ where: { orderId } })
        return await tx.order.delete({ where: { id: orderId } })
    })

}

const getUsersOrder = async (userId: string) => {
    const orders = await prisma.order.findMany({
        where: { userId },
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
                        select: {
                            id: true,
                            title: true,
                            image: true,
                            cuisine: true
                        }
                    }
                }
            }
        },
        orderBy: { createdAt: "desc" }
    })
    const totalOrders = await prisma.order.count({ where: { userId } });
    return {
        total: totalOrders,
        data: orders,
    }
}

const getUserSingleOrder = async (userId: string, orderId: string) => {

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


const getProviderOrders = async (userId: string) => {
    const provider = await prisma.providerProfile.findUnique({
        where: { userId },
        select: { id: true }
    })
    if (!provider) throw new Error("Provider profile not found for this user");
    const orders = await prisma.order.findMany({
        where: {
            items: {
                some: {
                    meal: {
                        providerId: provider.id
                    }
                }
            }
        },
        include: {
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
                where: {
                    meal: {
                        providerId: provider.id
                    },
                },
                include: {
                    meal: {
                        select: {
                            id: true,
                            title: true,
                            image: true,
                            price: true,
                            cuisine: true,
                        }
                    }
                }
            }
        },

        orderBy: { createdAt: "desc" },
    });

    return orders;
}

const getProviderSingleOrder = async (userId: string, orderId: string) => {
    const provider = await prisma.providerProfile.findUnique({
        where: { userId },
        select: { id: true }
    })
    if (!provider) throw new Error("provider profile not found for user");

    const order = await prisma.order.findFirst({
        where: {
            id: orderId,
            items: {
                some: {
                    meal: {
                        providerId: provider.id
                    }
                }
            }
        },
        include: {
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
                where: {
                    meal: { providerId: provider.id }
                },
                include: {
                    meal: {
                        select: {
                            id: true,
                            title: true,
                            image: true,
                            price: true,
                            cuisine: true,
                        }
                    }
                }
            }
        }
    })
    if (!order) throw new Error("Order not found or you don't have access to this order")
    return order;
}
export const orderService = {
    getAllOrders,
    createOrder,
    getSingleOrder,
    updateOrder,
    deleteOrder,
    getUsersOrder,
    getUserSingleOrder,
    getProviderOrders,
    getProviderSingleOrder,
}
