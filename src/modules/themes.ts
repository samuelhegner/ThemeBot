import { Theme } from '@prisma/client';
import { prisma } from '..';
import { DiscordUser } from '../interfaces/DiscordUser';

export async function CreateNewTheme(name: string, serverIconUrl: string, user: DiscordUser): Promise<Theme> {
	const currentTheme = await GetCurrentTheme();

	if (currentTheme != null) {
		await EndTheme(currentTheme);
	}

	const theme = await prisma.theme.create({
		data: {
			name: name,
			imageUrl: serverIconUrl,
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
			}
		}
	});

	return theme;
}

export async function UpdateCurrentTheme(updatedName: string, user: DiscordUser) {
	const currentTheme = await GetCurrentTheme();

	if (currentTheme == null) return null;

	const updatedTheme = await prisma.theme.update({
		data: {
			updateDate: new Date(),
			name: updatedName
		},
		where: {
			id: currentTheme.id
		}
	});

	return updatedTheme;
}

export async function GetThemeHistory() {
	const themes = await prisma.theme.findMany({
		orderBy: {
			startDate: 'desc'
		}
	});

	return themes;
}

export async function GetCurrentTheme() {
	const currentTheme = await prisma.theme.findFirst({
		orderBy: {
			startDate: 'desc'
		},
		include: {
			entries: true
		}
	});

	return currentTheme;
}

async function EndTheme(theme: Theme) {
	await prisma.theme.update({
		data: {
			endDate: new Date()
		},
		where: {
			id: theme.id
		}
	});
}
