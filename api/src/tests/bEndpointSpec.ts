import supertest from "supertest";
import app from "../server";

const st = supertest(app)

describe("Testing Main api page", () => {
	it("Testing Get /", async () => {
		const res = await st.get("/");
		expect(res.status).toBe(200);
	});
})