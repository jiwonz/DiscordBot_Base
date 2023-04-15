import { Client, Collection } from "discord.js"

export class BotClient extends Client {
    constructor(config) {
        super(config)
    }
    public commands:Collection<any,any>
    public handleCommands:any
    public handleEvents:any
    public commandArray:Array<[]>
}