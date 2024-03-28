import Elysia, { Context, t } from "elysia";
import Controller from "../../shared/utils/Controller";
import PostLikesService from "./service";

const postLikesService = new PostLikesService();

async function create(
	ctx: Context<{ body: { postId: string; userId: string } }>
) {
	try {
		await postLikesService.createLike(ctx.body.postId, ctx.body.userId);
		return Controller.success({ message: "Create like success" });
	} catch (err) {
		return Controller.error("Create like failed");
	}
}

async function remove(
	ctx: Context<{ body: { postId: string; userId: string } }>
) {
	try {
		await postLikesService.removeLike(ctx.body.postId, ctx.body.userId);
		return Controller.success({ message: "Remove like success" });
	} catch (err) {
		return Controller.error("Remove like failed");
	}
}

export default function controller(app: Elysia, prefix: string) {
	return app.guard({}, (app) =>
		app.group(prefix, (app) =>
			app
				.post("/create", create, {
					body: t.Object({ postId: t.String(), userId: t.String() }),
				})
				.post("/remove", remove, {
					body: t.Object({ postId: t.String(), userId: t.String() }),
				})
		)
	);
}
