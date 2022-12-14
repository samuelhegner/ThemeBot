import { Entry, Theme } from '@prisma/client';
import { EmbedBuilder } from 'discord.js';
import { getDaysBetweenDates } from './dateUtils';

export function addThemeToEmbed(theme: Theme | (Theme & { entries: Entry[] }), embed: EmbedBuilder): EmbedBuilder {
	if (theme != null) {
		embed.addFields(
			{ name: 'Theme', value: theme.name, inline: true },
			{ name: 'Started', value: theme.startDate.toDateString(), inline: true },
			{
				name: 'Active',
				value: getDaysBetweenDates(theme.startDate, theme.endDate == null ? new Date() : theme.endDate).toString() + ' day(s)',
				inline: true
			}
		);

		const extendedTheme = theme as Theme & { entries: Entry[] };

		if (extendedTheme.entries != null && extendedTheme.entries.length > 0) {
			embed.addFields({ name: 'Entries:', value: '\u200B' });
			extendedTheme.entries.forEach((entry) => {
				embed.addFields({ name: entry.name, value: entry.updateDate.toDateString() });
			});
		}
	}
	return embed;
}

export function addEntryToEmbed(entry: Entry, embed: EmbedBuilder): EmbedBuilder {
	if (entry != null) {
		embed.setThumbnail(entry.imageUrl);
		embed.addFields({ name: 'Name', value: entry.name, inline: true }, { name: 'Theme', value: entry.themeName, inline: true });
	}
	return embed;
}
