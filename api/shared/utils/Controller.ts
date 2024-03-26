import { ResponseStatus } from "../enum";
import ResponseBuilder from "../response/ResponseBuilder";

export default class Controller {
	private static readonly response: ResponseBuilder = new ResponseBuilder();

	public static success(data: any) {
		return Controller.response
			.setStatus(ResponseStatus.success)
			.setData(data)
			.build();
	}

	public static error(reason: string) {
		return Controller.response
			.setStatus(ResponseStatus.error)
			.setReason(reason)
			.build();
	}
}
