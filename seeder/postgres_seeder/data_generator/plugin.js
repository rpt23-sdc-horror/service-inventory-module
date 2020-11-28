"use strict";

import csvWriter from "csv-write-stream";
import fs from "fs";
import status from "./helper";

export default class CSVGenerator {
  constructor(config) {
    this.productRange = config.product_range;
    this.styleRange = config.style_range;
    this.womenSizes = config.women_sizes;
    this.menSizes = config.men_sizes;
  }

  async generateFile() {
    let ticker = 0;
    let fileNumber = 12;

    // Let developers know this method is running
    console.log(status.in_progress);

    for (let i = 0; i < this.productRange; i++) {
      const writer = csvWriter({ sendHeaders: false });
      const stream = fs.createWriteStream(
        `./seeder/postgres_seeder/data_generator/seed_data/mockData.csv`,
        { flags: "a" }
      );
      const sizes =
        (await this.coinFlip()) === 1 ? this.womenSizes : this.menSizes;

      writer.pipe(stream);

      for (let j = 0; j < this.styleRange; j++) {
        for (let k = 0; k < sizes.length; k++) {
          const currentSize = sizes[k];
          const newQuantity = await this.generateQuantity();
          const productID = i + 1;
          const styleID = j + 1;
          const document = {
            product_id: productID,
            style_id: styleID,
            size: currentSize,
            quantity: newQuantity,
          };

          !writer.write(document)
            ? writer.once("drain", writer.write(document))
            : null;
          ticker += 1;
        }
      }
      stream.end();
      writer.end();
    }
    return status.success;
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
