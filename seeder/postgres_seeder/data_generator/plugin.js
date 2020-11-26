"use strict";

import csvWriter from "csv-write-stream";
import fs from "fs";
import short from "short-uuid";
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
    let fileNumber = 1;

    // Let developers know this method is running
    console.log(status.in_progress);

    for (let i = 0; i < this.productRange; i++) {
      const writer = csvWriter({ sendHeaders: false });
      // Use a coin flipper to decide whether the shoe is for men or women
      const flip = await this.coinFlip();
      const sizes = flip === 1 ? this.womenSizes : this.menSizes;

      if (ticker >= 250000) {
        fileNumber++;
        ticker = 0;

        console.log(fileNumber);
      }

      writer.pipe(
        fs.createWriteStream(
          `./seeder/postgres_seeder/data_generator/seed_data/mockData${fileNumber}.csv`,
          { flags: "a" }
        )
      );

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

          // Check if stream is still writable, if not begin draining process and re-open stream
          if (!writer.write(document)) {
            try {
              await writer.once("drain", this.generateFile);
              console.log("Draining pipe");
            } catch (err) {
              console.log(err);

              throw err;
            }
          }

          ticker++;
        }
      }
      writer.once("drain", this.generateFile);
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
