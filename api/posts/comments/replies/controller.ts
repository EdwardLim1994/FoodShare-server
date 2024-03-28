import { Elysia, Context, t } from "elysia";
import Controller from "../../../shared/utils/Controller";
import PostCommentReplyService from "./service";
import { PostCommentReply } from "@prisma/client";

const postCommentReplyService = new PostCommentReplyService();

async function create(
	ctx: Context<{
		body: { commentId: string; content: string; userId: string };
	}>
) {
	try {
		const result = await postCommentReplyService.createReply(
			ctx.body.commentId,
			ctx.body.content,
			ctx.body.userId
		);
		return Controller.success(result);
	} catch (err) {
		return Controller.error("Create reply failed");
	}
}

async function update(
	ctx: Context<{ body: { replyId: string; data: PostCommentReply } }>
) {
	try {
		const result = await postCommentReplyService.updateReply(
			ctx.body.replyId,
			ctx.body.data
		);
		return Controller.success(result);
	} catch (err) {
		return Controller.error("Update reply failed");
	}
}

async function remove(ctx: Context<{ body: { replyId: string } }>) {
	try {
		await postCommentReplyService.deleteReply(ctx.body.replyId);
		return Controller.success({ message: "Delete reply success" });
	} catch (err) {
		return Controller.error("Delete reply failed");
	}
}

export default function controller(app: Elysia, prefix: string) {
	return app.guard({}, (app) =>
		app.group(prefix, (app) =>
			app
				.post("/create", create, {
					body: t.Object({
						commentId: t.String(),
						content: t.String(),
						userId: t.String(),
					}),
				})
				.patch("/update", update, {
					body: t.Object({
						replyId: t.String(),
						data: t.Any(),
					}),
				})
				.delete("/delete", remove, {
					body: t.Object({
						replyId: t.String(),
					}),
				})
		)
	);
}
