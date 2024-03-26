import PrismaClient from "../database/PrismaClient";

export default abstract class Service {
	constructor(protected prisma: PrismaClient = PrismaClient.instance()) {}
}
