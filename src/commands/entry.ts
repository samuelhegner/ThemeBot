import { Theme } from '@prisma/client';
import { SlashCommandBuilder, CommandInteractionOptionResolver, EmbedBuilder, User, GuildMember } from 'discord.js';
import { Command } from '../interfaces/Command';
import { DeleteEntry, EnterTheme, GetEntry, UpdateEntry } from '../modules/entries';
import { CreateNewTheme, UpdateCurrentTheme, GetCurrentTheme } from '../modules/themes';
import { addEntryToEmbed } from '../Util/messageUtil';
import { toDiscordUser } from '../Util/userUtil';

export const entry: Command = {
	data: new SlashCommandBuilder()
		.setName('entry')
		.setDescription('Enter current theme or update or delete your entry')
		.addSubcommand((subcommand) => subcommand.setName('enter').setDescription('Enter your current profile to the theme'))
		.addSubcommand((subcommand) => subcommand.setName('get').setDescription('Get your current theme entry'))
		.addSubcommand((subcommand) => subcommand.setName('update').setDescription('Update your current theme entry'))
		.addSubcommand((subcommand) => subcommand.setName('delete').setDescription('Delete your current theme entry')),
	run: async (interaction) => {
		try {
			await interaction.deferReply();
			const user = toDiscordUser(interaction.member as GuildMember);
			const options: CommandInteractionOptionResolver = interaction.options as CommandInteractionOptionResolver;
			const subCommand = options.getSubcommand();
			let reply: EmbedBuilder = new EmbedBuilder().setColor('Green').setTitle('Entry: ');

			switch (subCommand) {
				case 'get': {
					const entry = await GetEntry(user);

					if (entry == null) {
						reply.addFields({
							name: 'Error',
							value: "There was an error getting your entry. There either isn't a theme or you haven't entered it"
						});
						break;
					}

					reply = addEntryToEmbed(entry, reply);
					break;
				}
				case 'enter': {
					const entry = await EnterTheme(user);

					if (entry == null) {
						reply.addFields({
							name: 'Error',
							value: "There was an error entering the theme. There either isn't a theme or you already have one"
						});
						break;
					}

					reply = addEntryToEmbed(entry, reply);
					break;
				}
				case 'update': {
					const entry = await UpdateEntry(user);

					if (entry == null) {
						reply.addFields({
							name: 'Error',
							value: "There was an error updating your entry. There either isn't a theme or you haven't entered it"
						});
						break;
					}

					reply = addEntryToEmbed(entry, reply);
					break;
				}
				case 'delete': {
					const entry = await DeleteEntry(user);

					if (entry == null) {
						reply.addFields({
							name: 'Error',
							value: "There was an error deleting your entry. There either isn't a theme or you haven't entered it"
						});
						break;
					}

					reply = addEntryToEmbed(entry, reply);
					break;
				}
				default:
					break;
			}

			await interaction.editReply({ embeds: [reply] });
		} catch (error) {
			console.error((error as Error).message);
			await interaction.deleteReply();
		}
	}
};
