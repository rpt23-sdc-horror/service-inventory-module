import app from "../../../src/server/routes";
import request from "supertest";
import sinon from "sinon";
import Controller from "../../../src/controller/index";
import { expect } from "chai";

describe("Server Routes Tests", function () {
  const error = new Error("Fake Error");
  const body = {
    product_id: 2,
    style_id: 1,
    size: 12,
    newQuantity: 9000,
  };

  const incorrectBody = {
    product_id: null,
    newQuantity: 9000,
  };

  describe("Get Endpoint", function () {
    beforeEach(function () {
      sinon.restore();
    });

    afterEach(function () {
      sinon.restore();
    });

    it("should return a 200 OK status for proper requests", function (done) {
      sinon.stub(Controller.prototype, "read").callsFake(async function () {
        const result = {
          rows: [
            {
              product_id: "1",
              style_id: "2",
              size: 12.5,
              quantity: 10,
            },
          ],
        };

        return result;
      });

      request(app)
        .get(`/inventory/${1}/${2}`)
        .expect(200)
        .expect("Content-type", /json/)
        .end(function (err, response) {
          if (err) return done(err);
          expect(`${response.body.rows[0].product_id}`).to.equal("1");
          done();
        });
    });

    it("should return 404 status if either or both parameters are null", function (done) {
      request(app)
        .get(`/inventory/${null}/${null}`)
        .expect(400)
        .end(function (err) {
          if (err) return done(err);
        });

      request(app)
        .get(`/inventory/${undefined}/${undefined}`)
        .expect(400)
        .end(function (err) {
          if (err) return done(err);
          done();
        });
    });

    it("should return 500 Internal Error status and log the error with Winston if the controller method fails", function (done) {
      sinon.stub(Controller.prototype, "read").throws(error);

      request(app)
        .get(`/inventory/${1}/${2}`)
        .expect(500)
        .end(function (err) {
          if (err) return done(err);
          done();
        });
    });

    it("should not be able to call GET on the /inventory/product endpoint", function (done) {
      request(app)
        .get("/inventory/product")
        .expect(405)
        .end(function (err) {
          if (err) return done(err);
          done();
        });
    });
  });

  describe("Post Endpoint", function () {
    const document = {
      product_id: 1,
      style_id: 10,
      size: 11,
      quantity: 300,
    };

    const badDocument = {
      product_id: null,
      style_id: null,
    };

    beforeEach(function () {
      sinon.restore();
    });

    afterEach(function () {
      sinon.restore();
    });

    it("should return a 200 OK status for proper requests", function (done) {
      sinon.stub(Controller.prototype, "write").callsFake(async function () {
        const result = {
          rows: [
            {
              product_id: "1",
            },
          ],
        };

        return result;
      });

      request(app)
        .post("/inventory/product")
        .send(document)
        .set("Accept", "application/json")
        .type("json")
        .expect(200)
        .expect("Content-type", /json/)
        .end(function (err, response) {
          if (err) return done(err);
          expect(`${response.body.rows[0].product_id}`).to.equal("1");
          done();
        });
    });

    it("should return a 400 Bad Request if the request body is incorrect", function (done) {
      sinon.stub(Controller.prototype, "write").callsFake(async function () {
        const result = {
          rows: [],
        };

        return result;
      });

      request(app)
        .post("/inventory/product")
        .send(badDocument)
        .set("Accept", "application/json")
        .type("json")
        .expect(400)
        .end(function (err) {
          if (err) return done(err);
          done();
        });
    });

    it("should return 500 Internal Error status and log the error with Winston if the controller method fails", function (done) {
      sinon.stub(Controller.prototype, "write").throws(error);

      request(app)
        .post("/inventory/product")
        .send(document)
        .set("Accept", "application/json")
        .type("json")
        .expect(500)
        .end(function (err) {
          if (err) return done(err);
          done();
        });
    });
  });

  describe("Patch Endpoint", function () {
    beforeEach(function () {
      sinon.restore();
    });

    afterEach(function () {
      sinon.restore();
    });

    it("should return a 200 OK status for proper requests", function (done) {
      sinon
        .stub(Controller.prototype, "updateQuantity")
        .callsFake(async function () {
          const result = {
            rows: [
              {
                product_id: "1",
                style_id: "1",
                size: 12,
              },
            ],
          };

          return result;
        });

      request(app)
        .patch("/inventory/product")
        .send(body)
        .set("Accept", "application/json")
        .type("json")
        .expect(200)
        .expect("Content-type", /json/)
        .end(function (err, response) {
          if (err) return done(err);
          expect(`${response.body.rows[0].product_id}`).to.equal("1");
          done();
        });
    });

    it("should return a 400 Bad Request if the request body is incorrect", function (done) {
      sinon
        .stub(Controller.prototype, "updateQuantity")
        .callsFake(async function () {
          const result = {
            rows: [],
          };

          return result;
        });

      request(app)
        .patch("/inventory/product")
        .send(incorrectBody)
        .set("Accept", "application/json")
        .type("json")
        .expect(400)
        .end(function (err) {
          if (err) return done(err);
          done();
        });
    });

    it("should return 500 Internal Error status and log the error with Winston if the controller method fails", function (done) {
      sinon.stub(Controller.prototype, "updateQuantity").throws(error);

      request(app)
        .patch(`/inventory/product`)
        .send(body)
        .set("Accept", "application/json")
        .type("json")
        .expect(500)
        .end(function (err) {
          if (err) return done(err);
          done();
        });
    });
  });

  describe("Delete Endpoint", function () {
    beforeEach(function () {
      sinon.restore();
    });

    afterEach(function () {
      sinon.restore();
    });

    it("should return a 200 OK status for proper requests", function (done) {
      sinon.stub(Controller.prototype, "delete").callsFake(async function () {
        const result = {
          rows: [
            {
              product_id: "1",
              style_id: "1",
              size: 12,
            },
          ],
        };

        return result;
      });

      request(app)
        .delete("/inventory/product")
        .send(body)
        .set("Accept", "application/json")
        .type("json")
        .expect(200)
        .expect("Content-type", /json/)
        .end(function (err, response) {
          if (err) return done(err);
          expect(`${response.body.rows[0].product_id}`).to.equal("1");
          done();
        });
    });

    it("should return a 400 Bad Request if the request body is incorrect", function (done) {
      sinon.stub(Controller.prototype, "delete").callsFake(async function () {
        const result = {
          rows: [],
        };

        return result;
      });

      request(app)
        .delete("/inventory/product")
        .send(incorrectBody)
        .set("Accept", "application/json")
        .type("json")
        .expect(400)
        .end(function (err) {
          if (err) return done(err);
          done();
        });
    });

    it("should return 500 Internal Error status and log the error with Winston if the controller method fails", function (done) {
      sinon.stub(Controller.prototype, "delete").throws(error);

      request(app)
        .delete("/inventory/product")
        .send(body)
        .set("Accept", "application/json")
        .type("json")
        .expect(500)
        .end(function (err) {
          if (err) return done(err);
          done();
        });
    });
  });
});
