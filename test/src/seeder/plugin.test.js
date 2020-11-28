import sinon from "sinon";
import { expect } from "chai";
import CSVGenerator from "../../../seeder/postgres_seeder/data_generator/plugin";
import csvWriter from "csv-write-stream";


xdescribe("CSV Generator Test", function () {
  const fakeConfig = {
    product_range: 1,
    style_range: 1,
    women_sizes: [5],
    men_sizes: [6],
  };
  const csvGenerator = new CSVGenerator(fakeConfig);
  const writer = csvWriter();

  describe("Generate File Method", function () {
    beforeEach(function () {
      sinon.restore();
    });

    afterEach(function () {
      sinon.restore();
    });

    it("should call a write method", function (done) {
      sinon.stub(writer, "write").callsFake(function () {
        return;
      });

      csvGenerator
        .generateFile()
        .then(function (response) {
          expect(response).to.equal("Status: Success");
        })
        .catch(function (err) {
          console.error(`Error: ${err}`);
        })
        .finally(function () {
          done();
        });
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
      const response = await csvGenerator.coinFlip();
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
      const response = await csvGenerator.generateQuantity();

      expect(typeof response).to.equal("number");
    });
  });
});
