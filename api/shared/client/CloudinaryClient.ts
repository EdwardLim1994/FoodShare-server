export default class CloudinaryClient {
	private static client: any;

	private constructor() {}

	static instance() {
		if (CloudinaryClient.client == null) {
			CloudinaryClient.client = require("cloudinary").v2;
		}

		return CloudinaryClient.client;
	}
}
