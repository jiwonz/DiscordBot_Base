import { BotClient } from "../classes/BotClient"

export default (client:BotClient) => {
    client.handleEvents = async (eventFiles) => {
        for (const file of eventFiles) {
            const event = require(`../events/${file}`)
            const filename = file.replace(".ts","")
            if (event.once) {
                client.once(filename, (...args) => event.default.execute(...args,client))
            } else {
                client.on(filename, (...args) => event.default.execute(...args,client))
            }
        }
    }
}