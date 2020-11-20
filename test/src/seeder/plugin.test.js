import sinon from "sinon";
import { expect } from "chai";
import Seeder from "../../../seeder/postgres_seeder/plugin";
import Controller from "../../../src/controller/index";

describe("Seeder Tests", function () {
  const fakeConfig = {
    product_range: 1,
    style_range: 1,
    women_sizes: [5],
    men_sizes: [6],
  };
  const error = new Error("Fake Error");
  const seeder = new Seeder(fakeConfig);

  describe("Seed Method", function () {
    beforeEach(function () {
      sinon.restore();
    });

    afterEach(function () {
      sinon.restore();
    });

    it("should return a status of Alive on success", function (done) {
      sinon.stub(Controller.prototype, "write").callsFake(function () {
        return;
      });

      sinon.stub(Seeder.prototype, "generateData").callsFake(function () {
        const documents = [{}];

        return documents;
      });
      seeder
        .seed()
        .then(function (response) {
          expect(response).to.equal("Status: Alive");
        })
        .catch(function (err) {
          console.error(`Error: ${err}`);
        })
        .finally(function () {
          done();
        });
    });

    it("should console log an error if the write method of Controllers fails", async function (done) {
      const errConsole = sinon.spy(console, "error");

      sinon.stub(Controller.prototype, "write").throws(error);

      try {
        seeder.seed();
      } catch (err) {
        sinon.assert.called(errConsole);
      } finally {
        done();
      }
    });
  });

  describe("Generate Data Method", function () {
    before(function () {
      sinon.restore();
    });

    after(function () {
      sinon.restore();
    });

    it("should generate an array of documents", async function () {
      const response = await seeder.generateData();

      expect(response[0].product_id).to.equal(1);
      expect(response.length).to.equal(fakeConfig.product_range);
    });
  });

  describe("Coin Flip Method", function () {
    before(function () {
      sinon.restore();
    });

    after(function () {
      sinon.restore();
    });

    it("should generate 1 or 0", async function () {
      const response = await seeder.coinFlip();
      const options = [0, 1];
      const result = options.indexOf(response);

      expect(result).to.not.equal(-1);
    });
  });

  describe("Generate Quantity Method", function () {
    before(function () {
      sinon.restore();
    });

    after(function () {
      sinon.restore();
    });

    it("should generate a number", async function () {
      const response = await seeder.generateQuantity();

      expect(typeof response).to.equal("number");
    });
  });
});
