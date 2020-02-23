/*

Having issues with supertest on this project for some reason. Will fix if need be.
const app = require("./index.js");
const supertest = require("supertest");
const request = supertest(app);

it("POSTS to /api/encode endpoint to check for failure response", async done => {
  const response = await request.post("/api/encode").send({
    Message: "",
    Shift: ""
  });

  expect(response.status).toBe(500);
  expect(response.body.EncodedMessage).toBe("");
  done();
});
it("POSTS to api/encode endpoint testing encode non alpha", async done => {
  const response = await request.post("/api/encode").send({
    Message: "dad",
    Shift: "2"
  });
  expect(response.status).toBe(500);
  expect(response.body.EncodedMessage).toBe("gdg");
  done();
});
*/
