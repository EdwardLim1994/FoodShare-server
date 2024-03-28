import Service from "../../shared/utils/Service";
import { PostComment } from "@prisma/client";

export default class PostCommentService extends Service {
	constructor() {
		super();
	}

	async createComment(postId: string, content: string, userId: string) {
		return await this.prisma.postComment.create({
			data: {
				content,
				postId,
				userId,
			},
		});
	}

	async updateComment(commentId: string, data: PostComment) {
		return await this.prisma.postComment.update({
			where: { cuid: commentId },
			data,
		});
	}

	async deleteComment(commentId: string) {
		return await this.prisma.postComment.delete({
			where: { cuid: commentId },
		});
	}
}
