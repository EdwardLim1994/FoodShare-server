import { Elysia } from "elysia";
import { forEach } from "lodash";
import userController from "./users/controller";
import authController from "./auth/controller";

let setup = new Elysia();

const controllers = {
	"/user": userController,
	"/user/auth": authController,
};

forEach(controllers, (controller, index) => {
	setup = controller(setup, index);
});

const app = setup;

export default app;
