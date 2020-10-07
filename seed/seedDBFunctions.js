const inventoryDB = require('../database');
const sizes = require('./generateSizes');




let addSizesToDB = (productId, styleId) => {
    let newSizes = sizes.generateSizes(productId, styleId);
    let promiseArr = [];
    
    
    for (let currentSize = 0; currentSize < newSizes.length; currentSize++) {
        
        let newPromise = inventoryDB.addToDb(newSizes[currentSize]);
        promiseArr.push(newPromise);
        
    }

    return promiseArr;
};

let setInventoryQuantity = (productQuantity, styleQuantity, cb) => {
    let promiseArr = [];
    
    for (let currentProduct = 0; currentProduct < productQuantity; currentProduct++) {
    
        for (let currentStyle = 0; currentStyle < styleQuantity; currentStyle++) {
            
            Promise.all(cb(currentProduct, currentStyle))
            .then((result) => {
                promiseArr.push(result);
            })
            .catch((err) => {
                console.log(err);
            });
            
            if (currentProduct == productQuantity-1 && currentStyle == styleQuantity-1) {
                setTimeout(() => {process.kill(process.pid)}, 5000);
            }
        }

    }

    return promiseArr;
};

module.exports.addSizesToDB = addSizesToDB;
module.exports.setInventoryQuantity = setInventoryQuantity;
