"use strict";

/*
Configurable options:
  - product_range: controls the number product IDs that will be generated.

      Example: an input of 10 will result in 10 product IDs ranging from 1 to 10

  - style_range: controls the number of style IDs that will be generated per product ID

      Example: an input of 10 will result in 10 style IDs for product ID 001

  - women_sizes: controls the sizes available for all the styles

      Example: an input of [10, 12.5, 13] will generate shoe sizes of 10, 12.5 and 13 for each specific style ID.

  - men_sizes: controls the sizes available for all the styles

      Example: an input of [10, 12.5, 13] will generate shoe sizes of 10, 12.5 and 13 for each specific style ID.
*/

const config = {
  product_range: 10,
  style_range: 7,
  women_sizes: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
  men_sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 15],
};

export default config;
