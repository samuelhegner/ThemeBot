"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onInteraction = void 0;
const _CommandList_1 = require("../commands/_CommandList");
function onInteraction(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        if (interaction.isCommand()) {
            console.log(`Interaction: ${interaction.commandName}`);
            for (const Command of _CommandList_1.CommandList) {
                if (interaction.commandName === Command.data.name) {
                    try {
                        yield Command.run(interaction);
                    }
                    catch (error) {
                        console.error(`Error on Interaction ${interaction.commandName}: ${error.message}`);
                    }
                    break;
                }
            }
        }
    });
}
exports.onInteraction = onInteraction;
