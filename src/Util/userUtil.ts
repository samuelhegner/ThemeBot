import { GuildMember } from 'discord.js';
import { DiscordUser } from '../interfaces/DiscordUser';

export function toDiscordUser(member: GuildMember): DiscordUser {
	let url = member.displayAvatarURL();
	return {
		id: member.id,
		userName: member.user.username,
		avatarUrl: url,
		nickname: member.displayName
	};
}
