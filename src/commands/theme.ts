import { CommandInteractionOptionResolver, SlashCommandBuilder, EmbedBuilder, GuildMember } from 'discord.js';
import { Command } from '../interfaces/Command';
import { CreateNewTheme, GetCurrentTheme, GetThemeHistory, UpdateCurrentTheme } from '../modules/themes';
import { Theme } from '@prisma/client';
import { toDiscordUser } from '../Util/userUtil';
import { addThemeToEmbed } from '../Util/messageUtil';

export const theme: Command = {
	data: new SlashCommandBuilder()
		.setName('theme')
		.setDescription('Options for setting getting and updating the current theme')
		.addSubcommand((subcommand) => subcommand.setName('get').setDescription('Get the current theme'))
		.addSubcommand((subcommand) =>
			subcommand
				.setName('new')
				.setDescription('Set the new theme')
				.addStringOption((option) => {
					return option.setName('name').setDescription('The name of your new theme').setRequired(true);
				})
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('update')
				.setDescription('Update the current theme')
				.addStringOption((option) => {
					return option.setName('name').setDescription('The updated theme name').setRequired(true);
				})
		)
		.addSubcommand((subcommand) => subcommand.setName('history').setDescription('Get the servers theme history')),
	run: async (interaction) => {
		try {
			await interaction.deferReply();
			const user = toDiscordUser(interaction.member as GuildMember);
			const options: CommandInteractionOptionResolver = interaction.options as CommandInteractionOptionResolver;
			const subCommand = options.getSubcommand();
			let reply: EmbedBuilder = new EmbedBuilder().setColor('Orange').setTitle('Theme:');

			switch (subCommand) {
				case 'new': {
					const name = options.getString('name');
					if (name == null) {
						reply.addFields({ name: 'Error', value: 'Please include you new themes name!' });
						break;
					}

					let serverIconUrl: string = interaction.guild?.iconURL() as string;

					if (serverIconUrl == null) {
						reply.addFields({ name: 'Error', value: 'Failed to retrieve server icon' });
						break;
					}

					const theme = await CreateNewTheme(name, serverIconUrl, user);

					if (theme == null) {
						reply.addFields({ name: 'Error', value: 'There was an error creating your new theme' });
						break;
					}
					reply.setThumbnail(theme.imageUrl);
					reply = addThemeToEmbed(theme, reply);
					break;
				}
				case 'update': {
					const name = options.getString('name');
					if (name == null) {
						reply.addFields({ name: 'Error', value: 'Please include you new themes name!' });
						break;
					}
					const theme = await UpdateCurrentTheme(name, user);

					if (theme == null) {
						reply.addFields({ name: 'Error', value: 'There was an error updating your theme' });
						break;
					}
					reply.setThumbnail(theme.imageUrl);
					reply = addThemeToEmbed(theme, reply);
					break;
				}
				case 'get': {
					const theme = await GetCurrentTheme();

					if (theme == null) {
						reply.addFields({ name: 'Error', value: 'There was an error getting the current theme' });
						break;
					}
					reply.setThumbnail(theme.imageUrl);
					reply = addThemeToEmbed(theme, reply);
					break;
				}
				case 'history': {
					const themes = await GetThemeHistory();
					themes.forEach((theme) => {
						reply = addThemeToEmbed(theme, reply);
					});
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
