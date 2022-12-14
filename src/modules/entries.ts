import { Entry } from '@prisma/client';
import { prisma } from '..';
import { entry } from '../commands/entry';
import { DiscordUser } from '../interfaces/DiscordUser';
import { GetCurrentTheme } from './themes';

export async function EnterTheme(user: DiscordUser) {
	const themeEntries = await prisma.theme.findFirst({ orderBy: { startDate: 'desc' }, select: { id: true, entries: true } });

	if (themeEntries == null) {
		return null;
	}

	if (themeEntries.entries.findIndex((entry) => entry.author === user.id) !== -1) {
		return null;
	}

	const entry = await prisma.entry.create({
		data: {
			name: user.nickname,
			imageUrl: user.avatarUrl,
			user: {
				connectOrCreate: {
					where: {
						userId: user.id
					},
					create: {
						userId: user.id,
						userName: user.userName
					}
				}
			},
			theme: {
				connect: {
					id: themeEntries.id
				}
			}
		}
	});

	return entry;
}

export async function UpdateEntry(user: DiscordUser) {
	const themeEntries = await prisma.theme.findFirst({ orderBy: { startDate: 'desc' }, select: { id: true, entries: true } });

	if (themeEntries == null) {
		return null;
	}

	const entryIndex = themeEntries.entries.findIndex((entry) => entry.author === user.id);

	if (entryIndex === -1) {
		return null;
	}

	const entry = themeEntries.entries[entryIndex];

	const updatedEntry = await prisma.entry.update({
		where: { id: entry.id },
		data: { name: user.nickname, imageUrl: user.avatarUrl, updateDate: new Date() }
	});

	return updatedEntry;
}

export async function DeleteEntry(user: DiscordUser) {
	const themeEntries = await prisma.theme.findFirst({ orderBy: { startDate: 'desc' }, select: { id: true, entries: true } });

	if (themeEntries == null) {
		return null;
	}

	const entryIndex = themeEntries.entries.findIndex((entry) => entry.author === user.id);

	if (entryIndex === -1) {
		return null;
	}

	const entry = themeEntries.entries[entryIndex];

	const deletedEntry = await prisma.entry.delete({
		where: { id: entry.id }
	});

	return deletedEntry;
}

export async function GetEntry(user: DiscordUser) {
	const themeEntries = await prisma.theme.findFirst({ orderBy: { startDate: 'desc' }, select: { id: true, entries: true } });

	if (themeEntries == null) {
		return null;
	}

	const entryIndex = themeEntries.entries.findIndex((entry) => entry.author === user.id);

	if (entryIndex === -1) {
		return null;
	}

	return themeEntries.entries[entryIndex];
}
