const express = require('express');
const app = express();
const inventoryDB = require('../database');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(3004, () => {
    console.log('Listening on port 3004');
});

app.get('/inventory/:productid/:styleid', (req, res) => {
    inventoryDB.findStyle(req.params.productid, req.params.styleid)
    .then((result) => {
        console.log(result);
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });

}); 