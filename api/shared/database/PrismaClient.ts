import { PrismaClient as PCOG } from "@prisma/client";

export default class PrismaClient {
	private static client: PrismaClient;

	private constructor() {
		return new PCOG();
	}

	static instance() {
		if (PrismaClient.client == null) {
			PrismaClient.client = new PrismaClient();
		}

		return PrismaClient.client;
	}
}
