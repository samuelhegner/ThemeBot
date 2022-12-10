import { PrismaClient } from '.prisma/client';
import { Client } from 'discord.js';
import { clientOptions } from './config/intentOptions';

const prisma = new PrismaClient();

async function main() {
	const BOT = new Client(clientOptions);
	BOT.on('ready', () => console.log('Connected to Discord!'));
	await BOT.login(process.env.BOT_TOKEN);
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
