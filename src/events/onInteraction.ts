import { Interaction } from 'discord.js';
import { CommandList } from '../commands/_CommandList';

export async function onInteraction(interaction: Interaction) {
	if (interaction.isCommand()) {
		console.log(`Interaction: ${interaction.commandName}`);

		for (const Command of CommandList) {
			if (interaction.commandName === Command.data.name) {
				try {
					await Command.run(interaction);
				} catch (error) {
					console.error(`Error on Interaction ${interaction.commandName}: ${(error as Error).message}`);
				}
				break;
			}
		}
	}
}
