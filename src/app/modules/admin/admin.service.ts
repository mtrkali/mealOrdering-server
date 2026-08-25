
import { prisma } from "../../../lib/prisma"

const getDashboardStats = async () => {
    const [
        totalUsers,
        totalOrders,
        totalMeals,
        totalProviders,
        totalApplicantProvider,
        revenueResult,



        placeOrders,
        preparingOrders,
        readyOrders,
        deliveredOrders,
        cancelledOrders,
    ] = await Promise.all([
        prisma.user.count(),
        prisma.order.count(),
        prisma.meal.count(),
        prisma.providerProfile.count(),
        prisma.providerApplication.count(),
        prisma.order.aggregate({
            where: { status: { not: "CANCELLED" } },
            _sum: {
                totalPrice: true,
            }
        }),
        prisma.order.count({ where: { status: "PLACED" } }),
        prisma.order.count({ where: { status: "PREPARING" } }),
        prisma.order.count({ where: { status: "READY" } }),
        prisma.order.count({ where: { status: "DELIVERED" } }),
        prisma.order.count({ where: { status: "CANCELLED" } }),
    ])

    return {
        totalUsers,
        totalOrders,
        totalMeals,
        totalProviders,
        totalApplicantProvider,
        totalRevenue: revenueResult._sum.totalPrice ?? 0,

        orderStatus: {
            PLACED: placeOrders,
            PREPARING: preparingOrders,
            READY: readyOrders,
            DELIVERED: deliveredOrders,
            CANCELLED: cancelledOrders,
        }
    };
};

export const adminService = {
    getDashboardStats,
}