import Service from "../../shared/utils/Service";

export default class PostShareService extends Service {
	constructor() {
		super();
	}

	async createShare(postId: string, userId: string) {
		return await this.prisma.postShare.create({
			data: {
				postId,
				userId,
			},
		});
	}

	async removeShare(postId: string, userId: string) {
		return await this.prisma.postShare.delete({
			where: {
				postId,
				userId,
			},
		});
	}
}
