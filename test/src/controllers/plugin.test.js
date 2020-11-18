import { expect } from "chai";
import Controller from "../../../src/controllers/index";
import PostgresGateway from "../../../src/gateways/postgres/index";
import sinon from "sinon";

describe("Controller Tests", function () {
  const controller = new Controller();
  const error = new Error("Fake Error");

  describe("Write Action", function () {
    const product = {
      product_id: 1,
      style_id: 1,
      size: 13.5,
      quantity: 10,
    };

    beforeEach(function () {
      sinon.restore();
    });

    afterEach(function () {
      sinon.restore();
    });

    it("should write add a new product to the database", async function () {
      sinon
        .stub(PostgresGateway.prototype, "write")
        .callsFake(async function () {
          const result = {
            rows: [
              {
                product_id: "1",
              },
            ],
          };

          return result;
        });

      const response = await controller.write(product);

      expect(Number(response.rows[0].product_id)).to.equal(1);
    });

    it("should throw an error if the method fails and log it with Winston", async function () {
      const logger = sinon.spy(controller.gateway.logger, "log");

      try {
        sinon.stub(PostgresGateway.prototype, "write").throws(error);

        await controller.write(product);
      } catch (error) {
        expect(error.message).to.equal("Fake Error");
        sinon.assert.calledOnce(logger);
      }
    });
  });

  describe("Read Action", function () {
    const productID = 1;
    const styleID = 1;

    beforeEach(function () {
      sinon.restore();
    });

    afterEach(function () {
      sinon.restore();
    });

    it("should find product(s) related to the given product ID and style ID", async function () {
      sinon
        .stub(PostgresGateway.prototype, "read")
        .callsFake(async function () {
          const result = {
            rows: [
              {
                product_id: "1",
                style_id: "1",
                size: 12,
                quantity: 100,
              },
            ],
          };

          return result;
        });

      const response = await controller.read(productID, styleID);

      expect(Number(response.rows[0].product_id)).to.equal(1);
      expect(Number(response.rows[0].style_id)).to.equal(1);
      expect(Number(response.rows[0].size)).to.equal(12);
    });

    it("should throw an error if the method fails and log it with Winston", async function () {
      const logger = sinon.spy(controller.gateway.logger, "log");

      try {
        sinon.stub(PostgresGateway.prototype, "read").throws(error);

        await controller.read(productID, styleID);
      } catch (error) {
        expect(error.message).to.equal("Fake Error");
        sinon.assert.calledOnce(logger);
      }
    });
  });

  describe("Update Action", function () {
    const productID = 1;
    const styleID = 1;
    const size = 12;
    const newQuantity = 5000;

    beforeEach(function () {
      sinon.restore();
    });

    afterEach(function () {
      sinon.restore();
    });

    it("should write add a new product to the database", async function () {
      sinon
        .stub(PostgresGateway.prototype, "updateQuantity")
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

      const response = await controller.updateQuantity(productID, styleID, size, newQuantity);

      expect(Number(response.rows[0].product_id)).to.equal(1);
      expect(Number(response.rows[0].style_id)).to.equal(1);
      expect(response.rows[0].size).to.equal(12);
    });

    it("should throw an error if the method fails and log it with Winston", async function () {
      const logger = sinon.spy(controller.gateway.logger, "log");

      try {
        sinon.stub(PostgresGateway.prototype, "updateQuantity").throws(error);

        await controller.updateQuantity(productID, styleID, size, newQuantity);
      } catch (error) {
        expect(error.message).to.equal("Fake Error");
        sinon.assert.calledOnce(logger);
      }
    });
  });

  describe("Delete Action", function () {
    const productID = 1;
    const styleID = 1;
    const size = 12;

    beforeEach(function () {
      sinon.restore();
    });

    afterEach(function () {
      sinon.restore();
    });

    it("should write add a new product to the database", async function () {
      sinon
        .stub(PostgresGateway.prototype, "delete")
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

      const response = await controller.delete(productID, styleID, size);

      expect(Number(response.rows[0].product_id)).to.equal(1);
      expect(Number(response.rows[0].style_id)).to.equal(1);
      expect(response.rows[0].size).to.equal(12);
    });

    it("should throw an error if the method fails and log it with Winston", async function () {
      const logger = sinon.spy(controller.gateway.logger, "log");

      try {
        sinon.stub(PostgresGateway.prototype, "delete").throws(error);

        await controller.delete(productID, styleID, size);
      } catch (error) {
        expect(error.message).to.equal("Fake Error");
        sinon.assert.calledOnce(logger);
      }
    });
  });
});
