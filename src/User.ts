import { PrismaClient } from '@prisma/client';

export class User {
	private userName: string;
	private prisma: PrismaClient;

	constructor(userName: string) {
		this.userName = userName;
		this.prisma = new PrismaClient();
	}

	private async load() {
		let user = await this.prisma.user.findFirst({
			where: {
				userName: this.userName
			}
		});

		if (user == null) {
			user = await this.prisma.user.create({
				data: {
					userName: this.userName
				}
			});
		}

		return user;
	}
}
