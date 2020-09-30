const express = require('express');
const app = express();
const inventoryDB = require('../database');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(3004, () => {
    console.log('meet me at port 3004? 👉👈 🥺');
});