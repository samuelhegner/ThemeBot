import { SlashCommandBuilder, User } from 'discord.js';
import { Command } from '../interfaces/Command';

export const ping: Command = {
	data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
	run: async (interaction) => {
		console.log(JSON.stringify(interaction));
		//const user = new User();
		await interaction.reply('Pong!');
	}
};
