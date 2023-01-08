"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEntryToEmbed = exports.addThemeToEmbed = void 0;
const dateUtils_1 = require("./dateUtils");
function addThemeToEmbed(theme, embed) {
    if (theme != null) {
        embed.addFields({ name: 'Theme', value: theme.name, inline: true }, { name: 'Started', value: theme.startDate.toDateString(), inline: true }, {
            name: 'Active',
            value: (0, dateUtils_1.getDaysBetweenDates)(theme.startDate, theme.endDate == null ? new Date() : theme.endDate).toString() + ' day(s)',
            inline: true
        });
        const extendedTheme = theme;
        if (extendedTheme.entries != null && extendedTheme.entries.length > 0) {
            embed.addFields({ name: 'Entries:', value: '\u200B' });
            extendedTheme.entries.forEach((entry) => {
                embed.addFields({ name: entry.name, value: entry.updateDate.toDateString() });
            });
        }
    }
    return embed;
}
exports.addThemeToEmbed = addThemeToEmbed;
function addEntryToEmbed(entry, embed) {
    if (entry != null) {
        embed.setThumbnail(entry.imageUrl);
        embed.addFields({ name: 'Name', value: entry.name, inline: true }, { name: 'Theme', value: entry.themeName, inline: true });
    }
    return embed;
}
exports.addEntryToEmbed = addEntryToEmbed;
