import { prisma } from "../../../lib/prisma";

const CANCELLED_ORDER_RETENTION_DAYS = 7;

const deleteOldCancelledOrders = async () => {
    const cutofDate = new Date();

    cutofDate.setDate(
        cutofDate.getDate() - CANCELLED_ORDER_RETENTION_DAYS
    );

    const oldCancelledOrders =
        await prisma.order.findMany({
            where: {
                status: "CANCELLED",
                cancelledAt: {
                    lte: cutofDate
                }
            },
            select: {
                id: true
            }
        })

    if (oldCancelledOrders.length === 0) {
        return {
            deleteCount: 0
        }
    }

    const orderIds = oldCancelledOrders.map(
        (order) => order.id
    );

    await prisma.$transaction(async (tx) => {
        await tx.review.deleteMany({
            where: {
                orderId: {
                    in: orderIds,
                },
            },
        });


        await tx.orderItem.deleteMany({
            where: {
                orderId: { in: orderIds }
            }
        })

        await tx.order.deleteMany({
            where: {
                id: {
                    in: orderIds
                }
            }
        })
        return { deleteCount: orderIds.length }
    })
}

export const orderCleanupService = {
    deleteOldCancelledOrders,
};