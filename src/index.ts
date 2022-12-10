import { Client } from 'discord.js';
import { clientOptions } from './config/intentOptions';

(async () => {
	const BOT = new Client(clientOptions);
	await BOT.login(process.env.BOT_TOKEN);
})();
