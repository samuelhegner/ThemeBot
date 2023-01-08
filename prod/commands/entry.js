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
exports.entry = void 0;
const discord_js_1 = require("discord.js");
const entries_1 = require("../modules/entries");
const messageUtil_1 = require("../Util/messageUtil");
const userUtil_1 = require("../Util/userUtil");
exports.entry = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('entry')
        .setDescription('Enter current theme or update or delete your entry')
        .addSubcommand((subcommand) => subcommand.setName('enter').setDescription('Enter your current profile to the theme'))
        .addSubcommand((subcommand) => subcommand.setName('get').setDescription('Get your current theme entry'))
        .addSubcommand((subcommand) => subcommand.setName('update').setDescription('Update your current theme entry'))
        .addSubcommand((subcommand) => subcommand.setName('delete').setDescription('Delete your current theme entry')),
    run: (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield interaction.deferReply();
            const user = (0, userUtil_1.toDiscordUser)(interaction.member);
            const options = interaction.options;
            const subCommand = options.getSubcommand();
            let reply = new discord_js_1.EmbedBuilder().setColor('Green');
            switch (subCommand) {
                case 'get': {
                    const entry = yield (0, entries_1.GetEntry)(user);
                    if (entry == null) {
                        reply.addFields({
                            name: 'Error',
                            value: "There was an error getting your entry. There either isn't a theme or you haven't entered it"
                        });
                        break;
                    }
                    reply.setTitle('Your Entry:');
                    reply = (0, messageUtil_1.addEntryToEmbed)(entry, reply);
                    break;
                }
                case 'enter': {
                    const entry = yield (0, entries_1.EnterTheme)(user);
                    if (entry == null) {
                        reply.addFields({
                            name: 'Error',
                            value: "There was an error entering the theme. There either isn't a theme or you already have one"
                        });
                        break;
                    }
                    reply.setTitle('Your New Entry:');
                    reply = (0, messageUtil_1.addEntryToEmbed)(entry, reply);
                    break;
                }
                case 'update': {
                    const entry = yield (0, entries_1.UpdateEntry)(user);
                    if (entry == null) {
                        reply.addFields({
                            name: 'Error',
                            value: "There was an error updating your entry. There either isn't a theme or you haven't entered it"
                        });
                        break;
                    }
                    reply.setTitle('Your Updated Entry:');
                    reply = (0, messageUtil_1.addEntryToEmbed)(entry, reply);
                    break;
                }
                case 'delete': {
                    const entry = yield (0, entries_1.DeleteEntry)(user);
                    if (entry == null) {
                        reply.addFields({
                            name: 'Error',
                            value: "There was an error deleting your entry. There either isn't a theme or you haven't entered it"
                        });
                        break;
                    }
                    reply.setTitle('Entry deleted:');
                    reply = (0, messageUtil_1.addEntryToEmbed)(entry, reply);
                    break;
                }
                default:
                    break;
            }
            yield interaction.editReply({ embeds: [reply] });
        }
        catch (error) {
            console.error(error.message);
            yield interaction.deleteReply();
        }
    })
};
