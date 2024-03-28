import { Context, Elysia, t } from "elysia";
import PostService from "./service";
import Controller from "../shared/utils/Controller";
import { Post } from "@prisma/client";

const postService = new PostService();

async function create(
	ctx: Context<{
		body: {
			images: File[];
			location?: string;
			content: string;
			userId: string;
		};
	}>
) {
	try {
		const result = await postService.createPosts(
			ctx.body.images,
			ctx.body.content,
			ctx.body.userId,
			ctx.body.location
		);

		return Controller.success(result);
	} catch (err) {
		return Controller.error("Create post failed");
	}
}

async function update(ctx: Context<{ body: { postId: string; data: Post } }>) {
	try {
		const result = await postService.updatePost(
			ctx.body.postId,
			ctx.body.data
		);

		return Controller.success(result);
	} catch (err) {
		return Controller.error("Update post failed");
	}
}

async function remove(ctx: Context<{ body: { postId: string } }>) {
	try {
		await postService.deletePost(ctx.body.postId);

		return Controller.success({ message: "Delete post success" });
	} catch (err) {
		return Controller.error("Delete post failed");
	}
}

async function get(ctx: Context<{ query: { postId: string } }>) {
	try {
		const result = await postService.getPost(ctx.query.postId);

		return Controller.success(result);
	} catch (err) {
		return Controller.error("Get post failed");
	}
}

export default function controller(app: Elysia, prefix: string) {
	return app.guard({}, (app) =>
		app.group(prefix, (app) =>
			app
				.post("/create", create, {
					body: t.Object({
						images: t.Array(t.File()),
						location: t.Optional(t.String()),
						content: t.String(),
						userId: t.String(),
					}),
				})
				.patch("/update", update, {
					body: t.Object({
						postId: t.String(),
						data: t.Any(),
					}),
				})
				.delete("/delete", remove, {
					body: t.Object({
						postId: t.String(),
					}),
				})
				.get("/get", get, {
					query: t.Object({
						postId: t.Optional(t.String()),
					}),
				})
		)
	);
}
