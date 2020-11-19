import express from "express";
import Controller from "../controller/index";
import cors from "cors";

const app = express();

const controller = new Controller();

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
  cors({
    origin: "*",
  })
);

app.use(
  "/shop/:productId/:styleId",
  express.static(__dirname + "./../client/dist")
);

app.get("/inventory/:productID/:styleID", function (req, res) {
  const pID = req.params.productID;
  const sID = req.params.styleID;

  controller
    .read(pID, sID)
    .then(function (result) {
      res.send(result).status(200);
    })
    .catch(function (err) {
      console.error(`Error: ${err}`);
      res.sendStatus(500);
    });
});

app.post("/inventory/product/add", function (req, res) {
  const document = req.body;

  controller
    .write(document)
    .then(function (result) {
      res.send(result).status(200);
    })
    .catch(function (err) {
      console.error(`Error: ${err}`);
      res.sendStatus(500);
    });
});

app.patch("/inventory/:productID/:styleID/update", function (req, res) {
  const size = req.body.size;
  const newQuantity = req.body.newQuantity;
  const pID = req.params.productID;
  const sID = req.params.styleID;

  // Development use only console.log.
  console.log(req.body);

  controller
    .updateQuantity(pID, sID, size, newQuantity)
    .then(function (result) {
      res.send(result).status(200);
    })
    .catch(function (err) {
      console.error(`Error: ${err}`);
      res.sendStatus(500);
    });
});

app.delete("/inventory/:productID/:styleID/:size/delete", function (req, res) {
  const pID = req.params.productID;
  const sID = req.params.styleID;
  const size = req.params.size;

  controller
    .delete(pID, sID, size)
    .then(function (result) {
      res.send(result).status(200);
    })
    .catch(function (err) {
      console.error(`Error: ${err}`);
      res.sendStatus(500);
    });
});

export default app;
