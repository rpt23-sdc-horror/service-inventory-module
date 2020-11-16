const app = require("../../../src/server/index");
const request = require("supertest");

describe("Server", function () {
  it("should return a 200 OK status when the correct endpoints are reached", function (done) {
    request(app)
      .get(`/inventory/${1}/${2}`)
      .expect(200)
      .end(function (err) {
        if (err) return done(err);
        done();
      });
  });

  it("should return a 404 Not Found status when the incorrect endpoints are reached", function (done) {
    request(app)
      .get("/bad/route/test")
      .expect(404)
      .end(function (err) {
        if (err) return done(err);
        done();
      });
  });
});
