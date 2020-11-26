import CSVGenerator from "./plugin";
import config from "./config.js";
import status from "./helper";

const csvGen = new CSVGenerator(config);

csvGen
  .generateFile()
  .catch(function (err) {
    console.error(`Error: ${err}`);
    return err;
  })
  .finally(function (err) {
    if (err) {
      console.log("Failed to generate a csv file :(");
      return status.failure;
    } else {
      console.log("Successfully generated a csv file!");
      return status.success;
    }
  });
