import PrismaClient from "../client/PrismaClient";

export default abstract class Service {
	constructor(protected prisma: PrismaClient = PrismaClient.instance()) {}
}
