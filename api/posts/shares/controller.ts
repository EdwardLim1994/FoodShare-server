import { Elysia, Context, t } from "elysia";
import Controller from "../../shared/utils/Controller";
import PostShareService from "./service";

const postSharesService = new PostShareService();

async function create(
	ctx: Context<{ body: { postId: string; userId: string } }>
) {
	try {
		await postSharesService.createShare(ctx.body.postId, ctx.body.userId);
		return Controller.success({ message: "Create share success" });
	} catch (err) {
		return Controller.error("Create share failed");
	}
}

async function remove(
	ctx: Context<{ body: { postId: string; userId: string } }>
) {
	try {
		await postSharesService.removeShare(ctx.body.postId, ctx.body.userId);
		return Controller.success({ message: "Remove share success" });
	} catch (err) {
		return Controller.error("Remove share failed");
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
