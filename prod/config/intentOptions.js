"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientOptions = void 0;
const discord_js_1 = require("discord.js");
exports.clientOptions = {
    intents: [discord_js_1.GatewayIntentBits.Guilds]
};
