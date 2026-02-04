const cron = require("node-cron");
const LostAndFound = require("../models/lostAndFound_model");

cron.schedule("0 1 * * *", async () => {
    try {
        const tenDaysAgo = new Date(
            Date.now() - 10 * 24 * 60 * 60 * 1000
        );

        const result = await LostAndFound.updateMany(
            {
                status: "claimed",
                claimedAt: { $lte: tenDaysAgo }
            },
            {
                $set: { status: "resolved" }
            }
        );

        console.log(
            `[CRON] Auto-resolved ${result.modifiedCount} records`
        );
    } catch (err) {
        console.error("[CRON] Auto-resolve failed", err);
    }
});