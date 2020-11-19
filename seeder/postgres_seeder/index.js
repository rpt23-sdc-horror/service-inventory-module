"use strict";

import Seeder from "./plugin";
import config from "./seeder.config";

(async function () {
  const seeder = new Seeder(config);

  try {
    seeder.seed();
  } catch (err) {
    console.error(`Seeder Error: ${err}`);
  } finally {
    console.log(`Seeder has successfully finished its task!`);
  }
  // seeder
  //   .seed()
  //   .catch(function (err) {
  //     console.error(`Seeder Error: ${err}`);
  //   })
  //   .finally(function (err) {
  //   });
})();
