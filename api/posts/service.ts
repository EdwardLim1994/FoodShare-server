import { Post } from "@prisma/client";
import Service from "../shared/utils/Service";

export default class PostService extends Service {
	constructor() {
		super();
	}

	async createPosts(data: Post) {
		return await this.prisma.post.create({
			data,
		});
	}

	async updatePost(postId: string, data: Post) {
		return await this.prisma.post.update({
			where: { cuid: postId },
			data,
		});
	}

	async deletePost(postId: string) {
		return await this.prisma.post.delete({
			where: { cuid: postId },
		});
	}

	async getPost(postId?: string) {
		if (!postId) return await this.prisma.post.findMany();
		return await this.prisma.post.findUnique({ where: { cuid: postId } });
	}
}
