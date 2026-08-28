import { ProviderProfileStatus } from "../../../generated/enums"
import { prisma } from "../../../lib/prisma"

const getAllProviders = async () => {
    return await prisma.providerProfile.findMany({
        include: {
            user: true,
        }
    })
}

const getSingleProvider = async (providerId: string) => {
    const isExistPoriver = await prisma.providerProfile.findFirst({ where: { id: providerId } })
    if (!isExistPoriver) throw new Error("provider is not exists")
    return await prisma.providerProfile.findUnique({
        where: { id: providerId },
        include: { user: true }
    })
}


const createProvider = async (userId: string, businessName: string, phone: string, address: string) => {
    return await prisma.providerProfile.create({
        data: {
            userId,
            businessName,
            phone,
            address
        }
    })
}

const getProviderMeals = async (providerId: string) => {
    const isExistPoriver = await prisma.providerProfile.findFirst({ where: { id: providerId } })
    if (!isExistPoriver) throw new Error("provider is not exists")
    return await prisma.meal.findMany({ where: { providerId } })
}

const getProviderDashboarStats = async (userId: string) => {
    const provider = await prisma.providerProfile.findUnique({
        where: { userId },
        select: {
            id: true,
        }
    })
    if (!provider) {
        throw new Error("Provider profile not found");
    }
    const providerId = provider.id;

    const [
        totalMeals,
        totalOrders,
        revenueRasult,
        placedOrders,
        preparingOrders,
        readyOrders,
        deliveredOrders,
        cancelledOrders
    ] = await Promise.all([
        prisma.meal.count({ where: { providerId } }),

        // Total orders containing this provider's meals
        prisma.order.count({
            where: {
                items: {
                    some: {
                        meal: {
                            providerId,
                        },
                    },
                },
            },
        }),

        // Revenue from the provider's meals
        prisma.orderItem.aggregate({
            where: {
                meal: { providerId }
            },
            _sum: {
                price: true,
            },
        }),

        // placed orders
        prisma.order.count({
            where: {
                status: "PLACED",
                items: {
                    some: {
                        meal: {
                            providerId,
                        }
                    }
                }
            }
        }),

        // preparing order count 
        prisma.order.count({
            where: { status: "PREPARING", items: { some: { meal: { providerId } } } }
        }),

        // Ready order count
        prisma.order.count({
            where: { status: "READY", items: { some: { meal: { providerId } } } }
        }),

        // Delivered order count
        prisma.order.count({
            where: { status: "READY", items: { some: { meal: { providerId } } } }
        }),

        // Cancellled order count
        prisma.order.count({
            where: { status: "CANCELLED", items: { some: { meal: { providerId } } } }
        }),
    ])

    return {
        totalMeals,
        totalOrders,
        totalRevenue: revenueRasult._sum.price ?? 0,
        orderStatus: {
            placed: placedOrders,
            ready: readyOrders,
            preparing: preparingOrders,
            delivered: deliveredOrders,
            cancelled: cancelledOrders,
        }
    }
}

const updateProviders = async (providerId: string, status: ProviderProfileStatus) => {
    const isExistPoriver = await prisma.providerProfile.findFirst({ where: { id: providerId } })
    if (!isExistPoriver) throw new Error("provider is not exists")

    return await prisma.providerProfile.update({
        where: { id: providerId },
        data: { status },
    })
}

const getMyProviderProfile = async (userId: string) => {
    const provider = await prisma.order.findUnique({
        where: { id: userId },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    image: true,
                    status: true,
                    role: true,
                }
            }
        }
    })
    if (!provider) throw new Error("Provider not found");
    return provider;
}

const updateMyProviderProfile = async (
    userId: string,
    updateData: {
        businessName?: string,
        phone?: string,
        address?: string,
    }
) => {
    const provider = await prisma.providerProfile.findUnique({
        where: { userId },
    });

    if (!provider) {
        throw new Error("Provider profile not found");
    }

    const data: {
        businessName?: string,
        phone?: string,
        address?: string
    } = {};

    if (updateData.businessName !== undefined) {
        const businessName = updateData.businessName?.trim();
        if (!businessName) throw new Error("BusinessName is required");
        data.businessName = businessName;
    }

    if (updateData.phone !== undefined) {
        const phone = updateData.phone?.trim();
        if (!phone) throw new Error("phone is required");
        data.phone = phone;
    }

    if (updateData.address !== undefined) {
        const address = updateData.address?.trim();
        if (!address) throw new Error("address is required");
        data.address = address;
    }

}

export const providerService = {
    getAllProviders,
    createProvider,
    getSingleProvider,
    getProviderMeals,
    updateProviders,
    getProviderDashboarStats,
    getMyProviderProfile,
    updateMyProviderProfile,
}