import { type Context, Elysia, t } from "elysia";
import Controller from "../shared/utils/Controller";
import UserService from "./service";
import { User } from "@prisma/client";
import { checkIfUserExists, checkIfUserIsAuthenticated } from "./middleware";

const userService = new UserService();

async function create({
	body,
}: Context<{ body: { username: string; email: string; reference: string } }>) {
	try {
		const result = await userService.createUser(
			body.username,
			body.email,
			body.reference
		);

		return Controller.success(result);
	} catch (err) {
		return Controller.error("Create user failed");
	}
}

async function update({
	body,
}: Context<{ body: { userId: string; data: User } }>) {
	try {
		const result = await userService.updateUser(body.userId, body.data);
		return Controller.success(result);
	} catch (err) {
		return Controller.error("Update user failed");
	}
}

export default function controller(app: Elysia, prefix: string) {
	return app.guard(
		{
			beforeHandle: checkIfUserExists,
		},
		(app) =>
			app.group(prefix, (app) =>
				app
					.post("/create", create, {
						body: t.Object({
							username: t.String(),
							email: t.String(),
							reference: t.String(),
						}),
					})
					.patch("/update", update, {
						//TODO: check user authentication
						//beforeHandle: checkIfUserIsAuthenticated,
						body: t.Object({
							userId: t.String(),
							data: t.Any(),
						}),
					})
			)
	);
}
