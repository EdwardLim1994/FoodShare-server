import { Context, Elysia } from "elysia";
import Controller from "../shared/utils/Controller";

async function signUp(ctx: Context) {
	return Controller.success({ message: "Hello world" });
}

async function login(ctx: Context) {
	return Controller.success({});
}
async function logout(ctx: Context) {
	return Controller.success({});
}

export default function controller(app: Elysia, prefix: string) {
	return app.group(prefix, (app) =>
		app
			.post("/signup", signUp)
			.post("/login", login)
			.post("/logout", logout)
	);
}
