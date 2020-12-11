"use strict";

import CSVGenerator from "./plugin";
import config from "./config.js";
import status from "./utils";

const csvGen = new CSVGenerator(config);

csvGen
  .generateFile()
  .catch(function (err) {
    console.error(`Error: ${err}`);
    console.log("Failed to generate a csv file :(");
    return status.failure;
  })
  .finally(function () {
    console.log("Generator finished!");
  });
