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
    const writer = csvWriter({ sendHeaders: false });

    // Let developers know this method is running
    console.log(status.in_progress);

    writer.pipe(
      fs.createWriteStream(
        `./seeder/postgres_seeder/data_generator/seed_data/mockData.csv`,
        { flags: "a+" }
      )
    );

    for (let i = this.productRange; i > 0; i--) {
      const sizes = this.coinFlip() === 1 ? this.womenSizes : this.menSizes;

      for (let j = this.styleRange; j > 0; j--) {
        for (let k = 0; k < sizes.length; k++) {
          const document = {
            product_id: i,
            style_id: j,
            size: sizes[k],
            quantity: this.generateQuantity(),
          };

          if (!writer.write(document))
            await new Promise((resolve) => writer.once("drain", resolve));
        }
      }
    }
    writer.end();
    return status.success;
  }

  generateQuantity() {
    const quantity = Math.floor(Math.random() * Math.floor(100));

    return quantity;
  }

  coinFlip() {
    const result = Math.floor(Math.random() * 2);

    return result;
  }
}
