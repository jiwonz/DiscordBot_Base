import { BotClient } from "../classes/BotClient"
import { config } from "../../index"

const READY_MESSAGE = "Ready!"

export default {
    once: true,
    async execute(client:BotClient) {
        console.log(READY_MESSAGE);
        if (config.STATUS.InDev) client.user.setActivity(config.ACTIVITY.InDev)
    },
};