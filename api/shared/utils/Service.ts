import PrismaClient from "../database/PrismaClient";
import SupabaseClient from "../database/SupabaseClient";

export default abstract class Service {
	constructor(
		protected prisma: PrismaClient = PrismaClient.instance(),
		protected supabase: SupabaseClient = SupabaseClient.instance()
	) {}
}
