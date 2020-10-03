const inventoryDB = require('../database');
const sizes = require('./generateSizes');




let addSizesToDB = (productId, styleId) => {
    let newSizes = sizes.generateSizes(productId, styleId);
    
    for (let currentSize = 0; currentSize < newSizes.length; currentSize++) {
        
        inventoryDB.addToDb(newSizes[currentSize])
        .then(() => {
            console.log('added to db!');
        })
        .catch((err) => {
            console.log(err);
        });
    }
    
};

let setInventoryQuantity = (productQuantity, styleQuantity, cb) => {
    
    for (let currentProduct = 0; currentProduct < productQuantity; currentProduct++) {
    
        for (let currentStyle = 0; currentStyle < styleQuantity; currentStyle++) {
            cb(currentProduct, currentStyle);
            
            if (currentProduct == productQuantity-1 && currentStyle == styleQuantity-1) {
                setTimeout(() => {process.kill(process.pid)}, 10000);
            }
        }

    }

};

setInventoryQuantity(100, 3, addSizesToDB);
