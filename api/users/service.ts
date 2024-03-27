import { User } from "@prisma/client";
import Service from "../shared/utils/Service";

export default class UserService extends Service {
	constructor() {
		super();
	}

	async createUser(email: string, username: string, reference: string) {
		return await this.prisma.user.create({
			data: {
				email,
				username,
				name: username,
				reference,
			},
		});
	}

	async updateUser(userId: string, data: User) {
		return await this.prisma.user.update({
			where: {
				cuid: userId,
			},
			data,
		});
	}

	async findUser(userId: string) {
		return await this.prisma.user.findUnique({
			where: { cuid: userId },
		});
	}

	async findUserSession(jwt: string) {
		return await this.supabase.auth.getUser(jwt);
	}
}
