import { PrismaClient } from '.prisma/client';
import { Client, Events } from 'discord.js';
import { onInteraction } from './events/onInteraction';
import { clientOptions } from './config/intentOptions';
import { onReady } from './events/onReady';

const prisma = new PrismaClient();

async function main() {
	const client = new Client(clientOptions);
	client.on('ready', async () => await onReady(client));
	client.on(Events.InteractionCreate, async (interaction) => await onInteraction(interaction));

	await client.login(process.env.BOT_TOKEN);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})

	.catch(async (e) => {
		console.error(e);

		await prisma.$disconnect();

		process.exit(1);
	});
