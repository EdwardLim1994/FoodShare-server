import { ResponseStatus } from "../enum";
import Response from "./Response";

export default class ResponseBuilder {
	private _state: ResponseStatus = ResponseStatus.success;
	private _data?: any;
	private _reason?: string;

	constructor() {}

	public setStatus(state: ResponseStatus) {
		this._state = state;
		return this;
	}

	public setData(data: any) {
		this._data = data;
		return this;
	}

	public setReason(reason: string) {
		this._reason = reason;
		return this;
	}

	build() {
		switch (this._state) {
			case ResponseStatus.success:
				return new Response(this._state, this._data).result();
			case ResponseStatus.error:
				return new Response(this._state, this._reason).result();
		}
	}
}
