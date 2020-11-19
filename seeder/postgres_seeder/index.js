"use strict";

import Seeder from "./plugin";
import config from "./seeder.config";

async function script() {
  const seeder = new Seeder(config);

  try {
    seeder.seed();
  } catch (err) {
    console.error(`Script Error: ${err}`);

    // Throw error to prevent further execution.
    throw err;
  } finally {
    console.log("Seeder has successfully finished its task!");
    console.log("Ending task, this may take a few seconds.");
    return "Status: Finished";
  }
}

script().catch(function (err) {
  console.error(`Seeder Error: ${err}`);

  throw err;
});

export default script;
