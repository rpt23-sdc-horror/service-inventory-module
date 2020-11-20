import sinon from "sinon";
import { expect } from "chai";
import script from "../../../seeder/postgres_seeder/index";
import Seeder from "../../../seeder/postgres_seeder/plugin";

describe("Script Tests", function () {
  before(function () {
    sinon.restore();
    sinon.stub(Seeder.prototype, "generateData").callsFake(async function () {
      const document = [
        {
          product_id: 1,
          style_id: 1,
          size: 13.5,
          quantity: 10,
        },
      ];

      return document;
    });

    sinon.stub(Seeder.prototype, "seed").callsFake(async function () {
      return "Status: Alive";
    });
  });

  after(function () {
    sinon.restore();
  });

  it("should be able to seed the database", async function () {
    const quantityGenerator = sinon.spy(Seeder.prototype, "generateQuantity");
    const coinFlipper = sinon.spy(Seeder.prototype, "coinFlip");

    script()
      .then(function (response) {
        expect(response).to.equal("Status: Finished");
        sinon.assert.calledOnce(quantityGenerator);
        sinon.assert.calledOnce(coinFlipper);
      })
      .catch(function (err) {
        console.error("Test Error: ", err);
      });
  });
});
