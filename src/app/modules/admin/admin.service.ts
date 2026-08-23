import { prisma } from "../../../lib/prisma"

const getDashboardStats = async () => {
    const [
        totalUsers,
        totalOrders,
        totalMeals,
        totalProviders,
        revenueResult,
    ] = await Promise.all([
        prisma.user.count(),
        prisma.order.count(),
        prisma.meal.count(),
        prisma.providerProfile.count(),
        prisma.order.aggregate({
            _sum: {
                totalPrice: true,
            }
        })
    ])

    return {
        totalUsers,
        totalOrders,
        totalMeals,
        totalProviders,
        totalRevenue: revenueResult._sum.totalPrice ?? 0,
    };
};

export const adminService = {
    getDashboardStats,
}