import pg from "pg";
import PostgresGateway from "../../../../src/gateways/postgres/plugin";
import sinon from "sinon";
import { expect } from "chai";

describe("Gateway Plugin Test", function () {
  const db = new PostgresGateway();

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

    it("should write to the database and return the respective product id", async function () {
      sinon.stub(pg.Client.prototype, "query").callsFake(async function () {
        const result = {
          rows: [
            {
              product_id: "1",
            },
          ],
        };

        return result;
      });

      const response = await db.write(product);

      expect(Number(response.rows[0].product_id)).to.equal(1);
    });

    it("should throw an error if the query fails", async function () {
      const error = new Error("Fake Error");
      const logger = sinon.spy(db.logger, "log");

      try {
        sinon.stub(pg.Client.prototype, "query").throws(error);

        await db.write(product);
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

    it("should read from database with the given parameters", async function () {
      sinon.stub(pg.Client.prototype, "query").callsFake(async function () {
        const result = {
          rows: [
            {
              product_id: "1",
            },
          ],
        };

        return result;
      });

      const response = await db.read(productID, styleID);
      expect(Number(response.rows[0].product_id)).to.equal(1);
    });

    it("should throw an error if the query fails", async function () {
      const error = new Error("Fake Error");
      const logger = sinon.spy(db.logger, "log");

      try {
        sinon.stub(pg.Client.prototype, "query").throws(error);

        await db.read(productID, styleID);
      } catch (error) {
        expect(error.message).to.equal("Fake Error");
        sinon.assert.calledOnce(logger);
      }
    });
  });

  describe("Update Action", function () {
    const productID = 1;
    const styleID = 1;
    const size = 13.5;
    const newQuantity = 100;

    beforeEach(function () {
      sinon.restore();
    });

    afterEach(function () {
      sinon.restore();
    });

    it("should update the quantity of the desired product", async function () {
      sinon.stub(pg.Client.prototype, "query").callsFake(async function () {
        const result = {
          rows: [
            {
              product_id: "1",
              style_id: "1",
              size: 13.5,
            },
          ],
        };

        return result;
      });

      const response = await db.updateQuantity(
        productID,
        styleID,
        size,
        newQuantity
      );

      expect(Number(response.rows[0].product_id)).to.equal(1);
      expect(Number(response.rows[0].style_id)).to.equal(1);
      expect(response.rows[0].size).to.equal(13.5);
    });

    it("should throw an error if the query fails", async function () {
      const error = new Error("Fake Error");
      const logger = sinon.spy(db.logger, "log");

      try {
        sinon.stub(pg.Client.prototype, "query").throws(error);

        await db.updateQuantity(productID, styleID, size, newQuantity);
      } catch (error) {
        expect(error.message).to.equal("Fake Error");
        sinon.assert.calledOnce(logger);
      }
    });
  });

  describe("Delete Action", function () {
    const productID = 1;
    const styleID = 1;
    const size = 13.5;

    beforeEach(function () {
      sinon.restore();
    });

    afterEach(function () {
      sinon.restore();
    });

    it("should delete a product from the database", async function () {
      sinon.stub(pg.Client.prototype, "query").callsFake(async function () {
        const result = {
          rows: [
            {
              product_id: "1",
              style_id: "1",
              size: 13.5,
            },
          ],
        };

        return result;
      });

      const response = await db.delete(productID, styleID, size);

      expect(Number(response.rows[0].product_id)).to.equal(1);
      expect(Number(response.rows[0].style_id)).to.equal(1);
      expect(response.rows[0].size).to.equal(13.5);
    });

    it("should throw an error if the query fails", async function () {
      const error = new Error("Fake Error");
      const logger = sinon.spy(db.logger, "log");

      try {
        sinon.stub(pg.Client.prototype, "query").throws(error);

        await db.delete(productID, styleID, size);
      } catch (error) {
        expect(error.message).to.equal("Fake Error");
        sinon.assert.calledOnce(logger);
      }
    });
  });
});
