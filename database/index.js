var mongoose = require('mongoose');
//inventory is the database
mongoose.connect('mongodb://localhost/inventory', {useNewUrlParser: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('okay 🥺');
});

const productSchema = new mongoose.Schema({
    id_product: String,
    id_style: String,
    size_male: Number,
    size_female: Number,
    quantity: Number
});

//this is collection
const Product = mongoose.model('Product', productSchema);


let updateDb = (data) => {
    let newProduct = new Product({
        id_product: data.product_id,
        id_style: data.style_id,
        size_male: data.size_male,
        size_female: data.size_female,
        quantity: data.quantity
    });

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


module.exports.updateDb = updateDb;