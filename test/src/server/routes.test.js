import app from "../../../src/server/routes";
import request from "supertest";
import sinon from "sinon";
import Controller from "../../../src/controller/index";
import { expect } from "chai";

describe("Server Routes Tests", function () {
  const error = new Error("Fake Error");

  describe("Get Endpoint", function () {
    beforeEach(function () {
      sinon.restore();
    });

    afterEach(function () {
      sinon.restore();
    });

    it("should return a 200 OK status", function (done) {
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
  });

  describe("Post Endpoint", function () {
    const document = {
      product_id: 1,
      style_id: 10,
      size: 11,
      quantity: 300,
    };

    beforeEach(function () {
      sinon.restore();
    });

    afterEach(function () {
      sinon.restore();
    });

    it("should return a 200 OK status", function (done) {
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
        .post("/inventory/product/add")
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

    it("should return 500 Internal Error status and log the error with Winston if the controller method fails", function (done) {
      sinon.stub(Controller.prototype, "write").throws(error);

      request(app)
        .post("/inventory/product/add")
        .expect(500)
        .end(function (err) {
          if (err) return done(err);
          done();
        });
    });
  });

  describe("Patch Endpoint", function () {
    const body = {
      size: 12,
      newQuantity: 9000,
    };

    beforeEach(function () {
      sinon.restore();
    });

    afterEach(function () {
      sinon.restore();
    });

    it("should return a 200 OK status", function (done) {
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
        .patch(`/inventory/${1}/${1}/update`)
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

    it("should return 500 Internal Error status and log the error with Winston if the controller method fails", function (done) {
      sinon.stub(Controller.prototype, "updateQuantity").throws(error);

      request(app)
        .patch(`/inventory/${1}/${1}/update`)
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

    it("should return a 200 OK status", function (done) {
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
        .delete(`/inventory/${1}/${1}/${12}/delete`)
        .expect(200)
        .expect("Content-type", /json/)
        .end(function (err, response) {
          if (err) return done(err);
          expect(`${response.body.rows[0].product_id}`).to.equal("1");
          done();
        });
    });

    it("should return 500 Internal Error status and log the error with Winston if the controller method fails", function (done) {
      sinon.stub(Controller.prototype, "delete").throws(error);

      request(app)
        .delete(`/inventory/${1}/${1}/${12}/delete`)
        .expect(500)
        .end(function (err) {
          if (err) return done(err);
          done();
        });
    });
  });
});
