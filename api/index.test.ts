import { app } from "./index";
import { describe, expect, it } from "bun:test";

describe("Elysia", () => {
	it("return a response", async () => {
		const response = await app
			.handle(new Request("http://localhost:3000/user"))
			.then((res) => res.text());

		expect(response).toBe("Hello world");
	});
});
