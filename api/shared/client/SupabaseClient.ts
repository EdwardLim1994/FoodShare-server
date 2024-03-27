import {
	createClient,
	type SupabaseClient as SCOG,
} from "@supabase/supabase-js";

export default class SupabaseClient {
	private static client: SCOG;

	private constructor() {}

	static instance() {
		if (SupabaseClient.client == null) {
			SupabaseClient.client = createClient(
				`https://${Bun.env.SUPABASE_URL}`,
				Bun.env.SUPABASE_PUBLIC_KEY
			);
		}

		return SupabaseClient.client;
	}
}
