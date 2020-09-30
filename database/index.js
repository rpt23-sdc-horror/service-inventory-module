var mongoose = require('mongoose');
//inventory is the database
mongoose.connect('mongodb://localhost/inventory', {useNewUrlParser: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('okay 🥺');
});

const productSchema = new mongoose.Schema({
    product_id: String,
    style_id: String,
    size_male: Number,
    size_female: Number,
    quantity: Number
});

//this is collection
const Product = mongoose.model('Product', productSchema);


let updateDb = (data) => {
    let newProduct = new Product({
        product_id: data.product_id,
        style_id: data.style_id,
        size_male: data.size_male,
        size_female: data.size_female,
        quantity: data.quantity
    });

    return new Promise((res, rej) => {
        Product.update({product_id: data.product_id}, newProduct, {upsert: true}, (err, data) => {
            if (err) {
                rej(err);
            } else {
                res(data);
            }
        }); 
    });
    
};


module.exports.updateDb = updateDb;