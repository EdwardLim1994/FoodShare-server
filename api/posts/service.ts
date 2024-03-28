import { Post } from "@prisma/client";
import Service from "../shared/utils/Service";
import { uploadImage } from "../shared/helper";

export default class PostService extends Service {
	constructor() {
		super();
	}

	async createPosts(
		images: File[],
		content: string,
		userId: string,
		location?: string
	) {
		//TODO: upload file
		const result = await uploadImage(images);

		return await this.prisma.post.create({
			data: {
				images: result,
				content,
				userId,
				location,
			},
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
