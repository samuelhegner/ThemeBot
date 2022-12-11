import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder, CommandInteraction } from 'discord.js';

export interface Command {
	data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
	run: (interaction: CommandInteraction) => Promise<void>;
}
