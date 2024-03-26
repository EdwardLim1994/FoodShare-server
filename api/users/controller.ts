import { Context, Elysia } from "elysia";
import Controller from "../shared/utils/Controller";

async function create(ctx: Context) {
	return Controller.success({ message: "Hello world" });
}

async function update(ctx: Context) {
	return Controller.success({});
}

export default function controller(app: Elysia, prefix: string) {
	return app.group(prefix, (app) =>
		app.post("/create", create).patch("/update", update)
	);
}
