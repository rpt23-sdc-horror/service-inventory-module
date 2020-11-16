var mongoose = require("mongoose");
//inventory is the database
mongoose.connect("mongodb://localhost/inventory", {
  poolSize: 10,
  bufferMaxEntries: 0,
  reconnectTries: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("Connected to the database!");
});

const productSchema = new mongoose.Schema({
  product_id: Number,
  style_id: Number,
  size: Number,
  quantity: Number,
});

//this is collection
const Product = mongoose.model("Product", productSchema);

let addToDb = (data) => {
  let productInt = parseInt(data.product_id);
  let styleInt = parseInt(data.style_id);

  let newProduct = new Product({
    product_id: productInt,
    style_id: styleInt,
    size: data.size,
    quantity: data.quantity,
  });

  return new Promise((res, rej) => {
    db.collection("Products")
      .insertOne(newProduct)
      .then((result) => {
        res(result);
      })
      .catch((err) => {
        rej(err);
      });
  });
};

let findStyle = (productId, styleId) => {
  let productInt = parseInt(productId);
  let styleInt = parseInt(styleId);

  return new Promise((res, rej) => {
    db.collection("Products").find(
      { product_id: productInt, style_id: styleInt },
      (err, result) => {
        if (err) {
          rej(err);
        } else {
          res(result.toArray());
        }
      }
    );
  });
};

module.exports.addToDb = addToDb;
module.exports.findStyle = findStyle;
module.exports.db = db;
