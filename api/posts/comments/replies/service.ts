import Service from "../../../shared/utils/Service";
import { PostCommentReply } from "@prisma/client";

export default class PostCommentReplyService extends Service {
	constructor() {
		super();
	}

	async createReply(commentId: string, content: string, userId: string) {
		return await this.prisma.postCommentReply.create({
			data: {
				content,
				commentId,
				userId,
			},
		});
	}

	async updateReply(replyId: string, data: PostCommentReply) {
		return await this.prisma.postCommentReply.update({
			where: { cuid: replyId },
			data,
		});
	}

	async deleteReply(replyId: string) {
		return await this.prisma.postCommentReply.delete({
			where: { cuid: replyId },
		});
	}
}
