import { Elysia } from "elysia";
import { forEach } from "lodash";
import userController from "./users/controller";

let setup = new Elysia();

const controllers = {
	"/user": userController,
};

forEach(controllers, (controller, index) => {
	setup = controller(setup, index);
});

const app = setup;

export default app;
