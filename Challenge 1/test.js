const app = require("./index.js");
const supertest = require("supertest");
const request = supertest(app);

it("POSTS to /api/encode endpoint to check for failure response", async done => {
  const response = await request.post("/api/encode");

  expect(response.status).toBe(500);
  expect(response.body.message).toBe("");
  done();
});
