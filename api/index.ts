import { Elysia } from "elysia";
import { forEach } from "lodash";
import userController from "./users/controller";
import postController from "./posts/controller";

let setup = new Elysia();

const controllers = {
	"/user": userController,
	"/post": postController,
};

forEach(controllers, (controller, index) => {
	setup = controller(setup, index);
});

const app = setup;

export default app;
