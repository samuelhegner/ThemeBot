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
exports.theme = void 0;
const discord_js_1 = require("discord.js");
const themes_1 = require("../modules/themes");
const userUtil_1 = require("../Util/userUtil");
const messageUtil_1 = require("../Util/messageUtil");
exports.theme = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('theme')
        .setDescription('Options for setting getting and updating the current theme')
        .addSubcommand((subcommand) => subcommand.setName('get').setDescription('Get the current theme'))
        .addSubcommand((subcommand) => subcommand
        .setName('new')
        .setDescription('Set the new theme')
        .addStringOption((option) => {
        return option.setName('name').setDescription('The name of your new theme').setRequired(true);
    }))
        .addSubcommand((subcommand) => subcommand
        .setName('update')
        .setDescription('Update the current theme')
        .addStringOption((option) => {
        return option.setName('name').setDescription('The updated theme name').setRequired(true);
    }))
        .addSubcommand((subcommand) => subcommand.setName('history').setDescription('Get the servers theme history')),
    run: (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            yield interaction.deferReply();
            const user = (0, userUtil_1.toDiscordUser)(interaction.member);
            const options = interaction.options;
            const subCommand = options.getSubcommand();
            let reply = new discord_js_1.EmbedBuilder().setColor('Orange');
            switch (subCommand) {
                case 'new': {
                    const name = options.getString('name');
                    if (name == null) {
                        reply.addFields({ name: 'Error', value: 'Please include you new themes name!' });
                        break;
                    }
                    let serverIconUrl = (_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.iconURL();
                    if (serverIconUrl == null) {
                        reply.addFields({ name: 'Error', value: 'Failed to retrieve server icon' });
                        break;
                    }
                    const theme = yield (0, themes_1.CreateNewTheme)(name, serverIconUrl, user);
                    if (theme == null) {
                        reply.addFields({ name: 'Error', value: 'There was an error creating your new theme' });
                        break;
                    }
                    reply.setTitle('Created Theme:');
                    reply.setThumbnail(theme.imageUrl);
                    reply = (0, messageUtil_1.addThemeToEmbed)(theme, reply);
                    break;
                }
                case 'update': {
                    const name = options.getString('name');
                    if (name == null) {
                        reply.addFields({ name: 'Error', value: 'Please include you new themes name!' });
                        break;
                    }
                    const theme = yield (0, themes_1.UpdateCurrentTheme)(name, user);
                    if (theme == null) {
                        reply.addFields({ name: 'Error', value: 'There was an error updating your theme' });
                        break;
                    }
                    reply.setTitle('Updated Theme:');
                    reply.setThumbnail(theme.imageUrl);
                    reply = (0, messageUtil_1.addThemeToEmbed)(theme, reply);
                    break;
                }
                case 'get': {
                    const theme = yield (0, themes_1.GetCurrentTheme)();
                    if (theme == null) {
                        reply.addFields({ name: 'Error', value: 'There was an error getting the current theme' });
                        break;
                    }
                    reply.setTitle('Current Theme:');
                    reply.setThumbnail(theme.imageUrl);
                    reply = (0, messageUtil_1.addThemeToEmbed)(theme, reply);
                    break;
                }
                case 'history': {
                    reply.setTitle('Past Theme:');
                    const themes = yield (0, themes_1.GetThemeHistory)();
                    themes.forEach((theme) => {
                        reply = (0, messageUtil_1.addThemeToEmbed)(theme, reply);
                    });
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
