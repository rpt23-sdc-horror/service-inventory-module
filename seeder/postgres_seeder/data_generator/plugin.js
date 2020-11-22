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
    const writer = csvWriter();

    // Let developers know this method is running
    console.log(status.in_progress);

    writer.pipe(
      fs.createWriteStream(
        "./seeder/postgres_seeder/csv_script/seed_data/mockData1.csv",
        { flags: "a" }
      )
    );

    for (let i = 0; i <= this.productRange; i++) {
      // Use a coin flipper to decide whether the shoe is for men or women
      const flip = await this.coinFlip();
      let sizes;
      let fileNumber = 1;
      let internalCounter = 0;

      if (flip === 1) {
        sizes = this.womenSizes;
      } else {
        sizes = this.menSizes;
      }

      for (let j = 0; j < this.styleRange; j++) {
        // For each style ID, generate one shoe for each size available to the gender
        for (let k = 0; k < sizes.length; k++) {
          const currentSize = sizes[k];
          const newQuantity = await this.generateQuantity();
          const productID = short.generate();
          const styleID = short.generate();
          const document = {
            product_id: productID,
            style_id: styleID,
            size: currentSize,
            quantity: newQuantity,
          };

          if (!writer.write(document)) {
            try {
              await writer.once("drain", this.generateFile);
              console.log("Status: Draining Pipe");
              fileNumber++;
            } catch (err) {
              console.log(err);

              throw err;
            } finally {
              writer.write(document);

              internalCounter++;
            }
          } else if (internalCounter === 1000000) {
            await writer.pipe(
              fs.createWriteStream(
                `./seeder/postgres_seeder/csv_script/seed_data/mockData${fileNumber}.csv`,
                { flags: "a" }
              )
            );

            writer.write(document);
            internalCounter = 0;
          } else {
            writer.write(document);

            internalCounter++;
          }
        }
      }
    }
    writer.end();
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
