var mongoose = require('mongoose');
//inventory is the database
mongoose.connect('mongodb://localhost/inventory', {useNewUrlParser: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Connected to the database!');
});

const productSchema = new mongoose.Schema({
    product_id: Number,
    style_id: Number,
    size: Number,
    quantity: Number
});

//this is collection
const Product = mongoose.model('Product', productSchema);


let addToDb = (data) => {

    let newProduct = new Product({
        product_id: data.product_id,
        style_id: data.style_id,
        size: data.size,
        quantity: data.quantity
    });;


    return new Promise((res, rej) => {
        db.collection('Products').insertOne(newProduct, (err, result) => {
            if (err) {
                rej(err);
            } else {
                res(result);
            }
        }); 
    });
    
};

let findStyle = (productId, styleId) => {
    let productInt = parseInt(productId);
    let styleInt = parseInt(styleId);

    return new Promise((res, rej) => {
        db.collection('Products').find({product_id: productInt, style_id: styleInt}, (err, result) => {
            if (err) {
                rej(err);
            } else {
                res(result.toArray());
            }
        });
    });
    
};


module.exports.addToDb = addToDb;
module.exports.findStyle = findStyle;
module.exports.db = db;