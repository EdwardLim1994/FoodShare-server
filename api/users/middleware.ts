import { isEmpty } from "lodash";
import UserService from "../users/service";
import { decryptToken } from "../shared/helper";

const userService = new UserService();

export const checkIfUserExists = async ({ set, body }) => {
	const result = await userService.findUser(body.userId);

	if (isEmpty(result)) {
		set.status = 404;
		return "User not found";
	}
};

export const checkIfUserIsAuthenticated = async ({ set, body }) => {
	const token = decryptToken(body.token);

	const result = await userService.findUserSession(token.jwt);

	if (isEmpty(result)) {
		set.status = 401;
		return "User is not authorized";
	}
};
