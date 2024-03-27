import { Elysia } from "elysia";

async function create() {}

async function update() {}

async function remove() {}

async function get() {}

export default function controller(app: Elysia, prefix: string) {
	return app.guard({}, (app) =>
		app.group(prefix, (app) =>
			app
				.post("/create", create)
				.patch("/update", update)
				.delete("/delete", remove)
				.get("/get", get)
		)
	);
}
