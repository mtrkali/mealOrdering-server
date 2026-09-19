import cron from "node-cron";
import { orderCleanupService } from "./order.cleanup.js";

const startOrderCleanupScheduler = () => {
    cron.schedule("0 2 * * *", async () => {
        try {
            const result =
                await orderCleanupService.deleteOldCancelledOrders();

            console.log(`[order cleanUp] Deleted ${result?.deleteCount} old cancelled orders`)
        } catch (error) {
            console.log("Order cleanUp failed! : ", error)
        }
    })

    console.log("[order cleanUp] sheduler starter. Runs every day at 2:00 AM")
}


export default startOrderCleanupScheduler;