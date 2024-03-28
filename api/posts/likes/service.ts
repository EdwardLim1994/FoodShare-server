import Service from "../../shared/utils/Service";

export default class PostLikesService extends Service {
	constructor() {
		super();
	}

	async createLike(postId: string, userId: string) {
		return await this.prisma.postLike.create({
			data: {
				postId,
				userId,
			},
		});
	}

	async removeLike(postId: string, userId: string) {
		return await this.prisma.postLike.delete({
			where: {
				postId,
				userId,
			},
		});
	}
}
