import sinon from "sinon";
import { expect } from "chai";
import CSVGenerator from "../../../seeder/postgres_seeder/data_generator/plugin";

describe("Data Generator Tests", function () {
  const csvGen = new CSVGenerator({
    product_range: 1,
    style_range: 1,
    women_sizes: [5],
    men_sizes: [6],
  });

  const generateRange = function (min, max) {
    let result = [];

    for (let i = min; i <= max; i++) {
      result.push(i);
    }

    return result;
  };

  before(function () {
    sinon.restore();
  });

  after(function () {
    sinon.restore();
  });

  describe("Plugins", function () {
    describe("Quantity Generator", function () {
      it("should generate a number between 0 and 100", async function (done) {
        const range = generateRange(1, 100);
        const result = csvGen.generateQuantity();

        expect(range.indexOf(result)).to.not.equal(-1);
        expect(typeof result).to.equal("number");
        done();
      });

      describe("Coin Flip", function () {
        it("should generate 1 or 0", function (done) {
          const range = [0, 1];
          const result = csvGen.coinFlip();

          expect(range.indexOf(result)).to.not.equal(-1);
          done();
        });
      });
    });
  });
});
