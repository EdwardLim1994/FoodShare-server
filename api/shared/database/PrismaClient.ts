import { PrismaClient as PCOG } from "@prisma/client";

export default class PrismaClient {
	private static client: PrismaClient;

	private constructor() {}

	static instance() {
		if (PrismaClient.client == null) {
			PrismaClient.client = new PCOG();
		}

		return PrismaClient.client;
	}
}
