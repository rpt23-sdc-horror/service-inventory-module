const menSizes = [
  6,
  6.5,
  7,
  7.5,
  8,
  8.5,
  9,
  9.5,
  10,
  10.5,
  11,
  11.5,
  12,
  12.5,
  13,
  14,
  15,
];
const womenSizes = [
  5,
  5.5,
  6,
  6.5,
  7,
  7.5,
  8,
  8.5,
  9,
  9.5,
  10,
  10.5,
  11,
  11.5,
  12,
];

let generateRandomQuantity = () => {
  let quantity = Math.floor(Math.random() * Math.floor(10));

  return quantity;
};

let generateSizes = (productId, styleId) => {
  let sizes = [];
  let product_id = parseInt(productId);
  let style_id = parseInt(styleId);
  let currentSize;

  if (productId % 2 == 0) {
    for (let i = 0; i < menSizes.length; i++) {
      currentSize = {
        product_id: product_id,
        style_id: style_id,
        size: menSizes[i],
        quantity: generateRandomQuantity(),
      };
      sizes.push(currentSize);
    }
  } else {
    for (let i = 0; i < womenSizes.length; i++) {
      currentSize = {
        product_id: product_id,
        style_id: style_id,
        size: womenSizes[i],
        quantity: generateRandomQuantity(),
      };

      sizes.push(currentSize);
    }
  }

  return sizes;
};

module.exports.generateSizes = generateSizes;
