const app = require("../../../src/server/routes");
const request = require("supertest");
const sinon = require("sinon");
const database = require("../../../src/gateways/mongodb/index");

describe("Server Routes", function () {
  describe("Get Endpoint", function () {
    beforeEach(function () {
      sinon.restore();
    });

    afterEach(function () {
      sinon.restore();
    });

    it("should return a 200 OK status", function (done) {
      sinon.stub(database, "findStyle").callsFake(async function () {
        const object = {
          rows: [{ product_id: 1, style_id: 2, size: 12.5, quantity: 10 }],
        };
        const result = JSON.stringify(object);

        return JSON.parse(result);
      });

      request(app)
        .get(`/inventory/${1}/${2}`)
        .expect(200)
        .expect("Content-type", /json/)
        .end(function (err) {
          if (err) return done(err);
          done();
        });
    });
  });
});
