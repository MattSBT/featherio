


test("Testing API endpoint", async done => {
  const encode = {
      Shift = 8,
      Message = "check it out"
  }
  await request(app).post('/api/encode').send(encode);
  done();
});
