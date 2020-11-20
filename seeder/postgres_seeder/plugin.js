"use strict";

import Controller from "../../src/controller/index";

export default class Seeder {
  constructor(config) {
    this.controller = new Controller();

    this.productRange = config.product_range;
    this.styleRange = config.style_range;
    this.womenSizes = config.women_sizes;
    this.menSizes = config.men_sizes;
  }

  async seed() {
    const documents = await this.generateData();

    for (let i = 0; i < documents.length; i++) {
      this.controller.write(documents[i]).catch(function (err) {
        return console.error(`Error: ${err}`);
      });
    }

    return "Status: Alive";
  }

  async generateData() {
    const result = [];

    for (let i = 0; i < this.productRange; i++) {
      // Use a coin flipper to decide whether the shoe is for men or women
      const flip = await this.coinFlip();

      if (flip === 1) {
        // For each product ID, generate a range of style IDs
        // For each style ID, generate one shoe for each size available to the gender

        for (let j = 0; j < this.styleRange; j++) {
          const productID = i + 1;
          const styleID = j + 1;

          for (let k = 0; k < this.womenSizes.length; k++) {
            const currentSize = this.womenSizes[k];
            const newQuantity = await this.generateQuantity();
            const document = {
              product_id: productID,
              style_id: styleID,
              size: currentSize,
              quantity: newQuantity,
            };

            result.push(document);
          }
        }
      } else if (flip === 0) {
        for (let j = 0; j < this.styleRange; j++) {
          const productID = i + 1;
          const styleID = j + 1;

          for (let k = 0; k < this.menSizes.length; k++) {
            const currentSize = this.menSizes[k];
            const newQuantity = await this.generateQuantity();
            const document = {
              product_id: productID,
              style_id: styleID,
              size: currentSize,
              quantity: newQuantity,
            };

            result.push(document);
          }
        }
      }
    }
    return result;
  }

  async generateQuantity() {
    const quantity = Math.floor(Math.random() * Math.floor(100));

    return quantity;
  }

  async coinFlip() {
    const result = Math.floor(Math.random() * 2);

    return result;
  }
}
