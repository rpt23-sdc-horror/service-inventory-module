const express = require("express");
const inventoryDB = require("../gateways/mongodb/index");

const app = express();

app.use(function (req, res, next) {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  });
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/dist"));
app.use(
  "/shop/:productId/:styleId",
  express.static(__dirname + "./../client/dist")
);

app.get("/inventory/:productid/:styleid", (req, res) => {
  inventoryDB
    .findStyle(req.params.productid, req.params.styleid)
    .then((result) => {
      console.log(result);
      res.send(result).status(200);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = app;
