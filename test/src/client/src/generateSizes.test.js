const assert = require("chai").assert;
const sizes = require("../../../../seed/generateSizes");

describe("generate size function", () => {
  describe("output", () => {
    it("should return an array", () => {
      let newSizes = sizes.generateSizes("001", "001");

      assert.equal(Array.isArray(newSizes), true);
    });
  });

  describe("array elements", () => {
    it("should have random quantities", () => {
      let newSizes = sizes.generateSizes("001", "001");
      let newSizes2 = sizes.generateSizes("001", "001");
      let isEqualQuantities = newSizes[0].quantity === newSizes2[0].quantity;

      assert.equal(isEqualQuantities, false);
    });

    it("should have men's sizes if product_id is even", () => {
      let newSizes = sizes.generateSizes("000", "001");

      //checks if biggest size is correct for men's shoes
      assert.equal(newSizes[newSizes.length - 1].size, 15);
    });

    it("should have women's sizes if product_id is odd", () => {
      let newSizes = sizes.generateSizes("001", "001");

      //checks if biggest size is correct for men's shoes
      assert.equal(newSizes[newSizes.length - 1].size, 12);
    });
  });
});
