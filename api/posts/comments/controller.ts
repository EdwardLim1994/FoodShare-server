import { Elysia, Context, t } from "elysia";
import Controller from "../../shared/utils/Controller";
import { PostComment } from "@prisma/client";
import PostCommentService from "./service";

const postCommentService = new PostCommentService();

async function create(
	ctx: Context<{ body: { postId: string; content: string; userId: string } }>
) {
	try {
		const result = await postCommentService.createComment(
			ctx.body.postId,
			ctx.body.content,
			ctx.body.userId
		);
		return Controller.success(result);
	} catch (err) {
		return Controller.error("Create comment failed");
	}
}

async function update(
	ctx: Context<{ body: { commentId: string; data: PostComment } }>
) {
	try {
		const result = await postCommentService.updateComment(
			ctx.body.commentId,
			ctx.body.data
		);
		return Controller.success(result);
	} catch (err) {
		return Controller.error("Update comment failed");
	}
}

async function remove(ctx: Context<{ body: { commentId: string } }>) {
	try {
		await postCommentService.deleteComment(ctx.body.commentId);
		return Controller.success({ message: "Delete comment success" });
	} catch (err) {
		return Controller.error("Delete comment failed");
	}
}

export default function controller(app: Elysia, prefix: string) {
	return app.guard({}, (app) =>
		app.group(prefix, (app) =>
			app
				.post("/create", create, {
					body: t.Object({
						postId: t.String(),
						content: t.String(),
						userId: t.String(),
					}),
				})
				.patch("/update", update, {
					body: t.Object({
						commentId: t.String(),
						data: t.Any(),
					}),
				})
				.delete("/delete", remove, {
					body: t.Object({
						commentId: t.String(),
					}),
				})
		)
	);
}
