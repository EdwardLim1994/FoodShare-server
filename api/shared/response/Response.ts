import { ResponseStatus } from "../enum";

export default class Response {
	constructor(
		private _state: ResponseStatus,
		private _data?: any,
		private _reason?: string
	) {}

	result() {
		switch (this._state) {
			case ResponseStatus.success:
				return { status: this._state, data: this._data };
			case ResponseStatus.error:
				return { status: this._state, reason: this._reason };
		}
	}
}
