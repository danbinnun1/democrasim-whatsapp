import { Command } from './Command';
import clientModule from './index';
const config:Record<string,string> = require("../config.json");

export default class CommandTree {
    private subCommands: Record<string, CommandTree>;
    private execute: (command: Command) => void;
    run = (command: Command) => {
        let current: CommandTree = this;
        for (let subcommand of command.type) {
            if (!(config[subcommand] in current.subCommands)) {
                clientModule.client?.sendText(command.group, subcommand + "is not a command");
                return;
            }
            current = current.subCommands[config[subcommand]];
        }
        current.execute(command);
    }

    constructor(subCommands: Record<string, CommandTree>, execute: (command: Command) => void) {
        this.subCommands = subCommands;
        this.execute = execute;
    }
}