"use strict";

import express from "express";
import Controller from "../controller/index";
import cors from "cors";
import Logger from "./winston";

const app = express();

const controller = new Controller();
const winstonLogger = new Logger("routes");

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/dist"));

app.use(
  "/shop/:productId/:styleId",
  express.static(__dirname + "./../client/dist")
);

app.get("/inventory/product", (req, res) => {
  res.sendStatus(405);
  return;
});

app.get("/inventory/:productID/:styleID", async function (req, res) {
  const pID = req.params.productID;
  const sID = req.params.styleID;

  if (
    pID == "null" ||
    sID == "null" ||
    pID == "undefined" ||
    sID == "undefined"
  ) {
    res.sendStatus(400);
    return;
  }

  controller
    .read(pID, sID)
    .then(async function (result) {
      res.send(result.rows).status(200);
    })
    .catch(function (err) {
      winstonLogger.logger.log("error", "Error:", err);
      res.sendStatus(500);
    });
});

app.post("/inventory/product", function (req, res) {
  const document = req.body;

  if (
    !document.product_id ||
    !document.style_id ||
    !document.size ||
    !document.quantity
  ) {
    res.sendStatus(400);
    return;
  }

  controller
    .write(document)
    .then(function (result) {
      res.send(result.rows).status(200);
    })
    .catch(function (err) {
      winstonLogger.logger.log("error", "Error:", err);
      res.sendStatus(500);
    });
});

app.patch("/inventory/product", function (req, res) {
  const pID = req.body.product_id;
  const sID = req.body.style_id;
  const size = req.body.size;
  const newQuantity = req.body.newQuantity;

  if (!pID || !sID || !size || !newQuantity) {
    res.sendStatus(400);
    return;
  }

  controller
    .updateQuantity(pID, sID, size, newQuantity)
    .then(function (result) {
      res.send(result.rows).status(200);
    })
    .catch(function (err) {
      winstonLogger.logger.log("error", "Error:", err);
      res.sendStatus(500);
    });
});

app.delete("/inventory/product", function (req, res) {
  const pID = req.body.product_id;
  const sID = req.body.style_id;
  const size = req.body.size;

  if (!pID || !sID || !size) {
    res.sendStatus(400);
    return;
  }

  controller
    .delete(pID, sID, size)
    .then(function (result) {
      res.send(result.rows).status(200);
    })
    .catch(function (err) {
      winstonLogger.logger.log("error", "Error:", err);
      res.sendStatus(500);
    });
});

export default app;
