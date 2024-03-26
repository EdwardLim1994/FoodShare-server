import { createClient } from "@supabase/supabase-js";

export default class SupabaseClient {
	private static client: SupabaseClient;

	private constructor() {
		return createClient(`https://${Bun.env.URL}`, Bun.env.PUBLIC_KEY);
	}

	static instance() {
		if (SupabaseClient.client == null) {
			SupabaseClient.client = new SupabaseClient();
		}

		return SupabaseClient.client;
	}
}
